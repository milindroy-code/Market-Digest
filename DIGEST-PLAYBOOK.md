# Indian Market Digest — Playbook

This file is the recipe every digest run (manual or scheduled) should follow, so
output stays consistent day to day. Read this file first, then research, then write.

## Live site
**Live URL:** https://opening-bell-sandy.vercel.app
**Repo:** https://github.com/milindroy-code/Market-Digest (branch `main`)
**Vercel project:** `opening-bell` (team `milind-roy`), Root Directory = `site`

The live site is a static site under `site/` in the repo, auto-deployed by
Vercel's native GitHub integration on every push to `main` — **there is no
separate publish step, and no Vercel CLI or token is needed**. Every
scheduled run should: clone/pull this repo, edit files under `site/`,
commit, and `git push`. That push alone updates the live site within ~30–60
seconds — Vercel's GitHub App picks it up automatically (confirmed working
16 Sep 2026; the project's Root Directory is set to `site`). Do not use the
Artifact tool for scheduled runs — it was only used for the original one-off
Claude Artifact snapshot at `digest.html` (repo root), which is not part of
the live site and does not need updating. Do NOT embed a Vercel token or run
`vercel deploy` in any automated run — it is unnecessary now and was
previously the source of a credential-leakage incident (see git history).

### Site structure
- `site/styles.css` — shared stylesheet/design tokens. Reuse as-is; don't
  fork per-page styles.
- `site/index.html` — the latest **daily** edition (home page / "Today" tab).
  Overwritten each daily run with the newest content.
- `site/daily/YYYY-MM-DD-<morning|evening>.html` — permanent dated copy of
  each daily run, created alongside the `index.html` overwrite.
- `site/weekly/index.html` — the latest **weekly** edition ("This Week" tab).
  Overwritten each weekly run.
- `site/weekly/YYYY-Www.html` (ISO week number, e.g. `2026-w38`) — permanent
  dated copy of each weekly run.
- `site/archive/index.html` — "Older Editions": a running, most-recent-first
  list of links to every dated file under `site/daily/` and `site/weekly/`,
  grouped under "Daily Editions" and "Weekly Editions" headings. Add one new
  `<li>` entry here per run — never remove old entries.

For structure/markup, copy the existing `site/index.html` (and
`site/weekly/2026-w37.html` for the weekly layout) as the template — same
nav bar, masthead, stat tiles, section eyebrows, and card/table patterns.
Only the content changes.

## Cadence & framing
- **Morning briefing** (~8:00 AM IST, Mon–Fri): lead with overnight global cues —
  US market close, Asian markets, crude oil, USD/INR, gold — then what to expect
  as Indian markets open. Nifty/Sensex/Bank Nifty levels shown are the **previous
  close**, framed as "opening watch," not a same-day result.
- **Evening wrap** (~4:30 PM IST, Mon–Fri): lead with today's actual closing
  levels and the day's biggest movers, then after-market news and a look ahead
  to tomorrow.
- **Weekend / holiday run**: when markets are closed (Sat/Sun or a trading
  holiday), produce a "Week Wrap & Week Ahead" instead — last week's close and
  weekly change, plus the coming week's key triggers (IPOs, results, policy
  meetings, data releases).

## Sections (in order)
1. **Headline snapshot** — Nifty 50, Sensex, Bank Nifty: level, point change, %
   change (day or week depending on cadence). Present as a stat-tile row up top.
2. **Global cues** — US indices close (Dow/S&P 500/Nasdaq), major Asian/European
   markets, Brent/WTI crude, USD/INR, gold. Flag anything driving Indian market
   sentiment (geopolitical events, Fed moves, big data prints).
3. **Movers** — top gainers and top losers (a handful of names each), plus which
   sectors led and lagged.
4. **Corporate news** — earnings, M&A, big management/strategic announcements.
5. **Macro & policy** — RBI, SEBI, government policy, inflation/GDP/trade data,
   upcoming policy meeting dates.
6. **FII/DII activity** — net buy/sell figures for the day or week, and the
   net trend (who is providing support, who is pulling back).
7. **IPO / corporate-action watch** — IPOs opening/closing, listings, big
   corporate actions (buybacks, bonuses, splits, demergers) in the window.
8. **What to watch** — for morning: today's key triggers; for evening: tomorrow's
   triggers; for weekend: the week ahead's triggers (data releases, results,
   policy meetings, IPO calendar, technical levels to watch).

## Sources (cross-check at least 2–3 per major number/claim)
- Moneycontrol (moneycontrol.com)
- Economic Times Markets (economictimes.indiatimes.com/markets)
- LiveMint (livemint.com/market)
- Business Standard Markets (business-standard.com/markets)
- Reuters India Markets (reuters.com/markets)
- NSE (nseindia.com) / BSE (bseindia.com) official data and circulars
- RBI (rbi.org.in) / SEBI (sebi.gov.in) press releases for policy items
- Trendlyne / 5paisa / Groww for FII-DII cash-segment figures

## Style rules
- Lead with the number, not the narrative — investors scan for figures first.
- Every figure needs a direction (up/down) and, where relevant, a comparison
  (vs. previous close, vs. last week).
- Keep language plain and neutral. No "buy/sell" recommendations — this is a
  news digest, not investment advice. A closing disclaimer line is fine.
- Keep total reading time under ~3 minutes: short paragraphs, bullet lists,
  bold the numbers that matter.

## Output checklist per run
- [ ] Clone/pull the repo (`https://github.com/milindroy-code/Market-Digest`,
      branch `main`).
- [ ] Research the day's/week's Indian market news via WebSearch/WebFetch
      against the sources above, cross-checking figures.
- [ ] Update `site/index.html` (daily run) or `site/weekly/index.html`
      (weekly run) in place with the new content, reusing the existing
      markup/CSS structure.
- [ ] Save a permanent dated copy under `site/daily/` or `site/weekly/`.
- [ ] Add one new entry to `site/archive/index.html` linking to that dated
      copy (most recent first; never delete older entries).
- [ ] `git add`, commit with a clear message, and `git push` to `main`.
      This alone redeploys the live site — no other publish step is needed.
