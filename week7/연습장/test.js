// class Numbers {
//   numberArray = [];

//   multiply(arr) {
//     arr.forEach((item) => this.numberArray.push(item * item));
//   }
// }

// const numbers = new Numbers();

// numbers.multiply([1, 2, 3]);
// // console.log(numbers.numberArray);

// const arr = [];
// arr[0] = 1;
// arr["1"] = 2;

// arr["foo"] = 3;
// arr.bar = 4;
// arr[1.1] = 5;
// arr[-1] = 6;

// console.log(arr);
// [1,2,foo:3,bar:4,'1.1':5,'-1':6]

// for (let i = 0; i < arr.length; i++) {
//   console.log(arr[i]);
// }

// const x = { a: 1 };

const x = function () {};
const obj = {
  [x]: 2,
};
console.log(obj);

const a = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

const result = a
  .map((_, idx) => idx + 1)
  .filter((item) => item % 2)
  .slice((0, 2));
