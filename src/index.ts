#!/usr/bin/env node

import createUsualReactApp from "./script/createUsualReactApp";
import { Command } from 'commander';

const program = new Command();

program
  .version('1.0.0')
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
    if (feature === 'axios') {
      console.log('Installing Axios...');
      // Add Axios installation logic here
    } else {
      console.log(`Unknown feature: ${feature}`);
    }
  });

program.parse(process.argv);