// function repeat(n, f) {
//   for (let i = 0; i < n; i++) {
//     f(i);
//   }
// }

// let logAll = function (i) {
//   console.log(i);
// };

// repeat(5, logAll);

// let logOdds = function (i) {
//   if (i % 2) console.log(i);
// };

// repeat(5, logOdds);

// var x = "global";
// function foo() {
//   var x = "local";
//   console.log(x);
// }

// foo();

// console.log(x);

// function outer() {
//   console.log("밖");
// }

// function test() {
//   function outer() {
//     console.log("안");
//   }
//   outer();
// }

// test();

var x = "global";
function foo() {
  console.log(x);
  var x = "local";
}

foo();
console.log(x);
