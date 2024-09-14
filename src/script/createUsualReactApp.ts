import { execSync } from "child_process";
import * as fs from "fs-extra";
import inquirer from "inquirer";
import path from "path";
import installTailwind from "./installTailwind";
import installRouter from "./installRouter";
import installRedux from "./installRedux";
import installAxios from "./installAxios";

export default async function createUsualReactApp() {
  console.log("I will create a usual React App with React and TypeScript... But first I need some questions...");
  await askQuestions();
}

const askQuestions = async (): Promise<void> => {
  const answers = await inquirer.prompt([
    {
      type: "confirm",
      name: "tailwind",
      message: "Do you want to add Tailwind CSS?",
    },
    {
      type: "confirm",
      name: "router",
      message: "Do you want to add Router?",
    },
    {
      type: "confirm",
      name: "redux",
      message: "Do you want to add Redux?",
    },
    {
      type: "confirm",
      name: "axios",
      message: "Do you want to add Axios?",
    }
  ]);

  reactApp();

  if (answers.tailwind)  installTailwind();

  if (answers.router) installRouter();

  if (answers.redux) installRedux();

  if (answers.axios) installAxios();
};

function installAlias() {
  console.log("Installing alias...");
  execSync("npm i -D @types/node", { stdio: "inherit" });

  updateViteConfig();
  updateTsConfig();
  updateTsConfigApp();

  console.log("Alias installed successfully!");
}

function updateViteConfig() {
  try {
    const viteConfigPath = path.join(process.cwd(), "vite.config.ts");
    const viteConfig = `
    import path from "path"
    import react from "@vitejs/plugin-react"
    import { defineConfig } from "vite"
  
    export default defineConfig({
      plugins: [react()],
      resolve: {
        alias: {
          "@": path.resolve(__dirname, "./src"),
        },
      },
    })
    `;

    fs.writeFileSync(viteConfigPath, viteConfig);
    console.log("Updated vite.config.ts");
  } catch (error) {
    console.log("Error updating vite.config.ts:", error);
  }
}

function updateTsConfig() {
  try {
    const tsconfigPath = path.join(process.cwd(), "tsconfig.json");
    let tsconfigContent = fs.readFileSync(tsconfigPath, "utf8");
    let tsconfig = JSON.parse(tsconfigContent);

    tsconfig.compilerOptions = {
      ...(tsconfig.compilerOptions || {}),
      baseUrl: ".",
      paths: {
        "@/*": ["./src/*"],
      },
    };

    fs.writeFileSync(tsconfigPath, JSON.stringify(tsconfig, null, 2), "utf8");
    console.log("tsconfig.json updated successfully!");
  } catch (error) {
    console.log("Error updating tsconfig.json:", error);
  }
}

function updateTsConfigApp() {
  try {
    const tsconfigAppJsonPath = path.join(process.cwd(), "tsconfig.app.json");
    let tsconfigAppJsonContent = fs.readFileSync(tsconfigAppJsonPath, "utf8");

    // Remove BOM if present
    tsconfigAppJsonContent = tsconfigAppJsonContent.replace(/^\uFEFF/, '');
    
    // Remove comments
    tsconfigAppJsonContent = tsconfigAppJsonContent.replace(/\/\*[\s\S]*?\*\/|([^:]|^)\/\/.*$/gm, '$1');

    let tsconfigAppJson;
    try {
      tsconfigAppJson = JSON.parse(tsconfigAppJsonContent);
    } catch (parseError) {
      console.error("Error parsing tsconfig.app.json:", parseError);
      console.log("Attempting to fix the JSON format...");
    }


    tsconfigAppJson.compilerOptions = {
      ...tsconfigAppJson.compilerOptions,
      baseUrl: ".",
      paths: {
        "@/*": ["./src/*"],
      },
    };


    fs.writeFileSync(
      tsconfigAppJsonPath,
      JSON.stringify(tsconfigAppJson, null, 2),
      "utf8"
    );
    console.log("tsconfig.app.json updated successfully!");
  } catch (error) {
    console.error("Error updating tsconfig.app.json:", error);
  }
}

function reactApp() {
  console.log("Creating a usual React App with React and TypeScript...");

  try {
    // execSync("npm create vite@latest . -- --template react-ts", {
    //   stdio: "inherit",
    // });
    // execSync("npm i", { stdio: "inherit" });
    // fs.ensureDirSync("./src/components");
    installAlias();
    console.log("React App with TypeScript created successfully!");
  } catch (error) {
    console.error("Error occurred while creating the React app:", error);
  }
}
