#!/usr/bin/env node

import chalk from "chalk";
import { Command } from "commander";

import createBasicBackendApplication from "./temp/backend/CreateBasicBackendApplicatiom";
import SwaggerSetup from "./temp/backend/SwaggerSetup";
import printWelcome from "./utils/PrintWelcome";
import createUsualReactApp from "./temp/frontend/CreateBasicRectApp";
import SetupRedux from "./temp/frontend/SetupRedux";
import SetupAxios from "./temp/frontend/SetupAxios";
import { SetupTailwind } from "./temp/frontend/SetupTailwind";
import SocketIOSetup from "./temp/backend/SocketSetup";
import RedisSetup from "./temp/backend/RedisSetup";
import KafkaSetup from "./temp/backend/KafkaSetup";
import GraphQLSetup from "./temp/backend/GraphQlSetup";
import PrismaSetup from "./temp/backend/PrismaSetup";

const program = new Command();

program
  .version("2.0.0")
  .description("Arcane CLI spell that conjures the bones of your application")
  .action(async () => {
    await printWelcome();
    // await createUsualReactApp();
  });

program
  .command("create <spell>")
  .description("Initialize the Arcane CLI")
  .option("--help", "display help for command")
  .action(async (spell) => {
    await printWelcome();
    switch (spell) {
      case "backend":
        await createBasicBackendApplication();
        return;
      case "frontend":
        await createUsualReactApp();
        return;
      default:
        console.log(chalk.redBright(`✨ The arcane creation spell eludes you! Please specify to conjure the desired magic. ❌\n`));
    }
  });
  

// Initialize the commander program

program
  .command("add <spell>")
  .description("Add a feature to your application")
  .option("--help", "display help for command")
  .action(async (spell) => {
    await printWelcome();
    switch (spell) {
      case "redux":
        await SetupRedux();
        return;
      case "axios":
        await SetupAxios();
        return;
      case "tailwind":
        await SetupTailwind();
        return;
      case "socket-server":
        await SocketIOSetup();
        return;
      case "redis-server":
        await RedisSetup();
        return;
      case "kafka-server":
        await KafkaSetup();
        return;
      case "swagger-api-doc":
        await SwaggerSetup();
        return;
      case "graphql-server":
        await GraphQLSetup();
        return;
      case "prisma":
        await PrismaSetup();
        return;
      default:
        console.log(chalk.redBright(` The arcane summoning spell eludes you! Please specify to conjure the desired magic. ❌\n`));
        displayAvailableSummoningSpell();
    }
  });

function displayAvailableSummoningSpell() {
  console.log(chalk.yellow("Available summoning spell:\n"));
  console.log(chalk.cyan("  - redux"));
  console.log(chalk.cyan("  - axios"));
  console.log(chalk.cyan("  - tailwind"));
  console.log(chalk.yellow("  ------  "));

  console.log(chalk.cyan("  - socket-server"));
  console.log(chalk.cyan("  - redis-server"));
  console.log(chalk.cyan("  - kafka-server"));
  console.log(chalk.cyan("  - prisma"));
  console.log(chalk.cyan("  - swagger-api-doc"));
  console.log(chalk.cyan("  - graphql-server"));
}
function displayAvailableCreationSpell () {
  console.log(chalk.yellow("Available creation spell:\n"));
  console.log(chalk.cyan("  - backend"));
  console.log(chalk.cyan("  - frontend"));
  console.log(chalk.yellow("  ------  "));
}

// Parse the command line arguments
program.parse(process.argv);
