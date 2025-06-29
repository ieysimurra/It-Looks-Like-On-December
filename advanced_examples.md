# Advanced Examples and Extensions

**English** | [Português](#português)

---

## English

### 🚀 Code Extensions

#### 1. Custom Shape: Hexagon with Additive Synthesis

```javascript
class HexagonShape {
  constructor(x, y, size, hue) {
    this.position = createVector(x, y);
    this.size = size;
    this.r = size / 2;
    this.velocity = createVector(random(-5/this.size, 5/this.size), random(-5/this.size, 5/this.size));
    this.hue = hue;
    this.angle = 0;
    this.type = 'hexagon';
    this.harmonics = []; // For additive synthesis
  }
  
  show() {
    colorMode(HSB, 360, 100, 100);
    fill(this.hue, 100, 100);
    push();
    translate(this.position.x, this.position.y);
    rotate(this.angle);
    this.drawHexagon(0, 0, this.size/2);
    pop();
    colorMode(RGB, 255);
  }
  
  drawHexagon(x, y, radius) {
    beginShape();
    for (let i = 0; i < 6; i++) {
      let angle = TWO_PI / 6 * i;
      let vx = x + cos(angle) * radius;
      let vy = y + sin(angle) * radius;
      vertex(vx, vy);
    }
    endShape(CLOSE);
  }
  
  checkRectCollisions() {
    for (let rect of rectangles) {
      if (this.position.x + this.size/2 > rect.x && 
          this.position.x - this.size/2 < rect.x + rect.w &&
          this.position.y + this.size/2 > rect.y && 
          this.position.y - this.size/2 < rect.y + rect.h) {
        
        // Create additive synthesis with multiple harmonics
        let baseFreq = map(rect.x, 0, width, 60, 600);
        this.playAdditiveSound(baseFreq, rect);
        this.changeDirection();
      }
    }
  }
  
  playAdditiveSound(baseFreq, rect) {
    if (!audioInitialized) return;
    
    // Create multiple oscillators for rich harmonic content
    for (let i = 1; i <= 5; i++) {
      let harmonic = new Tone.Oscillator(baseFreq * i, "sine");
      let gain = new Tone.Gain(1 / (i * 2)); // Decreasing amplitude
      
      harmonic.connect(gain);
      gain.connect(reverb);
      
      harmonic.start();
      harmonic.stop(`+${0.5 + i * 0.1}`); // Staggered release
    }
  }
  
  // Implement other required methods...
  intersects(other) {
    let d = dist(this.position.x, this.position.y, other.position.x, other.position.y);
    return (d < this.size/2 + (other.r || other.size/2));
  }
  
  changeDirection() { this.velocity.mult(-1); }
  edges() { /* boundary checking */ }
  update() { 
    this.position.add(this.velocity); 
    this.angle += 0.02;
    this.checkRectCollisions(); 
  }
}
```

#### 2. MIDI Integration Extension

```javascript
// Add MIDI support for external control
class MIDIController {
  constructor() {
    this.midiAccess = null;
    this.inputs = [];
    this.outputs = [];
    this.initialize();
  }
  
  async initialize() {
    try {
      this.midiAccess = await navigator.requestMIDIAccess();
      this.setupInputs();
      this.setupOutputs();
    } catch (error) {
      console.log('MIDI not supported:', error);
    }
  }
  
  setupInputs() {
    for (let input of this.midiAccess.inputs.values()) {
      this.inputs.push(input);
      input.onmidimessage = this.handleMIDIMessage.bind(this);
    }
  }
  
  setupOutputs() {
    for (let output of this.midiAccess.outputs.values()) {
      this.outputs.push(output);
    }
  }
  
  handleMIDIMessage(message) {
    const [command, note, velocity] = message.data;
    
    switch (command) {
      case 144: // Note on
        this.triggerShapeFromMIDI(note, velocity);
        break;
      case 176: // Control change
        this.handleControlChange(note, velocity);
        break;
    }
  }
  
  triggerShapeFromMIDI(note, velocity) {
    // Map MIDI note to shape position and type
    let x = map(note, 21, 108, 50, width - 50);
    let y = map(velocity, 0, 127, height - 50, 50);
    let size = map(velocity, 0, 127, 10, 30);
    let hue = map(note % 12, 0, 11, 0, 360);
    
    // Cycle through shape types based on note
    let shapeTypes = ['ball', 'rect', 'triangle', 'star'];
    let shapeType = shapeTypes[Math.floor(note / 12) % shapeTypes.length];
    
    selectShape(shapeType);
    addShapeAt(x, y);
  }
  
  handleControlChange(controller, value) {
    switch (controller) {
      case 1: // Modulation wheel - shape size
        ballSizeSlider.value(map(value, 0, 127, 5, 25));
        break;
      case 7: // Volume - shape hue
        colorHueSlider.value(map(value, 0, 127, 0, 360));
        break;
      case 64: // Sustain pedal - clear shapes
        if (value > 63) resetSketch();
        break;
    }
  }
  
  sendMIDIOut(note, velocity, channel = 0) {
    if (this.outputs.length > 0) {
      const noteOnMessage = [144 + channel, note, velocity];
      this.outputs[0].send(noteOnMessage);
    }
  }
}

// Initialize MIDI controller
let midiController;

function setup() {
  // ... existing setup code ...
  midiController = new MIDIController();
}
```

#### 3. Advanced Audio Analysis

```javascript
class AudioAnalyzer {
  constructor() {
    this.fftSize = 512;
    this.analyser = new Tone.Analyser('fft', this.fftSize);
    this.waveformAnalyser = new Tone.Analyser('waveform', 512);
    
    // Connect to audio output
    if (synth) {
      synth.connect(this.analyser);
      synth.connect(this.waveformAnalyser);
    }
  }
  
  getFrequencyData() {
    return this.analyser.getValue();
  }
  
  getWaveformData() {
    return this.waveformAnalyser.getValue();
  }
  
  drawSpectrum(x, y, w, h) {
    let spectrum = this.getFrequencyData();
    
    stroke(255);
    strokeWeight(1);
    
    for (let i = 0; i < spectrum.length; i++) {
      let magnitude = spectrum[i];
      let barHeight = map(magnitude, -100, 0, 0, h);
      let barX = map(i, 0, spectrum.length, x, x + w);
      
      line(barX, y + h, barX, y + h - barHeight);
    }
  }
  
  drawWaveform(x, y, w, h) {
    let waveform = this.getWaveformData();
    
    stroke(255, 100, 100);
    strokeWeight(2);
    noFill();
    
    beginShape();
    for (let i = 0; i < waveform.length; i++) {
      let sample = waveform[i];
      let waveX = map(i, 0, waveform.length, x, x + w);
      let waveY = map(sample, -1, 1, y + h, y);
      vertex(waveX, waveY);
    }
    endShape();
  }
  
  getPeakFrequency() {
    let spectrum = this.getFrequencyData();
    let maxIndex = 0;
    let maxValue = -Infinity;
    
    for (let i = 0; i < spectrum.length; i++) {
      if (spectrum[i] > maxValue) {
        maxValue = spectrum[i];
        maxIndex = i;
      }
    }
    
    // Convert bin to frequency
    return (maxIndex * Tone.context.sampleRate) / (this.fftSize * 2);
  }
}

// Usage in draw() function
let audioAnalyzer;

function setup() {
  // ... existing setup code ...
  audioAnalyzer = new AudioAnalyzer();
}

function draw() {
  // ... existing draw code ...
  
  // Draw audio analysis visualizations
  if (audioAnalyzer) {
    audioAnalyzer.drawSpectrum(10, 10, 200, 100);
    audioAnalyzer.drawWaveform(220, 10, 200, 100);
    
    // Display peak frequency
    let peakFreq = audioAnalyzer.getPeakFrequency();
    fill(255);
    text(`Peak: ${peakFreq.toFixed(1)} Hz`, 10, 130);
  }
}
```

#### 4. Networked Collaboration Feature

```javascript
class NetworkManager {
  constructor() {
    this.socket = null;
    this.roomId = null;
    this.collaborators = new Map();
    this.initialize();
  }
  
  initialize() {
    // Using Socket.IO for real-time communication
    this.socket = io('wss://your-server.com');
    
    this.socket.on('connect', () => {
      console.log('Connected to collaboration server');
    });
    
    this.socket.on('user-joined', (userData) => {
      this.addCollaborator(userData);
    });
    
    this.socket.on('shape-added', (shapeData) => {
      this.receiveRemoteShape(shapeData);
    });
    
    this.socket.on('shape-removed', (shapeId) => {
      this.removeRemoteShape(shapeId);
    });
  }
  
  joinRoom(roomId) {
    this.roomId = roomId;
    this.socket.emit('join-room', { 
      roomId: roomId,
      userId: this.generateUserId()
    });
  }
  
  broadcastShapeAdd(shape) {
    if (this.socket && this.roomId) {
      this.socket.emit('add-shape', {
        roomId: this.roomId,
        shape: this.serializeShape(shape),
        userId: this.userId
      });
    }
  }
  
  serializeShape(shape) {
    return {
      id: shape.id || Date.now() + Math.random(),
      type: shape.type,
      x: shape.position.x,
      y: shape.position.y,
      size: shape.size,
      hue: shape.hue,
      velocity: {
        x: shape.velocity.x,
        y: shape.velocity.y
      }
    };
  }
  
  receiveRemoteShape(shapeData) {
    // Create shape from remote data
    let remoteShape;
    
    switch (shapeData.type) {
      case 'ball':
        remoteShape = new Ball(shapeData.x, shapeData.y, shapeData.size/2, shapeData.hue);
        break;
      case 'rect':
        remoteShape = new RectShape(shapeData.x, shapeData.y, shapeData.size, shapeData.hue);
        break;
      // ... other shape types
    }
    
    if (remoteShape) {
      remoteShape.id = shapeData.id;
      remoteShape.isRemote = true;
      remoteShape.velocity = createVector(shapeData.velocity.x, shapeData.velocity.y);
      shapes.push(remoteShape);
    }
  }
  
  addCollaborator(userData) {
    this.collaborators.set(userData.userId, {
      id: userData.userId,
      cursor: { x: 0, y: 0 },
      color: userData.color || color(random(360), 80, 80)
    });
  }
  
  generateUserId() {
    return 'user_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
  }
}

// Integration with existing code
let networkManager;

function setup() {
  // ... existing setup code ...
  networkManager = new NetworkManager();
  
  // Add room joining UI
  let roomInput = createInput('');
  roomInput.position(windowWidth * 0.7, windowHeight - 50);
  roomInput.attribute('placeholder', 'Room ID');
  
  let joinButton = createButton('Join Room');
  joinButton.position(windowWidth * 0.82, windowHeight - 50);
  joinButton.mousePressed(() => {
    let roomId = roomInput.value();
    if (roomId) {
      networkManager.joinRoom(roomId);
    }
  });
}

// Override addShapeAt to broadcast to network
function addShapeAt(x, y) {
  // ... existing shape creation code ...
  
  // Broadcast to collaborators
  if (networkManager && newShape) {
    networkManager.broadcastShapeAdd(newShape);
  }
}
```

### 🎨 Visual Enhancements

#### 1. Particle System for Audio Visualization

```javascript
class AudioParticle {
  constructor(x, y, freq, amp) {
    this.position = createVector(x, y);
    this.velocity = createVector(random(-2, 2), random(-2, 2));
    this.life = 255;
    this.maxLife = 255;
    this.size = map(amp, 0, 1, 2, 10);
    this.hue = map(freq, 60, 3600, 0, 360);
  }
  
  update() {
    this.position.add(this.velocity);
    this.life -= 3;
    this.velocity.mult(0.98);
  }
  
  show() {
    colorMode(HSB, 360, 100, 100);
    let alpha = map(this.life, 0, this.maxLife, 0, 100);
    fill(this.hue, 80, 100, alpha);
    noStroke();
    ellipse(this.position.x, this.position.y, this.size);
    colorMode(RGB, 255);
  }
  
  isDead() {
    return this.life <= 0;
  }
}

class ParticleSystem {
  constructor() {
    this.particles = [];
  }
  
  addParticle(x, y, freq, amp) {
    this.particles.push(new AudioParticle(x, y, freq, amp));
  }
  
  update() {
    for (let i = this.particles.length - 1; i >= 0; i--) {
      this.particles[i].update();
      if (this.particles[i].isDead()) {
        this.particles.splice(i, 1);
      }
    }
  }
  
  show() {
    for (let particle of this.particles) {
      particle.show();
    }
  }
}

// Usage in collision detection
let particleSystem;

function setup() {
  // ... existing setup code ...
  particleSystem = new ParticleSystem();
}

function draw() {
  // ... existing draw code ...
  particleSystem.update();
  particleSystem.show();
}

// Modify playSound function to add particles
function triggerSound(freq, amp, grayValue, hueValue, rectSize, shapePosition, rect, shapeType) {
  // ... existing audio code ...
  
  // Add visual particles
  if (particleSystem) {
    for (let i = 0; i < 5; i++) {
      particleSystem.addParticle(
        shapePosition.x + random(-10, 10),
        shapePosition.y + random(-10, 10),
        freq,
        amp
      );
    }
  }
}
```

---

## Português

### 🚀 Extensões de Código

#### 1. Forma Personalizada: Hexágono com Síntese Aditiva

```javascript
class HexagonShape {
  constructor(x, y, size, hue) {
    this.position = createVector(x, y);
    this.size = size;
    this.r = size / 2;
    this.velocity = createVector(random(-5/this.size, 5/this.size), random(-5/this.size, 5/this.size));
    this.hue = hue;
    this.angle = 0;
    this.type = 'hexagon';
    this.harmonics = []; // Para síntese aditiva
  }
  
  show() {
    colorMode(HSB, 360, 100, 100);
    fill(this.hue, 100, 100);
    push();
    translate(this.position.x, this.position.y);
    rotate(this.angle);
    this.drawHexagon(0, 0, this.size/2);
    pop();
    colorMode(RGB, 255);
  }
  
  drawHexagon(x, y, radius) {
    beginShape();
    for (let i = 0; i < 6; i++) {
      let angle = TWO_PI / 6 * i;
      let vx = x + cos(angle) * radius;
      let vy = y + sin(angle) * radius;
      vertex(vx, vy);
    }
    endShape(CLOSE);
  }
  
  checkRectCollisions() {
    for (let rect of rectangles) {
      if (this.position.x + this.size/2 > rect.x && 
          this.position.x - this.size/2 < rect.x + rect.w &&
          this.position.y + this.size/2 > rect.y && 
          this.position.y - this.size/2 < rect.y + rect.h) {
        
        // Criar síntese aditiva com múltiplos harmônicos
        let baseFreq = map(rect.x, 0, width, 60, 600);
        this.playAdditiveSound(baseFreq, rect);
        this.changeDirection();
      }
    }
  }
  
  playAdditiveSound(baseFreq, rect) {
    if (!audioInitialized) return;
    
    // Criar múltiplos osciladores para conteúdo harmônico rico
    for (let i = 1; i <= 5; i++) {
      let harmonic = new Tone.Oscillator(baseFreq * i, "sine");
      let gain = new Tone.Gain(1 / (i * 2)); // Amplitude decrescente
      
      harmonic.connect(gain);
      gain.connect(reverb);
      
      harmonic.start();
      harmonic.stop(`+${0.5 + i * 0.1}`); // Release escalonado
    }
  }
  
  // Implementar outros métodos necessários...
  intersects(other) {
    let d = dist(this.position.x, this.position.y, other.position.x, other.position.y);
    return (d < this.size/2 + (other.r || other.size/2));
  }
  
  changeDirection() { this.velocity.mult(-1); }
  edges() { /* verificação de limites */ }
  update() { 
    this.position.add(this.velocity); 
    this.angle += 0.02;
    this.checkRectCollisions(); 
  }
}
```

### 🎨 Melhorias Visuais

#### 1. Sistema de Partículas para Visualização de Áudio

```javascript
class AudioParticle {
  constructor(x, y, freq, amp) {
    this.position = createVector(x, y);
    this.velocity = createVector(random(-2, 2), random(-2, 2));
    this.life = 255;
    this.maxLife = 255;
    this.size = map(amp, 0, 1, 2, 10);
    this.hue = map(freq, 60, 3600, 0, 360);
  }
  
  update() {
    this.position.add(this.velocity);
    this.life -= 3;
    this.velocity.mult(0.98);
  }
  
  show() {
    colorMode(HSB, 360, 100, 100);
    let alpha = map(this.life, 0, this.maxLife, 0, 100);
    fill(this.hue, 80, 100, alpha);
    noStroke();
    ellipse(this.position.x, this.position.y, this.size);
    colorMode(RGB, 255);
  }
  
  isDead() {
    return this.life <= 0;
  }
}

class ParticleSystem {
  constructor() {
    this.particles = [];
  }
  
  addParticle(x, y, freq, amp) {
    this.particles.push(new AudioParticle(x, y, freq, amp));
  }
  
  update() {
    for (let i = this.particles.length - 1; i >= 0; i--) {
      this.particles[i].update();
      if (this.particles[i].isDead()) {
        this.particles.splice(i, 1);
      }
    }
  }
  
  show() {
    for (let particle of this.particles) {
      particle.show();
    }
  }
}

// Uso na detecção de colisão
let particleSystem;

function setup() {
  // ... código de setup existente ...
  particleSystem = new ParticleSystem();
}

function draw() {
  // ... código de draw existente ...
  particleSystem.update();
  particleSystem.show();
}

// Modificar função playSound para adicionar partículas
function triggerSound(freq, amp, grayValue, hueValue, rectSize, shapePosition, rect, shapeType) {
  // ... código de áudio existente ...
  
  // Adicionar partículas visuais
  if (particleSystem) {
    for (let i = 0; i < 5; i++) {
      particleSystem.addParticle(
        shapePosition.x + random(-10, 10),
        shapePosition.y + random(-10, 10),
        freq,
        amp
      );
    }
  }
}
```

### 📊 Performance Monitoring

```javascript
class PerformanceMonitor {
  constructor() {
    this.frameRate = 0;
    this.memoryUsage = 0;
    this.shapeCount = 0;
    this.audioLatency = 0;
    this.updateInterval = 60; // Frames
    this.frameCounter = 0;
  }
  
  update() {
    this.frameCounter++;
    
    if (this.frameCounter >= this.updateInterval) {
      this.frameRate = frameRate();
      this.shapeCount = shapes.length;
      
      // Memory usage (if available)
      if (performance.memory) {
        this.memoryUsage = performance.memory.usedJSHeapSize / 1048576; // MB
      }
      
      this.frameCounter = 0;
    }
  }
  
  show(x, y) {
    fill(255, 200);
    rect(x, y, 200, 100);
    
    fill(0);
    textSize(12);
    text(`FPS: ${this.frameRate.toFixed(1)}`, x + 5, y + 15);
    text(`Shapes: ${this.shapeCount}`, x + 5, y + 30);
    text(`Memory: ${this.memoryUsage.toFixed(1)} MB`, x + 5, y + 45);
    text(`Audio Context: ${Tone.context.state}`, x + 5, y + 60);
  }
  
  exportData() {
    return {
      timestamp: new Date().toISOString(),
      frameRate: this.frameRate,
      shapeCount: this.shapeCount,
      memoryUsage: this.memoryUsage,
      audioContext: Tone.context.state
    };
  }
}

// Uso no projeto
let performanceMonitor;

function setup() {
  // ... código existente ...
  performanceMonitor = new PerformanceMonitor();
}

function draw() {
  // ... código existente ...
  performanceMonitor.update();
  performanceMonitor.show(width - 210, 10);
}
```

Estes exemplos mostram como estender o projeto base com funcionalidades avançadas, mantendo a compatibilidade com o código existente e fornecendo novas possibilidades criativas e técnicas.