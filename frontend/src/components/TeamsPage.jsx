function TeamsPage({ teams, players, darkMode }) {
  return (
    <div>
      <h2 className="text-3xl font-bold mb-6">Times</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {teams.map(team => (
          <div key={team} className={`${darkMode ? 'bg-gray-800' : 'bg-white'} p-6 rounded-lg shadow-lg text-center`}>
            <h3 className="font-bold text-lg mb-2">{team}</h3>
            <p className={`${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              {players.filter(p => p.teamName === team).length} jogadores
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default TeamsPage
