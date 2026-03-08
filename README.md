# AI Agent Task Manager

This is a CLI tool designed to inject an AI Agent Task Manager into **any** project directory. It provides a standard file-based queue and agent instructions (skills) to help LLM agents act autonomously.

## Installation & Usage

### Running Locally
You can run it directly using `bun` from the source code:

```bash
# Run in the current directory
bun run index.ts

# Run in a specific directory
bun run index.ts /path/to/my/project
```

Or you can link it globally:

```bash
bun link
init-task-manager /path/to/my/project
```

### Running Directly from GitHub
Once you push this project to a GitHub repository, you can execute it instantly in any project without downloading the source code manually. 

Assuming your repository is `username/agent-task-init`:

```bash
# Using bunx (Requires prefixing the package name before the github URL)
bunx agent-task-init@github:username/agent-task-init

# Or specific path
bunx agent-task-init@github:username/agent-task-init /path/to/my/project

# Alternatively, using npx:
npx --yes github:username/agent-task-init /path/to/my/project
```

## How to Instruct the Agent
Once the task structure is generated, you write your tasks inside `.tasks/pending/` (using `.tasks/TEMPLATE.md` as a starting point). 

To trigger the agent to work, you can simply message it:
> *"Please use your task_manager skill to read and process the pending queue."*

The agent will read the global guidelines and autonomously move files between `pending`, `in-progress`, and `done` as it works.
