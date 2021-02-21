package com.tse.servlets;

import com.google.gson.Gson;
import com.tse.entity.Recipe;
import com.tse.model.DBManagement;
import com.tse.model.DBManager;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Random;

@WebServlet(urlPatterns = {"/randomHome"})
public class WheelSpinHome extends HttpServlet {
    private DBManager instance;
    private Gson gson;

    @Override
    public void init() throws ServletException {
        instance = DBManagement.getInstance();
        this.gson = new Gson();
    }

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        List<Recipe> recipes = DBManagement.getInstance().getAllRecipes();
        for(Recipe recipe: recipes){
            System.out.println("Recipes that got to servlet from db all:- " + recipe.getNameOfRecipe());
        }
        Random random = new Random();
        Recipe randomRecipe = recipes.get(random.nextInt(recipes.size()));
        Recipe respRecipe = new Recipe(randomRecipe.getId(), randomRecipe.getNameOfRecipe(),
                randomRecipe.getTimeToCook(), randomRecipe.getServings(), randomRecipe.getIngredients(),
                randomRecipe.getInstructions(), randomRecipe.getTypeOfFood(), randomRecipe.getCloudUrlPicture(),
                randomRecipe.getCountryOfOrigin(), randomRecipe.getFlag(), randomRecipe.getNutrients());
        List<Recipe> recipes1 = new ArrayList<>();
        recipes1.add(respRecipe);
        resp.setContentType("application/json");
        resp.getWriter().write(gson.toJson(recipes1));
    }
}
