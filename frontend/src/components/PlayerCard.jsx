import { getPositionColor, getRatingColor } from '../utils/api'

function PlayerCard({ player, darkMode, onEdit, onDelete }) {
  const handleDelete = () => {
    if (window.confirm('Tem certeza que deseja deletar este jogador?')) {
      onDelete(player.id)
    }
  }

  return (
    <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-lg overflow-hidden`}>
      <div className={`${getPositionColor(player.position)} h-2`}></div>
      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="text-xl font-bold">{player.name}</h3>
            <p className={`${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>{player.teamName}</p>
          </div>
          <span className={`text-2xl font-bold ${getRatingColor(player.rating)}`}>
            {player.rating || '-'}
          </span>
        </div>
        <div className="grid grid-cols-3 gap-4 mb-4">
          <div className="text-center">
            <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Camisa</p>
            <p className="font-semibold">{player.number}</p>
          </div>
          <div className="text-center">
            <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Gols</p>
            <p className="font-semibold">{player.goals || 0}</p>
          </div>
          <div className="text-center">
            <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Assistências</p>
            <p className="font-semibold">{player.assists || 0}</p>
          </div>
        </div>
        <div className="flex justify-between items-center">
          <span className={`px-3 py-1 rounded-full text-sm ${darkMode ? 'bg-gray-700' : 'bg-gray-200'}`}>
            {player.position}
          </span>
          <span className={`px-3 py-1 rounded-full text-sm ${darkMode ? 'bg-gray-700' : 'bg-gray-200'}`}>
            {player.nation}
          </span>
        </div>
        <div className="mt-4 flex space-x-2">
          <button
            onClick={() => onEdit(player)}
            className="flex-1 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Editar
          </button>
          <button
            onClick={handleDelete}
            className="flex-1 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
          >
            Deletar
          </button>
        </div>
      </div>
    </div>
  )
}

export default PlayerCard
