# Agent Coordination Guide

## Overview

Your project now has 4 specialized agents working together in a coordinated system:

1. **Error Corrector** (Main Orchestrator)
2. **React Expert** (Component Optimization)
3. **CSS Validator** (Styling & Responsiveness)
4. **Performance Optimizer** (Runtime & Bundle Efficiency)

## Agent Hierarchy

```
Error Corrector (MAIN ORCHESTRATOR)
├── React Expert (delegates React-specific issues)
├── CSS Validator (delegates CSS/styling issues)
├── Performance Optimizer (delegates performance issues)
└── Project Guardian (FINAL SAFETY VALIDATOR - Veto Authority)
    └── Runs after all other agents
    └── Can veto any change if safety at risk
    └── Prevents regressions, detects breaking changes
    └── Manages git workflow
```

## When to Use Each Agent

### Project Guardian (Safety Supervisor)
**Use when you need:**
- Pre-commit verification
- Regression detection after changes
- Dependency vulnerability scanning
- Git workflow management
- Rollback checkpoints
- Breaking change detection
- Test verification after modifications
- Memory/performance regression detection

**Examples:**
```
/project-guardian Verify project integrity
/project-guardian Check for regressions after changes
/project-guardian Validate staged changes before commit
/project-guardian Analyze refactoring risk
/project-guardian Create rollback checkpoint
/project-guardian Scan for dependency vulnerabilities
```

**Note**: Project Guardian has **veto authority** over all other agents when safety is at risk.

---

### Error Corrector (Default Choice)
**Use when you need:**
- General code quality and error fixing
- Syntax/type/import error correction
- Project-wide consistency enforcement
- Coordinated multi-agent fixes
- Import cleanup and organization

**Examples:**
```
/error-corrector Fix all syntax errors in src/
/error-corrector Enforce consistent code formatting
/error-corrector Remove unused imports from the project
/error-corrector Fix TypeScript errors
```

### React Expert
**Use when you need:**
- Component optimization advice
- Hook misuse detection
- State management review
- Re-render prevention
- React-specific performance patterns

**Examples:**
```
/react-expert Optimize RoadLearn.jsx for unnecessary re-renders
/react-expert Check useEffect dependencies in Quiz component
/react-expert Review state management in App.jsx
/react-expert Detect hook violations in custom hooks
```

### CSS Validator
**Use when you need:**
- CSS validation and fixes
- Browser compatibility checks
- Responsive design verification
- Layout issue resolution
- Tailwind usage optimization

**Examples:**
```
/css-validator Check RoadLearn.html for CSS compatibility
/css-validator Verify mobile responsiveness
/css-validator Fix vendor prefix issues
/css-validator Validate Tailwind class usage
```

### Performance Optimizer
**Use when you need:**
- Performance profiling
- Bundle size reduction
- Render speed improvements
- Memory leak detection
- Algorithmic efficiency

**Examples:**
```
/performance-optimizer Analyze bundle size opportunities
/performance-optimizer Detect slow React renders in RoadLearn.jsx
/performance-optimizer Optimize import statements
/performance-optimizer Find memory leak patterns
```

## How Agents Coordinate

### Automatic Coordination
Agents automatically coordinate to prevent conflicts:

1. **Error Corrector** runs first and handles syntax/lint/type errors
2. **Specialized agents** analyze their domains for optimization opportunities
3. **Changes are reviewed** to ensure no conflicts
4. **Error Corrector** validates all changes maintain consistency
5. **Project Guardian** performs final safety validation
   - Checks for regressions
   - Runs tests
   - Detects breaking changes
   - Can veto unsafe changes

### Manual Coordination
When invoking specialized agents, Error Corrector monitors:

```
User: /react-expert Optimize App.jsx

React Expert analysis:
  - Detects unnecessary re-renders
  - Suggests useCallback wrapping
  - Flags unused state

Error Corrector verifies:
  ✓ Changes don't introduce new lint errors
  ✓ Imports updated correctly
  ✓ No syntax errors introduced
  ✓ Tests still pass
  ✓ Type consistency maintained
```

## Communication Between Agents

### Error Corrector ↔ React Expert
- **Error Corrector**: "Fix syntax errors in component file"
- **React Expert**: "Also optimize this component for re-renders"
- **Error Corrector**: "Validates changes, ensures no lint violations"

### Error Corrector ↔ CSS Validator
- **Error Corrector**: "Found CSS syntax error"
- **CSS Validator**: "Also check for browser compatibility"
- **Error Corrector**: "Validates the complete style solution"

### Error Corrector ↔ Performance Optimizer
- **Error Corrector**: "Cleaned up unused imports"
- **Performance Optimizer**: "Analyze bundle size impact"
- **Error Corrector**: "Confirms final bundle state"

## Conflict Prevention

Agents automatically avoid conflicts through:

1. **Domain Separation**: Each agent owns specific domains
   - Error Corrector: Syntax, types, lint, consistency
   - React Expert: Component patterns, hooks, state
   - CSS Validator: Styling, responsiveness, compatibility
   - Performance Optimizer: Runtime speed, bundle size, efficiency

2. **Non-Overlapping Changes**: Agents coordinate to prevent editing the same lines

3. **Hierarchical Review**: Error Corrector validates all changes

4. **Safe Auto-Fixes**: Only trivial, safe changes applied automatically

## Example Workflows

### Workflow 1: Fix Project Errors
```
User: /error-corrector Scan entire project for errors
↓
Error Corrector:
  - Finds 15 syntax errors
  - Fixes automatically
  - Finds TypeScript errors → Fixes
  - Finds unused imports → Removes
  - Checks consistency → Fixes
  - Re-verifies (0 errors ✓)
↓
Result: Project is error-free and consistent
```

### Workflow 2: Optimize React Component
```
User: /react-expert Optimize RoadLearn.jsx
↓
React Expert:
  - Detects unnecessary re-renders
  - Finds missing dependencies
  - Flags inefficient state
  - Suggests optimizations
↓
Error Corrector (supervises):
  - Validates syntax of changes
  - Checks ESLint compliance
  - Verifies imports updated
  - Confirms tests pass
↓
Result: Optimized component, error-free
```

### Workflow 3: Fix CSS & Performance
```
User: /css-validator Check styles in RoadLearn.html
↓
CSS Validator:
  - Fixes vendor prefix issues ✓
  - Verifies responsiveness ✓
  - Finds unnecessary CSS
↓
Performance Optimizer (coordinates):
  - Analyzes CSS impact on performance
  - Suggests removal of unused styles
↓
Error Corrector (validates):
  - Checks HTML/CSS syntax
  - Validates consistency
  - Confirms no regression
↓
Result: Optimized, responsive, performant styles
```

## Best Practices

### 1. Start with Error Corrector
For general code quality:
```
/error-corrector Scan project for all issues
```

### 2. Use Specialized Agents for Deep Dives
After fixing errors, optimize specific areas:
```
/react-expert Optimize React components
/css-validator Verify responsive design
/performance-optimizer Reduce bundle size
```

### 3. Run Comprehensive Check
To ensure everything works:
```
/error-corrector Verify complete project consistency
```

### 4. Leverage Auto-Fixes
Let Error Corrector auto-fix safe issues:
- On file save: ESLint auto-fixes
- Import cleanup: Automatic on each scan
- Formatting: Applied automatically

## Configuration

### VS Code Auto-Save Settings
```json
{
  "files.autoSave": "afterDelay",
  "files.autoSaveDelay": 1000,
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": "always"
  }
}
```

This ensures:
- Files auto-save after 1 second
- ESLint fixes auto-apply on save
- Error Corrector monitors continuously

### ESLint Configuration
Error Corrector enforces strict rules via `.eslintrc`:
- No console.log in production
- Require semicolons
- No var declarations
- Strict equality (=== only)

## Troubleshooting

### Agents Making Conflicting Changes
- Error Corrector validates all changes before accepting
- If conflict detected, changes are rolled back
- Manual review required

### Agent Doesn't Fix Something
Possible reasons:
1. It's outside the agent's domain (use different agent)
2. It requires manual review (too risky to auto-fix)
3. It depends on context only you know

Solution: Ask Error Corrector with more context

### Performance Issues After Optimization
- Error Corrector maintains all tests passing
- If performance regresses, it's flagged
- Changes can be reviewed and rolled back

## Quick Reference

| Issue | Use Agent | Command |
|-------|-----------|----------|
| Safety/stability check | Project Guardian | `/project-guardian Verify integrity` |
| Before commit | Project Guardian | `/project-guardian Validate staged changes` |
| Regression detection | Project Guardian | `/project-guardian Check for regressions` |
| Dependency risks | Project Guardian | `/project-guardian Scan vulnerabilities` |
| Syntax errors | Error Corrector | `/error-corrector Scan project` |
| Unused imports | Error Corrector | `/error-corrector Clean up imports` |
| Hook problems | React Expert | `/react-expert Check hooks usage` |
| CSS issues | CSS Validator | `/css-validator Validate styles` |
| Slow rendering | Performance Optimizer | `/performance-optimizer Analyze performance` |
| Project consistency | Error Corrector | `/error-corrector Enforce consistency` |
| Everything | Error Corrector | `/error-corrector Full project audit` |

---

**Key Principle**: Error Corrector is the main supervisor. Specialized agents provide deep expertise in their domains, but all changes are validated to ensure project-wide consistency and zero errors.
