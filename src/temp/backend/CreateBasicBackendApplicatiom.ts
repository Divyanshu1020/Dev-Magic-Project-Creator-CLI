import chalk from "chalk";
import { execSync } from "child_process";
import fs from "fs-extra";
import inquirer from "inquirer";
import {
  APPJS_TEMPLATE,
  INDEXJS_TEMPLATE,
  README_TEMPLATE,
} from "./boilerplate/BasicFileTemplate";
import GraphQLSetup from "./GraphQlSetup";
import KafkaSetup from "./KafkaSetup";
import PrismaSetup from "./PrismaSetup";
import RedisSetup from "./RedisSetup";
import SocketIOSetup from "./SocketSetup";
import SwaggerSetup from "./SwaggerSetup";

async function backendApp(isTypeScript: boolean) {
  console.log(
    chalk.yellowBright(
      `👷 Creating a Node Backend App with ${
        isTypeScript ? "TypeScript" : "JavaScript"
      }...`
    )
  );

  try {
    // Initialize Node project
    execSync(`npm init -y`, { stdio: "inherit" });

    // Create folder structure
    console.log(chalk.green("📁 Creating folder structure..."));
    fs.ensureDirSync("./public");
    fs.ensureDirSync("./src/controllers");
    fs.ensureDirSync("./src/db");
    fs.ensureDirSync("./src/middlewares");
    fs.ensureDirSync("./src/models");
    fs.ensureDirSync("./src/routes");
    fs.ensureDirSync("./src/utils");

    // Create basic files
    const ext = isTypeScript ? "ts" : "js";
    fs.writeFileSync(`./src/index.${ext}`, INDEXJS_TEMPLATE);
    fs.writeFileSync(`./src/app.${ext}`, APPJS_TEMPLATE);
    fs.ensureFileSync(`./src/constants.${ext}`);
    fs.writeFileSync("./.env", "");
    fs.ensureFileSync("./.env-sample");
    fs.writeFileSync("./.gitignore", "node_modules\n.env\n.env.*");
    fs.writeFileSync(
      "./.prettierignore",
      "/.vscode\n./dist\nnode_modules\nbuild\ndist\ncoverage\n*.log\n*.env\n.env\n.env.*"
    );
    fs.writeFileSync(
      "./.prettierrc",
      JSON.stringify(
        { semi: false, singleQuote: true, tabWidth: 2, trailingComma: "all" },
        null,
        2
      )
    );
    fs.writeFileSync("./README.md", README_TEMPLATE);

    // Adjust package.json scripts based on TypeScript or JavaScript
    const packageJson = JSON.parse(
      fs.readFileSync("./package.json").toString()
    );

    packageJson.scripts = {
      start: isTypeScript
        ? "npm run build && node dist/index.js" // Compiled JS in the dist folder for TypeScript
        : "node src/index.js",
      dev: isTypeScript
        ? 'tsc-watch --onSuccess "npm start"'
        : "nodemon -r dotenv/config --experimental-json-modules src/index.js",
      build: isTypeScript ? "tsc" : "", // Build script for TypeScript to compile the project
    };

    packageJson.main = isTypeScript ? "dist/src/index.js" : "src/index.js";
    packageJson.type = "module";
    fs.writeFileSync("./package.json", JSON.stringify(packageJson, null, 2));

    // Install dependencies
    console.log(chalk.green("📦 Installing dependencies..."));
    const dependencies = [
      "express",
      "dotenv",
      "cors",
      "cookie-parser",
      "nodemon",
    ];
    const devDependencies = isTypeScript
      ? [
          "typescript",
          "tsc-watch",
          "ts-node",
          "@types/node",
          "@types/express",
          "@types/cookie-parser",
          "@types/cors",
        ]
      : [];

    // Install core dependencies and TypeScript-specific dev dependencies if needed
    execSync(`npm install ${dependencies.join(" ")}`, {
      stdio: "inherit",
    });

    // TypeScript-specific setup
    if (isTypeScript) {
      execSync(`npm install -D ${devDependencies.join(" ")}`, {
        stdio: "inherit",
      });
      console.log(chalk.green("🔧 Setting up TypeScript configuration..."));
      fs.writeFileSync(
        "./tsconfig.json",
        JSON.stringify(
          {
            compilerOptions: {
              target: "ES2020",
              module: "esnext",
              strict: true,
              esModuleInterop: true,
              outDir: "./dist",
              rootDir: "./src",
              resolveJsonModule: true,
              skipLibCheck: true,
              moduleResolution: "node10",
            },
            include: ["src/**/*.ts", "src/**/*.yaml"],
            exclude: ["node_modules"],
          },
          null,
          2
        )
      );
    }

    console.log(
      chalk.greenBright(
        `🎉 Node Backend App with ${
          isTypeScript ? "TypeScript" : "JavaScript"
        } created successfully!`
      )
    );
  } catch (error) {
    console.error(chalk.red(`❌ Error occurred: ${error}`));
  }
}

const askQuestions = async (): Promise<void> => {
  console.log(chalk.blueBright(` Embarking on a journey to build an epic Node.js backend!\n`));

  try {
    const answers = await inquirer.prompt([
      {
        type: "list",
        name: "language",
        message: chalk.cyan("Would you prefer TypeScript or JavaScript for this conjuration?"),
        choices: ["TypeScript", "JavaScript"],
        default: "JavaScript",
      },
      {
        type: "confirm",
        name: "socket",
        message: chalk.cyan("Shall we summon the power of Socket Server?"),
        default: true,
      },
      {
        type: "confirm",
        name: "graphql",
        message: chalk.cyan("Invoke GraphQL's wisdom?"),
        default: true,
      },
      {
        type: "confirm",
        name: "kafka",
        message: chalk.cyan("Channel Kafka for event magic?"),
        default: true,
      },
      {
        type: "confirm",
        name: "redis",
        message: chalk.cyan("Shall we employ Redis as a memory keeper?"),
        default: true,
      },
      {
        type: "confirm",
        name: "prisma",
        message: chalk.cyan("Would you like to include Prisma as your data alchemist?"),
        default: true,
      },
      {
        type: "confirm",
        name: "swagger",
        message: chalk.cyan("Summon Swagger for API prophecy?"),
        default: true,
      },
    ]);

    const isTypeScript = answers.language === "TypeScript";
    await backendApp(isTypeScript);

    if (answers.graphql) await GraphQLSetup();
    if (answers.kafka) await KafkaSetup();
    if (answers.redis) await RedisSetup();
    if (answers.prisma) await PrismaSetup();
    if (answers.socket) await SocketIOSetup();
    if (answers.swagger) await SwaggerSetup();

  } catch (error: any) {
    if (error.isTtyError) {
      console.log(chalk.red("\n ❌ The summoning ritual was interrupted. 🚨"));
    }
  }
};


// Main function to start the CLI
export default async function createBasicBackendApplication() {
  await askQuestions();
}
