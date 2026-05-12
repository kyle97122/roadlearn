# Multi-Agent Quick Reference

## 🚀 Get Started

### Check Everything
```
/error-corrector Scan project for all issues
```

### Fix Everything
```
/error-corrector Fix all errors in the project
```

---

## 🎯 Agent Commands
### Project Guardian (Safety & Git Supervisor - NEW)
Security and stability supervisor with veto authority. Prevents regressions, validates git workflow, manages tests.

```bash
# Verify project integrity
/project-guardian Verify entire project integrity

# Before committing
/project-guardian Validate staged changes

# After making changes
/project-guardian Check for regressions

# Risk analysis
/project-guardian Analyze refactoring risk

# Dependency management
/project-guardian Scan for dependency vulnerabilities

# Rollback management
/project-guardian Create rollback checkpoint
/project-guardian Review rollback options

# Git workflow
/project-guardian Suggest optimal commit strategy
```
### Error Corrector (Main Orchestrator)
Main supervisor handling syntax, types, lint, consistency, imports.

```bash
# Scan for errors
/error-corrector Scan project for errors

# Fix specific file
/error-corrector Fix RoadLearn.jsx

# Enforce consistency
/error-corrector Enforce project consistency

# Clean imports
/error-corrector Remove unused imports

# Full audit
/error-corrector Audit entire project
```

### React Expert
Component optimization, hooks, state management, re-renders.

```bash
# Optimize component
/react-expert Optimize RoadLearn.jsx

# Check hooks
/react-expert Check useEffect dependencies in Quiz.jsx

# Review state
/react-expert Review state management in App.jsx

# Find inefficiencies
/react-expert Find unnecessary re-renders
```

### CSS Validator
Styling, responsiveness, cross-browser compatibility, layout.

```bash
# Validate styles
/css-validator Check RoadLearn.html for CSS issues

# Check responsiveness
/css-validator Verify mobile responsiveness

# Fix compatibility
/css-validator Fix vendor prefix issues

# Validate Tailwind
/css-validator Validate Tailwind usage
```

### Performance Optimizer
Speed, bundle size, memory, algorithms, efficiency.

```bash
# Analyze performance
/performance-optimizer Analyze bundle size

# Find slow renders
/performance-optimizer Detect slow React renders

# Optimize imports
/performance-optimizer Optimize import statements

# Detect memory issues
/performance-optimizer Find memory leak patterns
```

---

## ✅ What Gets Auto-Fixed

These changes are applied **automatically on save**:

- ✅ Unused imports removed
- ✅ Missing semicolons added
- ✅ Quote consistency fixed
- ✅ Brackets/braces balanced
- ✅ Indentation normalized
- ✅ Imports organized
- ✅ `var` converted to `let`/`const`
- ✅ Console.log removed (production)
- ✅ Duplicate imports consolidated

---

## ⚠️ What Requires Review

These changes need **manual approval**:

- ⚠️ Logic changes
- ⚠️ Type casting/coercion
- ⚠️ Variable renaming
- ⚠️ Removing code blocks
- ⚠️ Function signature changes
- ⚠️ Design pattern changes
- ⚠️ Complex refactorings

---

## 📊 Agent Domains

| Agent | Domain | Best For |
|-------|--------|----------|| **Project Guardian** | Safety, Testing, Git | Validation before commit, regression detection, stability || **Error Corrector** | Syntax, Types, Lint, Consistency | General code quality, project-wide rules |
| **React Expert** | Components, Hooks, State, Re-renders | React optimization, performance patterns |
| **CSS Validator** | Styling, Responsiveness, Compatibility | CSS issues, responsive design |
| **Performance Optimizer** | Speed, Bundle, Memory, Efficiency | Performance analysis, optimization |

---

## 🔄 Typical Workflow

### 1. Start Work
```
/error-corrector Scan project
```
→ Fixes all syntax/import errors automatically

### 2. Work on Component
Edit your React component, file auto-saves
→ ESLint auto-fixes on save
→ Error Corrector monitors

### 3. Optimize Component
```
/react-expert Optimize [component].jsx
```
→ Gets optimization suggestions
→ Error Corrector validates changes

### 4. Style & Responsiveness
```
/css-validator Check [file].html
```
→ Validates styles, checks responsiveness
→ Error Corrector ensures consistency

### 5. Check Performance
```
/performance-optimizer Analyze bundle
```
→ Identifies optimization opportunities
→ Error Corrector validates changes

### 6. Final Check
```
/error-corrector Verify project consistency
```
→ Ensures everything is clean and consistent

---

## 🎛️ Configuration

### Auto-Save (Active)
- Saves every 1 second
- Configured in `.vscode/settings.json`

### Auto-Fix (Active)
- ESLint fixes on save
- Configured in `.vscode/settings.json`

### Continuous Monitoring (Active)
- Error Corrector watches project
- Files auto-checked
- Issues detected immediately

---

## 📝 Example Sessions

### Session 1: Daily Integrity Check
```
User: /project-guardian Verify project integrity

Agent Output:
  ✓ Tests: 25/25 passing
  ✓ Zero console errors
  ✓ Memory stable
  ✓ No regressions detected
  ✓ Dependencies secure
  
Result: Project is stable ✅
```

### Session 2: Before Committing
```
User: /project-guardian Validate staged changes

Agent Output:
  ✓ Lint passed
  ✓ Types valid
  ✓ All tests pass
  ✓ No breaking changes detected
  ✓ Commit message is clear
  
Suggestion: "Fix useEffect infinite loop in TopicCard"

Result: Safe to commit ✅
```

### Session 3: Optimize React
```
User: /react-expert Optimize App.jsx
     /project-guardian Check for regressions

Agent Output:
  ✓ Performance: 45ms → 22ms
  ✓ No memory regression
  ✓ Tests pass
  ✓ No breaking changes
  ✓ UI behavior preserved
  
Result: Optimization verified safe ✅
```

### Session 4: Fix & Validate
```
User: /error-corrector Fix all project issues
     /project-guardian Check for regressions

Agent Output:
  ✓ Fixed 12 syntax errors
  ✓ Removed 8 unused imports
  ✓ Fixed formatting
  ✓ Tests still pass
  ✓ No regressions
  
Result: Clean and verified ✅
```

---

## 🆘 When Things Go Wrong

### Agent Not Making Changes
- Check the domain (right agent for the job?)
- Provide more specific instructions
- Ask Error Corrector to review

### Conflicting Changes
- Error Corrector detects and prevents conflicts
- Manual review may be needed
- Changes rolled back if problematic

### Performance Regression
- Error Corrector monitors and alerts
- All tests validated
- Changes can be reviewed and reverted

---

## 📚 Learn More

See detailed documentation:
- **[AGENT_COORDINATION_GUIDE.md](AGENT_COORDINATION_GUIDE.md)** - How agents work together
- **[MULTI_AGENT_SETUP_COMPLETE.md](MULTI_AGENT_SETUP_COMPLETE.md)** - Complete setup overview
- **[ERROR_DETECTION_SETUP.md](ERROR_DETECTION_SETUP.md)** - Error detection system

---

## ⚡ Pro Tips

1. **Start with Project Guardian** for stability checks
2. **Use Error Corrector** for general code quality
3. **Use specialists** for deep dives into specific domains
4. **Let auto-fixes work** - Don't fight the automation
5. **Validate before committing** - Always run Project Guardian first
6. **Trust the veto authority** - Project Guardian has final say on safety

---

**Status: All Systems Active** 🟢

Your project is under intelligent, multi-layered supervision:

- **Error Corrector** (Main Orchestrator) - Code quality & consistency
- **React Expert** (Specialist) - Component optimization
- **CSS Validator** (Specialist) - Styling & responsiveness
- **Performance Optimizer** (Specialist) - Speed & efficiency
- **Project Guardian** (Safety Supervisor) - Stability & git workflow

**Result**: Zero errors, maximum safety, continuous optimization, and verified commits.

Happy coding! 🛡️🚀
