package com.tse.servlets;

import com.google.gson.Gson;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;


@WebServlet(urlPatterns = {"/logout"})
public class LogoutServlet extends HttpServlet {
    private Gson gson;
    @Override
    public void init() throws ServletException {
        this.gson = new Gson();
    }


    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        req.getSession().setAttribute("authenticatedUser", null);
        resp.setContentType("application/json");
        resp.getWriter().write(gson.toJson("true"));
    }
}
