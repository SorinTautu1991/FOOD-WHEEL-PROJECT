package com.tse.servlets;


import com.google.gson.Gson;
import com.tse.entity.User;
import com.tse.model.DBManagement;
import com.tse.model.ResponseForMyAccountDetailsSerialisation;
import com.tse.model.UsernameDeserialisation;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.URL;
import java.util.UUID;


@WebServlet(urlPatterns = {"/myaccount"})
public class MyAccountDetails extends HttpServlet {
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
        UsernameDeserialisation activeUser = gson.fromJson(json, UsernameDeserialisation.class);
        String userName = activeUser.getUser();
        UUID id = instance.getIdUserByUserName(userName);
        User user = instance.getUser(id);
        if(user != null){
            URL picURL = user.getCloud_url();
            String userNameFromDb = user.getUserName();
            String country = user.getCountry();
            String address = user.getAddress();
            String gender = user.getGender();
            ResponseForMyAccountDetailsSerialisation rs = new ResponseForMyAccountDetailsSerialisation(picURL, userNameFromDb, country, address, gender);
            resp.setContentType("application/json");
            resp.getWriter().write(gson.toJson(rs));
        }

    }
}
