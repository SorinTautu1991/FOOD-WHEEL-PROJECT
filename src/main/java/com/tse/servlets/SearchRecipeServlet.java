package com.tse.servlets;

import com.google.gson.Gson;
import com.tse.entity.Recipe;
import com.tse.model.DBManagement;
import com.tse.model.SearchFieldInputDeserialisation;

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


@WebServlet(urlPatterns = {"/searchRecipe"})
public class SearchRecipeServlet extends HttpServlet {
    private DBManagement instance;
    private Gson gson;


    @Override
    public void init() throws ServletException {
        this.instance = DBManagement.getInstance();
        this.gson = new Gson();
    }

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        req.getRequestDispatcher("JSPS/profile.jsp").forward(req, resp);
    }

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        // Read the json coming from frontend
        String json = "";
        BufferedReader bf = new BufferedReader(new InputStreamReader(req.getInputStream()));
        if(bf != null){
            json = bf.readLine();
        }
        SearchFieldInputDeserialisation sf = gson.fromJson(json, SearchFieldInputDeserialisation.class);
        // Search recipes in database and getting the response in copied List
        List<Recipe> responseListFromDb = instance.getSearchedRecipes(sf.getInput());
        List<Recipe> responseList = new ArrayList<>(responseListFromDb);
        resp.setContentType("application/json");
        resp.getWriter().write(gson.toJson(responseList));

    }
}
