# Dirty Graph Rule

The factory CLI checks artifact hashes and upstream stage signatures on every `status` or `check`. A changed or missing input makes that stage and all later stages dirty; DONE cannot remain valid.

When deliberately changing an earlier completed step, run `node core/scripts/factory/index.js dirty --project <id> --stage <STAGE>`. This clears its completion and downstream completions while preserving project files. Re-record the corrected stage and pass required user gates again.
