import figlet from "figlet";
import gradient from "gradient-string";
import chalk from "chalk";

export default function printWelcome() {
  console.log(
    gradient.pastel(
      figlet.textSync("Arcane CLI", {
        font: "Standard",
        horizontalLayout: "default",
        verticalLayout: "default",
      })
    )
  );
  console.log(chalk.green(`✨ Welcome to Dev Magic: The Spell of Creation ✨\n`));
}
