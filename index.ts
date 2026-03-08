#!/usr/bin/env bun
import { mkdir, writeFile } from 'fs/promises';
import { existsSync } from 'fs';
import { join, resolve } from 'path';

async function initTaskManager() {
  const targetDir = resolve(process.argv[2] || process.cwd());
  console.log(`Initializing AI Agent Task Manager in: ${targetDir}`);

  const dirs = [
    '.tasks/pending',
    '.tasks/in-progress',
    '.tasks/done',
    '.agents/skills/task_manager',
  ];

  // Create directories
  for (const dir of dirs) {
    const dirPath = join(targetDir, dir);
    if (!existsSync(dirPath)) {
      await mkdir(dirPath, { recursive: true });
      console.log(`Created directory: ${dir}`);
    }
  }

  // Guidelines Content
  const guidelinesContent = `# Global Guidelines

You are an AI Agent operating within a Task-Managed environment. You are expected to act as an autonomous worker, picking up tasks from the queue, executing them, and moving them through their lifecycle.

## Task Queue Structure
- **\`.tasks/pending/\`**: Contains tasks that have not been started yet.
- **\`.tasks/in-progress/\`**: Contains the task you are currently working on.
- **\`.tasks/done/\`**: Contains tasks that have been successfully completed.

## Rules for Agents
1. **Picking a Task**: When asked to work or "pick a task", always check the \`.tasks/pending/\` directory first to see available tasks.
2. **Moving to In-Progress**: Before you start working on a task, you MUST use the \`mv\` command to move the task file from \`.tasks/pending/\` to \`.tasks/in-progress/\`. 
3. **Execution**: Read the instructions inside the task file carefully. Follow the project's coding standards and use your available tools to complete the request.
4. **Completion**: Once the task is fully completed and verified, you MUST:
   - Append a short summary of the work done to the bottom of the task file.
   - Use the \`mv\` command to move the task file from \`.tasks/in-progress/\` to \`.tasks/done/\`.
5. **Reporting**: After moving a task to done, inform the user of its completion and await further instructions, or pick the next task if instructed to act autonomously continuously.
`;

  // Skill Content
  const skillContent = `---
name: task_manager
description: How to act as an autonomous worker by picking up tasks from the \`.tasks/pending\` directory, working on them, and moving them to \`.tasks/done\`.
---

# Task Manager Skill

This skill enables you to act as an autonomous worker, managing your own task queue within any project that utilizes the \`.tasks\` directory structure.

## Overview

The Task Manager system uses a simple file-based approach to track work.
- **Pending Tasks**: \`.tasks/pending/\`
- **Active Tasks**: \`.tasks/in-progress/\`
- **Completed Tasks**: \`.tasks/done/\`

## Instructions

Whenever you are instructed to use the Task Manager, process the queue, or pick up a task, follow these precise steps:

### 1. Read the Guidelines
If you are new to the project or haven't read them recently, use the \`view_file\` tool to read \`.tasks/GUIDELINES.md\` to understand the specific rules of the project.

### 2. Check Pending Tasks
Use the \`list_dir\` tool on the \`.tasks/pending/\` directory to see what tasks are available.
If the directory is empty, inform the user that there are no pending tasks.
Otherwise, choose the first (or highest priority) task listed.

### 3. Claim the Task
Before starting any work, you MUST move the file to indicate you have claimed it.
Use the \`run_command\` tool to execute:
\`mv .tasks/pending/<task-file.md> .tasks/in-progress/\`

### 4. Read the Task Details
Use the \`view_file\` tool to read the contents of the task file now located at \`.tasks/in-progress/<task-file.md>\`. 
Carefully understand the objective, requirements, and context provided in the file.

### 5. Execute the Task
Use your available tools (reading code, modifying files, running commands, etc.) to accomplish the goals described in the task file.

### 6. Mark as Done
Once you are confident the task is successfully completed:
- Use the \`run_command\` tool (or file editing tools) to append a brief summary of the resolution to the bottom of the task file.
- Use the \`run_command\` tool to execute:
  \`mv .tasks/in-progress/<task-file.md> .tasks/done/\`

### 7. Report / Continue
Inform the user that the task is complete. If the user instructed you to process the entire queue autonomously, return to Step 2. Otherwise, await further instructions.
`;
  // Template Content
  const templateContent = `# Task Title

## Objective
[Clear and concise description of what needs to be achieved in this task]

## Requirements
- [Requirement 1: e.g., Implement X using Y]
- [Requirement 2: e.g., Ensure the output is formatted as Z]
- [Requirement 3]

## Not To Do
- [Anti-pattern 1: e.g., Do NOT modify the core database schema]
- [Anti-pattern 2: e.g., Do NOT use external libraries]

## How To Test The Code
1. [Step 1 to verify functionality]
2. [Step 2 to verify edge cases]
3. [Expected outcome of the tests]
`;

  // Write files
  const guidelinesPath = join(targetDir, '.tasks', 'GUIDELINES.md');
  if (!existsSync(guidelinesPath)) {
    await writeFile(guidelinesPath, guidelinesContent);
    console.log('Created .tasks/GUIDELINES.md');
  }

  const skillPath = join(targetDir, '.agents', 'skills', 'task_manager', 'SKILL.md');
  if (!existsSync(skillPath)) {
    await writeFile(skillPath, skillContent);
    console.log('Created .agents/skills/task_manager/SKILL.md');
  }

  const templatePath = join(targetDir, '.tasks', 'TEMPLATE.md');
  if (!existsSync(templatePath)) {
    await writeFile(templatePath, templateContent);
    console.log('Created .tasks/TEMPLATE.md');
  }

  console.log("Task Manager initialization complete!");
}

initTaskManager().catch(console.error);
