package com.tse.servlets;

import com.google.gson.Gson;
import com.tse.entity.User;
import com.tse.model.DBManagement;
import com.tse.model.PasswordChangeDeserialisation;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.UUID;


@WebServlet(urlPatterns = {"/changePsw"})
public class ChangePswServlet extends HttpServlet {
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
        PasswordChangeDeserialisation ps = gson.fromJson(json, PasswordChangeDeserialisation.class);
        String user = ps.getUser();
        String password = ps.getPassword();
        String confirmedPassword = ps.getConfirmedPsw();
        UUID id = instance.getIdUserByUserName(user);
        User activeUser = instance.getUser(id);

        if(!password.equals(confirmedPassword)){
            resp.setContentType("application/json");
            resp.getWriter().write(gson.toJson("false"));
        }else if(password.equals(confirmedPassword) && instance.changePassword(id, password)){
            User updatedUser = instance.getUser(id);
            if(updatedUser.getPassword().equals(password)){
                resp.setContentType("application/json");
                resp.getWriter().write(gson.toJson("true"));
            }
        }
    }
}
