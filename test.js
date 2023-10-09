// // const Stack = (function () {
// //   function Stack(array = []) {
// //     if (!Array.isArray(array)) {
// //       throw new TypeError(`${array} is not an array`);
// //     }
// //     this.array = array;
// //   }
// //   Stack.prototype = {
// //     constructor: Stack,
// //     push(value) {
// //       return this.array.push(value);
// //     },
// //     pop() {
// //       return this.array.pop();
// //     },
// //     entries() {
// //       return [...this.array];
// //     },
// //   };
// //   return Stack;
// // })();

// // class Person {}

// // const me = new Person();

// // console.log(typeof me);

// const person = {
//   firstName: "hojoon",
//   lastName: "kim",

//   get FullName() {
//     return `${this.firstName} ${this.lastName}`;
//   },
//   // set FullName(name) {
//   //   [this.firstName, this.lastName] = name.split(" ");
//   // },
// };
// person.als = "test";
// console.log(person);

// // function test() {
// //   return "test";
// // }

// // test = "hojoon";

// // console.log(test);

function a() {
  console.log(this);
  this.name = "test";
}

a();
const base = {
  name: "Lee",
  sayHi: () => {
    return this.name;
  },
};

const dere = {
  __proto__: base,
  sayHi() {
    return `${super.sayHi()}.how are you doing`;
  },
};

console.log(dere.sayHi());
