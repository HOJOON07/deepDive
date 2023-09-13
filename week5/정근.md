**23장 실행 컨텍스트 Points**

- 자바스크립트 엔진은 소스코드를 평가와 실행 과정으로 구분해서 처리함
    
    → 함수 코드의 경우, 함수 선언문이 평가되어 빈 함수 객체가 생성된 다음, 호출 시에 함수 실행 컨텍스트가 생성되어 내부 코드가 평가되고 실행됨
    
    → 즉, 함수 실행 컨텍스트는 함수가 호출될 때마다 매번 새롭게 생성됨 (함수가 선언될 때가 아님 주의!)
    
- this 바인딩은 전역  환경 레코드와 함수 환경 레코드에만 존재
    
    → 전역 환경 레코드를 구성하는 객체 환경 레코드와 선언적 환경 레코드에는 없음! (p. 373)
    
    → Q. 정확히 어떤 의미인지 계속 헷갈림..
    
- for 문은 코드 블록이 반복 실행될 때마다 새로운 렉시컬 환경을 생성함 (p. 387)
    
    → 단, 변수 선언문에 let 사용 시에만!
    

** Side Note: 원형 큐 → 선형 큐의 오버/언더플로우 문제를 보완

Q. 전역 VS 함수 렉시컬 환경의 차이: 왜 전역 환경 레코드는 객체 환경 레코드와 선언적 환경 레코드로 구성된 반면, 함수 환경 레코드는 함수 (객체) 환경 레코드로만 구성되어 있는가? (p.379 그림 참고)

→ 전역 스코프에서는 var VS let, const 선언자에 따라 전역 객체 프로퍼티로 등록되냐 아니냐의 중요한 차이가 있는 반면, 함수 스코프에서는 전부 함수 객체 프로퍼티로 등록되므로 구분지을 필요가 없음 (맞나?)

** Reminder: 함수 내부에 선언자 없이 사용한 식별자는 브라우저 환경에서 전역 객체의 프로퍼티(=전역 변수)가 됨

Q. 블록 VS 함수 렉시컬 환경의 차이: 왜 블록 레벨 코드는 함수 코드처럼 실행 컨텍스트를 새롭게 생성하는 대신, 렉시컬 환경만 새롭게 생성해 전역 렉시컬 환경을 대체하는 식으로 실행될까? (p. 387 그림 참고)

→ 블록 레벨 코드는 함수 코드와 달리 무조건 한 번만 실행되므로 굳이 새로운 실행 컨텍스트가 필요 없음 (정확히 왜?)

→ New Q. 실행 컨텍스트 VS 렉시컬 환경의 차이: 근데 그럼 왜 함수도 똑같이 실행 컨텍스트를 새로 생성하는 대신, 함수 렉시컬  환경만 생성해서 전역 렉시컬 환경을 대체하면 안 될까?

** 스코프 연습 문제:

https://stackoverflow.com/questions/52212632/how-to-access-a-variable-from-outer-scope-in-javascript

```jsx
var x = 10;
function outer() {
    var x = 20;
    function inner() {
        var x = 30;
        function printX() {
            console.log(x);  // 출력값은?
            console.log(outer.x);  // 출력값은?
        }
        printX();
    }
    inner();
}
outer();
```

**24장 클로저 Points**

- 클로저란?
    
    → 외부 함수가 소멸된 이후에도, 외부 함수인 상위 스코프의 자유 변수를 참조하는 중첩 함수
    
    → 모던 브라우저의 최적화로 인해, 중첩 함수에 의해 참조되는 식별자가 없는 상위 스코프는 외부 함수의 생명 주기가 끝날 때 메모리에서 제거됨
    
    → New Q. 그럼 중첩 함수의 외부 렉시컬 환경 참조 값이 null이 될까, 아니면 외부 함수의 함수 환경 레코드 값이 null이 될까? (별로 안 중요)
    
    → New Q. 변수 말고 함수를 클로저로 은닉하기도 하나?
    

Q. 클로저에서 즉시 실행 함수의 역할: 클로저를 즉시 실행 함수로 감싸지 않아도 되나? 그렇다면 굳이 왜 감싸는가? (p. 402)

예제 24-11 변형 (즉시 실행 함수 제거)

```jsx
const increase = function () {
  let num = 0;
  return function () {
		return ++num;
	};
};

console.log(increase());  // f
console.log(increase());  // f

console.log(increase()());  // 1
console.log(increase()());  // 1
```

→ increase 함수를 호출할 때마다 새로운 실행 컨텍스트와 렉시컬 환경이 생성되어, increase 함수의 중첩함수(return ++num) 역시 호출할 때마다 다른 렉시컬 환경을 상위 스코프로 기억하기 때문에 **num 식별자를 공유할 수 없음**

→ 반면, 원 예제에서는 increase 함수가 클로저로서, 단 한 번 실행된 즉시 실행 함수의 렉시컬 환경을 상위 스코프로 기억하기 때문에, 호출할 때마다 새로운 실행 컨테스트가 생성되어도 외부 함수 참조 값은 동일해 **num 식별자를 공유할 수 있음**

→ 즉, 즉시 실행 함수를 쓰는 이유는, 클로저의 상위 스코프로 사용할 함수를 따로 선언하지 않기 위해서 같음

예제 24-05 변형 (p. 393)

```jsx
const innerFunc = (function(){
    const x = 10;
    return function(){
        console.log(x);
    };
})();
innerFunc();  // 10
```

→ 원 예제에서 함수 리터럴로 정의된 outer와 함수 표현식으로 정의된 inner 두 함수 식별자를 즉시 실행 함수를 사용함으로써 생략 가능해짐

Q. this 식별자의 결정(resolution) 과정 (식별자 결정 개념은 p. 375 참고): 인스턴스 메서드 내부의 this는 어떤 과정으로 참조값이 결정되는가? (클로저랑 상관 없음 주의)

예제 24-13 변형 (p. 404)

```jsx
// let num = 0;

function Counter() {
    this.num = 0;
}

Counter.prototype.increase = function() {
    return ++this.num;  // 여기 this!
};

const counter = new Counter();

console.log(counter.increase());
console.log(counter.increase());
```

→ 우선, 우리는 “22장 this”에서 메서드 호출 시, this는 호출한 객체에 바인딩된다는 걸 배움. 즉, 위의 예제에서 this는 increase 메서드를 호출한 counter 객체에 바인딩됨

그 과정을 살펴보자면, counter 객체가 increase 메서드를 호출한 시점에, 함수 실행 컨텍스트와 함수 렉시컬 환경이 생성되고, 함수 환경 레코드의  [[ThisValue]] 내부 슬롯에 counter 객체가 바인딩됨

그다음, increase 내부 코드가 평가 및 실행되면서, this 식별자가 현재 실행 컨텍스트의 this 바인딩 값(counter 객체)으로 평가됨

counter 객체는 new 연산자를 통해 생성된 시점에 num 프로퍼티를 소유하므로, this.num 식별자가 올바르게 결정됨!

→ ** Reminder: “메서드는 프로퍼티에 바인딩된 함수로, 그 프로퍼티를 소유하는 객체에 포함된 것이 아니라 독립적으로 존재하는 객체임

따라서 메서드 내부의 this는 프로퍼티로 메서드를 참조하는 객체와 상관 없고 메서드를 호출한 객체에 바인딩됨” (p. 351)

** Reminder: 생성자 함수 내부에 정의된 메서드는 인스턴스를 생성할 때마다 중복 생성되어 메모리를 비효율적으로 사용하는 반면, 생성자 함수 외부에 프로토타입으로 정의된 메서드는 객체 생성 시에만 한 번 생성되므로 효율적임

단, 프로토타입 메서드는 생성자 함수 내부에 정의된 지역 변수를 참조할 수 없음

** 참고: 예제 24-21 다른 풀이 (p. 413)

```jsx
var funcs = [];

for(var i=0; i<3; i++) {
    funcs[i] = (function(n=i){  // 매개변수의 초기값을 i로 설정
        return function() {
            return n;
        };
    })(); // 책에서는 여기 호출할 때 i 전달함!
}

for(var j=0; j<funcs.length; j++) {
    console.log(funcs[j]());
}
```

** 클로저 연습 문제:

```jsx
function createIncrement() {
  let count = 0;
  function increment() { 
    count++;
  }

  let message = `Count is ${count}`;
  function log() {
    console.log(message);
  }
  
  return [increment, log];
}

const [increment, log] = createIncrement();
increment(); 
increment(); 
increment(); 
log(); // 여기 출력되는 값은 무엇인가?
```

- 답
    
    Count is 0
    
    → Count is 3를 출력하려면 코드를 어떻게 수정해야 할까?
    

** 클로저 실전 문제:

https://github.com/Nooder/javascript-in-depth/tree/main/035-closure

(exercise-2)

```jsx
1. Create a function called "createVendingMachine" that has no
       parameters
    2. Create an Array inside "createVendingMachine" named "stock"
       that has the following values:
       ["Cola", "Chips", "Chocolate", "Juice", "Nuts"]
    3. Create a Number inside "createVendingMachine" called "coins"
       that starts at 0
    3. Create a Function inside "createVendingMachine" called "add25"
       that has no parameters. This function will:
       - Add 25 to "coins"
       - If "coins" is 100, pick a random item from "stock"
         and log out `You got some <item_name>` (do not remove
         the item from "stock") and then reset coins to 0.
       - If coins is less than 100, print out:
         "Insert ____ more coins" to show how many
         more coins are needed
    4. Return the "add25" function from "createVendingMachine"

    5. Test out createVendingMachine a few times like so:
       const vendingMachine = createVendingMachine();
       vendingMachine(); // "Insert 75 more coins"
       vendingMachine(); // "Insert 50 more coins"
       vendingMachine(); // "Insert 25 more coins"
       vendingMachine(); // "You got some Chips"
       vendingMachine(); // "Insert 75 more coins"
```

- 답
    
    ```jsx
    	const createVendingMachine = () => {
      const stock = ["Cola", "Chips", "Chocolate", "Juice", "Nuts"];
      let coins = 0;
    
      const add25 = () => {
        coins += 25;
    
        if (coins === 100) {
          // dispense an item
          const randomIndex = Math.floor(Math.random() * stock.length);
          const randomItem = stock[randomIndex];
          console.log(`You got some ${randomItem}`);
          coins = 0;
        } else {
          console.log(`Insert ${100 - coins} more coins`);
        }
      };
    
      return add25;
    };
    
    const vendingMachine = createVendingMachine();
    vendingMachine();
    vendingMachine();
    vendingMachine();
    vendingMachine();
    console.log(stock);
    ```