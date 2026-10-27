import os
import sys
from pathlib import Path

root = Path(r"d:\AI\VIDEO AI")
output_path = root / "V4_BLUEPRINT_CONTEXT.md"

sections = [
    ("1. Tài liệu cốt lõi (Root Core Docs)", [
        "AGENTS.md",
        "README.md"
    ]),
    ("2. Cấu hình hệ thống (System Configs)", [
        "config/component-index.json",
        "config/factory-config.json",
        "config/gen-video.json"
    ]),
    ("3. Nhận diện thương hiệu mẫu (Brand & Creator Configs)", [
        "brand/manulife/brand.json",
        "brand/manulife/creator.json"
    ]),
    ("4. Hợp đồng kỹ thuật & Schemas (Core Contracts & Schemas)", [
        p.relative_to(root).as_posix()
        for p in sorted(list((root / "core/contracts").rglob("*")) + list((root / "core/schemas").rglob("*")))
        if p.is_file()
    ]),
    ("5. Scripts điều hướng & Factory Core", [
        "core/scripts/prompts/index.js",
        "core/scripts/router/index.js",
        "core/scripts/style/exporter.js",
        "core/scripts/factory/index.js"
    ]),
    ("6. Kỹ năng & Hướng dẫn Remotion (.agents/skills)", [
        ".agents/skills/remotion-explainer/SKILL.md",
        ".agents/skills/remotion-markup/3d.md"
    ]),
    ("7. Bộ Style Presets (Styles JSON)", [
        p.relative_to(root).as_posix()
        for p in sorted((root / "styles").rglob("*.json"))
        if p.is_file()
    ]),
    ("8. Mã nguồn Remotion CanonicalVideo & Shared Core (.ts / .tsx)", [
        p.relative_to(root).as_posix()
        for p in sorted(list((root / "engines/remotion/src/CanonicalVideo").rglob("*")) + list((root / "engines/remotion/src/shared").rglob("*")))
        if p.is_file() and p.suffix in [".ts", ".tsx"]
    ])
]

def get_fence(content: str) -> str:
    max_b = 0
    cur_b = 0
    for ch in content:
        if ch == '`':
            cur_b += 1
            if cur_b > max_b:
                max_b = cur_b
        else:
            cur_b = 0
    count = max(3, max_b + 1)
    return '`' * count

ext_map = {
    ".md": "markdown",
    ".json": "json",
    ".js": "javascript",
    ".ts": "typescript",
    ".tsx": "tsx",
    ".css": "css",
    ".html": "html"
}

lines = []
lines.append("# V4 BLUEPRINT CONTEXT - AGGREGATED CODEBASE & CONFIGS")
lines.append("")
lines.append("> Tài liệu tổng hợp toàn bộ mã nguồn lõi, hợp đồng dữ liệu, cấu hình và skills của Video AI Factory V4.")
lines.append("> Tự động trích xuất và gom nhóm để phục vụ kiến trúc & phát triển.")
lines.append("")
lines.append("## Mục lục (Table of Contents)")
lines.append("")

total_files = 0
for group_title, file_list in sections:
    lines.append(f"### {group_title}")
    for rel_path in file_list:
        p = root / rel_path
        if p.suffix.lower() in [".jpg", ".jpeg", ".png"] or p.name == "package-lock.json":
            continue
        if p.exists():
            total_files += 1
            anchor = rel_path.replace("/", "-").replace(".", "-").replace("_", "-").lower()
            lines.append(f"- [{rel_path}](#file-{anchor})")
    lines.append("")

lines.append("---")
lines.append("")

written_count = 0
for group_title, file_list in sections:
    lines.append(f"# {group_title}")
    lines.append("")
    for rel_path in file_list:
        p = root / rel_path
        if p.suffix.lower() in [".jpg", ".jpeg", ".png"] or p.name == "package-lock.json":
            continue
        if not p.exists():
            print(f"Warning: File not found: {rel_path}", file=sys.stderr)
            continue

        try:
            content = p.read_text(encoding="utf-8")
        except UnicodeDecodeError:
            content = p.read_text(encoding="utf-8", errors="replace")

        ext = p.suffix.lower()
        lang = ext_map.get(ext, "")
        fence = get_fence(content)
        anchor = rel_path.replace("/", "-").replace(".", "-").replace("_", "-").lower()

        lines.append(f"## File: `{rel_path}` <a id=\"file-{anchor}\"></a>")
        lines.append("")
        lines.append(f"{fence}{lang}")
        lines.append(content)
        lines.append(f"{fence}")
        lines.append("")
        lines.append("---")
        lines.append("")
        written_count += 1

output_text = "\n".join(lines)
output_path.write_text(output_text, encoding="utf-8")

actual_lines = len(output_text.splitlines())
size_kb = len(output_text.encode('utf-8')) / 1024
print(f"SUCCESS: Generated {output_path.name}")
print(f"Total files written: {written_count}")
print(f"Output file size: {size_kb:.2f} KB ({actual_lines} lines)")
