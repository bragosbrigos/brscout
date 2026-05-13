import { useState, useEffect } from 'react';
import PlayerAvatar from './PlayerAvatar';
import RatingBadge from './RatingBadge';
import { TEAMS, NATIONS, POSITIONS } from '../data/constants';

function EditSection({ players, setPlayers, t, editingPlayer, onSave, onCancel, isModalOnly = false }) {
  const [form, setForm] = useState({
    name: "",
    teamName: "",
    number: 0,
    nation: "Brasil",
    position: "ATA",
    age: 20,
    rating: 70,
    goals: 0,
    assists: 0
  });

  useEffect(() => {
    if (editingPlayer) {
      setForm(editingPlayer);
    } else {
      setForm({
        name: "",
        teamName: "",
        number: 0,
        nation: "Brasil",
        position: "ATA",
        age: 20,
        rating: 70,
        goals: 0,
        assists: 0
      });
    }
  }, [editingPlayer]);

  const handleSave = () => {
    if (!form.name || !form.teamName) return;
    if (onSave) {
      onSave(form);
    }
  };

  if (isModalOnly && !editingPlayer && !onSave) {
    return null;
  }

  return (
    <section className="pt-28 pb-20 min-h-screen bg-gray-50 dark:bg-br-dark">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {!isModalOnly && (
          <div className="mb-8">
            <h2 className="text-3xl font-black text-gray-900 dark:text-white">{t.edit.title}</h2>
            <p className="text-gray-500 dark:text-gray-400 mt-1">{t.edit.subtitle}</p>
          </div>
        )}

        <div className={`bg-white dark:bg-br-card rounded-2xl p-6 shadow-lg ${isModalOnly ? '' : 'mb-8'}`}>
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
            {editingPlayer ? t.edit.editPlayer : t.edit.addPlayer}
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">{t.edit.form.name}</label>
              <input type="text" value={form.name} onChange={e => setForm({...form, name: e.target.value})} className="w-full px-4 py-2 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-br-green" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">{t.edit.form.team}</label>
              <select value={form.teamName} onChange={e => setForm({...form, teamName: e.target.value})} className="w-full px-4 py-2 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-br-green">
                <option value="">Selecione</option>
                {TEAMS.map(team => <option key={team} value={team}>{team}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">{t.edit.form.position}</label>
              <select value={form.position} onChange={e => setForm({...form, position: e.target.value})} className="w-full px-4 py-2 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-br-green">
                {POSITIONS.map(pos => <option key={pos} value={pos}>{pos}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">{t.edit.form.nationality}</label>
              <select value={form.nation} onChange={e => setForm({...form, nation: e.target.value})} className="w-full px-4 py-2 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-br-green">
                {NATIONS.map(nation => <option key={nation} value={nation}>{nation}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">{t.edit.form.age}</label>
              <input type="number" value={form.age} onChange={e => setForm({...form, age: parseInt(e.target.value) || 0})} className="w-full px-4 py-2 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-br-green" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">{t.edit.form.number}</label>
              <input type="number" value={form.number} onChange={e => setForm({...form, number: parseInt(e.target.value) || 0})} className="w-full px-4 py-2 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-br-green" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">{t.edit.form.rating}</label>
              <input type="number" step="0.1" min="0" max="100" value={form.rating} onChange={e => setForm({...form, rating: parseFloat(e.target.value) || 0})} className="w-full px-4 py-2 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-br-green" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">{t.edit.form.goals}</label>
              <input type="number" value={form.goals} onChange={e => setForm({...form, goals: parseInt(e.target.value) || 0})} className="w-full px-4 py-2 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-br-green" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">{t.edit.form.assists}</label>
              <input type="number" value={form.assists} onChange={e => setForm({...form, assists: parseInt(e.target.value) || 0})} className="w-full px-4 py-2 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-br-green" />
            </div>
          </div>

          <div className="flex gap-3">
            <button onClick={handleSave} className="px-6 py-2 bg-br-green text-white rounded-xl font-semibold hover:bg-emerald-600 transition-colors">
              <i className="fa-solid fa-save mr-2"></i>{t.edit.save}
            </button>
            {onCancel && (
              <button onClick={onCancel} className="px-6 py-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-xl font-semibold hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors">
                <i className="fa-solid fa-xmark mr-2"></i>{t.edit.cancel}
              </button>
            )}
          </div>
        </div>

        {!isModalOnly && (
          <div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Todos os Jogadores</h3>
            <div className="bg-white dark:bg-br-card rounded-2xl shadow-lg overflow-hidden">
              <table className="w-full">
                <thead className="bg-gray-50 dark:bg-gray-800">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Nome</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Time</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Pos</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Gols</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Assist</th>
                    <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase">Ações</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                  {players.map(p => (
                    <tr key={p.id} className="hover:bg-gray-50 dark:hover:bg-gray-800">
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          <PlayerAvatar player={p} size="sm" />
                          <span className="font-medium text-gray-900 dark:text-white">{p.name}</span>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-gray-600 dark:text-gray-400">{p.teamName}</td>
                      <td className="px-4 py-3 text-gray-600 dark:text-gray-400">{p.position}</td>
                      <td className="px-4 py-3 text-red-500 font-bold">{p.goals}</td>
                      <td className="px-4 py-3 text-blue-500 font-bold">{p.assists}</td>
                      <td className="px-4 py-3 text-right">
                        <button onClick={() => {}} className="text-blue-500 hover:text-blue-600 mr-2">
                          <i className="fa-solid fa-pen"></i>
                        </button>
                        <button onClick={() => {}} className="text-red-500 hover:text-red-600">
                          <i className="fa-solid fa-trash"></i>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

export default EditSection;
