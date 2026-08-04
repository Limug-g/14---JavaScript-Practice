//콜백 함수를 활용한 예제 - 할 일 목록 만들기

// 요소 가져오기
const todoInput = document.querySelector("#todoInput");
const addBtn = document.querySelector("#addBtn");
const filterBtn = document.querySelector(".filterBtn");
const todoList = document.querySelector("#todoList");
const emptyMessage = document.querySelector("#emptyMessage");

// 인풋에 할 일 입력값을 저장하는 배열 만들기
let todos = [];
let currentFileter = "all";
let idCounter = 1;

//1. 할 일 추가
function addTodo() {
  const text = todoInput.ariaValueMax.trim();
  //trim()를 붙이는 이유는?

  if (text === "") {
    alert("오늘 할 일이 그렇게 없습니까...");
    return;
  }

  // 새 할 일을 위에서 만든 빈 배열에 추가
  todos.push({
    id: idCounter++,
    text: text,
    done: false,
    //이 done은 뭐지? 배열을 true로 바꿔주나?
  });

  todoInput.value = "";
  render();
  //이거는 왜 넣어주는거지?
}
//2. filter()로 원하는 조건만 골라내기-> 콜백함수
function getFilteredTodos() {
  if (currentFileter === "active") {
    return todos.filter((todo) => {
      todo.done === false;
    });
  }
  //'진행중' 필터를 클릭하면 보이는 할 일들(배열형태)

  if (currentFileter === "done") {
    return todos.filter((todo) => {
      todo.done === true;
    });
    //'완료됨' 필터를 클릭하면 보이는 할 일들
  }
  return todos;
  // 그외에 '전체' 필터인 경우 보이는 할 일들
}

//3. todos 배열을 하나씩 순회하며 화면에 그리기-> forEach문 사용
function render() {
  //변수를 선언해서 필터 함수로 리턴되는 배열 요소를 담아주자
  const filterTodo = getFilteredTodos();

  //목록 비우기
  todoList.innerHTML = "";

  //필터링된 결과가 없으면 안내 문구 표시 (필터된 결과는 배열)
  if (filterTodo.length === 0) {
    emptyMessage.style.display = "block";
    //emptyMessage 태그 안에 텍스트가 보이게
  } else {
    emptyMessage.style.display = "none";
    //할 일이 있으면 안보이게
  }

  //
  filterTodo.filter((todo) => {
    const li = document.createElement("li");
    //할 일이 추가 될때 li태그를 만드는 작업-> 클래스도 붙여서
    if (todo.done) {
      li.classList.add("done");
    }

    //할 일이 추가 될때 만들어진 li 태그 안에 텍스트를 넣는 작업
    const span = document.createElement("span");
    span.textContent = todo.text;

    span.addEventListener("click", () => {
      toggleTodo(todo, id);
    });

    //할 일이 추가되면 삭제 버튼이 생성된 할 일 옆에 같이 만들어지는 작업
    const deleteBtn = document.createElement("button");
    deleteBtn.classList.add("deleteBtn");
    deleteBtn.textContent = "삭제";
    deleteBtn.addEventListener("click", () => {
      deleteTodo(todo.id);
    });

    li.append(span, deleteBtn);
    todoList.append(li);
  });
}

//4. map()으로 새 배열 리턴하기->
//조건문에 맞는 todos 요소만 바꾸고,
//배열에 done 의 값을 반전하여 수정
function toggleTodo(id) {
  //할 일을 클릭했을 때 이 함수의 파라미터인 id 와
  //할 일 목록의 id가 동일하면 done의 값을 반전
  //새 배열을 todos 변수로 부터 만든다

  todos = todos.map((todo) => {
    if (todo.id === id) {
      return { ...todo, done: !todo.done };
      //얕은 복사
    }
    return todo;
  });
  render();
}

//5. filter로 새 배열 만들기
//이번엔 deleteTodo() 만들기
function deleteTodo(id) {
  todos = todos.filter((todo) => {
    todo.id !== id;
  });
  render();
}

//이벤트 핸들러 등록
addBtn.addEventListener("click", addTodo);

todoInput.addEventListener("keydown", (event) => {
  if (event.key == "Enter") {
    addTodo();
  }
});

//forEach 문으로 각 버튼들에 이벤트 등록
filterBtn.forEach((btn) => {
  btn.addEventListener("click", () => {
    filterBtn.forEach((b) => {
      //모든 버튼에서 active 클래서 제거
      b.classList.remove("active");

      //클릭한 버튼만 active 클래서 추가
      btn.classList.add("active");

      currentFileter = btn.dataset.filter;
      //맨 위에서 currentfileter를 all로 정의했음
      //그래서 정확히 어떻게 돌아가는지는 모르겠네
      //
      render();
    });
  });
});

render();