import axios from 'axios'

const API_BASE_URL = '/player'

export const fetchPlayers = async () => {
  try {
    const response = await axios.get(API_BASE_URL)
    return response.data
  } catch (error) {
    console.error('Error fetching players:', error)
    throw error
  }
}

export const deletePlayer = async (id) => {
  try {
    await axios.delete(`${API_BASE_URL}/${id}`)
  } catch (error) {
    console.error('Error deleting player:', error)
    throw error
  }
}

export const savePlayer = async (playerData, editingPlayer = null) => {
  try {
    if (editingPlayer) {
      await axios.put(`${API_BASE_URL}/${editingPlayer.id}`, {
        ...playerData,
        id: editingPlayer.id
      })
    } else {
      await axios.post(API_BASE_URL, playerData)
    }
  } catch (error) {
    console.error('Error saving player:', error)
    throw error
  }
}

export const getPositionColor = (position) => {
  if (!position) return 'bg-gray-500'
  const pos = position.toLowerCase()
  if (pos.includes('goleir') || pos.includes('goalkeeper')) return 'bg-yellow-500'
  if (pos.includes('defes') || pos.includes('defender') || pos.includes('back')) return 'bg-blue-500'
  if (pos.includes('meio') || pos.includes('midfield')) return 'bg-green-500'
  if (pos.includes('atac') || pos.includes('forward') || pos.includes('striker')) return 'bg-red-500'
  return 'bg-gray-500'
}

export const getRatingColor = (rating) => {
  if (rating >= 85) return 'text-green-500'
  if (rating >= 75) return 'text-blue-500'
  if (rating >= 65) return 'text-yellow-500'
  return 'text-red-500'
}
