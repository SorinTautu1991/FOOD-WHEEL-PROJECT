package com.tse.servlets;

import com.google.gson.Gson;
import com.tse.entity.Recipe;
import com.tse.model.AutocompleteSearchInputDeserialisation;
import com.tse.model.DBManagement;
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

@WebServlet(urlPatterns = {"/autocompleteHome"})
public class AutoCompleteSearchHome extends HttpServlet {
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
        AutocompleteSearchInputDeserialisation inp = gson.fromJson(json, AutocompleteSearchInputDeserialisation.class);
        List<Recipe> responseDb = instance.getAutocompleteSearch(inp.getSearchInput());
        List<Recipe> responseList = new ArrayList<>(responseDb);
        resp.setContentType("application/json");
        resp.getWriter().write(gson.toJson(responseList));
    }
}
