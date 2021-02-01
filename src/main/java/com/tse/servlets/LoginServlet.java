package com.tse.servlets;

import com.google.gson.Gson;
import com.tse.entity.User;
import com.tse.model.DBManagement;
import com.tse.model.UserPassword;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;


@WebServlet(urlPatterns = {"/login"})
public class LoginServlet extends HttpServlet {
    private Gson gson;
    private DBManagement instance;

    @Override
    public void init() throws ServletException {
        this.gson = new Gson();
        instance = DBManagement.getInstance();
    }

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        req.getRequestDispatcher("index.jsp").forward(req, resp);
    }

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        String json = "";
        BufferedReader bf = new BufferedReader(new InputStreamReader(req.getInputStream()));
        if(bf != null){
            json = bf.readLine();
        }

        UserPassword us = gson.fromJson(json, UserPassword.class);
        String email = us.getEmail();
        String password = us.getPassword();
        User user = instance.authenticateUser(email, password);
        if(user != null){
            req.getSession().setAttribute("authenticatedUser", user);
            resp.getWriter().write(gson.toJson("valid"));
        } else {
            resp.getWriter().write(gson.toJson("invalid"));
        }
    }
}
