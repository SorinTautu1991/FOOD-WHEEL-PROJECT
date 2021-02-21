package com.tse.model;

import java.net.URL;

public class IngredientNameAndPicUrlSerialisation {
    private String ingredientName;
    private URL picURL;

    public IngredientNameAndPicUrlSerialisation(String ingredientName, URL picURL) {
        this.ingredientName = ingredientName;
        this.picURL = picURL;
    }

    public String getIngredientName() {
        return ingredientName;
    }

    public URL getPicURL() {
        return picURL;
    }
}
