package com.tse.model;

import java.net.URL;

public class NutrientsUrlIngredients {
    private String ingredientName;
    private double saturatedFat;
    private double cholesterol;
    private double potassium;
    private double sugars;
    private double protein;
    private double totalCarbohydrates;
    private double calories;
    private double sodium;
    private URL ingredientURL;

    public NutrientsUrlIngredients(String ingredientName, double saturatedFat, double cholesterol, double potassium, double sugars, double protein, double totalCarbohydrates, double calories, double sodium, URL ingredientURL) {
        this.ingredientName = ingredientName;
        this.saturatedFat = saturatedFat;
        this.cholesterol = cholesterol;
        this.potassium = potassium;
        this.sugars = sugars;
        this.protein = protein;
        this.totalCarbohydrates = totalCarbohydrates;
        this.calories = calories;
        this.sodium = sodium;
        this.ingredientURL = ingredientURL;
    }


    public String getIngredientName() {
        return ingredientName;
    }

    public double getSaturatedFat() {
        return saturatedFat;
    }

    public double getCholesterol() {
        return cholesterol;
    }

    public double getPotassium() {
        return potassium;
    }

    public double getSugars() {
        return sugars;
    }

    public double getProtein() {
        return protein;
    }

    public double getTotalCarbohydrates() {
        return totalCarbohydrates;
    }

    public double getCalories() {
        return calories;
    }

    public double getSodium() {
        return sodium;
    }

    public URL getIngredientURL() {
        return ingredientURL;
    }
}

