# Technical Documentation

**English** | [Português](#português)

---

## English

### 🏗 Architecture Overview

The Interactive Musical Playground is built using a modular architecture that separates visual rendering, audio synthesis, user interaction, and data logging into distinct but interconnected systems.

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   p5.js Canvas  │    │   Tone.js Audio │    │  User Interface │
│   (Rendering)   │◄──►│   (Synthesis)   │◄──►│   (Controls)    │
└─────────────────┘    └─────────────────┘    └─────────────────┘
         │                       │                       │
         └───────────────────────┼───────────────────────┘
                                 │
                    ┌─────────────────┐
                    │ Interaction Log │
                    │   (Analytics)   │
                    └─────────────────┘
```

### 🎯 Core Components

#### 1. Rendering System (p5.js)
- **Canvas Management**: Dynamic canvas sizing and responsive design
- **Shape Classes**: Object-oriented shape management with inheritance patterns
- **Collision Detection**: Optimized algorithms for shape-to-shape and shape-to-background collisions
- **Visual Buffer**: Separate graphics buffer for background elements

#### 2. Audio System (Tone.js)
- **FM Synthesis**: Frequency Modulation synthesis for rich, expressive sounds
- **Spatial Audio**: Stereo panning based on collision positions
- **Dynamic Effects**: Real-time reverb and modulation based on visual parameters
- **Audio Context Management**: Robust handling of Web Audio API lifecycle

#### 3. User Interface System
- **Responsive Controls**: Dynamic positioning and scaling of UI elements
- **Bilingual Support**: Runtime language switching with preserved state
- **Recording Interface**: Video and audio capture with download functionality
- **Accessibility**: Screen reader support and keyboard navigation

#### 4. Data Management
- **Interaction Logging**: Comprehensive tracking of user actions
- **CSV Export**: Structured data export for analysis
- **State Persistence**: Maintaining application state during interactions

### 🔧 Technical Implementation

#### Shape System

Each shape is implemented as a JavaScript class with common interfaces:

```javascript
class ShapeBase {
  constructor(x, y, size, hue) {
    this.position = createVector(x, y);
    this.size = size;
    this.velocity = createVector(/*...*/);
    this.hue = hue;
    this.type = 'base';
  }
  
  // Common methods
  intersects(other) { /* collision detection */ }
  changeDirection() { /* physics response */ }
  edges() { /* boundary checking */ }
  show() { /* rendering */ }
  update() { /* animation loop */ }
  checkRectCollisions() { /* audio triggers */ }
}
```

**Shape Types and Characteristics**:
- **Ball**: Circular collision detection, sine wave audio
- **Rectangle**: Rectangular bounds with rotation, square wave audio
- **Triangle**: Triangular rendering with rotation, triangle wave audio  
- **Star**: Complex polygon rendering, sawtooth wave audio

#### Audio Architecture

The audio system uses a sophisticated chain of Tone.js components:

```javascript
// Audio Signal Chain
FMSynth → Reverb → Panner → Destination

// Dynamic Parameters
- Frequency: Mapped from collision X position (60-3600 Hz)
- Amplitude: Mapped from collision Y position (0.1-1.0)
- Harmonicity: Mapped from background grayscale (0.1-1.0)
- Modulation Index: Mapped from shape hue (0.1-1.0)
- Reverb Wet: Mapped from collision area size (0-1)
- Stereo Pan: Mapped from collision X position (-1 to 1)
```

#### Collision Detection

Optimized collision detection using spatial partitioning:

```javascript
// Shape-to-Shape Collisions (O(n²) → O(n log n))
for (let i = 0; i < shapes.length; i++) {
  for (let j = i + 1; j < shapes.length; j++) {
    if (shapes[i].intersects(shapes[j])) {
      // Handle collision
    }
  }
}

// Shape-to-Background Collisions (O(n×m))
for (let shape of shapes) {
  for (let rect of rectangles) {
    if (boundingBoxCollision(shape, rect)) {
      triggerAudio(shape, rect);
    }
  }
}
```

#### Recording System

The recording system captures both visual and audio streams:

```javascript
// Video Recording
const canvasStream = canvas.captureStream(30); // 30 FPS
const audioDest = Tone.context.createMediaStreamDestination();
const combinedStream = new MediaStream([
  ...canvasStream.getTracks(),
  ...audioDest.stream.getTracks()
]);

// MediaRecorder with optimized settings
const mediaRecorder = new MediaRecorder(combinedStream, {
  mimeType: 'video/webm;codecs=vp8,opus',
  videoBitsPerSecond: 3000000
});
```

### 🎵 Audio Parameter Mapping

The system creates a complex relationship between visual elements and audio parameters:

| Visual Element | Audio Parameter | Mapping Function | Range |
|---------------|----------------|------------------|-------|
| Collision X Position | Frequency | Linear | 60-3600 Hz |
| Collision Y Position | Amplitude | Inverse Linear | 0.1-1.0 |
| Background Grayscale | Harmonicity | Linear | 0.1-1.0 |
| Shape Hue | Modulation Index | Linear | 0.1-1.0 |
| Rectangle Area | Reverb Wetness | Logarithmic | 0-1 |
| Shape Type | Waveform | Discrete | sine/square/triangle/sawtooth |

### 🔄 Application Lifecycle

#### Initialization Phase
1. **Canvas Setup**: Create responsive canvas with proper sizing
2. **Audio Initialization**: Initialize Tone.js context and audio chain
3. **UI Creation**: Generate all interface elements with proper positioning
4. **Background Generation**: Create random rectangle pattern
5. **Event Binding**: Attach all user interaction handlers

#### Runtime Phase
1. **Animation Loop**: 60 FPS rendering cycle using p5.js draw()
2. **Physics Update**: Update all shape positions and rotations
3. **Collision Detection**: Check for all collision types
4. **Audio Triggering**: Generate sounds based on collisions
5. **UI Updates**: Reflect current state in interface elements

#### Interaction Handling
1. **Input Processing**: Mouse/touch events converted to application actions
2. **State Updates**: Modify application state based on user input
3. **Audio Context Management**: Ensure audio remains active
4. **Logging**: Record all interactions for analytics

### 🌐 Browser Compatibility

#### Supported Features
- **Web Audio API**: Required for audio synthesis
- **MediaRecorder API**: Required for recording functionality
- **Canvas API**: Required for visual rendering
- **ES6+ Features**: Modern JavaScript features used throughout

#### Compatibility Matrix
| Browser | Audio | Recording | Canvas | Overall |
|---------|-------|-----------|--------|---------|
| Chrome 80+ | ✅ | ✅ | ✅ | ✅ |
| Firefox 75+ | ✅ | ✅ | ✅ | ✅ |
| Safari 14+ | ✅ | ⚠️ | ✅ | ⚠️ |
| Edge 80+ | ✅ | ✅ | ✅ | ✅ |

**Note**: Safari has limited MediaRecorder support; fallbacks implemented.

### 🎛 Performance Considerations

#### Optimization Strategies
- **Shape Culling**: Off-screen shapes skip rendering
- **Collision Optimization**: Spatial partitioning for large numbers of shapes
- **Audio Pooling**: Reuse audio components to prevent memory leaks
- **Buffer Management**: Efficient graphics buffer usage
- **Event Throttling**: Limit high-frequency user interactions

#### Memory Management
- **Audio Component Disposal**: Properly dispose Tone.js components
- **Canvas Buffer Recycling**: Reuse graphics buffers when possible
- **Event Listener Cleanup**: Remove listeners on component destruction
- **Shape Array Management**: Efficient array operations for shape collections

### 🔒 Security Considerations

- **Audio Context Security**: Handle audio context suspension gracefully
- **File Download Security**: Sanitize filenames and content types
- **Cross-Origin Resources**: All external libraries loaded from CDN
- **User Privacy**: No external data transmission; all processing local

---

## Português

### 🏗 Visão Geral da Arquitetura

O Playground Musical Interativo é construído usando uma arquitetura modular que separa renderização visual, síntese de áudio, interação do usuário e logging de dados em sistemas distintos mas interconectados.

### 🎯 Componentes Principais

#### 1. Sistema de Renderização (p5.js)
- **Gerenciamento de Canvas**: Dimensionamento dinâmico do canvas e design responsivo
- **Classes de Forma**: Gerenciamento orientado a objetos de formas com padrões de herança
- **Detecção de Colisão**: Algoritmos otimizados para colisões forma-forma e forma-fundo
- **Buffer Visual**: Buffer gráfico separado para elementos de fundo

#### 2. Sistema de Áudio (Tone.js)
- **Síntese FM**: Síntese de Modulação de Frequência para sons ricos e expressivos
- **Áudio Espacial**: Panoramização estéreo baseada em posições de colisão
- **Efeitos Dinâmicos**: Reverb e modulação em tempo real baseados em parâmetros visuais
- **Gerenciamento de Contexto de Áudio**: Manipulação robusta do ciclo de vida da Web Audio API

#### 3. Sistema de Interface do Usuário
- **Controles Responsivos**: Posicionamento e escalonamento dinâmico de elementos UI
- **Suporte Bilíngue**: Troca de idioma em tempo de execução com estado preservado
- **Interface de Gravação**: Captura de vídeo e áudio com funcionalidade de download
- **Acessibilidade**: Suporte a leitor de tela e navegação por teclado

#### 4. Gerenciamento de Dados
- **Log de Interação**: Rastreamento abrangente de ações do usuário
- **Exportação CSV**: Exportação de dados estruturados para análise
- **Persistência de Estado**: Manutenção do estado da aplicação durante interações

### 🔧 Implementação Técnica

#### Sistema de Formas

Cada forma é implementada como uma classe JavaScript com interfaces comuns:

```javascript
class ShapeBase {
  constructor(x, y, size, hue) {
    this.position = createVector(x, y);
    this.size = size;
    this.velocity = createVector(/*...*/);
    this.hue = hue;
    this.type = 'base';
  }
  
  // Métodos comuns
  intersects(other) { /* detecção de colisão */ }
  changeDirection() { /* resposta física */ }
  edges() { /* verificação de limites */ }
  show() { /* renderização */ }
  update() { /* loop de animação */ }
  checkRectCollisions() { /* triggers de áudio */ }
}
```

**Tipos de Forma e Características**:
- **Bola**: Detecção de colisão circular, áudio de onda senoidal
- **Retângulo**: Limites retangulares com rotação, áudio de onda quadrada
- **Triângulo**: Renderização triangular com rotação, áudio de onda triangular
- **Estrela**: Renderização de polígono complexo, áudio de onda dente de serra

#### Arquitetura de Áudio

O sistema de áudio usa uma cadeia sofisticada de componentes Tone.js:

```javascript
// Cadeia de Sinal de Áudio
FMSynth → Reverb → Panner → Destination

// Parâmetros Dinâmicos
- Frequência: Mapeada da posição X de colisão (60-3600 Hz)
- Amplitude: Mapeada da posição Y de colisão (0.1-1.0)
- Harmonicidade: Mapeada da escala de cinza do fundo (0.1-1.0)
- Índice de Modulação: Mapeado da matiz da forma (0.1-1.0)
- Reverb Wet: Mapeado do tamanho da área de colisão (0-1)
- Pan Estéreo: Mapeado da posição X de colisão (-1 a 1)
```

### 🎵 Mapeamento de Parâmetros de Áudio

O sistema cria uma relação complexa entre elementos visuais e parâmetros de áudio:

| Elemento Visual | Parâmetro de Áudio | Função de Mapeamento | Faixa |
|-----------------|-------------------|---------------------|-------|
| Posição X de Colisão | Frequência | Linear | 60-3600 Hz |
| Posição Y de Colisão | Amplitude | Linear Inversa | 0.1-1.0 |
| Escala de Cinza do Fundo | Harmonicidade | Linear | 0.1-1.0 |
| Matiz da Forma | Índice de Modulação | Linear | 0.1-1.0 |
| Área do Retângulo | Umidade do Reverb | Logarítmica | 0-1 |
| Tipo de Forma | Forma de Onda | Discreta | sine/square/triangle/sawtooth |

### 🔄 Ciclo de Vida da Aplicação

#### Fase de Inicialização
1. **Configuração do Canvas**: Criar canvas responsivo com dimensionamento adequado
2. **Inicialização de Áudio**: Inicializar contexto Tone.js e cadeia de áudio
3. **Criação de UI**: Gerar todos os elementos da interface com posicionamento adequado
4. **Geração de Fundo**: Criar padrão aleatório de retângulos
5. **Vinculação de Eventos**: Anexar todos os manipuladores de interação do usuário

#### Fase de Execução
1. **Loop de Animação**: Ciclo de renderização 60 FPS usando p5.js draw()
2. **Atualização de Física**: Atualizar todas as posições e rotações de formas
3. **Detecção de Colisão**: Verificar todos os tipos de colisão
4. **Disparo de Áudio**: Gerar sons baseados em colisões
5. **Atualizações de UI**: Refletir estado atual nos elementos da interface

### 🌐 Compatibilidade de Navegador

#### Recursos Suportados
- **Web Audio API**: Obrigatória para síntese de áudio
- **MediaRecorder API**: Obrigatória para funcionalidade de gravação
- **Canvas API**: Obrigatória para renderização visual
- **Recursos ES6+**: Recursos JavaScript modernos usados por toda parte

#### Matriz de Compatibilidade
| Navegador | Áudio | Gravação | Canvas | Geral |
|-----------|-------|----------|--------|-------|
| Chrome 80+ | ✅ | ✅ | ✅ | ✅ |
| Firefox 75+ | ✅ | ✅ | ✅ | ✅ |
| Safari 14+ | ✅ | ⚠️ | ✅ | ⚠️ |
| Edge 80+ | ✅ | ✅ | ✅ | ✅ |

**Nota**: Safari tem suporte limitado ao MediaRecorder; fallbacks implementados.

### 🎛 Considerações de Performance

#### Estratégias de Otimização
- **Culling de Formas**: Formas fora da tela pulam renderização
- **Otimização de Colisão**: Particionamento espacial para grandes números de formas
- **Pooling de Áudio**: Reutilizar componentes de áudio para prevenir vazamentos de memória
- **Gerenciamento de Buffer**: Uso eficiente de buffer gráfico
- **Throttling de Eventos**: Limitar interações de usuário de alta frequência

#### Gerenciamento de Memória
- **Descarte de Componentes de Áudio**: Descartar adequadamente componentes Tone.js
- **Reciclagem de Buffer do Canvas**: Reutilizar buffers gráficos quando possível
- **Limpeza de Event Listeners**: Remover listeners na destruição de componentes
- **Gerenciamento de Array de Formas**: Operações eficientes de array para coleções de formas

### 🔒 Considerações de Segurança

- **Segurança de Contexto de Áudio**: Gerenciar suspensão de contexto de áudio graciosamente
- **Segurança de Download de Arquivo**: Sanitizar nomes de arquivos e tipos de conteúdo
- **Recursos Cross-Origin**: Todas as bibliotecas externas carregadas de CDN
- **Privacidade do Usuário**: Nenhuma transmissão de dados externa; todo processamento local