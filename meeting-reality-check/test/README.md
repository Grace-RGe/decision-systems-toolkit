# Guard test

A meeting cost calculator is a dangerous thing to build. Built carelessly, it hands
someone a number that makes exclusion look like arithmetic — *"this meeting costs
$1,247, do we really need the three juniors in the room?"*

Meeting Reality Check is built so it can't be used that way. The cost is shown in
full and honestly; what the tool refuses to do is turn that cost into a reason to
remove people. That refusal is enforced by mechanics, not by a disclaimer:

- People marked as attending to learn are excluded from the attendance penalty.
- No saving is ever calculated from someone *not* being in the room.
- The "reduce attendance" recommendation was removed entirely — not softened.
- Any lever that touches who attends is suppressed when anyone is learning.

`guard.test.js` makes that promise checkable. It drives the real tool through the
full grid of inputs — **3,840 combinations per language** — and asserts that no
recommendation, lever, or driver it produces ever proposes removing people. It also
confirms the attendance lever stays hidden whenever someone is there to learn, and
runs a self-check so the test can never quietly pass on nothing: the exact wording
that was removed must still be caught by the banned list.

## Run

```bash
npm install
npm test
```

or without the package.json:

```bash
npm install jsdom
node guard.test.js
```

Exit code `0` means every combination is clean. A non-zero exit prints the offending
inputs and the text that tripped the check.

## Why keep it in the repo

The code being open is what makes the claim verifiable — you don't have to take the
"it won't do that" on faith, you can re-run the proof. If a future change ever
reintroduces exclusion advice in some corner of the input space, this test fails
before it ships.
