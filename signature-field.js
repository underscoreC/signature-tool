window.addEventListener('load', function() {

  const signField = document.getElementById('sign-field');
  const ctx = signField.getContext('2d');
  ctx.fillStyle = '#000';
  ctx.strokeStyle = 'black';
  ctx.lineWidth = 3;

  var delay = 2;

  var positionX, positionY;
  var drawing = false;
  var drawn = false;

  signField.addEventListener('mousedown', event => {
    drawing = true;
    ctx.beginPath();
    positionX = event.offsetX;
    positionY = event.offsetY;
  })
  signField.addEventListener('mouseup', () => {
    drawing = false;
    if (!drawn) {
      console.log('point!');
      ctx.arc(positionX, positionY, 2, 0, 2 * Math.PI);
      ctx.fill();
    }
    drawn = false;
  })
  signField.addEventListener('mouseleave', () => {
    drawing = false;
    drawn = false;
  })
  signField.addEventListener('mousemove', event => {
    if (!drawing) {
      ctx.closePath();
      return;
    }
    if (delay) {
      delay--;
      return;
    }
    delay = 2;
    drawn = true;

    ctx.moveTo(positionX, positionY);
    // ctx.bezierCurveTo()
    ctx.lineTo(event.offsetX, event.offsetY);
    ctx.stroke();

    positionX = event.offsetX;
    positionY = event.offsetY;

  })


  // function distanceBetween(pointX, pointY, offsetX, offsetY) {
  //   return
  // }

  const copyButton = this.document.getElementById('copy-signature');
  copyButton.addEventListener('click', () => {
    console.log('Code copied!');
    navigator.clipboard.writeText(`<html><img src=\"${signField.toDataURL()}\"></html>`);
    copyButton.innerHTML = "Unterschrift kopiert!";
    this.setTimeout(window.close, 500);
  });

  const clearButton = this.document.getElementById('clear-signature');
  clearButton.addEventListener('click', () => {
    ctx.clearRect(0, 0, signField.width, signField.height);
  })
})
