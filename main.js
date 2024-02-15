let horizontalBar = document.getElementById("under-line");
let horizontalMenus = document.querySelectorAll(".task-tabs div");

function horizontalIndicator(e) {
  horizontalBar.style.left = e.offsetLeft + "px";
  horizontalBar.style.width = e.offsetWidth + "px";
}

horizontalMenus.forEach((menu) =>
  menu.addEventListener("click", (e) => {
    horizontalIndicator(e.currentTarget);
  })
);

// 1. 유저가 값을 입력한다.
// 2. +버튼을 클릭하면, 할일이 추가된다.
// 3. delete 버튼을 누르면 할일이 삭제된다.
// 4. check 버튼을 누르면 할일이 끝나면서 밑줄이 간다.
//      check 버튼을 클릭하는 순간 true를 false로
//      true 이면 끝난걸로 간주하고 밑줄 보여주기
//      false 이면 안끝난걸로 간주하고 그대로
// 5. 진행중 끝남 탭을 누르면, 언더바가 이동한다.
// 6. 끝남탭은, 끝난 아이템만, 진행중탭은 진행중인 아이템만 나온다.
// 7. 전체탭을 누르면 전체 아이템이 나오는 것

//1. 유저가 값을 입력한다.
let taskInput = document.getElementById("task-input");

//2. + 버튼을 클릭하면, 할일이 추가된다.
let addButton = document.getElementById("add-button");

let tabs = document.querySelectorAll(".task-tabs div");

//2. 할일을 추가하는 변수 생성
let taskList = [];

let mode = "all";

let filterList = [];

addButton.addEventListener("click",addTask);

for(let i = 1; i<tabs.length; i++){
    tabs[i].addEventListener("click", function(event){filter(event)})
};

function addTask(){
    if (taskInput.value.trim() === "") { // trim()을 사용하여 문자열 양 끝의 공백을 제거합니다.
        alert("Todo List를 입력해주세요."); // 에러 메시지 표시
        return; // 추가를 중단하고 함수를 종료합니다.
    }
    let task = {
        id: randomIDGenerate(),
        taskContent: taskInput.value,
        isComplete: false,
    };
    taskList.push(task);
    console.log(taskList);
    render();
    taskInput.value = ""; 
}

// 그리는 함수
function render(){
    let list = []
    // 1. 내가 선택한 탭에 따라서
    if(mode === "all"){
        list = taskList;
    }else if(mode === "ongoing" || mode === "done"){
        list = filterList;
    }
    // 2. 리스트를 달리 보여준다.
    // all taskList
    // ongoing, done filterList
    let resultHTML = ''
    for(let i=0; i<list.length; i++){
        if(list[i].isComplete == true){
            resultHTML += `<div class="task">
            <div class="task-done">${list[i].taskContent}</div>
            <div>
              <button onclick="toggleComplete('${list[i].id}')">Check</button>
              <button onclick="deleteTask('${list[i].id}')">Delete</button>
            </div>
          </div>`;
        } else{ resultHTML += `<div class="task">
        <div>${list[i].taskContent}</div>
        <div>
          <button onclick="toggleComplete('${list[i].id}')">Check</button>
          <button onclick="deleteTask('${list[i].id}')">Delete</button>
        </div>
      </div>`;
        }   
    }    

    document.getElementById("task-board").innerHTML = resultHTML;
}

function toggleComplete(id) {
    for (let i =0; i < taskList.length; i++){
        if(taskList[i].id == id){
            taskList[i].isComplete = !taskList[i].isComplete;
            break;
        }
    }
    render();
}

function deleteTask(id){
    for(let i = 0; i<taskList.length; i++){
        if(taskList[i].id == id){
            taskList.splice(i,1)
            break;
        }
    }
    render();
}

function filter(event){
    mode = event.target.id
    filterList = [];
    if(mode == "all"){
        //전체 리스틀 보여준다.
        render();
    } else if(mode == "ongoing"){
        // 진행중인 아이템을 보여준다.
        // task.isComplete = false
        for(let i = 0; i < taskList.length; i++){
            if(taskList[i].isComplete === false){
            filterList.push(taskList[i])
            }
        }
        render();
        console.log("진행중", filterList);
    } else if(mode == "done"){
        // 끝나는 케이스
        // task.isComplete = true
        for(let i = 0; i<taskList.length; i++){
            if(taskList[i].isComplete === true){
                filterList.push(taskList[i])
            }
        }
        render();
    }
}

function randomIDGenerate(){
    return '_' + Math.random().toString(36).substr(2,9);
}

// Enter 키를 누를 때 할 일을 자동으로 추가하는 함수
function handleEnterKey(event) {
    // 키가 눌러진 키코드가 13인지 확인하여 Enter 키인지 확인합니다.
    if (event.keyCode === 13) {
        addTask(); // 할 일을 추가하는 함수 호출
    }
}

// 입력창에 키보드 이벤트 리스너 추가
taskInput.addEventListener("keypress", handleEnterKey);

