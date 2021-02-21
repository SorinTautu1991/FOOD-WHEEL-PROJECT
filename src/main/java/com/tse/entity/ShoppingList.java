package com.tse.entity;

import java.util.UUID;

public class ShoppingList {
    private UUID id;
    private UUID userId;
    private String nameOfRecipe;

    public ShoppingList(UUID userId, String nameOfRecipe) {
        this.id = UUID.randomUUID();
        this.userId = userId;
        this.nameOfRecipe = nameOfRecipe;
    }

    public UUID getId() {
        return id;
    }

    public UUID getUserId() {
        return userId;
    }

    public String getNameOfRecipe() {
        return nameOfRecipe;
    }
}
