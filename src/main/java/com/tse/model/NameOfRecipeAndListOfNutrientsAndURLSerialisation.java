package com.tse.model;

import java.net.URL;
import java.util.List;

public class NameOfRecipeAndListOfNutrientsAndURLSerialisation {
    private String nameOfRecipe;
    private URL picURL;
    private List<String> nutrients;

    public NameOfRecipeAndListOfNutrientsAndURLSerialisation(String nameOfRecipe, URL picURL, List<String> nutrients) {
        this.nameOfRecipe = nameOfRecipe;
        this.picURL = picURL;
        this.nutrients = nutrients;
    }

    public String getNameOfRecipe() {
        return nameOfRecipe;
    }

    public List<String> getNutrients() {
        return nutrients;
    }

    public URL getPicURL() {
        return picURL;
    }
}
