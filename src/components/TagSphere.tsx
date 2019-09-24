import React, { useEffect, createRef } from 'react';

import useWindowWidth from './hooks/useWindowWidth';

function TagSphere() {
  const cloudSphere = createRef<any>();
  const texts = [
    'HTML5', 'CSS3', 'Javascript', 'Typescript', 'Babel', 'Vue', 'Vuex', 'Vuetify', 'VueRouter', 'React', 'Redux', 'ReactRouter', 'Laravel', 'BEM', 'NPM', 'Webpack', 'Git', 'Bootstrap', 'Gulp', 'Pug', 
  ];

  const windowWidth = useWindowWidth();
  const adaptSphereSize = () => {
    if (windowWidth < 1200 && windowWidth > 576) {
      return {
        width: 400,
        height: 400,
        radius: 160,
        fontSize: 18,
      }
    } else if (windowWidth <= 576) {
      return {
        width: 320,
        height: 320,
        radius: 120,
        fontSize: 14,
      }
    }
  }

  const counts = [1,2,4,5,4,2,1];
  const options = {
    ...adaptSphereSize(),
    tilt: Math.PI / 9,
    initialVelocityX: 0.09,
    initialVelocityY: 0.09,
    initialRotationX: Math.PI * 0.14,
    initialRotationZ: 0
  };

  function wordSphere(canvas:any, texts:string[], counts:number[], options: any) {
    const π = Math.PI;
    const {
      width = 600,
      height = 600,
      radius = 230,
      fontSize = 26,
      tilt = 0,
      initialVelocityX = 0,
      initialVelocityY = 0,
      initialRotationX = 0,
      initialRotationZ = 0,
    } = options;
    
    let vx = initialVelocityX, vy = initialVelocityY;
    let rx = initialRotationX, rz = initialRotationZ;
    
    let ctx = canvas.getContext('2d'); 
    
    canvas.width = width * 2;
    canvas.height = height * 2;
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;
    ctx.scale(2,2); 
  
    let clicked = false, lastX:number, lastY:number;

    function catchCoordinatesOnMouseDown(event:any) {
      clicked = true;

      switch (event.type) {
        case 'touchstart':
          event.preventDefault();
          lastX = event.touches[0].screenX;
          lastY = event.touches[0].screenY;
          break;
        case 'mousedown':
          lastX = event.screenX;
          lastY = event.screenY;
      }
    }

    function movingSphere(event: any) {
      if (!clicked) return;
      let coordX, coordY;

      switch (event.type) {
        case 'touchmove':
            event.preventDefault();
            coordX = event.touches[0].screenX;
            coordY = event.touches[0].screenY;
            break;
        case 'mousemove':
          coordX = event.screenX;
          coordY = event.screenY;
      }

      let [dx, dy] = [coordX - lastX, coordY - lastY];
      [lastX, lastY] = [coordX, coordY];
  
      rz += -dy * 0.01;
      rx += dx * 0.01;
  
      vx = dx * 0.1;
      vy = dy * 0.1;
  
      if (!looping) startLoop();
    }

    function sphereContactEnd(event: any) {
      event.preventDefault()

      clicked = false;
    }

    canvas.addEventListener('mousedown', catchCoordinatesOnMouseDown);
    canvas.addEventListener('mousemove', movingSphere);
    canvas.addEventListener('mouseup', sphereContactEnd);
    canvas.addEventListener('mouseleave', sphereContactEnd);

    canvas.addEventListener('touchstart', catchCoordinatesOnMouseDown, false);
    canvas.addEventListener('touchmove', movingSphere, false);
    canvas.addEventListener('touchend', sphereContactEnd, false);
    canvas.addEventListener('touchcancel', sphereContactEnd, false);
    
    function rot(x:number,y:number,t:number) {
      return [x*Math.cos(t)-y*Math.sin(t), x*Math.sin(t)+y*Math.cos(t)];
    }
  
    function render() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.textAlign = 'center';
  
      let ix = 0, iz = 0;
      for (const text of texts) {
        const degZ = (π/(counts.length-1)) * iz;
        const degX = (2*π/counts[iz]) * ix;
  
        let x = radius * Math.sin(degZ) * Math.cos(degX);
        let y = radius * Math.sin(degZ) * Math.sin(degX); 
        let z = radius * Math.cos(degZ) + 8*(ix % 2);
  
        [y,z] = rot(y, z, tilt);
        [x,z] = rot(x, z, rz);
        [x,y] = rot(x, y, rx);

        const alpha = 0.6 + 0.4 * (x/radius);
        const size = fontSize + 2 + 5*(x/radius);
        ctx.fillStyle = `rgba(8,253,216,${alpha})`;
        ctx.font = `${size}px "Brandon Grotesque"`;
        ctx.fillText(text, y + width/2, -z + height/2);
  
        ix--;
        if (ix < 0) {
          iz++;
          ix = counts[iz] - 1;
        }
      }
    }
  
    let looping = false;
    function rendererLoop() {
      if (looping) window.requestAnimationFrame(rendererLoop);
      render();
      
      if (vx > 0) vx = vx - 0.01;
      if (vy > 0) vy = vy - 0.01;
      if (vx < 0) vx = vx + 0.01;
      if (vy > 0) vy = vy + 0.01;
      if (vx === 0 && vy === 0) stopLoop();
      
      rz += vy * 0.01;
      rx += vx * 0.01;
    }
  
    function startLoop() {
      looping = true;
      window.requestAnimationFrame(rendererLoop);
    }
  
    function stopLoop() {
      looping = false;
    }
    startLoop();
  }

  useEffect(() => {
    const canvas = cloudSphere.current;
    wordSphere(canvas, texts, counts, options);
  });
  

  return (
    <canvas ref={cloudSphere}></canvas>
  );
}

export default TagSphere;