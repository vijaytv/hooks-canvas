import React from 'react';
import './App.css';
import Img from './images/worldmap.png';

function draw(ctx, midX,midY,r, fill) 
{
       // ctx.save();
        //ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.beginPath();
        ctx.arc(midX, midY, r, 0, 2 * Math.PI);
        //ctx.restore();
        //ctx.stroke();
        if(fill) {
          ctx.fillStyle = "#F00";
          ctx.fill();
        } else {
          // ctx.strokeStyle = "#FF0000";
          // ctx.stroke();
          ctx.fillStyle = "rgba(255, 0, 0, 0.2)";
          ctx.fill();
        }
}
var radius = 20;
var midX;
var midY;
var mouseX;
var mouseY;
var startX;
var startY;
var isDown = false;
function App() {
  const [locations, setLocations] = React.useState([])
  const canvasRef = React.useRef(null);
  const imgRef = React.useRef(null);
  React.useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(imgRef.current, 0,0, canvas.width, canvas.height)
    locations.forEach(location => draw(ctx, location.midX, location.midY, location.radius))
  })
  function handleCanvasClick(e) {
      if (!isDown) {
        return;
    }
    e.preventDefault();
    isDown = false;
    const newLocation = { midX, midY, radius  }
    setLocations([...locations, newLocation])
  }

function handleMouseDown(e) {
  e.preventDefault();
 // e.stopPropagation();
  startX = parseInt(e.clientX - 20);
  startY = parseInt(e.clientY - 20);
  radius = 0;
  isDown = true;
}

function handleMouseMove(e) {
  if (!isDown) {
      return;
  }
  e.preventDefault();
  //e.stopPropagation();
  mouseX = parseInt(e.clientX - 20);
  mouseY = parseInt(e.clientY - 20);
  if(isDown)
  {
      var dx = Math.abs(startX - mouseX);
      var dy = Math.abs(startY - mouseY);
      midX = (startX + mouseX) / 2;
      midY = (startY + mouseY) / 2;
      radius = Math.sqrt(dx * dx + dy * dy) / 2;
      const canvas = canvasRef.current
      const ctx = canvas.getContext('2d')
      draw(ctx,midX,midY,radius, true);
  }
}

function handleMouseOut(e) {
    if (!isDown) {
        return;
    }
    e.preventDefault();
    //e.stopPropagation();
    isDown = false;
}
  function handleClear() {
    setLocations([])
  }
  function handleUndo() {
    setLocations(locations.slice(0, -1))
  }
  return (
    <>
      <div className="controls">
        <button onClick={handleClear}>Clear</button>
        <button onClick={handleUndo}>Undo</button>
      </div>
      <canvas
        ref={canvasRef}
        width={window.innerWidth}
        height={window.innerHeight}
        onMouseDown={handleMouseDown}
        onMouseUp={handleCanvasClick}
        onMouseMove={handleMouseMove}
        onMouseOut={handleMouseOut}
      />
      <img ref={imgRef}  src={Img} style={{visibility: 'hidden'}} />

    </>
  )
}
export default App
