# Additional Project Files

## LICENSE

```
MIT License

Copyright (c) 2025 Interactive Musical Playground

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

## CHANGELOG.md

```markdown
# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added
- Initial project structure
- Complete documentation suite

## [2.0.0] - 2025-01-29

### Added
- Star shape with sawtooth wave synthesis
- Enhanced audio parameter mapping
- Improved collision detection optimization
- Bilingual interface (English/Portuguese)
- Video recording with embedded audio
- Audio-only recording capability
- User interaction logging with CSV export
- Responsive design for mobile devices
- Enhanced error handling for audio context
- Real-time reverb and panning effects

### Changed
- Migrated from basic audio to advanced FM synthesis
- Improved shape physics and collision responses
- Enhanced UI layout and positioning
- Better audio context management
- Optimized rendering performance

### Fixed
- Audio context suspension issues in Safari
- Memory leaks in audio component disposal
- Canvas resizing bugs in fullscreen mode
- Shape boundary checking edge cases

## [1.0.0] - 2024-12-01

### Added
- Basic shape system (Ball, Rectangle, Triangle)
- Simple audio synthesis with Tone.js
- Mouse interaction for shape manipulation
- Basic collision detection
- Background rectangle generation
- Shape size and color controls
- Reset and update functionality

### Features
- p5.js canvas rendering
- Tone.js audio synthesis
- Mouse/touch interaction
- Dynamic background generation
- Real-time audio parameter mapping
```

## package.json

```json
{
  "name": "interactive-musical-playground",
  "version": "2.0.0",
  "description": "Interactive musical playground inspired by Earle Brown's December 1952",
  "main": "index.html",
  "scripts": {
    "start": "npx live-server",
    "dev": "python -m http.server 8000",
    "test": "echo \"Error: no test specified\" && exit 1",
    "lint": "echo \"No linting configured\"",
    "build": "echo \"No build process required for static files\""
  },
  "repository": {
    "type": "git",
    "url": "git+https://github.com/yourusername/interactive-musical-playground.git"
  },
  "keywords": [
    "music",
    "interactive",
    "p5js",
    "tonejs",
    "experimental",
    "audio",
    "visual",
    "generative",
    "art",
    "creative-coding",
    "earle-brown",
    "graphic-score",
    "indeterminate-music"
  ],
  "author": "Your Name <your.email@example.com>",
  "license": "MIT",
  "bugs": {
    "url": "https://github.com/yourusername/interactive-musical-playground/issues"
  },
  "homepage": "https://github.com/yourusername/interactive-musical-playground#readme",
  "dependencies": {},
  "devDependencies": {
    "live-server": "^1.2.1"
  },
  "engines": {
    "node": ">=14.0.0"
  },
  "browserslist": [
    "> 1%",
    "last 2 versions",
    "not dead",
    "not ie <= 11"
  ]
}
```

## .gitignore

```
# Dependencies
node_modules/
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# Runtime data
pids
*.pid
*.seed
*.pid.lock

# Coverage directory used by tools like istanbul
coverage/
*.lcov

# nyc test coverage
.nyc_output

# Grunt intermediate storage
.grunt

# Bower dependency directory
bower_components

# node-waf configuration
.lock-wscript

# Compiled binary addons
build/Release

# Dependency directories
jspm_packages/

# TypeScript v1 declaration files
typings/

# Optional npm cache directory
.npm

# Optional eslint cache
.eslintcache

# Optional REPL history
.node_repl_history

# Output of 'npm pack'
*.tgz

# Yarn Integrity file
.yarn-integrity

# dotenv environment variables file
.env
.env.test

# parcel-bundler cache
.cache
.parcel-cache

# next.js build output
.next

# nuxt.js build output
.nuxt

# vuepress build output
.vuepress/dist

# Serverless directories
.serverless

# FuseBox cache
.fusebox/

# DynamoDB Local files
.dynamodb/

# TernJS port file
.tern-port

# OS generated files
.DS_Store
.DS_Store?
._*
.Spotlight-V100
.Trashes
ehthumbs.db
Thumbs.db

# Editor directories and files
.vscode/
.idea/
*.swp
*.swo
*~

# Local recordings and logs
recordings/
logs/
*.webm
*.csv

# Temporary files
tmp/
temp/
```

## docs/EXAMPLES.md

```markdown
# Usage Examples

## Basic Interaction

### Adding Shapes
1. Select a shape type using the toggle buttons
2. Adjust size and hue with sliders
3. Click anywhere on canvas to add a shape
4. Or use "Random Shape" button for automatic placement

### Shape-Specific Sounds
- **Ball**: Produces smooth sine wave tones
- **Rectangle**: Creates sharp square wave sounds  
- **Triangle**: Generates bright triangle wave tones
- **Star**: Emits rich sawtooth wave timbres

### Recording Examples
- Start video recording to capture both visuals and audio
- Use audio recording for sound-only captures
- All recordings are automatically downloaded

## Advanced Techniques

### Creating Compositions
1. Start with "Update Sketch" to get fresh background
2. Add shapes systematically with specific sizes/colors
3. Use collision patterns to create rhythmic sequences
4. Record the resulting composition

### Educational Use
- Demonstrate different waveforms through shape selection
- Explore spatial audio through shape positioning
- Study collision physics through visual observation
- Analyze user interaction patterns via CSV logs

### Performance Tips
- Larger shapes move slower and create deeper sounds
- Background rectangle density affects reverb characteristics
- Shape hue directly maps to modulation intensity
- Collision position determines frequency and panning
```

## .github/workflows/deploy.yml

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [ main ]
  pull_request:
    branches: [ main ]

jobs:
  deploy:
    runs-on: ubuntu-latest
    
    steps:
    - uses: actions/checkout@v2
    
    - name: Setup Node.js
      uses: actions/setup-node@v2
      with:
        node-version: '16'
        
    - name: Install dependencies
      run: npm install
      
    - name: Run tests (if any)
      run: npm test || true
      
    - name: Deploy to GitHub Pages
      if: github.ref == 'refs/heads/main'
      uses: peaceiris/actions-gh-pages@v3
      with:
        github_token: ${{ secrets.GITHUB_TOKEN }}
        publish_dir: ./
        exclude_assets: '.github,node_modules,*.md'
```

## docs/INSTALLATION.md

```markdown
# Installation Guide

## Quick Start (Recommended)

1. **Clone the repository**:
   ```bash
   git clone https://github.com/yourusername/interactive-musical-playground.git
   cd interactive-musical-playground
   ```

2. **Open in browser**:
   Simply open `index.html` in a modern web browser.

## Local Development Server

### Option 1: Python (Built-in)
```bash
# Python 3
python -m http.server 8000

# Python 2 (if needed)
python -m SimpleHTTPServer 8000
```
Then visit: `http://localhost:8000`

### Option 2: Node.js
```bash
# Install live-server globally
npm install -g live-server

# Start server
live-server
```

### Option 3: PHP (if available)
```bash
php -S localhost:8000
```

## Browser Requirements

### Minimum Requirements
- **Chrome 80+** (Recommended)
- **Firefox 75+**
- **Safari 14+**
- **Edge 80+**

### Required APIs
- Web Audio API
- Canvas API
- MediaRecorder API (for recordings)
- ES6+ JavaScript support

### Audio Requirements
- Speakers or headphones recommended
- Microphone not required
- Audio context activation (user gesture)

## Troubleshooting

### Audio Not Working
1. Ensure browser supports Web Audio API
2. Check if audio is muted in browser
3. Try clicking "Activate Audio" button
4. Refresh page and try again

### Recording Issues
1. Check browser MediaRecorder support
2. Ensure adequate disk space
3. Allow downloads in browser settings
4. Try different browser if issues persist

### Performance Issues
1. Close other browser tabs
2. Reduce number of shapes on screen
3. Use latest browser version
4. Check available system memory

## Development Setup

### Prerequisites
- Git
- Modern web browser
- Text editor (VS Code recommended)
- Basic knowledge of JavaScript

### Recommended Extensions (VS Code)
- Live Server
- p5.js Snippets
- JavaScript (ES6) code snippets
- HTML CSS Support

### Project Structure
```
interactive-musical-playground/
├── index.html              # Main entry point
├── sketch.js               # Core application logic
├── instructions_en.html    # English instructions
├── instructions_pt.html    # Portuguese instructions
├── package.json           # Project configuration
├── README.md              # Project overview
├── docs/                  # Documentation
└── assets/               # Static assets
```
```
