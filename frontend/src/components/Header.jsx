function Header({ darkMode, setDarkMode, currentPage, setCurrentPage }) {
  return (
    <header className={`${darkMode ? 'bg-gray-800' : 'bg-green-600'} shadow-lg`}>
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-white">BR Scout</h1>
          <nav className="space-x-4">
            <button 
              onClick={() => setCurrentPage('home')}
              className={`px-3 py-2 rounded ${currentPage === 'home' ? 'bg-white/20' : 'hover:bg-white/10'} text-white`}
            >
              Home
            </button>
            <button 
              onClick={() => setCurrentPage('teams')}
              className={`px-3 py-2 rounded ${currentPage === 'teams' ? 'bg-white/20' : 'hover:bg-white/10'} text-white`}
            >
              Times
            </button>
            <button 
              onClick={() => setCurrentPage('nations')}
              className={`px-3 py-2 rounded ${currentPage === 'nations' ? 'bg-white/20' : 'hover:bg-white/10'} text-white`}
            >
              Nacionalidades
            </button>
            <button 
              onClick={() => setCurrentPage('search')}
              className={`px-3 py-2 rounded ${currentPage === 'search' ? 'bg-white/20' : 'hover:bg-white/10'} text-white`}
            >
              Pesquisa Avançada
            </button>
          </nav>
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="px-4 py-2 bg-white/20 rounded hover:bg-white/30 text-white"
          >
            {darkMode ? '☀️ Light' : '🌙 Dark'}
          </button>
        </div>
      </div>
    </header>
  )
}

export default Header
