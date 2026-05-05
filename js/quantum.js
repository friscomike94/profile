(function () {
  var canvas = document.getElementById('quantum-canvas');
  if (!canvas) return;
  var ctx = canvas.getContext('2d');
  var W, H;

  function resize() {
    W = canvas.width  = canvas.offsetWidth;
    H = canvas.height = canvas.offsetHeight;
  }
  resize();
  window.addEventListener('resize', resize);

  // Open string — long vibrating curve spanning the hero
  function OpenString() { this.init(); }
  OpenString.prototype.init = function () {
    this.y0     = Math.random() * H;
    this.nModes = 2 + Math.floor(Math.random() * 4);
    this.amps   = [];
    this.kFreqs = [];
    this.sPhase = [];
    this.tFreq  = 0.008 + Math.random() * 0.018;
    this.tPhase = Math.random() * Math.PI * 2;
    var palette = Math.random();
    if (palette < 0.55)      { this.r = 200; this.g = 255; this.b = 0;   }  // acid
    else if (palette < 0.80) { this.r = 80;  this.g = 160; this.b = 255; }  // electric blue
    else                     { this.r = 180; this.g = 0;   this.b = 255; }  // purple (extra dims)
    this.alpha  = 0.12 + Math.random() * 0.16;
    for (var m = 0; m < this.nModes; m++) {
      this.amps.push((22 + Math.random() * 38) / (m + 1));
      this.kFreqs.push((m + 1) * Math.PI / W * (0.6 + Math.random() * 0.8));
      this.sPhase.push(Math.random() * Math.PI * 2);
    }
  };
  OpenString.prototype.draw = function (t) {
    ctx.beginPath();
    for (var x = 0; x <= W; x += 3) {
      var y = this.y0;
      for (var m = 0; m < this.nModes; m++) {
        y += this.amps[m] * Math.sin(this.kFreqs[m] * x + this.sPhase[m] + t * this.tFreq * (m + 1) + this.tPhase);
      }
      x === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
    }
    var pulse = 0.6 + 0.4 * Math.sin(t * this.tFreq * 2.2 + this.tPhase);
    ctx.strokeStyle = 'rgba(' + this.r + ',' + this.g + ',' + this.b + ',' + (this.alpha * pulse).toFixed(3) + ')';
    ctx.lineWidth = 0.65;
    ctx.stroke();
  };

  // Closed string — oscillating loop
  function ClosedString() { this.init(); }
  ClosedString.prototype.init = function () {
    this.cx     = 0.08 * W + Math.random() * 0.84 * W;
    this.cy     = 0.06 * H + Math.random() * 0.88 * H;
    this.rx     = 35 + Math.random() * 70;
    this.ry     = 25 + Math.random() * 55;
    this.nModes = 2 + Math.floor(Math.random() * 3);
    this.amps   = [];
    this.tFreqs = [];
    this.phases = [];
    this.spin   = (Math.random() < 0.5 ? 1 : -1) * (0.003 + Math.random() * 0.008);
    this.tPhase = Math.random() * Math.PI * 2;
    var palette = Math.random();
    if (palette < 0.6)  { this.r = 200; this.g = 255; this.b = 0;   }
    else                { this.r = 80;  this.g = 160; this.b = 255; }
    this.alpha  = 0.1 + Math.random() * 0.13;
    for (var m = 0; m < this.nModes; m++) {
      this.amps.push((8 + Math.random() * 18) / (m + 1));
      this.tFreqs.push(0.006 + Math.random() * 0.012);
      this.phases.push(Math.random() * Math.PI * 2);
    }
  };
  ClosedString.prototype.draw = function (t) {
    ctx.beginPath();
    var steps = 90;
    for (var i = 0; i <= steps; i++) {
      var angle = (i / steps) * Math.PI * 2;
      var dr = 0;
      for (var m = 0; m < this.nModes; m++) {
        dr += this.amps[m] * Math.sin((m + 2) * angle + t * this.tFreqs[m] + this.phases[m]);
      }
      var x = this.cx + (this.rx + dr) * Math.cos(angle + t * this.spin);
      var y = this.cy + (this.ry + dr * 0.6) * Math.sin(angle + t * this.spin);
      i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
    }
    ctx.closePath();
    var pulse = 0.5 + 0.5 * Math.sin(t * 0.012 + this.tPhase);
    ctx.strokeStyle = 'rgba(' + this.r + ',' + this.g + ',' + this.b + ',' + (this.alpha * pulse).toFixed(3) + ')';
    ctx.lineWidth = 0.55;
    ctx.stroke();
  };

  var openStrings   = Array.from({ length: 14 }, function () { return new OpenString(); });
  var closedStrings = Array.from({ length: 6  }, function () { return new ClosedString(); });

  var t = 0;

  function draw() {
    ctx.clearRect(0, 0, W, H);
    t++;

    // Brane glow — subtle dimensional membrane around badge area
    var bg = ctx.createRadialGradient(W * 0.72, H * 0.46, 0, W * 0.72, H * 0.46, W * 0.28);
    bg.addColorStop(0,   'rgba(90,0,200,0.055)');
    bg.addColorStop(0.5, 'rgba(0,80,255,0.02)');
    bg.addColorStop(1,   'rgba(0,0,0,0)');
    ctx.fillStyle = bg;
    ctx.fillRect(0, 0, W, H);

    // Secondary brane on left
    var bg2 = ctx.createRadialGradient(W * 0.18, H * 0.5, 0, W * 0.18, H * 0.5, W * 0.22);
    bg2.addColorStop(0,   'rgba(200,255,0,0.025)');
    bg2.addColorStop(1,   'rgba(0,0,0,0)');
    ctx.fillStyle = bg2;
    ctx.fillRect(0, 0, W, H);

    // Open strings
    openStrings.forEach(function (s) { s.draw(t); });

    // Closed strings
    closedStrings.forEach(function (s) { s.draw(t); });
  }

  (function loop() { draw(); requestAnimationFrame(loop); })();
})();
