# Decision Systems Toolkit

A growing collection of practical decision tools built with analytics, statistics, and AI.

Each tool runs entirely in your browser. No account, no installation, no data leaves your machine.

## Live Demo
- [English Version](ab-test-calculator/index-en.html)
- [中文版](ab-test-calculator/index-cn.html)

## Tools & Calculators

### 1. Mean Comparison (Welch's T-Test)
- Compares continuous numeric metrics (order value, spend, time on page).
- Uses **Welch's t-test** to correct for unequal group variances.

### 2. Proportion Comparison (Z-Test)
- Compares conversion rates, click-through rates, and opt-in rates.
- Uses **Newcombe (Wilson score) hybrid confidence intervals** to prevent negative bounds on small samples or extreme rates.

### 3. Bayesian A/B Test & Multi-Armed Bandit
- Evaluates $P(B > A)$ (Probability Test B beats Control A) using **Beta-Binomial Monte Carlo posterior sampling** (20,000 draws in <10ms).
- Calculates expected decision risk/loss.
- Computes **Thompson Sampling** multi-armed bandit traffic allocation recommendations.

### 4. Sample Size Calculator
- **A/B Test Mode:** Estimates sample size per group based on baseline conversion rate and Minimum Detectable Effect (MDE).
- **Population Survey Mode:** Calculates finite population sample sizes for surveys.

### 5. Statistical Power Calculator
- Determines post-hoc / pre-hoc power for a given sample size and expected conversion rates.

### 6. Cohort Retention Decay & LTV Estimator
- Fits a Power-Law retention decay curve ($R(t) = a \cdot t^{-b}$) from Day 1, 7, 14, 30 data.
- Projects long-term retention (Day 60, 90, 180, 365) and active user LTV multipliers.

## Key Features

- **Theme Toggle:** Dark mode support (`prefers-color-scheme`) with custom toggle (`☀️ / 🌙`).
- **URL State Auto-Sync:** Share direct links with team members via URL parameters.
- **Copy Executive Summary:** One-click button to copy formatted decision summaries to clipboard.
- **Zero External Dependencies:** Built with pure HTML/CSS/JS. Works offline.

## License

MIT — see [LICENSE](LICENSE).
