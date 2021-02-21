package com.tse.servlets;

import com.google.gson.Gson;
import com.tse.model.DBManagement;
import com.tse.model.IngredientNameAndPicUrlSerialisation;
import com.tse.model.NutrientsUrlIngredients;
import com.tse.model.SearchFieldInputDeserialisation;
import org.cloudinary.json.JSONArray;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.URL;
import java.util.ArrayList;
import java.util.List;

@WebServlet(urlPatterns = {"/autoCompleteIngredients"})
public class AutoCompleteSearchIngredientsServlet extends HttpServlet {
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
        List<String> ingredientsListFromDb = instance.getIngredientsForAllRecipes();
        BufferedReader bf = new BufferedReader(new InputStreamReader(req.getInputStream()));
        if(bf != null){
            json = bf.readLine();
        }
        SearchFieldInputDeserialisation sf = gson.fromJson(json, SearchFieldInputDeserialisation.class);
        String searchInput = sf.getInput();
        List<IngredientNameAndPicUrlSerialisation> finalList = new ArrayList<>();
        for(String s: ingredientsListFromDb){
            JSONArray js = new JSONArray(s);
            for(int i=0;i<js.length();i++){
                NutrientsUrlIngredients nt = gson.fromJson(js.get(i).toString(), NutrientsUrlIngredients.class);
                String ingredientName = nt.getIngredientName();
                URL picURL = nt.getIngredientURL();
                if(ingredientName.contains(searchInput)){
                    IngredientNameAndPicUrlSerialisation ing = new IngredientNameAndPicUrlSerialisation(ingredientName, picURL);
                    finalList.add(ing);
                }
            }
        }
        resp.setContentType("application/json");
        resp.getWriter().write(gson.toJson(finalList));
    }
}
