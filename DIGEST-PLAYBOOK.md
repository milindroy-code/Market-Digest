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
4. **Technicals & positioning** — Nifty/Bank Nifty support-resistance zones,
   RSI/trend read, and options positioning (PCR, max pain, where OI is heaviest)
   as reported by technical analysts and data platforms. Say plainly when a
   figure is a live snapshot vs. the last available reading — don't fabricate
   precision live dashboards can't be scraped for.
5. **Corporate news** — earnings, M&A, big management/strategic announcements.
6. **Macro & policy** — RBI, SEBI, government policy, inflation/GDP/trade data,
   upcoming policy meeting dates.
7. **FII/DII activity** — net buy/sell figures for the day or week, and the
   net trend (who is providing support, who is pulling back).
8. **IPO / corporate-action watch** — IPOs opening/closing, listings, big
   corporate actions (buybacks, bonuses, splits, demergers) in the window.
   Include real subscription multiples by category (QIB/NII/Retail) and GMP
   when the IPO has been open long enough for meaningful numbers to exist —
   for a same-day opener, say so rather than reporting placeholder 0.00x data.
9. **Explainer** — one short, plain-language explainer of a concept tied to
   today's biggest story (e.g. "why a Fed hike moves Indian stocks," "what
   open interest actually measures," "why FIIs and DIIs move in opposite
   directions"). This is what separates a digest from a headline scrape —
   write it the way Finshots or Safal Niveshak would: a hook, a clear
   mechanism, one concrete number. 120–180 words.
10. **What to watch** — for morning: today's key triggers; for evening:
    tomorrow's triggers; for weekend: the week ahead's triggers (data
    releases, results, policy meetings, IPO calendar, technical levels).
11. **Further reading** — 2–3 links to deeper analysis on today's theme from
    the "Analysis & context" sources below, for readers who want more than a
    digest. One line each on what the piece covers, not a content dump.

## Sources
Cross-check at least 2–3 sources per major number/claim. Not every source
below is fetchable for live data each run — use them the way that's actually
realistic (noted per source), and never fabricate a number a source didn't
actually provide.

**Primary data & news (fetch directly for facts/figures):**
- Moneycontrol (moneycontrol.com)
- Economic Times Markets (economictimes.indiatimes.com/markets)
- LiveMint (livemint.com/market)
- NDTV Profit (ndtvprofit.com)
- Business Standard Markets (business-standard.com/markets)
- BSE Markets (bseindia.com/markets) and NSE corporate filings/announcements
  (nseindia.com/companies-listing/corporate-filings-announcements) — primary
  source for corporate actions, prefer these over secondhand write-ups when
  a specific filing is being cited
- RBI (rbi.org.in) / SEBI (sebi.gov.in) press releases for policy items
- Trendlyne / 5paisa / Groww for FII-DII cash-segment figures
- Chittorgarh (chittorgarh.com) for IPO subscription-by-category and GMP —
  search for the specific IPO's page rather than guessing its URL/ID

**Technicals & derivatives (dashboards are live/interactive and can't be
scraped for a real-time snapshot — get this via search for that day's
analyst commentary reporting these figures, e.g. "Nifty PCR max pain support
resistance [date]", rather than trying to fetch NiftyTrader/Opstra/
TradingView directly):**
- Opstra (opstra.definedgesecurities.com), TradingView India
  (in.tradingview.com), NiftyTrader — cited as the kind of tool behind the
  numbers, not fetched live

**Analysis & context (mine these for the "why," explainers, and Further
Reading links — most are newsletters/landing pages without a scrapable
article feed, so search for their recent coverage of the day's theme rather
than assuming a direct fetch works):**
- Reuters India (reuters.com/world/india) — often blocks direct fetch; use
  WebSearch for their reporting instead
- The Daily Brief by Zerodha (thedailybrief.zerodha.com)
- In the Money by Zerodha (inthemoneybyzerodha.substack.com)
- Finshots (finshots.in)
- Safal Niveshak (safalniveshak.com)
- Rachana Ranade's blog (rachanaranade.com/blog)
- Capitalmind (capitalmind.in) — PMS/institutional perspective
- SOIC podcasts (soic.in/podcasts) — for long-form investor thinking, cite
  sparingly as further reading, not as a source of same-day figures
- Investopedia (investopedia.com) — for getting an explainer's mechanics
  right, not for news

**Screening/idea tools (informational only — never turn a screen's output
into a buy/sell call; if mentioned, frame as "what a public screen is
flagging" and keep it in Further Reading, not the main narrative):**
- askfuzz.ai screener (askfuzz.ai/discover/screener)

## Style rules
- Lead with the number, not the narrative — investors scan for figures first.
- Every figure needs a direction (up/down) and, where relevant, a comparison
  (vs. previous close, vs. last week).
- Explain *why*, not just *what*, at least once per edition — this is the
  difference between a digest worth reading and a headline scrape. If every
  section is "X moved Y%," the edition has failed even if every number is
  correct.
- Keep language plain and neutral. No "buy/sell" recommendations — this is a
  news digest, not investment advice. A closing disclaimer line is fine.
- Keep total reading time under ~4 minutes: short paragraphs, bullet lists,
  bold the numbers that matter. The Explainer and Further Reading sections
  add length on purpose — trim elsewhere (e.g. don't repeat RBI/SEBI items
  from a prior edition verbatim if nothing changed; a one-line "unchanged
  since Tuesday" is enough).

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
