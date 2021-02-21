package com.tse.model;

public class ComplexSearchFieldsDeserialisation {
    private String typeOfFood;
    private int numberOfServings;
    private String timeToCook;
    private String numberOfCalories;

    public ComplexSearchFieldsDeserialisation(String typeOfFood, int numberOfServings, String timeToCook, String numberOfCalories) {
        this.typeOfFood = typeOfFood;
        this.numberOfServings = numberOfServings;
        this.timeToCook = timeToCook;
        this.numberOfCalories = numberOfCalories;
    }

    public String getTypeOfFood() {
        return typeOfFood;
    }

    public int getNumberOfServings() {
        return numberOfServings;
    }

    public String getTimeToCook() {
        return timeToCook;
    }

    public String getNumberOfCalories() {
        return numberOfCalories;
    }
}
