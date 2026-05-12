// ==================== TEAMS SECTION ====================
import { useState } from 'react';
import RatingBadge from './RatingBadge';
import ProgressBar from './ProgressBar';
import { TEAMS, FLAGS, TEAM_COLORS, POSITIONS, NATIONS } from '../data/constants';

function TeamsSection({ players, setPlayers }) {
    const [selectedTeam, setSelectedTeam] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [editing, setEditing] = useState(null);
    const [form, setForm] = useState({ name:"", team:"", position:"ATA", nationality:"Brasil", rating:7.0, goals:0, assists:0, age:20 });

    const teamPlayers = selectedTeam ? players.filter(p => p.team === selectedTeam) : [];

    const handleSave = () => {
        if (!form.name || !form.team) return;
        if (editing) {
            setPlayers(players.map(p => p.id === editing.id ? {...form, id:editing.id} : p));
        } else {
            setPlayers([...players, {...form, id: Date.now()}]);
        }
        setShowModal(false);
        setEditing(null);
        setForm({ name:"", team:"", position:"ATA", nationality:"Brasil", rating:7.0, goals:0, assists:0, age:20 });
    };

    const handleDelete = (id) => {
        if (confirm("Tem certeza que deseja remover este jogador?")) {
            setPlayers(players.filter(p => p.id !== id));
        }
    };

    return (
        <section className="pt-28 pb-20 min-h-screen bg-gray-50 dark:bg-br-dark">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h2 className="text-3xl font-black text-gray-900 dark:text-white">Clubes do Brasileirão</h2>
                        <p className="text-gray-500 dark:text-gray-400 mt-1">Selecione um time para ver o elenco</p>
                    </div>
                    <button onClick={() => { setEditing(null); setShowModal(true); }} className="px-4 py-2 bg-br-green text-white rounded-xl font-semibold hover:bg-emerald-600 transition-colors shadow-lg shadow-br-green/20">
                        <i className="fa-solid fa-plus mr-2"></i>Adicionar Jogador
                    </button>
                </div>

                {/* Team Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 mb-10">
                    {TEAMS.map(team => {
                        const count = players.filter(p => p.team === team).length;
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
                                <p className="text-xs text-gray-500 mt-1">{count} jogadores</p>
                                {isActive && <div className="absolute top-2 right-2 w-2 h-2 bg-br-green rounded-full"></div>}
                            </button>
                        );
                    })}
                </div>

                {/* Player List */}
                {selectedTeam && (
                    <div className="animate-slide-up">
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="text-xl font-bold text-gray-900 dark:text-white">Elenco: {selectedTeam}</h3>
                            <span className="text-sm text-gray-500">{teamPlayers.length} atletas</span>
                        </div>
                        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                            {teamPlayers.map(p => (
                                <div key={p.id} className="bg-white dark:bg-br-card rounded-2xl border border-gray-200 dark:border-gray-700 p-4 card-hover relative group">
                                    <div className="flex items-start justify-between mb-3">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center text-xl">
                                                {FLAGS[p.nationality] || "🇧🇷"}
                                            </div>
                                            <div>
                                                <h4 className="font-bold text-gray-900 dark:text-white">{p.name}</h4>
                                                <p className="text-xs text-gray-500">{p.position} • {p.age} anos</p>
                                            </div>
                                        </div>
                                        <RatingBadge rating={p.rating} />
                                    </div>
                                    <div className="grid grid-cols-2 gap-3 mb-3">
                                        <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-2 text-center">
                                            <div className="text-lg font-black text-red-500">{p.goals}</div>
                                            <div className="text-[10px] text-gray-500 uppercase">Gols</div>
                                        </div>
                                        <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-2 text-center">
                                            <div className="text-lg font-black text-blue-500">{p.assists}</div>
                                            <div className="text-[10px] text-gray-500 uppercase">Assist.</div>
                                        </div>
                                    </div>
                                    <ProgressBar value={p.rating} max={10} color="bg-br-green" height="h-1.5" />
                                    
                                    <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity flex gap-1">
                                        <button onClick={() => { setEditing(p); setForm(p); setShowModal(true); }} className="w-8 h-8 bg-blue-500/20 text-blue-500 rounded-lg flex items-center justify-center hover:bg-blue-500 hover:text-white transition-colors">
                                            <i className="fa-solid fa-pen text-xs"></i>
                                        </button>
                                        <button onClick={() => handleDelete(p.id)} className="w-8 h-8 bg-red-500/20 text-red-500 rounded-lg flex items-center justify-center hover:bg-red-500 hover:text-white transition-colors">
                                            <i className="fa-solid fa-trash text-xs"></i>
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Modal */}
                {showModal && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in" onClick={() => setShowModal(false)}>
                        <div className="bg-white dark:bg-br-card rounded-3xl border border-gray-200 dark:border-gray-700 p-6 w-full max-w-lg shadow-2xl animate-scale-in" onClick={e => e.stopPropagation()}>
                            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">{editing ? "Editar Jogador" : "Novo Jogador"}</h3>
                            <div className="grid grid-cols-2 gap-4 mb-4">
                                <input type="text" placeholder="Nome" value={form.name} onChange={e => setForm({...form, name:e.target.value})} className="col-span-2 px-4 py-3 rounded-xl text-gray-900 dark:text-white dark:bg-gray-800" />
                                <select value={form.team} onChange={e => setForm({...form, team:e.target.value})} className="px-4 py-3 rounded-xl text-gray-900 dark:text-white dark:bg-gray-800">
                                    <option value="">Selecione o Time</option>
                                    {TEAMS.map(t => <option key={t} value={t}>{t}</option>)}
                                </select>
                                <select value={form.position} onChange={e => setForm({...form, position:e.target.value})} className="px-4 py-3 rounded-xl text-gray-900 dark:text-white dark:bg-gray-800">
                                    {POSITIONS.map(p => <option key={p} value={p}>{p}</option>)}
                                </select>
                                <select value={form.nationality} onChange={e => setForm({...form, nationality:e.target.value})} className="px-4 py-3 rounded-xl text-gray-900 dark:text-white dark:bg-gray-800">
                                    {NATIONS.map(n => <option key={n} value={n}>{n}</option>)}
                                </select>
                                <input type="number" step="0.1" min="0" max="10" placeholder="Rating (0-10)" value={form.rating} onChange={e => setForm({...form, rating:parseFloat(e.target.value)})} className="px-4 py-3 rounded-xl text-gray-900 dark:text-white dark:bg-gray-800" />
                                <input type="number" placeholder="Gols" value={form.goals} onChange={e => setForm({...form, goals:parseInt(e.target.value)})} className="px-4 py-3 rounded-xl text-gray-900 dark:text-white dark:bg-gray-800" />
                                <input type="number" placeholder="Assistências" value={form.assists} onChange={e => setForm({...form, assists:parseInt(e.target.value)})} className="px-4 py-3 rounded-xl text-gray-900 dark:text-white dark:bg-gray-800" />
                                <input type="number" placeholder="Idade" value={form.age} onChange={e => setForm({...form, age:parseInt(e.target.value)})} className="px-4 py-3 rounded-xl text-gray-900 dark:text-white dark:bg-gray-800" />
                            </div>
                            <div className="flex gap-3 justify-end">
                                <button onClick={() => setShowModal(false)} className="px-4 py-2 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 font-medium">Cancelar</button>
                                <button onClick={handleSave} className="px-6 py-2 bg-br-green text-white rounded-xl font-semibold hover:bg-emerald-600 transition-colors">Salvar</button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </section>
    );
}

export default TeamsSection;
