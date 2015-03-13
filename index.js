/**
 * Dependencies
 */

var format = require('util').format;
var table = require('text-table');
var chalk = require('chalk');


/**
 * Expose print
 */

module.exports = print;


/**
 * Options
 */

print.indent = 2;
print.plain = false;
print.sort = false;
print.colors = {
  number: 'blue',
  string: 'yellow',
  function: 'magenta',
  date: 'green',
  false: 'red',
  true: 'green'
};


/**
 * Awesome print
 */

function print (obj) {
  var keys = Object.keys(obj);
  
  // sort keys alphabetically if enabled
  if (print.sort) {
    keys.sort(function (a, b) {
      return a.localeCompare(b);
    });
  }
  
  // build properties list
  var props = keys.map(function (key) {
    var value = obj[key];
    
    return [key + ':', stringify(value)];
  });
  
  // build output
  var output;
  
  output = table(props, { align: ['r', 'l'] });
  output = indent(output);
  output = format('{\n%s\n}', output);
  
  console.log(output);
}

function stringify (value) {
  // number
  if (typeof value === 'number') {
    return colorize(value + '', 'number');
  }
  
  // string
  if (typeof value === 'string') {
    return colorize(format('\'%s\'', value), 'string');
  }
  
  // function
  if (typeof value === 'function') {
    return colorize(format('[Function: %s]', value.name), 'function');
  }
  
  // array
  if (value instanceof Array) {
    return format('[ %s ]', value.map(stringify).join(', '));
  }
  
  // date
  if (value instanceof Date) {
    return colorize(value + '', 'date');
  }
  
  // true
  if (typeof value === 'boolean' && value) {
    return colorize(value + '', 'true');
  }
  
  // false, null, undefined, NaN
  if (!value) {
    return colorize(value + '', 'false');
  }
  
  // object
  if (value instanceof Object && !print.raw) {
    return format('{ %s }', Object.keys(value).map(entry, value).join(', '));
  }
  
  // everything else
  return value + '';
}


/**
 * Utilities
 */

function colorize (value, type) {
  if (print.plain) return value;

  var color = print.colors[type];

  return chalk[color].call(chalk, value);
}

function indent (output) {
  return output.split('\n').map(spaces).join('\n');
}

function spaces (line) {
  return new Array(print.indent + 1).join(' ') + line;
}

function entry (key) {
  return format('%s: %s', stringify(key), stringify(this[key]));
}
