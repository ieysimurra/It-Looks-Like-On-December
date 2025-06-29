# Interactive Musical Playground | Playground Musical Interativo

**English** | [Português](#português)

---

## English

### 🎨 Interactive Musical Playground inspired by Earle Brown's "December 1952"

An interactive web application that brings the experimental spirit of Earle Brown's graphic scores into the digital realm. Create, manipulate, and listen to geometric shapes that generate unique soundscapes through collision-based interactions.

[![Demo](https://img.shields.io/badge/Demo-Live-brightgreen)](https://editor.p5js.org/ieysimurra/sketches/8iyT3J3l8)
[![License](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![p5.js](https://img.shields.io/badge/p5.js-1.7.0-red)](https://p5js.org/)
[![Tone.js](https://img.shields.io/badge/Tone.js-14.7.77-orange)](https://tonejs.github.io/)

### ✨ Features

- **Multiple Shape Types**: Balls, rectangles, triangles, and stars, each with unique sound characteristics
- **Dynamic Sound Generation**: Real-time audio synthesis using Tone.js with shape-specific waveforms
- **Interactive Controls**: Adjustable size, color (hue), and shape selection
- **Collision-Based Audio**: Sounds triggered by shape-background interactions
- **Recording Capabilities**: Video and audio recording with downloadable outputs
- **Bilingual Interface**: Full support for English and Portuguese
- **User Interaction Logging**: CSV export of all user interactions for analysis
- **Responsive Design**: Adapts to different screen sizes and fullscreen mode

### 🎵 Sound Design

Each shape produces a unique sound profile:
- **Ball**: Sine waves for smooth, flowing tones
- **Rectangle**: Square waves for sharp, digital sounds
- **Triangle**: Triangle waves for bright, harmonic tones
- **Star**: Sawtooth waves for rich, complex timbres

### 🚀 Quick Start

1. Clone the repository:
```bash
git clone https://github.com/yourusername/interactive-musical-playground.git
cd interactive-musical-playground
```

2. Open `index.html` in a modern web browser

3. Or serve locally:
```bash
# Using Python 3
python -m http.server 8000

# Using Node.js (with live-server)
npx live-server
```

4. Navigate to `http://localhost:8000`

### 🎮 How to Use

1. **Select a Shape**: Choose from Ball, Rectangle, Triangle, or Star
2. **Adjust Parameters**: Use sliders to modify size and color
3. **Add Shapes**: Click "Random Shape" or click anywhere on the canvas
4. **Remove Shapes**: Click directly on any shape to remove it
5. **Record**: Use recording buttons to capture video or audio
6. **Reset**: Clear all shapes or update the background pattern

### 🛠 Technical Requirements

- Modern web browser with Web Audio API support
- JavaScript enabled
- Recommended: Chrome, Firefox, Safari, or Edge (latest versions)

### 📁 Project Structure

```
interactive-musical-playground/
├── index.html              # Main HTML file
├── sketch.js               # Main p5.js application
├── instructions_en.html    # English instructions
├── instructions_pt.html    # Portuguese instructions
├── assets/
│   ├── screenshots/        # Application screenshots
│   └── examples/          # Example recordings
├── docs/                  # Documentation
│   ├── API.md            # API documentation
│   ├── TECHNICAL.md      # Technical details
│   └── EARLE_BROWN.md    # Background on December 1952
├── examples/             # Usage examples
├── tests/               # Test files
└── README.md           # This file
```

### 🎼 About Earle Brown's "December 1952"

This project draws inspiration from Earle Brown's revolutionary graphic score "December 1952," a landmark work in experimental music that challenged traditional notation by using abstract visual elements to guide musical interpretation. Just as Brown's work allowed performers freedom in musical interpretation, this interactive playground gives users creative control over both visual and auditory elements.

### 🤝 Contributing

We welcome contributions! Please see [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

### 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

### 🙏 Acknowledgments

- [Earle Brown](https://en.wikipedia.org/wiki/Earle_Brown) for the inspiration
- [p5.js](https://p5js.org/) community for the creative coding framework
- [Tone.js](https://tonejs.github.io/) for Web Audio synthesis
- Contributors and testers

---

## Português

### 🎨 Playground Musical Interativo inspirado em "December 1952" de Earle Brown

Uma aplicação web interativa que traz o espírito experimental das partituras gráficas de Earle Brown para o reino digital. Crie, manipule e ouça formas geométricas que geram paisagens sonoras únicas através de interações baseadas em colisões.

### ✨ Funcionalidades

- **Múltiplos Tipos de Formas**: Bolas, retângulos, triângulos e estrelas, cada um com características sonoras únicas
- **Geração Dinâmica de Som**: Síntese de áudio em tempo real usando Tone.js com formas de onda específicas para cada forma
- **Controles Interativos**: Tamanho, cor (matiz) e seleção de forma ajustáveis
- **Áudio Baseado em Colisão**: Sons disparados por interações forma-fundo
- **Capacidades de Gravação**: Gravação de vídeo e áudio com saídas baixáveis
- **Interface Bilíngue**: Suporte completo para inglês e português
- **Log de Interação do Usuário**: Exportação CSV de todas as interações do usuário para análise
- **Design Responsivo**: Adapta-se a diferentes tamanhos de tela e modo tela cheia

### 🎵 Design Sonoro

Cada forma produz um perfil sonoro único:
- **Bola**: Ondas senoidais para tons suaves e fluidos
- **Retângulo**: Ondas quadradas para sons digitais e nítidos
- **Triângulo**: Ondas triangulares para tons brilhantes e harmônicos
- **Estrela**: Ondas dente de serra para timbres ricos e complexos

### 🚀 Início Rápido

1. Clone o repositório:
```bash
git clone https://github.com/seuusuario/interactive-musical-playground.git
cd interactive-musical-playground
```

2. Abra `index.html` em um navegador web moderno

3. Ou sirva localmente:
```bash
# Usando Python 3
python -m http.server 8000

# Usando Node.js (com live-server)
npx live-server
```

4. Navegue para `http://localhost:8000`

### 🎮 Como Usar

1. **Selecione uma Forma**: Escolha entre Bola, Retângulo, Triângulo ou Estrela
2. **Ajuste Parâmetros**: Use controles deslizantes para modificar tamanho e cor
3. **Adicione Formas**: Clique em "Forma Aleatória" ou clique em qualquer lugar da tela
4. **Remova Formas**: Clique diretamente em qualquer forma para removê-la
5. **Grave**: Use botões de gravação para capturar vídeo ou áudio
6. **Reinicie**: Limpe todas as formas ou atualize o padrão de fundo

### 🛠 Requisitos Técnicos

- Navegador web moderno com suporte à Web Audio API
- JavaScript habilitado
- Recomendado: Chrome, Firefox, Safari ou Edge (versões mais recentes)

### 🎼 Sobre "December 1952" de Earle Brown

Este projeto se inspira na partitura gráfica revolucionária "December 1952" de Earle Brown, uma obra marco na música experimental que desafiou a notação tradicional usando elementos visuais abstratos para guiar a interpretação musical. Assim como a obra de Brown permitiu liberdade aos intérpretes na interpretação musical, este playground interativo dá aos usuários controle criativo sobre elementos visuais e auditivos.

### 🤝 Contribuindo

Contribuições são bem-vindas! Por favor, veja [CONTRIBUTING.md](CONTRIBUTING.md) para diretrizes.

### 📄 Licença

Este projeto está licenciado sob a Licença MIT - veja o arquivo [LICENSE](LICENSE) para detalhes.

### 🙏 Agradecimentos

- [Earle Brown](https://en.wikipedia.org/wiki/Earle_Brown) pela inspiração
- Comunidade [p5.js](https://p5js.org/) pelo framework de codificação criativa
- [Tone.js](https://tonejs.github.io/) pela síntese Web Audio
- Contribuidores e testadores