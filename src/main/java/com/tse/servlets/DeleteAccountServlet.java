package com.tse.servlets;

import com.google.gson.Gson;
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
import java.util.UUID;


@WebServlet(urlPatterns = {"/delete"})
public class DeleteAccountServlet extends HttpServlet {
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
        ActiveUserDeserialisation ac = gson.fromJson(json, ActiveUserDeserialisation.class);
        String activeUser = ac.getActiveUser();
        UUID id = instance.getIdUserByUserName(activeUser);
        resp.setContentType("application/json");
        if(instance.deleteAllFavouritesForAUser(id) && instance.deleteAllShoppingListsForAUser(id)){
            if(instance.deleteUser(id)){
                resp.getWriter().write(gson.toJson("true"));
            }else if(!instance.deleteUser(id)){
                resp.getWriter().write(gson.toJson("false"));
            }
        }

    }
}
