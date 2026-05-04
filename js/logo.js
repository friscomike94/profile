// MK Badge Logo — Hover rotation & glitch engine

(function() {
  const hexSpin   = document.getElementById('hex-spin');
  const hexOuter  = document.getElementById('hex-outer');
  const innerRing = document.getElementById('inner-ring');
  const glitchRed  = document.getElementById('glitch-red');
  const glitchBlue = document.getElementById('glitch-blue');
  const badgeHero  = document.getElementById('badge-hero');

  if (!hexSpin) return;

  const CX = 100, CY = 100;
  const hexBase = [
    [100,12],[172,52],[172,148],[100,188],[28,148],[28,52]
  ];
  const dots = Array.from({length:6}, (_,i) => document.getElementById('dot'+i));

  let angle        = 0;
  let innerAngle   = 0;
  let currentSpeed = 0;
  let targetSpeed  = 0;
  let isHovered    = false;
  let glitchTimer  = null;

  function rotatePoint(px, py, deg) {
    const rad = deg * Math.PI / 180;
    const c = Math.cos(rad), s = Math.sin(rad);
    return [
      CX + (px - CX) * c - (py - CY) * s,
      CY + (px - CX) * s + (py - CY) * c
    ];
  }

  function buildPolyPoints(pts, deg) {
    return pts.map(([x,y]) => rotatePoint(x,y,deg).map(n=>n.toFixed(2)).join(',')).join(' ');
  }

  function startGlitch() {
    function fire() {
      const dx = (Math.random() - 0.5) * 6;
      const dy = (Math.random() - 0.5) * 6;
      glitchRed.setAttribute('transform',  `translate(${(2.5+dx).toFixed(2)},${(-1.5+dy).toFixed(2)})`);
      glitchBlue.setAttribute('transform', `translate(${(-2.5-dx).toFixed(2)},${(1.5-dy).toFixed(2)})`);
      setTimeout(() => {
        glitchRed.setAttribute('transform',  'translate(2.5,-1.5)');
        glitchBlue.setAttribute('transform', 'translate(-2.5,1.5)');
      }, 80);
      if (isHovered) glitchTimer = setTimeout(fire, 500 + Math.random() * 900);
    }
    fire();
  }

  function stopGlitch() {
    clearTimeout(glitchTimer);
    glitchRed.setAttribute('transform',  'translate(2.5,-1.5)');
    glitchBlue.setAttribute('transform', 'translate(-2.5,1.5)');
  }

  if (badgeHero) {
    badgeHero.addEventListener('mouseenter', () => {
      isHovered = true;
      targetSpeed = 2.2;
      startGlitch();
    });
    badgeHero.addEventListener('mouseleave', () => {
      isHovered = false;
      targetSpeed = 0;
      stopGlitch();
    });
  }

  (function tick() {
    currentSpeed += (targetSpeed - currentSpeed) * 0.04;
    angle      += currentSpeed;
    innerAngle -= currentSpeed * 0.65;

    if (hexSpin)   hexSpin.setAttribute('points',   buildPolyPoints(hexBase, angle));
    if (hexOuter)  hexOuter.setAttribute('points',  buildPolyPoints(hexBase, angle * 0.3));

    dots.forEach((dot, i) => {
      if (!dot) return;
      const [nx, ny] = rotatePoint(hexBase[i][0], hexBase[i][1], angle);
      dot.setAttribute('cx', nx.toFixed(2));
      dot.setAttribute('cy', ny.toFixed(2));
    });

    if (innerRing) innerRing.setAttribute('stroke-dashoffset', (innerAngle * 0.5).toFixed(2));

    requestAnimationFrame(tick);
  })();
})();
