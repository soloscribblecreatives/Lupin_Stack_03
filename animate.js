function runAnimation() {
  window.requestAnimationFrame(function () {

  const canvas = document.getElementById('board');
  const ctx = canvas.getContext('2d');
  let drawing = false;
  let lastX = 0;
  let lastY = 0;
  let thickness = 5;
  let color = "#000000";

  // Set color from color picker
  document.getElementById('colorPicker').addEventListener('input', (e) => {
    color = e.target.value;
  });

  function setThickness(val) {
    thickness = val;
  }

  function drawLine(x, y) {
    ctx.strokeStyle = color;
    ctx.lineWidth = thickness;
    ctx.lineCap = 'round';

    ctx.beginPath();
    ctx.moveTo(lastX, lastY);
    ctx.lineTo(x, y);
    ctx.stroke();

    lastX = x;
    lastY = y;
  }

  function startDrawing(x, y) {
    drawing = true;
    [lastX, lastY] = [x, y];
  }

  function stopDrawing() {
    drawing = false;
  }

  // Handle both mouse and touch events
  function getXY(e) {
    if (e.touches && e.touches.length > 0) {
      const rect = canvas.getBoundingClientRect();
      return [
        e.touches[0].clientX - rect.left,
        e.touches[0].clientY - rect.top
      ];
    } else {
      const rect = canvas.getBoundingClientRect();
      return [
        e.clientX - rect.left,
        e.clientY - rect.top
      ];
    }
  }

  canvas.addEventListener('mousedown', (e) => {
    const [x, y] = getXY(e);
    startDrawing(x, y);
  });

  canvas.addEventListener('mousemove', (e) => {
    if (!drawing) return;
    const [x, y] = getXY(e);
    drawLine(x, y);
  });

  canvas.addEventListener('mouseup', stopDrawing);
  canvas.addEventListener('mouseout', stopDrawing);

  canvas.addEventListener('touchstart', (e) => {
    const [x, y] = getXY(e);
    startDrawing(x, y);
  }, { passive: false });

  canvas.addEventListener('touchmove', (e) => {
    if (!drawing) return;
    const [x, y] = getXY(e);
    drawLine(x, y);
    e.preventDefault();
  }, { passive: false });

  canvas.addEventListener('touchend', stopDrawing);

  function saveDrawing() {
    const link = document.createElement('a');
    link.download = 'whiteboard.png';
    link.href = canvas.toDataURL();
    link.click();
  }

  });
}