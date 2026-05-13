import { useMemo } from 'react';
import PlayerAvatar from './PlayerAvatar';
import RatingBadge from './RatingBadge';
import { FLAGS } from '../data/constants';

function HomeSection({ players, setCurrentPage, t, onPlayerClick }) {
  const stats = useMemo(() => {
    if (!players || players.length === 0) {
      return { topScorer: { name: '-', goals: 0 }, topAssists: { name: '-', assists: 0 }, avgRating: "0.0", total: 0, teams: 0 };
    }
    const topScorer = [...players].sort((a,b) => b.goals - a.goals)[0];
    const topAssists = [...players].sort((a,b) => b.assists - a.assists)[0];
    const avgRating = players.length > 0 
      ? ((players.reduce((s,p) => s+(p.rating > 10 ? p.rating/10 : p.rating), 0)/players.length)).toFixed(1)
      : "0.0";
    return { topScorer, topAssists, avgRating, total: players.length, teams: new Set(players.map(p=>p.teamName)).size };
  }, [players]);

  const normalizeRating = (rating) => rating > 10 ? (rating / 10).toFixed(1) : rating.toFixed(1);

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden pt-20">
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-900 via-slate-900 to-yellow-900/30"></div>
      <div className="absolute inset-0 pitch-grid opacity-20"></div>

      {/* Gradient Orbs */}
      <div className="absolute top-20 right-20 w-96 h-96 bg-br-green/10 rounded-full blur-[120px] animate-pulse-slow"></div>
      <div className="absolute bottom-20 left-20 w-80 h-80 bg-br-gold/10 rounded-full blur-[100px] animate-pulse-slow" style={{ animationDelay: '1s' }}></div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full">
        <div className="text-center mb-16 animate-slide-up">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 text-white/90 text-sm font-medium mb-6 backdrop-blur-sm">
            <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
            {t.home.league}
          </div>
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black text-white leading-[1.1] mb-6">
            {t.home.title.split('\n')[0]}<br/>
            <span className="text-gradient">{t.home.title.split('\n')[1] || 'Alto Nível'}</span>
          </h1>
          <p className="text-lg sm:text-xl text-white/70 mb-10 max-w-2xl mx-auto">
            {t.home.subtitle}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button onClick={() => setCurrentPage('pesquisa')} className="px-8 py-4 bg-gradient-to-r from-br-green to-emerald-600 text-white font-bold rounded-2xl shadow-lg shadow-br-green/30 hover:shadow-br-green/50 transition-all duration-300 hover:scale-105">
              <i className="fa-solid fa-search mr-2"></i>{t.home.explore}
            </button>
            <button onClick={() => setCurrentPage('times')} className="px-8 py-4 border-2 border-white/30 text-white font-bold rounded-2xl hover:bg-white/10 transition-all duration-300 hover:scale-105 backdrop-blur-sm">
              <i className="fa-solid fa-shield-halved mr-2"></i>{t.home.viewTeams}
            </button>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 mb-16 animate-slide-up" style={{ animationDelay: '0.2s' }}>
          {[
            { label: t.home.stats.players, value: stats.total, icon: "fa-users", color: "text-blue-400" },
            { label: t.home.stats.clubs, value: stats.teams, icon: "fa-shield-halved", color: "text-br-green" },
            { label: t.home.stats.avgRating, value: stats.avgRating, icon: "fa-star", color: "text-yellow-400" },
            { label: t.home.stats.topScorer, value: stats.topScorer.name, sub: `${stats.topScorer.goals} ${t.home.stats.goals}`, icon: "fa-futbol", color: "text-red-400" },
            { label: t.home.stats.topAssists, value: stats.topAssists.name, sub: `${stats.topAssists.assists} ${t.home.stats.assists}`, icon: "fa-hand-point-up", color: "text-purple-400" },
          ].map((s, i) => (
            <div key={i} className="glass rounded-2xl p-4 text-center card-hover cursor-pointer" onClick={() => setCurrentPage('pesquisa')}>
              <div className={`text-2xl mb-2 ${s.color}`}><i className={`fa-solid ${s.icon}`}></i></div>
              <div className="text-white font-black text-lg truncate">{s.value}</div>
              <div className="text-white/50 text-xs">{s.label}</div>
              {s.sub && <div className="text-white/40 text-[10px] mt-1">{s.sub}</div>}
            </div>
          ))}
        </div>

        {/* Featured Players */}
        <div className="animate-slide-up" style={{ animationDelay: '0.4s' }}>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-white">{t.home.highlights}</h2>
            <button onClick={() => setCurrentPage('pesquisa')} className="text-br-green text-sm font-semibold hover:underline">{t.home.viewAll}</button>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[...players].sort((a,b) => b.rating - a.rating).slice(0,6).map(p => (
              <div key={p.id} className="glass rounded-2xl p-4 flex items-center gap-4 card-hover cursor-pointer" onClick={() => onPlayerClick(p)}>
                <PlayerAvatar player={p} size="md" />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <h3 className="text-white font-bold truncate">{p.name}</h3>
                    <RatingBadge rating={normalizeRating(p.rating)} />
                  </div>
                  <p className="text-white/50 text-sm">{p.position} • {p.teamName}</p>
                  <div className="flex gap-4 mt-2 text-xs text-white/60">
                    <span><i className="fa-solid fa-futbol mr-1 text-red-400"></i>{p.goals}</span>
                    <span><i className="fa-solid fa-hand-point-up mr-1 text-blue-400"></i>{p.assists}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default HomeSection;
