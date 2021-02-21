package com.tse.model;

import com.tse.entity.Advices;
import com.tse.entity.Recipe;
import com.tse.entity.ShoppingList;
import com.tse.entity.User;
import java.net.URL;
import java.util.List;
import java.util.UUID;

public interface DBManager {

    //Dealing with users

    User getUser(UUID userId);
    boolean addUser(User user);
    boolean updateUser(UUID id, User updatedUser);
    boolean deleteUser(UUID id);
    List<User> getUsers();
    boolean changePassword(UUID id, String password);
    boolean checkDuplicateUser(String email);
    List<UUID> getUserIdByName(String userName);

    //Dealing with recipes

    boolean addRecipe(Recipe recipe);
    List<Recipe> getSearchedRecipes(String searchInput);
    List<Recipe> getAllRecipes();
    List<Recipe> getAutocompleteSearch(String searchInput);
    List<Recipe> getFavouritesList(UUID id);
    boolean addShoppingList(ShoppingList sl);
    List<String> getNameOfRecipesFromShoppingList(UUID userId);
    List<String> getIngredientsForARecipeName(String recipeName);
    URL recipePicURL(String nameOfRecipe);
    List<String> getIngredientsForAllRecipes();
    List<Recipe> getRecipeByIngredients(List<String> ingredientList);
    boolean checkDuplicatedRecipeInUserFavourites(UUID userId, UUID recipeId);
    boolean checkRecipeDuplicates(String nameOfRecipe);
    boolean checkDuplicatesInShoppingList(UUID userId, String nameOfRecipe);
    List<Recipe> getRecipesFromComplexSearch(String typeOfFood, int numberOfServings, String timeToCook);
    List<UUID> getRecipeIdByName(String nameOfRecipe);
    boolean deleteFromFavourites(UUID userId, UUID recipeId);
    boolean deleteFromShoppingList(UUID userId, String nameOfRecipe);
    boolean deleteAllFavouritesForAUser(UUID userId);
    boolean deleteAllShoppingListsForAUser(UUID userId);

    // Dealing with advices
    List<Advices> getAllAdvices();
}
