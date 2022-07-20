const cliSelect = require('cli-select');
const chalk = require('chalk');

const config = (values = []) => {
  return {
    /**
     * All values which can be selected.
     * This can either be an array or an object with string keys and values.
     * If an array is specified, the numerical index gets passed to the callback,
     * if an object is specified, the object key will get passed to the callback.
     * If you use the `valueRenderer` option, you can also pass in any array/object you want,
     * the value can be anything as the `valueRenderer` returns the string to render on the terminal.
     *
     * @type {array|object}
     */
    values,

    /**
     * The default value which will be pre-selected when the list shows up.
     * If `values` is an object, the object key can be specified, otherwise
     * it requires the numerical index in the array.
     *
     * @type {number|string}
     */
    defaultValue: 0,

    /**
     * Symbol which gets rendered if an option is selected.
     *
     * @type {string}
     */
    selected: '>',

    /**
     * Symbol which gets rendered if an option is not selected.
     *
     * @type {string}
     */
    unselected: ' ',

    /**
     * If you want an indent before the symbol and options,
     * you can specify it here with the number of spaces.
     *
     * @type {number}
     */
    indentation: 0,

    /**
     * If true, the list will get removed from the output
     * once an item gets selected or it gets cancelled.
     *
     * @type {boolean}
     */
    cleanup: true,

    /**
     * If you use a custom object for values or want to render the values differently,
     * you can overwrite it with a custom function.
     * The function gets two parameters passed, the value
     * (which can be a string or your custom object, depending what you have in the `values` option)
     * and a boolean specifying if the value is selected.
     * See the examples below for a simple example.
     *
     * @type {function}
     */
    valueRenderer: (value, selected) => {
      const output = `${value.key} ${chalk.dim('(' + value.script + ')')}`;
      if (selected) {
        return chalk.inverse.underline(output);
      }

      return output;
    },

    /**
     * Stream where the output should be written to.
     *
     * @type {Stream}
     */
    outputStream: process.stdout,

    /**
     * Stream to use for the keyboard events.
     *
     * @type {Stream}
     */
    inputStream: process.stdin,
  };
};

exports.show = async (availableScripts) => {
  try {
    return await cliSelect(config(availableScripts));
  } catch (error) {
    console.error(error);
    return null;
  }
};
