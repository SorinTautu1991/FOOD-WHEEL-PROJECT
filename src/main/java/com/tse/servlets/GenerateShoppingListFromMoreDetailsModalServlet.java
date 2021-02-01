package com.tse.servlets;

import com.google.gson.Gson;
import com.tse.entity.ShoppingList;
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
import java.util.UUID;


@WebServlet(urlPatterns = {"/modalmoredetails"})
public class GenerateShoppingListFromMoreDetailsModalServlet extends HttpServlet {
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
        NameOfRecipeAndActiveUserDeserialisation ns = gson.fromJson(json, NameOfRecipeAndActiveUserDeserialisation.class);
        String activeUser = ns.getActiveUser();
        UUID userId = instance.getIdUserByUserName(activeUser);
        String nameOfRecipe = ns.getNameOfRecipe();
        if(instance.checkDuplicatesInShoppingList(userId, nameOfRecipe)){
            ShoppingList sl = new ShoppingList(userId, nameOfRecipe);
            resp.setContentType("application/json");
            if(instance.addShoppingList(sl)){
                resp.getWriter().write(gson.toJson("true"));
            }else {
                resp.getWriter().write("false");
            }
        }else {
            resp.setContentType("application/json");
            resp.getWriter().write(gson.toJson("false"));
        }




    }
}
