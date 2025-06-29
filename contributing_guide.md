# Contributing to Interactive Musical Playground

**English** | [Português](#português)

---

## English

Thank you for your interest in contributing to the Interactive Musical Playground! This document provides guidelines for contributing to the project.

## 🚀 Getting Started

### Prerequisites
- Basic knowledge of JavaScript
- Familiarity with p5.js and/or Tone.js (helpful but not required)
- A modern web browser
- Git installed on your machine

### Development Setup

1. Fork the repository
2. Clone your fork:
```bash
git clone https://github.com/yourusername/interactive-musical-playground.git
cd interactive-musical-playground
```

3. Create a new branch for your feature:
```bash
git checkout -b feature/your-feature-name
```

4. Make your changes and test them locally
5. Commit your changes with descriptive messages
6. Push to your fork and submit a pull request

## 🎯 How to Contribute

### Types of Contributions

- **Bug Reports**: Help us identify and fix issues
- **Feature Requests**: Suggest new functionality
- **Code Contributions**: Implement new features or fix bugs
- **Documentation**: Improve or translate documentation
- **Testing**: Help test the application on different platforms
- **Design**: Improve UI/UX or create visual assets

### Bug Reports

When reporting bugs, please include:
- Browser and version
- Operating system
- Steps to reproduce the issue
- Expected vs actual behavior
- Screenshots or recordings if applicable
- Console error messages

Use the bug report template:
```markdown
**Browser**: Chrome 120.0
**OS**: Windows 11
**Description**: Brief description of the bug

**Steps to Reproduce**:
1. Step one
2. Step two
3. Step three

**Expected Behavior**: What should happen
**Actual Behavior**: What actually happens
**Additional Context**: Any other relevant information
```

### Feature Requests

For feature requests, please describe:
- The problem you're trying to solve
- Your proposed solution
- Alternative solutions considered
- Additional context or examples

### Code Style Guidelines

- Use meaningful variable and function names
- Comment complex logic
- Follow existing code structure and patterns
- Test your changes across different browsers
- Ensure audio features work properly

### Audio Development Guidelines

When working with audio features:
- Always check if audio context is initialized
- Handle audio context suspension gracefully
- Provide fallbacks for unsupported browsers
- Test with different audio hardware setups
- Consider performance implications of audio processing

### Internationalization

When adding new text content:
- Add both English and Portuguese versions
- Use consistent terminology
- Consider cultural context for translations
- Test language switching functionality

## 📝 Pull Request Process

1. Ensure your code follows the project's style guidelines
2. Update documentation if necessary
3. Add or update tests if applicable
4. Ensure your changes work in both languages (EN/PT)
5. Write a clear pull request description

### Pull Request Template

```markdown
## Description
Brief description of changes

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Documentation update
- [ ] Performance improvement
- [ ] Other (please describe)

## Testing
- [ ] Tested in Chrome
- [ ] Tested in Firefox
- [ ] Tested in Safari/Edge
- [ ] Audio functionality works
- [ ] Both languages tested
- [ ] Mobile/responsive tested

## Additional Notes
Any additional information or context
```

## 🎨 Design Contributions

### Visual Assets
- Use vector formats when possible (SVG preferred)
- Maintain consistency with existing design
- Consider accessibility (color contrast, etc.)
- Provide assets in multiple sizes if needed

### UI/UX Improvements
- Consider usability across different devices
- Maintain the experimental/artistic nature of the project
- Test with users if possible
- Document design decisions

## 🧪 Testing

### Manual Testing Checklist
- [ ] All shapes render correctly
- [ ] Audio plays when shapes collide
- [ ] Recording functions work
- [ ] Language switching works
- [ ] Responsive design on mobile
- [ ] All buttons and sliders function
- [ ] No console errors

### Browser Compatibility
Please test on:
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 📚 Documentation

### Code Documentation
- Use JSDoc comments for functions
- Explain complex algorithms
- Document API endpoints or interfaces
- Include usage examples

### User Documentation
- Keep instructions clear and concise
- Include screenshots or GIFs when helpful
- Update both language versions
- Consider different skill levels

## 🤝 Community Guidelines

- Be respectful and inclusive
- Help others learn and contribute
- Provide constructive feedback
- Celebrate creativity and experimentation
- Remember this is an artistic/educational project

## ❓ Questions?

If you have questions about contributing:
- Open an issue for discussion
- Reach out to maintainers
- Check existing documentation and issues first

---

## Português

Obrigado pelo seu interesse em contribuir para o Playground Musical Interativo! Este documento fornece diretrizes para contribuir com o projeto.

## 🚀 Começando

### Pré-requisitos
- Conhecimento básico de JavaScript
- Familiaridade com p5.js e/ou Tone.js (útil mas não obrigatório)
- Um navegador web moderno
- Git instalado na sua máquina

### Configuração de Desenvolvimento

1. Faça um fork do repositório
2. Clone seu fork:
```bash
git clone https://github.com/seuusuario/interactive-musical-playground.git
cd interactive-musical-playground
```

3. Crie uma nova branch para sua funcionalidade:
```bash
git checkout -b feature/nome-da-sua-funcionalidade
```

4. Faça suas alterações e teste-as localmente
5. Commit suas alterações com mensagens descritivas
6. Envie para seu fork e submeta um pull request

## 🎯 Como Contribuir

### Tipos de Contribuições

- **Relatórios de Bug**: Ajude-nos a identificar e corrigir problemas
- **Solicitações de Funcionalidade**: Sugira novas funcionalidades
- **Contribuições de Código**: Implemente novas funcionalidades ou corrija bugs
- **Documentação**: Melhore ou traduza documentação
- **Testes**: Ajude a testar a aplicação em diferentes plataformas
- **Design**: Melhore UI/UX ou crie assets visuais

### Relatórios de Bug

Ao reportar bugs, inclua:
- Navegador e versão
- Sistema operacional
- Passos para reproduzir o problema
- Comportamento esperado vs real
- Screenshots ou gravações se aplicável
- Mensagens de erro do console

### Diretrizes de Estilo de Código

- Use nomes significativos para variáveis e funções
- Comente lógica complexa
- Siga a estrutura e padrões de código existentes
- Teste suas alterações em diferentes navegadores
- Certifique-se de que funcionalidades de áudio funcionem adequadamente

### Diretrizes de Desenvolvimento de Áudio

Ao trabalhar com funcionalidades de áudio:
- Sempre verifique se o contexto de áudio está inicializado
- Gerencie suspensão do contexto de áudio graciosamente
- Forneça fallbacks para navegadores não suportados
- Teste com diferentes configurações de hardware de áudio
- Considere implicações de performance do processamento de áudio

### Internacionalização

Ao adicionar novo conteúdo de texto:
- Adicione versões em inglês e português
- Use terminologia consistente
- Considere contexto cultural para traduções
- Teste funcionalidade de troca de idioma

## 📝 Processo de Pull Request

1. Certifique-se de que seu código segue as diretrizes de estilo do projeto
2. Atualize documentação se necessário
3. Adicione ou atualize testes se aplicável
4. Certifique-se de que suas alterações funcionem em ambos os idiomas (EN/PT)
5. Escreva uma descrição clara do pull request

## 🎨 Contribuições de Design

### Assets Visuais
- Use formatos vetoriais quando possível (SVG preferido)
- Mantenha consistência com design existente
- Considere acessibilidade (contraste de cores, etc.)
- Forneça assets em múltiplos tamanhos se necessário

### Melhorias de UI/UX
- Considere usabilidade em diferentes dispositivos
- Mantenha a natureza experimental/artística do projeto
- Teste com usuários se possível
- documente decisões de design

## 🧪 Testes

### Lista de Verificação de Testes Manuais
- [ ] Todas as formas renderizam corretamente
- [ ] Áudio toca quando formas colidem
- [ ] Funções de gravação funcionam
- [ ] Troca de idioma funciona
- [ ] Design responsivo no mobile
- [ ] Todos os botões e sliders funcionam
- [ ] Sem erros no console

### Compatibilidade de Navegador
Por favor teste em:
- Chrome (mais recente)
- Firefox (mais recente)
- Safari (mais recente)
- Edge (mais recente)

## 📚 Documentação

### Documentação de Código
- Use comentários JSDoc para funções
- Explique algoritmos complexos
- Documente endpoints de API ou interfaces
- Inclua exemplos de uso

### Documentação do Usuário
- Mantenha instruções claras e concisas
- Inclua screenshots ou GIFs quando útil
- Atualize ambas as versões de idioma
- Considere diferentes níveis de habilidade

## 🤝 Diretrizes da Comunidade

- Seja respeitoso e inclusivo
- Ajude outros a aprender e contribuir
- Forneça feedback construtivo
- Celebre criatividade e experimentação
- Lembre-se de que este é um projeto artístico/educacional

## ❓ Dúvidas?

Se você tem dúvidas sobre contribuir:
- Abra uma issue para discussão
- Entre em contato com os mantedores
- Verifique documentação e issues existentes primeiro