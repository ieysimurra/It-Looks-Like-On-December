# Deployment and Configuration Guide

**English** | [Português](#português)

---

## English

### 🚀 Deployment Options

#### 1. GitHub Pages (Recommended)

**Advantages**:
- Free hosting
- Automatic HTTPS
- Easy integration with repository
- Custom domain support

**Setup Steps**:

1. **Enable GitHub Pages**:
   ```bash
   # In your repository settings
   Settings → Pages → Source: Deploy from a branch
   Branch: main / (root)
   ```

2. **Access your site**:
   ```
   https://yourusername.github.io/interactive-musical-playground/
   ```

3. **Custom Domain** (Optional):
   - Add `CNAME` file to repository root
   - Configure DNS records

**Automated Deployment**:
```yaml
# .github/workflows/deploy.yml
name: Deploy to GitHub Pages

on:
  push:
    branches: [ main ]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v3
    
    - name: Setup Node.js
      uses: actions/setup-node@v3
      with:
        node-version: '18'
    
    - name: Deploy to GitHub Pages
      uses: peaceiris/actions-gh-pages@v3
      with:
        github_token: ${{ secrets.GITHUB_TOKEN }}
        publish_dir: ./
        exclude_assets: '.github,node_modules,*.md,package*.json'
```

#### 2. Netlify Deployment

**Advantages**:
- Easy drag-and-drop deployment
- Form handling (if needed)
- Branch previews
- CDN distribution

**Setup**:
1. Connect GitHub repository to Netlify
2. Build settings:
   - Build command: `npm run build` (or leave empty)
   - Publish directory: `/` (root)

**netlify.toml Configuration**:
```toml
[build]
  publish = "."
  
[[headers]]
  for = "/*"
  [headers.values]
    X-Frame-Options = "DENY"
    X-XSS-Protection = "1; mode=block"
    X-Content-Type-Options = "nosniff"
    Referrer-Policy = "strict-origin-when-cross-origin"

[[headers]]
  for = "*.js"
  [headers.values]
    Cache-Control = "public, max-age=31536000"

[[headers]]
  for = "*.css"
  [headers.values]
    Cache-Control = "public, max-age=31536000"

[[redirects]]
  from = "/api/*"
  to = "/.netlify/functions/:splat"
  status = 200
```

#### 3. Vercel Deployment

**vercel.json Configuration**:
```json
{
  "version": 2,
  "builds": [
    {
      "src": "**/*",
      "use": "@vercel/static"
    }
  ],
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "X-Content-Type-Options",
          "value": "nosniff"
        },
        {
          "key": "X-Frame-Options",
          "value": "DENY"
        },
        {
          "key": "X-XSS-Protection",
          "value": "1; mode=block"
        }
      ]
    }
  ]
}
```

#### 4. Self-Hosted Options

**Using Apache**:
```apache
# .htaccess
RewriteEngine On

# Force HTTPS
RewriteCond %{HTTPS} off
RewriteRule ^(.*)$ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]

# Enable compression
<IfModule mod_deflate.c>
    AddOutputFilterByType DEFLATE text/plain
    AddOutputFilterByType DEFLATE text/html
    AddOutputFilterByType DEFLATE text/xml
    AddOutputFilterByType DEFLATE text/css
    AddOutputFilterByType DEFLATE application/xml
    AddOutputFilterByType DEFLATE application/xhtml+xml
    AddOutputFilterByType DEFLATE application/rss+xml
    AddOutputFilterByType DEFLATE application/javascript
    AddOutputFilterByType DEFLATE application/x-javascript
</IfModule>

# Cache static assets
<IfModule mod_expires.c>
    ExpiresActive On
    ExpiresByType text/css "access plus 1 year"
    ExpiresByType application/javascript "access plus 1 year"
    ExpiresByType image/png "access plus 1 year"
    ExpiresByType image/jpg "access plus 1 year"
    ExpiresByType image/jpeg "access plus 1 year"
    ExpiresByType image/gif "access plus 1 year"
    ExpiresByType image/svg+xml "access plus 1 year"
</IfModule>
```

**Using Nginx**:
```nginx
# nginx.conf
server {
    listen 80;
    server_name your-domain.com;
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    server_name your-domain.com;
    
    ssl_certificate /path/to/certificate.crt;
    ssl_certificate_key /path/to/private.key;
    
    root /var/www/interactive-musical-playground;
    index index.html;
    
    # Gzip compression
    gzip on;
    gzip_vary on;
    gzip_types
        application/javascript
        application/json
        text/css
        text/javascript
        text/xml
        text/plain;
    
    # Cache static assets
    location ~* \.(css|js|png|jpg|jpeg|gif|svg|ico)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
    
    # Security headers
    add_header X-Frame-Options "DENY" always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header X-Content-Type-Options "nosniff" always;
    
    location / {
        try_files $uri $uri/ /index.html;
    }
}
```

### ⚙️ Environment Configuration

#### config.js
```javascript
// config.js - Environment-specific settings
const CONFIG = {
  development: {
    audio: {
      latency: "interactive", // Lower latency for development
      lookAhead: 0.1,
      updateInterval: 0.025
    },
    recording: {
      videoBitrate: 1000000, // Lower quality for faster processing
      audioBitrate: 128000
    },
    debug: {
      showPerformanceStats: true,
      logAudioEvents: true,
      showCollisionBoxes: true
    },
    features: {
      networkCollaboration: false,
      advancedAnalytics: false
    }
  },
  
  production: {
    audio: {
      latency: "balanced",
      lookAhead: 0.25,
      updateInterval: 0.05
    },
    recording: {
      videoBitrate: 3000000, // Higher quality for production
      audioBitrate: 256000
    },
    debug: {
      showPerformanceStats: false,
      logAudioEvents: false,
      showCollisionBoxes: false
    },
    features: {
      networkCollaboration: true,
      advancedAnalytics: true
    }
  },
  
  educational: {
    audio: {
      latency: "balanced",
      lookAhead: 0.2,
      updateInterval: 0.05
    },
    recording: {
      videoBitrate: 2000000,
      audioBitrate: 192000
    },
    debug: {
      showPerformanceStats: true,
      logAudioEvents: false,
      showCollisionBoxes: false
    },
    ui: {
      showInstructions: true,
      simplifiedControls: true,
      maxShapes: 10 // Limit for classroom use
    },
    features: {
      networkCollaboration: false,
      advancedAnalytics: true
    }
  }
};

// Detect environment
function getEnvironment() {
  const hostname = window.location.hostname;
  
  if (hostname === 'localhost' || hostname === '127.0.0.1') {
    return 'development';
  } else if (hostname.includes('github.io') || hostname.includes('netlify.app')) {
    return 'production';
  } else if (hostname.includes('edu') || hostname.includes('school')) {
    return 'educational';
  } else {
    return 'production';
  }
}

// Get current configuration
const currentEnv = getEnvironment();
const config = CONFIG[currentEnv];

// Export for use in main application
window.appConfig = config;
```

#### Feature Flags
```javascript
// features.js - Feature flag management
class FeatureFlags {
  constructor() {
    this.flags = {
      // Audio features
      midiSupport: true,
      audioAnalysis: true,
      spatialAudio: true,
      
      // Visual features
      particleSystem: true,
      advancedShapes: false,
      themeCustomization: false,
      
      // Recording features
      videoRecording: true,
      audioRecording: true,
      streamingSupport: false,
      
      // Collaboration features
      realTimeCollaboration: false,
      chatSupport: false,
      roomManagement: false,
      
      // Educational features
      lessonPlans: true,
      progressTracking: false,
      teacherDashboard: false,
      
      // Experimental features
      aiGeneration: false,
      vrSupport: false,
      gestureControl: false
    };
    
    this.loadFromStorage();
    this.loadFromURL();
  }
  
  isEnabled(featureName) {
    return this.flags[featureName] || false;
  }
  
  enable(featureName) {
    this.flags[featureName] = true;
    this.saveToStorage();
  }
  
  disable(featureName) {
    this.flags[featureName] = false;
    this.saveToStorage();
  }
  
  loadFromStorage() {
    const stored = localStorage.getItem('featureFlags');
    if (stored) {
      try {
        const parsedFlags = JSON.parse(stored);
        this.flags = { ...this.flags, ...parsedFlags };
      } catch (e) {
        console.warn('Failed to parse stored feature flags');
      }
    }
  }
  
  saveToStorage() {
    localStorage.setItem('featureFlags', JSON.stringify(this.flags));
  }
  
  loadFromURL() {
    const urlParams = new URLSearchParams(window.location.search);
    
    // Enable features via URL: ?features=midi,particles,ai
    const featuresParam = urlParams.get('features');
    if (featuresParam) {
      const enabledFeatures = featuresParam.split(',');
      enabledFeatures.forEach(feature => {
        if (this.flags.hasOwnProperty(feature.trim())) {
          this.flags[feature.trim()] = true;
        }
      });
    }
    
    // Disable features via URL: ?disable=recording,collaboration
    const disableParam = urlParams.get('disable');
    if (disableParam) {
      const disabledFeatures = disableParam.split(',');
      disabledFeatures.forEach(feature => {
        if (this.flags.hasOwnProperty(feature.trim())) {
          this.flags[feature.trim()] = false;
        }
      });
    }
  }
  
  getEnabledFeatures() {
    return Object.keys(this.flags).filter(key => this.flags[key]);
  }
}

// Initialize feature flags
const featureFlags = new FeatureFlags();
window.featureFlags = featureFlags;
```

### 🔧 Build Scripts

#### build.js
```javascript
// build.js - Simple build script for optimization
const fs = require('fs');
const path = require('path');

class Builder {
  constructor() {
    this.sourceDir = './';
    this.buildDir = './dist';
    this.excludeFiles = [
      'node_modules',
      '.git',
      '.github',
      'docs',
      'build.js',
      'package.json',
      'package-lock.json',
      'README.md'
    ];
  }
  
  async build() {
    console.log('🚀 Starting build process...');
    
    // Create build directory
    this.createBuildDir();
    
    // Copy files
    await this.copyFiles();
    
    // Optimize files
    await this.optimizeFiles();
    
    console.log('✅ Build completed successfully!');
  }
  
  createBuildDir() {
    if (fs.existsSync(this.buildDir)) {
      fs.rmSync(this.buildDir, { recursive: true });
    }
    fs.mkdirSync(this.buildDir);
  }
  
  async copyFiles() {
    const files = fs.readdirSync(this.sourceDir);
    
    for (const file of files) {
      if (!this.excludeFiles.includes(file)) {
        const sourcePath = path.join(this.sourceDir, file);
        const destPath = path.join(this.buildDir, file);
        
        if (fs.statSync(sourcePath).isDirectory()) {
          this.copyDirectory(sourcePath, destPath);
        } else {
          fs.copyFileSync(sourcePath, destPath);
        }
      }
    }
  }
  
  copyDirectory(src, dest) {
    fs.mkdirSync(dest, { recursive: true });
    const files = fs.readdirSync(src);
    
    for (const file of files) {
      const srcPath = path.join(src, file);
      const destPath = path.join(dest, file);
      
      if (fs.statSync(srcPath).isDirectory()) {
        this.copyDirectory(srcPath, destPath);
      } else {
        fs.copyFileSync(srcPath, destPath);
      }
    }
  }
  
  async optimizeFiles() {
    // Minify JavaScript (basic implementation)
    const jsFiles = this.findFiles(this.buildDir, '.js');
    for (const file of jsFiles) {
      this.minifyJS(file);
    }
    
    // Optimize HTML
    const htmlFiles = this.findFiles(this.buildDir, '.html');
    for (const file of htmlFiles) {
      this.optimizeHTML(file);
    }
  }
  
  findFiles(dir, extension) {
    const files = [];
    const items = fs.readdirSync(dir);
    
    for (const item of items) {
      const fullPath = path.join(dir, item);
      if (fs.statSync(fullPath).isDirectory()) {
        files.push(...this.findFiles(fullPath, extension));
      } else if (item.endsWith(extension)) {
        files.push(fullPath);
      }
    }
    
    return files;
  }
  
  minifyJS(filePath) {
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Basic minification (remove comments and extra whitespace)
    content = content
      .replace(/\/\*[\s\S]*?\*\//g, '') // Remove block comments
      .replace(/\/\/.*$/gm, '') // Remove line comments
      .replace(/\s+/g, ' ') // Replace multiple spaces with single space
      .replace(/\s*([{}();,])\s*/g, '$1') // Remove spaces around punctuation
      .trim();
    
    fs.writeFileSync(filePath, content);
  }
  
  optimizeHTML(filePath) {
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Remove HTML comments and extra whitespace
    content = content
      .replace(/<!--[\s\S]*?-->/g, '')
      .replace(/\s+/g, ' ')
      .replace(/>\s+</g, '><')
      .trim();
    
    fs.writeFileSync(filePath, content);
  }
}

// Run build
if (require.main === module) {
  const builder = new Builder();
  builder.build().catch(console.error);
}

module.exports = Builder;
```

#### package.json scripts
```json
{
  "scripts": {
    "start": "npx live-server --port=8080 --open=/",
    "dev": "python -m http.server 8000",
    "build": "node build.js",
    "deploy": "npm run build && gh-pages -d dist",
    "test": "echo \"Run manual tests in browser\"",
    "lint": "echo \"Add linting tools as needed\"",
    "clean": "rm -rf dist node_modules",
    "setup": "npm install && echo \"Setup complete\"",
    "docs": "echo \"Generate documentation\"",
    "analyze": "echo \"Analyze bundle size and performance\""
  }
}
```

---

## Português

### 🚀 Opções de Deployment

#### 1. GitHub Pages (Recomendado)

**Vantagens**:
- Hospedagem gratuita
- HTTPS automático
- Fácil integração com repositório
- Suporte a domínio personalizado

**Passos de Configuração**:

1. **Habilitar GitHub Pages**:
   ```bash
   # Nas configurações do seu repositório
   Settings → Pages → Source: Deploy from a branch
   Branch: main / (root)
   ```

2. **Acesse seu site**:
   ```
   https://seuusuario.github.io/interactive-musical-playground/
   ```

3. **Domínio Personalizado** (Opcional):
   - Adicionar arquivo `CNAME` na raiz do repositório
   - Configurar registros DNS

#### 2. Netlify Deployment

**Vantagens**:
- Deployment fácil por arrastar e soltar
- Manipulação de formulários (se necessário)
- Pré-visualizações de branch
- Distribuição CDN

**Configuração**:
1. Conectar repositório GitHub ao Netlify
2. Configurações de build:
   - Comando de build: `npm run build` (ou deixar vazio)
   - Diretório de publicação: `/` (raiz)

### ⚙️ Configuração de Ambiente

#### config.js
```javascript
// config.js - Configurações específicas do ambiente
const CONFIG = {
  development: {
    audio: {
      latency: "interactive", // Menor latência para desenvolvimento
      lookAhead: 0.1,
      updateInterval: 0.025
    },
    recording: {
      videoBitrate: 1000000, // Menor qualidade para processamento mais rápido
      audioBitrate: 128000
    },
    debug: {
      showPerformanceStats: true,
      logAudioEvents: true,
      showCollisionBoxes: true
    },
    features: {
      networkCollaboration: false,
      advancedAnalytics: false
    }
  },
  
  production: {
    audio: {
      latency: "balanced",
      lookAhead: 0.25,
      updateInterval: 0.05
    },
    recording: {
      videoBitrate: 3000000, // Maior qualidade para produção
      audioBitrate: 256000
    },
    debug: {
      showPerformanceStats: false,
      logAudioEvents: false,
      showCollisionBoxes: false
    },
    features: {
      networkCollaboration: true,
      advancedAnalytics: true
    }
  },
  
  educational: {
    audio: {
      latency: "balanced",
      lookAhead: 0.2,
      updateInterval: 0.05
    },
    recording: {
      videoBitrate: 2000000,
      audioBitrate: 192000
    },
    debug: {
      showPerformanceStats: true,
      logAudioEvents: false,
      showCollisionBoxes: false
    },
    ui: {
      showInstructions: true,
      simplifiedControls: true,
      maxShapes: 10 // Limite para uso em sala de aula
    },
    features: {
      networkCollaboration: false,
      advancedAnalytics: true
    }
  }
};

// Detectar ambiente
function getEnvironment() {
  const hostname = window.location.hostname;
  
  if (hostname === 'localhost' || hostname === '127.0.0.1') {
    return 'development';
  } else if (hostname.includes('github.io') || hostname.includes('netlify.app')) {
    return 'production';
  } else if (hostname.includes('edu') || hostname.includes('school')) {
    return 'educational';
  } else {
    return 'production';
  }
}

// Obter configuração atual
const currentEnv = getEnvironment();
const config = CONFIG[currentEnv];

// Exportar para uso na aplicação principal
window.appConfig = config;
```

Este guia fornece todas as informações necessárias para fazer deploy do projeto em diferentes plataformas e configurar o ambiente adequadamente para diferentes contextos de uso.