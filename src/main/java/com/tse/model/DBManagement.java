package com.tse.model;

import com.tse.entity.*;

import java.net.MalformedURLException;
import java.net.URI;
import java.net.URISyntaxException;
import java.net.URL;
import java.sql.*;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;


public class DBManagement implements DBManager {

    private Connection connection;
    private static DBManagement instance;


    // Connecting to DB
    private DBManagement() {
        URI dbUri = null;
        try {
            Class.forName("org.postgresql.Driver");
            dbUri = new URI(System.getenv("DATABASE_URL"));
        } catch (URISyntaxException | ClassNotFoundException e) {
            System.err.println(e);
        }
        String username = dbUri.getUserInfo().split(":")[0];
        String password = dbUri.getUserInfo().split(":")[1];
        String dbUrl = "jdbc:postgresql://" + dbUri.getHost() + ':' + dbUri.getPort() + dbUri.getPath();
        try {
            DriverManager.setLoginTimeout(60);
            connection = DriverManager.getConnection(dbUrl, username, password);
        } catch (SQLException e) {
            System.err.println("Error at constructor DbManagement, connection:- " + e);
        }
    }

        // Singleton for getting the instance to DB
    public static DBManagement getInstance(){
        if(instance == null){
            instance = new DBManagement();
        }
        return instance;
    }

    // Check if the user that wants to register it already exists
    @Override
    public boolean checkDuplicateUser(String email) {
        try {
            PreparedStatement ps = connection.prepareStatement("SELECT * FROM users WHERE email = ?");
            ps.setString(1, email);
            ResultSet rs = ps.executeQuery();
            while(rs.next()){
                UUID id = UUID.fromString(rs.getString(1));
                String firstName = rs.getString(2);
                String lastName = rs.getString(3);
                String address = rs.getString(4);
                String country = rs.getString(5);
                String emailAdrdress = rs.getString(6);
                String passwordUser = rs.getString(7);
                String date = rs.getString(8);
                String gender = rs.getString(9);
                String userName = rs.getString(10);
                String avatar = rs.getString(11);
                URL cloud_url = new URL(rs.getString(12));
                User user = new User(id, firstName, lastName, address, country, emailAdrdress, passwordUser, date, gender, userName, avatar, cloud_url);
                if(user != null){
                    return true;
                }
            }

        } catch (SQLException | MalformedURLException e) {
            e.printStackTrace();
        }
        return false;
    }

    // Implementing methods for dealing with users
    @Override
    public User getUser(UUID userId) {
        try {
            PreparedStatement getUser = connection.prepareStatement("SELECT * from users WHERE id = ?");
            getUser.setString(1, (userId.toString()));
            ResultSet userResultSet = getUser.executeQuery();
            if (userResultSet.next()){
                UUID id = UUID.fromString(userResultSet.getString(1));
                String firstName = userResultSet.getString(2);
                String lastName = userResultSet.getString(3);
                String address = userResultSet.getString(4);
                String country = userResultSet.getString(5);
                String emailAdrdress = userResultSet.getString(6);
                String passwordUser = userResultSet.getString(7);
                String date = userResultSet.getString(8);
                String gender = userResultSet.getString(9);
                String userName = userResultSet.getString(10);
                String avatar = userResultSet.getString(11);
                URL cloud_url = new URL(userResultSet.getString(12));
                if(id != null && firstName != null && lastName != null && address != null && country != null &&
                emailAdrdress != null && passwordUser != null && date != null && gender != null &&
                userName != null && avatar != null && cloud_url != null){
                    User user = new User(id, firstName, lastName, address, country, emailAdrdress, passwordUser,
                            date, gender, userName, avatar, cloud_url);
                    return user;
                } else {
                    return null;
                }
            }
        } catch (SQLException | MalformedURLException throwables) {
            System.err.println("Get user error method:- " + throwables);
        }
        return null;
    }

    // This method changes the password for a user
    @Override
    public boolean changePassword(UUID id, String password) {
        try {
            PreparedStatement ps = connection.prepareStatement("UPDATE users SET password = ? WHERE id = ?");
            ps.setString(1, password);
            ps.setString(2, id.toString());
            ps.executeUpdate();
            return true;

        } catch (SQLException e) {
            e.printStackTrace();
        }
        return false;
    }

    // This method checks if an email already exists in db
    public User userExistsEmail(String email) throws SQLException{
        try {
            PreparedStatement getUser = connection.prepareStatement("SELECT * FROM users WHERE email = ?");
            getUser.setString(1, email);
            ResultSet userResultSet = getUser.executeQuery();
            if (userResultSet.next()) {
                User user = new User(UUID.fromString(userResultSet.getString(1)),
                        userResultSet.getString(2),
                        userResultSet.getString(3),
                        userResultSet.getString(4),
                        userResultSet.getString(5),
                        userResultSet.getString(6),
                        userResultSet.getString(7),
                        userResultSet.getString(8),
                        userResultSet.getString(9),
                        userResultSet.getString(10),
                        userResultSet.getString(11)
                );
                return user;
            }
        }catch (SQLException e) {
            System.err.println(e);
        }
        return null;
    }

    // This method checks if a user with this pasword already exists in db
    public User userExistsPassword(String password) throws SQLException{
        try {
            PreparedStatement getUser = connection.prepareStatement("SELECT * FROM users WHERE password = ?");
            getUser.setString(1, password);
            ResultSet userResultSet = getUser.executeQuery();
            if (userResultSet.next()) {
                User user = new User(UUID.fromString(userResultSet.getString(1)),
                        userResultSet.getString(2),
                        userResultSet.getString(3),
                        userResultSet.getString(4),
                        userResultSet.getString(5),
                        userResultSet.getString(6),
                        userResultSet.getString(7),
                        userResultSet.getString(8),
                        userResultSet.getString(9),
                        userResultSet.getString(10),
                        userResultSet.getString(11)
                );
                return user;
            }
        }catch (SQLException e) {
            System.err.println(e);
        }
        return null;
    }


    public User userExistsFirstName(String firstName) throws SQLException {
        try {
            PreparedStatement getUser = connection.prepareStatement("SELECT * FROM users WHERE first_name = ?");
            getUser.setString(1, firstName);
            ResultSet userResultSet = getUser.executeQuery();
            if (userResultSet.next()) {
                User user = new User(UUID.fromString(userResultSet.getString(1)),
                        userResultSet.getString(2),
                        userResultSet.getString(3),
                        userResultSet.getString(4),
                        userResultSet.getString(5),
                        userResultSet.getString(6),
                        userResultSet.getString(7),
                        userResultSet.getString(8),
                        userResultSet.getString(9),
                        userResultSet.getString(10),
                        userResultSet.getString(11)
                );
                return user;
            }
        }catch (SQLException e) {
            System.err.println(e);
    }
        return null;
    }

    public User userExistsLastName(String lastName) throws SQLException {
        try {
            PreparedStatement getUser = connection.prepareStatement("SELECT * FROM users WHERE last_name = ?");
            getUser.setString(1, lastName);
            ResultSet userResultSet = getUser.executeQuery();
            if (userResultSet.next()) {
                User user = new User(UUID.fromString(userResultSet.getString(1)),
                        userResultSet.getString(2),
                        userResultSet.getString(3),
                        userResultSet.getString(4),
                        userResultSet.getString(5),
                        userResultSet.getString(6),
                        userResultSet.getString(7),
                        userResultSet.getString(8),
                        userResultSet.getString(9),
                        userResultSet.getString(10),
                        userResultSet.getString(11)
                );
                return user;
            }
        }catch (SQLException e) {
            System.err.println(e);
        }
        return null;
    }

    // This method gets an user after the username
    public UUID getIdUserByUserName(String username){
        PreparedStatement ps = null;
        try {
            ps = connection.prepareStatement("SELECT id FROM users WHERE username = ?");
            ps.setString(1, username);
            ResultSet rs = ps.executeQuery();
            while(rs.next()){
                UUID id = UUID.fromString(rs.getString(1));
                return id;
            }

        } catch (SQLException e) {
            e.printStackTrace();
        }
        return null;
    }

    // This method adds an user
    @Override
    public boolean addUser(User user) {
        UUID id = user.getId();
        String firstName = user.getFirstName();
        String lastName = user.getLastName();
        String address = user.getAddress();
        String country = user.getCountry();
        String email = user.getEmail();
        String password = user.getPassword();
        String dateOfBirth = user.getDateOfBirth();
        String gender = user.getGender();
        String userName = user.getUserName();
        String avatar = user.getAvatar();
        String cloud_url = user.getCloud_url().toString();
        if(id != null && firstName != null && lastName != null && address != null && country != null
        && email != null && password != null && dateOfBirth != null && gender != null && userName != null
        && avatar != null && cloud_url != null){
            try {
                PreparedStatement insertIntoUsers = connection.prepareStatement("INSERT INTO users VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)");
                insertIntoUsers.setString(1, id.toString());
                insertIntoUsers.setString(2, firstName);
                insertIntoUsers.setString(3, lastName);
                insertIntoUsers.setString(4, address);
                insertIntoUsers.setString(5, country);
                insertIntoUsers.setString(6, email);
                insertIntoUsers.setString(7, password);
                insertIntoUsers.setString(8, dateOfBirth);
                insertIntoUsers.setString(9, gender);
                insertIntoUsers.setString(10, userName);
                insertIntoUsers.setString(11, avatar);
                insertIntoUsers.setString(12, (cloud_url));
                insertIntoUsers.execute();
                return true;
            } catch (SQLException throwables) {
                System.err.println("Add user error:- " + throwables);
                return false;
            }
        } else {
            return false;
        }
    }

    // This method updates the information of a given user
    @Override
    public boolean updateUser(UUID id, User updatedUser) {
        try {
            PreparedStatement insertUserStatement = connection.prepareStatement("UPDATE users SET first_name = ?, last_name = ?, address = ?, country = ?, email = ?, password = ?, date_of_birth = ?, gender = ?, username = ?, avatar = ?, cloud_url = ? WHERE id = ?");
            insertUserStatement.setString(1, updatedUser.getFirstName());
            insertUserStatement.setString(2, updatedUser.getLastName());
            insertUserStatement.setString(3, updatedUser.getAddress());
            insertUserStatement.setString(4, updatedUser.getCountry());
            insertUserStatement.setString(5, updatedUser.getEmail());
            insertUserStatement.setString(6, updatedUser.getPassword());
            insertUserStatement.setString(7, updatedUser.getDateOfBirth());
            insertUserStatement.setString(8, updatedUser.getGender());
            insertUserStatement.setString(9, updatedUser.getUserName());
            insertUserStatement.setString(10, updatedUser.getAvatar());
            insertUserStatement.setString(11, updatedUser.getCloud_url().toString());
            insertUserStatement.setString(12, id.toString());
            insertUserStatement.executeUpdate();
            return true;
        } catch (SQLException throwables) {
            System.err.println(throwables);
        }
        return false;
    }

    // This method deletes an user account
    @Override
    public boolean deleteUser(UUID id) {
        try {
            PreparedStatement getUser = connection.prepareStatement("DELETE from users WHERE id = ?");
            getUser.setString(1, id.toString());
            getUser.executeUpdate();
            return true;
        } catch (SQLException throwables) {
            System.err.println(throwables);
        }
        return false;
    }


    // This method returns a list of all users from db
    @Override
    public List<User> getUsers() {
        List<User> users = new ArrayList<>();
        try {
            Statement getUsers = connection.createStatement();
            ResultSet userResultSet = getUsers.executeQuery("SELECT * FROM users");
            while(userResultSet.next()){
                users.add(new User(UUID.fromString(userResultSet.getString(1)),
                        userResultSet.getString(2), userResultSet.getString(3),
                        userResultSet.getString(4), userResultSet.getString(5),
                        userResultSet.getString(6), userResultSet.getString(7),
                        userResultSet.getString(8), userResultSet.getString(9),
                        userResultSet.getString(10), userResultSet.getString(11),
                        new URL(userResultSet.getString(12))));
            }
        } catch (SQLException | MalformedURLException throwables) {
            System.err.println(throwables);
        }
        return users;
    }

    // This method returns an user by his username
    @Override
    public List<UUID> getUserIdByName(String userName) {
        List<UUID> idResponse= new ArrayList<>();
        try {
            PreparedStatement ps = connection.prepareStatement("SELECT id FROM users WHERE username = ? ");
            ps.setString(1, userName);
            ResultSet rs = ps.executeQuery();
            while(rs.next()){
                UUID id = UUID.fromString(rs.getString(1));
                idResponse.add(id);
            }

        } catch (SQLException e) {
            e.printStackTrace();
        }
        return idResponse;
    }

    // This method authenticates an user
    public User authenticateUser(String email, String password){
        try{
            PreparedStatement user = connection.prepareStatement("SELECT * FROM users WHERE email = ? AND password = ?");
            user.setString(1, email);
            user.setString(2, password);
            ResultSet resultSet = user.executeQuery();
            if(resultSet.next()){
                UUID id = UUID.fromString(resultSet.getString(1));
                String firstName = resultSet.getString(2);
                String lastName = resultSet.getString(3);
                String address = resultSet.getString(4);
                String country = resultSet.getString(5);
                String emailAdrdress = resultSet.getString(6);
                String passwordUser = resultSet.getString(7);
                String date = resultSet.getString(8);
                String gender = resultSet.getString(9);
                String userName = resultSet.getString(10);
                String avatar = resultSet.getString(11);
                URL cloud_url = new URL(resultSet.getString(12));
                if(id != null && firstName != null && lastName != null && address != null &&
                country != null && emailAdrdress != null && passwordUser != null &&
                date != null && gender != null && userName != null && avatar != null && cloud_url != null){
                    User findUser = new User(id, firstName, lastName, address, country, emailAdrdress, passwordUser, date, gender, userName, avatar, cloud_url);
                    return findUser;
                } else {
                    return null;
                }

            }
        }catch (SQLException | MalformedURLException e){
           System.err.println("Authenticate user error: -" + e);
        }
        return null;
    }

    // Implementing developer method for adding countries and flags
    public boolean addCountry(Flag flag){
        try {
            PreparedStatement ps = connection.prepareStatement("INSERT INTO flags VALUES(?, ?, ?)");
            String id = flag.getId().toString();
            String nameOfCountry = flag.getNameOfCountry();
            String flagUrl = flag.getFlagUrl().toString();
            ps.setString(1, id);
            ps.setString(2, nameOfCountry);
            ps.setString(3, flagUrl);
            ps.executeQuery();
            return true;

        } catch (SQLException e) {
            e.printStackTrace();
        }
        return false;
    }

    // Retrieving flag picture url of a recipe from a certain country from the db table flags
    public URL getFlagUrl(String countryName){
        PreparedStatement ps = null;
        try {
            ps = connection.prepareStatement("SELECT url_flag FROM flags WHERE name_of_country = ?");
            ps.setString(1, countryName);
            ResultSet rs = ps.executeQuery();
            while(rs.next()){
                URL flagUrl = new URL(rs.getString(1));
                return flagUrl;
            }
        } catch (SQLException | MalformedURLException e) {
            e.printStackTrace();
        }
        return null;
    }

    // Implementing methods dealing with the recipes
    // Adding a recipe
    @Override
    public boolean addRecipe(Recipe recipe) {
        try {
            PreparedStatement insertIntoRecipes = connection.prepareStatement("INSERT INTO recipes VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)");
            insertIntoRecipes.setString(1, recipe.getId().toString());
            insertIntoRecipes.setString(2, recipe.getNameOfRecipe());
            insertIntoRecipes.setString(3, recipe.getTimeToCook());
            insertIntoRecipes.setInt(4, recipe.getServings());
            insertIntoRecipes.setString(5, recipe.getIngredients());
            insertIntoRecipes.setString(6, recipe.getInstructions());
            insertIntoRecipes.setString(7, recipe.getTypeOfFood());
            insertIntoRecipes.setString(8, recipe.getCloudUrlPicture().toString());
            insertIntoRecipes.setString(9, recipe.getCountryOfOrigin());
            insertIntoRecipes.setString(10, recipe.getFlag().toString());
            insertIntoRecipes.setString(11, recipe.getNutrients());
            insertIntoRecipes.execute();
            return true;
        } catch (SQLException throwables) {
            System.err.println(throwables);
            return false;
        }
    }

    // This method returns a recipe by id
    public Recipe getRecipeById(UUID id){
        String recipeId = id.toString();
        try {
            PreparedStatement ps = connection.prepareStatement("SELECT * FROM recipes WHERE id = ?");
            ps.setString(1, recipeId);
            ResultSet rs = ps.executeQuery();
            while(rs.next()){
                UUID idd = UUID.fromString(rs.getString(1));
                String nameOfRecipe = rs.getString(2);
                String timeToCook = rs.getString(3);
                int servings = rs.getInt(4);
                String ingredients = rs.getString(5);
                String instructions = rs.getString(6);
                String typeOfFood = rs.getString(7);
                URL cloudUrl = new URL(rs.getString(8));
                String countryOfOrigin = rs.getString(9);
                URL flag = new URL(rs.getString(10));
                String nutrients = rs.getString(11);
                Recipe recipe = new Recipe(idd, nameOfRecipe, timeToCook, servings, ingredients,
                        instructions, typeOfFood, cloudUrl, countryOfOrigin, flag, nutrients);
                if(recipe != null){
                    return recipe;
                }
            }
        } catch (SQLException | MalformedURLException e) {
            e.printStackTrace();
        }
        return null;
    }

    // This method queries input for autocomplete search
    @Override
    public List<Recipe> getAutocompleteSearch(String searchInput) {
        System.out.println("This is the searchInput from DBManagement");
        List<Recipe> recipesResults = new ArrayList<>();
        try {
            PreparedStatement ps = connection.prepareStatement("SELECT * FROM recipes WHERE lower(name_of_recipe) LIKE CONCAT('%', ?, '%') OR lower(ingredients) LIKE CONCAT('%', ?, '%')");
            ps.setString(1, searchInput.toLowerCase());
            ps.setString(2, searchInput.toLowerCase());
            ResultSet resultSet = ps.executeQuery();
            while(resultSet.next()){
                UUID id = UUID.fromString(resultSet.getString(1));
                String nameOfRecipe = resultSet.getString(2);
                System.out.println("Name of recipe from db: -" + nameOfRecipe);
                String timeToCook = resultSet.getString(3);
                int servings = resultSet.getInt(4);
                String ingredients = resultSet.getString(5);
                String instructions = resultSet.getString(6);
                String typeOfFood = resultSet.getString(7);
                URL cloudUrl = new URL(resultSet.getString(8));
                String countryOfOrigin = resultSet.getString(9);
                URL flag = new URL(resultSet.getString(10));
                String nutrients = resultSet.getString(11);
                Recipe recipe = new Recipe(id, nameOfRecipe, timeToCook, servings, ingredients,
                        instructions, typeOfFood, cloudUrl, countryOfOrigin, flag, nutrients);
                if(recipe != null){
                    recipesResults.add(recipe);
                    for(Recipe recipe1: recipesResults){
                        System.out.println("This are in db list results:+ " + recipe1.getNameOfRecipe());
                    }
                }else {
                    throw new NullPointerException("Couldn't create the recipe something is missing.");
                }
            }
            return recipesResults;
        } catch (SQLException | MalformedURLException e) {
            e.printStackTrace();
        }
        return null;
    }

    // This method returns a list after some search input
    @Override
    public List<Recipe> getSearchedRecipes(String searchInput) {
        List<Recipe> recipesResults = new ArrayList<>();
        try {
            PreparedStatement ps = connection.prepareStatement("SELECT * FROM recipes WHERE lower(name_of_recipe) LIKE CONCAT( '%',?,'%') OR lower(ingredients) LIKE CONCAT('%', ?, '%')");
            ps.setString(1, searchInput.toLowerCase());
            ps.setString(2, searchInput.toLowerCase());
            ResultSet resultSet = ps.executeQuery();
            while(resultSet.next()){
                UUID id = UUID.fromString(resultSet.getString(1));
                String nameOfRecipe = resultSet.getString(2);
                System.out.println("Name of recipe from db: -" + nameOfRecipe);
                String timeToCook = resultSet.getString(3);
                int servings = resultSet.getInt(4);
                String ingredients = resultSet.getString(5);
                String instructions = resultSet.getString(6);
                String typeOfFood = resultSet.getString(7);
                URL cloudUrl = new URL(resultSet.getString(8));
                String countryOfOrigin = resultSet.getString(9);
                URL flag = new URL(resultSet.getString(10));
                String nutrients = resultSet.getString(11);
                Recipe recipe = new Recipe(id, nameOfRecipe, timeToCook, servings, ingredients,
                        instructions, typeOfFood, cloudUrl, countryOfOrigin, flag, nutrients);
                if(recipe != null){
                    recipesResults.add(recipe);
                    for(Recipe recipe1: recipesResults){
                        System.out.println("This are in db list results:+ " + recipe1.getNameOfRecipe());
                    }
                }else {
                    throw new NullPointerException("Couldn't create the recipe something is missing.");
                }
            }
            return recipesResults;

        } catch (SQLException | MalformedURLException e) {
            e.printStackTrace();
        }
        return null;
    }

    // This method returns all recipes from db
    @Override
    public List<Recipe> getAllRecipes() {
        List<Recipe> allRecipes = new ArrayList<>();
        try {
            PreparedStatement ps = connection.prepareStatement("SELECT * FROM recipes");
            ResultSet resultSet = ps.executeQuery();
            while(resultSet.next()){
                UUID id = UUID.fromString(resultSet.getString(1));
                String nameOfRecipe = resultSet.getString(2);
                System.out.println("Name of recipe from db: -" + nameOfRecipe);
                String timeToCook = resultSet.getString(3);
                int servings = resultSet.getInt(4);
                String ingredients = resultSet.getString(5);
                String instructions = resultSet.getString(6);
                String typeOfFood = resultSet.getString(7);
                URL cloudUrl = new URL(resultSet.getString(8));
                String countryOfOrigin = resultSet.getString(9);
                URL flag = new URL(resultSet.getString(10));
                String nutrients = resultSet.getString(11);
                Recipe recipe = new Recipe(id, nameOfRecipe, timeToCook, servings, ingredients,
                        instructions, typeOfFood, cloudUrl, countryOfOrigin, flag, nutrients);
                if(recipe != null){
                    allRecipes.add(recipe);
                }
            }
            List<Recipe> clone = new ArrayList<>(allRecipes);
            return clone;
        } catch (SQLException | MalformedURLException e) {
            e.printStackTrace();
        }
        return null;
    }

    // This method returns the uuid of a recipe by its name
    public UUID getIdOfRecipeByName(String name){
        try {
            PreparedStatement ps = connection.prepareStatement("SELECT id FROM recipes WHERE name_of_recipe = ?");
            ps.setString(1, name);
            ResultSet rs = ps.executeQuery();
            while(rs.next()){
                UUID recipeId = UUID.fromString(rs.getString(1));
                return recipeId;
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return null;
    }

    // This method adds a recipe to favourites table od a certain user
    public boolean addToFavourites(FavouritesRecipes fv){
        String id = fv.getId().toString();
        String userId = fv.getUserId().toString();
        String recipeId = fv.getRecipeId().toString();
        try {
            PreparedStatement ps = connection.prepareStatement("INSERT INTO favourites VALUES(?, ?, ?)");
            ps.setString(1, id);
            ps.setString(2, userId);
            ps.setString(3, recipeId);
            ps.execute();
            return true;
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return false;
    }

    // Getting list of favourites recipes for a particular user by UUID
    @Override
    public List<Recipe> getFavouritesList(UUID id) {
        List<Recipe> results = new ArrayList<>();
        String userId = id.toString();
        try {
            PreparedStatement ps = connection.prepareStatement("SELECT * FROM recipes INNER JOIN favourites ON recipes.id = favourites.recipe_id AND favourites.user_id = ?");
            ps.setString(1, userId);
            ResultSet rs = ps.executeQuery();
            while(rs.next()){
                UUID idd = UUID.fromString(rs.getString(1));
                String nameOfRecipe = rs.getString(2);
                System.out.println("Name of recipe from db: -" + nameOfRecipe);
                String timeToCook = rs.getString(3);
                int servings = rs.getInt(4);
                String ingredients = rs.getString(5);
                String instructions = rs.getString(6);
                String typeOfFood = rs.getString(7);
                URL cloudUrl = new URL(rs.getString(8));
                String countryOfOrigin = rs.getString(9);
                URL flag = new URL(rs.getString(10));
                String nutrients = rs.getString(11);
                Recipe recipe = new Recipe(idd, nameOfRecipe, timeToCook, servings, ingredients,
                        instructions, typeOfFood, cloudUrl, countryOfOrigin, flag, nutrients);
                if(recipe != null){
                    results.add(recipe);
                }
            }
            List<Recipe> clone = new ArrayList<>(results);
            return clone;
        } catch (SQLException | MalformedURLException e) {
            e.printStackTrace();
        }
        return null;
    }

    // Adding a shopping list details to db in table recipe_list
    @Override
    public boolean addShoppingList(ShoppingList sl) {
        try {
            PreparedStatement ps = connection.prepareStatement("INSERT INTO shopping_list VALUES(?, ?, ?)");
            ps.setString(1, sl.getId().toString());
            ps.setString(2, sl.getUserId().toString());
            ps.setString(3, sl.getNameOfRecipe());
            ps.executeUpdate();
            return true;
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return false;
    }

    // Getting a list of recipe names for a specific user that wants to get the shopping list
    @Override
    public List<String> getNameOfRecipesFromShoppingList(UUID userId) {
        List<String> nameOfRecipeList = new ArrayList<>();
        try {
            PreparedStatement ps = connection.prepareStatement("select name_of_recipe from shopping_list where user_id =?");
            ps.setString(1, userId.toString());
            ResultSet rs = ps.executeQuery();
            while(rs.next()){
                String nameOfRecipe = rs.getString(1);
                nameOfRecipeList.add(nameOfRecipe);
            }
            return nameOfRecipeList;
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return nameOfRecipeList;
    }

    // This method returns a list of ingredient names by its name
    @Override
    public List<String> getIngredientsForARecipeName(String recipeName) {
        List<String> nutrients = new ArrayList<>();
        try {
            PreparedStatement ps = connection.prepareStatement("SELECT nutrients_for_ingredients FROM recipes WHERE name_of_recipe =?");
            ps.setString(1, recipeName);
            ResultSet rs = ps.executeQuery();
            while(rs.next()){
                nutrients.add(rs.getString(1));
            }
            return nutrients;
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return nutrients;
    }

    // This method returns the url of a certain recipe`s image by its name
    @Override
    public URL recipePicURL(String nameOfRecipe) {
        try {
            PreparedStatement ps = connection.prepareStatement("SELECT cloud_url FROM recipes WHERE name_of_recipe = ?");
            ps.setString(1, nameOfRecipe);
            ResultSet rs = ps.executeQuery();
            while(rs.next()){
                URL picURL = new URL(rs.getString(1));
                return picURL;
            }
        } catch (SQLException e) {
            e.printStackTrace();
        } catch (MalformedURLException e) {
            e.printStackTrace();
        }
        return null;
    }

    // This method returns a list of ingredients for all recipes
    @Override
    public List<String> getIngredientsForAllRecipes() {
        List<String> ingrList = new ArrayList<>();
        try {
            PreparedStatement ps = connection.prepareStatement("SELECT nutrients_for_ingredients FROM recipes");
            ResultSet rs = ps.executeQuery();
            while(rs.next()){
                String ingr = rs.getString(1);
                ingrList.add(ingr);
            }
            return ingrList;
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return ingrList;
    }

    // This method returns a list of recipes based on a list of ingredients
    @Override
    public List<Recipe> getRecipeByIngredients(List<String> ingredientList) {
        List<Recipe> recipeList = new ArrayList<>();
        String preparedStatement = "";
        StringBuilder sb = new StringBuilder();
        sb.append("SELECT * FROM recipes WHERE ingredients ");
        for(String ing:ingredientList){
            sb.append("like '%");
            sb.append(ing);
            sb.append("%'");
            sb.append(" AND ingredients ");
        }
        if(sb.lastIndexOf("AND") != -1){
            int index = sb.lastIndexOf("AND");
             preparedStatement = sb.substring(0, index);
        }
        try {
            PreparedStatement ps = connection.prepareStatement(preparedStatement);
            ResultSet rs = ps.executeQuery();
            while(rs.next()){
                UUID idd = UUID.fromString(rs.getString(1));
                String nameOfRecipe = rs.getString(2);
                String timeToCook = rs.getString(3);
                int servings = rs.getInt(4);
                String ingredients = rs.getString(5);
                String instructions = rs.getString(6);
                String typeOfFood = rs.getString(7);
                URL cloudUrl = new URL(rs.getString(8));
                String countryOfOrigin = rs.getString(9);
                URL flag = new URL(rs.getString(10));
                String nutrients = rs.getString(11);
                Recipe recipe = new Recipe(idd, nameOfRecipe, timeToCook, servings, ingredients,
                        instructions, typeOfFood, cloudUrl, countryOfOrigin, flag, nutrients);
                if(recipe != null){
                    recipeList.add(recipe);
                }
            }
            return recipeList;

        } catch (SQLException | MalformedURLException e) {
            e.printStackTrace();
        }
        return null;
    }

    // This method checks if a certain user already has a certain recipe to his favourites
    @Override
    public boolean checkDuplicatedRecipeInUserFavourites(UUID userId, UUID recipeId) {
        List<String> recipesId = new ArrayList<>();
        try {
            PreparedStatement ps = connection.prepareStatement("SELECT id FROM favourites WHERE user_id = ? AND recipe_id = ?");
            ps.setString(1, userId.toString());
            ps.setString(2, recipeId.toString());
            ResultSet rs = ps.executeQuery();
            while(rs.next()){
                String idOfRecipe = rs.getString(1);
                recipesId.add(idOfRecipe);
            }
            if(recipesId.isEmpty()){
                return true;
            }

        } catch (SQLException e) {
            e.printStackTrace();
        }
        return false;
    }

    // This method checks if there are duplicates in db regarding the name of recipe
    @Override
    public boolean checkRecipeDuplicates(String nameOfRecipe) {
        List<String> recipeNames = new ArrayList<>();

        try {
            PreparedStatement ps = connection.prepareStatement("SELECT name_of_recipe FROM recipes where name_of_recipe = ?");
            ps.setString(1, nameOfRecipe);
            ResultSet rs = ps.executeQuery();
            while(rs.next()){
                String name = rs.getString(1);
                recipeNames.add(name);
            }
            if(recipeNames.isEmpty()){
                return true;
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return false;
    }

    // This method checks for duplicates in db for shopping list items with the same recipe
    @Override
    public boolean checkDuplicatesInShoppingList(UUID userId, String nameOfRecipe) {
        List<String> recipeIdFromSHoppingLists = new ArrayList<>();
        try {
            PreparedStatement ps = connection.prepareStatement("SELECT id FROM shopping_list WHERE user_id = ? AND name_of_recipe = ?");
            ps.setString(1, userId.toString());
            ps.setString(2, nameOfRecipe);
            ResultSet rs = ps.executeQuery();
            while(rs.next()){
                String id = rs.getString(1);
                recipeIdFromSHoppingLists.add(id);
            }
            if(recipeIdFromSHoppingLists.isEmpty()){
                return true;
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return false;
    }

    // This method queries for complex search based on user input
    @Override
    public List<Recipe> getRecipesFromComplexSearch(String typeOfFood, int numberOfServings, String timeToCook) {
        List<Recipe> responses = new ArrayList<>();
        try {
            PreparedStatement ps = connection.prepareStatement("SELECT * FROM recipes WHERE type_of_food = ? AND number_of_servings = ? AND time_to_cook = ?");
            ps.setString(1, typeOfFood);
            ps.setInt(2, numberOfServings);
            ps.setString(3, timeToCook);
            ResultSet rs = ps.executeQuery();
            while(rs.next()){
                UUID idd = UUID.fromString(rs.getString(1));
                String nameOfRecipe = rs.getString(2);
                String timeToCookA = rs.getString(3);
                int servings = rs.getInt(4);
                String ingredients = rs.getString(5);
                String instructions = rs.getString(6);
                String typeOfFoodA = rs.getString(7);
                URL cloudUrl = new URL(rs.getString(8));
                String countryOfOrigin = rs.getString(9);
                URL flag = new URL(rs.getString(10));
                String nutrients = rs.getString(11);
                Recipe recipe = new Recipe(idd, nameOfRecipe, timeToCookA, servings, ingredients,
                        instructions, typeOfFoodA, cloudUrl, countryOfOrigin, flag, nutrients);
                if(recipe != null){
                    responses.add(recipe);
                }
            }
            return responses;
        } catch (SQLException | MalformedURLException e) {
            e.printStackTrace();
        }
        return null;
    }

    // This method returns a list of uuid`s by a name of recipe
    @Override
    public List<UUID> getRecipeIdByName(String nameOfRecipe) {
        List<UUID> recipeId = new ArrayList<>();
        try {
            PreparedStatement ps = connection.prepareStatement("SELECT id from recipes WHERE lower(name_of_recipe) = ?");
            ps.setString(1, nameOfRecipe.toLowerCase());
            ResultSet rs = ps.executeQuery();
            while(rs.next()){
                UUID id = UUID.fromString(rs.getString(1));
                recipeId.add(id);
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return recipeId;
    }

    // This method deletes a recipe from a user`s favourites
    @Override
    public boolean deleteFromFavourites(UUID userId, UUID recipeId) {
        try {
            PreparedStatement ps = connection.prepareStatement("DELETE FROM favourites WHERE user_id = ? AND recipe_id = ?");
            ps.setString(1, userId.toString());
            ps.setString(2, recipeId.toString());
            ps.executeUpdate();
            return true;
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return false;
    }


    // This method deletes a recipe from shopping list contains for a certain user
    @Override
    public boolean deleteFromShoppingList(UUID userId, String nameOfRecipe) {
        try {
            PreparedStatement ps = connection.prepareStatement("DELETE FROM shopping_list WHERE user_id = ? AND name_of_recipe = ?");
            ps.setString(1, userId.toString());
            ps.setString(2, nameOfRecipe);
            ps.executeUpdate();
            return true;
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return false;
    }

    // This method deletes all favourites recipe when a user wants to delete account
    @Override
    public boolean deleteAllFavouritesForAUser(UUID userId) {
        try {
            PreparedStatement ps = connection.prepareStatement("DELETE FROM favourites WHERE user_id = ?");
            ps.setString(1, userId.toString());
            ps.executeUpdate();
            return true;
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return false;
    }


    // This method deletes all shopping lists of a user when he deletes his account
    @Override
    public boolean deleteAllShoppingListsForAUser(UUID userId) {
        try {
            PreparedStatement ps = connection.prepareStatement("DELETE FROM shopping_list WHERE user_id = ?");
            ps.setString(1, userId.toString());
            ps.executeUpdate();
            return true;
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return false;
    }


    // This method returns all the advices from db
    @Override
    public List<Advices> getAllAdvices() {
        List<Advices> advices = new ArrayList<>();
        try {
            PreparedStatement ps = connection.prepareStatement("SELECT * FROM advices");
            ResultSet rs = ps.executeQuery();
            while(rs.next()){
                advices.add(new Advices(rs.getString(1)));
            }
            List<Advices> copy = new ArrayList<>(advices);
            return copy;
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return null;
    }
}
