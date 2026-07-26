/**
 * guard.test.js — the "not a weapon" guarantee, made runnable.
 *
 * Meeting Reality Check reports a meeting's cost honestly, but it is built so
 * that it can never be turned into a tool for excluding people to save money.
 * That promise is enforced by mechanics, not copy:
 *
 *   1. People attending to learn are excluded from the attendance penalty.
 *   2. No saving is ever calculated from someone not being in the room.
 *   3. The "reduce attendance" recommendation was removed entirely — not softened.
 *   4. Any lever that touches who attends is suppressed when anyone is learning.
 *
 * This script sweeps the full grid of inputs (3,840 combinations per language)
 * and asserts that no recommendation, lever, or driver the tool produces ever
 * proposes removing people. If a future edit reintroduces that behaviour in any
 * corner of the input space, this test fails and the build should not ship.
 *
 * A note on how the check is written: the tool's *own* safe advice contains the
 * words "drop" and 去掉 — as in "invite them for the relevant part, rather than
 * dropping them" / "而不是把他们从会议里去掉". A naive keyword filter would flag
 * that protective sentence as exclusion. So the banned list below targets only
 * phrases that unambiguously mean "remove people," and each list item is scanned
 * on its own — never as one joined blob — so a match can't bridge two items.
 *
 * Run:  npm install  &&  npm test         (from this folder)
 *   or: npm install jsdom && node guard.test.js
 */

const fs = require("fs");
const path = require("path");
const { JSDOM } = require("jsdom");

const FILES = [
  { lang: "en", file: path.join(__dirname, "..", "meeting-reality-check-en.html") },
  { lang: "cn", file: path.join(__dirname, "..", "meeting-reality-check-cn.html") },
];

// The grid. 5 × 4 × 4 × 3 × 4 × 2 = 3,840 combinations per language.
const PEOPLE   = [2, 6, 12, 25, 60];
const LENGTH   = [15, 45, 90, 240];          // minutes
const PROD     = [0, 40, 80, 100];           // percent
const FREQ     = ["once", "weekly", "monthly"];
const PURPOSE  = ["none", "decision", "status", "learning"];
const LEARNERS = [0, 2];

// Phrases that would only ever mean "remove people from the meeting." Each is
// matched against a single list item, so these cannot collide with the tool's
// own "rather than dropping them" / "而不是把他们从会议里去掉" language.
const BANNED = [
  /cut the invite/i,
  /remove\s+(?:some\s+|a few\s+)?people/i,
  /drop\s+(?:some\s+)?people/i,
  /fewer\s+people/i,
  /fewer\s+attendees/i,
  /reduce\s+attendance/i,
  /trim the room/i,
  /uninvite/i,
  /kick\b[^]*?\bout/i,
  /减少参会人/,
  /砍掉/,
  /少请/,
  /不要请/,
  /踢出/,
  /移除/,
];

function boot(file) {
  const html = fs.readFileSync(file, "utf8");
  const dom = new JSDOM(html, { runScripts: "dangerously", pretendToBeVisual: true });
  const d = dom.window.document;
  return {
    d,
    set: (id, v) => { const e = d.getElementById(id); e.value = v; e.dispatchEvent(new dom.window.Event("input", { bubbles: true })); },
    click: (sel) => d.querySelector(sel).dispatchEvent(new dom.window.MouseEvent("click", { bubbles: true })),
    items: (sel) => [...d.querySelectorAll(sel)].map((e) => e.textContent.trim()),
  };
}

function firstBanned(text) {
  for (const rx of BANNED) if (rx.test(text)) return String(rx);
  return null;
}

let checked = 0;
const violations = [];
const invariantFails = [];

for (const { lang, file } of FILES) {
  const t = boot(file);
  for (const people of PEOPLE)
    for (const len of LENGTH)
      for (const prod of PROD)
        for (const freq of FREQ)
          for (const purpose of PURPOSE)
            for (const learners of LEARNERS) {
              t.set("people", people);
              t.set("length", len);
              t.set("prod", prod);
              t.click(`[data-f="${freq}"]`);
              t.set("purpose", purpose);
              t.set("learners", learners);
              checked++;

              // Scan every advice item on its own.
              for (const item of t.items("#recs li, #levers li, #drivers li")) {
                const hit = firstBanned(item);
                if (hit) violations.push({ lang, people, len, prod, freq, purpose, learners, rule: hit, item });
              }

              // Positive invariant: when anyone is learning, no lever may touch attendance.
              if (learners > 0) {
                const leverText = t.items("#levers li").join("  ");
                if (/half the room|一半的人/.test(leverText)) {
                  invariantFails.push({ lang, people, len, prod, freq, purpose, learners });
                }
              }
            }
}

// Non-vacuous self-check: the exact recommendation that was removed must still
// be caught by the banned list. If this ever stops matching, the guarantee is
// hollow and the test would pass on anything.
const REMOVED_RECS = [
  "Reduce attendance only if the objective stays the same.",
  "只有在目标不变的前提下才减少参会人。",
];
const selfCheckOk = REMOVED_RECS.every((s) => firstBanned(s) !== null);

console.log(`Swept ${checked} input combinations (${checked / FILES.length} per language).`);

let failed = false;

if (!selfCheckOk) {
  failed = true;
  console.error("\n✗ Self-check failed: the banned list no longer catches the removed recommendation.");
} else {
  console.log("✓ Self-check: the banned list still catches the recommendation that was removed.");
}

if (violations.length) {
  failed = true;
  console.error(`\n✗ ${violations.length} output(s) proposed removing people:`);
  violations.slice(0, 10).forEach((v) => console.error("   ", JSON.stringify(v)));
} else {
  console.log("✓ No output ever proposes removing people to save money.");
}

if (invariantFails.length) {
  failed = true;
  console.error(`\n✗ ${invariantFails.length} case(s) offered an attendance lever while someone was learning:`);
  invariantFails.slice(0, 10).forEach((v) => console.error("   ", JSON.stringify(v)));
} else {
  console.log("✓ Attendance levers stay suppressed whenever anyone is attending to learn.");
}

process.exit(failed ? 1 : 0);
