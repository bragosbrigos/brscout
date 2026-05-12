package com.brscout.brscout.Controller;

import com.brscout.brscout.Model.PlayerModel;
import com.brscout.brscout.Service.PlayerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("player")
@CrossOrigin(origins = "*")
public class PlayerController {

    private final PlayerService playerService;

    @Autowired
    public PlayerController(PlayerService playerService) {
        this.playerService = playerService;
    }

    @GetMapping
    public List<PlayerModel> getPlayers(
            @RequestParam(required = false) String name,
            @RequestParam(required = false) String team,
            @RequestParam(required = false) String position,
            @RequestParam(required = false) String nation){
        if(name != null){
            return playerService.getPlayersByName(name);
        }else if(team != null){
        return  playerService.getPlayersByTeam(team);}
        else if(position != null){
            return  playerService.getPlayersByPosition(position);
        }
        else if(nation != null){
            return playerService.getPlayersByNation(nation);
        }
        else {
            return playerService.getPlayers();
        }
    }

    @PostMapping
    public ResponseEntity<PlayerModel> addPlayer(@RequestBody PlayerModel playerModel){
        PlayerModel createdPlayer = playerService.addPlayer(playerModel);
        return new ResponseEntity<>(createdPlayer, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<PlayerModel> updatePlayer(@PathVariable Long id, @RequestBody PlayerModel playerModel){
        playerModel.setId(id);
        PlayerModel resultPlayer = playerService.updatePlayer(playerModel);
        if(resultPlayer != null){
            return new ResponseEntity<>(resultPlayer, HttpStatus.OK);
        }
        else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deletePlayer(@PathVariable Long id){
        playerService.deletePlayer(id);
        return new ResponseEntity<>("Player deleted successfully", HttpStatus.OK);
    }
}
