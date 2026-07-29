# Focus-Hub `.opencode/`

Project-local opencode directory. Holds project-only persona subagents in `agents/`.

## `agents/`
Empty — Focus-Hub uses the generic role subagents (web/react-native/node/go-developer, test-creator/runner, design/code-reviewer, db-engineer) from `../.global/agents/` (symlinked into `~/.config/opencode/agents/`).

Add project-only personas here ONLY if Focus-Hub needs a role not covered by the generic roster. Follow `../.global/guidelines/agent-onboarding.md`. Note: every `.md` file in this folder is parsed as an agent definition — do NOT place README/non-agent files here.
