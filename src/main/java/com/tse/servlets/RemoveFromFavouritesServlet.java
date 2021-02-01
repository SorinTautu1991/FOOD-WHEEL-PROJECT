package com.tse.servlets;

import com.google.gson.Gson;
import com.tse.model.DBManagement;
import com.tse.model.NameOfRecipeAndActiveUserDeserialisation;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.List;
import java.util.UUID;


@WebServlet(urlPatterns = {"/removeFavourites"})
public class RemoveFromFavouritesServlet extends HttpServlet {
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
        NameOfRecipeAndActiveUserDeserialisation nt = gson.fromJson(json, NameOfRecipeAndActiveUserDeserialisation.class);
        String activeUser = nt.getActiveUser();
        String nameOfRecipe = nt.getNameOfRecipe();
        List<UUID> userIds = instance.getUserIdByName(activeUser);
        List<UUID> recipesId = instance.getRecipeIdByName(nameOfRecipe);
        UUID userId = userIds.get(0);
        UUID recipeId = recipesId.get(0);
        if(instance.deleteFromFavourites(userId, recipeId)){
            resp.setContentType("application/json");
            resp.getWriter().write(gson.toJson("true"));
        }else {
            resp.setContentType("application/json");
            resp.getWriter().write(gson.toJson("false"));
        }




    }
}
