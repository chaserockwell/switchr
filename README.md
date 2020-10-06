# Switchr

Switchr provides a simple, clean, and flexible alternative to switch statements.

## Installation

```bash
npm install switchr
```

## Usage

### Methods
- [Get](#get)
- [Set](#set)
- [Has](#has)
- [List](#list)

### Basic Usage
```javasdcript
const basicSwitchr = switchr({
  foo: 'foo foo',
  buzz: (str) => {
    return 'buzz buzz ' + str;
  },
  default: 'foobarbuzz'
});

basicSwitchr.get('foo'); // 'foo foo'
basicSwitchr.get('buzz', 'baby'); // 'buzz buzz baby'
basicSwitchr.get('non-existent'); // 'foobarbuzz'
```

### Initialization

- Import
```javascript
import switchr from 'switchr'; /* ES6 */

/* OR */

const switchr = require('switchr').default; /* require */
```

- Switchr can be initialized with either an object (recommended) or array for ultimate flexibility:

```javascript
// Object
const switchrObject = switchr({
  foo: 'foo',
  bar: 'bar'
});

// Array
const switchrArray = switchr([
  {
    key: 'foo',
    value: 'foo'
  },
  {
    key: 'bar',
    value: 'bar'
  }
]);
```

- It also accepts functions as values

```javascript
const switchrWithFunction = switchr({
  foo: (a, b) => {
    return a + b;
  },
});

const switchrWithArrowFunction = switchr({
  bar: (a, b) => {
    return a - b;
  }
});
```

### Get

- The `get` method retrieves simple values:
```javascript
const getSwitchr = switchr({
  getMe: 'You got me!'
});

getSwitchr.get('getMe'); // 'You got me!'
```
- Or executes functions
```javascript
const getFunctionsSwitchr = switchr({
  getMeFn: () => { // Without arguments
    return 'You got me again!';
  },
  sum: (a, b) => { // With arguments
    return a + b;
  }
});

getSwitchr.get('getMeFn'); // 'You got me again!'
getSwitchr.get('sum', 10, 15); // 25
```
- `get` will ignore arguments passed in when the function doesn't expect them:
```javascript
getSwitchr.get('getMeFn', 10, 15) // 'You got me again!'
```

- Use a default key to handle cases that don't exist
```javascript
const switchrWithDefault = switchr({
  foo: 'foo',
  default: 'foobar'
});

switchrWithDefault.get('doesntExist') // 'foobar'
```

- If no default key exists, `get` will return null:
```javascript
const switchrWithoutDefault = switchr({
  foo: 'foo'
});

switchrWithDefault.get('doesntExist') // null
```


### Set
- The `set` method adds a new case by passing in a key and value:
```javascript
const setSwitchr = switchr({
  foo: 'foo'
});
setSwitchr.set('bar', 'bar');
setSwitchr.get('bar'); // 'bar'
```

- `set` also accepts a callback function:
```javascript
function multiply(a, b): number {
  return a * b;
}

const setSwitchr = switchr({
  foo: 'foo'
});

setSwitchr.set('multiply', multiply);
setSwitchr.get('multiply', 10, 20); // 200
```

- If a key already exists, `set` will update that value:
```javascript
const updateSwitchr = switchr({
  updateMe: 'old value'
});

updateSwitchr.set('updateMe', 'new value!');
updateSwitchr.get('updateMe'); // 'new value!'
```

### Has

- The `has` method checks to see if a case exists:
```javascript
const hasSwitchr = switchr({
  foo: 'foo',
});

hasSwitchr.has('foo'); // true
hasSwitchr.has('bar'); // false
```

### List

- The `list` method returns an array available keys:
```javascript
const listSwitchr = switchr({
  foo: 'foo',
  bar: 'bar',
  buzz: () => {
    return 'buzz buzz';
  },
  default: 'default value'
});

listSwitchr.list(); // ['foo', 'bar', 'buzz', 'default'];
```

### TypeScript Support
Switcher has full TypeScript support

## License
[MIT](https://choosealicense.com/licenses/mit/)
