package com.tse.model;

public class NameOfRecipeAndCaloriesSerialisation {
    private String nameOfRecipe;
    private double calories;

    public NameOfRecipeAndCaloriesSerialisation(String nameOfRecipe, double calories) {
        this.nameOfRecipe = nameOfRecipe;
        this.calories = calories;
    }

    public String getNameOfRecipe() {
        return nameOfRecipe;
    }

    public double getCalories() {
        return calories;
    }
}
