const API_BASE_URL = '/player';

export const api = {
  // Buscar todos os jogadores ou filtrar por parâmetros
  async getPlayers(filters = {}) {
    const queryParams = new URLSearchParams();
    if (filters.name) queryParams.append('name', filters.name);
    if (filters.team) queryParams.append('team', filters.team);
    if (filters.position) queryParams.append('position', filters.position);
    if (filters.nation) queryParams.append('nation', filters.nation);
    
    const url = queryParams.toString() 
      ? `${API_BASE_URL}?${queryParams.toString()}`
      : API_BASE_URL;
    
    const response = await fetch(url);
    if (!response.ok) throw new Error('Erro ao buscar jogadores');
    const data = await response.json();
    
    // Mapear campos do backend para o formato esperado pelo frontend
    return data.map(player => ({
      ...player,
      team: player.teamName,
      nationality: player.nation
    }));
  },

  // Buscar jogador por ID
  async getPlayerById(id) {
    const response = await fetch(`${API_BASE_URL}/${id}`);
    if (!response.ok) throw new Error('Jogador não encontrado');
    return await response.json();
  },

  // Adicionar novo jogador
  async addPlayer(playerData) {
    const response = await fetch(API_BASE_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(playerData),
    });
    if (!response.ok) throw new Error('Erro ao adicionar jogador');
    return await response.json();
  },

  // Atualizar jogador
  async updatePlayer(id, playerData) {
    const response = await fetch(`${API_BASE_URL}/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(playerData),
    });
    if (!response.ok) throw new Error('Erro ao atualizar jogador');
    return await response.json();
  },

  // Deletar jogador
  async deletePlayer(id) {
    const response = await fetch(`${API_BASE_URL}/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) throw new Error('Erro ao deletar jogador');
    return await response.text();
  },
};
