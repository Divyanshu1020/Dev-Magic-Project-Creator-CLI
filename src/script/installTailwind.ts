import { execSync } from "child_process";
import fs from "fs";
import path from "path";

export default function installTailwind(): void {
  console.log("Installing Tailwind CSS...");
  execSync("npm install -D tailwindcss postcss autoprefixer", {
    stdio: "inherit",
  });

  const tailwindConfigPath = path.join(process.cwd(), "tailwind.config.js");
  const postcssConfigPath = path.join(process.cwd(), "postcss.config.js");

  if (!fs.existsSync(tailwindConfigPath) || !fs.existsSync(postcssConfigPath)) {
    execSync("npx tailwindcss init -p", { stdio: "inherit" });
  } else {
    console.log(
      "Tailwind and PostCSS config files already exist. Skipping initialization."
    );
  }

  if (fs.existsSync(tailwindConfigPath)) {
    let cssContent = fs.readFileSync(tailwindConfigPath, "utf8");

    const newContentPaths = `  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    ],`;

    const contentRegex = /content:\s*\[\s*\]/;

    if (contentRegex.test(cssContent)) {
      cssContent = cssContent.replace(contentRegex, newContentPaths);
      fs.writeFileSync(tailwindConfigPath, cssContent, "utf8");
      console.log("Tailwind CSS config updated successfully!");
    } else {
      console.log(
        "Tailwind CSS config already contains content paths. Skipping update."
      );
    }
  }

  const indexCssPath = path.join(process.cwd(), "src", "index.css");
  const indexCss = `
    @tailwind base;
    @tailwind components;
    @tailwind utilities;
  `;

  if (fs.existsSync(indexCssPath)) {
    const existingContent = fs.readFileSync(indexCssPath, "utf8");
    if (!existingContent.includes("@tailwind")) {
      fs.appendFileSync(indexCssPath, indexCss);
      console.log("Tailwind directives added to index.css");
    } else {
      console.log(
        "Tailwind directives already present in index.css. Skipping update."
      );
    }
  } else {
    fs.writeFileSync(indexCssPath, indexCss);
    console.log("index.css created with Tailwind directives");
  }

  const appCssPath = path.join(process.cwd(), "src", "App.css");
  if (fs.existsSync(appCssPath)) {
    fs.unlinkSync(appCssPath);
    console.log("App.css removed");
  } else {
    console.log("App.css not found. Skipping removal.");
  }

  console.log("Tailwind CSS setup completed!");
}
