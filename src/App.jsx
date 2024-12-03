import { useState, useRef, useEffect } from 'react';
import './App.css';
import Background from './Background';
import Character from './components/character';
import GameOverPopup from './components/Gameover';

function App() {
  const [score, setscore] = useState(0);
  let highestScore = localStorage.getItem('highestscore');// Using useRef to hold the highest score
  const scoreInterval = useRef(null); // Using useRef to hold the interval ID
  const obstaclereciever = document.getElementsByClassName('obstaclereciever');
  const characterBox = document.getElementById('box');
  const position = characterBox ? characterBox.getBoundingClientRect() : null;
  const obposition =  obstaclereciever[0]? obstaclereciever[0].getBoundingClientRect() : null;
  let [duration,setduration] = useState(20);
  let  [minus,setminus]=useState(0);
let highestScorestorage ;
let [movementduration,setmduration] =useState(2);
  const bgbox = document.getElementById('bg');

  let [obstacleduration,setobstacleduration] =useState(4);
  let [newObstacleDurations ,setnewObstacleDurations ]= useState(0)
  let [animationDelay,setanimationdelay] =useState(4);
  const characterPosition = characterBox ? characterBox.getBoundingClientRect() : null;
    const obstaclePosition = obstaclereciever[0]? obstaclereciever[0].getBoundingClientRect() : null;
const obstacle = document.getElementById('obstacle')
const [Bgimage,setbgimage] = useState(true)
const [gameOver, setGameOver] = useState(false);
  const addscore = () => {
    // Check if the interval is already running
    if (scoreInterval.current === null) {
      scoreInterval.current = setInterval(() => {

      
        setscore(prevScore => prevScore + 1);
         // Increment the score
      }, 200);

    }
  };

  // Function to stop the score increment
  const stopScore = () => {
    if (scoreInterval.current !== null) {
      clearInterval(scoreInterval.current); // Clear the interval
      scoreInterval.current = null; // Reset the interval ID
    }
  };

  // Handling the jump functionality inside useEffect
  const handleJump = () => {
    const characterBox = document.getElementById('box');
    
    if (characterBox) {
      characterBox.classList.toggle('jump');

      setTimeout(() => {
        console.log(obstacleduration);
       
        console.log(duration);

        characterBox.classList.remove('jump');

           characterBox.style.transform='translateX(150px)'
            
           setTimeout(() => {
            characterBox.style.transform='translateX(0px) ' 
       characterBox.classList.add('slowthechange')
       setTimeout(() => {
        characterBox.classList.remove('slowthechange')
       }, 300);
           }, 400);

      }, 590);
    }
  };

  const handleJump2 = () => {
    const characterBox = document.getElementById('box');
    const bgbox = document.getElementById('bg'); 
    setnewObstacleDurations(newObstacleDurations=obstacleduration)

    if (characterBox) {
      characterBox.style.animationDuration=movementduration + 's !important';
      characterBox.classList.add('run');
      addscore();
        bgbox.style.animationDuration =duration+'s'
      bgbox.style.animationPlayState = 'running';
      obstaclereciever[0].classList.add('obstacle');
  
      obstaclereciever[0].classList.remove('animationpaused')
       
      // obstaclereciever[1].classList.remove('animationpaused')

    }
  };

  const Stop = () => {


    if (characterBox) {
      characterBox.classList.remove('run');
      console.log(position)

      console.log(obposition)
      stopScore();
      bgbox.style.animationPlayState = 'paused';
      obstaclereciever[0].classList.add('animationpaused')
   
      // obstaclereciever[1].classList.add('animationpaused')
    }
 
  };
  const checkCollision = () => {

    // const obstaclePosition1 = obstaclereciever[1]? obstaclereciever[1].getBoundingClientRect() : null;
    if (!characterPosition || !obstaclePosition) return false;

    const isColliding = (
      characterPosition.left+135 < obstaclePosition.right &&
      characterPosition.right-135 > obstaclePosition.left &&
      characterPosition.bottom  > obstaclePosition.bottom &&
      characterPosition.top <obstaclePosition.top
    );

    // const isColliding1 = (
    //   characterPosition.left+135 < obstaclePosition1.right &&
    //   characterPosition.right-135 > obstaclePosition1.left &&
    //   characterPosition.bottom  > obstaclePosition1.bottom &&
    //   characterPosition.top <obstaclePosition1.top
    // );

    if (isColliding ) {
      setGameOver(true)
      obstaclereciever[0].classList.add('animationpaused')
      // obstaclereciever[1].classList.add('animationpaused')
      bgbox.style.animationPlayState = 'paused';
      // setsecondduration (secondduration= undefined)
stopScore();
 highestScorestorage= score;

 let highestscorevalue = highestScore ;
if (highestScorestorage>highestscorevalue){
  localStorage.setItem("highestscore",highestScorestorage)
 highestscorevalue = localStorage.getItem("highestscore")
 localStorage.setItem('highestscorevalue',highestscorevalue)
 highestScore= localStorage.getItem("highestscorevalue")
}
// Stop the game when a collision occurs
    }
  };
  
  useEffect(() => {
checkCollision()

  }, [characterPosition,obstaclePosition ]);

  let lastScoreCheck = 0;

  setInterval(() => {
    if (score > 0 && score % 100 === 0 && score !== lastScoreCheck) {
      lastScoreCheck = score;
  
      // Update the 'minus' value
      setminus(minus=(score / 100));
  
      // Check the range of minus and update the durations only if minus is within the range
      if (minus > 0 && minus < 11) {
        const newDuration = duration - 1;
        const newMovementDuration = movementduration - 0.2;
        const newObstacleDuration = obstacleduration - 0.2;
  
        // Apply updates only if the new durations are greater than a minimum value
        if (newDuration > 0) setduration(newDuration);
        if (newMovementDuration > 0) setmduration(newMovementDuration);
        if (newObstacleDuration > 0) setobstacleduration(newObstacleDuration);
  
        // Update the animation styles
       setTimeout(() => {
        bgbox.style.animationDuration = newDuration + 's';
        setTimeout(() => {
          characterBox.style.animationDuration=movementduration + 's !important';
          setTimeout(() => {
            setnewObstacleDurations(newObstacleDurations=obstacleduration) 
          }, 300);
        }, 400);
       }, 500);
     
     
      }
    }
  }, 1000);
  
setTimeout(() => {
  setInterval(() => {
    setbgimage((prev)=>!prev) 
  ;
  }, 15000);
}, 4000);
  return (
    <>
{gameOver && <GameOverPopup isVisible={gameOver} score={score} onTryAgain={()=>{
    window.location.reload();
}}/>}
      <Character />
      <div className='obstaclereciever translate-x-[100%]' id='obstacle' style={{animation:'beobstacle  infinite linear',animationDuration:newObstacleDurations +'s',animationDelay:animationDelay+'s',backgroundImage:!Bgimage ?"url('/eu.png')":"url('/magical-crystal-with-swirling-colors-digital-art-style-illustration_812426-6439.png')"}}></div>
    {/* <div className="flex justify-center gap-0 p-0 m-0 obstaclereciever " id='obstacle2' style={{animation:'beobstacle2  infinite linear',animationDuration:(newObstacleDurations>0 && (newObstacleDurations+1.6)) +'s',
    animationDelay:(animationDelay+1.5)+'s'
    
    }}>
    <div className='  childobstacle' >
       
       </div>
       <div className='   childobstacle' >
        
        </div>
    </div> */}
      {/* <div className='obstaclereciever translate-x-[100%] '></div>
      <div className='obstaclereciever translate-x-[100%] '></div> */}
      <Background />

      {/* Controls container */}
      <div className="controls fixed right-10 bottom-10 grid gap-4">
        <button
          className="control-btn text-center align-middle"
          id="jump-btn"
          onClick={handleJump}
        > 
 <img src="/keyboard_arrow_up_24dp_E8EAED_FILL0_wght400_GRAD0_opsz24.png" alt="" className='  w-16 ' />
     </button>

        <button className="control-btn text-center align-middle p-5 " id="forward-btn" onClick={handleJump2}>
        <img src="/arrow_forward_ios_24dp_E8EAED_FILL0_wght400_GRAD0_opsz24 (1).png" alt="" className=' w-12 ' />
        </button>
      
      </div>
      <center className='score flex fixed top-4  justify-center text-center  right-4 gap-10 p-4 py-2 '>
        <p>{' HI - ' + (highestScore===null?0:highestScore)}</p>
        <p>{' SC - ' + score}</p>
      </center>
      
    </>
  );
}

export default App; 