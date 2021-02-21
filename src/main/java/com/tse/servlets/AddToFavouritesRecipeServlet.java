package com.tse.servlets;

import com.google.gson.Gson;
import com.tse.entity.FavouritesRecipes;
import com.tse.entity.Recipe;
import com.tse.model.AddToFavNameDeserialisation;
import com.tse.model.DBManagement;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.UUID;

@WebServlet(urlPatterns = {"/addToFavourites"})
public class AddToFavouritesRecipeServlet extends HttpServlet {
    private DBManagement instance;
    private Gson gson;

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
        AddToFavNameDeserialisation a = gson.fromJson(json, AddToFavNameDeserialisation.class);
        String username = a.getActiveUser();
        String recipeName = a.getNameOfRecipe();
        UUID idOfActiveUser = instance.getIdUserByUserName(username);
        UUID idOfRecipe = instance.getIdOfRecipeByName(recipeName);
        boolean dbCheck = instance.checkDuplicatedRecipeInUserFavourites(idOfActiveUser, idOfRecipe);
        if(dbCheck){
            FavouritesRecipes fv = new FavouritesRecipes(idOfActiveUser, idOfRecipe);
            if(fv != null){
                if(instance.addToFavourites(fv)){
                    Recipe addedRecipe = instance.getRecipeById(fv.getRecipeId());
                        if(addedRecipe != null){
                            resp.setContentType("application/json");
                            resp.getWriter().write(gson.toJson("true"));
                }
            }
        }

    }else{
            resp.setContentType("application/json");
            resp.getWriter().write("false");
        }
    }
}
