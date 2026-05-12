---
applyTo: "**/*.jsx"
description: "Auto-trigger Error Corrector agent on .jsx files to detect and fix errors, type issues, imports, and formatting in real-time. Maintains zero-error state continuously."
---

# Error Corrector Agent Trigger for JSX Files

## When This Applies

This instruction applies to all `.jsx` files in the project.

## Automatic Error Correction Workflow

Whenever working on a JSX file, follow this workflow:

### 1. Detect Errors Immediately
- Run `get_errors` on the file to identify all issues
- Categorize by severity: syntax > types > imports > lint > formatting
- Report findings before making changes

### 2. Fix Safe Issues Automatically
Apply these fixes without asking:

**Syntax Errors:**
- Missing/misplaced semicolons → Add them
- Unclosed brackets/braces/parens → Balance them
- Malformed JSX → Fix tag closure
- Invalid operators → Correct syntax

**Import Errors:**
- Unused imports → Remove them
- Missing imports for used functions → Add imports
- Circular import patterns → Reorganize imports

**Type Issues (JSDoc/TypeScript):**
- Undefined variables → Add declarations or imports
- Property access errors → Fix property names
- Type mismatches → Add type hints or fix values

**Code Quality:**
- Unused variables → Remove if safe (check usage first)
- Missing error handling → Add try/catch or .catch()
- Inconsistent formatting → Normalize spacing/quotes

### 3. Verify Each Fix
After every correction:
```
✓ Run get_errors → Confirm error is resolved
✓ Check for regressions → Search for similar patterns
✓ Preserve functionality → Verify code intent
✓ Update related code → If references changed
```

### 4. Report Progress
For each fix, state clearly:
- **Error**: Line number and error type
- **Cause**: Why it occurred
- **Fix**: Exact change made
- **Result**: ✅ Fixed | ⏳ Partial | ⚠️ Blocked

### 5. Repeat Until Zero Errors
Continue until `get_errors` returns no results.

## Safe vs. Risky Changes

### ✅ Auto-Fix (Safe)
- Add/remove semicolons
- Balance brackets
- Remove duplicate imports
- Remove unused variables (after checking)
- Consistent formatting
- Fix obvious typos in identifiers

### ⚠️ Manual Review (Risky)
- Logic changes
- Renaming variables (may break other files)
- Type casting
- Removing code (verify not used elsewhere)
- Reordering imports (if order matters)

## Example: RoadLearn.jsx Correction

```
Detected Error:
  Line 366: '; expected' (Expression expected, Declaration expected)
  Cause: Premature object closure in MOCK_DB

Fix Applied:
  Changed: `},\n};` → `},\n  css: {`
  Reason: Removed early closing of MOCK_DB, kept object open for remaining topics

Verified:
  get_errors() → 0 errors
  File structure → Valid nested object
  Data integrity → All topics preserved

Status: ✅ Fixed
```

## Tools to Use

1. **get_errors** - Scan for all error types
2. **read_file** - Understand context around errors
3. **replace_string_in_file** - Apply minimal, surgical fixes
4. **grep_search** - Find similar patterns to prevent regressions
5. **semantic_search** - Understand code relationships

## Constraints

- **Never** delete code without confirming it's unused
- **Never** refactor unrelated code while fixing errors
- **Never** make stylistic changes beyond error fixes
- **Always** preserve existing functionality
- **Always** verify fixes don't introduce new errors

## Continuous Monitoring

When NO errors are detected:
- Report the zero-error state
- Continue monitoring for new issues
- Avoid unnecessary changes
- The workspace is healthy ✅

## Integration with Workspace

This instruction works with:
- `.github/instructions/continuous-error-detection.instructions.md` - Overall error handling strategy
- `.vscode/settings.json` - Auto-fix on save configuration
- `.vscode/tasks.json` - ESLint/TypeScript check tasks
- Error Corrector Agent - Autonomous fixing specialist

**Purpose**: Keep the workspace in a perpetual zero-error state with automatic, minimal, safe corrections.
