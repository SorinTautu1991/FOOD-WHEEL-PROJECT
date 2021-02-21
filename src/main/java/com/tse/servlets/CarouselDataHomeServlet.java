package com.tse.servlets;

import com.google.gson.Gson;
import com.tse.entity.Advices;
import com.tse.model.DBManagement;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Random;

@WebServlet(urlPatterns = "/carousel")
public class CarouselDataHomeServlet extends HttpServlet {
    private Gson gson;
    private DBManagement instance;

    @Override
    public void init() throws ServletException {
        this.gson = new Gson();
        instance = DBManagement.getInstance();
    }

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        List<Advices> advicesDb = instance.getAllAdvices();
        List<Advices> response = new ArrayList<>();
        Random random = new Random();
        int i=0;
        while(i<8){
            response.add(advicesDb.get(random.nextInt(advicesDb.size())));
            i++;
        }
        resp.setContentType("application/json");
        resp.getWriter().write(gson.toJson(response));
    }
}
