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


