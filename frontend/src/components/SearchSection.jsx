// ==================== SEARCH SECTION ====================
import { useState, useMemo } from 'react';
import RatingBadge from './RatingBadge';
import ProgressBar from './ProgressBar';
import { TEAMS, POSITIONS, NATIONS, FLAGS } from '../data/constants';

function SearchSection({ players }) {
    const [query, setQuery] = useState("");
    const [filters, setFilters] = useState({ team:"", position:"", nation:"", minRating:0, maxRating:10 });
    const [showFilters, setShowFilters] = useState(false);

    const filtered = useMemo(() => {
        return players.filter(p => {
            const matchQuery = p.name.toLowerCase().includes(query.toLowerCase());
            const matchTeam = !filters.team || p.team === filters.team;
            const matchPos = !filters.position || p.position === filters.position;
            const matchNation = !filters.nation || p.nationality === filters.nation;
            const matchRating = p.rating >= filters.minRating && p.rating <= filters.maxRating;
            return matchQuery && matchTeam && matchPos && matchNation && matchRating;
        });
    }, [players, query, filters]);

    const resetFilters = () => {
        setQuery("");
        setFilters({ team:"", position:"", nation:"", minRating:0, maxRating:10 });
    };

    return (
        <section className="pt-28 pb-20 min-h-screen bg-gray-50 dark:bg-br-dark">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-10">
                    <h2 className="text-3xl font-black text-gray-900 dark:text-white mb-2">Pesquisa Avançada</h2>
                    <p className="text-gray-500 dark:text-gray-400">Encontre exatamente o jogador que procura</p>
                </div>

                {/* Search Bar */}
                <div className="max-w-3xl mx-auto mb-6 relative">
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                        <i className="fa-solid fa-search"></i>
                    </div>
                    <input type="text" placeholder="Buscar por nome do jogador..." value={query} onChange={e => setQuery(e.target.value)}
                        className="w-full pl-12 pr-12 py-4 rounded-2xl text-lg bg-white dark:bg-br-card border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white shadow-lg focus:border-br-green transition-colors" />
                    <button onClick={() => setShowFilters(!showFilters)} className={`absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-xl transition-colors ${showFilters ? 'bg-br-green text-white' : 'text-gray-400 hover:text-gray-600'}`}>
                        <i className="fa-solid fa-sliders"></i>
                    </button>
                </div>

                {/* Filters */}
                {showFilters && (
                    <div className="max-w-3xl mx-auto mb-8 glass p-6 rounded-2xl animate-slide-down">
                        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                            <select value={filters.team} onChange={e => setFilters({...filters, team:e.target.value})} className="px-4 py-2 rounded-xl text-sm text-gray-900 dark:text-white dark:bg-gray-800">
                                <option value="">Todos os Times</option>
                                {TEAMS.map(t => <option key={t} value={t}>{t}</option>)}
                            </select>
                            <select value={filters.position} onChange={e => setFilters({...filters, position:e.target.value})} className="px-4 py-2 rounded-xl text-sm text-gray-900 dark:text-white dark:bg-gray-800">
                                <option value="">Todas Posições</option>
                                {POSITIONS.map(p => <option key={p} value={p}>{p}</option>)}
                            </select>
                            <select value={filters.nation} onChange={e => setFilters({...filters, nation:e.target.value})} className="px-4 py-2 rounded-xl text-sm text-gray-900 dark:text-white dark:bg-gray-800">
                                <option value="">Todas Nacionalidades</option>
                                {NATIONS.map(n => <option key={n} value={n}>{n}</option>)}
                            </select>
                            <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
                                <span className="text-xs text-gray-500">Rating:</span>
                                <input type="range" min="0" max="10" step="0.5" value={filters.maxRating} onChange={e => setFilters({...filters, maxRating:parseFloat(e.target.value)})} className="flex-1 accent-br-green" />
                                <span className="text-sm font-bold text-br-green w-8">{filters.maxRating}</span>
                            </div>
                        </div>
                        <button onClick={resetFilters} className="text-sm text-br-green font-semibold hover:underline">Limpar filtros</button>
                    </div>
                )}

                {/* Results Count */}
                <div className="max-w-6xl mx-auto mb-6 flex items-center justify-between">
                    <span className="text-gray-500 dark:text-gray-400 text-sm">{filtered.length} jogadores encontrados</span>
                    {filtered.length > 0 && <span className="text-xs text-gray-400">Ordenado por rating ↓</span>}
                </div>

                {/* Results Grid */}
                <div className="max-w-6xl mx-auto grid sm:grid-cols-2 lg:grid-cols-3 gap-4 animate-slide-up">
                    {[...filtered].sort((a,b) => b.rating - a.rating).map(p => (
                        <div key={p.id} className="bg-white dark:bg-br-card rounded-2xl border border-gray-200 dark:border-gray-700 p-5 card-hover relative overflow-hidden">
                            <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-br-green to-transparent"></div>
                            <div className="flex items-start justify-between mb-3">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 bg-gray-100 dark:bg-gray-800 rounded-lg flex items-center justify-center text-xl">
                                        {FLAGS[p.nationality] || "🇧"}
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-gray-900 dark:text-white text-lg">{p.name}</h3>
                                        <p className="text-xs text-gray-500">{p.team} • {p.position} • {p.age} anos</p>
                                    </div>
                                </div>
                                <RatingBadge rating={p.rating} />
                            </div>
                            <div className="grid grid-cols-3 gap-2 mb-3">
                                <div className="text-center p-2 bg-gray-50 dark:bg-gray-800 rounded-lg">
                                    <div className="text-lg font-black text-red-500">{p.goals}</div>
                                    <div className="text-[10px] text-gray-500 uppercase tracking-wide">Gols</div>
                                </div>
                                <div className="text-center p-2 bg-gray-50 dark:bg-gray-800 rounded-lg">
                                    <div className="text-lg font-black text-blue-500">{p.assists}</div>
                                    <div className="text-[10px] text-gray-500 uppercase tracking-wide">Assist.</div>
                                </div>
                                <div className="text-center p-2 bg-gray-50 dark:bg-gray-800 rounded-lg">
                                    <div className="text-lg font-black text-yellow-500">{p.age}</div>
                                    <div className="text-[10px] text-gray-500 uppercase tracking-wide">Idade</div>
                                </div>
                            </div>
                            <ProgressBar value={p.rating} max={10} color="bg-gradient-to-r from-br-green to-br-gold" height="h-2" />
                            <div className="flex justify-between text-xs text-gray-400 mt-1">
                                <span>Potencial Scout</span>
                                <span>{p.rating}/10</span>
                            </div>
                        </div>
                    ))}
                </div>

                {filtered.length === 0 && (
                    <div className="text-center py-20">
                        <div className="text-6xl mb-4 opacity-20">🔍</div>
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Nenhum jogador encontrado</h3>
                        <p className="text-gray-500">Tente ajustar os filtros ou buscar por outro nome</p>
                        <button onClick={resetFilters} className="mt-4 px-4 py-2 bg-br-green text-white rounded-xl font-semibold hover:bg-emerald-600 transition-colors">Limpar Pesquisa</button>
                    </div>
                )}
            </div>
        </section>
    );
}

export default SearchSection;
