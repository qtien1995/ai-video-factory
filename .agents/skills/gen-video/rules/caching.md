# Caching & Fingerprinting Rule

Use the factory CLI. `tts` skips generation when the approved script, voice settings and audio artifacts match its recorded signature. Render signatures include VideoSpec, actual narration bytes, local assets, engine source/package and factory configuration. A missing or changed artifact is a cache miss.

Run `status` or `check` to see the first dirty stage. Do not use the old fingerprint CLI for production decisions.
