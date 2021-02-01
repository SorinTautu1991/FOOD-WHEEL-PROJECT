package com.tse.entity;

import java.util.UUID;

public class FavouritesRecipes {
    private UUID id;
    private UUID userId;
    private UUID recipeId;

    public FavouritesRecipes(UUID userId, UUID recipeId) {
        this.id = UUID.randomUUID();
        this.userId = userId;
        this.recipeId = recipeId;
    }

    public UUID getId() {
        return id;
    }

    public UUID getRecipeId() {
        return recipeId;
    }

    public UUID getUserId() {
        return userId;
    }
}
