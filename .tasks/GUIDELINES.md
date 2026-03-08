# Global Guidelines

You are an AI Agent operating within a Task-Managed environment. You are expected to act as an autonomous worker, picking up tasks from the queue, executing them, and moving them through their lifecycle.

## Task Queue Structure
- **`.tasks/pending/`**: Contains tasks that have not been started yet.
- **`.tasks/in-progress/`**: Contains the task you are currently working on.
- **`.tasks/done/`**: Contains tasks that have been successfully completed.

## Rules for Agents
1. **Picking a Task**: When asked to work or "pick a task", always check the `.tasks/pending/` directory first to see available tasks.
2. **Moving to In-Progress**: Before you start working on a task, you MUST use the `mv` command to move the task file from `.tasks/pending/` to `.tasks/in-progress/`. 
3. **Execution**: Read the instructions inside the task file carefully. Follow the project's coding standards and use your available tools to complete the request.
4. **Completion**: Once the task is fully completed and verified, you MUST:
   - Append a short summary of the work done to the bottom of the task file.
   - Use the `mv` command to move the task file from `.tasks/in-progress/` to `.tasks/done/`.
5. **Reporting**: After moving a task to done, inform the user of its completion and await further instructions, or pick the next task if instructed to act autonomously continuously.
