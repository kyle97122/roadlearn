# Project Guardian - Safety & Stability Supervisor

## Overview

**Project Guardian** is your final line of defense against regressions, breaking changes, and dangerous commits. It operates as a **safety supervisor with veto authority**, ensuring that every change maintains project integrity and stability.

While other agents optimize and improve your code, Project Guardian watches over everything—running tests, detecting regressions, analyzing git diffs, and stopping unsafe changes before they reach production.

---

## Veto Authority Explained

### What is Veto Authority?

Project Guardian has the power to reject changes from **any agent** when safety is at risk. This is not a suggestion—it's a safety boundary.

```
Proposed Change
        ↓
Project Guardian Analysis
        ↓
    Safe? → YES → Accept & Apply
        ↓
        NO → VETO & Explain
```

### When Project Guardian Says NO

Project Guardian vetoes changes when:

✅ **Build-Breaking Errors**
- Syntax errors
- Type mismatches
- Broken imports
- Compilation failures

✅ **Stability Threats**
- Infinite loops or hangs
- Memory leaks
- Unhandled exceptions
- Render crashes

✅ **Test Failures**
- Regressions in existing tests
- New test failures
- Coverage reduction
- Performance degradation

✅ **Breaking Changes**
- Component API changes
- Export/import changes
- Behavior modifications
- Type signature changes

✅ **Data Integrity Risks**
- State corruption
- Data loss
- Serialization failures
- Database inconsistencies

### Veto Process

When a veto happens:

```
1. Change proposed to Project Guardian
2. Analysis runs (tests, diff check, regression detection)
3. Issues found → VETO issued
4. Reason clearly explained
5. Suggestions provided for alternative approach
6. Rollback checkpoint available
7. User can override if needed (at their risk)
```

---

## Core Capabilities

### 1. Regression Detection

**What It Does:**
- Captures component behavior before changes
- Re-tests after changes
- Compares outputs for differences
- Tracks performance metrics
- Monitors memory usage

**Real-World Example:**
```
Before: Button component renders in 2ms, handles clicks correctly
Change: Optimization applied
After: Button renders in 1.5ms ✓ 
        But click handler broken ✗ 
→ VETO: Regression detected - click handler broken
```

### 2. Breaking Change Detection

**What It Does:**
- Analyzes API changes
- Detects signature changes
- Identifies export changes
- Flags behavior modifications
- Prevents silent breaking changes

**Example:**
```
Before: function getTopic(id) → returns { id, title, content }
Change: Returns { id, name, body } instead
→ VETO: Breaking change - consumers expecting 'title' will break
```

### 3. Test-Driven Validation

**What It Does:**
- Runs full test suite after changes
- Verifies no test regressions
- Checks code coverage impact
- Validates smoke tests
- Creates test baselines

**Example:**
```
Change: Refactor event handler
Tests: 
  ✓ Unit tests pass (12/12)
  ✓ Integration tests pass (8/8)
  ✗ E2E test fails (quiz submission)
→ VETO: Test regression - E2E test broken
```

### 4. Memory & Performance Monitoring

**What It Does:**
- Tracks memory usage before/after
- Detects memory leaks
- Monitors CPU usage
- Measures render performance
- Identifies performance regressions

**Example:**
```
Before: Component uses 2MB, renders in 15ms
Change: Optimization applied
After:  Component uses 8MB ✗ (4x increase!)
        Renders in 10ms ✓
→ VETO: Memory regression - memory usage 4x higher
```

### 5. Runtime Error Monitoring

**What It Does:**
- Monitors console for errors
- Tracks uncaught exceptions
- Detects infinite loops
- Identifies browser hangs
- Aggregates warning patterns

**Example:**
```
Change: Update component state
After:  Infinite render loop detected ✗
        Component re-renders 1000+ times/sec
        Browser becoming unresponsive
→ VETO: Infinite loop detected - safety risk
```

### 6. Git Workflow Management

**What It Does:**
- Analyzes staged changes
- Verifies commit quality
- Prevents dangerous commits
- Suggests commit strategies
- Validates git history integrity

**Example:**
```
User wants to commit:
  - 500+ line rewrite
  - Multiple unrelated changes
  - Failing tests
→ VETO: Not ready to commit
Suggestions:
  1. Split into smaller commits
  2. Fix failing tests first
  3. Use separate commits for unrelated changes
```

### 7. Dependency Vulnerability Scanning

**What It Does:**
- Scans for known vulnerabilities
- Analyzes version updates
- Detects breaking dependencies
- Flags deprecated packages
- Reviews license compatibility

**Example:**
```
Dependency update: lodash 4.15.0 → 4.16.0
  ✗ Known security vulnerability in 4.16.0
  ✗ Breaking changes to map() function
→ VETO: Security vulnerability - update blocked
```

---

## How It Works with Other Agents

### Agent Coordination Flow

```
1. Error Corrector detects and fixes errors
                    ↓
2. Specialized agents (React/CSS/Performance) optimize
                    ↓
3. Error Corrector validates changes
                    ↓
4. Project Guardian runs final safety check
                    ↓
   Safe? → Accept & Apply
   Unsafe? → VETO & Explain → Suggest alternative
```

### Communication Protocol

**Project Guardian communicates with:**

- **Error Corrector**: "Is this change syntactically valid?"
- **React Expert**: "Will this break the component?"
- **CSS Validator**: "Will this break responsive design?"
- **Performance Optimizer**: "Did this actually improve performance?"

### Cooperation Without Conflicts

```
Scenario: React Expert suggests memoization

React Expert: "Wrap component in React.memo"
        ↓
Error Corrector: "Syntax valid, imports correct" ✓
        ↓
Project Guardian: "Tests..."
  ✓ Renders correctly
  ✓ No memory regression
  ✓ Performance improved (50ms → 30ms)
  ✓ All tests pass
        ↓
Accept Change ✅
```

---

## Common Use Cases

### Before Committing Code

```bash
/project-guardian Validate staged changes
```

**What happens:**
- Runs linter
- Runs type checker
- Runs test suite
- Analyzes diff quality
- Checks for unintended changes
- Suggests commit message
- Gives approval or veto

**Result:**
- ✅ Safe to commit
- ⚠️  Warnings (review before committing)
- ❌ Veto (don't commit, fix issues first)

### After Making Large Changes

```bash
/project-guardian Check for regressions
```

**What happens:**
- Compares behavior before/after
- Tests all critical paths
- Monitors performance
- Checks memory usage
- Verifies no console errors

**Result:**
- ✅ No regressions detected
- ⚠️  Minor regression (may be acceptable)
- ❌ Critical regression (must fix)

### Before Risky Refactoring

```bash
/project-guardian Analyze refactoring risk
```

**What happens:**
- Creates rollback checkpoint
- Documents baseline metrics
- Identifies risky areas
- Creates test baseline
- Provides safety recommendations

**Result:**
- ✅ Safe to proceed
- ⚠️  High risk - proceed carefully
- ❌ Too risky - not recommended

### Dependency Updates

```bash
/project-guardian Scan for dependency vulnerabilities
```

**What happens:**
- Scans for known vulnerabilities
- Checks breaking changes
- Verifies compatibility
- Tests with new versions
- Reviews security impact

**Result:**
- ✅ Safe to update
- ⚠️  Update available but verify first
- ❌ Do not update - breaking changes

---

## Checkpoint & Rollback System

### Creating Checkpoints

Project Guardian automatically creates checkpoints before risky operations:

```bash
/project-guardian Create rollback checkpoint
```

**What's saved:**
- Current git state
- Component behavior baseline
- Performance metrics
- Memory usage
- Test results
- Console state

### Rolling Back

If something goes wrong:

```bash
/project-guardian Execute rollback to stable state
```

**What happens:**
- Reverts to last checkpoint
- Restores all metrics
- Verifies rollback completed
- Documents reason
- Suggests next steps

**Example:**
```
User: "Undo that optimization, it broke things"

Project Guardian:
  ✓ Identified last checkpoint
  ✓ Reverted to previous state
  ✓ Verified rollback successful
  ✓ All tests passing again
  ✓ Performance restored
  ✓ No side effects
  
Result: Successfully rolled back ✅
```

---

## Git Integration

### Pre-Commit Verification

```bash
/project-guardian Validate staged changes
```

Checks before allowing commit:
- ✓ Linting passes
- ✓ Types valid
- ✓ Tests pass
- ✓ No console errors
- ✓ Changes are atomic
- ✓ Commit message is clear
- ✓ No unintended files included

### Commit Recommendations

Project Guardian suggests optimal commit structure:

```
Your staged changes:
  ✗ Button component refactor
  ✗ New feature: Quiz timer
  ✗ Performance optimization in store
  ✗ CSS responsive design fix

Project Guardian Recommendation:
  Split into 4 commits:
    1. "Refactor: Clean up Button component"
    2. "Feat: Add quiz timer feature"
    3. "Perf: Optimize store rendering"
    4. "Style: Improve mobile responsiveness"
    
Result: Better git history, easier reviews, cleaner commits
```

### Preventing Dangerous Commits

```
User wants to commit:
  - 1000+ lines changed
  - Multiple unrelated features
  - Failing tests
  - Console errors present

Project Guardian: ❌ VETO

Reason: Not ready for commit
Issues:
  1. Too large - split into smaller commits
  2. Failing tests - fix before committing
  3. Console errors - investigate and fix
  4. Multiple concerns - use separate commits

Next steps:
  1. Run `/error-corrector Scan project`
  2. Fix any reported issues
  3. Split changes logically
  4. Try again with smaller, focused commits
```

---

## Real-World Scenarios

### Scenario 1: Safety Veto

```
Developer: Refactors event handler for performance
Project Guardian runs tests:
  ❌ Click handler broken
  ❌ Form submission not working
  ❌ 3 E2E tests failing

Project Guardian: ❌ VETO
Reason: Critical regression - event handlers broken

Solution:
  1. Restore previous version
  2. Verify event handlers work
  3. Try different optimization approach
  4. Re-test before committing
```

### Scenario 2: Performance Regression Alert

```
Developer: Optimizes component rendering
Project Guardian measures:
  ✓ Render time: 20ms → 15ms (improved!)
  ❌ Memory usage: 2MB → 8MB (4x worse!)
  
Project Guardian: ⚠️ WARNING
Reason: Performance improved but memory usage 4x higher

Decision: VETO optimization - unacceptable trade-off

Suggestion:
  1. Revert to original approach
  2. Profile memory usage
  3. Find optimization that reduces both time AND memory
  4. Re-test and verify
```

### Scenario 3: Breaking Change Detection

```
Developer: Changes component props API
Before: <Quiz topicId={1} />
After:  <Quiz id={1} />

Project Guardian detects: Breaking change
Reason: 47 components using topicId prop will break

Result: ❌ VETO
Solution:
  1. Deprecate old prop gradually
  2. Support both for backwards compatibility
  3. Add migration guide
  4. Release in major version only
```

### Scenario 4: Safe Optimization Accepted

```
Developer: Adds React.memo to component
Project Guardian checks:
  ✓ Syntax valid
  ✓ All tests pass
  ✓ No memory regression
  ✓ Performance improved 45ms → 22ms
  ✓ No breaking changes
  ✓ Component behavior preserved
  
Project Guardian: ✅ APPROVE
Reason: Safe optimization with measurable improvement
  
Result: Change accepted and applied
```

---

## Safety Checklist

Before making changes, Project Guardian verifies:

### Pre-Change
- [ ] Current tests passing
- [ ] Code compiles
- [ ] No console errors
- [ ] Performance baseline established
- [ ] Memory baseline established

### During Change
- [ ] Linting passes
- [ ] Types valid
- [ ] Syntax correct
- [ ] Build succeeds
- [ ] No new console errors

### Post-Change
- [ ] All tests still pass
- [ ] No test regressions
- [ ] No memory regression
- [ ] No performance regression
- [ ] No breaking changes
- [ ] Behavior unchanged (if intended)
- [ ] Git diff is clean
- [ ] Commit message is clear

### Final Approval
- [ ] All items above verified
- [ ] Changes are atomic
- [ ] Intent is clear
- [ ] Ready to commit
- [ ] No safety concerns

---

## Commands

### Core Commands

```bash
# Verify overall project health
/project-guardian Verify entire project integrity

# Before committing
/project-guardian Validate staged changes

# After changes
/project-guardian Check for regressions

# Risk analysis
/project-guardian Analyze refactoring risk

# Dependency management
/project-guardian Scan for dependency vulnerabilities

# Checkpoint management
/project-guardian Create rollback checkpoint
/project-guardian Execute rollback to stable state

# Investigation
/project-guardian Investigate test failures
/project-guardian Analyze performance regression
/project-guardian Review console errors

# Git workflow
/project-guardian Suggest optimal commit strategy
/project-guardian Review git history quality
```

---

## Key Principles

✅ **Safety First**
- Better to veto a risky change than allow a regression
- When in doubt, err on the side of caution
- User can always override, but safety is the default

✅ **Transparency**
- Every veto is explained clearly
- Reason for rejection is documented
- Alternative approaches are suggested
- User always understands the "why"

✅ **Cooperation**
- Works with other agents
- But has final authority on safety
- Coordinates to prevent conflicts
- Escalates difficult decisions to user

✅ **Verifiable Integrity**
- All decisions backed by tests
- Metrics prove safety
- Before/after comparisons provided
- Rollback always possible

✅ **Zero Surprises**
- No silent breaking changes
- No undetected regressions
- No unexpected commits
- User always in control

---

## Status

🟢 **Project Guardian Active**

- ✅ Veto authority established
- ✅ Regression detection active
- ✅ Test verification running
- ✅ Git workflow monitoring
- ✅ Rollback system ready
- ✅ Dependency scanning enabled
- ✅ Safety protocols active

**Your project is protected. Stability is guaranteed.** 🛡️

---

For integration with other agents, see [AGENT_COORDINATION_GUIDE.md](AGENT_COORDINATION_GUIDE.md)
