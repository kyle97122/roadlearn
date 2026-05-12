# Workspace Error Detection & Auto-Fixing Setup

## Overview

This workspace is configured for **continuous error detection and automatic fixing** to maintain a **zero-error state** throughout development. Errors are detected immediately and safe fixes are applied automatically.

## Components

### 1. **Error Corrector Agent** (`error-corrector.agent.md`)
- User profile level (`~/.config/Code/User/prompts/error-corrector.agent.md`)
- Autonomous specialist for detecting and fixing errors
- Can be invoked manually: `/error-corrector` in VS Code chat
- Handles all error categories: syntax, types, imports, lint, formatting

### 2. **Workspace Instructions** (`.github/instructions/`)

#### `continuous-error-detection.instructions.md`
- Applies to all JS/TS files (`**/*.{js,jsx,ts,tsx}`)
- Defines error priority and safe auto-fix categories
- Guides error handling philosophy and workflows
- Specifies verification requirements after each fix

#### `jsx-error-correction.instructions.md`
- Applies specifically to JSX files (`**/*.jsx`)
- Triggers error-corrector workflow on JSX-specific issues
- Provides JSX syntax error patterns and fixes
- Examples and real-world correction workflows

### 3. **VS Code Configuration** (`.vscode/`)

#### `settings.json`
- Enables auto-fix on save via ESLint and Prettier
- Turns on code action fixes (`source.fixAll`)
- Shows unused code and deprecation warnings
- Enables TypeScript inline hints

#### `tasks.json`
- `Check: ESLint` - Run ESLint on entire project
- `Check: TypeScript` - Run TypeScript type checker
- `Fix: Auto-fix all issues` - Apply ESLint fixes
- `Check: All` - Run both checks together
- `Watch: Continuous Error Detection` - Watch mode with auto-fix

## How It Works

### Automatic Flow
```
1. User edits a file
   ↓
2. VS Code runs error checks (on save)
   ↓
3. Safe issues are auto-fixed (ESLint/Prettier)
   ↓
4. Problems panel shows remaining errors
   ↓
5. Agent detects errors and fixes them
   ↓
6. Workspace returns to zero-error state
```

### Manual Flow
```
Type in chat: /error-corrector
Input: "Fix all errors in RoadLearn.jsx"
   ↓
Agent scans → Detects errors → Applies fixes → Verifies
   ↓
Result: Zero errors, fully functional code
```

## Usage

### Running Checks

**Check ESLint:**
```bash
npx eslint .
```

**Check TypeScript:**
```bash
npx tsc --noEmit
```

**Auto-fix all safe issues:**
```bash
npx eslint . --fix
```

**Watch mode (continuous checking + fixing):**
```bash
npx eslint . --watch --fix
```

### VS Code Commands

1. **Run error checks:** Press `Ctrl+Shift+B` → Select "Check: All"
2. **Auto-fix issues:** Press `Ctrl+Shift+B` → Select "Fix: Auto-fix all issues"
3. **Watch for errors:** Press `Ctrl+Shift+B` → Select "Watch: Continuous Error Detection"

### Invoke Error Corrector Agent

In VS Code chat:
```
/error-corrector Scan RoadLearn.jsx for syntax errors and fix them
/error-corrector Zero out all TypeScript errors in src/
/error-corrector Clean up unused imports across the project
```

## Error Priority

Fixes are applied in this order:

1. **Critical** (prevents code execution)
   - Syntax errors
   - Type errors
   - Import/module errors

2. **High** (affects code quality)
   - ESLint violations
   - Unused variables/imports
   - Missing error handling

3. **Medium** (improves consistency)
   - Formatting issues
   - Deprecation warnings

## Safe Auto-Fix Categories

These fixes are applied **without asking for confirmation**:

✅ Missing semicolons
✅ Unbalanced brackets/braces
✅ Duplicate imports
✅ Unused imports/variables (after verification)
✅ Consistent formatting
✅ Quote consistency
✅ Spacing/indentation

## What's NOT Auto-Fixed

These require human judgment:

⚠️ Logic changes (even if they "fix" an error)
⚠️ Type casting/coercion
⚠️ Renaming variables
⚠️ Removing code without confirming non-usage
⚠️ Changing function signatures

## Verification After Each Fix

The agent automatically verifies:

1. ✓ Error resolved (`get_errors` = 0)
2. ✓ No new errors introduced
3. ✓ Related patterns checked (no regressions)
4. ✓ Code functionality preserved
5. ✓ Tests still pass (if applicable)

## Example: RoadLearn.jsx Fix

**Before:**
- 39 syntax errors
- Object structure broken
- File unparseable

**Error Detected:**
```
Line 366: '; expected' (Expression expected)
Cause: Premature closing of MOCK_DB object with };
```

**Fix Applied:**
```javascript
// Changed from:
},
};
  css: {

// To:
},
  css: {
```

**Result:**
- ✅ All 39 errors resolved
- ✅ File structure valid
- ✅ Data integrity verified
- ✅ Zero errors state achieved
- ✅ Workspace functional

## Continuous Monitoring

The workspace is designed to stay in a **zero-error state**:

- Errors detected immediately on save
- Safe issues fixed automatically
- Complex issues flagged for review
- Development uninterrupted

## Configuration Files

Location: `.github/`
```
.github/
├── instructions/
│   ├── continuous-error-detection.instructions.md
│   └── jsx-error-correction.instructions.md
├── hooks/                    (for future automation)
└── agents/                   (for future custom agents)
```

Location: `.vscode/`
```
.vscode/
├── settings.json            (auto-fix on save)
└── tasks.json               (check & fix tasks)
```

## Troubleshooting

### No Auto-Fix Happening
1. Check `.vscode/settings.json` is properly configured
2. Verify ESLint is installed: `npm list eslint`
3. Ensure file is saved (Ctrl+S)
4. Restart VS Code

### Too Many False Positives
1. Review `.eslintrc` configuration
2. Adjust ESLint rules for your project
3. Add ignore patterns if needed

### Want More Aggressive Fixing
1. Invoke Error Corrector agent directly
2. Use `npx eslint . --fix` command
3. Or run "Fix: Auto-fix all issues" task

## Next Steps

1. **Install ESLint & Prettier** (if not already):
   ```bash
   npm install -D eslint prettier eslint-plugin-react
   ```

2. **Create `.eslintrc.json`** if missing:
   ```bash
   npx eslint --init
   ```

3. **Enable workspace checking**: Press `Ctrl+Shift+B` → "Check: All"

4. **Start using the Error Corrector agent** in VS Code chat

---

**Goal**: A workspace that automatically maintains code quality and zero-error state, allowing you to focus on features instead of debugging syntax.
