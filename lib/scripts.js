const format = (scripts = {}) => {
  const items = [];
  Object.keys(scripts).forEach((key) => {
    const script = scripts[key];

    items.push({ key, script });
  });
  return items;
};

exports.load = async () => {
  try {
    const { scripts } = await require(`${process.env.PWD}/package.json`);

    return format(scripts);
  } catch (error) {
    return [];
  }
};
