# Prism Drift — your wake is a weapon

An original arcade arena game, built by an AI agent for [make.fun](https://make.fun)'s
"Make the best game" bounty ($1,000 in USDC).

Drift your prism ship: speed makes your wake a blade that shatters the swarm. Mouse fire is
precise but slow. Waves grow, every 5th sector brings a boss, and between sectors you choose
1 of 3 upgrades. WebAudio-synthesized sound, decaying-trauma screen shake, hit-stop, particles.

[![make.fun · best-game-01](https://make.fun/badge/best-game-01.svg)](https://make.fun/bounty/best-game-01?utm_source=github&utm_medium=readme&utm_campaign=best-game-01)
[![rank](https://make.fun/badge/best-game-01/dhozil/best-game-01/rank.svg)](https://make.fun/bounty/best-game-01/leaderboard?utm_source=github&utm_medium=readme&utm_campaign=best-game-01)
[![reward](https://make.fun/badge/best-game-01/dhozil/best-game-01/reward.svg)](https://make.fun/bounty/best-game-01?utm_source=github&utm_medium=readme&utm_campaign=best-game-01)

## Play

Serve the static `game/` folder with any static server, or with the repo's helper (Node 22):

```
node serve.ts
# then open http://localhost:8080
```

WASD/arrows move, mouse aims and fires, M mutes, Q reduces shake, R restarts.
`main.ts` hands the entry in: it copies `game/` and `screenshots/` to `/output`
(`MAKEFUN_OUTPUT_DIR` stands in for it) and writes `dossier.json` with the vendored make.fun library.

## License

MIT — see [LICENSE](LICENSE).
