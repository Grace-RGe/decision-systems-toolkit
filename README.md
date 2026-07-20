# Decision Systems Toolkit

A growing collection of practical decision tools built with analytics, statistics, and AI.

Each tool runs entirely in your browser. No account, no installation, no data leaves your machine.

## Live Demo
https://gracege.com/tools/ab-test-calculator

## Tools

### A/B Test Calculator

Four calculators for common experimentation decisions:

- **Mean Comparison** — Welch's t-test for continuous metrics (revenue, order value, time on page)
- **Proportion Comparison** — z-test for conversion rates, with Newcombe (Wilson score) confidence intervals
- **Sample Size** — separate modes for A/B tests (baseline + MDE + power) and finite-population surveys
- **Statistical Power** — work out whether your test can actually detect the effect you care about

Each tab includes a "how to read this & common mistakes" section covering the failure modes that matter: peeking mid-test, confusing statistical significance with practical importance, post-hoc power, multiple comparisons.

**[English version](ab-test-calculator/index-en.html)** · **[中文版](ab-test-calculator/index-cn.html)**

## Notes on the statistics

- Confidence intervals for proportions use the **Newcombe method** (Wilson score hybrid) rather than the simple Wald interval. Wald breaks down with small samples or rates near 0%/100% — it can produce impossible negative bounds. Newcombe doesn't.
- The significance test uses a pooled z-test (assuming equal proportions under the null); the interval uses the unpooled Newcombe approach. These are built on different frameworks, so in extreme small-sample cases they can appear to disagree. That's a known property, not a bug.
- Welch's correction is applied by default for mean comparison — no assumption of equal variances.
- All statistical functions (erf, incomplete beta, t-distribution CDF, Wilson score) are implemented directly in plain JavaScript. No external libraries, no CDN dependencies. The files work offline.

## Why I built this

Most A/B test calculators give you a number and stop. The harder part is knowing what the number means and when not to trust it.

Built by [Grace Ge](https://gracege.com).
Building systems for better decisions.

More tools coming.

## License

MIT — see [LICENSE](LICENSE).
