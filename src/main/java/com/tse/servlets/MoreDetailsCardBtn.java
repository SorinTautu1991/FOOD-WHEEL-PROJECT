package com.tse.servlets;

import com.google.gson.Gson;
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

@WebServlet(urlPatterns = {"/details"})
public class MoreDetailsCardBtn extends HttpServlet {
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
        AddToFavNameDeserialisation a = gson.fromJson(json, AddToFavNameDeserialisation.class);
        String username = a.getActiveUser();
        String nameOfRecipe = a.getNameOfRecipe();
        UUID recipeId = instance.getIdOfRecipeByName(nameOfRecipe);
        Recipe recipe = instance.getRecipeById(recipeId);
        if(recipe != null){
            resp.getWriter().write(gson.toJson(recipe));
        }

    }
}
