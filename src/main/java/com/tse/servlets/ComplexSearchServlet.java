package com.tse.servlets;

import com.google.gson.Gson;
import com.tse.entity.Recipe;
import com.tse.model.ComplexSearchFieldsDeserialisation;
import com.tse.model.DBManagement;
import com.tse.model.NameOfRecipeAndCaloriesSerialisation;
import com.tse.model.NutrientsUrlIngredients;
import org.cloudinary.json.JSONArray;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.ArrayList;
import java.util.List;

@WebServlet(urlPatterns = {"/complexSearch"})
public class ComplexSearchServlet extends HttpServlet {
    private Gson gson;
    private DBManagement instance;

    @Override
    public void init() throws ServletException {
        this.gson = new Gson();
        instance = DBManagement.getInstance();
    }

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        String json = "";
        BufferedReader bf = new BufferedReader(new InputStreamReader(req.getInputStream()));
        if(bf != null){
            json = bf.readLine();
        }
        ComplexSearchFieldsDeserialisation cs = gson.fromJson(json, ComplexSearchFieldsDeserialisation.class);
        String typeOfFood = cs.getTypeOfFood().toUpperCase();
        int numberOfServings = cs.getNumberOfServings();
        String timeToCook = cs.getTimeToCook();
        double numberOfCalories = Double.parseDouble(cs.getNumberOfCalories());
        List<Recipe> recipes = instance.getRecipesFromComplexSearch(typeOfFood, numberOfServings, timeToCook);
        resp.setContentType("application/json");
        if(recipes.isEmpty()){
            resp.getWriter().write(gson.toJson("false"));
        } else {
            // Filter on the recipes based on the calories number
            List<NameOfRecipeAndCaloriesSerialisation> listOfRecipeAndCalories = new ArrayList<>();
            for(Recipe recipe: recipes){
                System.out.println(recipe.getNutrients());
                JSONArray js = new JSONArray(recipe.getNutrients());
                int sum = 0;
                for(int i=0;i<js.length();i++){
                    NutrientsUrlIngredients nt = gson.fromJson(js.get(i).toString(), NutrientsUrlIngredients.class);
                    sum += nt.getCalories();
                }
                NameOfRecipeAndCaloriesSerialisation ntt = new NameOfRecipeAndCaloriesSerialisation(recipe.getNameOfRecipe(), sum);
                listOfRecipeAndCalories.add(ntt);
            }
            List<Recipe> responseList = new ArrayList<>();
            // checking
            for(NameOfRecipeAndCaloriesSerialisation c : listOfRecipeAndCalories){
                double caloriesOfRecipe = c.getCalories();
                if((numberOfCalories - caloriesOfRecipe)  < 50 || (caloriesOfRecipe - numberOfCalories) < 50){
                    String name = c.getNameOfRecipe();
                    for(Recipe rec: recipes){
                        if(rec.getNameOfRecipe().equals(name)){
                            responseList.add(rec);
                        }
                    }
                }
            }
            resp.getWriter().write(gson.toJson(responseList));
        }
    }
}
