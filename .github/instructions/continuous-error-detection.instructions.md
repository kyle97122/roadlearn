---
applyTo: "**/*.{js,jsx,ts,tsx}"
description: "Continuous error detection and auto-fixing. Scans for syntax, type, lint, import, and formatting errors. Fixes safe issues automatically. Keeps workspace in zero-error state."
---

# Continuous Error Detection & Auto-Fixing

## Scope

This instruction applies to all JavaScript/TypeScript files (`.js`, `.jsx`, `.ts`, `.tsx`) in the project.

## Automatic Triggers

When working on any JS/TS file, the agent should:

1. **After each edit**: Run error detection to catch syntax and type errors immediately
2. **Before suggesting changes**: Verify no new errors are introduced
3. **On save actions**: Perform lint checks and attempt safe auto-fixes
4. **After fixes**: Re-verify the entire file is error-free

## Error Priority & Handling

### Critical (Fix First)
- **Syntax Errors** (code won't parse)
  - Missing semicolons, brackets, braces
  - Invalid operators
  - Unclosed strings/templates
  - **Auto-fix strategy**: Add missing punctuation, balance brackets

- **Type Errors** (TypeScript/JSDoc type mismatches)
  - Undefined variables
  - Property access on wrong types
  - **Auto-fix strategy**: Add type annotations, fix property names

- **Import/Module Errors** (modules can't load)
  - Missing imports for used functions/classes
  - Circular imports
  - Wrong paths
  - **Auto-fix strategy**: Add missing imports, fix paths

### High (Fix Next)
- **ESLint Violations** (code quality)
  - Unused variables/imports
  - Missing error handling
  - Best practice violations
  - **Auto-fix strategy**: Remove unused code, add error handlers

### Medium (Fix if Time)
- **Formatting Issues** (inconsistent style)
  - Indentation
  - Line length
  - Quote consistency
  - **Auto-fix strategy**: Apply standard formatting rules

- **Warnings** (deprecations, best practices)
  - Deprecated methods
  - Non-idiomatic code
  - **Auto-fix strategy**: Replace with modern equivalents

## Safe Auto-Fix Categories

Automatically fix these without user approval:

- ✅ Add missing semicolons
- ✅ Balance brackets/braces/parentheses
- ✅ Remove duplicate imports
- ✅ Add missing imports (if clear from context)
- ✅ Remove unused variables/imports
- ✅ Fix consistent formatting (indentation, spacing)
- ✅ Add missing error handling for Promise rejections
- ✅ Sort imports alphabetically

## Risky Changes (Require Context/Confirmation)

⚠️ Do NOT auto-fix without understanding the full context:

- Logic changes (even if they "fix" an error)
- Type casting/coercion changes
- Removing code (verify it's not used elsewhere)
- Renaming variables/functions
- Changing function signatures

## Verification After Each Fix

After any correction, verify:

```
1. get_errors on the file → 0 errors/warnings
2. grep_search for related patterns → no regressions
3. Context review → functionality preserved
4. Related tests/usage → still valid
```

## No Errors State

When the file has **zero errors** reported by VS Code:

- Continue monitoring for new issues
- Do NOT introduce unnecessary changes
- Suggest only small, maintainable optimizations if appropriate
- Focus on preserving working code

## Minimal Change Philosophy

- Each fix should be the smallest possible change
- Don't refactor while fixing
- Preserve formatting/structure when possible
- Add comments if fix is non-obvious
- One problem = one fix operation

## Example Workflow

```
Scenario: User edits RoadLearn.jsx
↓
Agent detects error: "Missing closing brace at line 366"
↓
Agent reads context (lines 360-370)
↓
Agent identifies: Premature closing `};` in object
↓
Agent fixes: Change `};` to `},` to keep object open
↓
Agent verifies: get_errors confirms no errors
↓
Agent reports: "Fixed: Corrected MOCK_DB object closure structure"
↓
Workspace now: Zero errors, fully functional
```

## When to Escalate

Ask for user input if:
- Multiple solutions exist with different tradeoffs
- Fix might break related functionality
- Type error requires understanding business logic
- Ambiguous context (variable name, imports)
- Performance impact of fix is unclear

## Tools Usage

- `get_errors`: Primary scanning → run after every fix
- `read_file`: Understand context before fixing
- `replace_string_in_file`: Precise, minimal edits only
- `grep_search`: Verify no similar errors/regressions
- `semantic_search`: Find related code when needed

---

**Goal**: Maintain a **continuously clean, zero-error workspace** with automatic detection and minimal, safe corrections that preserve code intent and functionality.
