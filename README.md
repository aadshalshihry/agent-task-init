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

### 1. Generating a Task Breakdown (Planning)
If you have a large feature to build and want the agent to figure out the steps, you can ask the agent to act as a planner and populate the task queue for you.

> *"I want to build [insert feature]. Please act as a planner. Break this down into multiple small, sequential tasks and create a new markdown file for each step in `.tasks/pending/` using the `.tasks/TEMPLATE.md` format."*

The agent will analyze your request and generate `01-setup.md`, `02-database.md`, `03-api.md`, etc., directly into the pending queue.

### 2. Executing the Tasks (Doing)
Once the task structure is generated and you are happy with the breakdown in `.tasks/pending/`, you can trigger the agent to start working:

> *"Please use your task_manager skill to read and process the pending queue."*

The agent will read the global guidelines and autonomously move files between `pending`, `in-progress`, and `done` as it works.
