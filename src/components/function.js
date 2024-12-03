export default function (){
    const [score, setscore] = useState(0);
    let highestScore = localStorage.getItem('highestscore');// Using useRef to hold the highest score
    const scoreInterval = useRef(null); // Using useRef to hold the interval ID
    const obstaclereciever = document.getElementsByClassName('obstaclereciever');
    const characterBox = document.getElementById('box');
    const position = characterBox ? characterBox.getBoundingClientRect() : null;
    const obposition =  obstaclereciever[0]? obstaclereciever[0].getBoundingClientRect() : null;
  let highestScorestorage ;
  
    const bgbox = document.getElementById('bg'); 
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
  
  
      if (characterBox) {
     
        characterBox.classList.add('run');
        addscore();
        bgbox.classList.add('bganimation');
        bgbox.style.animationPlayState = 'running';
        obstaclereciever[0].classList.add('obstacle');
        obstaclereciever[1].classList.add('obstacle');
        obstaclereciever[2].classList.add('obstacle');
        obstaclereciever[0].classList.remove('animationpaused')
        obstaclereciever[1].classList.remove('animationpaused')
        obstaclereciever[2].classList.remove('animationpaused')
  
        
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
        obstaclereciever[1].classList.add('animationpaused')
        obstaclereciever[2].classList.add('animationpaused')
  
      }
   
    };
    const checkCollision = () => {
      const characterPosition = characterBox ? characterBox.getBoundingClientRect() : null;
      const obstaclePosition = obstaclereciever[0]? obstaclereciever[0].getBoundingClientRect() : null;
      
      if (!characterPosition || !obstaclePosition) return false;
  
      const isColliding = (
        characterPosition.left+135 < obstaclePosition.right &&
        characterPosition.right-135 > obstaclePosition.left &&
        characterPosition.bottom  > obstaclePosition.bottom &&
        characterPosition.top <obstaclePosition.top
      );
  
      if (isColliding) {
        
        obstaclereciever[0].classList.add('animationpaused')
        bgbox.style.animationPlayState = 'paused';
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
    
    checkCollision();
    return (
        
    );
}