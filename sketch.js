let currentLanguage = 'en'; // Default language

let shapes = []; // This will store balls, rectangles, and triangles
let ballSizeSlider;
let colorHueSlider;
let symbolBuffer;
let rectangles = []; // Store the rectangles in the background
let button;
let shapeType = 'ball'; // Default shape is ball
let shapeToggleBall;
let shapeToggleRect;
let shapeToggleTriangle;
let shapeToggleStar;

let synth;
let panner;
let reverb;
let audioInitialized = false;
let audioActivateButton;

let mediaRecorder;
let chunks = [];
let recordingButton, stopRecordingButton;

let canvas;
let isRecording = false; // Global variable to track the recording state

let isAudioRecording = false; // Variable to track the audio recording state
let audioRecordingButton;
let audioChunks = []; // Array to store audio data chunks
let audioRecorder;

let interactionLog = []; // Log to store all user interactions

// UI Labels
let ballSizeLabel, ballHueLabel;
let resetButton, updateButton;

function setup() {
  let isDarkMode = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  let textColor = isDarkMode ? '#CCCCCC' : '#CCCCCC';

  // Create canvas only once
  canvas = createCanvas(windowWidth, windowHeight - 100);
  
  // Create UI elements
  createUIElements(textColor);
  
  // Create symbol buffer
  symbolBuffer = createGraphics(windowWidth, windowHeight - 100);
  symbolBuffer.background(220);
  drawSymbols(symbolBuffer);

  // Initialize audio
  initializeAudio();

  updateToggleButtons();
}

function initializeAudio() {
  if (typeof Tone !== 'undefined') {
    try {
      // Ensure context is resumed
      if (Tone.context.state === 'suspended') {
        Tone.start().then(() => {
          setupAudioComponents();
        }).catch(e => {
          console.log('Audio initialization failed:', e);
          audioInitialized = false;
        });
      } else {
        setupAudioComponents();
      }
    } catch (e) {
      console.log('Tone.js initialization error:', e);
      audioInitialized = false;
    }
  } else {
    console.log('Tone.js not loaded');
    audioInitialized = false;
  }
}

function setupAudioComponents() {
  try {
    // Dispose existing components if they exist
    if (synth) synth.dispose();
    if (panner) panner.dispose();
    if (reverb) reverb.dispose();

    // Create new audio components
    synth = new Tone.FMSynth().toDestination();
    panner = new Tone.Panner().toDestination();
    reverb = new Tone.Reverb(1.5).toDestination();
    
    // Connect audio chain
    synth.connect(reverb);
    reverb.connect(panner);
    
    audioInitialized = true;
    console.log('Audio components initialized successfully');
    
    // Hide audio activate button if it exists
    if (audioActivateButton) {
      audioActivateButton.hide();
    }
  } catch (e) {
    console.log('Audio component setup failed:', e);
    audioInitialized = false;
  }
}

function activateAudio() {
  if (typeof Tone !== 'undefined') {
    Tone.start().then(() => {
      setupAudioComponents();
    }).catch(e => {
      console.log('Manual audio activation failed:', e);
    });
  }
}

function createUIElements(textColor) {
  // Size slider
  ballSizeSlider = createSlider(5, 25, 25);
  ballSizeSlider.position(windowWidth * 0.01, windowHeight - 80);
  ballSizeSlider.input(logSliderChange);
  
  ballSizeLabel = createP('Shape Size');
  ballSizeLabel.style('color', textColor);
  ballSizeLabel.style('font-size', '13px');
  ballSizeLabel.position(windowWidth * 0.01, windowHeight - 103);

  // Color slider
  colorHueSlider = createSlider(0, 360, 180);
  colorHueSlider.position(windowWidth * 0.01, windowHeight - 50);
  colorHueSlider.input(logSliderChange);
  
  ballHueLabel = createP('Shape Hue');
  ballHueLabel.style('color', textColor);
  ballHueLabel.style('font-size', '13px');
  ballHueLabel.position(windowWidth * 0.01, windowHeight - 73);

  // Action buttons
  button = createButton('Random Shape');
  button.position(windowWidth * 0.2, windowHeight - 80);
  button.mousePressed(addShape);

  resetButton = createButton('Reset');
  resetButton.position(windowWidth * 0.2, windowHeight - 50);
  resetButton.mousePressed(resetSketch);

  updateButton = createButton('Update Sketch');
  updateButton.position(windowWidth * 0.27, windowHeight - 50);
  updateButton.mousePressed(updateSketch);

  // Shape toggle buttons
  shapeToggleBall = createButton('Ball');
  shapeToggleBall.position(windowWidth * 0.35, windowHeight - 80);
  shapeToggleBall.mousePressed(() => {
    selectShape('ball');
    logShapeSelection('ball');
  });

  shapeToggleRect = createButton('Rectangle');
  shapeToggleRect.position(windowWidth * 0.4, windowHeight - 80);
  shapeToggleRect.mousePressed(() => {
    selectShape('rect');
    logShapeSelection('rect');
  });

  shapeToggleTriangle = createButton('Triangle');
  shapeToggleTriangle.position(windowWidth * 0.503, windowHeight - 80);
  shapeToggleTriangle.mousePressed(() => {
    selectShape('triangle');
    logShapeSelection('triangle');
  });

  shapeToggleStar = createButton('Star');
  shapeToggleStar.position(windowWidth * 0.59, windowHeight - 80);
  shapeToggleStar.mousePressed(() => {
    selectShape('star');
    logShapeSelection('star');
  });

  // Audio activate button (initially hidden)
  audioActivateButton = createButton('🔊 Activate Audio');
  audioActivateButton.position(windowWidth * 0.67, windowHeight - 80);
  audioActivateButton.mousePressed(activateAudio);
  audioActivateButton.style('background-color', '#FFD700');
  audioActivateButton.hide(); // Start hidden

  // Instruction button
  let instructionButton = createButton('Instructions');
  instructionButton.position(windowWidth * 0.883, windowHeight - 80);
  instructionButton.mousePressed(() => openInstructionPopup(instructionButton));

  // Recording buttons
  recordingButton = createButton('Start Video Record');
  recordingButton.position(windowWidth * 0.65, windowHeight - 50);
  recordingButton.mousePressed(toggleRecording);

  audioRecordingButton = createButton('Start Audio Record');
  audioRecordingButton.position(windowWidth * 0.825, windowHeight - 50);
  audioRecordingButton.mousePressed(toggleAudioRecording);
}

function repositionUIElements() {
  // Reposition all UI elements based on new window size
  ballSizeSlider.position(windowWidth * 0.01, windowHeight - 80);
  ballSizeLabel.position(windowWidth * 0.01, windowHeight - 103);
  
  colorHueSlider.position(windowWidth * 0.01, windowHeight - 50);
  ballHueLabel.position(windowWidth * 0.01, windowHeight - 73);
  
  button.position(windowWidth * 0.2, windowHeight - 80);
  resetButton.position(windowWidth * 0.2, windowHeight - 50);
  updateButton.position(windowWidth * 0.27, windowHeight - 50);
  
  shapeToggleBall.position(windowWidth * 0.35, windowHeight - 80);
  shapeToggleRect.position(windowWidth * 0.4, windowHeight - 80);
  shapeToggleTriangle.position(windowWidth * 0.503, windowHeight - 80);
  shapeToggleStar.position(windowWidth * 0.59, windowHeight - 80);
  
  audioActivateButton.position(windowWidth * 0.67, windowHeight - 80);
  
  recordingButton.position(windowWidth * 0.65, windowHeight - 50);
  audioRecordingButton.position(windowWidth * 0.825, windowHeight - 50);
}

function openInstructionPopup(instructionButton) {
  if (currentLanguage === 'en') {
    window.open('instructions_en.html', 'Instructions', 'width=600,height=400');
    currentLanguage = 'pt';
    instructionButton.html('Instruções');
  } else if (currentLanguage === 'pt') {
    window.open('instructions_pt.html', 'Instructions', 'width=600,height=400');
    currentLanguage = 'en';
    instructionButton.html('Instructions');
  }
}

function toggleRecording() {
  if (isRecording) {
    stopRecording();
    recordingButton.html('Start Video Record');
    recordingButton.style('background-color', '');
  } else {
    startRecording();
    recordingButton.html('Stop Video Record');
    recordingButton.style('background-color', '#FF5733');
  }
  isRecording = !isRecording;
}

function startRecording() {
  if (typeof Tone === 'undefined') {
    console.log('Tone.js not available for audio recording');
    return;
  }
  
  // Ensure audio is initialized before recording
  if (!audioInitialized) {
    initializeAudio();
  }
  
  Tone.start().then(() => {
    let canvasStream = canvas.canvas.captureStream(30);
    let audioDest = Tone.context.createMediaStreamDestination();
    
    // Connect all audio to destination
    if (synth) synth.connect(audioDest);
    if (reverb) reverb.connect(audioDest);
    if (panner) panner.connect(audioDest);
    
    let audioStream = audioDest.stream;
    let combinedStream = new MediaStream([...canvasStream.getTracks(), ...audioStream.getTracks()]);

    mediaRecorder = new MediaRecorder(combinedStream, {
      mimeType: 'video/webm;codecs=vp8,opus',
      videoBitsPerSecond: 3000000,
    });

    mediaRecorder.ondataavailable = (event) => {
      chunks.push(event.data);
    };

    mediaRecorder.onstop = (event) => {
      const blob = new Blob(chunks, { type: "video/webm" });
      chunks = [];
      let anchor = document.createElement('a');
      anchor.href = window.URL.createObjectURL(blob);
      anchor.download = 'recording.webm';
      anchor.click();
    };

    mediaRecorder.start();
    logAction('Video recording started');
  }).catch(e => {
    console.log('Recording failed:', e);
  });
}

function stopRecording() {
  if (mediaRecorder) {
    mediaRecorder.stop();
  }
  logAction('Video recording stopped');
  saveLogData();
}

function toggleAudioRecording() {
  if (isAudioRecording) {
    stopAudioRecording();
    audioRecordingButton.html('Start Audio Record');
  } else {
    startAudioRecording();
    audioRecordingButton.html('Stop Audio Record');
  }
  isAudioRecording = !isAudioRecording;
}

function startAudioRecording() {
  if (typeof Tone === 'undefined') {
    console.log('Tone.js not available for audio recording');
    return;
  }
  
  // Ensure audio is initialized before recording
  if (!audioInitialized) {
    initializeAudio();
  }
  
  let dest = Tone.context.createMediaStreamDestination();
  
  // Connect all audio sources
  if (synth) synth.connect(dest);
  if (reverb) reverb.connect(dest);
  if (panner) panner.connect(dest);
  
  let audioStream = dest.stream;

  audioRecorder = new MediaRecorder(audioStream);

  audioRecorder.ondataavailable = (event) => {
    audioChunks.push(event.data);
  };

  audioRecorder.onstop = (event) => {
    const blob = new Blob(audioChunks, { type: "audio/webm" });
    audioChunks = [];
    let anchor = document.createElement('a');
    anchor.href = window.URL.createObjectURL(blob);
    anchor.download = 'audio_recording.webm';
    anchor.click();
  };

  audioRecorder.start();
  logAction('Audio recording started');
}

function stopAudioRecording() {
  if (audioRecorder) {
    audioRecorder.stop();
  }
  logAction('Audio recording stopped');
  saveLogData();
}

function saveLogData() {
  let csvContent = "data:text/csv;charset=utf-8,";
  csvContent += "timestamp,event,shapeType,shapeSize,shapeHue\n";

  interactionLog.forEach(entry => {
    csvContent += `${entry.timestamp},${entry.event},${entry.shapeType},${entry.shapeSize},${entry.shapeHue}\n`;
  });

  let encodedUri = encodeURI(csvContent);
  let link = document.createElement('a');
  link.setAttribute("href", encodedUri);
  link.setAttribute("download", "interaction_log.csv");
  link.click();
}

function logSliderChange() {
  let event = {
    timestamp: new Date().toISOString(),
    event: "Slider change",
    shapeType: shapeType,
    shapeSize: ballSizeSlider.value(),
    shapeHue: colorHueSlider.value()
  };
  interactionLog.push(event);
}

function logShapeSelection(selectedShape) {
  let event = {
    timestamp: new Date().toISOString(),
    event: `Shape selected: ${selectedShape}`,
    shapeType: selectedShape,
    shapeSize: ballSizeSlider.value(),
    shapeHue: colorHueSlider.value()
  };
  interactionLog.push(event);
}

function logAction(action) {
  let event = {
    timestamp: new Date().toISOString(),
    event: action,
    shapeType: shapeType,
    shapeSize: ballSizeSlider.value(),
    shapeHue: colorHueSlider.value()
  };
  interactionLog.push(event);
}

function windowResized() {
  // Resize canvas
  resizeCanvas(windowWidth, windowHeight - 100);
  
  // Recreate and resize symbol buffer
  symbolBuffer = createGraphics(windowWidth, windowHeight - 100);
  symbolBuffer.background(220);
  drawSymbols(symbolBuffer);
  
  // Reposition UI elements
  repositionUIElements();
  
  // Keep shapes within new bounds
  for (let shape of shapes) {
    shape.position.x = constrain(shape.position.x, shape.size/2, width - shape.size/2);
    shape.position.y = constrain(shape.position.y, shape.size/2, height - shape.size/2);
  }
  
  // Reinitialize audio after resize to ensure it works in fullscreen
  setTimeout(() => {
    checkAudioStatus();
  }, 100);
}

function checkAudioStatus() {
  if (typeof Tone !== 'undefined') {
    if (Tone.context.state === 'suspended' || !audioInitialized) {
      console.log('Audio context suspended or not initialized, attempting to restart...');
      audioActivateButton.show();
      audioInitialized = false;
    } else if (Tone.context.state === 'running' && audioInitialized) {
      audioActivateButton.hide();
    }
  }
}

function draw() {
  background(220);
  image(symbolBuffer, 0, 0);

  colorMode(HSB, 360, 100, 100);
  noStroke();
  
  // Check audio status periodically
  if (frameCount % 300 === 0) { // Check every 5 seconds
    checkAudioStatus();
  }
  
  // Update and display shapes with collision detection
  for (let i = 0; i < shapes.length; i++) {
    let shape = shapes[i];
    shape.update();
    shape.show();
    shape.edges();
    
    // Optimized collision detection - only check shapes after current one
    for (let j = i + 1; j < shapes.length; j++) {
      let other = shapes[j];
      if (shape.intersects(other)) {
        shape.changeDirection();
        other.changeDirection();
      }
    }
  }
  
  colorMode(RGB, 255);
}

function drawSymbols(pg) {
  let rectNumber;
  let choice = int(random(100));

  if (choice < 50) {
    rectNumber = 20;
  } else if (choice < 70) {
    rectNumber = 15;
  } else if (choice < 90) {
    rectNumber = 10;
  } else {
    rectNumber = 5;
  }

  rectangles = [];

  for (let i = 0; i < rectNumber; i++) {
    let grayValue = random(255);
    let x = random(pg.width);
    let y = random(pg.height);
    let w = random(20, 50);
    let h = random(20, 50);

    rectangles.push({ x, y, w, h, grayValue });
    pg.fill(grayValue);
    pg.rect(x, y, w, h);
  }
}

function isInsideRect(x, y, size) {
  for (let rect of rectangles) {
    if (x - size > rect.x && x + size < rect.x + rect.w && y - size > rect.y && y + size < rect.y + rect.h) {
      return true;
    }
  }
  return false;
}

function addShape() {
  // Randomize shape type
  let randomShapes = ['ball', 'rect', 'triangle', 'star'];
  let randomShapeType = randomShapes[int(random(randomShapes.length))];
  
  // Randomize size (within slider range: 5-25)
  let randomSize = random(5, 25);
  
  // Randomize hue (within slider range: 0-360)  
  let randomHue = random(0, 360);
  
  // Update sliders to reflect random values
  ballSizeSlider.value(randomSize);
  colorHueSlider.value(randomHue);
  
  // Update global shape type and button highlight
  selectShape(randomShapeType);
  
  let x, y;
  let validPosition = false;
  let attempts = 0;
  const maxAttempts = 100; // Prevent infinite loop

  while (!validPosition && attempts < maxAttempts) {
    x = random(randomSize, width - randomSize);
    y = random(randomSize, height - randomSize);
    validPosition = !isInsideRect(x, y, randomSize / 2);
    attempts++;
  }

  // If no valid position found, use random position anyway
  if (!validPosition) {
    x = random(randomSize, width - randomSize);
    y = random(randomSize, height - randomSize);
  }

  if (randomShapeType === 'ball') {
    shapes.push(new Ball(x, y, randomSize / 2, randomHue));
  } else if (randomShapeType === 'rect') {
    shapes.push(new RectShape(x, y, randomSize, randomHue));
  } else if (randomShapeType === 'triangle') {
    shapes.push(new TriangleShape(x, y, randomSize, randomHue));
  } else if (randomShapeType === 'star') {
    shapes.push(new StarShape(x, y, randomSize, randomHue));
  }
  
  logAction(`Random shape added: ${randomShapeType}, size: ${randomSize.toFixed(1)}, hue: ${randomHue.toFixed(1)}`);
}

function updateSketch() {
  shapes = [];
  symbolBuffer.background(220);
  drawSymbols(symbolBuffer);
  logAction('Sketch updated');
}

function resetSketch() {
  shapes = [];
  logAction('Sketch reset');
}

function mousePressed() {
  // Ensure audio is activated on first user interaction
  if (!audioInitialized && typeof Tone !== 'undefined') {
    activateAudio();
  }
  
  if (mouseY < height && mouseX >= 0 && mouseX <= width) {
    let shapeRemoved = false;
    for (let i = shapes.length - 1; i >= 0; i--) {
      let shape = shapes[i];
      let distance = dist(mouseX, mouseY, shape.position.x, shape.position.y);
      if (distance < shape.size / 2) {
        shapes.splice(i, 1);
        shapeRemoved = true;
        logAction(`Shape removed at (${mouseX}, ${mouseY})`);
        break;
      }
    }
    if (!shapeRemoved) {
      addShapeAt(mouseX, mouseY);
    }
    logAction(`Mouse pressed at (${mouseX}, ${mouseY})`);
  }
}

function addShapeAt(x, y) {
  let size = ballSizeSlider.value();
  if (!isInsideRect(x, y, size / 2)) {
    if (shapeType === 'ball') {
      shapes.push(new Ball(x, y, size / 2, colorHueSlider.value()));
    } else if (shapeType === 'rect') {
      shapes.push(new RectShape(x, y, size, colorHueSlider.value()));
    } else if (shapeType === 'triangle') {
      shapes.push(new TriangleShape(x, y, size, colorHueSlider.value()));
    } else if (shapeType === 'star') {
      shapes.push(new StarShape(x, y, size, colorHueSlider.value()));
    }
    logAction(`Shape added by click: ${shapeType} at (${x}, ${y})`);
  }
}

function selectShape(shape) {
  shapeType = shape;
  updateToggleButtons();
  updateWaveform();
}

function updateToggleButtons() {
  // Reset all buttons first
  shapeToggleBall.style('background-color', '');
  shapeToggleRect.style('background-color', '');
  shapeToggleTriangle.style('background-color', '');
  shapeToggleStar.style('background-color', '');
  
  // Highlight selected button
  if (shapeType === 'ball') {
    shapeToggleBall.style('background-color', '#00FF00');
  } else if (shapeType === 'rect') {
    shapeToggleRect.style('background-color', '#00FF00');
  } else if (shapeType === 'triangle') {
    shapeToggleTriangle.style('background-color', '#00FF00');
  } else if (shapeType === 'star') {
    shapeToggleStar.style('background-color', '#00FF00');
  }
}

function updateWaveform() {
  if (audioInitialized && synth) {
    try {
      if (shapeType === 'ball') {
        synth.oscillator.type = 'sine';
      } else if (shapeType === 'rect') {
        synth.oscillator.type = 'square';
      } else if (shapeType === 'triangle') {
        synth.oscillator.type = 'triangle';
      } else if (shapeType === 'star') {
        synth.oscillator.type = 'sawtooth';
      }
    } catch (e) {
      console.log('Waveform update failed:', e);
    }
  }
}

class Ball {
  constructor(x, y, r, hue) {
    this.position = createVector(x, y);
    this.r = r;
    this.size = r * 2;
    this.velocity = createVector(random(-10 / this.r, 10 / this.r), random(-10 / this.r, 10 / this.r));
    this.hue = hue;
    this.type = 'ball'; // Store the shape type
  }

  intersects(other) {
    let d = dist(this.position.x, this.position.y, other.position.x, other.position.y);
    return (d < this.r + (other.r || other.size/2));
  }

  changeDirection() {
    this.velocity.mult(-1);
  }

  edges() {
    if (this.position.x < this.r || this.position.x > width - this.r) {
      this.velocity.x *= -1;
      this.position.x = constrain(this.position.x, this.r, width - this.r);
    }
    if (this.position.y < this.r || this.position.y > height - this.r) {
      this.velocity.y *= -1;
      this.position.y = constrain(this.position.y, this.r, height - this.r);
    }
  }

  show() {
    colorMode(HSB, 360, 100, 100);
    fill(this.hue, 100, 100);
    ellipse(this.position.x, this.position.y, this.r * 2);
    colorMode(RGB, 255);
  }

  update() {
    this.position.add(this.velocity);
    this.checkRectCollisions();
  }

  checkRectCollisions() {
    for (let rect of rectangles) {
      if (this.position.x + this.r > rect.x && this.position.x - this.r < rect.x + rect.w &&
        this.position.y + this.r > rect.y && this.position.y - this.r < rect.y + rect.h) {
        let freq = map(rect.x, 0, width, 60, 3600);
        let amp = map(rect.y, 0, height, 1, 0.1);
        playSound(freq, amp, rect.grayValue, this.hue, { w: rect.w, h: rect.h }, this.position, rect, this.type);
        this.changeDirection();
      }
    }
  }
}

class RectShape {
  constructor(x, y, size, hue) {
    this.position = createVector(x, y);
    this.size = size;
    this.r = size / 2; // For collision detection compatibility
    this.velocity = createVector(random(-10 / this.size, 10 / this.size), random(-10 / this.size, 10 / this.size));
    this.hue = hue;
    this.angle = 0;
    this.type = 'rect'; // Store the shape type
  }

  intersects(other) {
    let d = dist(this.position.x, this.position.y, other.position.x, other.position.y);
    return (d < this.size / 2 + (other.r || other.size/2));
  }

  changeDirection() {
    this.velocity.mult(-1);
  }

  edges() {
    if (this.position.x < this.size / 2 || this.position.x > width - this.size / 2) {
      this.velocity.x *= -1;
      this.position.x = constrain(this.position.x, this.size / 2, width - this.size / 2);
    }
    if (this.position.y < this.size / 2 || this.position.y > height - this.size / 2) {
      this.velocity.y *= -1;
      this.position.y = constrain(this.position.y, this.size / 2, height - this.size / 2);
    }
  }

  show() {
    colorMode(HSB, 360, 100, 100);
    fill(this.hue, 100, 100);
    push();
    translate(this.position.x, this.position.y);
    rotate(this.angle);
    rectMode(CENTER);
    rect(0, 0, this.size, this.size);
    pop();
    colorMode(RGB, 255);
  }

  update() {
    this.position.add(this.velocity);
    this.angle += 0.05 / this.size;
    this.checkRectCollisions();
  }

  checkRectCollisions() {
    for (let rect of rectangles) {
      if (this.position.x + this.size / 2 > rect.x &&
        this.position.x - this.size / 2 < rect.x + rect.w &&
        this.position.y + this.size / 2 > rect.y &&
        this.position.y - this.size / 2 < rect.y + rect.h) {
        let freq = map(rect.x, 0, width, 60, 3600);
        let amp = map(rect.y, 0, height, 1, 0.1);
        playSound(freq, amp, rect.grayValue, this.hue, { w: rect.w, h: rect.h }, this.position, rect, this.type);
        this.changeDirection();
      }
    }
  }
}

class TriangleShape {
  constructor(x, y, size, hue) {
    this.position = createVector(x, y);
    this.size = size;
    this.r = size / 2; // For collision detection compatibility
    this.velocity = createVector(random(-10 / this.size, 10 / this.size), random(-10 / this.size, 10 / this.size));
    this.hue = hue;
    this.angle = 0;
    this.type = 'triangle'; // Store the shape type
  }

  intersects(other) {
    let d = dist(this.position.x, this.position.y, other.position.x, other.position.y);
    return (d < this.size / 2 + (other.r || other.size/2));
  }

  changeDirection() {
    this.velocity.mult(-1);
  }

  edges() {
    if (this.position.x < this.size / 2 || this.position.x > width - this.size / 2) {
      this.velocity.x *= -1;
      this.position.x = constrain(this.position.x, this.size / 2, width - this.size / 2);
    }
    if (this.position.y < this.size / 2 || this.position.y > height - this.size / 2) {
      this.velocity.y *= -1;
      this.position.y = constrain(this.position.y, this.size / 2, height - this.size / 2);
    }
  }

  show() {
    colorMode(HSB, 360, 100, 100);
    fill(this.hue, 100, 100);
    push();
    translate(this.position.x, this.position.y);
    rotate(this.angle);
    triangle(-this.size / 2, this.size / 2, 0, -this.size / 2, this.size / 2, this.size / 2);
    pop();
    colorMode(RGB, 255);
  }

  update() {
    this.position.add(this.velocity);
    this.angle += 0.05 / this.size;
    this.checkRectCollisions();
  }

  checkRectCollisions() {
    for (let rect of rectangles) {
      if (this.position.x + this.size / 2 > rect.x && this.position.x - this.size / 2 < rect.x + rect.w &&
        this.position.y + this.size / 2 > rect.y && this.position.y - this.size / 2 < rect.y + rect.h) {
        let freq = map(rect.x, 0, width, 60, 3600);
        let amp = map(rect.y, 0, height, 1, 0.1);
        playSound(freq, amp, rect.grayValue, this.hue, { w: rect.w, h: rect.h }, this.position, rect, this.type);
        this.changeDirection();
      }
    }
  }
}

class StarShape {
  constructor(x, y, size, hue) {
    this.position = createVector(x, y);
    this.size = size;
    this.r = size / 2; // For collision detection compatibility
    this.velocity = createVector(random(-10 / this.size, 10 / this.size), random(-10 / this.size, 10 / this.size));
    this.hue = hue;
    this.angle = 0;
    this.type = 'star'; // Store the shape type
  }

  intersects(other) {
    let d = dist(this.position.x, this.position.y, other.position.x, other.position.y);
    return (d < this.size / 2 + (other.r || other.size/2));
  }

  changeDirection() {
    this.velocity.mult(-1);
  }

  edges() {
    if (this.position.x < this.size / 2 || this.position.x > width - this.size / 2) {
      this.velocity.x *= -1;
      this.position.x = constrain(this.position.x, this.size / 2, width - this.size / 2);
    }
    if (this.position.y < this.size / 2 || this.position.y > height - this.size / 2) {
      this.velocity.y *= -1;
      this.position.y = constrain(this.position.y, this.size / 2, height - this.size / 2);
    }
  }

  show() {
    colorMode(HSB, 360, 100, 100);
    fill(this.hue, 100, 100);
    push();
    translate(this.position.x, this.position.y);
    rotate(this.angle);
    this.drawStar(0, 0, this.size / 4, this.size / 2, 5);
    pop();
    colorMode(RGB, 255);
  }

  drawStar(x, y, radius1, radius2, npoints) {
    let angle = TWO_PI / npoints;
    let halfAngle = angle / 2.0;
    beginShape();
    for (let a = 0; a < TWO_PI; a += angle) {
      let sx = x + cos(a) * radius2;
      let sy = y + sin(a) * radius2;
      vertex(sx, sy);
      sx = x + cos(a + halfAngle) * radius1;
      sy = y + sin(a + halfAngle) * radius1;
      vertex(sx, sy);
    }
    endShape(CLOSE);
  }

  update() {
    this.position.add(this.velocity);
    this.angle += 0.05 / this.size;
    this.checkRectCollisions();
  }

  checkRectCollisions() {
    for (let rect of rectangles) {
      if (this.position.x + this.size / 2 > rect.x && this.position.x - this.size / 2 < rect.x + rect.w &&
        this.position.y + this.size / 2 > rect.y && this.position.y - this.size / 2 < rect.y + rect.h) {
        let freq = map(rect.x, 0, width, 60, 3600);
        let amp = map(rect.y, 0, height, 1, 0.1);
        playSound(freq, amp, rect.grayValue, this.hue, { w: rect.w, h: rect.h }, this.position, rect, this.type);
        this.changeDirection();
      }
    }
  }
}

function playSound(freq, amp, grayValue, hueValue, rectSize, shapePosition, rect, shapeTypeSpecific) {
  if (!audioInitialized || !synth) {
    console.log('Audio not initialized, attempting to restart...');
    initializeAudio();
    return;
  }
  
  try {
    // Ensure audio context is running
    if (Tone.context.state === 'suspended') {
      Tone.start().then(() => {
        triggerSound(freq, amp, grayValue, hueValue, rectSize, shapePosition, rect, shapeTypeSpecific);
      });
    } else {
      triggerSound(freq, amp, grayValue, hueValue, rectSize, shapePosition, rect, shapeTypeSpecific);
    }
  } catch (e) {
    console.log('Sound playback failed:', e);
    // Try to reinitialize audio
    initializeAudio();
  }
}

function triggerSound(freq, amp, grayValue, hueValue, rectSize, shapePosition, rect, shapeTypeSpecific) {
  try {
    let harmonicity = map(grayValue, 0, 255, 0.1, 1);
    let modIndex = map(hueValue, 0, 360, 0.1, 1);
    let rectArea = rectSize.w * rectSize.h;
    let maxArea = 50 * 50;
    let wetValue = map(rectArea, 0, maxArea, 0, 1);
    
    if (reverb && reverb.wet) {
      reverb.wet.value = wetValue;
    }

    // Determine waveform based on the specific shape type
    let waveType = 'sine'; // default
    if (shapeTypeSpecific === 'ball') {
      waveType = 'sine';
    } else if (shapeTypeSpecific === 'rect') {
      waveType = 'square';
    } else if (shapeTypeSpecific === 'triangle') {
      waveType = 'triangle';
    } else if (shapeTypeSpecific === 'star') {
      waveType = 'sawtooth';
    }

    if (synth && synth.set) {
      synth.set({
        "harmonicity": harmonicity,
        "modulationIndex": modIndex,
        "oscillator": {
          "type": waveType
        }
      });
    }

    if (panner && panner.pan) {
      if (shapePosition.x < rect.x) {
        panner.pan.value = map(rect.x, 0, width, -1, 1);
      } else {
        panner.pan.value = map(rect.x + rectSize.w, 0, width, -1, 1);
      }
    }

    if (synth && synth.triggerAttackRelease) {
      synth.triggerAttackRelease(freq, "8n", "+0", amp);
    }
  } catch (e) {
    console.log('Sound trigger failed:', e);
  }
}