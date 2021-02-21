package com.tse.entity;

import java.net.URL;
import java.util.UUID;

public class Recipe {
    private UUID id;
    private String nameOfRecipe;
    private String timeToCook;
    private int servings;
    private String ingredients;
    private String instructions;
    private String typeOfFood;
    private URL cloudUrlPicture;
    private String countryOfOrigin;
    private URL flag;
    private String nutrients;

    public Recipe(String nameOfRecipe, String timeToCook, int servings, String ingredients, String instructions, String typeOfFood, URL cloudUrlPicture, String countryOfOrigin, URL flag, String nutrients) {
        this.id = UUID.randomUUID();
        this.nameOfRecipe = nameOfRecipe;
        this.timeToCook = timeToCook;
        this.servings = servings;
        this.ingredients = ingredients;
        this.instructions = instructions;
        this.typeOfFood = typeOfFood;
        this.cloudUrlPicture = cloudUrlPicture;
        this.countryOfOrigin = countryOfOrigin;
        this.flag = flag;
        this.nutrients = nutrients;
    }

    public Recipe(UUID id, String nameOfRecipe, String timeToCook, int servings, String ingredients, String instructions, String typeOfFood, URL cloudUrlPicture, String countryOfOrigin, URL flag, String nutrients){
        this.id = id;
        this.nameOfRecipe = nameOfRecipe;
        this.timeToCook = timeToCook;
        this.servings = servings;
        this.ingredients = ingredients;
        this.instructions = instructions;
        this.typeOfFood = typeOfFood;
        this.cloudUrlPicture = cloudUrlPicture;
        this.countryOfOrigin = countryOfOrigin;
        this.flag = flag;
        this.nutrients = nutrients;
    }

    public UUID getId() {
        return id;
    }

    public String getNameOfRecipe() {
        return nameOfRecipe;
    }

    public String getTimeToCook() {
        return timeToCook;
    }

    public int getServings() {
        return servings;
    }

    public String getIngredients() {
        return ingredients;
    }

    public String getInstructions() {
        return instructions;
    }

    public String getTypeOfFood() {
        return typeOfFood;
    }

    public URL getCloudUrlPicture() {
        return cloudUrlPicture;
    }

    public String getCountryOfOrigin() {
        return countryOfOrigin;
    }

    public URL getFlag() {
        return flag;
    }

    public String getNutrients() {
        return nutrients;
    }
}
