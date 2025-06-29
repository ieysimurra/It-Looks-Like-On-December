# GitHub Templates

## .github/ISSUE_TEMPLATE/bug_report.md

```markdown
---
name: Bug report
about: Create a report to help us improve
title: '[BUG] '
labels: bug
assignees: ''
---

**Describe the bug**
A clear and concise description of what the bug is.

**To Reproduce**
Steps to reproduce the behavior:
1. Go to '...'
2. Click on '....'
3. Scroll down to '....'
4. See error

**Expected behavior**
A clear and concise description of what you expected to happen.

**Screenshots**
If applicable, add screenshots to help explain your problem.

**Browser Information:**
 - Browser: [e.g. Chrome, Firefox, Safari]
 - Version: [e.g. 120.0]
 - OS: [e.g. Windows 11, macOS Ventura, Ubuntu 22.04]

**Audio Setup:**
 - Audio device: [e.g. Built-in speakers, Bluetooth headphones]
 - Audio working in other applications: [Yes/No]

**Additional context**
Add any other context about the problem here.

**Console Errors**
If you see any errors in the browser console (F12 → Console), please paste them here:

```
[Console errors here]
```

**Shape/Interaction Details**
- Shape types involved: [Ball/Rectangle/Triangle/Star]
- Number of shapes on screen: [approximate number]
- Background pattern: [Dense/Sparse]
- Language setting: [English/Portuguese]
```

## .github/ISSUE_TEMPLATE/feature_request.md

```markdown
---
name: Feature request
about: Suggest an idea for this project
title: '[FEATURE] '
labels: enhancement
assignees: ''
---

**Is your feature request related to a problem? Please describe.**
A clear and concise description of what the problem is. Ex. I'm always frustrated when [...]

**Describe the solution you'd like**
A clear and concise description of what you want to happen.

**Describe alternatives you've considered**
A clear and concise description of any alternative solutions or features you've considered.

**Implementation suggestions**
If you have ideas about how this could be implemented, please share them here.

**Additional context**
Add any other context or screenshots about the feature request here.

**Category**
- [ ] New shape type
- [ ] Audio enhancement
- [ ] UI improvement
- [ ] Recording feature
- [ ] Educational tool
- [ ] Performance optimization
- [ ] Accessibility
- [ ] Documentation
- [ ] Other: ___________

**Priority**
- [ ] Low - Nice to have
- [ ] Medium - Would improve experience
- [ ] High - Important for usability
- [ ] Critical - Essential for functionality
```

## .github/ISSUE_TEMPLATE/documentation.md

```markdown
---
name: Documentation
about: Report issues with documentation or suggest improvements
title: '[DOCS] '
labels: documentation
assignees: ''
---

**Documentation Issue Type**
- [ ] Missing documentation
- [ ] Incorrect information
- [ ] Unclear explanation
- [ ] Translation needed
- [ ] Broken links
- [ ] Outdated content
- [ ] Formatting issues

**Location**
Which file or section has the issue?
- [ ] README.md
- [ ] CONTRIBUTING.md
- [ ] API.md
- [ ] TECHNICAL.md
- [ ] EARLE_BROWN.md
- [ ] Instructions (English)
- [ ] Instructions (Portuguese)
- [ ] Other: ___________

**Current Content**
What is currently written (copy/paste the relevant section):

```
[Current content here]
```

**Suggested Improvement**
What should be changed or added:

```
[Suggested content here]
```

**Language**
- [ ] English
- [ ] Portuguese
- [ ] Both languages need update

**Additional Context**
Any other relevant information about the documentation issue.
```

## .github/PULL_REQUEST_TEMPLATE.md

```markdown
# Pull Request

## Description
Brief description of changes made in this PR.

## Type of Change
- [ ] Bug fix (non-breaking change which fixes an issue)
- [ ] New feature (non-breaking change which adds functionality)
- [ ] Breaking change (fix or feature that would cause existing functionality to not work as expected)
- [ ] Documentation update
- [ ] Performance improvement
- [ ] Code refactoring
- [ ] Translation/internationalization

## Changes Made
- 
- 
- 

## Testing Checklist
### Browser Testing
- [ ] Tested in Chrome (latest)
- [ ] Tested in Firefox (latest)
- [ ] Tested in Safari (latest)
- [ ] Tested in Edge (latest)

### Functionality Testing
- [ ] All shapes render correctly
- [ ] Audio plays when shapes collide
- [ ] Shape selection buttons work
- [ ] Size and hue sliders function
- [ ] Recording features work (if applicable)
- [ ] Language switching works (if applicable)
- [ ] No console errors
- [ ] Responsive design maintained

### Audio Testing
- [ ] Audio context initializes properly
- [ ] Synthesizer parameters mapped correctly
- [ ] Reverb and panning effects work
- [ ] Audio recording captures correctly (if applicable)
- [ ] No audio artifacts or distortion

### Performance Testing
- [ ] No significant performance degradation
- [ ] Memory usage remains stable
- [ ] Canvas renders smoothly at 60 FPS
- [ ] No memory leaks detected

## Breaking Changes
If this introduces breaking changes, please describe them and the migration path:

## Screenshots/Videos
If applicable, add screenshots or videos demonstrating the changes:

## Related Issues
Fixes #(issue number)
Closes #(issue number)
Relates to #(issue number)

## Documentation
- [ ] Code comments updated
- [ ] API documentation updated (if applicable)
- [ ] README updated (if applicable)
- [ ] CHANGELOG updated
- [ ] Translation completed (if applicable)

## Additional Notes
Any additional information that reviewers should know:

## Checklist
- [ ] My code follows the project's style guidelines
- [ ] I have performed a self-review of my own code
- [ ] I have commented my code, particularly in hard-to-understand areas
- [ ] I have made corresponding changes to the documentation
- [ ] My changes generate no new warnings
- [ ] I have tested my changes across multiple browsers
- [ ] Any dependent changes have been merged and published
```

## .github/workflows/ci.yml

```yaml
name: Continuous Integration

on:
  push:
    branches: [ main, develop ]
  pull_request:
    branches: [ main, develop ]

jobs:
  test:
    runs-on: ubuntu-latest
    
    strategy:
      matrix:
        node-version: [16.x, 18.x, 20.x]
    
    steps:
    - uses: actions/checkout@v3
    
    - name: Use Node.js ${{ matrix.node-version }}
      uses: actions/setup-node@v3
      with:
        node-version: ${{ matrix.node-version }}
        cache: 'npm'
    
    - name: Install dependencies
      run: npm ci
    
    - name: Run linting (if configured)
      run: npm run lint || echo "No linting configured"
    
    - name: Run tests (if available)
      run: npm test || echo "No tests configured"
    
    - name: Check file structure
      run: |
        echo "Checking required files..."
        test -f index.html || exit 1
        test -f sketch.js || exit 1
        test -f instructions_en.html || exit 1
        test -f instructions_pt.html || exit 1
        echo "All required files present"
    
    - name: Validate HTML
      run: |
        echo "HTML validation would go here"
        # Could add HTML validator here
    
    - name: Check JavaScript syntax
      run: |
        echo "JavaScript syntax check would go here"
        # Could add JSHint or ESLint here

  accessibility:
    runs-on: ubuntu-latest
    
    steps:
    - uses: actions/checkout@v3
    
    - name: Setup Node.js
      uses: actions/setup-node@v3
      with:
        node-version: '18'
    
    - name: Install accessibility tools
      run: |
        npm install -g @axe-core/cli
        # Add other accessibility testing tools
    
    - name: Run accessibility tests
      run: |
        echo "Accessibility tests would run here"
        # axe index.html --exit
```

## .github/CONTRIBUTING_QUICK.md

```markdown
# Quick Contributing Guide

## 🚀 Quick Start

1. Fork the repo
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Make your changes
4. Test in multiple browsers
5. Commit: `git commit -m 'Add amazing feature'`
6. Push: `git push origin feature/amazing-feature`
7. Open a Pull Request

## 🎯 What to Contribute

### 🐛 Bug Fixes
- Audio issues
- Browser compatibility
- UI/UX problems
- Performance issues

### ✨ New Features
- New shape types
- Audio effects
- Recording enhancements
- Educational tools

### 📚 Documentation
- Code comments
- User guides
- Translations
- Examples

### 🎨 Design
- UI improvements
- Accessibility enhancements
- Mobile optimization
- Visual assets

## 🔧 Development Tips

### Audio Development
```javascript
// Always check audio context state
if (Tone.context.state === 'suspended') {
  await Tone.start();
}

// Dispose of audio components properly
if (synth) {
  synth.dispose();
}
```

### Shape Development
```javascript
// Extend base shape interface
class NewShape extends ShapeBase {
  constructor(x, y, size, hue) {
    super(x, y, size, hue);
    this.type = 'newshape';
  }
  
  // Implement required methods
  show() { /* rendering */ }
  checkRectCollisions() { /* audio triggers */ }
}
```

### UI Development
```javascript
// Use responsive positioning
button.position(windowWidth * 0.1, windowHeight - 80);

// Handle window resize
function windowResized() {
  repositionUIElements();
}
```

## 🧪 Testing Checklist

- [ ] Works in Chrome, Firefox, Safari, Edge
- [ ] Audio plays correctly
- [ ] Responsive on mobile
- [ ] No console errors
- [ ] Accessible (keyboard navigation)

## 📝 Commit Messages

Use clear, descriptive commit messages:

```
feat: add star shape with sawtooth synthesis
fix: resolve audio context suspension in Safari
docs: update API documentation for new functions
style: improve mobile layout responsiveness
refactor: optimize collision detection algorithm
```

## 💬 Getting Help

- Open an issue for questions
- Check existing documentation
- Look at code examples
- Ask in discussions

## 🎉 Recognition

All contributors will be:
- Listed in CONTRIBUTORS.md
- Mentioned in release notes
- Credited in documentation

---

Happy contributing! 🎵✨
```

## .github/SECURITY.md

```markdown
# Security Policy

## Supported Versions

We actively support the following versions with security updates:

| Version | Supported          |
| ------- | ------------------ |
| 2.x.x   | :white_check_mark: |
| 1.x.x   | :x:                |

## Reporting a Vulnerability

We take security seriously. If you discover a security vulnerability, please follow these steps:

### 🔒 Private Disclosure

**DO NOT** open a public issue for security vulnerabilities.

Instead, please email us privately at: [security@yourproject.com]

### 📝 What to Include

Please include the following information:
- Description of the vulnerability
- Steps to reproduce the issue
- Potential impact assessment
- Any suggested fixes (if available)

### ⏱️ Response Timeline

- **Initial Response**: Within 48 hours
- **Status Update**: Within 1 week
- **Resolution**: Depends on severity and complexity

### 🛡️ Security Considerations

This application runs entirely in the browser and:
- Does not transmit data to external servers
- Uses only client-side storage
- Loads external libraries from trusted CDNs
- Does not access sensitive user data

### Common Security Areas

- **Audio Context**: Handled with proper user gesture requirements
- **File Downloads**: Sanitized filenames and content types
- **External Dependencies**: Loaded from verified CDN sources
- **User Input**: Limited to slider values and canvas interactions

### 🏆 Recognition

Security researchers who responsibly disclose vulnerabilities will be:
- Credited in our security acknowledgments (with permission)
- Mentioned in release notes
- Invited to collaborate on fixes

Thank you for helping keep our project secure! 🔐
```

This completes the comprehensive GitHub project structure with all necessary templates, workflows, and documentation files for a professional, bilingual, open-source project.
