const fs = require('fs');
const chalk = require('chalk');

const format = (scripts = {}) => {
  const items = [];
  for (const [key, script] of Object.entries(scripts)) {
    const display = `${key} ${chalk.dim('(' + script.substring(0, 64) + ')')}`;
    items.push({ key, script, display });
  }
  return items;
};

exports.load = async () => {
  try {
    const { scripts } = JSON.parse(fs.readFileSync(`${process.env.PWD}/package.json`, 'UTF8') || '{}');

    return format(scripts);
  } catch (error) {
    return [];
  }
};
