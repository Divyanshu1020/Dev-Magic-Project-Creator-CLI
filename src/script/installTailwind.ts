import { execSync } from "child_process";
import fs from "fs";
import path from "path";

export default function installTailwind(): void {
  console.log("Installing Tailwind CSS...");
  execSync("npm install -D tailwindcss postcss autoprefixer", {
    stdio: "inherit",
  });
  execSync("npx tailwindcss init -p", { stdio: "inherit" });

  const tailwindConfigPath = path.join(process.cwd(), "tailwind.config.js");

  let cssContent = fs.readFileSync(tailwindConfigPath, "utf8");

  const newContentPaths = `  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],`;

  const contentRegex = /content:\s*\[\s*\]/;

  cssContent = cssContent.replace(contentRegex, newContentPaths);

  fs.writeFileSync(tailwindConfigPath, cssContent, "utf8");

  console.log("Tailwind CSS config updated successfully!");

  const indexCss = `
    @tailwind base;
    @tailwind components;
    @tailwind utilities;
  `;
  fs.appendFileSync("./src/index.css", indexCss);
  fs.rmSync("./src/App.css");

  console.log("Tailwind CSS setup completed!");
}
