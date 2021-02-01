package com.tse.servlets;


import com.google.gson.Gson;
import com.tse.entity.User;
import com.tse.model.DBManagement;
import com.tse.model.PasswordDeserialisation;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.sql.SQLException;

@WebServlet(urlPatterns = {"/checkpass"})
public class CheckForDuplicatePassword extends HttpServlet {
    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        Gson gson = new Gson();
        BufferedReader bf = new BufferedReader(new InputStreamReader(req.getInputStream()));
        String json = "";
        if(bf != null){
            json = bf.readLine();
        }

        PasswordDeserialisation passwordDeserialisation = gson.fromJson(json, PasswordDeserialisation.class);
        try {
            User user = DBManagement.getInstance().userExistsPassword(passwordDeserialisation.getPasswordOne());
            if(user != null){
                resp.getWriter().write(gson.toJson("false"));
            }else {
                resp.getWriter().write(gson.toJson("true"));
            }
        } catch (SQLException throwables) {
            throwables.printStackTrace();
        }
    }
}
