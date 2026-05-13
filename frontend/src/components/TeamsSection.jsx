import { useState } from 'react';
import PlayerAvatar from './PlayerAvatar';
import RatingBadge from './RatingBadge';
import { TEAMS, TEAM_COLORS } from '../data/constants';

function TeamsSection({ players, setPlayers, t, onPlayerClick, onEditClick, onDeleteClick }) {
  const [selectedTeam, setSelectedTeam] = useState(null);

  const teamPlayers = selectedTeam ? players.filter(p => p.teamName === selectedTeam) : [];

  return (
    <section className="pt-28 pb-20 min-h-screen bg-gray-50 dark:bg-br-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-black text-gray-900 dark:text-white">{t.teams.title}</h2>
            <p className="text-gray-500 dark:text-gray-400 mt-1">{t.teams.subtitle}</p>
          </div>
        </div>

        {/* Team Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 mb-10">
          {TEAMS.map(team => {
            const count = players.filter(p => p.teamName === team).length;
            const isActive = selectedTeam === team;
            return (
              <button key={team} onClick={() => setSelectedTeam(isActive ? null : team)}
                className={`relative p-4 rounded-2xl border transition-all duration-300 card-hover text-left ${isActive
                  ? 'border-br-green bg-br-green/10 shadow-lg shadow-br-green/10'
                  : 'border-gray-200 dark:border-gray-700 bg-white dark:bg-br-card hover:border-br-green/50'}`}
              >
                <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${TEAM_COLORS[team] || 'from-gray-500 to-gray-700'} flex items-center justify-center mb-3 text-white font-bold text-lg shadow-md`}>
                  {team.substring(0,2).toUpperCase()}
                </div>
                <h3 className="font-bold text-gray-900 dark:text-white text-sm truncate">{team}</h3>
                <p className="text-xs text-gray-500 mt-1">{count} {t.teams.players}</p>
                {isActive && <div className="absolute top-2 right-2 w-2 h-2 bg-br-green rounded-full"></div>}
              </button>
            );
          })}
        </div>

        {/* Player List */}
        {selectedTeam && (
          <div className="animate-slide-up">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">{t.teams.squad}: {selectedTeam}</h3>
              <span className="text-sm text-gray-500">{teamPlayers.length} {t.teams.athlete}</span>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {teamPlayers.map(p => (
                <div key={p.id} className="bg-white dark:bg-br-card rounded-2xl border border-gray-200 dark:border-gray-700 p-4 card-hover relative group cursor-pointer" onClick={() => onPlayerClick(p)}>
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <PlayerAvatar player={p} size="md" />
                      <div>
                        <h4 className="font-bold text-gray-900 dark:text-white">{p.name}</h4>
                        <p className="text-xs text-gray-500">{p.position} • {p.age} {t.common.years}</p>
                      </div>
                    </div>
                    <RatingBadge rating={p.rating > 10 ? (p.rating/10).toFixed(1) : p.rating.toFixed(1)} />
                  </div>
                  <div className="grid grid-cols-2 gap-3 mb-3">
                    <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-2 text-center">
                      <div className="text-lg font-black text-red-500">{p.goals}</div>
                      <div className="text-[10px] text-gray-500 uppercase">{t.player.info.goals}</div>
                    </div>
                    <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-2 text-center">
                      <div className="text-lg font-black text-blue-500">{p.assists}</div>
                      <div className="text-[10px] text-gray-500 uppercase">{t.player.info.assists}</div>
                    </div>
                  </div>
                  <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity" onClick={e => e.stopPropagation()}>
                    <button onClick={() => onEditClick(p)} className="flex-1 px-3 py-2 bg-blue-500 text-white rounded-lg text-sm font-medium hover:bg-blue-600">
                      <i className="fa-solid fa-pen mr-1"></i>{t.common.edit}
                    </button>
                    <button onClick={() => onDeleteClick(p.id)} className="flex-1 px-3 py-2 bg-red-500 text-white rounded-lg text-sm font-medium hover:bg-red-600">
                      <i className="fa-solid fa-trash mr-1"></i>{t.common.delete}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

export default TeamsSection;
