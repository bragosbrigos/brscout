import { useState, useMemo } from 'react';
import PlayerAvatar from './PlayerAvatar';
import RatingBadge from './RatingBadge';
import { TEAMS, NATIONS, POSITIONS, FLAGS } from '../data/constants';

function SearchSection({ players, t, onPlayerClick }) {
  const [searchName, setSearchName] = useState('');
  const [selectedTeam, setSelectedTeam] = useState('');
  const [selectedPosition, setSelectedPosition] = useState('');
  const [selectedNation, setSelectedNation] = useState('');
  const [minRating, setMinRating] = useState('');
  const [maxRating, setMaxRating] = useState('');
  const [minAge, setMinAge] = useState('');
  const [maxAge, setMaxAge] = useState('');

  const filteredPlayers = useMemo(() => {
    return players.filter(p => {
      if (searchName && !p.name.toLowerCase().includes(searchName.toLowerCase())) return false;
      if (selectedTeam && p.teamName !== selectedTeam) return false;
      if (selectedPosition && !p.position.toLowerCase().includes(selectedPosition.toLowerCase())) return false;
      if (selectedNation && p.nation !== selectedNation) return false;
      
      const normalizedRating = p.rating > 10 ? p.rating / 10 : p.rating;
      if (minRating && normalizedRating < parseFloat(minRating)) return false;
      if (maxRating && normalizedRating > parseFloat(maxRating)) return false;
      
      if (minAge && p.age < parseInt(minAge)) return false;
      if (maxAge && p.age > parseInt(maxAge)) return false;
      
      return true;
    });
  }, [players, searchName, selectedTeam, selectedPosition, selectedNation, minRating, maxRating, minAge, maxAge]);

  const clearFilters = () => {
    setSearchName('');
    setSelectedTeam('');
    setSelectedPosition('');
    setSelectedNation('');
    setMinRating('');
    setMaxRating('');
    setMinAge('');
    setMaxAge('');
  };

  return (
    <section className="pt-28 pb-20 min-h-screen bg-gray-50 dark:bg-br-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h2 className="text-3xl font-black text-gray-900 dark:text-white">{t.search.title}</h2>
          <p className="text-gray-500 dark:text-gray-400 mt-1">{t.search.subtitle}</p>
        </div>

        {/* Filters */}
        <div className="bg-white dark:bg-br-card rounded-2xl p-6 mb-8 shadow-lg">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">{t.search.searchPlaceholder}</label>
              <input type="text" value={searchName} onChange={e => setSearchName(e.target.value)} placeholder={t.search.searchPlaceholder} className="w-full px-4 py-2 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-br-green focus:border-transparent" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">{t.search.filters.team}</label>
              <select value={selectedTeam} onChange={e => setSelectedTeam(e.target.value)} className="w-full px-4 py-2 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-br-green">
                <option value="">{t.search.filters.allTeams}</option>
                {TEAMS.map(team => <option key={team} value={team}>{team}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">{t.search.filters.position}</label>
              <select value={selectedPosition} onChange={e => setSelectedPosition(e.target.value)} className="w-full px-4 py-2 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-br-green">
                <option value="">{t.search.filters.allPositions}</option>
                {POSITIONS.map(pos => <option key={pos} value={pos}>{pos}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">{t.search.filters.nation}</label>
              <select value={selectedNation} onChange={e => setSelectedNation(e.target.value)} className="w-full px-4 py-2 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-br-green">
                <option value="">{t.search.filters.allNations}</option>
                {NATIONS.map(nation => <option key={nation} value={nation}>{nation}</option>)}
              </select>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">{t.search.filters.rating} ({t.search.filters.min})</label>
              <input type="number" step="0.1" min="0" max="10" value={minRating} onChange={e => setMinRating(e.target.value)} className="w-full px-4 py-2 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-br-green" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">{t.search.filters.rating} ({t.search.filters.max})</label>
              <input type="number" step="0.1" min="0" max="10" value={maxRating} onChange={e => setMaxRating(e.target.value)} className="w-full px-4 py-2 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-br-green" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">{t.search.filters.age} ({t.search.filters.min})</label>
              <input type="number" min="16" max="50" value={minAge} onChange={e => setMinAge(e.target.value)} className="w-full px-4 py-2 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-br-green" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">{t.search.filters.age} ({t.search.filters.max})</label>
              <input type="number" min="16" max="50" value={maxAge} onChange={e => setMaxAge(e.target.value)} className="w-full px-4 py-2 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-br-green" />
            </div>
          </div>

          <div className="flex gap-3">
            <button onClick={() => {}} className="px-6 py-2 bg-br-green text-white rounded-xl font-semibold hover:bg-emerald-600 transition-colors">
              <i className="fa-solid fa-search mr-2"></i>{t.search.search}
            </button>
            <button onClick={clearFilters} className="px-6 py-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-xl font-semibold hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors">
              <i className="fa-solid fa-eraser mr-2"></i>{t.search.clear}
            </button>
          </div>
        </div>

        {/* Results */}
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white">{filteredPlayers.length} {t.search.results}</h3>
        </div>

        {filteredPlayers.length === 0 ? (
          <div className="text-center py-12">
            <i className="fa-solid fa-magnifying-glass text-6xl text-gray-300 dark:text-gray-600 mb-4"></i>
            <p className="text-gray-500 dark:text-gray-400">{t.search.noResults}</p>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 animate-slide-up">
            {filteredPlayers.map(p => (
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
        )}
      </div>
    </section>
  );
}

export default SearchSection;
