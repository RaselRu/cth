const leaderboard = [
  { rank: 1, name: "@aisa", level: "Золото", xp: 720, tokens: 2400 },
  { rank: 2, name: "@nur", level: "Серебро", xp: 640, tokens: 2100 },
  { rank: 3, name: "@dias", level: "Серебро", xp: 580, tokens: 1950 },
  { rank: 4, name: "@tamina", level: "Бронза", xp: 490, tokens: 1620 },
  { rank: 5, name: "@samal", level: "Бронза", xp: 430, tokens: 1400 },
];

export default function LeaderboardPage() {
  return (
    <div className="space-y-8">
      <div className="rounded-3xl border border-white/20 bg-white/10 p-6 backdrop-blur-xl">
        <h1 className="text-2xl font-semibold">Таблица лидеров</h1>
        <p className="mt-2 text-sm text-white/70">
          Еженедельный рейтинг обновляется каждое воскресенье в 20:00.
        </p>
      </div>

      <div className="overflow-hidden rounded-3xl border border-white/20 bg-white/10 backdrop-blur-xl">
        <div className="grid grid-cols-5 gap-2 border-b border-white/10 px-6 py-4 text-xs uppercase tracking-wider text-white/60">
          <div>Место</div>
          <div>Ник</div>
          <div>Уровень</div>
          <div>XP</div>
          <div>Токены</div>
        </div>
        {leaderboard.map((row) => (
          <div
            key={row.rank}
            className="grid grid-cols-5 gap-2 px-6 py-4 text-sm text-white/80"
          >
            <div className="font-semibold text-white">{row.rank}</div>
            <div>{row.name}</div>
            <div>{row.level}</div>
            <div>{row.xp}</div>
            <div>{row.tokens}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
