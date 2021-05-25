
const ROCK = "https://raw.githubusercontent.com/thpham1997/rock_paper_scissor_game/main/icon/rock.png";
const PAPER = "https://raw.githubusercontent.com/thpham1997/rock_paper_scissor_game/main/icon/paper.png";
const SCISSOR = "https://raw.githubusercontent.com/thpham1997/rock_paper_scissor_game/main/icon/scissor.png";

const BUTTONS = document.getElementsByClassName('userButton');
const CHOICES = [ROCK, PAPER, SCISSOR];

const USER_CHOICE = document.getElementById('user_choice');
const COMP_CHOICE = document.getElementById('comp_choice');
const USER_NAME = document.getElementById('user-name').children[0];
const USER_SCORE = document.getElementById('user-score').children[0];
const COMP_NAME = document.getElementById('comp-name').children[0];
const COMP_SCORE = document.getElementById('comp-score').children[0];
const RESULT_WORD = document.getElementById('result-word').children[0];
let user_score = 0;
let comp_score = 0;
let user_name;
let comp_name;
let alert_message = `Welcome to TP's RPS game!
This is my first project with JS, so enjoy and give me some feedback`;
let username_message = `Now, please give me your name, any name that makes us happy`;
let compname_message = `Then, how about an evil name for the oponent`;
function start(){
  setTimeout(welcome, 2000);
}
start();
function welcome(){
  alert(alert_message);
  user_name = prompt(username_message, 'Mighty Hero');
  comp_name = prompt(compname_message, 'Tiny Villianz');
  if(user_name.trim()==="") user_name = 'User';
  if(comp_name.trim()==="") comp_name = 'Comp';
  USER_NAME.innerHTML = user_name;
  COMP_NAME.innerHTML = comp_name;
}
// welcome();

function changBackgroundImage(target, bgURL){
  target.style.backgroundImage = `url(${bgURL})`;
}

function randomCompBgImage(){
  let rand = Math.floor(Math.random()*CHOICES.length);
  changBackgroundImage(COMP_CHOICE, CHOICES[rand]);
}

function comp_selection(comp_element){
  let bgImg_arr = getComputedStyle(comp_element).backgroundImage.split("/");
  let i = bgImg_arr.length;
  if(bgImg_arr[i - 1].search("rock") !== -1){
    console.log(`comp 0` );
    return 0;
  }else if(bgImg_arr[i - 1].search("paper") !== -1){
    console.log(`comp 1` );
    return 1;
  }else {
    console.log(`comp 2` );
    return 2;
  }
}

function isWin(user, comp){
  if(user===0){ //rock
    if(comp === 0) return undefined; //rock
    if(comp === 1) return false; //paper
    else return true; //scissor
  }else if(user===1){
    if(comp === 0) return true;
    if(comp === 1) return undefined;
    else return false;
  }else{
    if(comp === 0) return false;
    if(comp === 1) return true;
    else return undefined;
  }
}

function score(win){
  if(win === true){
    user_score++;
    USER_SCORE.innerHTML = user_score;
  }else if(win === false){
    comp_score++;
    COMP_SCORE.innerHTML = comp_score;
  }
}

function FinalResult(){
  if(user_score === 5){
    for (let index = 0; index < BUTTONS.length; index++) {
      BUTTONS[index].disabled = true;
    }
    RESULT_WORD.innerHTML = `${user_name} WON`;
    setTimeout(function(){
      alert('You Won');
      refresh();
    }, 1500);
  }
  if(comp_score === 5){
    for (let index = 0; index < BUTTONS.length; index++) {
      BUTTONS[index].disabled = true;
    }
    RESULT_WORD.innerHTML = `${user_name} LOST`;
    setTimeout(function(){
      alert('You Lost');
      refresh();
    }, 1500); 
  }
  if(comp_score < 5 && user_score < 5){
    RESULT_WORD.innerHTML = `${5 - user_score} more point to get`;
  }
}

function refresh(){
  user_score = 0;
  comp_score = 0;
  if(confirm("DO YOU WANT TO TRY AGAIN?")){
    location.reload();
  }
}


for (let index = 0; index < BUTTONS.length; index++) {
  BUTTONS[index].addEventListener("click", function(e){
    changBackgroundImage(USER_CHOICE,CHOICES[index]);
    randomCompBgImage();
    console.log(`user ` + index);
    let com_choice = comp_selection(COMP_CHOICE);
    score(isWin(index, com_choice));
    FinalResult();
  });
}
