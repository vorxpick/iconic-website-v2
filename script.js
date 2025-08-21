// Custom cursor
const cursor = document.getElementById('cursor');
document.addEventListener('mousemove', e => {
  cursor.style.top = e.clientY + 'px';
  cursor.style.left = e.clientX + 'px';
});

// Rock Paper Scissors
let userScore = 0, compScore = 0;
const resultEl = document.getElementById('rps-result');
const scoreEl = document.getElementById('rps-score');

function playRPS(userChoice) {
  const choices = ['rock','paper','scissors'];
  const computerChoice = choices[Math.floor(Math.random()*3)];
  let result = '';

  if(userChoice===computerChoice){
    result=`Draw! Both chose ${userChoice}.`;
  } else if(
    (userChoice==='rock' && computerChoice==='scissors') ||
    (userChoice==='paper' && computerChoice==='rock') ||
    (userChoice==='scissors' && computerChoice==='paper')
  ){
    result=`You win! ${capitalize(userChoice)} beats ${computerChoice}.`;
    userScore++;
  } else {
    result=`You lose! ${capitalize(computerChoice)} beats ${userChoice}.`;
    compScore++;
  }
  resultEl.textContent=result;
  scoreEl.textContent=`You: ${userScore} | Computer: ${compScore}`;
}
function capitalize(str){ return str.charAt(0).toUpperCase() + str.slice(1); }

// Tic Tac Toe
const tttBoard=document.getElementById('ttt-board');
const tttResult=document.getElementById('ttt-result');
const tttReset=document.getElementById('ttt-reset');
let tttState=Array(9).fill('');
let player='X', computer='O', gameActive=true;

function checkWinnerTTT(){
  const winCond=[[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];
  for(let c of winCond){
    const [a,b,cIdx]=c;
    if(tttState[a] && tttState[a]===tttState[b] && tttState[a]===tttState[cIdx]){
      gameActive=false;
      tttResult.textContent=`${tttState[a]} wins!`;
      return true;
    }
  }
  if(!tttState.includes('')){
    gameActive=false;
    tttResult.textContent="It's a tie!";
    return true;
  }
  return false;
}

function computerMoveTTT(){
  let empty=tttState.map((v,i)=>v===''?i:null).filter(v=>v!==null);
  let rand=empty[Math.floor(Math.random()*empty.length)];
  tttState[rand]=computer;
  tttBoard.children[rand].textContent=computer;
  checkWinnerTTT();
}

function handleClickTTT(e){
  let idx=parseInt(e.target.getAttribute('data-index'));
  if(tttState[idx]!==''||!gameActive) return;
  tttState[idx]=player;
  e.target.textContent=player;
  if(!checkWinnerTTT()) setTimeout(computerMoveTTT,300);
}

function createTTTBoard(){
  tttBoard.innerHTML='';
  tttState.forEach((_,i)=>{
    let cell=document.createElement('div');
    cell.classList.add('ttt-cell');
    cell.setAttribute('data-index',i);
    cell.addEventListener('click', handleClickTTT);
    tttBoard.appendChild(cell);
  });
}

tttReset.addEventListener('click',()=>{
  tttState=Array(9).fill('');
  gameActive=true;
  tttResult.textContent='';
  createTTTBoard();
});

createTTTBoard();

// ============================
// Skill Modal Functionality
// ============================
const skills = document.querySelectorAll('.skills-list li');
const modal = document.createElement('div');
modal.classList.add('modal');
modal.innerHTML = `
  <div class="modal-content">
    <h3 id="modal-title"></h3>
    <p id="modal-desc"></p>
    <button class="close-btn">Close</button>
  </div>
`;
document.body.appendChild(modal);

const modalTitle = document.getElementById('modal-title');
const modalDesc = document.getElementById('modal-desc');
const closeBtn = modal.querySelector('.close-btn');

const skillDescriptions = {
  "HTML & CSS": "I can build responsive, visually appealing websites using HTML for structure and CSS for design and animations.",
  "JavaScript & DOM Manipulation": "I use JavaScript to create interactive websites, control elements dynamically, and make games like Tic Tac Toe and RPS.",
  "Responsive Web Design": "I ensure websites look great on any device using media queries, flexible layouts, and modern design principles.",
  "Content Creation & Tutorials": "I create tutorials and guides that teach others how to build websites, make games, and explore creative coding."
};

skills.forEach(skill => {
  skill.addEventListener('click', () => {
    modal.style.display = 'flex';
    modalTitle.textContent = skill.textContent;
    modalDesc.textContent = skillDescriptions[skill.textContent] || 'Description coming soon!';
  });
});

closeBtn.addEventListener('click', () => modal.style.display = 'none');
modal.addEventListener('click', e => {
  if(e.target === modal) modal.style.display = 'none';
});
