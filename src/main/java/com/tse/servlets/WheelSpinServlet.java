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


@WebServlet(urlPatterns = {"/random"})
public class WheelSpinServlet extends HttpServlet {
    private DBManager instance;
    private Gson gson;


    @Override
    public void init() throws ServletException {
        instance = DBManagement.getInstance();
        this.gson = new Gson();

    }

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        req.getRequestDispatcher("JSPS/profile.jsp").forward(req, resp);
    }

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        List<Recipe> recipes = DBManagement.getInstance().getAllRecipes();
        Random random = new Random();
        //get the random recipe
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
