<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ page isELIgnored="false" %>


<html>
<head>
    <%--Favicon--%>
    <title>FoodWheel</title>
    <link rel="shortcut icon" type="image/jpg" href="https://res.cloudinary.com/hmzve6z5z/image/upload/v1612007026/ICONS/unnamed.jpg"/>
    <!-- Style sheets CSS -->
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.5.3/dist/css/bootstrap.min.css" integrity="sha384-TX8t27EcRE3e/ihU7zmQxVncDAy5uIKz4rEkgIXeMed4M0jlfIDPvg6uqKI2xXr2" crossorigin="anonymous">
    <link rel="stylesheet" href="${pageContext.request.contextPath}/CSS/indexStyles.css">
</head>
<body style="background-image: url('https://res.cloudinary.com/hmzve6z5z/image/upload/v1611932727/ICONS/pexels-elle-hughes-1660030.png');background-size: cover; background-repeat: no-repeat;">
<script src="${pageContext.request.contextPath}/JS/indexJS.js"></script>


<%--Navbar for app--%>
<div class="fixed-top">
    <nav id="navbar-top-home" class="navbar navbar-light bg-light navbar-expand-sm" style="box-shadow:0 0 5px black;opacity:0.9;height:56px;">
        <%--Logo and name of app--%>
        <div id="navbar-brand" class="navbar-brand" style="position: absolute;left:10px;font-size: medium;color:lightseagreen;font-family: Helvetica;text-shadow: 0.5px 0.5px;">
            <img style="width: 35px;height: 35px;border-radius: 50%;box-shadow: 0 0 5px black;" id="img-logo" src="https://res.cloudinary.com/hmzve6z5z/image/upload/v1612007026/ICONS/unnamed.jpg" class="d-inline-block align-middle" alt="" loading="lazy">
            Food Wheel
        </div>

        <%--Search bar--%>
        <form class="form-inline my-auto" id="search-form-home" style="position:relative;left:30%;" onfocusin="largeSearchHome()" onfocusout="smallSearchHome()">
            <input style="width: 250px;background-color: #F8F8F8;color: black;box-shadow: 0 0 5px black;" id="searchInputHome" class="form-control mr-sm-2" type="search" onkeyup="autoCompleteSearchHome()" placeholder="Search" aria-label="Search">
            <button id="searchBtn" class="btn btn-outline-info my-2 my-sm-0" style="box-shadow: 0 0 5px black;" type="submit" onclick="searchFunctionHome();return false;">Search</button>
        </form>
        <%--Random spin wheel--%>
        <div id="wrapper-spin-home" style="position: absolute;right:190px;width: 40px;height: 40px;">
            <img id="random-spin-home" style="background-size: cover;background-repeat: no-repeat;width: 35px;height: 35px;" src="https://res.cloudinary.com/hmzve6z5z/image/upload/v1610223336/ICONS/wheel-removebg-preview.png" onclick="randomFunctionHome()" onmouseover="hoverWheelHome()" onmouseleave="hoverWheelLeaveHome()">
        </div>

        <%--Button for login--%>
        <button class="btn btn-outline-info" style="border:none;width: 80px;height: 35px;color:black;position: absolute;right:95px;font-size: small;" onclick="showLogin();return false;">Login</button>
        <%--Button for register--%>
        <button class="btn btn-outline-info" style="width: 80px;height: 35px;color:black;position: absolute;right:10px;font-size: small;"onclick="showModalSignUp();return false;">Register</button>
    </nav>
</div>


<%--Container for bootstrap--%>
<div class="container" id="container-display">


    <%--Login with GS--%>
    <div class="modal fade" id="loginModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="false" data-backdrop="static" data-keyboard="false">
        <div class="modal-dialog modal-dialog-centered" role="document">
            <div class="modal-content" style="opacity:0.9;background-color:#F8F8F8;box-shadow: 0 0 5px black;">
                <div class="modal-header">
                    <div class="titleMid" style="position: absolute;left:45%;">
                        <h5 class="modal-title" id="exampleModalCenter" style="font-weight: bold;color:lightseagreen;">Login</h5>
                    </div>

                    <button id="closeModal" class="close" data-dismiss="modal" aria-label="Close" onclick="clearElementsLogin()">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <form class="was-validated" id="loginFormgs" name="loginForm" method="post">
                        <div class="form-row">
                            <div class="col-5">
                                <div class="mb-3">
                                    <input style="background-color:#F8F8F8;box-shadow: 0 0 5px black;" type="email" name="email" class="form-control is-invalid" id="emailgs" pattern="^(([-\w\d]+)(\.[-\w\d]+)*@([-\w\d]+)(\.[-\w\d]+)*(\.([a-zA-Z]{2,5}|[\d]{1,3})){1,2})$" placeholder="Enter your email" required>
                                </div>
                            </div>
                        </div>
                        <div class="form-row">
                            <div class="col-5">
                                <div class="mb-3">
                                    <input style="background-color:#F8F8F8;box-shadow: 0 0 5px black;" type="password" pattern="^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{7,15}$" name="password" class="form-control is-invalid" id="passwordgs" placeholder="Enter your password" required>
                                </div>
                            </div>
                        </div>
                        <div class="submit-btn" style="margin-bottom: 10px;">
                            <button class="btn btn-danger" id="submitModalLogin" type="submit" onclick="sendDataLogin();return false;">Login</button>
                        </div>

                        <a href="#" onclick="showModalSignUp();return false;">Don`t have an account ? Register one</a>

                    </form>
                </div>
            </div>
        </div>
    </div>



    <%--Signup modal form--%>
    <!-- Modal -->
    <div class="modal fade" id="exampleModalCenterSignup" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="false" data-backdrop="static" data-keyboard="false">
        <div class="modal-dialog modal-dialog-centered" role="document">
            <div class="modal-content" style="background-color:#F8F8F8;box-shadow: 0 0 5px black;opacity: 0.9;">
                <div class="modal-header">
                    <div class="titleMid">
                        <h5 class="modal-title" style="font-weight: bold;color:lightseagreen;" id="exampleModalCenterTitleSignup">Register</h5>
                    </div>
                    <button id="closeModalBtn" class="close" data-dismiss="modal" onclick="clearElementsOfModalFormAfterHide()" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <form class="was-validated" id="mySignUpForm" name="myForm" enctype="multipart/form-data" method="post">

                        <div class="form-row">

                            <div class="col-5">
                                <div class="mb-3">
                                    <input style="background-color:#F8F8F8;box-shadow: 0 0 5px black;" type="text" name="firstName" class="form-control is-invalid" id="firstName" placeholder="Enter your first name" required>
                                    <div id="duplicateFirstName"></div>
                                </div>
                            </div>

                            <div class="col-5">
                                <div class="mb-3">
                                    <input style="background-color:#F8F8F8;box-shadow: 0 0 5px black;" type="text" pattern="^([- \w\d\u00c0-\u024f]+)$" name="lastName" class="form-control is-invalid" id="lastName" placeholder="Enter your last name" required>
                                    <div id="duplicateLastName"></div>
                                </div>
                            </div>
                        </div>


                        <div class="form-row">

                            <div class="col-5">
                                <div class="mb-3">
                                    <input style="background-color:#F8F8F8;box-shadow: 0 0 5px black;" pattern="^([- \w\d\u00c0-\u024f]+)$" type="text" name="address" class="form-control is-invalid" id="address" placeholder="Enter your address" required>
                                </div>
                            </div>

                            <div class="col-5">
                                <div class="mb-3">
                                    <select style="background-color:#F8F8F8;box-shadow: 0 0 5px black;" name="country" id="country" class="custom-select" required>
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


                        <div class="form-row">

                            <div class="col-5">
                                <div class="mb-3">
                                    <input style="background-color:#F8F8F8;box-shadow: 0 0 5px black;" name="emailOne" pattern="^(([-\w\d]+)(\.[-\w\d]+)*@([-\w\d]+)(\.[-\w\d]+)*(\.([a-zA-Z]{2,5}|[\d]{1,3})){1,2})$" type="email" class="form-control is-invalid" id="emailOne" placeholder="Enter your email" required>
                                </div>
                            </div>

                            <div class="col-5">
                                <div class="mb-3">
                                    <input style="background-color:#F8F8F8;box-shadow: 0 0 5px black;" type="email" name="emailTwo"  pattern="^(([-\w\d]+)(\.[-\w\d]+)*@([-\w\d]+)(\.[-\w\d]+)*(\.([a-zA-Z]{2,5}|[\d]{1,3})){1,2})$" class="form-control is-invalid" id="emailTwo" placeholder="Confirm your email" required>
                                    <div id="duplicateEmail"></div>
                                </div>
                            </div>
                            <span class="messageEmail" id="messageEmail"></span>
                        </div>

                        <div class="form-row">
                            <div class="col-5">
                                <div class="mb-3">
                                    <input style="background-color:#F8F8F8;box-shadow: 0 0 5px black;" type="password" pattern="^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{7,15}$" name="passwordOne" class="form-control is-invalid" id="passwordOne" placeholder="Enter your password" required>
                                </div>
                            </div>
                            <span class="passOneMsg" id="passOneMsg"></span>

                            <div class="col-5">
                                <div class="mb-3">
                                    <input style="background-color:#F8F8F8;box-shadow: 0 0 5px black;" type="password" pattern="^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{7,15}$" name="passwordTwo" class="form-control is-invalid" id="passwordTwo" placeholder="Confirm your password" required>
                                </div>
                            </div>
                            <span class="message" id="message"></span>

                        </div>

                        <div class="form-row">

                            <div class="col-5">
                                <div class="mb-3">
                                    <input style="background-color:#F8F8F8;box-shadow: 0 0 5px black;" type="date" name="date" class="form-control is-invalid" id="date" placeholder="Select your birth date" required>
                                </div>
                            </div>

                            <div class="col-5">
                                <div class="mb-3">
                                    <select style="background-color:#F8F8F8;box-shadow: 0 0 5px black;" id="gender" name="gender" class="custom-select" required>
                                        <option value="">Select your gender...</option>
                                        <option value="1">Male</option>
                                        <option value="2">Female</option>
                                        <option value="3">Non-disclosure</option>
                                    </select>
                                </div>
                            </div>

                        </div>
                        <div class="form-row">

                            <div class="col-5">
                                <div class="mb-3">
                                    <input style="background-color:#F8F8F8;box-shadow: 0 0 5px black;" type="text" name="username" class="form-control is-invalid" id="username" placeholder="Enter your username" required>
                                </div>
                            </div>


                            <div class="col-5">
                                <div class="mb-5">
                                    <div class="input-group is-invalid">
                                        <div class="custom-file">
                                            <input style="background-color:#F8F8F8;box-shadow: 0 0 5px black;" name="avatar" type="file" class="custom-file-input" id="avatar" required>
                                            <label style="background-color: #F8F8F8;box-shadow: 0 0 5px black;" class="custom-file-label" for="avatar">Choose pic...</label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>


                        <div class="submit-btn">
                            <button class="btn btn-danger" type="submit" id="submit-btn-signup" onclick="sendDataSignUp();return false;">Submit</button>
                        </div>

                    </form>
                </div>
                <div class="modal-footer">
                    <a href="#" onclick="showLogin();return false;">Already have an account? Login</a>
                </div>
            </div>
        </div>
    </div>



    <%--    Search response and other content--%>
    <div id="search-response-home" class="d-flex justify-content-center" style="display: flex;flex-wrap: wrap">
    </div>



    <%--Modal for detailed recipe--%>
    <!-- Button trigger modal -->
    <!-- Modal -->
    <div class="modal fade" id="modalDetailsRecipeHome" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true" data-backdrop="static" data-keyboard="false">
        <div class="modal-dialog modal-lg modal-dialog-centered" role="document">
            <div class="modal-content text-center" style="background-color: #F8F8F8;color: black;opacity:0.9;box-shadow: 0 0 5px black;">
                <div class="modal-header">
                    <h5 class="modal-title" style="margin-left: auto;margin-right: 0px;color:lightseagreen;font-weight: bold;" id="detailsTitleHome"></h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body" id="modal-content-details-recipe-home">

                </div>
                <div class="modal-footer" id="modalFooter">
                    <button type="button" class="btn btn-danger" style="width: 130px;height:35px;font-size:x-small;" data-dismiss="modal">Close</button>
                </div>
            </div>
        </div>
    </div>

    <%--This modal is displayed after page load to explain the user what the app does--%>
    <div class="modal fade" id="modal-tutorial" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true" data-backdrop="static" data-keyboard="false">
        <div class="modal-dialog modal-medium modal-dialog-centered" role="document">
            <div class="modal-content text-left" style="background-color: #F8F8F8;color: black;opacity:0.9;box-shadow: 0 0 5px black;">
                <div class="modal-header">
                    <h5 class="modal-title" style="margin-left: auto;margin-right: 0px;color:lightseagreen;font-weight: bold;font-family: Helvetica;" id="tutorial-title"><img src="https://res.cloudinary.com/hmzve6z5z/image/upload/v1612007026/ICONS/unnamed.jpg" style="width: 20px;height: 20px;position: absolute;left:120px;margin-top:4px;">FoodWheel Tutorial</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body" id="modal-body-tutorial">

                </div>
                <div class="modal-footer" id="modal-footer-tutorial">
                    <button type="button" class="btn btn-danger" style="width: 130px;height:35px;font-size:x-small;" data-dismiss="modal">Close</button>
                </div>
            </div>
        </div>
    </div>


</div>





<%--Div for displaying carrousell of recipes--%>
<div class="container-fluid justify-content-center" id="container-for-carousel" style="width: 100%;height:120px;background-color:#F8F8F8;box-shadow:0 0 5px black;opacity:0.9;position:absolute;bottom:65px;display: flex;">
    <div style="box-shadow: 0 0 5px black;margin-right: 5px;background-color: #F8F8F8;" id="carousel-one" class="carousel slide" data-ride="carousel">
    </div>
    <div style="box-shadow: 0 0 5px black;margin-right: 5px;background-color: #F8F8F8;" id="carousel-two" class="carousel slide" data-ride="carousel">
    </div>
    <div style="box-shadow: 0 0 5px black;margin-right: 5px;background-color: #F8F8F8;" id="carousel-three" class="carousel slide" data-ride="carousel">
    </div>
    <div style="box-shadow: 0 0 5px black;margin-right: 5px;background-color: #F8F8F8;" id="carousel-four" class="carousel slide" data-ride="carousel">
    </div>
    <div style="box-shadow: 0 0 5px black;margin-right: 5px;background-color: #F8F8F8;" id="carousel-five" class="carousel slide" data-ride="carousel">
    </div>
    <div style="box-shadow: 0 0 5px black;margin-right: 5px;background-color: #F8F8F8;" id="carousel-six" class="carousel slide" data-ride="carousel">
    </div>
    <div style="box-shadow: 0 0 5px black;margin-right: 5px;background-color: #F8F8F8;" id="carousel-seven" class="carousel slide" data-ride="carousel">
    </div>
</div>


<%--Bottom navbar--%>
<nav class="navbar fixed-bottom" style="opacity:0.9;height: 56px;font-family:Helvetica;text-align:center;font-size: x-small;">
    <ul style="list-style-type: none;position: absolute;left:45%;margin-top:10px;">
        <li><img src="https://res.cloudinary.com/hmzve6z5z/image/upload/v1611826029/ICONS/copyright.svg" style="width:10px; height:10px;">2021 FoodWheel</li>
        <li>Follow us on</li>
        <li><img src="https://res.cloudinary.com/hmzve6z5z/image/upload/v1611827352/ICONS/facebook.svg" style="width:15px; height:15px;margin-right:5px;"><img src="https://res.cloudinary.com/hmzve6z5z/image/upload/v1611827352/ICONS/instagram.svg" style="width:15px; height:15px;"></li>
    </ul>
    <%--Icon for removing items from page--%>
    <img id="clear-screen-icon-home" src="https://res.cloudinary.com/hmzve6z5z/image/upload/v1611939378/ICONS/close.svg" style="width: 40px;height: 40px;position: fixed;bottom:5px;right:10px;opacity:0.8;" onclick="clearScreenHome()" onmouseenter="hoverClearIconHome()" onmouseleave="unHoverIconClearHome()">

</nav>
<script src="https://code.jquery.com/jquery-3.5.1.slim.min.js" integrity="sha384-DfXdz2htPH0lsSSs5nCTpuj/zy4C+OGpamoFVy38MVBnE+IbbVYUew+OrCXaRkfj" crossorigin="anonymous"></script>
<script src="https://cdn.jsdelivr.net/npm/popper.js@1.16.1/dist/umd/popper.min.js" integrity="sha384-9/reFTGAW83EW2RDu2S0VKaIzap3H66lZH81PoYlFhbGU+6BZp6G7niu735Sk7lN" crossorigin="anonymous"></script>
<script src="https://cdn.jsdelivr.net/npm/bootstrap@4.5.3/dist/js/bootstrap.min.js" integrity="sha384-w1Q4orYjBQndcko6MimVbzY0tgp4pWB4lZ7lr30WKz0vr/aWKhXdBNmNb5D92v7s" crossorigin="anonymous"></script>
</body>
</html>
