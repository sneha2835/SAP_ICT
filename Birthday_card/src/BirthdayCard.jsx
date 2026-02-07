import { useState } from "react";

export default function BirthdayCard() {
  const [open, setOpen] = useState(false);

  return (
    <div className="card-wrapper">
      <div className={`card ${open ? "open" : ""}`}>
        
        {/* Front */}
        <div className="card-face front" onClick={() => setOpen(true)}>
          <h1> Happy Birthday</h1>
          <h1> 🎉 Love 🎉</h1>
          <p>Click to open</p>
        </div>

        {/* Inside */}
        <div className="card-face inside">
          <p>
            May your days be filled with happiness,  
            your goals turn into achievements,  
            and your life stay as bright as your smile ✨
          </p>

          <p className="signature">— With warm wishes 🌸</p>
          <p> Sneha...</p>

          <button onClick={() => setOpen(false)}>Close Card</button>
        </div>

      </div>

      {open && <Confetti />}
    </div>
  );
}

function Confetti() {
  return (
    <div className="confetti">
      {Array.from({ length: 50 }).map((_, i) => (
        <span key={i}>🎊</span>
      ))}
    </div>
  );
}
