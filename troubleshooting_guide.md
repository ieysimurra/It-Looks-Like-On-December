# Troubleshooting Guide | Guia de Solução de Problemas

**English** | [Português](#português)

---

## English

### 🔧 Common Issues and Solutions

#### Audio Problems

**🔇 No Sound / Audio Not Working**

*Symptoms*: Shapes move but no audio is heard when collisions occur.

*Solutions*:
1. **Check Browser Audio**:
   - Ensure browser audio is not muted
   - Check system volume levels
   - Test with other audio websites

2. **Audio Context Activation**:
   - Click the "🔊 Activate Audio" button if visible
   - Interact with the canvas (mouse click or touch)
   - Refresh page and try again

3. **Browser Compatibility**:
   ```javascript
   // Check if Web Audio API is supported
   if (typeof AudioContext !== 'undefined' || typeof webkitAudioContext !== 'undefined') {
     console.log('Web Audio API supported');
   } else {
     console.log('Web Audio API not supported');
   }
   ```

4. **Clear Browser Cache**:
   - Hard refresh: `Ctrl+Shift+R` (Windows/Linux) or `Cmd+Shift+R` (Mac)
   - Clear browser cache and cookies
   - Try incognito/private browsing mode

**🔊 Audio Cutting Out / Distorted**

*Symptoms*: Audio plays but sounds choppy, distorted, or cuts out frequently.

*Solutions*:
1. **Reduce Shape Count**:
   - Use "Reset" button to clear all shapes
   - Add shapes gradually to test limits
   - Limit simultaneous shapes to 10-15

2. **Browser Performance**:
   - Close other browser tabs
   - Close unnecessary applications
   - Use latest browser version

3. **Audio Settings**:
   ```javascript
   // Reduce audio complexity
   Tone.context.latencyHint = "balanced"; // or "playback"
   Tone.context.lookAhead = 0.1; // Reduce from default
   ```

**🎵 Wrong Waveforms / Sounds**

*Symptoms*: Shapes produce unexpected sounds or all shapes sound the same.

*Solutions*:
1. **Shape Selection**:
   - Ensure correct shape is highlighted (green background)
   - Try clicking shape buttons again
   - Check shape type in interaction log

2. **Audio Initialization**:
   - Refresh page completely
   - Wait for full page load before interacting
   - Check browser console for errors

---

#### Visual Problems

**🖥️ Canvas Not Displaying / Blank Screen**

*Symptoms*: Page loads but canvas area is blank or not visible.

*Solutions*:
1. **Browser Compatibility**:
   - Update to latest browser version
   - Try different browser (Chrome, Firefox, Safari, Edge)
   - Enable hardware acceleration if available

2. **JavaScript Errors**:
   - Open browser console (F12 → Console)
   - Look for red error messages
   - Report errors with browser/OS details

3. **CDN Loading Issues**:
   ```html
   <!-- Check if external libraries loaded -->
   <script>
   if (typeof p5 === 'undefined') {
     console.error('p5.js failed to load');
   }
   if (typeof Tone === 'undefined') {
     console.error('Tone.js failed to load');
   }
   </script>
   ```

**🎨 Shapes Not Appearing / Moving**

*Symptoms*: Canvas displays but shapes don't appear when clicking or using buttons.

*Solutions*:
1. **Click Area Verification**:
   - Ensure clicking within canvas boundaries
   - Try clicking "Random Shape" button
   - Check slider values aren't at minimum

2. **Performance Issues**:
   - Check browser task manager for high CPU usage
   - Reduce browser zoom level
   - Test on different device if available

**📱 Mobile Display Issues**

*Symptoms*: Interface looks wrong or controls don't work on mobile devices.

*Solutions*:
1. **Screen Rotation**:
   - Try both portrait and landscape orientations
   - Refresh page after rotating

2. **Touch Sensitivity**:
   - Use firm, single taps instead of light touches
   - Avoid rapid multiple taps
   - Try two-finger tap if single tap doesn't work

3. **Mobile Browser**:
   - Use Chrome or Safari on mobile
   - Avoid in-app browsers (Facebook, Instagram, etc.)
   - Update browser app to latest version

---

#### Recording Problems

**📹 Recording Not Starting**

*Symptoms*: Recording button doesn't respond or no download occurs.

*Solutions*:
1. **Browser Support**:
   ```javascript
   // Check MediaRecorder support
   if (typeof MediaRecorder !== 'undefined') {
     console.log('Recording supported');
   } else {
     console.log('Recording not supported');
   }
   ```

2. **Permissions**:
   - Allow downloads in browser settings
   - Check if download blocking is enabled
   - Try different download folder

3. **Storage Space**:
   - Ensure adequate disk space (>500MB recommended)
   - Clear browser downloads folder
   - Try shorter recording duration

**🎥 Poor Recording Quality**

*Symptoms*: Recordings are blurry, choppy, or missing audio.

*Solutions*:
1. **Performance Optimization**:
   - Close other applications
   - Reduce number of shapes before recording
   - Use lower resolution if available

2. **Browser Settings**:
   - Disable browser extensions temporarily
   - Try incognito/private mode
   - Check hardware acceleration settings

---

#### Interface Problems

**🌐 Language Not Switching**

*Symptoms*: Instructions button doesn't open or opens wrong language.

*Solutions*:
1. **Pop-up Blockers**:
   - Disable pop-up blocker for this site
   - Try holding Ctrl/Cmd while clicking
   - Manually navigate to instructions files

2. **File Access**:
   - Ensure all project files are in same directory
   - Check file permissions if self-hosting
   - Verify file names match exactly

**🎚️ Sliders Not Responding**

*Symptoms*: Size or hue sliders don't change values or affect shapes.

*Solutions*:
1. **Mouse/Touch Issues**:
   - Try clicking and dragging slowly
   - Use keyboard arrow keys if available
   - Test with different input device

2. **Browser Zoom**:
   - Reset browser zoom to 100%
   - Try different zoom levels
   - Use browser full-screen mode

---

### 🔍 Diagnostic Tools

#### Browser Console Commands

```javascript
// Check application state
console.log('Shapes:', shapes.length);
console.log('Audio initialized:', audioInitialized);
console.log('Current shape type:', shapeType);
console.log('Canvas size:', width, height);

// Test audio context
console.log('Audio context state:', Tone.context.state);
console.log('Audio context sample rate:', Tone.context.sampleRate);

// Performance monitoring
console.log('Frame rate:', frameRate());
console.log('Memory usage:', performance.memory ? 
  (performance.memory.usedJSHeapSize / 1048576).toFixed(2) + ' MB' : 
  'Not available');

// Force audio activation
Tone.start().then(() => console.log('Audio manually activated'));

// Reset application state
shapes = [];
console.log('Shapes cleared');
```

#### Network Debugging

```javascript
// Check if external libraries loaded correctly
fetch('https://cdnjs.cloudflare.com/ajax/libs/tone/14.7.77/Tone.js')
  .then(response => console.log('Tone.js CDN status:', response.status))
  .catch(error => console.error('Tone.js CDN error:', error));

fetch('https://cdnjs.cloudflare.com/ajax/libs/p5.js/1.7.0/p5.min.js')
  .then(response => console.log('p5.js CDN status:', response.status))
  .catch(error => console.error('p5.js CDN error:', error));
```

---

### 📊 System Requirements Verification

#### Minimum Requirements Check

```javascript
// Browser capabilities test
function checkBrowserSupport() {
  const support = {
    webAudio: !!(window.AudioContext || window.webkitAudioContext),
    canvas: !!document.createElement('canvas').getContext,
    mediaRecorder: !!window.MediaRecorder,
    es6: (() => { try { eval('const x = () => {}'); return true; } catch(e) { return false; } })(),
    localStorage: !!window.localStorage,
    getUserMedia: !!(navigator.mediaDevices && navigator.mediaDevices.getUserMedia)
  };
  
  console.table(support);
  
  const missing = Object.keys(support).filter(key => !support[key]);
  if (missing.length > 0) {
    console.warn('Missing features:', missing.join(', '));
  } else {
    console.log('✅ All required features supported');
  }
  
  return support;
}

// Run support check
checkBrowserSupport();
```

#### Performance Benchmarking

```javascript
// Simple performance test
function performanceTest() {
  const startTime = performance.now();
  const testShapes = [];
  
  // Create test shapes
  for (let i = 0; i < 50; i++) {
    testShapes.push(new Ball(
      random(50, width-50),
      random(50, height-50),
      random(5, 15),
      random(0, 360)
    ));
  }
  
  // Simulate one frame of updates
  testShapes.forEach(shape => {
    shape.update();
    shape.edges();
  });
  
  const endTime = performance.now();
  const duration = endTime - startTime;
  
  console.log(`Performance test: ${duration.toFixed(2)}ms for 50 shapes`);
  console.log(`Estimated FPS: ${(1000 / duration).toFixed(1)}`);
  
  return duration;
}

// Run performance test
performanceTest();
```

---

## Português

### 🔧 Problemas Comuns e Soluções

#### Problemas de Áudio

**🔇 Sem Som / Áudio Não Funcionando**

*Sintomas*: Formas se movem mas nenhum áudio é ouvido quando ocorrem colisões.

*Soluções*:
1. **Verificar Áudio do Navegador**:
   - Certifique-se de que o áudio do navegador não está mudo
   - Verifique níveis de volume do sistema
   - Teste com outros sites de áudio

2. **Ativação do Contexto de Áudio**:
   - Clique no botão "🔊 Ativar Áudio" se visível
   - Interaja com a tela (clique do mouse ou toque)
   - Atualize a página e tente novamente

3. **Compatibilidade do Navegador**:
   ```javascript
   // Verificar se Web Audio API é suportada
   if (typeof AudioContext !== 'undefined' || typeof webkitAudioContext !== 'undefined') {
     console.log('Web Audio API suportada');
   } else {
     console.log('Web Audio API não suportada');
   }
   ```

4. **Limpar Cache do Navegador**:
   - Atualização forçada: `Ctrl+Shift+R` (Windows/Linux) ou `Cmd+Shift+R` (Mac)
   - Limpar cache e cookies do navegador
   - Tentar modo incógnito/privado

**🔊 Áudio Cortando / Distorcido**

*Sintomas*: Áudio toca mas soa entrecortado, distorcido ou corta frequentemente.

*Soluções*:
1. **Reduzir Número de Formas**:
   - Use botão "Reset" para limpar todas as formas
   - Adicione formas gradualmente para testar limites
   - Limite formas simultâneas a 10-15

2. **Performance do Navegador**:
   - Feche outras abas do navegador
   - Feche aplicações desnecessárias
   - Use versão mais recente do navegador

**🎵 Formas de Onda / Sons Errados**

*Sintomas*: Formas produzem sons inesperados ou todas as formas soam igual.

*Soluções*:
1. **Seleção de Forma**:
   - Certifique-se de que a forma correta está destacada (fundo verde)
   - Tente clicar nos botões de forma novamente
   - Verifique tipo de forma no log de interação

2. **Inicialização de Áudio**:
   - Atualize a página completamente
   - Aguarde carregamento completo da página antes de interagir
   - Verifique console do navegador para erros

---

#### Problemas Visuais

**🖥️ Canvas Não Exibindo / Tela Branca**

*Sintomas*: Página carrega mas área do canvas está em branco ou não visível.

*Soluções*:
1. **Compatibilidade do Navegador**:
   - Atualize para versão mais recente do navegador
   - Tente navegador diferente (Chrome, Firefox, Safari, Edge)
   - Habilite aceleração de hardware se disponível

2. **Erros de JavaScript**:
   - Abra console do navegador (F12 → Console)
   - Procure por mensagens de erro em vermelho
   - Reporte erros com detalhes do navegador/SO

**🎨 Formas Não Aparecendo / Movendo**

*Sintomas*: Canvas exibe mas formas não aparecem ao clicar ou usar botões.

*Soluções*:
1. **Verificação de Área de Clique**:
   - Certifique-se de clicar dentro dos limites do canvas
   - Tente clicar no botão "Forma Aleatória"
   - Verifique se valores dos sliders não estão no mínimo

2. **Problemas de Performance**:
   - Verifique gerenciador de tarefas do navegador para alto uso de CPU
   - Reduza nível de zoom do navegador
   - Teste em dispositivo diferente se disponível

---

### 🔍 Ferramentas de Diagnóstico

#### Comandos do Console do Navegador

```javascript
// Verificar estado da aplicação
console.log('Formas:', shapes.length);
console.log('Áudio inicializado:', audioInitialized);
console.log('Tipo de forma atual:', shapeType);
console.log('Tamanho do canvas:', width, height);

// Testar contexto de áudio
console.log('Estado do contexto de áudio:', Tone.context.state);
console.log('Taxa de amostragem do contexto de áudio:', Tone.context.sampleRate);

// Monitoramento de performance
console.log('Taxa de quadros:', frameRate());
console.log('Uso de memória:', performance.memory ? 
  (performance.memory.usedJSHeapSize / 1048576).toFixed(2) + ' MB' : 
  'Não disponível');

// Forçar ativação de áudio
Tone.start().then(() => console.log('Áudio ativado manualmente'));

// Resetar estado da aplicação
shapes = [];
console.log('Formas limpas');
```

### 📊 Verificação de Requisitos do Sistema

#### Verificação de Requisitos Mínimos

```javascript
// Teste de capacidades do navegador
function checkBrowserSupport() {
  const support = {
    webAudio: !!(window.AudioContext || window.webkitAudioContext),
    canvas: !!document.createElement('canvas').getContext,
    mediaRecorder: !!window.MediaRecorder,
    es6: (() => { try { eval('const x = () => {}'); return true; } catch(e) { return false; } })(),
    localStorage: !!window.localStorage,
    getUserMedia: !!(navigator.mediaDevices && navigator.mediaDevices.getUserMedia)
  };
  
  console.table(support);
  
  const missing = Object.keys(support).filter(key => !support[key]);
  if (missing.length > 0) {
    console.warn('Recursos ausentes:', missing.join(', '));
  } else {
    console.log('✅ Todos os recursos necessários suportados');
  }
  
  return support;
}

// Executar verificação de suporte
checkBrowserSupport();
```

---

### 📞 Getting Additional Help | Obtendo Ajuda Adicional

#### Community Support | Suporte da Comunidade
- **GitHub Issues**: Report bugs and request features
- **GitHub Discussions**: Ask questions and share ideas
- **Educational Forums**: Connect with other educators using the tool

#### Documentation Resources | Recursos de Documentação
- **API Documentation**: `docs/API.md`
- **Technical Details**: `docs/TECHNICAL.md`
- **Educational Guides**: `docs/EDUCATIONAL_GUIDES.md`
- **Installation Guide**: `docs/INSTALLATION.md`

#### Contact Information | Informações de Contato
- **Project Repository**: https://github.com/yourusername/interactive-musical-playground
- **Educational Inquiries**: educational@yourproject.com
- **Technical Support**: support@yourproject.com
- **General Questions**: hello@yourproject.com

*Remember to include your browser version, operating system, and specific error messages when seeking help.*

*Lembre-se de incluir sua versão do navegador, sistema operacional e mensagens de erro específicas ao buscar ajuda.*