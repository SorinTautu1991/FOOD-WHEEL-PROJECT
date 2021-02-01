<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ page isELIgnored="false" %>
<html>
    <head>
        <title>Add Recipe</title>
        <!-- Bootstrap CSS -->
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.5.3/dist/css/bootstrap.min.css" integrity="sha384-TX8t27EcRE3e/ihU7zmQxVncDAy5uIKz4rEkgIXeMed4M0jlfIDPvg6uqKI2xXr2" crossorigin="anonymous">

    </head>

<body>
<!-- Option 1: jQuery and Bootstrap Bundle (includes Popper) -->
<script src="https://code.jquery.com/jquery-3.5.1.slim.min.js" integrity="sha384-DfXdz2htPH0lsSSs5nCTpuj/zy4C+OGpamoFVy38MVBnE+IbbVYUew+OrCXaRkfj" crossorigin="anonymous"></script>
<script src="https://cdn.jsdelivr.net/npm/bootstrap@4.5.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-ho+j7jyWK8fNQe+A12Hb8AhRq26LrZ/JpcUGGOn+Y7RsweNrtN/tE3MoK7ZeZDyx" crossorigin="anonymous"></script>
<div class="container">

    <!-- Modal -->
    <div class="modal fade" id="exampleModalCenter" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="false" data-backdrop="static" data-keyboard="false">
        <div class="modal-dialog modal-dialog-centered" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <div class="titleMid">
                        <h5 class="modal-title" id="exampleModalCenterTitle">Add recipe</h5>
                    </div>
                    <button id="closeModalBtn" class="close" onclick="redirectPage()" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <form class="was-validated" id="addRecipeForm" name="addRecipeForm" enctype="multipart/form-data" method="post">


                        <%--First row of form--%>
                        <div class="form-row">

                        <%--Name of recipe--%>
                            <div class="col-5">
                                <div class="mb-3">
                                    <input type="text" name="nameRecipe" class="form-control is-invalid" id="nameRecipe" placeholder="Enter the name of the recipe" required>
                                    <div id="duplicateNameOfRecipe"></div>
                                </div>
                            </div>

                        <%--Select time to cook recipe--%>
                            <div class="col-5">
                                <div class="mb-3">
                                    <select name="timeToCook" id="timeToCook" class="custom-select" required>
                                        <option value="">Select time to cook...</option>
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

                        <%--Select the type of food--%>
                            <div class="col-5">
                                <div class="mb-3">
                                    <select name="typeOfFood" id="typeOfFood" class="custom-select" required>
                                        <option value="">Select type of food...</option>
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


                        </div>

                        <%--Second row of form--%>
                            <div class="form-row">


                        <%--Select number of servings--%>
                                <div class="col-5">
                                    <div class="mb-3">
                                        <select name="numberOfServings" id="servings" class="custom-select" required>
                                            <option value="">Select number of servings...</option>
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

                            <div class="col-5">
                                <div class="mb-5">
                                    <div class="input-group is-invalid">
                                        <div class="custom-file">
                                            <label id="custom-file-label" class="custom-file-label" for="foodPic">Food picture</label>
                                            <input type="file" name="foodPic" class="custom-file-input form-control is-invalid" id="foodPic" required>
                                            <div id="foodPic-drop" class="form-control">
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            </div>
                        <div class="form-row">

                        <%--Third row from form--%>
                        <%--Enter the ingredients--%>
                            <div class="col-5">
                                <div class="mb-3">
                                    <input type="text" name="ingredients" class="form-control is-invalid" id="ingredients" placeholder="Enter the ingredients" required>
                                    <div id="ingredientsCheck"></div>
                                </div>
                            </div>

                        <%--Enter the instructions--%>
                            <div class="col-5">
                                <div class="mb-3">
                                    <input type="text" name="instructions" class="form-control is-invalid" id="instructions" placeholder="Enter the instructions" required>
                                    <div id="instructionsCheck"></div>
                                </div>
                            </div>

                        </div>

                            <div class="form-row">
                                <div class="col-5">
                                    <div class="mb-3">
                                        <select name="countryOfOrigin" id="countryOfOrigin" class="custom-select" required>
                                            <option value="">Select origin of food...</option>
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

                            <div class="submit-btn">
                                <input type="submit" id="submit-btn" onsubmit="sendData()">
                            </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</div>




<script>
    <%--    SHow the modal on window load--%>
    $(document).ready(function(){
        $("#exampleModalCenter").modal('show');
    });


    //When user presses the close on the modal window we redirect the page to previous
    function redirectPage(){
        history.back();
    }



    //Sending data from formData to Servlet
    async function sendData() {
        const form = document.getElementById("addRecipeForm");
        const myForm = new FormData(form);
        await fetch("addRecipe", {
            method: "post",
            body: myForm,
        });
    }
</script>




<!-- Option 1: jQuery and Bootstrap Bundle (includes Popper) -->
<script src="https://code.jquery.com/jquery-3.5.1.slim.min.js" integrity="sha384-DfXdz2htPH0lsSSs5nCTpuj/zy4C+OGpamoFVy38MVBnE+IbbVYUew+OrCXaRkfj" crossorigin="anonymous"></script>
<script src="https://cdn.jsdelivr.net/npm/bootstrap@4.5.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-ho+j7jyWK8fNQe+A12Hb8AhRq26LrZ/JpcUGGOn+Y7RsweNrtN/tE3MoK7ZeZDyx" crossorigin="anonymous"></script>
</body>
</html>
