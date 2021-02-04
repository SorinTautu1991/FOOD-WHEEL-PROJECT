<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ page isELIgnored="false" %>




<html>
<head>
    <title>Profile</title>
    <link rel="shortcut icon" type="image/jpg" href="https://res.cloudinary.com/hmzve6z5z/image/upload/v1612007026/ICONS/unnamed.jpg"/>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.5.3/dist/css/bootstrap.min.css" integrity="sha384-TX8t27EcRE3e/ihU7zmQxVncDAy5uIKz4rEkgIXeMed4M0jlfIDPvg6uqKI2xXr2" crossorigin="anonymous">
    <link type="text/css" href="${pageContext.request.contextPath}/CSS/profileStyles.css">
</head>
<body style="background-image: url('https://res.cloudinary.com/hmzve6z5z/image/upload/v1611932727/ICONS/pexels-elle-hughes-1660030.png');background-size:cover;">

<!-- Option 1: jQuery and Bootstrap Bundle (includes Popper) -->
<script src="${pageContext.request.contextPath}/JS/profileJS.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.9.4/Chart.min.js"></script>




<%--Navbar for app--%>
<div class="fixed-top">
    <nav class="navbar navbar-light bg-light" style="box-shadow:0 0 5px black;opacity:0.9;">
            <%--Logo and name of app--%>
            <div class="navbar-brand" style="position: absolute;left:10px;font-size: medium;color:lightseagreen;font-family: Helvetica;text-shadow: 0.5px 0.5px;">
                <img style="width: 35px;height: 35px;border-radius: 50%;box-shadow: 0 0 5px black;" src="https://res.cloudinary.com/hmzve6z5z/image/upload/v1612007026/ICONS/unnamed.jpg" class="d-inline-block align-middle" alt="" loading="lazy">
                Food Wheel
            </div>


        <%--    Search bar--%>
        <form class="form-inline my-auto" id="search-form" style="position:relative;left:30%;" onfocusin="largeSearch()" onfocusout="smallSearch()">
            <input style="width: 250px;background-color: #F8F8F8;color: black;box-shadow: 0 0 5px black;" id="searchInput" class="form-control mr-sm-2" type="search" onkeyup="autoCompleteSearch()" placeholder="Search" aria-label="Search">
            <button id="searchBtn" class="btn btn-outline-info my-2 my-sm-0" style="box-shadow: 0 0 5px black;" type="submit" onclick="searchFunction();return false;">Search</button>
        </form>
        <%--Spin the wheel for random recipe--%>
        <div id="wrapper-spin" style="position: absolute;right:300px;">
            <img id="random-spin" style="background-size: cover;width: 35px;height: 35px;background-repeat: no-repeat;" src="https://res.cloudinary.com/hmzve6z5z/image/upload/v1610223336/ICONS/wheel-removebg-preview.png" onclick="randomFunction()" onmouseover="hoverWheel()" onmouseleave="hoverWheelLeave()">
        </div>

        <%--Favourites icon where the recipes are--%>
        <img id="favourites-basket" src="https://res.cloudinary.com/hmzve6z5z/image/upload/v1611678844/ICONS/favourites_new_icon.svg" style="width: 30px;height:30px;position: absolute;right:190px;" onclick="favouritesBasket()" onmouseover="hoverIcon('favourites-basket')" onmouseleave="hoverIconLeave('favourites-basket')">
        <%--    Avatar image from the loged in user--%>
        <div class="navbar-brand" style="position:absolute;right:70px;">
            <div style="position: relative" class="dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                <div id="img" style="width: 30px;height: 30px;" onmouseover="hoverIcon('img')" onmouseleave="hoverIconLeave('img')"></div>
                <div class="dropdown-menu" style="opacity:0.9;background-color:#c7edff;color:black;width:40px;height:100px;position:relative;top:63px;left:50px;" aria-labelledby="dropdownMenuButton">
                    <a style="color:black;font-family: Helvetica;font-size: small;" class="dropdown-item" href="#" onclick="myAccountDetails();">My account</a>
                    <a style="color:black;font-family: Helvetica;font-size: small;" class="dropdown-item" href="#" onclick="showHelp();">Help</a>
                    <a style="color: black;font-family: Helvetica;font-size: small;" class="dropdown-item" href="#" onclick="logout();">Logout</a>
                </div>
            </div>
        </div>
        <button class="navbar-toggler" id="button-for-collapsed-content" type="button" data-toggle="collapse" data-target="#navbarToggleExternalContent" aria-controls="navbarToggleExternalContent" aria-expanded="false" aria-label="Toggle navigation"style="background-color:rgba(255,255,255, 0.7);padding:0px;">
            <span class="navbar-toggler-icon" onclick="collapseTheResponseBody()"></span>
        </button>
    </nav>
    <div class="collapse" id="navbarToggleExternalContent">
        <div class="p-4" style="background-color: #c7edff;box-shadow:0 0 5px black;opacity:0.9;">
            <img id="addRecipeIcon" src="https://res.cloudinary.com/hmzve6z5z/image/upload/v1609238472/ICONS/ADD_RECIPE_ICON.png" onclick="displayModalAddRecipe();return false;" onmouseover="hoverIcon('addRecipeIcon');" onmouseleave="hoverIconLeave('addRecipeIcon');" style="width: 30px;height: 30px;position: relative;left:180px;">
            <%--Here it is the sopping list icon--%>
            <img id="shopping-list" src="https://res.cloudinary.com/hmzve6z5z/image/upload/v1610220398/ICONS/SHOPPING_LIST_2.png" style="width: 30px;height:30px;position: absolute;left:750px;" onclick="shoppingListContent()" onmouseover="hoverIcon('shopping-list')" onmouseleave="hoverIconLeave('shopping-list')">
            <%--Here is the complex search icon--%>
            <img id="complex-search" src="https://res.cloudinary.com/hmzve6z5z/image/upload/v1610732836/ICONS/search.png" style="width: 30px;height:30px;position: absolute;left:480px;" onclick="complexSearch()" onmouseover="hoverIcon('complex-search')" onmouseleave="hoverIconLeave('complex-search')">
            <%--Here is the search by ingerdients icon--%>
            <img id="search-ingredients" src="https://res.cloudinary.com/hmzve6z5z/image/upload/v1610733505/ICONS/search_ingredients.png" style="width: 30px;height:30px;position: absolute;right:200px;" onclick="searchByIngredients()" onmouseover="hoverIcon('search-ingredients')" onmouseleave="hoverIconLeave('search-ingredients')">
        </div>
    </div>
</div>


<%--Content of webapp--%>
<div class="container" id="container">


<%--This div is only for displaying helpful messages for users--%>
    <div id="wrapperForImg">
    </div>

    <div id="alert" class="alert alert-light" role="alert">
    </div>

<%--AddRecipe modal--%>
    <!-- Modal -->
    <div class="modal fade" id="exampleModalCenter" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="false" data-backdrop="static" data-keyboard="false">
        <div class="modal-dialog modal-dialog-centered" role="document">
            <div class="modal-content" style="background-color: #F8F8F8;opacity:0.9;color: black;box-shadow: 0 0 5px black;">
                <div class="modal-header">
                    <div class="titleMid" style="position: relative;left: 40%;color:lightseagreen;">
                        <h5 class="modal-title" id="exampleModalCenterTitle" style="font-weight: bold;">Add recipe</h5>
                    </div>
                    <button id="closeModalBtn" class="close" onclick="closeRedirectErase()" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <form class="was-validated" id="addRecipeForm" name="addRecipeForm" enctype="multipart/form-data" method="post">

                        <div class="form-row justify-content-center">
                            <div class="col-5">
                                <div class="mb-3">
                                    <input style="background-color: #F8F8F8;color: black;box-shadow: 0 0 5px black;" type="text" name="nameRecipe" class="form-control is-invalid" id="nameRecipe" placeholder="Name of recipe" required>
                                    <div id="duplicateNameOfRecipe"></div>
                                </div>
                            </div>

                            <%--Select time to cook recipe--%>
                            <div class="col-5">
                                <div class="mb-3">
                                    <select style="background-color: #F8F8F8;color: black;box-shadow: 0 0 5px black;" name="timeToCook" id="timeToCook" class="custom-select" required>
                                        <option value="">Time to cook...</option>
                                        <option>30 minutes</option>
                                        <option>60 minutes</option>
                                        <option>90 minutes</option>
                                        <option>120 minutes</option>
                                        <option>150 minutes</option>
                                        <option>180 minutes</option>
                                        <option>210 minutes</option>
                                        <option>230 minutes</option>
                                        <option>260 minutes</option>
                                        <option>290 minutes</option>
                                        <option>320 minutes</option>
                                        <option>350 minutes</option>
                                        <option>380 minutes</option>
                                        <option>410 minutes</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        <%--Second row--%>
                            <div class="form-row justify-content-center">
                            <%--Select the type of food--%>
                            <div class="col-5">
                                <div class="mb-3">
                                    <select style="background-color: #F8F8F8;color: black;box-shadow: 0 0 5px black;" name="typeOfFood" id="typeOfFood" class="custom-select" required>
                                        <option value="">Type of food...</option>
                                        <option>poultry</option>
                                        <option>beef</option>
                                        <option>dairy</option>
                                        <option>fish</option>
                                        <option>fruits</option>
                                        <option>game</option>
                                        <option>lamb</option>
                                        <option>nuts and seeds</option>
                                        <option>offal</option>
                                        <option>pasta</option>
                                        <option>pork</option>
                                        <option>pulses_and_soya</option>
                                        <option>rice_and_grains</option>
                                        <option>salads</option>
                                        <option>shellfish</option>
                                        <option>soups</option>
                                        <option>vegetables</option>
                                    </select>
                                </div>
                            </div>

                            <%--Select number of servings--%>
                            <div class="col-5">
                                <div class="mb-3">
                                    <select style="background-color: #F8F8F8;color: black;box-shadow: 0 0 5px black;" name="numberOfServings" id="servings" class="custom-select" required>
                                        <option value="">Servings...</option>
                                        <option>1</option>
                                        <option>2</option>
                                        <option>3</option>
                                        <option>4</option>
                                        <option>5</option>
                                        <option>6</option>
                                        <option>7</option>
                                        <option>8</option>
                                        <option>9</option>
                                        <option>10</option>
                                        <option>11</option>
                                        <option>12</option>
                                    </select>
                                </div>
                            </div>
                    </div>

                            <%--Third row--%>
                    <div class="form-row justify-content-center">
                        <div class="col-5">
                            <div class="mb-3">
                                <div class="input-group is-invalid">
                                    <div class="custom-file">
                                        <input name="foodPic" type="file" class="custom-file-input" id="validatedInputGroupCustomFile" required>
                                        <label style="background-color: #F8F8F8;color: black;box-shadow: 0 0 5px black;" class="custom-file-label" for="validatedInputGroupCustomFile">Choose pic...</label>
                                    </div>
                                </div>

                            </div>
                    </div>

                        <div class="col-5">
                            <div class="mb-3">
                                <select style="background-color: #F8F8F8;color: black;box-shadow: 0 0 5px black;" name="countryOfOrigin" id="countryOfOrigin" class="custom-select" required>
                                    <option value="">Food origin..</option>
                                    <option>Afghanistan</option>Afghanistan>
                                    <option>Albania</option>
                                    <option>Algeria</option>
                                    <option>Andorra</option>
                                    <option>Angola</option>
                                    <option>Antigua and Barbuda</option>
                                    <option>Argentina</option>
                                    <option>Armenia</option>
                                    <option>Australia</option>
                                    <option>Azerbaijan</option>
                                    <option>Bahamas</option>
                                    <option>Bahrain</option>
                                    <option>Bangladesh</option>
                                    <option>Barbados</option>
                                    <option>Belarus</option>
                                    <option>Belgium</option>
                                    <option>Belize</option>
                                    <option>Benin</option>
                                    <option>Bhutan</option>
                                    <option>Bolivia</option>
                                    <option>Bosnia and Herzegovina</option>
                                    <option>Botswana</option>
                                    <option>Brazil</option>
                                    <option>Brunei Darussalam</option>
                                    <option>Bulgaria</option>
                                    <option>Burkina Faso</option>
                                    <option>Cambodia</option>
                                    <option>Cameroon</option>
                                    <option>Canada</option>
                                    <option>Central African Republic</option>
                                    <option>Chad</option>
                                    <option>Chile</option>
                                    <option>China</option>
                                    <option>Colombia</option>
                                    <option>Comoros</option>
                                    <option>Congo</option>
                                    <option>Congo, The Democratic Republic of The</option>
                                    <option>Costa Rica</option>
                                    <option>Cote D'ivoire</option>
                                    <option>Croatia</option>
                                    <option>Cuba</option>
                                    <option>Cyprus</option>
                                    <option>Czech Republic</option>
                                    <option>Denmark</option>
                                    <option>Djibouti</option>
                                    <option>Dominica</option>
                                    <option>Dominican Republic</option>
                                    <option>Ecuador</option>
                                    <option>Egypt</option>
                                    <option>El Salvador</option>
                                    <option>Equatorial Guinea</option>
                                    <option>Eritrea</option>
                                    <option>Estonia</option>
                                    <option>Ethiopia</option>
                                    <option>Fiji</option>
                                    <option>Finland</option>
                                    <option>France</option>
                                    <option>Gabon</option>
                                    <option>Gambia</option>
                                    <option>Georgia</option>
                                    <option>Germany</option>
                                    <option>Ghana</option>
                                    <option>Greece</option>
                                    <option>Grenada</option>
                                    <option>Guatemala</option>
                                    <option>Guinea</option>
                                    <option>Guinea-bissau</option>
                                    <option>Guyana</option>
                                    <option>Haiti</option>
                                    <option>Honduras</option>
                                    <option>Hungary</option>
                                    <option>Iceland</option>
                                    <option>India</option>
                                    <option>Indonesia</option>
                                    <option>Iran, Islamic Republic of</option>
                                    <option>Iraq</option>
                                    <option>Ireland</option>
                                    <option>Israel</option>
                                    <option>Italy</option>
                                    <option>Jamaica</option>
                                    <option>Japan</option>
                                    <option>Jordan</option>
                                    <option>Kazakhstan</option>
                                    <option>Kenya</option>
                                    <option>Kiribati</option>
                                    <option>Kuwait</option>
                                    <option>Kyrgyzstan</option>
                                    <option>Lebanon</option>
                                    <option>Liberia</option>
                                    <option>Libyan Arab Jamahiriya</option>
                                    <option>Liechtenstein</option>
                                    <option>Lithuania</option>
                                    <option>Luxembourg</option>
                                    <option>Madagascar</option>
                                    <option>Malawi</option>
                                    <option>Malaysia</option>
                                    <option>Maldives</option>
                                    <option>Mali</option>
                                    <option>Malta</option>
                                    <option>Marshall Islands</option>
                                    <option>Mauritania</option>
                                    <option>Mauritius</option>
                                    <option>Mexico</option>
                                    <option>Micronesia, Federated States of</option>
                                    <option>Moldova, Republic of</option>
                                    <option>Monaco</option>
                                    <option>Mongolia</option>
                                    <option>Morocco</option>
                                    <option>Mozambique</option>
                                    <option>Myanmar</option>
                                    <option>Namibia</option>
                                    <option>Nauru</option>
                                    <option>Nepal</option>
                                    <option>Netherlands</option>
                                    <option>New Zealand</option>
                                    <option>Nicaragua</option>
                                    <option>Niger</option>
                                    <option>Nigeria</option>
                                    <option>Norway</option>
                                    <option>Oman</option>
                                    <option>Pakistan</option>
                                    <option>Palau</option>
                                    <option>Palestinian Territory, Occupied</option>
                                    <option>Panama</option>
                                    <option>Papua New Guinea</option>
                                    <option>Paraguay</option>
                                    <option>Peru</option>
                                    <option>Philippines</option>
                                    <option>Poland</option>
                                    <option>Portugal</option>
                                    <option>Qatar</option>
                                    <option>Romania</option>
                                    <option>Russian Federation</option>
                                    <option>Rwanda</option>
                                    <option>Samoa</option>
                                    <option>San Marino</option>
                                    <option>Saudi Arabia</option>
                                    <option>Senegal</option>
                                    <option>Serbia and Montenegro</option>
                                    <option>Seychelles</option>
                                    <option>Sierra Leone</option>
                                    <option>Singapore</option>
                                    <option>Slovakia</option>
                                    <option>Slovenia</option>
                                    <option>Solomon Islands</option>
                                    <option>Somalia</option>
                                    <option>South Africa</option>
                                    <option>Spain</option>
                                    <option>Sri Lanka</option>
                                    <option>Sudan</option>
                                    <option>Suriname</option>
                                    <option>Sweden</option>
                                    <option>Switzerland</option>
                                    <option>Syrian Arab Republic</option>
                                    <option>Taiwan, Province of China</option>
                                    <option>Tanzania, United Republic of</option>
                                    <option>Thailand</option>
                                    <option>Timor-leste</option>
                                    <option>Togo</option>
                                    <option>Tonga</option>
                                    <option>Trinidad and Tobago</option>
                                    <option>Tunisia</option>
                                    <option>Turkey</option>
                                    <option>Turkmenistan</option>
                                    <option>Tuvalu</option>
                                    <option>Uganda</option>
                                    <option>Ukraine</option>
                                    <option>United Arab Emirates</option>
                                    <option>United Kingdom</option>
                                    <option>United States</option>
                                    <option>Uruguay</option>
                                    <option>Uzbekistan</option>
                                    <option>Vanuatu</option>
                                    <option>Venezuela</option>
                                    <option>Viet Nam</option>
                                    <option>Yemen</option>
                                    <option>Zambia</option>
                                    <option>Zimbabwe</option>
                                </select>
                            </div>
                        </div>
                    </div>

                            <%--Fourth row--%>
                        <div class="form-row justify-content-center">
                            <div class="col-10">
                                <div class="mb-3">
                                    <input style="background-color: #F8F8F8;color: black;box-shadow: 0 0 5px black;" type="text" name="ingredients" class="form-control is-invalid" id="ingredients" placeholder="Enter the ingredients" required>
                                    <div id="ingredientsCheck"></div>
                                </div>
                            </div>
                        </div>

                    <%--Fifth row--%>
                    <div class="form-row justify-content-center">
                            <div class="col-10">
                                <div class="mb-5">
                                    <input style="background-color: #F8F8F8;color: black;box-shadow: 0 0 5px black;" type="text" name="instructions" class="form-control is-invalid" id="instructions" placeholder="Enter the instructions" required>
                                    <div id="instructionsCheck"></div>
                                </div>
                            </div>
                    </div>

                    <div class="form-row justify-content-center">
                        <div class="submit-btn">
                            <button class="btn btn-danger" style="width: 110px;height: 35px;margin-bottom: 30px;" type="submit" id="submit-btn-signup" onclick="sendDataFromAddRecipeModal();return false;">Add</button>
                        </div>
                    </div>
                </form>
                </div>
            </div>
        </div>
    </div>




<%--    Search response and other content--%>
    <div id="search-response" class="d-flex justify-content-center" style="display: flex;flex-wrap: wrap">
    </div>


    <%--Modal for detailed recipe--%>
    <!-- Button trigger modal -->
    <!-- Modal -->
    <div class="modal fade" id="modalDetailsRecipe" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true" data-backdrop="static" data-keyboard="false">
        <div class="modal-dialog modal-lg modal-dialog-centered" role="document">
            <div class="modal-content text-center" style="background-color: #F8F8F8;color: black;opacity:0.9;box-shadow: 0 0 5px black;">
                <div class="modal-header">
                    <h5 class="modal-title" style="margin-left: auto;margin-right: 0px;color:lightseagreen;font-weight: bold;" id="detailsTitle"></h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body" id="modal-content-details-recipe">

                </div>
                <div class="modal-footer" id="modalFooter">
                    <button type="button" class="btn btn-danger" style="width: 130px;height:35px;font-size:x-small;" data-dismiss="modal">Close</button>
                </div>
            </div>
        </div>
    </div>




    <%--This modal is the page for Account details--%>
    <div class="modal fade" id="modalAccountDetails" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true" data-backdrop="static" data-keyboard="false">
        <div class="modal-dialog modal-l modal-dialog-centered" role="document">
            <div class="modal-content text-center" style="background-color: #F8F8F8;opacity:0.9;color: black;box-shadow: 0 0 5px black;">
                <div class="modal-header">
                    <h5 class="modal-title" style="margin-left: auto;margin-right: 0px;font-family: Helvetica;color:lightseagreen;font-weight: bold;" id="accountDetails">My account</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close" onclick="clearContentOfModal()">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body" id="account-details-body-modal">

                </div>
                <div class="modal-footer" id="account-details-footer-modal">
                </div>
            </div>
        </div>
    </div>


<%--    This modal is for the download process for the shopping list pdf--%>

    <div class="modal fade" id="modalDownloadList" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true" data-backdrop="static" data-keyboard="false">
        <div class="modal-dialog modal-sm modal-dialog-centered" role="document">
            <div class="modal-content text-center" style="background-color: #F8F8F8;opacity:0.9;color: black;box-shadow: 0 0 5px black;">
                <div class="modal-header">
                    <h5 class="modal-title" style="color:lightseagreen;margin-left: auto;margin-right: 0px;font-weight:bold;" id="downloadTitle">Download shopping list</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close" onclick="clearContentOfModal()">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body" id="download-body-modal">
                    <div>
                        <p>Are you sure you want to download the shopping list?</p>
                    </div>
                    <form id="downloadForm" method="post" action="${pageContext.request.contextPath}/downloadShoppingList">
                        <input name="recName" type="hidden" id="recName">
                        <input name="listIng" type="hidden" id="listIng">
                        <div class="submit-btn">
                            <button class="btn btn-danger" style="width: 110px;" id="dont-download" data-dismiss="modal">No</button>
                            <input class="btn btn-success" style="width: 110px;" type="submit" id="submit-btn-download" value="Submit">
                        </div>
                    </form>
                </div>
                <div class="modal-footer" id="download-modal-footer">
                </div>
            </div>
        </div>
    </div>


    <%--    This modal is for confirming the deletion of a shopping list item--%>

    <div class="modal fade" id="modalDeleteItemShoppingList" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true" data-backdrop="static" data-keyboard="false">
        <div class="modal-dialog modal-l modal-dialog-centered" role="document">
            <div class="modal-content text-center" style="background-color: #F8F8F8;opacity:0.9;color: black;box-shadow: 0 0 5px black;">
                <div class="modal-header">
                    <h5 class="modal-title" style="margin-left: auto;margin-right: 0px;font-weight: bold;color:lightseagreen;" id="title-item-shopping-list-delete-item">Delete shopping list</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close" onclick="clearContentOfModal()">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body" id="shopping-delete-body-modal">

                </div>
                <div class="modal-footer" id="shopping-delete-footer-modal">
                </div>
            </div>
        </div>
    </div>



    <canvas id="myChart" width="150" height="150"></canvas>

    <%--Update account modal--%>
    <div class="modal fade" id="update-account-modal" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="false" data-backdrop="static" data-keyboard="false">
        <div class="modal-dialog modal-dialog-centered" role="document">
            <div class="modal-content" style="opacity: 0.9;background-color: #F8F8F8;color:black;box-shadow: 0 0 5px black;">
                <div class="modal-header">
                    <div class="titleMid">
                        <h5 style="margin-left:150px;font-weight:bold;color:lightseagreen;" class="modal-title" id="exampleModalCenterTitleSignup">Update account</h5>
                    </div>
                    <button id="closeModalUpdateAccount" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <form class="was-validated" id="update-account-form" name="updateForm" enctype="multipart/form-data" method="post">

                        <div class="form-row justify-content-center">

                            <div class="col-5">
                                <div class="mb-3">
                                    <input type="text" style="background-color: #F8F8F8;box-shadow:0 0 5px black;" name="firstNameUpdate" class="form-control is-invalid" id="firstNameUpdate" placeholder="Enter your first name" required>
                                </div>
                            </div>

                            <div class="col-5">
                                <div class="mb-3">
                                    <input style="background-color: #F8F8F8;box-shadow:0 0 5px black;" type="text" pattern="^([- \w\d\u00c0-\u024f]+)$" name="lastNameUpdate" class="form-control is-invalid" id="lastNameUpdate" placeholder="Enter your last name" required>
                                </div>
                            </div>
                        </div>


                        <div class="form-row justify-content-center">

                            <div class="col-5">
                                <div class="mb-3">
                                    <input style="background-color: #F8F8F8;box-shadow:0 0 5px black;" pattern="^([- \w\d\u00c0-\u024f]+)$" type="text" name="addressUpdate" class="form-control is-invalid" id="addressUpdate" placeholder="Enter your address" required>
                                </div>
                            </div>

                            <div class="col-5">
                                <div class="mb-3">
                                    <select name="countryUpdate" id="countryUpdate" style="background-color: #F8F8F8;box-shadow:0 0 5px black;" class="custom-select" required>
                                        <option value="">Select country...</option>
                                        <option>Afghanistan</option>Afghanistan>
                                        <option>Albania</option>
                                        <option>Algeria</option>
                                        <option>American Samoa</option>
                                        <option>Andorra</option>
                                        <option>Angola</option>
                                        <option>Anguilla</option>
                                        <option>Antarctica</option>
                                        <option>Antigua and Barbuda</option>
                                        <option>Argentina</option>
                                        <option>Armenia</option>
                                        <option>Aruba</option>
                                        <option>Australia</option>
                                        <option>Austria</option>
                                        <option>Azerbaijan</option>
                                        <option>Bahamas</option>
                                        <option>Bahrain</option>
                                        <option>Bangladesh</option>
                                        <option>Barbados</option>
                                        <option>Belarus</option>
                                        <option>Belgium</option>
                                        <option>Belize</option>
                                        <option>Benin</option>
                                        <option>Bermuda</option>
                                        <option>Bhutan</option>
                                        <option>Bolivia</option>
                                        <option>Bosnia and Herzegovina</option>
                                        <option>Botswana</option>
                                        <option>Bouvet Island</option>
                                        <option>Brazil</option>
                                        <option>British Indian Ocean Territory</option>
                                        <option>Brunei Darussalam</option>
                                        <option>Bulgaria</option>
                                        <option>Burkina Faso</option>
                                        <option>Burundi</option>
                                        <option>Cambodia</option>
                                        <option>Cameroon</option>
                                        <option>Canada</option>
                                        <option>Cape Verde</option>
                                        <option>Cayman Islands</option>
                                        <option>Central African Republic</option>
                                        <option>Chad</option>
                                        <option>Chile</option>
                                        <option>China</option>
                                        <option>Christmas Island</option>
                                        <option>Cocos (Keeling) Islands</option>
                                        <option>Colombia</option>
                                        <option>Comoros</option>
                                        <option>Congo</option>
                                        <option>Congo, The Democratic Republic of The</option>
                                        <option>Cook Islands</option>
                                        <option>Costa Rica</option>
                                        <option>Cote D'ivoire</option>
                                        <option>Croatia</option>
                                        <option>Cuba</option>
                                        <option>Cyprus</option>
                                        <option>Czech Republic</option>
                                        <option>Denmark</option>
                                        <option>Djibouti</option>
                                        <option>Dominica</option>
                                        <option>Dominican Republic</option>
                                        <option>Ecuador</option>
                                        <option>Egypt</option>
                                        <option>El Salvador</option>
                                        <option>Equatorial Guinea</option>
                                        <option>Eritrea</option>
                                        <option>Estonia</option>
                                        <option>Ethiopia</option>
                                        <option>Falkland Islands (Malvinas)</option>
                                        <option>Faroe Islands</option>
                                        <option>Fiji</option>
                                        <option>Finland</option>
                                        <option>France</option>
                                        <option>French Guiana</option>
                                        <option>French Polynesia</option>
                                        <option>French Southern Territories</option>
                                        <option>Gabon</option>
                                        <option>Gambia</option>
                                        <option>Georgia</option>
                                        <option>Germany</option>
                                        <option>Ghana</option>
                                        <option>Gibraltar</option>
                                        <option>Greece</option>
                                        <option>Greenland</option>
                                        <option>Grenada</option>
                                        <option>Guadeloupe</option>
                                        <option>Guam</option>
                                        <option>Guatemala</option>
                                        <option>Guinea</option>
                                        <option>Guinea-bissau</option>
                                        <option>Guyana</option>
                                        <option>Haiti</option>
                                        <option>Heard Island and Mcdonald Islands</option>
                                        <option>Holy See (Vatican City State)</option>
                                        <option>Honduras</option>
                                        <option>Hong Kong</option>
                                        <option>Hungary</option>
                                        <option>Iceland</option>
                                        <option>India</option>
                                        <option>Indonesia</option>
                                        <option>Iran, Islamic Republic of</option>
                                        <option>Iraq</option>
                                        <option>Ireland</option>
                                        <option>Israel</option>
                                        <option>Italy</option>
                                        <option>Jamaica</option>
                                        <option>Japan</option>
                                        <option>Jordan</option>
                                        <option>Kazakhstan</option>
                                        <option>Kenya</option>
                                        <option>Kiribati</option>
                                        <option>Korea, Democratic People's Republic of</option>
                                        <option>Korea, Republic of</option>
                                        <option>Kuwait</option>
                                        <option>Kyrgyzstan</option>
                                        <option>Lao People's Democratic Republic</option>
                                        <option>Latvia</option>
                                        <option>Lebanon</option>
                                        <option>Lesotho</option>
                                        <option>Liberia</option>
                                        <option>Libyan Arab Jamahiriya</option>
                                        <option>Liechtenstein</option>
                                        <option>Lithuania</option>
                                        <option>Luxembourg</option>
                                        <option>Macao</option>
                                        <option>Macedonia, The Former Yugoslav Republic of</option>
                                        <option>Madagascar</option>
                                        <option>Malawi</option>
                                        <option>Malaysia</option>
                                        <option>Maldives</option>
                                        <option>Mali</option>
                                        <option>Malta</option>
                                        <option>Marshall Islands</option>
                                        <option>Martinique</option>
                                        <option>Mauritania</option>
                                        <option>Mauritius</option>
                                        <option>Mayotte</option>
                                        <option>Mexico</option>
                                        <option>Micronesia, Federated States of</option>
                                        <option>Moldova, Republic of</option>
                                        <option>Monaco</option>
                                        <option>Mongolia</option>
                                        <option>Montserrat</option>
                                        <option>Morocco</option>
                                        <option>Mozambique</option>
                                        <option>Myanmar</option>
                                        <option>Namibia</option>
                                        <option>Nauru</option>
                                        <option>Nepal</option>
                                        <option>Netherlands</option>
                                        <option>Netherlands Antilles</option>
                                        <option>New Caledonia</option>
                                        <option>New Zealand</option>
                                        <option>Nicaragua</option>
                                        <option>Niger</option>
                                        <option>Nigeria</option>
                                        <option>Niue</option>
                                        <option>Norfolk Island</option>
                                        <option>Northern Mariana Islands</option>
                                        <option>Norway</option>
                                        <option>Oman</option>
                                        <option>Pakistan</option>
                                        <option>Palau</option>
                                        <option>Palestinian Territory, Occupied</option>
                                        <option>Panama</option>
                                        <option>Papua New Guinea</option>
                                        <option>Paraguay</option>
                                        <option>Peru</option>
                                        <option>Philippines</option>
                                        <option>Pitcairn</option>
                                        <option>Poland</option>
                                        <option>Portugal</option>
                                        <option>Puerto Rico</option>
                                        <option>Qatar</option>
                                        <option>Reunion</option>
                                        <option>Romania</option>
                                        <option>Russian Federation</option>
                                        <option>Rwanda</option>
                                        <option>Saint Helena</option>
                                        <option>Saint Kitts and Nevis</option>
                                        <option>Saint Lucia</option>
                                        <option>Saint Pierre and Miquelon</option>
                                        <option>Saint Vincent and The Grenadines</option>
                                        <option>Samoa</option>
                                        <option>San Marino</option>
                                        <option>Sao Tome and Principe</option>
                                        <option>Saudi Arabia</option>
                                        <option>Senegal</option>
                                        <option>Serbia and Montenegro</option>
                                        <option>Seychelles</option>
                                        <option>Sierra Leone</option>
                                        <option>Singapore</option>
                                        <option>Slovakia</option>
                                        <option>Slovenia</option>
                                        <option>Solomon Islands</option>
                                        <option>Somalia</option>
                                        <option>South Africa</option>
                                        <option>South Georgia and The South Sandwich Islands</option>
                                        <option>Spain</option>
                                        <option>Sri Lanka</option>
                                        <option>Sudan</option>
                                        <option>Suriname</option>
                                        <option>Svalbard and Jan Mayen</option>
                                        <option>Swaziland</option>
                                        <option>Sweden</option>
                                        <option>Switzerland</option>
                                        <option>Syrian Arab Republic</option>
                                        <option>Taiwan, Province of China</option>
                                        <option>Tajikistan</option>
                                        <option>Tanzania, United Republic of</option>
                                        <option>Thailand</option>
                                        <option>Timor-leste</option>
                                        <option>Togo</option>
                                        <option>Tokelau</option>
                                        <option>Tonga</option>
                                        <option>Trinidad and Tobago</option>
                                        <option>Tunisia</option>
                                        <option>Turkey</option>
                                        <option>Turkmenistan</option>
                                        <option>Turks and Caicos Islands</option>
                                        <option>Tuvalu</option>
                                        <option>Uganda</option>
                                        <option>Ukraine</option>
                                        <option>United Arab Emirates</option>
                                        <option>United Kingdom</option>
                                        <option>United States</option>
                                        <option>United States Minor Outlying Islands</option>
                                        <option>Uruguay</option>
                                        <option>Uzbekistan</option>
                                        <option>Vanuatu</option>
                                        <option>Venezuela</option>
                                        <option>Viet Nam</option>
                                        <option>Virgin Islands, British</option>
                                        <option>Virgin Islands, U.S</option>
                                        <option>Wallis and Futuna</option>
                                        <option>Western Sahara</option>
                                        <option>Yemen</option>
                                        <option>Zambia</option>
                                        <option>Zimbabwe</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div class="form-row justify-content-center">

                            <div class="col-5">
                                <div class="mb-3">
                                    <input style="background-color: #F8F8F8;box-shadow:0 0 5px black;" name="emailOneUpdate" pattern="^(([-\w\d]+)(\.[-\w\d]+)*@([-\w\d]+)(\.[-\w\d]+)*(\.([a-zA-Z]{2,5}|[\d]{1,3})){1,2})$" type="email" class="form-control is-invalid" id="emailOneUpdate" placeholder="Enter your email" required>
                                </div>
                            </div>

                            <div class="col-5">
                                <div class="mb-3">
                                    <input type="email" style="background-color: #F8F8F8;box-shadow:0 0 5px black;" name="emailTwoUpdate"  pattern="^(([-\w\d]+)(\.[-\w\d]+)*@([-\w\d]+)(\.[-\w\d]+)*(\.([a-zA-Z]{2,5}|[\d]{1,3})){1,2})$" class="form-control is-invalid" id="emailTwoUpdate" placeholder="Confirm your email" required>
                                </div>
                            </div>
                            <span class="messageEmail" id="messageEmail"></span>
                        </div>

                        <div class="form-row justify-content-center">
                            <div class="col-5">
                                <div class="mb-3">
                                    <input type="password" style="background-color: #F8F8F8;box-shadow:0 0 5px black;" pattern="^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{7,15}$" name="passwordOneUpdate" class="form-control is-invalid" id="passwordOneUpdate" placeholder="Enter your password" required>
                                </div>
                            </div>

                            <div class="col-5">
                                <div class="mb-3">
                                    <input type="password" style="background-color: #F8F8F8;box-shadow:0 0 5px black;" pattern="^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{7,15}$" name="passwordTwoUpdate" class="form-control is-invalid" id="passwordTwoUpdate" placeholder="Confirm your password" required>
                                </div>
                            </div>
                        </div>

                        <div class="form-row justify-content-center">

                            <div class="col-5">
                                <div class="mb-3">
                                    <input type="date" style="background-color: #F8F8F8;box-shadow:0 0 5px black;" name="dateUpdate" class="form-control is-invalid" id="dateUpdate" placeholder="Select your birth date" required>
                                </div>
                            </div>

                            <div class="col-5">
                                <div class="mb-3">
                                    <select style="background-color: #F8F8F8;box-shadow:0 0 5px black;" id="genderUpdate" name="genderUpdate" class="custom-select" required>
                                        <option value="">Select your gender...</option>
                                        <option value="1">Male</option>
                                        <option value="2">Female</option>
                                        <option value="3">Non-disclosure</option>
                                    </select>
                                </div>
                            </div>

                        </div>
                        <div class="form-row justify-content-center">

                            <div class="col-5">
                                <div class="mb-3">
                                    <input style="background-color: #F8F8F8;box-shadow:0 0 5px black;" type="text" name="usernameUpdate" class="form-control is-invalid" id="usernameUpdate" placeholder="Enter your username" required>
                                </div>
                            </div>


                            <div class="col-5">
                                <div class="mb-5">
                                    <div class="input-group is-invalid">
                                        <div class="custom-file">
                                            <input name="avatarUpdate" type="file" class="custom-file-input" id="avatarUpdate" required>
                                            <label style="background-color: #F8F8F8;box-shadow:0 0 5px black;" class="custom-file-label" for="avatarUpdate">Choose pic...</label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>


                        <div class="submit-btn">
                            <button class="btn btn-danger" style="width: 110px;height:35px;font-size: small;margin-left:170px;box-shadow: 0 0 5px black;" type="submit" id="submit-btn-update" onclick="sendDataUpdate();return false;">Submit</button>
                        </div>

                    </form>
                </div>
                <div class="modal-footer">

                </div>
            </div>
        </div>
    </div>

    <%--This modal is displayed when the help btn is clicked--%>
    <div class="modal fade" id="modal-help" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true" data-backdrop="static" data-keyboard="false">
        <div class="modal-dialog modal-medium modal-dialog-centered" role="document">
            <div class="modal-content text-left" style="background-color: #F8F8F8;color: black;opacity:0.9;box-shadow: 0 0 5px black;">
                <div class="modal-header">
                    <h5 class="modal-title" style="margin-left: auto;margin-right: 0px;color:lightseagreen;font-weight: bold;font-family: Helvetica;" id="tutorial-title">Help</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body" id="modal-body-help">

                </div>
                <div class="modal-footer" id="modal-footer-help">
                    <button type="button" class="btn btn-danger" style="width: 130px;height:35px;font-size:x-small;" data-dismiss="modal">Close</button>
                </div>
            </div>
        </div>
    </div>














</div>
<%--Icon for removing items from page--%>
<img id="clear-screen-icon" src="https://res.cloudinary.com/hmzve6z5z/image/upload/v1611939378/ICONS/close.svg" style="width: 40px;height: 40px;position: fixed;bottom:10px;right:10px;opacity:0.8;" onclick="clearScreen()" onmouseenter="hoverClearIcon()" onmouseleave="unHoverIconClear()">




<!-- Option 1: jQuery and Bootstrap Bundle (includes Popper) -->
<script src="https://code.jquery.com/jquery-3.5.1.slim.min.js" integrity="sha384-DfXdz2htPH0lsSSs5nCTpuj/zy4C+OGpamoFVy38MVBnE+IbbVYUew+OrCXaRkfj" crossorigin="anonymous"></script>
<script src="https://cdn.jsdelivr.net/npm/popper.js@1.16.1/dist/umd/popper.min.js" integrity="sha384-9/reFTGAW83EW2RDu2S0VKaIzap3H66lZH81PoYlFhbGU+6BZp6G7niu735Sk7lN" crossorigin="anonymous"></script>
<script src="https://cdn.jsdelivr.net/npm/bootstrap@4.5.3/dist/js/bootstrap.min.js" integrity="sha384-w1Q4orYjBQndcko6MimVbzY0tgp4pWB4lZ7lr30WKz0vr/aWKhXdBNmNb5D92v7s" crossorigin="anonymous"></script>
</body>
</html>
