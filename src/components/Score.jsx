import React from 'react'

const Score = () => {
  return (
 
         <center className='score flex fixed top-4  justify-center text-center  right-4 gap-10 p-4 py-2 '>
        <p>{' HI - ' + (highestScore===null?0:highestScore)}</p>
        <p>{' SC - ' + score}</p>
      </center>

  )
}

export default Score
