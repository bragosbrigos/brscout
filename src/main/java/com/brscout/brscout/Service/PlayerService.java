package com.brscout.brscout.Service;

import com.brscout.brscout.Model.PlayerModel;
import com.brscout.brscout.Repository.PlayerRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Locale;
import java.util.Optional;
import java.util.Random;
import java.util.stream.Collectors;

@Component
public class PlayerService {
    private final PlayerRepository playerRepository;
    private final Random random = new Random();

    @Autowired
    public PlayerService(PlayerRepository playerRepository) {
        this.playerRepository = playerRepository;
    }

    public List<PlayerModel> getPlayers() {
        return playerRepository.findAll();
    }

    public List<PlayerModel> getPlayersByTeam(String teamName){
        return playerRepository.findAll().stream()
                .filter(player -> player.getTeamName().toLowerCase().contains(teamName.toLowerCase()))
                .collect(Collectors.toList());
    }

    public List<PlayerModel> getPlayersByName(String name) {
        return playerRepository.findAll().stream()
                .filter(player -> player.getName().toLowerCase().contains(name.toLowerCase()))
                .collect(Collectors.toList());
    }

    public List<PlayerModel> getPlayersByPosition(String position){
        return playerRepository.findAll().stream()
                .filter(player -> player.getPosition().toLowerCase().contains(position.toLowerCase()))
                .collect(Collectors.toList());
    }

    public List<PlayerModel> getPlayersByNation(String nation){
        return playerRepository.findAll().stream()
                .filter(player -> player.getNation() != null &&
                        player.getNation().toLowerCase().contains(nation.toLowerCase()))
                .collect(Collectors.toList());
    }

    public PlayerModel addPlayer(PlayerModel playerModel){
        generatePlayerStats(playerModel);
        playerRepository.save(playerModel);
        return playerModel;
    }

    public PlayerModel updatePlayer(PlayerModel updatedPlayerModel){
        Optional<PlayerModel> existingPlayer = playerRepository.findById(updatedPlayerModel.getId());
        if(existingPlayer.isPresent()){
            PlayerModel playerToUpdate = existingPlayer.get();
            playerToUpdate.setName(updatedPlayerModel.getName());
            playerToUpdate.setPosition(updatedPlayerModel.getPosition());
            playerToUpdate.setNation(updatedPlayerModel.getNation());
            playerToUpdate.setTeamName(updatedPlayerModel.getTeamName());
            playerToUpdate.setAge(updatedPlayerModel.getAge());
            playerToUpdate.setNumber(updatedPlayerModel.getNumber());
            playerToUpdate.setRating(updatedPlayerModel.getRating());
            playerToUpdate.setGoals(updatedPlayerModel.getGoals());
            playerToUpdate.setAssists(updatedPlayerModel.getAssists());

            playerRepository.save(playerToUpdate);
            return playerToUpdate;
        }
        return null;
    }

    @Transactional
    public void deletePlayer(Long playerId){
        playerRepository.deleteById(playerId);
    }

    private void generatePlayerStats(PlayerModel playerModel) {
        String position = playerModel.getPosition() != null ? playerModel.getPosition().toLowerCase() : "";
        
        // Rating based on position (attackers tend to have higher visibility)
        int baseRating;
        if (position.contains("atac") || position.contains("forward") || position.contains("striker")) {
            baseRating = 75 + random.nextInt(20); // 75-94
        } else if (position.contains("meio") || position.contains("midfield")) {
            baseRating = 70 + random.nextInt(25); // 70-94
        } else if (position.contains("defes") || position.contains("defender") || position.contains("back")) {
            baseRating = 68 + random.nextInt(24); // 68-91
        } else if (position.contains("goleir") || position.contains("goalkeeper") || position.contains("keeper")) {
            baseRating = 65 + random.nextInt(30); // 65-94
        } else {
            baseRating = 60 + random.nextInt(35); // 60-94 (default)
        }
        playerModel.setRating(baseRating);

        // Goals based on position
        int goals;
        if (position.contains("atac") || position.contains("forward") || position.contains("striker")) {
            goals = random.nextInt(30); // 0-29
        } else if (position.contains("meio") || position.contains("midfield")) {
            goals = random.nextInt(15); // 0-14
        } else {
            goals = random.nextInt(5); // 0-4
        }
        playerModel.setGoals(goals);

        // Assists based on position
        int assists;
        if (position.contains("meio") || position.contains("midfield") || position.contains("wing")) {
            assists = random.nextInt(20); // 0-19
        } else if (position.contains("atac") || position.contains("forward")) {
            assists = random.nextInt(15); // 0-14
        } else {
            assists = random.nextInt(8); // 0-7
        }
        playerModel.setAssists(assists);
    }
}
