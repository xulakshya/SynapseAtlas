
document.addEventListener('DOMContentLoaded', () => {
  const btn = document.querySelector('#mobileMenuBtn');
  const menu = document.querySelector('#mobileMenu');
  if (btn && menu) btn.addEventListener('click', ()=> menu.classList.toggle('hidden'));

  // Stat counters
  for (const el of document.querySelectorAll('[data-count]')){
    const target = +el.dataset.count; let v=0;
    const step = ()=>{ v += Math.max(1,(target - v) * 0.08); el.textContent = Math.round(v); if (v < target) requestAnimationFrame(step); };
    step();
  }

  // Hero particles (guaranteed contrast because we draw under overlay)
  const c = document.getElementById('heroViz'); if (c) {
    const d = c.getContext('2d'); const DPR = Math.min(2, window.devicePixelRatio||1);
    const P = []; function size(){ c.width=c.clientWidth*DPR; c.height=320*DPR; d.setTransform(DPR,0,0,DPR,0,0); }
    size(); window.addEventListener('resize', size);
    for (let i=0;i<80;i++) P.push({x:Math.random()*c.clientWidth,y:Math.random()*300,vx:(Math.random()-0.5)*0.6,vy:(Math.random()-0.5)*0.6});
    function loop(){ d.clearRect(0,0,c.clientWidth,320);
      for (const p of P){ p.x+=p.vx; p.y+=p.vy; if(p.x<0||p.x>c.clientWidth)p.vx*=-1; if(p.y<0||p.y>320)p.vy*=-1; }
      // draw connections
      for (let i=0;i<P.length;i++){ for (let j=i+1;j<P.length;j++){ const dx=P[i].x-P[j].x, dy=P[i].y-P[j].y; const dist=dx*dx+dy*dy; if(dist<120*120){ const a = 1 - dist/(120*120); d.strokeStyle=`rgba(160,190,255,${0.25*a})`; d.beginPath(); d.moveTo(P[i].x,P[i].y); d.lineTo(P[j].x,P[j].y); d.stroke(); } } }
      for (const p of P){ d.fillStyle='rgba(255,255,255,0.7)'; d.fillRect(p.x,p.y,2,2); }
      requestAnimationFrame(loop);
    } loop();
  }

  // SW
  if ('serviceWorker' in navigator){
    window.addEventListener('load', ()=> {
      const isLocal = location.hostname==='localhost'||location.hostname==='127.0.0.1';
      if (location.protocol==='https:'||isLocal){ navigator.serviceWorker.register('sw.js').catch(console.warn); }
    });
  }
});
