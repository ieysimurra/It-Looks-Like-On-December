# API Documentation

**English** | [Português](#português)

---

## English

### 🎯 Core Functions

#### Setup and Initialization

##### `setup()`
Initializes the p5.js application and sets up all core components.

```javascript
function setup()
```

**Description**: Called once when the program starts. Creates canvas, UI elements, audio components, and initializes the symbol buffer.

**Side Effects**:
- Creates responsive canvas
- Initializes audio system
- Creates all UI controls
- Sets up event listeners

---

##### `initializeAudio()`
Initializes the Tone.js audio system with proper context management.

```javascript
function initializeAudio()
```

**Description**: Sets up the audio components and handles audio context suspension/resumption. Automatically called during setup.

**Audio Components Created**:
- FM Synthesizer
- Reverb effect
- Stereo panner
- Audio routing

---

##### `setupAudioComponents()`
Creates and connects all audio synthesis components.

```javascript
function setupAudioComponents()
```

**Description**: Internal function that creates the audio signal chain. Handles cleanup of existing components before creating new ones.

---

### 🎨 Shape System

#### Base Shape Interface

All shape classes implement the following interface:

```javascript
interface ShapeInterface {
  position: p5.Vector;
  size: number;
  velocity: p5.Vector;
  hue: number;
  type: string;
  
  intersects(other: ShapeInterface): boolean;
  changeDirection(): void;
  edges(): void;
  show(): void;
  update(): void;
  checkRectCollisions(): void;
}
```

#### Shape Classes

##### `Ball`
Circular shape with sine wave audio characteristics.

```javascript
class Ball {
  constructor(x: number, y: number, r: number, hue: number)
}
```

**Parameters**:
- `x`, `y`: Initial position coordinates
- `r`: Radius of the ball
- `hue`: Color hue (0-360)

**Properties**:
- `r`: Radius for collision detection
- `size`: Diameter (r × 2)
- `type`: 'ball'

---

##### `RectShape`
Rectangular shape with rotation and square wave audio.

```javascript
class RectShape {
  constructor(x: number, y: number, size: number, hue: number)
}
```

**Parameters**:
- `x`, `y`: Initial position coordinates
- `size`: Width and height of the rectangle
- `hue`: Color hue (0-360)

**Properties**:
- `angle`: Current rotation angle
- `type`: 'rect'

---

##### `TriangleShape`
Triangular shape with triangle wave audio characteristics.

```javascript
class TriangleShape {
  constructor(x: number, y: number, size: number, hue: number)
}
```

**Parameters**:
- `x`, `y`: Initial position coordinates  
- `size`: Size of the triangle
- `hue`: Color hue (0-360)

**Properties**:
- `angle`: Current rotation angle
- `type`: 'triangle'

---

##### `StarShape`
Star-shaped polygon with sawtooth wave audio.

```javascript
class StarShape {
  constructor(x: number, y: number, size: number, hue: number)
}
```

**Parameters**:
- `x`, `y`: Initial position coordinates
- `size`: Size of the star
- `hue`: Color hue (0-360)

**Methods**:
- `drawStar(x, y, radius1, radius2, npoints)`: Custom star rendering

---

### 🎵 Audio Functions

##### `playSound(freq, amp, grayValue, hueValue, rectSize, shapePosition, rect, shapeType)`
Triggers audio synthesis based on collision parameters.

```javascript
function playSound(
  freq: number,
  amp: number, 
  grayValue: number,
  hueValue: number,
  rectSize: {w: number, h: number},
  shapePosition: p5.Vector,
  rect: Rectangle,
  shapeType: string
)
```

**Parameters**:
- `freq`: Base frequency (60-3600 Hz)
- `amp`: Amplitude (0.1-1.0)
- `grayValue`: Background grayscale value (0-255)
- `hueValue`: Shape hue value (0-360)
- `rectSize`: Collision rectangle dimensions
- `shapePosition`: Shape collision position
- `rect`: Background rectangle object
- `shapeType`: Type of shape triggering sound

**Audio Mappings**:
- Frequency: Mapped from rect.x position
- Amplitude: Mapped from rect.y position  
- Harmonicity: Mapped from grayValue
- Modulation Index: Mapped from hueValue
- Reverb Wetness: Mapped from rectangle area
- Stereo Pan: Mapped from collision X position

---

##### `triggerSound(freq, amp, grayValue, hueValue, rectSize, shapePosition, rect, shapeType)`
Internal function that actually triggers the Tone.js synthesis.

```javascript
function triggerSound(/* same parameters as playSound */)
```

**Description**: Handles the actual audio synthesis with error checking and parameter mapping.

---

### 🎮 User Interface Functions

##### `createUIElements(textColor)`
Creates all user interface controls and buttons.

```javascript
function createUIElements(textColor: string)
```

**Parameters**:
- `textColor`: CSS color value for text elements

**Creates**:
- Size and hue sliders
- Shape selection buttons
- Action buttons (random, reset, update)
- Recording controls
- Instruction button

---

##### `repositionUIElements()`
Repositions all UI elements based on current window size.

```javascript
function repositionUIElements()
```

**Description**: Called during window resize to maintain proper UI layout. Uses percentage-based positioning for responsiveness.

---

##### `updateToggleButtons()`
Updates the visual state of shape selection buttons.

```javascript
function updateToggleButtons()
```

**Description**: Highlights the currently selected shape button and resets others.

---

### 🎯 Interaction Functions

##### `selectShape(shape)`
Changes the currently selected shape type and updates UI.

```javascript
function selectShape(shape: 'ball' | 'rect' | 'triangle' | 'star')
```

**Parameters**:
- `shape`: Shape type to select

**Side Effects**:
- Updates global `shapeType` variable
- Updates button highlighting
- Changes synthesizer waveform

---

##### `addShape()`
Adds a random shape with random parameters to the canvas.

```javascript
function addShape()
```

**Description**: Creates a new shape with randomized size, hue, and type. Updates sliders to reflect random values and logs the action.

---

##### `addShapeAt(x, y)`
Adds a shape at the specified coordinates.

```javascript
function addShapeAt(x: number, y: number)
```

**Parameters**:
- `x`, `y`: Coordinates where to place the shape

**Description**: Creates a shape using current slider values at the specified position. Checks for valid placement (not inside background rectangles).

---

##### `mousePressed()`
Handles mouse/touch interactions on the canvas.

```javascript
function mousePressed()
```

**Behavior**:
- Activates audio on first interaction
- Removes shapes when clicked directly
- Adds new shapes when clicking empty space
- Logs all interactions

---

### 📹 Recording Functions

##### `toggleRecording()`
Starts or stops video recording with audio.

```javascript
function toggleRecording()
```

**Description**: Manages the video recording state and UI updates. Creates MediaRecorder with canvas and audio streams.

---

##### `startRecording()`
Begins video recording with embedded audio.

```javascript
function startRecording()
```

**Technical Details**:
- Captures canvas at 30 FPS
- Records audio from Tone.js output
- Uses WebM format with VP8/Opus codecs
- Combines visual and audio streams

---

##### `stopRecording()`
Stops video recording and triggers download.

```javascript
function stopRecording()
```

**Description**: Finalizes recording, creates downloadable blob, and saves interaction log.

---

##### `toggleAudioRecording()`
Starts or stops audio-only recording.

```javascript
function toggleAudioRecording()
```

**Description**: Manages audio recording state independently of video recording.

---

### 📊 Data Management Functions

##### `logAction(action)`
Records a user action in the interaction log.

```javascript
function logAction(action: string)
```

**Parameters**:
- `action`: Description of the action performed

**Logged Data**:
- Timestamp (ISO format)
- Action description
- Current shape type
- Current shape size
- Current shape hue

---

##### `logShapeSelection(selectedShape)`
Records shape selection events.

```javascript
function logShapeSelection(selectedShape: string)
```

**Parameters**:
- `selectedShape`: The shape type that was selected

---

##### `logSliderChange()`
Records slider value changes.

```javascript
function logSliderChange()
```

**Description**: Called automatically when sliders are moved. Records current slider values.

---

##### `saveLogData()`
Exports interaction log as CSV file.

```javascript
function saveLogData()
```

**Description**: Converts interaction log to CSV format and triggers download. Called automatically when recording stops.

---

### 🔄 Utility Functions

##### `updateSketch()`
Regenerates the background pattern and clears all shapes.

```javascript
function updateSketch()
```

**Description**: Creates new random background rectangles and removes all existing shapes.

---

##### `resetSketch()`
Clears all shapes while keeping background pattern.

```javascript
function resetSketch()
```

**Description**: Removes all shapes but keeps current background pattern.

---

##### `drawSymbols(pg)`
Generates random background rectangles.

```javascript
function drawSymbols(pg: p5.Graphics)
```

**Parameters**:
- `pg`: p5.Graphics buffer to draw on

**Algorithm**:
- Randomly determines number of rectangles (5-20)
- Creates rectangles with random positions, sizes, and grayscale values
- Stores rectangle data for collision detection

---

##### `isInsideRect(x, y, size)`
Checks if a position would place a shape inside a background rectangle.

```javascript
function isInsideRect(x: number, y: number, size: number): boolean
```

**Parameters**:
- `x`, `y`: Position to check
- `size`: Size of the shape to place

**Returns**: `true` if position is inside any background rectangle

---

##### `windowResized()`
Handles window resize events.

```javascript
function windowResized()
```

**Description**: Automatically called by p5.js when window is resized. Handles canvas resizing, UI repositioning, and audio reinitialization.

---

### 🌐 Internationalization

##### `openInstructionPopup(instructionButton)`
Opens instruction window in appropriate language.

```javascript
function openInstructionPopup(instructionButton: p5.Element)
```

**Parameters**:
- `instructionButton`: Button element that triggered the popup

**Behavior**:
- Toggles between English and Portuguese
- Opens appropriate instruction file
- Updates button text

---

## Global Variables

### Core State
- `shapes: Array`: Collection of all active shapes
- `shapeType: string`: Currently selected shape type ('ball', 'rect', 'triangle', 'star')
- `currentLanguage: string`: Current UI language ('en' or 'pt')

### UI Elements
- `ballSizeSlider: p5.Element`: Shape size control
- `colorHueSlider: p5.Element`: Shape color control
- `shapeToggle*: p5.Element`: Shape selection buttons

### Audio System
- `synth: Tone.FMSynth`: Main synthesizer
- `panner: Tone.Panner`: Stereo positioning
- `reverb: Tone.Reverb`: Reverb effect
- `audioInitialized: boolean`: Audio system status

### Recording System
- `mediaRecorder: MediaRecorder`: Video recording
- `audioRecorder: MediaRecorder`: Audio recording
- `isRecording: boolean`: Video recording state
- `isAudioRecording: boolean`: Audio recording state

### Background System
- `rectangles: Array`: Background rectangle data
- `symbolBuffer: p5.Graphics`: Pre-rendered background

### Data Logging
- `interactionLog: Array`: User interaction history

---

## Português

### 🎯 Funções Principais

#### Configuração e Inicialização

##### `setup()`
Inicializa a aplicação p5.js e configura todos os componentes principais.

```javascript
function setup()
```

**Descrição**: Chamada uma vez quando o programa inicia. Cria canvas, elementos UI, componentes de áudio e inicializa o buffer de símbolos.

**Efeitos Colaterais**:
- Cria canvas responsivo
- Inicializa sistema de áudio
- Cria todos os controles de UI
- Configura event listeners

---

##### `initializeAudio()`
Inicializa o sistema de áudio Tone.js com gerenciamento adequado de contexto.

```javascript
function initializeAudio()
```

**Descrição**: Configura os componentes de áudio e gerencia suspensão/retomada do contexto de áudio. Automaticamente chamada durante setup.

**Componentes de Áudio Criados**:
- Sintetizador FM
- Efeito de reverb
- Panner estéreo
- Roteamento de áudio

---

### 🎨 Sistema de Formas

#### Interface Base de Forma

Todas as classes de forma implementam a seguinte interface:

```javascript
interface ShapeInterface {
  position: p5.Vector;
  size: number;
  velocity: p5.Vector;
  hue: number;
  type: string;
  
  intersects(other: ShapeInterface): boolean;
  changeDirection(): void;
  edges(): void;
  show(): void;
  update(): void;
  checkRectCollisions(): void;
}
```

#### Classes de Forma

##### `Ball`
Forma circular com características de áudio de onda senoidal.

```javascript
class Ball {
  constructor(x: number, y: number, r: number, hue: number)
}
```

**Parâmetros**:
- `x`, `y`: Coordenadas de posição inicial
- `r`: Raio da bola
- `hue`: Matiz da cor (0-360)

**Propriedades**:
- `r`: Raio para detecção de colisão
- `size`: Diâmetro (r × 2)
- `type`: 'ball'

---

### 🎵 Funções de Áudio

##### `playSound(freq, amp, grayValue, hueValue, rectSize, shapePosition, rect, shapeType)`
Dispara síntese de áudio baseada em parâmetros de colisão.

```javascript
function playSound(
  freq: number,
  amp: number, 
  grayValue: number,
  hueValue: number,
  rectSize: {w: number, h: number},
  shapePosition: p5.Vector,
  rect: Rectangle,
  shapeType: string
)
```

**Parâmetros**:
- `freq`: Frequência base (60-3600 Hz)
- `amp`: Amplitude (0.1-1.0)
- `grayValue`: Valor de escala de cinza do fundo (0-255)
- `hueValue`: Valor de matiz da forma (0-360)
- `rectSize`: Dimensões do retângulo de colisão
- `shapePosition`: Posição de colisão da forma
- `rect`: Objeto retângulo de fundo
- `shapeType`: Tipo de forma disparando som

**Mapeamentos de Áudio**:
- Frequência: Mapeada da posição rect.x
- Amplitude: Mapeada da posição rect.y
- Harmonicidade: Mapeada de grayValue
- Índice de Modulação: Mapeado de hueValue
- Umidade do Reverb: Mapeada da área do retângulo
- Pan Estéreo: Mapeado da posição X de colisão

---

### 🎮 Funções de Interface do Usuário

##### `createUIElements(textColor)`
Cria todos os controles e botões da interface do usuário.

```javascript
function createUIElements(textColor: string)
```

**Parâmetros**:
- `textColor`: Valor de cor CSS para elementos de texto

**Cria**:
- Sliders de tamanho e matiz
- Botões de seleção de forma
- Botões de ação (aleatório, reset, atualizar)
- Controles de gravação
- Botão de instruções

---

### 📊 Funções de Gerenciamento de Dados

##### `logAction(action)`
Registra uma ação do usuário no log de interação.

```javascript
function logAction(action: string)
```

**Parâmetros**:
- `action`: Descrição da ação realizada

**Dados Registrados**:
- Timestamp (formato ISO)
- Descrição da ação
- Tipo de forma atual
- Tamanho de forma atual
- Matiz de forma atual

---

##### `saveLogData()`
Exporta log de interação como arquivo CSV.

```javascript
function saveLogData()
```

**Descrição**: Converte log de interação para formato CSV e dispara download. Chamada automaticamente quando gravação para.

---

## Variáveis Globais

### Estado Principal
- `shapes: Array`: Coleção de todas as formas ativas
- `shapeType: string`: Tipo de forma atualmente selecionado ('ball', 'rect', 'triangle', 'star')
- `currentLanguage: string`: Idioma atual da UI ('en' ou 'pt')

### Elementos de UI
- `ballSizeSlider: p5.Element`: Controle de tamanho de forma
- `colorHueSlider: p5.Element`: Controle de cor de forma
- `shapeToggle*: p5.Element`: Botões de seleção de forma

### Sistema de Áudio
- `synth: Tone.FMSynth`: Sintetizador principal
- `panner: Tone.Panner`: Posicionamento estéreo
- `reverb: Tone.Reverb`: Efeito de reverb
- `audioInitialized: boolean`: Status do sistema de áudio

### Sistema de Gravação
- `mediaRecorder: MediaRecorder`: Gravação de vídeo
- `audioRecorder: MediaRecorder`: Gravação de áudio
- `isRecording: boolean`: Estado de gravação de vídeo
- `isAudioRecording: boolean`: Estado de gravação de áudio

### Sistema de Fundo
- `rectangles: Array`: Dados de retângulos de fundo
- `symbolBuffer: p5.Graphics`: Fundo pré-renderizado

### Log de Dados
- `interactionLog: Array`: Histórico de interação do usuário