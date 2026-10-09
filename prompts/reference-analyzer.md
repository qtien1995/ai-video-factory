# VIDEO FACTORY — MOTION DNA ANALYZER

## Mục tiêu

Phân tích reference video để thư viện học **cách video kể bằng chuyển động**, không sao chép video.

Không lưu hay tái sử dụng footage, nhạc, asset nhận diện hoặc shot cụ thể nếu chưa có quyền.

## Phân tích bắt buộc

- Core visual object/hệ thống và object lifecycle: start → state changes → end.
- Story pattern, hook pattern và scene continuity.
- Visual action per beat.
- Motion grammar và camera grammar.
- Typography behavior, text dependency, information density, pacing, hierarchy.
- Transition logic, audio role, slide-risk và anti-patterns.
- Reusable primitives, reusable story pattern, complexity và những yếu tố không copy.

## Output

Lưu ở `D:\VIDEO AI\creative-library\references\<reference-id>\analysis.json`.

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
