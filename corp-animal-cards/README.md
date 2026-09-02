# Corp Animal Cards

A workplace-archetype card tool. Pick your Chinese zodiac sign, answer eight
workplace-situation questions, and get one of four archetype cards — rendered as
original illustrated artwork, one card per zodiac × archetype combination.

**Runs at:** https://grace-rge.github.io/decision-systems-toolkit/corp-animal-cards/corp-animal-cards.html
**Listed at:** https://gracege.com/tools/tool-library

Part of the [Decision Systems Toolkit](https://github.com/Grace-RGe/decision-systems-toolkit).

---

## What it does

Four archetypes, each with a fixed diagnostic read:

| Archetype | Badge | Accent |
|---|---|---|
| Quiet Builder | Deep Worker | navy `#1E3A5F` |
| Strategic Challenger | Critical Thinker | red `#9B2C2C` |
| Reliable Anchor | Stability Keeper | green `#445A2E` |
| Opportunity Builder | Connector | plum `#5B3A78` |

The archetype text is determined entirely by the answers. The zodiac sign
determines only the visual identity of the card — 12 zodiacs × 4 archetypes = 48
cards. Two people with the same answers and different zodiac signs get the same
diagnosis on different art.

**Scoring:** Q1–Q7 each score 1 point for the archetype chosen. Q8 is weighted
×2. A tie resolves to the archetype chosen in Q8; a remaining tie resolves by a
fixed archetype order.

## What it is not

This is not a personality test, and it is not built to be one. It is not
validated for hiring, screening, or performance evaluation, and it should not be
used for any of them. That statement is in the page footer and is part of the
tool, not boilerplate.

## Technical notes

- Single HTML file. No framework, no build step, no bundler, no package manager.
- No backend, no API calls, no LLM, no analytics, no cookies, no accounts, no
  email capture. Nothing leaves the browser.
- Works offline. Open the file from disk and it runs.
- The only external assets are the 48 card images sitting next to the HTML.

### Files

```
corp-animal-cards/
├── corp-animal-cards.html      the tool
└── NN-<Role>_<Zodiac>.jpg      48 card images
```

Image naming is `NN-<Role>_<Zodiac>.jpg`, where `NN` is `01` Quiet_Builder,
`02` Strategic_Challenger, `03` Reliable_Anchor, `04` Opportunity_Builder, and
`<Zodiac>` is one of `Rat` `Ox` `Tiger` `Rabbit` `Dragon` `Snake` `Horse` `Goat`
`Monkey` `Rooster` `Dog` `Pig`.

**Filenames are case-sensitive on GitHub Pages and most web servers, even though
Windows treats them as case-insensitive.** The capitalization above is the
contract between the filenames and the `file` tokens in the HTML. Renaming an
image without updating the HTML — or vice versa — silently breaks that card.

### Configuration

Two values at the top of the `<script>` block:

```js
const LINKS = {
  tool:    "https://gracege.com/tools/corp-animal-cards/toolkit",
  library: "https://gracege.com/tools/tool-library",
  github:  "https://github.com/Grace-RGe/decision-systems-toolkit"
};
const ART_CHECK = false;   // true → the footer reports whether all 48 images loaded
```

`ART_CHECK` is the deployment self-test. Set it to `true`, load the page from its
real URL, confirm the footer reports 48 of 48, then set it back to `false`.
It exists because of the failure mode below.

### Why a missing image is dangerous here

If a card image fails to load, the tool does not error — it falls back to a
plain CSS card and keeps working. A visitor sees a functioning but visually
plain tool and has no way to know the artwork is missing. A broken deployment
therefore looks like a finished one. `ART_CHECK` is the only reliable way to
tell them apart.

For the same reason, a single downloaded `corp-animal-cards.html` with no images
beside it will render every result as a CSS card. Distribute either the whole
folder or the standalone build, never the bare HTML.

### Two builds

- **Folder build** (this directory) — HTML plus 48 images. For GitHub and
  GitHub Pages.
- **Standalone build** (`corp-animal-cards-standalone.html`) — the same tool with
  all 48 images embedded as base64 data URIs, ~10 MB, one file, double-click to
  run, fully offline. For direct download.

Both are generated from the same source; the standalone build only swaps image
file references for embedded data.

## Artwork

48 original illustrations, JPEG, longest side capped at 1040px, quality 88 with
4:4:4 chroma (no subsampling, so the card text stays sharp). The uncompressed
PNG masters are kept outside this repository.

## License

MIT. Card artwork © Grace Ge.
