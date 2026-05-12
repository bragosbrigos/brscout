// ==================== NAVBAR ====================
import { useState, useEffect } from 'react';
import { useTheme } from '../context/ThemeContext';

function Navbar({ currentPage, setCurrentPage }) {
    const { darkMode, toggleDark } = useTheme();
    const [mobileOpen, setMobileOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const h = () => setScrolled(window.scrollY > 20);
        window.addEventListener('scroll', h);
        return () => window.removeEventListener('scroll', h);
    }, []);

    const navItems = [
        { id:'home', label:'Home', icon:'fa-house' },
        { id:'times', label:'Times', icon:'fa-shield-halved' },
        { id:'nacoes', label:'Nacionalidades', icon:'fa-earth-americas' },
        { id:'pesquisa', label:'Pesquisar', icon:'fa-magnifying-glass' },
    ];

    return (
        <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? 'nav-blur bg-white/80 dark:bg-br-dark/90 shadow-lg border-b border-gray-200 dark:border-gray-800' : 'bg-transparent'}`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16 lg:h-20">
                    <button onClick={() => setCurrentPage('home')} className="flex items-center gap-3 group">
                        <div className="relative">
                            <div className="w-10 h-10 lg:w-12 lg:h-12 bg-gradient-to-br from-br-green to-br-gold rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-br-green/40 transition-all duration-300 group-hover:scale-110">
                                <i className="fa-solid fa-binoculars text-white text-lg"></i>
                            </div>
                            <div className="absolute -top-1 -right-1 w-3 h-3 bg-yellow-400 rounded-full animate-pulse border-2 border-white dark:border-br-dark"></div>
                        </div>
                        <div className="hidden sm:block">
                            <h1 className={`text-lg lg:text-xl font-black tracking-tight transition-colors ${scrolled ? 'text-gray-900 dark:text-white' : 'text-white'}`}>
                                BR<span className="text-br-green">Scout</span>
                            </h1>
                            <p className={`text-[10px] font-medium -mt-1 ${scrolled ? 'text-gray-500 dark:text-gray-400' : 'text-white/70'}`}>SCOUTING BRASILEIRÃO</p>
                        </div>
                    </button>

                    <div className="hidden lg:flex items-center gap-1">
                        {navItems.map(item => (
                            <button key={item.id} onClick={() => setCurrentPage(item.id)}
                                className={`relative px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-300 ${currentPage === item.id
                                    ? 'bg-br-green/20 text-br-green'
                                    : scrolled ? 'text-gray-600 dark:text-gray-300 hover:text-br-green hover:bg-br-green/10' : 'text-white/80 hover:text-white hover:bg-white/10'
                                }`}
                            >
                                <i className={`fa-solid ${item.icon} mr-2`}></i>
                                {item.label}
                                {currentPage === item.id && <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-6 h-0.5 bg-br-green rounded-full"></div>}
                            </button>
                        ))}
                    </div>

                    <div className="flex items-center gap-2">
                        <button onClick={toggleDark} className={`p-2.5 rounded-xl transition-all duration-300 hover:scale-110 ${scrolled ? 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800' : 'text-white/80 hover:bg-white/10'}`}>
                            <i className={`fa-solid ${darkMode ? 'fa-sun' : 'fa-moon'} text-lg`}></i>
                        </button>
                        <button onClick={() => setCurrentPage('pesquisa')} className={`hidden sm:flex items-center gap-2 px-4 py-2 rounded-xl transition-all hover:scale-105 ${scrolled ? 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300' : 'bg-white/10 text-white/80'}`}>
                            <i className="fa-solid fa-search text-sm"></i>
                            <span className="text-sm font-medium">Pesquisar Jogador</span>
                        </button>
                        <button onClick={() => setMobileOpen(!mobileOpen)} className={`lg:hidden p-2 rounded-xl ${scrolled ? 'text-gray-600 dark:text-gray-300' : 'text-white'}`}>
                            <i className={`fa-solid ${mobileOpen ? 'fa-xmark' : 'fa-bars'} text-xl`}></i>
                        </button>
                    </div>
                </div>

                {mobileOpen && (
                    <div className="lg:hidden bg-white dark:bg-br-dark border-t dark:border-gray-800 animate-slide-down shadow-xl">
                        <div className="px-4 py-3 space-y-1">
                            {navItems.map(item => (
                                <button key={item.id} onClick={() => { setCurrentPage(item.id); setMobileOpen(false); }}
                                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${currentPage === item.id ? 'bg-br-green/10 text-br-green' : 'text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800'}`}
                                >
                                    <i className={`fa-solid ${item.icon} w-5`}></i>
                                    {item.label}
                                </button>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </nav>
    );
}

export default Navbar;
