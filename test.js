const Stack = (function () {
  function Stack(array = []) {
    if (!Array.isArray(array)) {
      throw new TypeError(`${array} is not an array`);
    }
    this.array = array;
  }
  Stack.prototype = {
    constructor: Stack,
    push(value) {
      return this.array.push(value);
    },
    pop() {
      return this.array.pop();
    },
    entries() {
      return [...this.array];
    },
  };
  return Stack;
})();
