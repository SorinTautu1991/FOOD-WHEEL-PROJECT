package com.tse.servlets;


import com.google.gson.Gson;
import com.tse.model.ActiveUserDeserialisation;
import com.tse.model.DBManagement;
import com.tse.model.NameOfRecipeAndListOfNutrientsAndURLSerialisation;

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
import java.util.UUID;

@WebServlet(urlPatterns = {"/shoppinglistcontent"})
public class ShoppingListContentServlet extends HttpServlet {
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

        ActiveUserDeserialisation au = gson.fromJson(json, ActiveUserDeserialisation.class);
        String activeUser = au.getActiveUser();
        UUID id = instance.getIdUserByUserName(activeUser);
        List<String> nameOfRecipeList = instance.getNameOfRecipesFromShoppingList(id);
        resp.setContentType("application/json");
        if(nameOfRecipeList.size() == 0){
            resp.setContentType("application/json");
            resp.getWriter().write(gson.toJson("false"));
        }else{
            List<NameOfRecipeAndListOfNutrientsAndURLSerialisation> list = new ArrayList<>();
            for(String s: nameOfRecipeList){
                URL picURLForRecipe = instance.recipePicURL(s);
                List<String> nutrientsForSelectedRecipeName = instance.getIngredientsForARecipeName(s);
                NameOfRecipeAndListOfNutrientsAndURLSerialisation ns = new NameOfRecipeAndListOfNutrientsAndURLSerialisation(s, picURLForRecipe, nutrientsForSelectedRecipeName);
                list.add(ns);
            }
            if(list.size() == 0){
                resp.setContentType("application/json");
                resp.getWriter().write(gson.toJson("false"));
            }else{
                resp.setContentType("application/json");
                resp.getWriter().write(gson.toJson(list));
            }
        }


    }
}
