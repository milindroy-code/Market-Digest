# Indian Market Digest — Playbook

This file is the recipe every digest run (manual or scheduled) should follow, so
output stays consistent day to day. Read this file first, then research, then write.

## Live artifact
**Latest digest URL:** https://claude.ai/code/artifact/af999504-7c10-494d-8ced-5b8cb8308934
(named "The Opening Bell" — republish to this exact URL on every future run,
passing it as `url` to the Artifact tool; never publish a fresh artifact for a
routine update. The source file lives at `digest.html` in this project folder —
edit that file in place each run, then republish it to the URL above.)

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
- [ ] Write a dated markdown file to `digests/YYYY-MM-DD-<morning|evening|weekend>.md`
      following the section order above.
- [ ] Republish the persistent HTML artifact at the URL recorded above with the
      new content (same URL — do not create a new artifact).
- [ ] If this was the very first publish, paste the returned artifact URL into
      the "Live artifact" field at the top of this file.
