package com.tse.servlets;

import com.cloudinary.Cloudinary;
import com.cloudinary.api.ApiResponse;
import com.cloudinary.utils.ObjectUtils;
import com.google.gson.Gson;
import com.mashape.unirest.http.ObjectMapper;
import com.mashape.unirest.http.Unirest;
import com.mashape.unirest.http.exceptions.UnirestException;
import com.tse.entity.Recipe;
import com.tse.model.DBManagement;
import com.tse.model.ManageInputFromParts;
import com.tse.model.NutrientsDeserialisation;
import com.tse.model.NutrientsUrlIngredients;
import org.json.JSONArray;
import org.json.JSONObject;
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
import java.util.ArrayList;
import java.util.List;
import java.util.Map;


@MultipartConfig(fileSizeThreshold = 1024 * 1024,
        maxFileSize = 1024 * 1024 * 10,
        maxRequestSize = 1024 * 1024 * 100)

@WebServlet(urlPatterns = {"/addRecipe"})
public class AddRecipeServlet extends HttpServlet {
    private DBManagement instance;
    private ManageInputFromParts manageInputFromParts;
    private Cloudinary cloudinary;
    private String path;
    private Gson gson;

    @Override
    public void init() throws ServletException {
        this.instance = DBManagement.getInstance();
        this.manageInputFromParts = new ManageInputFromParts();
        this.cloudinary = null;
        this.path = getServletContext().getRealPath("") + File.separator +  "UPLOAD_DIRECTORY";
        this.gson = new Gson();
        File uploadDir = new File(path);
        if (!uploadDir.exists()) uploadDir.mkdir();
        System.out.println("Directory created successfully!");
    }

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        req.getRequestDispatcher("JSPS/profile.jsp").forward(req, resp);
    }

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {

        // Instantiating the cloudinary object
        try {
            cloudinary = new Cloudinary(String.valueOf(new URI(System.getenv("CLOUDINARY_URL"))));
        } catch (URISyntaxException e) {
            System.err.println(e);
        }

        //Getting parts from fields
        String nameOfRecipe = manageInputFromParts.manageInput(req.getPart("nameRecipe"));
        boolean checkDuplicates = instance.checkRecipeDuplicates(nameOfRecipe);
        if(!checkDuplicates){
            resp.setContentType("application/json");
            resp.getWriter().write(gson.toJson("exists"));
        }else{
            String timeToCook = manageInputFromParts.manageInput(req.getPart("timeToCook"));
            int servings = Integer.parseInt(manageInputFromParts.manageInput(req.getPart("numberOfServings")));
            String ingredients = manageInputFromParts.manageInput(req.getPart("ingredients"));
            String instructions = manageInputFromParts.manageInput(req.getPart("instructions"));
            String typeOfFood = manageInputFromParts.manageInput(req.getPart("typeOfFood")).toUpperCase();
            String countryOfOrigin = manageInputFromParts.manageInput(req.getPart("countryOfOrigin")).toUpperCase();
            System.out.println("Country of origin: " + countryOfOrigin);
            Part foodPic = req.getPart("foodPic");

            //Save the avatar to servlet context path in the folder i created earlier
            String fileName = foodPic.getSubmittedFileName();
            foodPic.write(path + File.separator + fileName);

            //Saving avatar name as string
            String foodPicName = fileName;

            // Creating a file so i can upload it to cloud
            File file = new File(path + File.separator + fileName);

            // Uploading foodPic to cloud
            Map upload = cloudinary.uploader().upload(file, ObjectUtils.asMap(
                    "resource_type", "auto",
                    "folder", "FOOD_IMG/"+typeOfFood,
                    "public_id", fileName,
                    "use_filename", "true"
            ));

            // Revealing the URL of the new uploaded picture
            URL imgUrl = new URL((String) upload.get("secure_url"));

            // Retrieving url for flag of country of origin
            URL flag = instance.getFlagUrl(countryOfOrigin);

            // NutritionixAPI endpoint
            // Unirest object mapper gson
            Unirest.setObjectMapper(new ObjectMapper() {
                private Gson gson = new Gson();

                public <T> T readValue(String s, Class<T> aClass) {
                    try{
                        return gson.fromJson(s, aClass);
                    }catch(Exception e){
                        throw new RuntimeException(e);
                    }
                }
                public String writeValue(Object o) {
                    try{
                        return gson.toJson(o);
                    }catch(Exception e){
                        throw new RuntimeException(e);
                    }
                }
            });

            List<NutrientsDeserialisation> list = new ArrayList<>();
            try {
                JSONArray response = Unirest.post("https://trackapi.nutritionix.com/v2/natural/nutrients")
                        .header("x-app-id", System.getenv("APP_ID"))
                        .header("x-app-key", System.getenv("APP_KEY"))
                        .header("Content-Type", "application/json")
                        .body("{\"query\":\"" + ingredients + "\"}")
                        .asJson()
                        .getBody()
                        .getObject()
                        .getJSONArray("foods");

                for(Object s: response){
                    NutrientsDeserialisation nt = gson.fromJson(String.valueOf((JSONObject) s), NutrientsDeserialisation.class);
                    list.add(nt);
                }
            } catch (UnirestException e) {
                e.printStackTrace();
            }
            URL ingredientURL = null;
            List<NutrientsUrlIngredients> listOfIngredients = new ArrayList<>();
            for(NutrientsDeserialisation s: list){
                String ingredientName = s.getFood_name();
                double saturatedFat = s.getNf_saturated_fat();
                double cholesterol = s.getNf_cholesterol();
                double potassium = s.getNf_potassium();
                double sugars = s.getNf_sugars();
                double protein = s.getNf_protein();
                double totalCarbohydrates = s.getNf_total_carbohydrate();
                double calories = s.getNf_calories();
                double sodium = s.getNf_sodium();
                if(ingredientName.contains(" ")){
                    ingredientName = ingredientName.replace(" ","_");
                }
                try {
                    ApiResponse result = cloudinary.search()
                            .expression("public_id=INGREDIENTS/" + ingredientName + "* AND folder=INGREDIENTS AND filename:" + ingredientName + "*")
                            .maxResults(1)
                            .execute();
                    if(result!=null){
                        org.cloudinary.json.JSONObject js = new org.cloudinary.json.JSONObject(result);
                        org.cloudinary.json.JSONArray jss = (org.cloudinary.json.JSONArray) js.get("resources");
                        for(int i=0;i<jss.length();i++){
                            URL ingUrl = new URL(jss.getJSONObject(i).get("url").toString());
                            ingredientURL = ingUrl;
                        }
                        NutrientsUrlIngredients ntt = new NutrientsUrlIngredients(ingredientName, saturatedFat, cholesterol, potassium, sugars, protein, totalCarbohydrates, calories, sodium, ingredientURL);
                        listOfIngredients.add(ntt);
                    }
                } catch (Exception e) {
                    e.printStackTrace();
                }
            }
            if(listOfIngredients != null){
                Recipe recipe = new Recipe(nameOfRecipe, timeToCook, servings, ingredients, instructions, typeOfFood, imgUrl, countryOfOrigin, flag, gson.toJson(listOfIngredients));
                if(recipe != null){
                    if(instance.addRecipe(recipe)){
                        resp.setContentType("application/json");
                        resp.getWriter().write(gson.toJson("added"));
                    }else {
                        resp.setContentType("application/json");
                        resp.getWriter().write(gson.toJson("false"));
                    }
                }
            }
        }
    }
}

