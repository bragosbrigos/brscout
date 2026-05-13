import { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import PlayerAvatar from './PlayerAvatar';
import RatingBadge from './RatingBadge';

function PlayerModal({ player, onClose, onEdit, onDelete, t }) {
  if (!player) return null;

  const normalizeRating = (rating) => {
    if (!rating) return 0;
    return rating > 10 ? (rating / 10).toFixed(1) : rating.toFixed(1);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in" onClick={onClose}>
      <div className="bg-white dark:bg-br-card rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl animate-slide-up" onClick={e => e.stopPropagation()}>
        {/* Header */}
        <div className="relative h-48 bg-gradient-to-br from-br-green to-emerald-800 rounded-t-3xl">
          <button onClick={onClose} className="absolute top-4 right-4 w-10 h-10 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center text-white transition-colors">
            <i className="fa-solid fa-xmark text-xl"></i>
          </button>
          <div className="absolute -bottom-12 left-8">
            <PlayerAvatar player={player} size="xl" />
          </div>
        </div>

        {/* Content */}
        <div className="pt-16 px-8 pb-8">
          <div className="flex items-start justify-between mb-6">
            <div>
              <h2 className="text-3xl font-black text-gray-900 dark:text-white">{player.name}</h2>
              <p className="text-gray-500 dark:text-gray-400">{player.position} • {player.teamName}</p>
            </div>
            <RatingBadge rating={normalizeRating(player.rating)} />
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-3 gap-4 mb-6">
            <div className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-4 text-center">
              <div className="text-3xl font-black text-red-500">{player.goals}</div>
              <div className="text-xs text-gray-500 uppercase mt-1">{t.player.info.goals}</div>
            </div>
            <div className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-4 text-center">
              <div className="text-3xl font-black text-blue-500">{player.assists}</div>
              <div className="text-xs text-gray-500 uppercase mt-1">{t.player.info.assists}</div>
            </div>
            <div className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-4 text-center">
              <div className="text-3xl font-black text-yellow-500">{player.age}</div>
              <div className="text-xs text-gray-500 uppercase mt-1">{t.player.info.age}</div>
            </div>
          </div>

          {/* Info List */}
          <div className="space-y-3">
            <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-xl">
              <i className="fa-solid fa-shield-halved text-gray-400 w-6"></i>
              <div>
                <div className="text-xs text-gray-500">{t.player.info.team}</div>
                <div className="font-semibold text-gray-900 dark:text-white">{player.teamName}</div>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-xl">
              <i className="fa-solid fa-earth-americas text-gray-400 w-6"></i>
              <div>
                <div className="text-xs text-gray-500">{t.player.info.nationality}</div>
                <div className="font-semibold text-gray-900 dark:text-white">{player.nation}</div>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-xl">
              <i className="fa-solid fa-user text-gray-400 w-6"></i>
              <div>
                <div className="text-xs text-gray-500">{t.player.info.position}</div>
                <div className="font-semibold text-gray-900 dark:text-white">{player.position}</div>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-xl">
              <i className="fa-solid fa-shirt text-gray-400 w-6"></i>
              <div>
                <div className="text-xs text-gray-500">{t.player.info.number}</div>
                <div className="font-semibold text-gray-900 dark:text-white">#{player.number}</div>
              </div>
            </div>
          </div>

          {/* Actions */}
          {(onEdit || onDelete) && (
            <div className="flex gap-3 mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
              {onEdit && (
                <button onClick={() => onEdit(player)} className="flex-1 px-4 py-3 bg-br-green text-white rounded-xl font-semibold hover:bg-emerald-600 transition-colors">
                  <i className="fa-solid fa-pen mr-2"></i>{t.common.edit}
                </button>
              )}
              {onDelete && (
                <button onClick={() => onDelete(player.id)} className="flex-1 px-4 py-3 bg-red-500 text-white rounded-xl font-semibold hover:bg-red-600 transition-colors">
                  <i className="fa-solid fa-trash mr-2"></i>{t.common.delete}
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default PlayerModal;
