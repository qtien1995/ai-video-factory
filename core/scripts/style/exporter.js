import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../../..");
const STYLES_DIR = path.join(ROOT, "styles");
const REGISTRY_PATH = path.join(STYLES_DIR, "registry.json");

function toKebabCase(str) {
  return str
    .toLowerCase()
    .replace(/[^a-z0-9_-]/g, "-")
    .replace(/_+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

function toPascalCase(str) {
  return str
    .split(/[-_]/)
    .filter(Boolean)
    .map(w => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
    .join("");
}

export function exportDnaToStylePack(dnaProfile, requestedName, vaultDir) {
  if (!fs.existsSync(STYLES_DIR)) {
    fs.mkdirSync(STYLES_DIR, { recursive: true });
  }

  const rawId = requestedName || dnaProfile.id || "custom-style";
  const styleId = toKebabCase(rawId);
  const pascalName = toPascalCase(styleId) + "Theme";
  const displayName = requestedName
    ? requestedName.replace(/[-_]/g, " ").replace(/\b\w/g, c => c.toUpperCase())
    : styleId.replace(/[-_]/g, " ").replace(/\b\w/g, c => c.toUpperCase());

  const styleFolder = path.join(STYLES_DIR, styleId);
  fs.mkdirSync(styleFolder, { recursive: true });

  const bp = dnaProfile.clonedDnaBlueprint || {};
  const vis = bp.visualStyle || {};
  const pal = vis.palette || {};
  const typo = bp.typography || {};
  const sub = bp.subtitleStyle || {};
  const mot = bp.motionPhysics || {};
  const snd = bp.soundDesign || {};
  const rh = dnaProfile.rhythmAndPacing || {};

  const background = pal.background || "#0f172a";
  const surface = pal.surface || "#1e293b";
  const primaryText = pal.primaryText || "#ffffff";
  const accentPrimary = pal.accentColor || "#38bdf8";
  const accentSecondary = pal.secondaryAccent || "#f59e0b";

  // 1. Write style.json conforming to schemas/style.schema.json
  const styleJson = {
    "$schema": "../../schemas/style.schema.json",
    "id": styleId,
    "version": "1.0.0",
    "name": displayName,
    "purpose": `Phong cách video bóc tách từ video tham chiếu ${dnaProfile.source || styleId}`,
    "bestFor": [
      "Video phong cách bóc tách thực chiến",
      rh.pacingVelocity || "DYNAMIC EXPLAINER",
      "Shorts / TikTok / Reels 9:16"
    ],
    "notIdealFor": ["Nội dung không hợp nhịp độ bóc tách"],
    "beatSeconds": {
      "min": Math.max(1.5, Number((rh.avgCutIntervalSec * 0.7).toFixed(1))),
      "max": Math.max(3.0, Number((rh.avgCutIntervalSec * 1.4).toFixed(1))),
      "resetEveryBeats": 3
    },
    "script": {
      "hookStyle": "Trích xuất từ video tham chiếu",
      "tone": snd.voiceTone || "Chuyên nghiệp, tự tin",
      "structure": "Hook -> Exploration -> Core Insight -> Climax -> Outro"
    },
    "visual": {
      "palette": {
        "background": background,
        "surface": surface,
        "accentPrimary": accentPrimary,
        "accentSecondary": accentSecondary,
        "positive": "#10B981",
        "negative": "#EF4444"
      },
      "cardStyle": vis.cardArchetype || "Cloned reference card layout",
      "cornerRadius": vis.cornerRadius || 20
    },
    "imagePrompt": {
      "stylePrefix": `style matched to ${displayName}, ${vis.borderStyle || "clean aesthetics"}`,
      "negativePrompt": "low quality, blurry, amateur rendering"
    },
    "motion": {
      "spring": mot.springConfig || { "damping": 16, "stiffness": 140, "mass": 0.8 },
      "entrance": mot.entranceMotion || "slide-up + pop-scale",
      "targetWpm": snd.narrationPacingWpm || 150
    },
    "typography": {
      "headlineFont": typo.headlineFont || "Be Vietnam Pro Bold",
      "bodyFont": typo.bodyFont || "Be Vietnam Pro Regular",
      "safeZoneY": typo.safeZonePaddingY || [260, 1550]
    },
    "audio": {
      "voiceGender": snd.voiceGender || "male",
      "tone": snd.voiceTone || "Hải Đăng studio",
      "bgm": snd.bgmStyle || "Dynamic electronic pulse",
      "targetLufs": -12.5
    },
    "thumbnail": {
      "style": "High-contrast hero frame with key metric and accent glow"
    },
    "renderer": {
      "primary": "remotion",
      "composition": "CanonicalVideo"
    },
    "prohibited": [
      "Khung hình rỗng",
      "Cắt chữ bằng ellipsis",
      "Vi phạm safe zone [260, 1550]"
    ]
  };

  const styleJsonPath = path.join(styleFolder, "style.json");
  fs.writeFileSync(styleJsonPath, JSON.stringify(styleJson, null, 2) + "\n");

  // 2. Write theme.ts
  const themeTsContent = `import { StyleTheme } from "../types";

export const ${pascalName}: StyleTheme = {
  meta: {
    id: "${styleId}",
    version: "1.0.0",
    name: "${displayName}",
    purpose: "Phong cách bóc tách từ video tham chiếu ${dnaProfile.source || styleId}",
    category: "custom",
    bestFor: [
      "Video phong cách bóc tách thực chiến",
      "${rh.pacingVelocity || "DYNAMIC EXPLAINER"}",
      "Shorts / TikTok / Reels 9:16"
    ],
    notIdealFor: ["Nội dung không hợp nhịp độ bóc tách"],
    tags: ["cloned", "dna", "${styleId}"],
    sourceDna: "${dnaProfile.id}",
    previewImage: "contact_sheet.jpg",
  },
  colors: {
    background: "${background}",
    backgroundGradient: "radial-gradient(ellipse at 50% 20%, ${surface} 0%, ${background} 80%)",
    surface: "${surface}",
    surfaceGlass: "${surface}EE",
    border: "${accentPrimary}33",
    borderActive: "${accentPrimary}",
    textPrimary: "${primaryText}",
    textSecondary: "${primaryText}B3",
    textMuted: "${primaryText}66",
    accentPrimary: "${accentPrimary}",
    accentSecondary: "${accentSecondary}",
    positive: "#10B981",
    negative: "#EF4444",
    warning: "${accentSecondary}",
  },
  typography: {
    fontFamily: "'${(typo.headlineFont || "Be Vietnam Pro").split("/")[0].trim()}', system-ui, sans-serif",
    headline: {
      fontSize: ${typo.headlineSize || 64},
      fontWeight: 900,
      lineHeight: 1.15,
      letterSpacing: "-1px",
    },
    subheadline: {
      fontSize: 36,
      fontWeight: 700,
      lineHeight: 1.25,
    },
    cardTitle: {
      fontSize: 38,
      fontWeight: 800,
      lineHeight: 1.25,
    },
    cardBody: {
      fontSize: ${typo.bodySize || 28},
      fontWeight: 600,
      lineHeight: 1.45,
    },
    metricNumber: {
      fontSize: 78,
      fontWeight: 900,
      letterSpacing: "-1px",
    },
    badgeText: {
      fontSize: 22,
      fontWeight: 800,
      letterSpacing: "1px",
      textTransform: "uppercase",
    },
    caption: {
      fontSize: 20,
      fontWeight: 500,
      lineHeight: 1.35,
    },
  },
  subtitles: {
    positionY: ${sub.positionY || 1500},
    activeWordColor: "${sub.activeWordColor || accentPrimary}",
    inactiveWordColor: "${sub.inactiveWordColor || "rgba(255,255,255,0.7)"}",
    backgroundColor: "${background}F0",
    borderRadius: 20,
    padding: "14px 30px",
    fontSize: 34,
    fontWeight: 800,
  },
  springs: {
    snappy: { damping: ${mot.springConfig?.damping || 16}, stiffness: ${mot.springConfig?.stiffness || 140}, mass: ${mot.springConfig?.mass || 0.7} },
    gentle: { damping: 20, stiffness: 95, mass: 1 },
    bounce: { damping: 11, stiffness: 175, mass: 0.75 },
    slow: { damping: 25, stiffness: 55, mass: 1.2 },
  },
  motion: {
    pacingVelocity: "${rh.pacingVelocity || "DYNAMIC EXPLAINER"}",
    avgCutIntervalSec: ${rh.avgCutIntervalSec || 3.0},
    targetWpm: ${snd.narrationPacingWpm || 150},
    entranceMotion: "${mot.entranceMotion || "slide-up + pop-scale"}",
    continuousMotion: "${mot.continuousMotion || "subtle-float"}",
  },
  safeZone: {
    top: 250,
    bottom: 1540,
    paddingX: 50,
  },
};
`;

  const themeTsPath = path.join(styleFolder, "theme.ts");
  fs.writeFileSync(themeTsPath, themeTsContent);

  // 3. Copy contact sheet
  const srcContactSheet = path.join(vaultDir, "raw", "contact_sheet.jpg");
  const destContactSheet = path.join(styleFolder, "contact_sheet.jpg");
  if (fs.existsSync(srcContactSheet)) {
    fs.copyFileSync(srcContactSheet, destContactSheet);
  }

  // 4. Write README.md
  const readmeContent = `# Style: ${displayName} (\`${styleId}\`)

> **Nguồn gốc DNA**: Bóc tách từ video tham chiếu \`${dnaProfile.source || styleId}\`  
> **DNA Vault ID**: \`${dnaProfile.id}\`  
> **Tốc độ đọc đề xuất**: ~${snd.narrationPacingWpm || 150} WPM | **Nhịp cắt cảnh**: ${rh.avgCutIntervalSec || 3.0}s/cảnh

---

## 🎨 Bảng màu (Color Palette)
- **Background**: \`${background}\`
- **Surface**: \`${surface}\`
- **Accent Primary**: \`${accentPrimary}\`
- **Accent Secondary**: \`${accentSecondary}\`

---

## ⚡ Thông số Motion
- **Spring**: \`damping: ${mot.springConfig?.damping || 16}\`, \`stiffness: ${mot.springConfig?.stiffness || 140}\`, \`mass: ${mot.springConfig?.mass || 0.7}\`
- **Chuyển động xuất hiện**: \`${mot.entranceMotion || "slide-up + pop-scale"}\`
- **Phụ đề**: \`y: ${sub.positionY || 1500}\`, highlight từ đang đọc: \`${sub.activeWordColor || accentPrimary}\`
`;
  fs.writeFileSync(path.join(styleFolder, "README.md"), readmeContent);

  // 5. Update styles/registry.json
  let registry = { version: "1.0.0", styles: [] };
  if (fs.existsSync(REGISTRY_PATH)) {
    try {
      registry = JSON.parse(fs.readFileSync(REGISTRY_PATH, "utf8"));
    } catch {
      // ignore
    }
  }

  const existingIndex = registry.styles.findIndex(s => s.id === styleId);
  const entry = {
    id: styleId,
    name: displayName,
    category: "custom",
    purpose: styleJson.purpose,
    bestFor: styleJson.bestFor,
    tags: ["cloned", "dna", styleId],
    path: `styles/${styleId}`,
    targetWpm: snd.narrationPacingWpm || 150,
    avgCutIntervalSec: Number(rh.avgCutIntervalSec) || 3.0,
    sourceDna: dnaProfile.id,
    previewImage: fs.existsSync(destContactSheet) ? `styles/${styleId}/contact_sheet.jpg` : undefined
  };

  if (existingIndex >= 0) {
    registry.styles[existingIndex] = entry;
  } else {
    registry.styles.push(entry);
  }
  registry.updatedAt = new Date().toISOString();
  fs.writeFileSync(REGISTRY_PATH, JSON.stringify(registry, null, 2) + "\n");

  // 6. Update styles/index.ts to re-export the new theme
  updateStylesIndex(styleId, pascalName);

  console.log(`\n🎨 [Style Registry] Đã lưu thành công Style mới vào thư viện:`);
  console.log(`   └─ Style ID: ${styleId}`);
  console.log(`   └─ Thư mục: styles/${styleId}`);
  console.log(`   └─ Theme TS: styles/${styleId}/theme.ts`);
  console.log(`   └─ Registry: styles/registry.json (Tổng: ${registry.styles.length} styles)\n`);

  return { styleId, styleFolder, themeTsPath };
}

function updateStylesIndex(styleId, pascalName) {
  const indexPath = path.join(STYLES_DIR, "index.ts");
  if (!fs.existsSync(indexPath)) return;

  let content = fs.readFileSync(indexPath, "utf8");

  // Check if already imported
  if (!content.includes(`from "./${styleId}/theme"`)) {
    // Add import statement
    const importStmt = `import { ${pascalName} } from "./${styleId}/theme";\n`;
    content = importStmt + content;

    // Add to STYLE_THEMES dictionary
    const targetMap = "export const STYLE_THEMES: Record<string, StyleTheme> = {";
    if (content.includes(targetMap)) {
      content = content.replace(targetMap, `${targetMap}\n  "${styleId}": ${pascalName},`);
    }

    // Add to named exports
    const exportTarget = "export {";
    if (content.includes(exportTarget)) {
      content = content.replace(exportTarget, `${exportTarget}\n  ${pascalName},`);
    }

    fs.writeFileSync(indexPath, content);
  }
}
