const scripts = require('./scripts');
const select = require('./select');
const exec = require('child_process').exec;


exports.run = async () => {
  const availableScripts = await scripts.load();
  const selected = await select.show(availableScripts);
  if (!selected) {
    return process.exit(1);
  }

  exec(`yarn run ${selected.value.key}`).stdout.pipe(process.stdout);
};
