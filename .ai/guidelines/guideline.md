# How to Use the Task Manager Skill

This guideline outlines how AI agents should use the Task Manager skill to act as autonomous workers by picking up tasks from the `.tasks/pending` directory, working on them, and moving them to `.tasks/done`.

## Directory Structure

The Task Manager system uses a simple file-based approach to track work:
- **Pending Tasks**: `.tasks/pending/`
- **Active Tasks**: `.tasks/in-progress/`
- **Completed Tasks**: `.tasks/done/`

## Instructions for Task Execution

Whenever instructed to process the queue or pick up a task autonomously, follow these specific steps:

### 1. Read the Guidelines
If new to the project or needing a refresher, use the `view_file` tool to read `.tasks/GUIDELINES.md` to understand the specific project rules.

### 2. Check Pending Tasks
Use the `list_dir` tool on the `.tasks/pending/` directory to see what tasks are available.
If the directory is empty, inform the user that there are no pending tasks.
Otherwise, choose the first (or highest priority) task listed.

### 3. Claim the Task
Before starting any work, you MUST move the file to indicate you have claimed it.
Use the `run_command` tool to execute:
`mv .tasks/pending/<task-file.md> .tasks/in-progress/`

### 4. Read the Task Details
Use the `view_file` tool to read the contents of the task file now located at `.tasks/in-progress/<task-file.md>`. 
Carefully understand the objective, requirements, and context provided in the file.

### 5. Execute the Task
Use available tools (reading code, modifying files, running commands, etc.) to accomplish the goals described in the task file.

### 6. Mark as Done
Once confident the task is successfully completed:
- Use the `run_command` tool (or file editing tools) to append a brief summary of the resolution to the bottom of the task file.
- Use the `run_command` tool to execute:
  `mv .tasks/in-progress/<task-file.md> .tasks/done/`

### 7. Report / Continue
Inform the user that the task is complete. If instructed to process the entire queue autonomously, return to Step 2. Otherwise, await further instructions.
