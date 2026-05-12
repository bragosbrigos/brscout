package com.brscout.brscout.Model;

import jakarta.persistence.*;

@Entity
@Table(name = "player_stats")
public class PlayerModel {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    private String teamName;
    private int number;
    private String nation;
    private String position;
    private Integer age;
    private Integer rating;
    private Integer goals;
    private Integer assists;

    public PlayerModel() {
    }

    public PlayerModel(String name, String teamName, int number, String nation, String position, Integer age, Integer rating, Integer goals, Integer assists) {
        this.name = name;
        this.teamName = teamName;
        this.number = number;
        this.nation = nation;
        this.position = position;
        this.age = age;
        this.rating = rating;
        this.goals = goals;
        this.assists = assists;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getTeamName() {
        return teamName;
    }

    public void setTeamName(String teamName) {
        this.teamName = teamName;
    }

    public int getNumber() {
        return number;
    }

    public void setNumber(int number) {
        this.number = number;
    }

    public String getNation() {
        return nation;
    }

    public void setNation(String nation) {
        this.nation = nation;
    }

    public String getPosition() {
        return position;
    }

    public void setPosition(String position) {
        this.position = position;
    }

    public int getAge() {
        return age;
    }

    public void setAge(Integer age) {
        this.age = age;
    }

    public Integer getRating() {
        return rating;
    }

    public void setRating(Integer rating) {
        this.rating = rating;
    }

    public Integer getGoals() {
        return goals;
    }

    public void setGoals(Integer goals) {
        this.goals = goals;
    }

    public Integer getAssists() {
        return assists;
    }

    public void setAssists(Integer assists) {
        this.assists = assists;
    }
}
