const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext("2d");
const colors = document.getElementsByClassName("controls__color");
const range = document.getElementById("jsRange");
const pointSize = document.getElementById("jsSize");
const mode = document.getElementById("fill-btn");
const saveBtn = document.getElementById("save");

// 자주쓰는 값들
const INITIAL_COLOR = "#000"
const CANVAS_SIZE = 700;

// canvas 기본값
canvas.width = CANVAS_SIZE;
canvas.height = CANVAS_SIZE;
ctx.fillStyle ="white";
ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);

// stroke 기본값
ctx.strokeStyle = INITIAL_COLOR;
ctx.lineWidth = 2.5;

// fill 기본컬러
ctx.fillStyle = INITIAL_COLOR;

// 버튼 기본값
let painting = false;
let filling = false;

// 함수 

// mouse 클릭시 실행됨
function stopPainting(e){
  painting = false;
}
// mouse 클릭이 멈추면 실행됨
function startPainting(e){
  painting = true;
}

// mouse 움직이고있을때
function moveMouse(e){
  const x = e.offsetX;
  const y = e.offsetY;
  if(!painting){ //painting 값이 false라면 (mouseup)
    ctx.beginPath();
    ctx.moveTo(x, y);
  } else {
    ctx.lineTo(x, y);
    ctx.stroke();
  }
}

// mouse 클릭하고있을때
function mouseDown(e){
  painting = true;
}

// color box 클릭했을때 기본 컬러 변경
function changeColor(e){
  const color = e.target.style.backgroundColor;
  ctx.strokeStyle = color;
  ctx.fillStyle = color;
}

// range value 표시
function changeRange(e){
  rangeSize = e.target.value
  ctx.lineWidth = rangeSize;
  pointSize.innerHTML = rangeSize;
}

// fill & stroke mode변경함수
function modeClick(){
  if(filling === true){
    filling = false;
    mode.innerText = "Fill"
  } else {
    filling = true;
    mode.innerText = "Paint"
  }
}

// fill mode시 실행되는 함수
function canvasClick(){
  if(filling){
    ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
  }
}

function handleCTX(e){
  e.preventDefault();
}

function saveClick(){
  const image = canvas.toDataURL();
  const link = document.createElement("a");
  link.href = image;
  link.download = "paintJS[🎨]";
  link.click();
}


if(canvas){
  canvas.addEventListener("mousemove", moveMouse);
  canvas.addEventListener("mousedown", startPainting);
  canvas.addEventListener("mouseup", stopPainting);
  canvas.addEventListener("mouseleave", stopPainting);
  canvas.addEventListener("click", canvasClick);
  canvas.addEventListener("contextmenu", handleCTX);
}

Array.from(colors).forEach(color => color.addEventListener("click", changeColor))

if(range){
  range.addEventListener("input", changeRange);
}

if(mode){
  mode.addEventListener("click", modeClick);
}

if(saveBtn){
  saveBtn.addEventListener("click", saveClick);
}

pointSize.innerHTML = ctx.lineWidth;




