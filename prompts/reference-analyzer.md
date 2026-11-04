# VIDEO FACTORY — MOTION DNA ANALYZER

## Mục tiêu

Phân tích reference video để thư viện học **nhịp và số liệu chuyển động** (nhịp cắt, LUFS, mật độ chữ), TUYỆT ĐỐI KHÔNG sao chép bố cục hay sinh style.

Không lưu hay tái sử dụng footage, nhạc, asset nhận diện hoặc shot cụ thể của video mẫu.

## Phân tích bắt buộc

- Core visual object/hệ thống và object lifecycle: start → state changes → end.
- Story pattern, hook pattern và scene continuity.
- Visual action per beat.
- Motion grammar và camera grammar.
- Typography behavior, text dependency, information density, pacing, hierarchy.
- Transition logic, audio role, slide-risk và anti-patterns.
- Reusable primitives, reusable story pattern, complexity và những yếu tố không copy.

## Output

Lưu tại `dna-vault/<reference-id>/analysis.json` qua lệnh:
```bash
npm run dna -- analyze <video.mp4>
```

```json
{
  "pattern": "Evolving Hero",
  "coreVisualObject": "Tree",
  "objectLifecycle": ["seed", "trunk", "branch", "mature tree"],
  "continuity": "high",
  "textDependency": "low",
  "motionGrammar": ["draw", "grow", "stagger", "focus", "reveal"],
  "reusablePrimitives": ["svg-path-draw", "counter", "camera-focus"],
  "slideRisk": "low",
  "doNotCopy": ["branded artwork", "exact scene sequence"]
}
```
