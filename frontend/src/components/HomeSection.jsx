// ==================== HOME SECTION ====================
import { useMemo } from 'react';
import AnimatedCounter from './AnimatedCounter';
import RatingBadge from './RatingBadge';
import { FLAGS } from '../data/constants';

function HomeSection({ setCurrentPage, players }) {
    const stats = useMemo(() => {
        const topScorer = [...players].sort((a,b) => b.goals - a.goals)[0];
        const topAssists = [...players].sort((a,b) => b.assists - a.assists)[0];
        const avgRating = (players.reduce((s,p) => s+p.rating, 0)/players.length).toFixed(1);
        return { topScorer, topAssists, avgRating, total: players.length, teams: new Set(players.map(p=>p.team)).size };
    }, [players]);

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
                        Brasileirão Série A 2024 - Dados não atualizados
                    </div>
                    <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black text-white leading-[1.1] mb-6">
                        Scouting de<br/>
                        <span className="text-gradient">Alto Nível</span>
                    </h1>
                    <p className="text-lg sm:text-xl text-white/70 mb-10 max-w-2xl mx-auto">
                        Base de dados completa do campeonato brasileiro. Analise jogadores por time, nacionalidade ou utilize filtros avançados.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <button onClick={() => setCurrentPage('pesquisa')} className="px-8 py-4 bg-gradient-to-r from-br-green to-emerald-600 text-white font-bold rounded-2xl shadow-lg shadow-br-green/30 hover:shadow-br-green/50 transition-all duration-300 hover:scale-105">
                            <i className="fa-solid fa-search mr-2"></i>Explorar Jogadores
                        </button>
                        <button onClick={() => setCurrentPage('times')} className="px-8 py-4 border-2 border-white/30 text-white font-bold rounded-2xl hover:bg-white/10 transition-all duration-300 hover:scale-105 backdrop-blur-sm">
                            <i className="fa-solid fa-shield-halved mr-2"></i>Ver por Times
                        </button>
                    </div>
                </div>

                {/* Quick Stats */}
                <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 mb-16 animate-slide-up" style={{ animationDelay: '0.2s' }}>
                    {[
                        { label:"Jogadores", value:stats.total, icon:"fa-users", color:"text-blue-400" },
                        { label:"Clubes", value:stats.teams, icon:"fa-shield-halved", color:"text-br-green" },
                        { label:"Média Rating", value:stats.avgRating, icon:"fa-star", color:"text-yellow-400" },
                        { label:"Artilheiro", value:stats.topScorer.name, sub:`${stats.topScorer.goals} gols`, icon:"fa-futbol", color:"text-red-400" },
                        { label:"Mais Assist.", value:stats.topAssists.name, sub:`${stats.topAssists.assists} assist.`, icon:"fa-hand-point-up", color:"text-purple-400" },
                    ].map((s, i) => (
                        <div key={i} className="glass rounded-2xl p-4 text-center card-hover cursor-pointer" onClick={() => setCurrentPage('pesquisa')}>
                            <div className={`text-2xl mb-2 ${s.color}`}><i className={`fa-solid ${s.icon}`}></i></div>
                            <div className="text-white font-black text-lg truncate">
                                {typeof s.value === 'number' ? <AnimatedCounter target={s.value} /> : s.value}
                            </div>
                            <div className="text-white/50 text-xs">{s.label}</div>
                            {s.sub && <div className="text-white/40 text-[10px] mt-1">{s.sub}</div>}
                        </div>
                    ))}
                </div>

                {/* Featured Players */}
                <div className="animate-slide-up" style={{ animationDelay: '0.4s' }}>
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-2xl font-bold text-white">Destaques da Rodada</h2>
                        <button onClick={() => setCurrentPage('pesquisa')} className="text-br-green text-sm font-semibold hover:underline">Ver todos →</button>
                    </div>
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {[...players].sort((a,b) => b.rating - a.rating).slice(0,6).map(p => (
                            <div key={p.id} className="glass rounded-2xl p-4 flex items-center gap-4 card-hover cursor-pointer" onClick={() => setCurrentPage('pesquisa')}>
                                <div className="w-14 h-14 bg-gradient-to-br from-br-green to-emerald-800 rounded-xl flex items-center justify-center text-2xl shadow-lg">
                                    {FLAGS[p.nationality] || "🇧"}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-2">
                                        <h3 className="text-white font-bold truncate">{p.name}</h3>
                                        <RatingBadge rating={p.rating} />
                                    </div>
                                    <p className="text-white/50 text-sm">{p.position} • {p.team}</p>
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
