export default function Controls(){
    return (
      <div className="controls fixed right-10 bottom-10 grid gap-4">
      <button
        className="control-btn px-10"
        id="jump-btn"
        onClick={handleJump}
      >
        Jump
      </button>

      <button className="control-btn px-10" id="forward-btn" onClick={handleJump2}>
        Forward
      </button>
      <button className="control-btn px-10" id="stop-btn" onClick={Stop}>
        Stop
      </button>
    </div>  
    );
}