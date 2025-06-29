# Additional Resources & PWA Configuration

**English** | [Português](#português)

---

## English

### 📱 Progressive Web App (PWA) Setup

#### manifest.json
```json
{
  "name": "Interactive Musical Playground",
  "short_name": "Musical Playground",
  "description": "Create visual art and music through collision-based interactions inspired by Earle Brown's experimental compositions",
  "start_url": "/",
  "display": "standalone",
  "background_color": "#667eea",
  "theme_color": "#764ba2",
  "orientation": "any",
  "categories": ["education", "music", "art", "creativity"],
  "lang": "en",
  "icons": [
    {
      "src": "assets/icons/icon-72x72.png",
      "sizes": "72x72",
      "type": "image/png",
      "purpose": "maskable any"
    },
    {
      "src": "assets/icons/icon-96x96.png",
      "sizes": "96x96",
      "type": "image/png",
      "purpose": "maskable any"
    },
    {
      "src": "assets/icons/icon-128x128.png",
      "sizes": "128x128",
      "type": "image/png",
      "purpose": "maskable any"
    },
    {
      "src": "assets/icons/icon-144x144.png",
      "sizes": "144x144",
      "type": "image/png",
      "purpose": "maskable any"
    },
    {
      "src": "assets/icons/icon-152x152.png",
      "sizes": "152x152",
      "type": "image/png",
      "purpose": "maskable any"
    },
    {
      "src": "assets/icons/icon-192x192.png",
      "sizes": "192x192",
      "type": "image/png",
      "purpose": "maskable any"
    },
    {
      "src": "assets/icons/icon-384x384.png",
      "sizes": "384x384",
      "type": "image/png",
      "purpose": "maskable any"
    },
    {
      "src": "assets/icons/icon-512x512.png",
      "sizes": "512x512",
      "type": "image/png",
      "purpose": "maskable any"
    }
  ],
  "screenshots": [
    {
      "src": "assets/screenshots/desktop-main.png",
      "sizes": "1280x720",
      "type": "image/png",
      "form_factor": "wide",
      "label": "Main interface with shapes and controls"
    },
    {
      "src": "assets/screenshots/mobile-main.png",
      "sizes": "390x844",
      "type": "image/png",
      "form_factor": "narrow",
      "label": "Mobile interface optimized for touch"
    }
  ],
  "shortcuts": [
    {
      "name": "Instructions",
      "short_name": "Help",
      "description": "View application instructions",
      "url": "/instructions_en.html",
      "icons": [
        {
          "src": "assets/icons/help-icon.png",
          "sizes": "96x96"
        }
      ]
    },
    {
      "name": "Educational Guide",
      "short_name": "Lessons",
      "description": "Access educational materials",
      "url": "/docs/EDUCATIONAL_GUIDES.md",
      "icons": [
        {
          "src": "assets/icons/education-icon.png",
          "sizes": "96x96"
        }
      ]
    }
  ],
  "related_applications": [],
  "prefer_related_applications": false
}
```

#### sw.js (Service Worker)
```javascript
// Service Worker for Progressive Web App functionality
const CACHE_NAME = 'musical-playground-v2.0.0';
const OFFLINE_URL = '/offline.html';

// Files to cache for offline functionality
const STATIC_CACHE_URLS = [
  '/',
  '/index.html',
  '/sketch.js',
  '/config.js',
  '/features.js',
  '/instructions_en.html',
  '/instructions_pt.html',
  '/offline.html',
  '/manifest.json',
  // External CDN resources (cached with different strategy)
  'https://cdnjs.cloudflare.com/ajax/libs/tone/14.7.77/Tone.js',
  'https://cdnjs.cloudflare.com/ajax/libs/p5.js/1.7.0/p5.min.js'
];

// Install event - cache static resources
self.addEventListener('install', (event) => {
  console.log('Service Worker installing...');
  
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Caching static resources...');
        return cache.addAll(STATIC_CACHE_URLS);
      })
      .then(() => {
        return self.skipWaiting();
      })
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  console.log('Service Worker activating...');
  
  event.waitUntil(
    caches.keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => {
            if (cacheName !== CACHE_NAME) {
              console.log('Deleting old cache:', cacheName);
              return caches.delete(cacheName);
            }
          })
        );
      })
      .then(() => {
        return self.clients.claim();
      })
  );
});

// Fetch event - serve cached content when offline
self.addEventListener('fetch', (event) => {
  // Skip non-GET requests
  if (event.request.method !== 'GET') {
    return;
  }
  
  // Skip chrome-extension requests
  if (event.request.url.startsWith('chrome-extension://')) {
    return;
  }
  
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        // Return cached version if available
        if (response) {
          return response;
        }
        
        // Try to fetch from network
        return fetch(event.request)
          .then((response) => {
            // Don't cache non-successful responses
            if (!response || response.status !== 200 || response.type !== 'basic') {
              return response;
            }
            
            // Clone response for caching
            const responseToCache = response.clone();
            
            caches.open(CACHE_NAME)
              .then((cache) => {
                cache.put(event.request, responseToCache);
              });
            
            return response;
          })
          .catch(() => {
            // Return offline page for navigation requests
            if (event.request.mode === 'navigate') {
              return caches.match(OFFLINE_URL);
            }
            
            // Return cached response or empty response
            return caches.match(event.request) || new Response('', {
              status: 404,
              statusText: 'Not Found'
            });
          });
      })
  );
});

// Background sync for saving user data when back online
self.addEventListener('sync', (event) => {
  if (event.tag === 'background-sync-recordings') {
    event.waitUntil(syncRecordings());
  }
  
  if (event.tag === 'background-sync-logs') {
    event.waitUntil(syncInteractionLogs());
  }
});

// Sync recordings when connection restored
function syncRecordings() {
  return new Promise((resolve) => {
    console.log('Syncing recordings...');
    // Implementation would sync saved recordings to cloud storage
    resolve();
  });
}

// Sync interaction logs for analytics
function syncInteractionLogs() {
  return new Promise((resolve) => {
    console.log('Syncing interaction logs...');
    // Implementation would sync interaction data
    resolve();
  });
}

// Push notification handling (for future features)
self.addEventListener('push', (event) => {
  const options = {
    body: event.data ? event.data.text() : 'New content available!',
    icon: '/assets/icons/icon-192x192.png',
    badge: '/assets/icons/badge-72x72.png',
    tag: 'musical-playground-notification',
    renotify: true,
    actions: [
      {
        action: 'open',
        title: 'Open App',
        icon: '/assets/icons/open-icon.png'
      },
      {
        action: 'dismiss',
        title: 'Dismiss',
        icon: '/assets/icons/dismiss-icon.png'
      }
    ]
  };
  
  event.waitUntil(
    self.registration.showNotification('Musical Playground', options)
  );
});

// Handle notification clicks
self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  
  if (event.action === 'open' || !event.action) {
    event.waitUntil(
      clients.openWindow('/')
    );
  }
});
```

#### offline.html
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Offline - Musical Playground</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            height: 100vh;
            margin: 0;
            text-align: center;
            padding: 20px;
        }
        
        .offline-icon {
            font-size: 4rem;
            margin-bottom: 2rem;
        }
        
        h1 {
            font-size: 2rem;
            margin-bottom: 1rem;
        }
        
        p {
            font-size: 1.2rem;
            margin-bottom: 2rem;
            max-width: 600px;
            line-height: 1.6;
        }
        
        .retry-button {
            background: rgba(255, 255, 255, 0.2);
            border: 2px solid white;
            color: white;
            padding: 1rem 2rem;
            font-size: 1.1rem;
            border-radius: 5px;
            cursor: pointer;
            transition: all 0.3s ease;
        }
        
        .retry-button:hover {
            background: rgba(255, 255, 255, 0.3);
            transform: translateY(-2px);
        }
        
        .features-list {
            background: rgba(255, 255, 255, 0.1);
            border-radius: 10px;
            padding: 2rem;
            margin-top: 2rem;
            max-width: 500px;
        }
        
        .features-list h3 {
            margin-bottom: 1rem;
        }
        
        .features-list ul {
            list-style: none;
            padding: 0;
        }
        
        .features-list li {
            margin: 0.5rem 0;
            padding-left: 1.5rem;
            position: relative;
        }
        
        .features-list li::before {
            content: "🎵";
            position: absolute;
            left: 0;
        }
    </style>
</head>
<body>
    <div class="offline-icon">🎵</div>
    
    <h1>You're Offline</h1>
    <h2>Você está Offline</h2>
    
    <p>
        The Interactive Musical Playground needs an internet connection to load external audio libraries. 
        Some features may be limited while offline.
        <br><br>
        O Playground Musical Interativo precisa de conexão com a internet para carregar bibliotecas de áudio externas. 
        Algumas funcionalidades podem estar limitadas enquanto offline.
    </p>
    
    <button class="retry-button" onclick="window.location.reload()">
        Try Again | Tentar Novamente
    </button>
    
    <div class="features-list">
        <h3>What works offline | O que funciona offline:</h3>
        <ul>
            <li>View instructions | Ver instruções</li>
            <li>Read documentation | Ler documentação</li>
            <li>Educational materials | Materiais educacionais</li>
            <li>Cached interface | Interface em cache</li>
        </ul>
    </div>
    
    <script>
        // Check for connection restoration
        window.addEventListener('online', function() {
            document.querySelector('.retry-button').textContent = 'Connection Restored! Click to Continue | Conexão Restaurada! Clique para Continuar';
            document.querySelector('.retry-button').style.background = 'rgba(0, 255, 0, 0.3)';
        });
        
        // Monitor connection status
        if (navigator.onLine) {
            window.location.reload();
        }
    </script>
</body>
</html>
```

### 🔧 Utility Scripts

#### analytics.js
```javascript
// Privacy-focused analytics without external tracking
class PrivacyAnalytics {
  constructor() {
    this.sessionId = this.generateSessionId();
    this.startTime = Date.now();
    this.events = [];
    this.maxEvents = 1000; // Limit memory usage
  }
  
  generateSessionId() {
    return 'session_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
  }
  
  track(eventName, properties = {}) {
    const event = {
      timestamp: new Date().toISOString(),
      sessionId: this.sessionId,
      event: eventName,
      properties: {
        ...properties,
        userAgent: navigator.userAgent,
        screenSize: `${screen.width}x${screen.height}`,
        language: navigator.language
      }
    };
    
    this.events.push(event);
    
    // Prevent memory overflow
    if (this.events.length > this.maxEvents) {
      this.events.shift();
    }
    
    // Log for debugging (remove in production)
    console.log('Analytics Event:', event);
  }
  
  trackShapeCreation(shapeType, position, size, hue) {
    this.track('shape_created', {
      shapeType,
      x: Math.round(position.x),
      y: Math.round(position.y),
      size: Math.round(size),
      hue: Math.round(hue)
    });
  }
  
  trackAudioEvent(eventType, frequency, amplitude) {
    this.track('audio_event', {
      eventType,
      frequency: Math.round(frequency),
      amplitude: amplitude.toFixed(3)
    });
  }
  
  trackUserAction(action, details = {}) {
    this.track('user_action', {
      action,
      ...details
    });
  }
  
  getSessionSummary() {
    const duration = Date.now() - this.startTime;
    const eventCounts = {};
    
    this.events.forEach(event => {
      eventCounts[event.event] = (eventCounts[event.event] || 0) + 1;
    });
    
    return {
      sessionId: this.sessionId,
      duration: Math.round(duration / 1000), // seconds
      totalEvents: this.events.length,
      eventCounts,
      startTime: new Date(this.startTime).toISOString()
    };
  }
  
  exportData() {
    return {
      summary: this.getSessionSummary(),
      events: this.events
    };
  }
  
  downloadData() {
    const data = this.exportData();
    const blob = new Blob([JSON.stringify(data, null, 2)], {
      type: 'application/json'
    });
    
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `musical_playground_analytics_${this.sessionId}.json`;
    a.click();
    window.URL.revokeObjectURL(url);
  }
}

// Initialize analytics
const analytics = new PrivacyAnalytics();

// Track page load
analytics.track('page_loaded', {
  url: window.location.href,
  referrer: document.referrer
});

// Track when user leaves
window.addEventListener('beforeunload', () => {
  analytics.track('session_ended');
});
```

#### accessibility.js
```javascript
// Accessibility enhancements
class AccessibilityManager {
  constructor() {
    this.announcements = [];
    this.setupKeyboardNavigation();
    this.setupScreenReaderSupport();
    this.setupHighContrastMode();
    this.setupReducedMotion();
  }
  
  setupKeyboardNavigation() {
    // Enable keyboard navigation for canvas interaction
    document.addEventListener('keydown', (event) => {
      if (event.target.tagName.toLowerCase() === 'body') {
        this.handleCanvasKeyboard(event);
      }
    });
    
    // Add focus indicators to interactive elements
    const style = document.createElement('style');
    style.textContent = `
      button:focus, input:focus {
        outline: 3px solid #4A90E2;
        outline-offset: 2px;
      }
      
      .canvas-focused {
        box-shadow: 0 0 0 3px #4A90E2;
      }
    `;
    document.head.appendChild(style);
  }
  
  handleCanvasKeyboard(event) {
    switch (event.key) {
      case ' ':
      case 'Enter':
        // Spacebar or Enter to add shape at center
        if (typeof addShapeAt === 'function') {
          addShapeAt(width / 2, height / 2);
          this.announce('Shape added at center');
        }
        event.preventDefault();
        break;
        
      case 'r':
      case 'R':
        // R to reset
        if (typeof resetSketch === 'function') {
          resetSketch();
          this.announce('Canvas reset');
        }
        break;
        
      case '1':
        selectShape('ball');
        this.announce('Ball shape selected');
        break;
      case '2':
        selectShape('rect');
        this.announce('Rectangle shape selected');
        break;
      case '3':
        selectShape('triangle');
        this.announce('Triangle shape selected');
        break;
      case '4':
        selectShape('star');
        this.announce('Star shape selected');
        break;
    }
  }
  
  setupScreenReaderSupport() {
    // Create live region for announcements
    this.liveRegion = document.createElement('div');
    this.liveRegion.setAttribute('aria-live', 'polite');
    this.liveRegion.setAttribute('aria-atomic', 'true');
    this.liveRegion.className = 'sr-only';
    this.liveRegion.style.cssText = `
      position: absolute;
      width: 1px;
      height: 1px;
      padding: 0;
      margin: -1px;
      overflow: hidden;
      clip: rect(0, 0, 0, 0);
      white-space: nowrap;
      border: 0;
    `;
    document.body.appendChild(this.liveRegion);
    
    // Add canvas description
    const canvas = document.querySelector('main');
    if (canvas) {
      canvas.setAttribute('role', 'application');
      canvas.setAttribute('aria-label', 'Interactive musical canvas. Use keyboard shortcuts to create shapes and sounds.');
    }
  }
  
  announce(message) {
    this.liveRegion.textContent = message;
    
    // Clear after a delay to allow for new announcements
    setTimeout(() => {
      if (this.liveRegion.textContent === message) {
        this.liveRegion.textContent = '';
      }
    }, 1000);
  }
  
  setupHighContrastMode() {
    // Detect high contrast preference
    const highContrastQuery = window.matchMedia('(prefers-contrast: high)');
    
    const updateContrastMode = (e) => {
      if (e.matches) {
        document.body.classList.add('high-contrast');
        this.announce('High contrast mode enabled');
      } else {
        document.body.classList.remove('high-contrast');
      }
    };
    
    highContrastQuery.addListener(updateContrastMode);
    updateContrastMode(highContrastQuery);
  }
  
  setupReducedMotion() {
    // Respect reduced motion preference
    const reducedMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    
    const updateMotionPreference = (e) => {
      if (e.matches) {
        document.body.classList.add('reduced-motion');
        // Reduce or disable animations in sketch
        if (typeof window.setReducedMotion === 'function') {
          window.setReducedMotion(true);
        }
      } else {
        document.body.classList.remove('reduced-motion');
        if (typeof window.setReducedMotion === 'function') {
          window.setReducedMotion(false);
        }
      }
    };
    
    reducedMotionQuery.addListener(updateMotionPreference);
    updateMotionPreference(reducedMotionQuery);
  }
  
  describeCurrentState() {
    const shapeCount = typeof shapes !== 'undefined' ? shapes.length : 0;
    const currentShape = typeof shapeType !== 'undefined' ? shapeType : 'unknown';
    
    this.announce(`Canvas has ${shapeCount} shapes. Current shape type: ${currentShape}.`);
  }
}

// Initialize accessibility features
const accessibilityManager = new AccessibilityManager();

// Add keyboard instructions
document.addEventListener('DOMContentLoaded', () => {
  const instructionsDiv = document.createElement('div');
  instructionsDiv.className = 'keyboard-instructions';
  instructionsDiv.innerHTML = `
    <h3>Keyboard Controls:</h3>
    <ul>
      <li><kbd>Space</kbd> or <kbd>Enter</kbd>: Add shape at center</li>
      <li><kbd>R</kbd>: Reset canvas</li>
      <li><kbd>1-4</kbd>: Select shape type (Ball, Rectangle, Triangle, Star)</li>
    </ul>
  `;
  
  // Add to page (could be in a collapsible section)
  const header = document.querySelector('.header');
  if (header) {
    header.appendChild(instructionsDiv);
  }
});
```

### 🎓 Educator Configuration

#### educator-config.js
```javascript
// Configuration options for educational environments
class EducatorConfig {
  constructor() {
    this.config = {
      // Interface simplification
      simplifiedUI: false,
      hideAdvancedControls: false,
      
      // Content restrictions
      maxShapes: null, // null = unlimited
      maxRecordingTime: null, // seconds, null = unlimited
      allowRecording: true,
      allowDataExport: true,
      
      // Learning support
      showTutorial: true,
      enableHints: true,
      showKeyboardShortcuts: true,
      
      // Assessment features
      trackProgress: true,
      requireCompletion: false,
      enableCollaboration: false,
      
      // Technical settings
      autoSave: true,
      offlineMode: false,
      reducedComplexity: false
    };
    
    this.loadConfiguration();
  }
  
  loadConfiguration() {
    // Load from URL parameters
    const urlParams = new URLSearchParams(window.location.search);
    
    // Educational mode presets
    const mode = urlParams.get('mode');
    if (mode) {
      this.applyPreset(mode);
    }
    
    // Individual parameter overrides
    Object.keys(this.config).forEach(key => {
      const value = urlParams.get(key);
      if (value !== null) {
        this.config[key] = this.parseValue(value);
      }
    });
    
    // Load from localStorage
    const saved = localStorage.getItem('educatorConfig');
    if (saved) {
      try {
        const savedConfig = JSON.parse(saved);
        this.config = { ...this.config, ...savedConfig };
      } catch (e) {
        console.warn('Failed to parse saved educator config');
      }
    }
  }
  
  applyPreset(mode) {
    const presets = {
      elementary: {
        simplifiedUI: true,
        maxShapes: 8,
        maxRecordingTime: 60,
        showTutorial: true,
        enableHints: true,
        reducedComplexity: true
      },
      
      middle_school: {
        maxShapes: 15,
        maxRecordingTime: 120,
        trackProgress: true,
        enableCollaboration: false
      },
      
      high_school: {
        maxShapes: 25,
        allowDataExport: true,
        trackProgress: true,
        enableCollaboration: true
      },
      
      assessment: {
        hideAdvancedControls: true,
        maxRecordingTime: 180,
        requireCompletion: true,
        trackProgress: true,
        autoSave: true
      },
      
      research: {
        trackProgress: true,
        allowDataExport: true,
        maxRecordingTime: null,
        autoSave: true
      }
    };
    
    if (presets[mode]) {
      this.config = { ...this.config, ...presets[mode] };
    }
  }
  
  parseValue(value) {
    // Convert string values to appropriate types
    if (value === 'true') return true;
    if (value === 'false') return false;
    if (value === 'null') return null;
    if (!isNaN(value)) return Number(value);
    return value;
  }
  
  get(key) {
    return this.config[key];
  }
  
  set(key, value) {
    this.config[key] = value;
    this.saveConfiguration();
  }
  
  saveConfiguration() {
    localStorage.setItem('educatorConfig', JSON.stringify(this.config));
  }
  
  applyToInterface() {
    // Apply configuration to UI elements
    if (this.config.simplifiedUI) {
      document.body.classList.add('simplified-ui');
    }
    
    if (this.config.hideAdvancedControls) {
      document.body.classList.add('hide-advanced');
    }
    
    // Override global settings
    if (this.config.maxShapes) {
      window.MAX_SHAPES = this.config.maxShapes;
    }
    
    if (this.config.maxRecordingTime) {
      window.MAX_RECORDING_TIME = this.config.maxRecordingTime;
    }
    
    // Apply visual modifications
    this.addCustomStyles();
  }
  
  addCustomStyles() {
    const style = document.createElement('style');
    style.id = 'educator-config-styles';
    
    let css = '';
    
    if (this.config.simplifiedUI) {
      css += `
        .simplified-ui .advanced-control {
          display: none !important;
        }
        
        .simplified-ui button {
          font-size: 16px;
          padding: 10px 15px;
          margin: 5px;
        }
        
        .simplified-ui .controls-panel {
          padding: 20px;
        }
      `;
    }
    
    if (this.config.hideAdvancedControls) {
      css += `
        .hide-advanced .recording-controls,
        .hide-advanced .advanced-sliders {
          display: none !important;
        }
      `;
    }
    
    if (this.config.reducedComplexity) {
      css += `
        .reduced-complexity .particle-effects,
        .reduced-complexity .visual-feedback {
          display: none !important;
        }
      `;
    }
    
    style.textContent = css;
    document.head.appendChild(style);
  }
  
  generateConfigURL(baseURL = window.location.origin + window.location.pathname) {
    const params = new URLSearchParams();
    
    Object.entries(this.config).forEach(([key, value]) => {
      if (value !== null) {
        params.set(key, value.toString());
      }
    });
    
    return `${baseURL}?${params.toString()}`;
  }
  
  showConfigPanel() {
    // Create configuration panel for educators
    const panel = document.createElement('div');
    panel.className = 'educator-config-panel';
    panel.innerHTML = `
      <div class="config-overlay">
        <div class="config-content">
          <h2>Educator Configuration</h2>
          <form id="config-form">
            <fieldset>
              <legend>Interface Options</legend>
              <label>
                <input type="checkbox" name="simplifiedUI" ${this.config.simplifiedUI ? 'checked' : ''}>
                Simplified UI for younger students
              </label>
              <label>
                <input type="checkbox" name="hideAdvancedControls" ${this.config.hideAdvancedControls ? 'checked' : ''}>
                Hide advanced controls
              </label>
            </fieldset>
            
            <fieldset>
              <legend>Limits</legend>
              <label>
                Max shapes: <input type="number" name="maxShapes" value="${this.config.maxShapes || ''}" min="1" max="50">
              </label>
              <label>
                Max recording time (seconds): <input type="number" name="maxRecordingTime" value="${this.config.maxRecordingTime || ''}" min="10" max="600">
              </label>
            </fieldset>
            
            <fieldset>
              <legend>Learning Support</legend>
              <label>
                <input type="checkbox" name="showTutorial" ${this.config.showTutorial ? 'checked' : ''}>
                Show tutorial on first use
              </label>
              <label>
                <input type="checkbox" name="enableHints" ${this.config.enableHints ? 'checked' : ''}>
                Enable helpful hints
              </label>
              <label>
                <input type="checkbox" name="trackProgress" ${this.config.trackProgress ? 'checked' : ''}>
                Track student progress
              </label>
            </fieldset>
            
            <div class="config-actions">
              <button type="submit">Apply Configuration</button>
              <button type="button" id="generate-url">Generate Shareable URL</button>
              <button type="button" id="close-config">Close</button>
            </div>
          </form>
        </div>
      </div>
    `;
    
    document.body.appendChild(panel);
    
    // Add event listeners
    document.getElementById('config-form').addEventListener('submit', (e) => {
      e.preventDefault();
      this.updateFromForm(e.target);
      this.applyToInterface();
      panel.remove();
    });
    
    document.getElementById('generate-url').addEventListener('click', () => {
      const url = this.generateConfigURL();
      navigator.clipboard.writeText(url).then(() => {
        alert('Configuration URL copied to clipboard!');
      });
    });
    
    document.getElementById('close-config').addEventListener('click', () => {
      panel.remove();
    });
  }
  
  updateFromForm(form) {
    const formData = new FormData(form);
    
    // Handle checkboxes
    ['simplifiedUI', 'hideAdvancedControls', 'showTutorial', 'enableHints', 'trackProgress'].forEach(key => {
      this.config[key] = formData.has(key);
    });
    
    // Handle numbers
    ['maxShapes', 'maxRecordingTime'].forEach(key => {
      const value = formData.get(key);
      this.config[key] = value ? Number(value) : null;
    });
    
    this.saveConfiguration();
  }
}

// Initialize educator configuration
const educatorConfig = new EducatorConfig();

// Apply configuration on page load
document.addEventListener('DOMContentLoaded', () => {
  educatorConfig.applyToInterface();
});

// Add educator config button (for authorized users)
if (window.location.search.includes('educator=true')) {
  document.addEventListener('DOMContentLoaded', () => {
    const configButton = document.createElement('button');
    configButton.textContent = '⚙️ Educator Settings';
    configButton.style.cssText = 'position: fixed; top: 10px; right: 10px; z-index: 1000; background: #4A90E2; color: white; border: none; padding: 10px; border-radius: 5px; cursor: pointer;';
    configButton.addEventListener('click', () => educatorConfig.showConfigPanel());
    document.body.appendChild(configButton);
  });
}
```

Este conjunto de recursos adicionais completa o projeto com funcionalidades PWA, ferramentas de análise respeitando privacidade, melhorias de acessibilidade e configurações específicas para educadores, fornecendo uma base sólida e profissional para o Playground Musical Interativo.

---

## Português

### 📱 Configuração de Progressive Web App (PWA)

Os arquivos PWA permitem que a aplicação funcione offline e seja instalada como aplicativo nativo, melhorando a experiência do usuário, especialmente em ambientes educacionais.

### 🔧 Scripts Utilitários

#### analytics.js
Sistema de análise focado na privacidade que não envia dados para serviços externos, permitindo que educadores analisem o uso sem comprometer a privacidade dos estudantes.

#### accessibility.js
Melhorias de acessibilidade que incluem navegação por teclado, suporte a leitores de tela e adaptações para usuários com necessidades especiais.

### 🎓 Configuração para Educadores

O sistema de configuração permite que educadores adaptem a interface e funcionalidades para diferentes níveis educacionais e contextos de ensino, com presets prontos para diferentes idades e objetivos pedagógicos.

**URLs de Exemplo**:
- Elementar: `?mode=elementary`
- Ensino Médio: `?mode=middle_school`
- Avaliação: `?mode=assessment`
- Pesquisa: `?mode=research`

Este conjunto completo de recursos garante que o Playground Musical Interativo seja uma ferramenta robusta, acessível e adaptável para diversos contextos educacionais e de uso.