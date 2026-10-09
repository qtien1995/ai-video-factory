import re

file_path = r"D:\VIDEO AI\engines\remotion\src\projects\bhsk-congty-du-muon\Scenes.tsx"
with open(file_path, "r", encoding="utf-8") as f:
    content = f.read()

def replace_wrapper(scene_match):
    scene_code = scene_match.group(0)
    
    old_wrapper = re.search(r'<div\s+style=\{\{\s+position: "absolute",\s+left: "50%",\s+top: \d+,\s+transform: `translateX\(-50%\) scale\(\$\{0\.92 \+ progress \* 0\.08\}\)`,.*?opacity: progress,\s+\}\}\s+>', scene_code, re.DOTALL)
    if not old_wrapper:
        print("Could not find wrapper in a scene!")
        return scene_code
        
    new_wrapper = """<div
      style={{
        position: "absolute",
        left: 0,
        right: 0,
        top: 220,
        bottom: 220,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 20,
        opacity: progress,
      }}
    >
      <div
        style={{
          width: 960,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 36,
          transform: `scale(${0.92 + progress * 0.08})`,
        }}
      >"""
      
    scene_code = scene_code.replace(old_wrapper.group(0), new_wrapper)
    
    parts = scene_code.rsplit('    </div>\n  );\n};', 1)
    if len(parts) == 2:
        scene_code = parts[0] + '      </div>\n    </div>\n  );\n};' + parts[1]
        
    scene_code = re.sub(r'\s*marginTop:\s*\d+,', '', scene_code)
    scene_code = re.sub(r'\s*margin:\s*"14px 0",', '', scene_code)
    
    return scene_code

scenes = [
    "HospitalTapScene",
    "UmbrellaBorrowScene",
    "PreExistingTensionScene",
    "ExclusionConsequenceScene",
    "TwoTierShieldStrategyScene",
    "TakeawayCloseScene"
]

for scene in scenes:
    pattern = rf'export const {scene}: React\.FC<{{ progress: number }}> = \({{ progress }}\) => {{.*?  \);\n}};'
    content = re.sub(pattern, replace_wrapper, content, flags=re.DOTALL)

with open(file_path, "w", encoding="utf-8") as f:
    f.write(content)

print("Done fixing Scenes.tsx!")
