package com.tse.servlets;

import com.google.gson.Gson;
import com.tse.entity.Recipe;
import com.tse.model.ActiveUserDeserialisation;
import com.tse.model.DBManagement;

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


@WebServlet(urlPatterns = {"/basket"})
public class FavouritesBasket extends HttpServlet {
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
        UUID activeUser = instance.getIdUserByUserName((gson.fromJson(json, ActiveUserDeserialisation.class).getActiveUser()));
        List<Recipe> recipeList = instance.getFavouritesList(activeUser);
        if(recipeList.isEmpty()){
            resp.setContentType("application/json");
            resp.getWriter().write(gson.toJson("empty"));
        }else {
            resp.setContentType("application/json");
            resp.getWriter().write(gson.toJson(recipeList));
        }

    }
}
