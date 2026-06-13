---
layout: ../layouts/Base.astro
title: How It Works — ytbot
---

# How It Works

## Points {#points}

You earn points automatically while watching the stream.

- **Passive gain:** 1 point every 10 seconds while you're active in chat.
- **Activity requirement:** If you go **5 minutes** without sending a chat message, passive point gain pauses until you chat again.
- **Checking your balance:** Type `!points` in chat — your balance appears on the stream overlay (not in chat).
- **Points persist:** Unspent points carry over from stream to stream. Bank them for a big play later.

## Super Chats {#super-chats}

Super Chats let you bypass the points economy entirely using a real-money donation.

- Prices are shown in USD; foreign currencies are converted automatically by YouTube.
- If you send a Super Chat **without** a command, you receive points at a **1 pt per $0.01** rate (e.g., a $2.00 Super Chat = 200 points).
- Super Chat commands display with a **distinctive overlay** so everyone can see they came from a donation.

Points and Super Chats work the same way mechanically — the only difference is whether you're spending accumulated points or sending money.

## Patreon & Discord Bonuses {#bonuses}

Supporting the stream gives you a **chance to earn an extra point every 10 seconds** on top of the base rate.

| Tier | Bonus |
|---|---|
| Patreon Tier 1 | +10% chance of an extra point |
| Patreon Tier 2 | +25% chance of an extra point |
| Patreon Tier 3 | +50% chance of an extra point |
| Patreon Tier 4 | +100% (guaranteed extra point every 10 s) |
| Discord — Infernal role (Level 20) | +25% chance of an extra point |

Bonuses are **additive**. A Tier 2 Patreon member who also holds the Infernal Discord role gets a **50%** (25 + 25) chance at an extra point per tick.

## Command Syntax {#syntax}

Commands are **not case-sensitive** and can appear anywhere in your chat message. Each command must include:

1. An exclamation mark `!` before the command keyword
2. The command keyword(s)
3. A target player

**Valid targets:** `@eerie` · `@guru` · `@all` · `@random`

```
!burn @eerie
!trip @guru
Hope this hurts! !disable melee weapon @guru. Good luck!
```

Targeting `@all` applies the command to **both players simultaneously** for **75% more** than the base cost — two commands at once for a fraction of the individual prices.

> **Do not mix commands** or use keywords from multiple commands in the same message. You may accidentally trigger the wrong command or none at all. Executing multiple distinct commands from a single chat message is not supported.

## Bot Behavior {#behavior}

- The bot normally checks for new chat messages **every 5 seconds**.
- If chat is quiet for 5 minutes, the bot slows its polling — your command may take up to **60 seconds** to process.
- **Tip:** During quiet periods, send a few normal messages before your command to wake the bot back up.

## If Something Goes Wrong {#errors}

The bot is still a work in progress. If your command fails due to a bug, the streamer will manually execute it in-game. Points are only deducted on a successful command execution — there are no refunds if the target player is out of range or otherwise unreachable.
