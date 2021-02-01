

// This servlet was used to simplify the process of adding countries in db
package com.tse.servlets;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import com.tse.entity.Flag;
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


@MultipartConfig(fileSizeThreshold = 1024 * 1024,
        maxFileSize = 1024 * 1024 * 10,
        maxRequestSize = 1024 * 1024 * 100)
@WebServlet(urlPatterns = {"/addCountry"})
public class AddCountryServlet extends HttpServlet {
    private DBManagement instance;
    private ManageInputFromParts manageInputFromParts;
    private Cloudinary cloudinary;
    private String path;

    @Override
    public void init() throws ServletException {
        this.instance = DBManagement.getInstance();
        this.manageInputFromParts = new ManageInputFromParts();
        this.cloudinary = null;
        this.path = getServletContext().getRealPath("") + File.separator +  "UPLOAD_DIRECTORY";
        File uploadDir = new File(path);
        if (!uploadDir.exists()) uploadDir.mkdir();
        System.out.println("Directory created succesfull!");
    }

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        req.getRequestDispatcher("JSPS/addCountry.jsp").forward(req, resp);
    }

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        // Instantiating the cloudinary object
        try {
            cloudinary = new Cloudinary(String.valueOf(new URI(System.getenv("CLOUDINARY_URL"))));
        } catch (URISyntaxException e) {
            System.err.println(e);
        }

        // Getting parts from form data

        String nameOfCountry = manageInputFromParts.manageInput(req.getPart("addCountry")).toUpperCase();
        Part countryFlag = req.getPart("countryFlag");

        //Save the avatar to servlet context path in the folder i created earlier
        String fileName = countryFlag.getSubmittedFileName();
        countryFlag.write(path + File.separator + fileName);


        // Creating a file so i can upload it to cloud
        File file = new File(path + File.separator + fileName);


        // Uploading avatar to cloud
        Map upload = cloudinary.uploader().upload(file, ObjectUtils.asMap(
                "resource_type", "auto",
                "folder", "FLAGS/",
                "public_id", nameOfCountry,
                "use_filename", "true"
        ));

        // Revealing the URL of the new uploaded picture
        URL flagUrl = new URL((String) upload.get("secure_url"));
        System.out.println(flagUrl);


        // Adding country to database in table flags
        if(flagUrl != null && nameOfCountry != null){
            Flag flag = new Flag(flagUrl, nameOfCountry);
            if(instance.addCountry(flag)){
                resp.sendRedirect(req.getContextPath() + "/profile");
            }
        }


    }
}
