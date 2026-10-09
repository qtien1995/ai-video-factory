# Engine Selection Rule

1. AUTO uses `factory-config.json`: Remotion primary, HyperFrames fallback when Remotion cannot support the spec. Explicit `--engine` overrides AUTO only if compatible.
2. Use `node core/scripts/factory/index.js render --project <id> --kind preview [--engine REMOTION|HYPERFRAMES]` after recording production. Use `--kind final` only after Gate 3.
3. The CLI requires an actual MP4 and technical QA report; an adapter's success flag alone is insufficient.
