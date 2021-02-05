package com.tse.servlets;

import com.google.gson.Gson;
import com.tse.model.*;
import org.apache.pdfbox.pdmodel.PDDocument;
import org.apache.pdfbox.pdmodel.PDDocumentInformation;
import org.apache.pdfbox.pdmodel.PDPage;
import org.apache.pdfbox.pdmodel.PDPageContentStream;
import org.apache.pdfbox.pdmodel.font.PDFont;
import org.apache.pdfbox.pdmodel.font.PDType1Font;
import org.cloudinary.json.JSONArray;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.OutputStream;
import java.util.ArrayList;
import java.util.List;


@WebServlet(urlPatterns = {"/downloadShoppingList"})
public class DownloadShoppingListServlet extends HttpServlet {
    private Gson gson;
    private DBManagement instance;
    private String path;

    @Override
    public void init() throws ServletException {
        this.gson = new Gson();
        instance = DBManagement.getInstance();
    }

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {

        String json = req.getParameter("recName");
        String jsonTwo = req.getParameter("listIng");
        System.out.println(json);
        System.out.println(jsonTwo);
        NameOfRecipeDeserialisation nr = gson.fromJson(json, NameOfRecipeDeserialisation.class);
        String nameOfRecipe = nr.getNameOfRecipe();
        ListOfIngredientsDeserialisationSimple li = gson.fromJson(jsonTwo, ListOfIngredientsDeserialisationSimple.class);
        List<String> listOfIngredients = li.getListIngr();
        // This list will be populated with objects that contain the name of ingredient from shopping list and url for picture
        List<IngredientNameAndPicUrlSerialisation> list = new ArrayList<>();
        // This brings the full list of ingredients with pic url for a certain recipe
        List<String> fullListOfIngredients = instance.getIngredientsForARecipeName(nameOfRecipe);
        for(String ingredientName:listOfIngredients){
            for(String ss: fullListOfIngredients){
                JSONArray jsonArray = new JSONArray(ss);
                for(int i=0;i<jsonArray.length();i++){
                    NutrientsUrlIngredients nt = gson.fromJson(jsonArray.get(i).toString(), NutrientsUrlIngredients.class);
                    String ingrNameThatNeedModification = nt.getIngredientName();
                    if(ingrNameThatNeedModification.contains("_")){
                        ingrNameThatNeedModification = ingrNameThatNeedModification.replace("_", " ");
                    }
//                    if(ingredientName.equals(nt.getIngredientName())){
//                        IngredientNameAndPicUrlSerialisation in = new IngredientNameAndPicUrlSerialisation(ingredientName, nt.getIngredientURL());
//                        list.add(in);
//                    }
                    if(ingredientName.equals(ingrNameThatNeedModification)){
                        IngredientNameAndPicUrlSerialisation in = new IngredientNameAndPicUrlSerialisation(ingredientName, nt.getIngredientURL());
                        list.add(in);
                    }
                }
            }
        }

        // Dealing with the pdf

        PDDocument doc = new PDDocument();
        PDDocumentInformation pd = new PDDocumentInformation();
        pd.setTitle("Shopping List");
        PDPage page = new PDPage();
        doc.addPage(page);
        OutputStream out = resp.getOutputStream();
        PDPageContentStream contents = new PDPageContentStream(doc, page);
        contents.beginText();
        PDFont font = PDType1Font.HELVETICA_BOLD;
        contents.setFont(font, 30);

        contents.newLineAtOffset(100, 650);
        contents.setLeading(14.5f);
        contents.showText("SHOPPING LIST");
        contents.newLine();
        contents.newLine();
        contents.newLine();
        contents.setFont(font, 15);
        contents.newLine();
        for(int i=0;i<list.size();i++){
            contents.showText((i + 1) + ". " + list.get(i).getIngredientName().toUpperCase());
            contents.newLine();
        }
        contents.endText();
        contents.close();
        doc.save(out);
        doc.close();
    }
}
