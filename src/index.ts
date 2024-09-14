#!/usr/bin/env node

import createUsualReactApp from "./script/createUsualReactApp";
import { Command } from 'commander';
import installTailwind from "./script/installTailwind";
import installRedux from "./script/installRedux";
import installRouter from "./script/installRouter";
import installAxios from "./script/installAxios";

const program = new Command();

program
  .version('0.1.0')
  .description('A CLI for creating and managing React applications');

program
  .command('create')
  .description('Create a new React application')
  .action(async () => {
    await createUsualReactApp();
  });

program
  .command('add <feature>')
  .description('Add a feature to your React application')
  .action((feature) => {
    switch (feature) {
      case 'tailwind':
        installTailwind();
        break;
      case 'redux':
        installRedux();
        break;
      case 'router':
        installRouter();
        break;
      case 'axios':
        installAxios();
        break;
      default:
        console.log(`Unknown feature: ${feature}`);
    }
  });

program.parse(process.argv);