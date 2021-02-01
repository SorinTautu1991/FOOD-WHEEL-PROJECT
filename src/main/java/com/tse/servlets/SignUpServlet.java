package com.tse.servlets;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import com.google.gson.Gson;
import com.tse.entity.User;
import com.tse.model.DBManagement;
import com.tse.model.ManageInputFromParts;

import javax.servlet.ServletException;
import javax.servlet.annotation.MultipartConfig;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.Part;
import java.io.File;
import java.io.IOException;
import java.net.URI;
import java.net.URISyntaxException;
import java.net.URL;
import java.util.Map;
import java.util.UUID;


@MultipartConfig(fileSizeThreshold = 1024 * 1024,
maxFileSize = 1024 * 1024 * 10,
maxRequestSize = 1024 * 1024 * 100)

@WebServlet(urlPatterns = {"/signup"})
public class SignUpServlet extends HttpServlet {
    private DBManagement instance;
    private ManageInputFromParts manageInputFromParts;
    private String path;
    private Gson gson;

    @Override
    public void init() throws ServletException {
        this.gson = new Gson();
        instance = DBManagement.getInstance();
        this.manageInputFromParts = new ManageInputFromParts();
        this.path = getServletContext().getRealPath("") + File.separator +  "UPLOAD_DIRECTORY";
        File uploadDir = new File(path);
        if (!uploadDir.exists()) uploadDir.mkdir();
    }

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        req.getRequestDispatcher("index.jsp").forward(req, resp);
    }

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {


        //Get parts from form fields
        String firstName = manageInputFromParts.manageInput(req.getPart("firstName"));
        String lastName = manageInputFromParts.manageInput(req.getPart("lastName"));
        String address = manageInputFromParts.manageInput(req.getPart("address"));
        String country = manageInputFromParts.manageInput(req.getPart("country"));
        String emailOne = manageInputFromParts.manageInput(req.getPart("emailOne"));
        String emailTwo = manageInputFromParts.manageInput(req.getPart("emailTwo"));
        String passwordOne = manageInputFromParts.manageInput(req.getPart("passwordOne"));
        String passwordTwo = manageInputFromParts.manageInput(req.getPart("passwordTwo"));
        String date = manageInputFromParts.manageInput(req.getPart("date"));
        String gender = manageInputFromParts.manageInput(req.getPart("gender"));

        if(instance.checkDuplicateUser(emailOne)){
            resp.setContentType("application/json");
            resp.getWriter().write(gson.toJson("duplicate"));
        }else if(!(passwordOne.equals(passwordTwo))){
            resp.setContentType("application/json");
            resp.getWriter().write(gson.toJson("password"));
        }else if(!(emailOne.equals(emailTwo))){
            resp.setContentType("application/json");
            resp.getWriter().write(gson.toJson("email"));
        } else {
            //Gender comes as 1, 2 or 3 > we are switching it to be male, female, non-disclosure
            switch (gender){
                case "1": gender = "male";
                    break;
                case "2": gender = "female";
                    break;
                case "3": gender = "non-disclosure";
                    break;
            }
            String userName = manageInputFromParts.manageInput(req.getPart("username"));
            Part avatarPart = req.getPart("avatar");

            //Save the avatar to servlet context
            String fileName = avatarPart.getSubmittedFileName();
            avatarPart.write(path + File.separator + fileName);
            //Saving avatar name as string
            String avatar = fileName;
            File file = new File(path + File.separator + fileName);

            //Instantiating the Cloudinary Object
        Cloudinary cloudinary = null;
        try {
            cloudinary = new Cloudinary(String.valueOf(new URI(System.getenv("CLOUDINARY_URL"))));
        } catch (URISyntaxException e) {
            System.err.println(e);
        }


            //uploading avatar to cloud
            Map upload = cloudinary.uploader().upload(file, ObjectUtils.asMap(
                    "resource_type", "image",
                    "folder", "avatars",
                    "public_id", fileName,
                    "use_filename", "true"
            ));
            URL imgUrl = new URL((String) upload.get("secure_url"));
            System.out.println(imgUrl);


            //adding new registered user to database and logging him up
            User newUser = new User(firstName, lastName, address, country, emailOne, passwordOne,
                    date, gender, userName, avatar, imgUrl);
            UUID id = newUser.getId();
            if(instance.addUser(newUser) && instance.getUser(id) != null){
                req.getSession().setAttribute("authenticatedUser", newUser);
                resp.setContentType("application/json");
                resp.getWriter().write(gson.toJson("authenticated"));
            } else {
                req.setAttribute("ErrorMsg", "Error creating user");
                resp.setContentType("application/json");
                resp.getWriter().write(gson.toJson("false"));
            }
        }




    }
}


