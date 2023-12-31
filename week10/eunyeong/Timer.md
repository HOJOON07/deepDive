# 41 타이머

## 41.1 호출 스케줄링

함수를 명시적으로 호출하면 함수가 즉시 실행된다.

> 호출 스케줄링이란 함수를 명시적으로 호출하지 않고, 타이머 함수를 사용해 일정 시간 후에 호출되도록 함수 호출을 예약하는 것이다.

**타이머 함수는** 빌트인 함수는 아니지만 브라우저 환경과 Node.js 환경에서 모두 **전역 객체의 메서드**로서 타이머 함수를 제공하는 **호스트 객체**이다.

자바스크립트 엔진은 두가지 이상의 태스크를 동시에 실행할 수 없는 싱글 스레드로 동작하기 때문에 타이머 함수는 **비동기 처리 방식**으로 동작한다.

## 41.2 타이머 함수

41.2.1 setTimeout / clearTimeout

#### setTimeout (func|code[, delay, params1, params2, ...])

> 두번째 인수로 전달받은 시간으로 **단 한번 동작**하는 타이머를 생성하고, 타이머가 만료되면 첫번째 인수로 전달받은 콜백 함수가 호출된다.

- setTimeout 인수
  - func : 타이머가 만료된 뒤 호출될 콜백 함수/ 코드를 문자열로 전달 가능
  - delay : 타이머 만료시간(ms 단위). 기본값은 0.
  - params1, params2, ... : 호출 스케줄링된 콜백 함수에 전달해야 할 인수가 존재하는 경우

※ delay 시간이 설정된 타이머가 만료되면 콜백함수가 즉시 호출되는 것이 보장되지는 않으며, delay 시간은 테스크 큐에 콜백 함수를 등록하는 시간을 지연하는 것 뿐이다.

- setTimeout 함수는 생성된 타이머를 식별할 수 있는 고유한 타이머 id를 반환한다.(브라우저 환경인 경우 숫자, Node.js 환경인 경우 객체)

#### clearTimeout

> clearTimeout 함수는 호출 스케줄링을 취소한다.

setTimeout 함수가 반환한 타이머 id를 인수로 전달하여 타이머를 취소할 수 있다.

### 41.2.2 setInterval / clearInterval

#### setInterval (func|code[, delay, params1, params2, ...])

> 두번째 인수로 전달받은 시간으로 **반복 동작**하는 타이머를 생성하고, 타이머가 만료될 때마다 첫번째 인수로 전달받은 콜백 함수가 호출된다.

- 인수는 setTimeout 함수와 동일하다.

- setTimeout 함수는 생성된 타이머를 식별할 수 있는 고유한 타이머 id를 반환한다.(브라우저 환경인 경우 숫자, Node.js 환경인 경우 객체)

#### clearInterval

> clearInterval 함수는 호출 스케줄링을 취소한다.

setInterval 함수가 반환한 타이머 id를 인수로 전달하여 타이머를 취소할 수 있다.

## 41.3 디바운스와 스로틀

> 짧은 시간 간격으로 연속해서 발생하는 이벤트(scroll, resize, input, mousemove 등)를 그룹화해서 과도한 에벤트 핸들러의 호출을 방지하는 프로그래밍 기법이다.

### 41.3.1 디바운스

> 짧은 시간 간격으로 연속해서 이벤트 발생 시, 이벤트 핸들러를 호출하지 않다가 일정 시간이 경과한 이후에 이벤트를 그룹화하여 **이벤트 핸들러가 한 번만 호출**된다.

- debounce 함수가 반환한 함수는 debounce에 두번째 인수로 전달한 시간보다 짧은 간격으로 이벤트가 발생함년 이전 타이머를 취소하고 새로운 타이머를 재설정한다.

- 사용 : resize 처리, input 요소에 입력된 값으로 ajax 요청하는 입력 필드 자동완성 UI 구현, 버튼 중복 클릭 방지 처리 등

- 실무에서는 Underscore, Loadash의 debounce함수를 권장한다.

예)
input 이벤트는 사용자가 텍스트 입력 필드에 값을 입력할 대 연속적으로 발생한다. 입력한 값으로 Ajax 요청과 같은 무거운 처리를 수행한다면, 서버에 부담을 주기 때문에 사용자가 입력을 완료했을 때 Ajax 요청을 한번만 전송하는 것이 바람직하다.

### 41.3.1 스로틀

> 짧은 시간 간격으로 연속해서 이벤트 발생 시, 이벤트를 그룹화해서 **일정 시간 단위로 이벤트 핸들러가 호출**되도록 한다.

- throttle 함수가 반환한 함수는 throttle 함수에 두번째 인수로 전달한 시간이 경과하기 전에 이벤트가 발생하면 아무것도 하지 않다가 delay 시간이 경과됐을 때 이벤트가 발생하면 콜백 함수를 호출하고 새로운 타이머를 재설정한다.

- delay 시간 간격으로 콜백 함수가 호출된다.

- 사용 : scroll 이벤트 처리, 무한 스크롤 UI 구현 등

- 실무에서는 Underscore, Lodash의 throttle 함수를 권장한다.
