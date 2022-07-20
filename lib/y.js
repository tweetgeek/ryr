const scripts = require('./scripts');
const select = require('./select');
const chalk = require('chalk');
const execFileSync = require('child_process').execFileSync;

exports.run = async () => {
  const availableScripts = await scripts.load();
  if (!availableScripts.length) {
    process.stdout.write([
      chalk.redBright('⚠️  No scripts available...\n'),
      'ℹ️  ',
      chalk.bold.bgRedBright('package.json'),
      chalk.red(' not found or '),
      chalk.bold.bgRedBright('scripts'),
      chalk.red(' section empty...\n'),
    ].join(''));
    process.exit(0);
    return;
  }

  const selected = await select.show(availableScripts);
  if (!selected) {
    process.stdout.write(chalk.yellow.bold('Script not selected...\n'));
    process.exit(0);
    return;
  }

  execFileSync('yarn', ['run', selected.value.key], {
    'stdio': 'inherit',
  });
};
