# Personal React Project Creator CLI

This is a personal Command Line Interface (CLI) tool for quickly setting up React projects with a preferred folder structure and configurations. It's designed for personal use and to streamline the process of starting new React projects.

## Features

- Creates a new React project using Vite and TypeScript
- Sets up a preferred folder structure
- Configures aliases for easier imports
- Optionally installs and configures Tailwind CSS

## Installation

Since this is a personal tool, it's not published to npm. To use it:

1. Clone this repository to your local machine
2. Navigate to the project directory
3. Run `npm install` to install dependencies
4. Run `npm run build` to build the project
5. Run `npm link` to create a global symlink

## Usage

To create a new React project:

```
friday create
```

Replace "friday" with whatever name you decide to use for your CLI tool.

This command will:
1. Create a new Vite React project with TypeScript
2. Set up the preferred folder structure
3. Configure aliases
4. Prompt for additional options (like Tailwind CSS installation)

## Customization

Feel free to modify the CLI tool to add or remove features as needed. The main logic is in the `createUsualReactApp.ts` file.

## Note

This tool is for personal use and may change over time. The current name "friday" is temporary and may be changed in the future.

## Troubleshooting

If you encounter any issues:
1. Ensure you're using the latest version of Node.js
2. Try deleting the `node_modules` folder and running `npm install` again
3. If you've made changes, rebuild the project with `npm run build` and run `npm link` again

## Future Plans

- Feeling to lazy to write now