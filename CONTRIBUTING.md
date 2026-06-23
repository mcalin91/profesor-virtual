# Contributing to ProfesorApp

Mulțumim că doriți să contribuiți la ProfesorApp! 🎓

## Code of Conduct

- Be respectful to all contributors
- Focus on what is best for the community
- Show empathy towards other community members

## Getting Started

### 1. Fork & Clone

```bash
# Fork the repository on GitHub
# Then clone your fork
git clone https://github.com/YOUR_USERNAME/profesor-app.git
cd profesor-app

# Add upstream remote
git remote add upstream https://github.com/ORIGINAL_AUTHOR/profesor-app.git
```

### 2. Create Feature Branch

```bash
git checkout -b feature/your-feature-name

# Branch naming conventions:
# feature/    → new feature
# fix/        → bug fix
# docs/       → documentation
# refactor/   → code refactoring
# test/       → adding tests
```

### 3. Make Changes

- Write clean, readable code
- Follow existing code style
- Add comments for complex logic
- Test your changes locally

### 4. Commit & Push

```bash
git add .
git commit -m "Add: Brief description of changes"
# Good commit messages:
# - Add: new feature
# - Fix: bug fix
# - Update: code improvement
# - Docs: documentation change
# - Refactor: code refactoring

git push origin feature/your-feature-name
```

### 5. Open Pull Request

1. Go to GitHub
2. Click "New Pull Request"
3. Select your branch
4. Fill in description:
   - What does this do?
   - Why is it needed?
   - How to test?
5. Click "Create Pull Request"

## Pull Request Guidelines

### PR Title Format
```
[Type] Brief description

Types:
- Feature: New functionality
- Fix: Bug fix
- Docs: Documentation
- Refactor: Code improvements
- Test: New tests
```

### PR Description

```markdown
## Description
Brief explanation of the changes

## Problem
What problem does this solve?

## Solution
How does your change solve it?

## Testing
How can this be tested?

## Checklist
- [ ] Code follows project style
- [ ] Self-review completed
- [ ] Tested locally
- [ ] No console errors
- [ ] Comments added for complex logic
```

## Code Style Guide

### Naming Conventions

```javascript
// Components: PascalCase
const StudentDashboard = () => { }
const AITutor = () => { }

// Functions: camelCase
const fetchStudentData = () => { }
const calculateScore = () => { }

// Constants: UPPER_SNAKE_CASE
const API_BASE_URL = "https://api.example.com"
const MAX_LESSONS_PER_DAY = 5

// Variables: camelCase
const studentName = "Ion Popescu"
const isAuthenticated = true
```

### Component Structure

```javascript
import React, { useState, useEffect } from 'react'

export default function MyComponent({ prop1, prop2 }) {
  // State
  const [state, setState] = useState(null)

  // Effects
  useEffect(() => {
    // Setup
    return () => {
      // Cleanup
    }
  }, [])

  // Handlers
  const handleClick = () => { }

  // Render
  return (
    <div>
      {/* JSX here */}
    </div>
  )
}
```

### Tailwind CSS Classes

```jsx
// Use Tailwind for styling
<div className="p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition">
  <h2 className="text-2xl font-bold text-gray-800 mb-4">Title</h2>
  <p className="text-gray-600">Description</p>
</div>
```

### Comments

```javascript
// Good comments explain WHY, not WHAT
// ✅ Good
// Using 'let' instead of 'const' because we need to reassign for pagination
let currentPage = 1

// ❌ Bad
// Set currentPage to 1
let currentPage = 1

// Avoid obvious comments
// ❌ Bad
// Increment counter
counter++

// ✅ Good - for complex logic
// Reset counter to 1 because API expects 1-based indexing, not 0-based
counter = 1
```

## Types of Contributions

### 1. New Features
- ✅ Add new lessons/exercises
- ✅ Add new gamification element
- ✅ Improve UI/UX
- ✅ Add new subjects/grades

### 2. Bug Fixes
- ✅ Fix broken links
- ✅ Fix incorrect curriculum content
- ✅ Fix performance issues
- ✅ Fix mobile responsiveness

### 3. Documentation
- ✅ Improve README
- ✅ Add code comments
- ✅ Create tutorials
- ✅ Fix typos

### 4. Curriculum Content
- ✅ Add lessons
- ✅ Add exercises
- ✅ Improve explanations
- ✅ Add examples

### 5. Translations
- ✅ Translate to other languages
- ✅ Improve Romanian translations
- ✅ Add regional variants

## Testing

### Local Testing

```bash
# Run app
npm start

# Run tests
npm test

# Build for production
npm run build
```

### What to Test
- Feature works as expected
- No console errors
- Responsive on mobile
- Works on different browsers (Chrome, Firefox, Safari)
- Firebase operations work
- Claude API integration works

## Before Submitting

- [ ] Code follows style guide
- [ ] Self-review completed
- [ ] Tested locally (npm start)
- [ ] No console errors or warnings
- [ ] Comments added for complex logic
- [ ] README updated (if needed)
- [ ] PR description is clear

## Curriculum Content Guidelines

When adding new lessons/exercises:

1. **Official Source**
   - Use MineEdu curriculum
   - Reference official textbooks
   - Follow Ministry guidelines

2. **Content Quality**
   - Clear explanations
   - Real-world examples
   - Age-appropriate
   - Well-structured

3. **Accuracy**
   - Fact-check all content
   - Correct grammar/spelling
   - Proper punctuation
   - Links are valid

4. **Adaptation**
   - Different explanations for different grades
   - Visual aids where helpful
   - Interactive examples

## Common Issues & Solutions

### Q: My changes don't appear after push
**A:** You might have missed `.env.local`. Check that it's in `.gitignore`

### Q: Tests are failing
**A:** Run `npm test` locally first to catch issues before pushing

### Q: PR is taking too long to review
**A:** 
- Add helpful description
- Make smaller PRs (easier to review)
- Comment on stalled PRs
- Be patient (maintainers are volunteers)

### Q: What if my PR is rejected?
**A:**
- Don't take it personally
- Ask for specific feedback
- Make requested changes
- Resubmit when ready

## Getting Help

- **GitHub Issues:** Report bugs or request features
- **Discussions:** Ask questions about development
- **Email:** contributor@example.com

## Recognition

Contributors are recognized in:
- README.md (Contributors section)
- GitHub contributors page
- Release notes

Thank you for contributing! 🙏
