package com.tse.model;

public class NameOfRecipeAndActiveUserDeserialisation {
    private String nameOfRecipe;
    private String activeUser;

    public NameOfRecipeAndActiveUserDeserialisation(String nameOfRecipe, String activeUser) {
        this.nameOfRecipe = nameOfRecipe;
        this.activeUser = activeUser;
    }

    public String getNameOfRecipe() {
        return nameOfRecipe;
    }

    public String getActiveUser() {
        return activeUser;
    }
}
