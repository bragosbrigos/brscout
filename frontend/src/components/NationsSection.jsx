import { useMemo, useState } from 'react';
import PlayerAvatar from './PlayerAvatar';
import RatingBadge from './RatingBadge';
import { FLAGS, NATIONS } from '../data/constants';

function NationsSection({ players, t, onPlayerClick }) {
  const [selectedNation, setSelectedNation] = useState(null);

  const nationCounts = useMemo(() => {
    const counts = {};
    players.forEach(p => { counts[p.nation] = (counts[p.nation] || 0) + 1; });
    return counts;
  }, [players]);

  const filtered = selectedNation ? players.filter(p => p.nation === selectedNation) : players;

  return (
    <section className="pt-28 pb-20 min-h-screen bg-gray-50 dark:bg-br-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h2 className="text-3xl font-black text-gray-900 dark:text-white">{t.nations.title}</h2>
          <p className="text-gray-500 dark:text-gray-400 mt-1">{t.nations.subtitle}</p>
        </div>

        {/* Nation Chips */}
        <div className="flex flex-wrap gap-3 mb-10">
          <button onClick={() => setSelectedNation(null)} className={`px-4 py-2 rounded-full text-sm font-semibold transition-all ${!selectedNation ? 'bg-br-green text-white shadow-lg' : 'bg-white dark:bg-br-card text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-gray-700 hover:border-br-green'}`}>
            {t.nations.all}
          </button>
          {Object.keys(nationCounts).sort().map(nation => (
            <button key={nation} onClick={() => setSelectedNation(nation)} className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold transition-all ${selectedNation === nation ? 'bg-br-gold text-black shadow-lg' : 'bg-white dark:bg-br-card text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-gray-700 hover:border-br-gold'}`}>
              <span>{FLAGS[nation] || '🌍'}</span>
              <span>{nation}</span>
              <span className="bg-gray-100 dark:bg-gray-700 text-xs px-2 py-0.5 rounded-full">{nationCounts[nation]}</span>
            </button>
          ))}
        </div>

        {/* Results */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 animate-slide-up">
          {filtered.map(p => (
            <div key={p.id} className="bg-white dark:bg-br-card rounded-2xl border border-gray-200 dark:border-gray-700 p-4 card-hover cursor-pointer" onClick={() => onPlayerClick(p)}>
              <div className="flex items-center gap-4 mb-4">
                <PlayerAvatar player={p} size="md" />
                <div>
                  <h3 className="font-bold text-gray-900 dark:text-white">{p.name}</h3>
                  <p className="text-sm text-gray-500">{p.teamName} • {p.position}</p>
                </div>
                <div className="ml-auto"><RatingBadge rating={p.rating > 10 ? (p.rating/10).toFixed(1) : p.rating.toFixed(1)} /></div>
              </div>
              <div className="flex gap-4 text-sm">
                <span className="flex-1 text-center p-2 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <span className="block font-black text-red-500">{p.goals}</span>
                  <span className="text-[10px] text-gray-500">{t.player.info.goals}</span>
                </span>
                <span className="flex-1 text-center p-2 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <span className="block font-black text-blue-500">{p.assists}</span>
                  <span className="text-[10px] text-gray-500">{t.player.info.assists}</span>
                </span>
                <span className="flex-1 text-center p-2 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <span className="block font-black text-yellow-500">{p.age}</span>
                  <span className="text-[10px] text-gray-500">{t.player.info.age}</span>
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default NationsSection;
