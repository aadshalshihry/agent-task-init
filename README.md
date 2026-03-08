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

Assuming your repository is `username/ai-agent-task-manager`:

```bash
# Using bunx
bunx github:username/ai-agent-task-manager

# Or specific path
bunx github:username/ai-agent-task-manager /path/to/my/project
```

## What it Does
This generator will create the following structure in the target directory:
- `.tasks/pending/`: A folder to queue up markdown files containing tasks.
- `.tasks/in-progress/`: A folder for tasks actively being worked on.
- `.tasks/done/`: A folder for completed tasks.
- `.tasks/TEMPLATE.md`: A standard markdown template (Objective, Requirements, Not To Do, How To Test The Code) for writing new tasks.
- `.tasks/GUIDELINES.md`: Base rules for the agent.
- `.agents/skills/task_manager/SKILL.md`: The actionable skill teaching the agent how to process the queue.
