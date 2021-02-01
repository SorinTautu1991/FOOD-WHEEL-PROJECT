package com.tse.servlets;

import com.google.gson.Gson;
import com.tse.entity.User;
import com.tse.model.DBManagement;
import com.tse.model.UsernameLastNamePictureDeserialisation;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;


@WebServlet(urlPatterns = {"/profile"})
public class ProfileServlet extends HttpServlet {
    private DBManagement instance;
    private Gson gson;
    @Override
    public void init() {
        instance = DBManagement.getInstance();
        this.gson = new Gson();
    }

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        req.getRequestDispatcher("JSPS/profile.jsp").forward(req, resp);
    }

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        User user = (User)req.getSession().getAttribute("authenticatedUser");
        User user1 = instance.getUser(user.getId());
        resp.setContentType("application/json");
        UsernameLastNamePictureDeserialisation us = new UsernameLastNamePictureDeserialisation(user1.getLastName(), user1.getCloud_url(), user1.getUserName());
        resp.getWriter().write(gson.toJson(us));
    }
}
