function Circle() {
  console.log(this);
}

const a = Circle();
console.log(a);

{
  /* <ref *1> Object [global] {
  global: [Circular *1],
  clearInterval: [Function: clearInterval],
  clearTimeout: [Function: clearTimeout],
  setInterval: [Function: setInterval],
  setTimeout: [Function: setTimeout] {
    [Symbol(nodejs.util.promisify.custom)]: [Getter]
  },
  queueMicrotask: [Function: queueMicrotask],
  performance: Performance {
    nodeTiming: PerformanceNodeTiming {
      name: 'node',
      entryType: 'node',
      startTime: 0,
      duration: 24.79366636276245,
      nodeStart: 1.0843753814697266,
      v8Start: 2.506833076477051,
      bootstrapComplete: 20.905583381652832,
      environment: 11.880666255950928,
      loopStart: -1,
      loopExit: -1,
      idleTime: 0
    },
    timeOrigin: 1693584200007.604
  },
  clearImmediate: [Function: clearImmediate],
  setImmediate: [Function: setImmediate] {
    [Symbol(nodejs.util.promisify.custom)]: [Getter]
  }
}
undefined

[Done] exited with code=0 in 0.059 seconds */
}

function Circle2() {
  console.log(this);
}

const b = new Circle2();
console.log(b);

//Circle2 {}

console.log("a");
setTimeout(() => console.log("b"), 1000);
setTimeout(() => console.log("c"), 0);
console.log("d");

const increase = (num) => {
  return ++num;
};

const decrease = (num) => {
  return --num;
};

const auxs = { increase, decrease };

const makeCounter = (aux) => {
  let num = 0;

  return () => {
    num = aux(num);
    return num;
  };
};

const increaser = makeCounter(auxs.increase);

console.log(increaser());

const decreaser = makeCounter(auxs.decrease);
console.log(decreaser());

function sum(...args) {
  let result = 0;
  args.forEach((item) => (result += item));
  return result;
}

console.log(sum(1, 2, 3, 4, 5));

const arrowFunctionisName = () => {
  console.log("나 화살표");
};

console.log(arrowFunctionisName.name);
//arrowFunctionisName
