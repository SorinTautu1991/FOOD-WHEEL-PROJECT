// At window.onload the magic starts
window.onload = start;

// This function fires at the loading time of the profile page
function start() {
    if(getCookie("username") === "" && getCookie("url") === ""){
        getDataForLoggedUser();
    } else {
        populateProfilePage(getCookie("username"), getCookie("url"));
    }
    animateWheel();
}

// This function creates an animation for the wheel Spin icon
function animateWheel(){
    const wheel = document.getElementById('wrapper-spin');
    let deg = 0;
    deg = Math.floor(7000 + Math.random() * 7000);
    wheel.style.transition = 'all 900s ease-out';
    wheel.style.transform = 'rotate(' + deg + 'deg)';
    wheel.classList.add('blur');
}

// This function fires when the user clicks on clear screen icon -> bottom right
function clearScreen(){
    document.getElementById("search-response").innerHTML = "";
}

// These two functions hover the clear screen icon
function hoverClearIcon(){
    var el = document.getElementById("clear-screen-icon");
    el.style.width = "45px";
    el.style.height = "45px";
}

function unHoverIconClear(){
    var el = document.getElementById("clear-screen-icon");
    el.style.width = "40px";
    el.style.height = "40px";
}

// This function fetches the name and link to profile pic from server db
function getDataForLoggedUser(){
    fetch("profile", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        }
    }).then(res => {
        return res.json();
    }).then(function (response) {
        populateProfilePage(response.userName, response.cloud_url);
        setCookie("username", response.userName);
        setCookie("url", response.cloud_url);
    });
}

// This function brings data to the profile page
function populateProfilePage(nameUser, urlPicture){
    const img = document.createElement('img');
    img.style.width = "30px";
    img.style.height = "30px";
    img.style.borderRadius = "50%";
    img.src = urlPicture;
    document.getElementById("img").appendChild(img);
    if(getCookie("alert") === ""){
        showAlertForLogin(nameUser);
    }else{
        document.getElementById("alert").innerHTML = "";
    }
}

//This lines shows the alert for login success for 3 seconds and then makes it disappear
function showAlertForLogin(name){
    var alert = document.getElementById("alert");
    alert.className = "alert";
    alert.classList.add("alert-success");
    alert.style.position = "absolute";
    alert.style.left = "40%";
    alert.style.top = "150px";
    alert.innerText = "Hello, " + name + ", you logged in successfully!";
    $(".alert").show().delay(2000).queue(function (n) {
        $(this).hide(); n();
    });
    setCookie("alert", "true");
}

// This function fires when My Account button is clicked
function myAccountDetails() {
    var user = getCookie("username");
    fetch("myaccount", {
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify({user})
    }).then(res => {
        return res.json();
    }).then(function (response) {
        var picURL = response.picURL;
        var userNameFromDb = response.userNameFromDb;
        var country = response.country;
        var address = response.address;
        var gender = response.gender;
        generateMyAccountDetailsPage(picURL, userNameFromDb, country, address, gender);
    });
}

// This function generates the page for my account details
function generateMyAccountDetailsPage(url, user, country, address, gender){
    var modalBody = document.getElementById("account-details-body-modal");
    showModalAccountDetails();
    var firstRow = createNewRow();
    var secondRow = createNewRow();
    var thirdRow = createNewRow();
    var fourthRow = createNewRow();
    var fifthRow = createNewRow();
    var sixthRow = createNewRow();
    var seventhRow = createNewRow();
    var firstCol = createNewCol();
    var secondCol = createNewCol();
    var img = createCustomElements('img');
    img.style.position = "relative";
    img.style.left = "0px";
    img.style.width = "100px";
    img.style.height = "100px";
    img.style.borderRadius = "50%";
    img.style.boxShadow = "0 0 5px black";
    img.src = url;
    var userName = createCustomElements('div');
    userName.style.position = "relative";
    userName.style.width = "200px";
    userName.style.height = "30px";
    userName.style.fontFamily = "Helvetica";
    userName.innerText = "Username: " + user;
    var countryEl = createCustomElements('div');
    countryEl.style.position = "relative";
    countryEl.style.width = "200px";
    countryEl.style.height = "30px";
    countryEl.style.fontFamily = "Helvetica";
    countryEl.innerText = "Country: " + country;
    var addreessEl = createCustomElements('div');
    addreessEl.style.position = "relative";
    addreessEl.style.width = "200px";
    addreessEl.style.height = "30px";
    addreessEl.style.fontFamily = "Helvetica";
    addreessEl.innerText = "Address: " + address;
    var genderEl = createCustomElements('div');
    genderEl.style.position = "relative";
    genderEl.style.width = "200px";
    genderEl.style.height = "30px";
    genderEl.style.fontFamily = "Helvetica";
    genderEl.innerText = "Gender: " + gender;
    var deleteAccountBtn = createCustomElements('button');
    deleteAccountBtn.classList.add('btn');
    deleteAccountBtn.classList.add('btn-outline-danger');
    deleteAccountBtn.innerText = "Delete your account";
    deleteAccountBtn.style.width = "120px";
    deleteAccountBtn.style.height = "30px";
    deleteAccountBtn.style.fontSize = "x-small";
    deleteAccountBtn.style.marginBottom = "5px";
    $(deleteAccountBtn).on('click',{user:user}, deleteAccount);
    var updateAccountBtn = createCustomElements('button');
    updateAccountBtn.classList.add('btn');
    updateAccountBtn.classList.add('btn-outline-info');
    updateAccountBtn.innerText = "Update your account";
    updateAccountBtn.style.width = "120px";
    updateAccountBtn.style.height = "30px";
    updateAccountBtn.style.fontSize = "x-small";
    $(updateAccountBtn).on('click',{user:user}, updateAccount);
    firstCol.appendChild(img);
    var majorRow = createNewRow();
    majorRow.appendChild(firstCol);
    firstRow.classList.add('justify-content-center');
    firstRow.appendChild(userName);
    secondRow.classList.add('justify-content-center');
    secondRow.appendChild(countryEl);
    thirdRow.classList.add('justify-content-center');
    thirdRow.appendChild(addreessEl);
    fourthRow.classList.add('justify-content-center');
    fourthRow.appendChild(genderEl);
    sixthRow.classList.add('justify-content-center');
    sixthRow.appendChild(deleteAccountBtn);
    seventhRow.classList.add('justify-content-center');
    seventhRow.appendChild(updateAccountBtn);
    secondCol.appendChild(firstRow);
    secondCol.appendChild(secondRow);
    secondCol.appendChild(thirdRow);
    secondCol.appendChild(fourthRow);
    secondCol.appendChild(fifthRow);
    secondCol.appendChild(sixthRow);
    secondCol.appendChild(seventhRow);
    majorRow.appendChild(secondCol);
    modalBody.appendChild(majorRow);
}

// This function fires when a user clicks on updateAccount btn
function updateAccount(){
    $('#modalAccountDetails').modal('hide');
    $('#account-details-body-modal').html("");
    $('#update-account-modal').modal('show');
}

// This function fires when a user clicks on delete account button from account details modal
function deleteAccount(event) {
    var user = event.data.user;
    var modalBody = document.getElementById("account-details-body-modal");
    modalBody.innerHTML = "";
    var paragraphEl = createCustomElements('p');
    paragraphEl.innerText = "Are you sure you want to delete your account, this action may involve loosing your entire account data ?";
    var buttonYes = createCustomElements('button');
    buttonYes.classList.add('btn');
    buttonYes.classList.add('btn-info');
    buttonYes.innerText = "Yes";
    buttonYes.style.width = "110px";
    buttonYes.style.marginRight = "5px";
    $(buttonYes).on('click',{user:user}, deleteAccountSendBackEnd);
    var buttonNo = createCustomElements('button');
    buttonNo.classList.add('btn');
    buttonNo.classList.add('btn-danger');
    buttonNo.innerText = "No";
    buttonNo.style.width = "110px";
    $(buttonNo).on('click', hideModalAccountDetails);
    modalBody.appendChild(paragraphEl);
    modalBody.appendChild(buttonYes);
    modalBody.appendChild(buttonNo);
}

// This function fires when user confirms the deletion of his account
function deleteAccountSendBackEnd(event){
    var activeUser = event.data.user;
    fetch("delete",{
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify({activeUser})
    }).then(res => {
        return res.json();
    }).then(function (response) {
        if(response === "true"){
            var alert = genericSuccessAlert();
            alert.innerText = "Your account is being deleted";
            alert.style.zIndex = "2000";
            var alertTwo = genericSuccessAlert();
            alertTwo.innerText = "Your account was deleted";
            alertTwo.style.zIndex = "2000";
            showGenericAlert(alert);
            var spinner = createSpinner();
            spinner.style.zIndex = "2200";
            document.getElementById("search-response").appendChild(spinner);
            setTimeout(() => {hideGenericAlert();}, 1500);
            setTimeout(() => {showGenericAlert(alertTwo)}, 2500);
            setTimeout(() => {redirectPage();}, 3500);
        }
    });
}

// This function creates a spinner and returns it
function createSpinner(){
    var alignContent = createCustomElements('div');
    alignContent.setAttribute('id', 'spinner-div');
    alignContent.style.position = "absolute";
    alignContent.style.left = "50%";
    alignContent.style.top = "300px";
    alignContent.classList.add('d-flex');
    alignContent.classList.add('justify-content-center');
    var spinner = createCustomElements('div');
    spinner.classList.add('spinner-border');
    spinner.setAttribute("role", "status");
    var spanSpin = createCustomElements('span');
    spinner.appendChild(spanSpin);
    alignContent.appendChild(spinner);
    return alignContent;
}

// This function creates elements for populating the modal Account Details Body
function createCustomElements(type){
    var el = document.createElement(type);
    return el;
}

// This function displays the modal account details on click
function showModalAccountDetails(){
    $('#modalAccountDetails').modal('show');
}

// This function hides the modal account details
function hideModalAccountDetails(){
    $('#modalAccountDetails').modal('hide');
    $('#account-details-body-modal').html("");
}

// This function clears the modal Account details content when closed
function clearContentOfModal(){
    document.getElementById('account-details-body-modal').innerHTML = "";
}

// This function creates a spinner for loading time on add recipe
function createSpinnerAddRecipe(){
    var wrapperDiv = createCustomElements('div');
    wrapperDiv.classList.add('d-flex');
    wrapperDiv.classList.add('justify-content-center');
    wrapperDiv.style.zIndex = "2200";
    var spinnerBorder = createCustomElements('div');
    spinnerBorder.classList.add('spinner-border');
    spinnerBorder.setAttribute('role', 'status');
    wrapperDiv.appendChild(spinnerBorder);
    return wrapperDiv;
}

// This function displays spinner for add recipe
function hideSpinnerAddRecipe(idofSpinner) {
    var spinner = document.getElementById(idofSpinner);
    spinner.style.visibility = "hidden";
}

// Sending data from add recipe servlet with json response
function sendDataFromAddRecipeModal() {
    var spinner = createSpinnerAddRecipe();
    var idOfSpinner = randomUUIDForIdOfRows();
    spinner.setAttribute('id', idOfSpinner);
    document.getElementById('search-response').appendChild(spinner);
    const form = document.getElementById("addRecipeForm");
    if(validateAddRecipeForm(form)){
        const myForm = new FormData(form);
        fetch("addRecipe", {
            method:"POST",
            body: myForm
        }).then(res=>{
            return res.json();
        }).then(function (response) {
            hideSpinnerAddRecipe(idOfSpinner);
            switch (response) {
                case "exists":
                    var alert = genericFailedAlert();
                    alert.innerText = "This recipe already exists in the db";
                    var idOfAlert = randomUUIDForIdOfRows();
                    alert.setAttribute('id', idOfAlert);
                    document.getElementById('search-response').appendChild(alert);
                    setTimeout(() => {
                        hideAlertShoppingList(idOfAlert);
                    }, 2000);
                    break;
                case "added":
                    showAlertForAddRecipe();
                    hideModalAddRecipe();
                    clearContentsModal('exampleModalCenter');
                    setTimeout(() => {
                        hideAlertForAddedRecipe();
                    }, 2000);
                    break;
                case "false":
                    showAlertForFailedAddRecipe();
                    setTimeout(() => {
                        hideAlertForAddedRecipe();
                    }, 2000);
                    break;
            }
        });
    }else {
        hideSpinnerAddRecipe(idOfSpinner);
        var alertEmptyFields = genericFailedAlert();
        alertEmptyFields.innerText = "Please complete all the fields!";
        alertEmptyFields.setAttribute('id', 'alert-failed-empty-fields');
        document.getElementById('search-response').appendChild(alertEmptyFields);
        setTimeout(() => {
            hideAlertShoppingList('alert-failed-empty-fields');
        }, 2000);
    }
}

// This function fires when we close the modal for AddRecipe
function closeRedirectErase(){
    clearElementsOfModalFormAfterHide();
}

// This function hides the alert for added recipe
function hideAlertForAddedRecipe(){
    document.getElementById("search-response").innerHTML = "";
}

// Display modal AddRecipe
function displayModalAddRecipe() {
    $('#exampleModalCenter').modal('show');
}

// Hide modal AddRecipe
function hideModalAddRecipe(){
    $('#exampleModalCenter').modal('hide');
}

// This function displays the alert for successfully added recipes
function showAlertForAddRecipe() {
    setTimeout(() => {
        document.getElementById("search-response").appendChild(alertForAddedRecipe());
    }, 500);
}

// This function displays the alerts for failed added recipes
function showAlertForFailedAddRecipe() {
    var alert = alertForAddedRecipe();
    alert.className = "alert";
    alert.classList.add("alert-danger");
    alert.role = "alert";
    alert.style.position = "absolute";
    alert.style.left = "40%";
    alert.innerText = "Your recipe could not be added!";
    setTimeout(() => {
        document.getElementById("search-response").appendChild(alert);
    }, 500);
}

// This function creates an alert for added recipes
function alertForAddedRecipe() {
    var alertDiv = createCustomElements('div');
    alertDiv.classList.add('alert');
    alertDiv.classList.add('alert-success');
    alertDiv.role = "alert";
    alertDiv.style.position = "absolute";
    alertDiv.style.left = "40%";
    alertDiv.style.zIndex = "2200";
    alertDiv.style.top = "150px";
    alertDiv.innerText = "Recipe added successfully";
    return alertDiv;
}


// This function returns a dynamically created alert for success
function genericSuccessAlert(){
    var alertDiv = document.createElement('div');
    alertDiv.classList.add('alert');
    alertDiv.classList.add('alert-success');
    alertDiv.role = "alert";
    alertDiv.style.position = "absolute";
    alertDiv.style.left = "40%";
    alertDiv.style.top = "150px";
    return alertDiv;
}

// This function returns a generic failed alert
function genericFailedAlert() {
    var alertDiv = document.createElement('div');
    alertDiv.classList.add('alert');
    alertDiv.classList.add('alert-danger');
    alertDiv.role = "alert";
    alertDiv.style.position = "absolute";
    alertDiv.style.left = "40%";
    alertDiv.style.top = "150px";
    alertDiv.style.zIndex = "2200";
    return alertDiv;
}

// This function displays the generic alert
function showGenericAlert(alert){
    var display = document.getElementById("search-response");
    setTimeout(() => {
        display.appendChild(alert);
    }, 500);
}

// This function hides the generic alert
function hideGenericAlert(){
    document.getElementById("search-response").innerHTML = "";
}

// Hides progress bar
function hideProgressBar(){
    document.getElementById("progressBar").style.visibility = "hidden";
}

// Clear modal fields after it is hidden
function clearElementsOfModalFormAfterHide() {
    $('#exampleModalCenter').on('hidden.bs.modal', function (e) {
        $(this)
            .find("input,textarea,select,date,file,email,password")
            .val('')
            .end()
            .find("input[type=checkbox], input[type=radio]")
            .prop("checked", "")
            .end();
    });
}

// This function clears contents of a certain modal
function clearContentsModal(idOfModal) {
    $(idOfModal).on('hidden.bs.modal', function (e) {
        $(this)
            .find("input,textarea,select,date,file,email,password")
            .val('')
            .end()
            .find("input[type=checkbox], input[type=radio]")
            .prop("checked", "")
            .end();
    });
}

//When user presses the close on the modal window we redirect the page to previous
function redirectPage(){
    setCookie("tutorial", "true");
    window.location.href = "https://foodwheelapp.herokuapp.com/profile";
}

//Set cookie, get cookie, remove cookie
function setCookie(cname,cvalue) {
    document.cookie = cname + "=" + cvalue + "; SameSite=Lax";
}

function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for(var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

function clearCookies(){
    (function () {
        var cookies = document.cookie.split("; ");
        for (var c = 0; c < cookies.length; c++) {
            var d = window.location.hostname.split(".");
            while (d.length > 0) {
                var cookieBase = encodeURIComponent(cookies[c].split(";")[0].split("=")[0]) + '=; expires=Thu, 01-Jan-1970 00:00:01 GMT; domain=' + d.join('.') + ' ;path=';
                var p = location.pathname.split('/');
                document.cookie = cookieBase + '/';
                while (p.length > 0) {
                    document.cookie = cookieBase + p.join('/');
                    p.pop();
                };
                d.shift();
            }
        }
    })();
}

// This function enlarges the search input field on click
function largeSearch() {
    document.getElementById("searchInput").style.width = "350px";
}

// This function reduces the size of the search input field when the element looses focus
function smallSearch() {
    document.getElementById("searchInput").style.width = "250px";
}

// This function is responsible with the autocomplete search
function autoCompleteSearch(){
    var searchInput = document.getElementById("searchInput").value;
    if(searchInput.length > 3){
        fetch("autocomplete", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({searchInput})
        }).then(res => {
            return res.json();
        }).then(function (response) {
            createCard(response, "search-response");
        });
    }else{
        document.getElementById("search-response").innerHTML = "";
        arr = [];
    }
}

// This function hovers the favourites icon
function hoverFavIcon(event){
    var id = event.data.idOfFavIcon;
    var icon = document.getElementById(id);
    icon.style.width = "60px";
    icon.style.height = "60px";
}

// This function unhovers the favourites icon
function unHoverFavIcon(event){
    var id = event.data.idOfFavIcon;
    var icon = document.getElementById(id);
    icon.style.width = "50px";
    icon.style.height = "50px";
}

// This code creates the card response for random recipe generator
function createCardForRandomRecipeSpinWheel(response, id) {
    document.getElementById("search-response").innerHTML = "";
    for(var i = 0; i < response.length; i++) {
        var obj = response[i];
        var nameOfRecipe = obj.nameOfRecipe;
        var timeToCook = obj.timeToCook;
        var servings = obj.servings;
        var urlPicture = obj.cloudUrlPicture;
        var flag = obj.flag;
        // Dynamic creation of card element
        // 1. Set the div styles for displaying the results
        if ($('.navbar-toggler').attr('aria-expanded') === "false") {
            var searchResp = document.getElementById("search-response");
            searchResp.className = "d-flex justify-content-center";
            searchResp.style.display = "flex";
            searchResp.style.flexWrap = "wrap";
            searchResp.style.marginTop = "70px";
            searchResp.style.marginBottom = "70px";
        }else if($('.navbar-toggler').attr('aria-expanded') === "true"){
            var searchResp = document.getElementById("search-response");
            searchResp.className = "d-flex justify-content-center";
            searchResp.style.display = "flex";
            searchResp.style.flexWrap = "wrap";
            searchResp.style.marginTop = "150px";
            searchResp.style.marginBottom = "70px";
        }
        // 2. Create the card deck
        var cardDeckElement = document.createElement('div');
        cardDeckElement.id = "cardDeck";
        cardDeckElement.classList.add("card-deck");
        cardDeckElement.classList.add("mr-1");
        cardDeckElement.style.width = "250px";
        cardDeckElement.style.height = "400px";
        cardDeckElement.style.marginBottom = "15px";
        // 3. Create the card element
        var card = document.createElement('div');
        card.classList.add("card");
        card.classList.add("text-center")
        card.style.width = "250px";
        card.style.height = "400px";
        card.style.opacity = "0.9";
        card.style.boxShadow = "0 0 5px black";
        // 4. Create the image element
        var foodImg = document.createElement('img');
        foodImg.classList.add('card-image-top');
        foodImg.style.position = "relative";
        foodImg.style.height = "200px";
        foodImg.src = urlPicture;
        // 5. Adding flag of the country of origin for the specific food item
        var flagImg = document.createElement('img');
        flagImg.style.position = "absolute";
        flagImg.style.borderRadius = "50%";
        flagImg.style.width = "30px";
        flagImg.style.height = "30px";
        flagImg.src = flag;
        // 6. Create card body element
        var cardBody = document.createElement('div');
        cardBody.id = "cardBody";
        cardBody.classList.add('card-body');
        // 7. Create div title of recipe element
        var recipeName = document.createElement('div');
        recipeName.classList.add('card-title');
        recipeName.id = "recipeTitle";
        recipeName.style.fontFamily = "Helvetica";
        recipeName.style.fontWeight = "bold";
        recipeName.style.fontSize = "small";
        recipeName.innerText = nameOfRecipe;
        // 8. Create the div element title for number of servings
        var servingsNumber = document.createElement('div');
        servingsNumber.classList.add('card-title');
        servingsNumber.id = "servingsNumber";
        servingsNumber.style.fontSize = "small";
        servingsNumber.style.fontFamily = "Helvetica";
        servingsNumber.innerText = "Servings: " + servings;
        // 9. Create the div element title for time to cook
        var timeToCookEl = document.createElement('div');
        timeToCookEl.classList.add('card-title');
        timeToCookEl.id = "timeToCookCard";
        timeToCookEl.style.fontSize = "small";
        timeToCookEl.style.fontFamily = "Helvetica";
        timeToCookEl.innerText = "Time: " + timeToCook;
        // 10. Create More Details button from bottom of the card element
        var detailsBtn = document.createElement('a');
        detailsBtn.classList.add("btn");
        detailsBtn.classList.add("btn-outline-info");
        detailsBtn.style.boxShadow = "0 0 5px black";
        detailsBtn.innerText = "More details";
        detailsBtn.style.height = "30px";
        detailsBtn.style.fontFamily = "Helvetica";
        detailsBtn.style.width = "90px";
        detailsBtn.style.position = "absolute";
        detailsBtn.style.bottom = "15px";
        detailsBtn.style.left = "65px";
        detailsBtn.style.fontSize = "x-small";
        detailsBtn.id = "detailsBtn";
        $(detailsBtn).on('click', {name:nameOfRecipe}, moreDetailsModal);
        // 11. Adding the favourites icon on card
        var imgIcon = document.createElement('img');
        imgIcon.src = "https://res.cloudinary.com/hmzve6z5z/image/upload/v1611686416/ICONS/add_to_favourites_new_icon.svg";
        var idOfFavIcon = randomUUIDForIdOfRows();
        imgIcon.setAttribute('id', idOfFavIcon);
        imgIcon.style.position = "absolute";
        imgIcon.style.right = "0px";
        imgIcon.style.width = "50px";
        imgIcon.style.height = "50px";
        imgIcon.classList.add("imgIcon");
        $(imgIcon).on('click', {name:nameOfRecipe}, addToFavourites);
        $(imgIcon).on('mouseenter', {idOfFavIcon:idOfFavIcon}, hoverFavIcon);
        $(imgIcon).on('mouseleave', {idOfFavIcon:idOfFavIcon}, unHoverFavIcon)
        // 12.Appending child elements to parent elements and creating the final card
        cardBody.appendChild(recipeName);
        cardBody.appendChild(servingsNumber);
        cardBody.appendChild(timeToCookEl);
        cardBody.appendChild(detailsBtn);
        card.appendChild(foodImg);
        card.appendChild(flagImg);
        card.appendChild(imgIcon);
        card.appendChild(cardBody);
        cardDeckElement.appendChild(card);
        // 12.Appending cards to the row in maxim of 5 for optimal view
        document.getElementById(id).appendChild(cardDeckElement);
        }
    };

// Dynamic creation of cards to that will be displayed in search response div
var arr = [];
function createCard(response, id) {
    for(var i = 0; i < response.length; i++) {
        var obj = response[i];
        var nameOfRecipe = obj.nameOfRecipe;
        if(arr.includes(nameOfRecipe) === false){
            arr.push(nameOfRecipe);
            var timeToCook = obj.timeToCook;
            var servings = obj.servings;
            var urlPicture = obj.cloudUrlPicture;
            var flag = obj.flag;
            // Dynamic creation of card element
            // 1. Sets the div styles for displaying the responses
            if ($('.navbar-toggler').attr('aria-expanded') === "false") {
                var searchResp = document.getElementById("search-response");
                searchResp.className = "d-flex justify-content-center";
                searchResp.style.display = "flex";
                searchResp.style.flexWrap = "wrap";
                searchResp.style.marginTop = "70px";
                searchResp.style.marginBottom = "70px";
            }else{
                var searchResp = document.getElementById("search-response");
                searchResp.className = "d-flex justify-content-center";
                searchResp.style.display = "flex";
                searchResp.style.flexWrap = "wrap";
                searchResp.style.marginTop = "150px";
                searchResp.style.marginBottom = "70px";
            }
            // 2. Create the card deck
            var cardDeckElement = document.createElement('div');
            cardDeckElement.id = "cardDeck";
            cardDeckElement.classList.add("card-deck");
            cardDeckElement.classList.add("mr-1");
            cardDeckElement.style.width = "250px";
            cardDeckElement.style.height = "400px";
            cardDeckElement.style.marginBottom = "15px";
            // 3. Create the card element
            var card = document.createElement('div');
            card.classList.add("card");
            card.classList.add("text-center")
            card.style.width = "250px";
            card.style.height = "400px";
            card.style.opacity = "0.9";
            card.style.boxShadow = "0 0 5px black";
            // 4. Create the image element
            var foodImg = document.createElement('img');
            foodImg.classList.add('card-image-top');
            foodImg.style.position = "relative";
            foodImg.style.height = "200px";
            foodImg.src = urlPicture;
            // 5. Adding flag of the country of origin for the specific food item
            var flagImg = document.createElement('img');
            flagImg.style.position = "absolute";
            flagImg.style.borderRadius = "50%";
            flagImg.style.width = "30px";
            flagImg.style.height = "30px";
            flagImg.src = flag;
            // 6. Create card body element
            var cardBody = document.createElement('div');
            cardBody.id = "cardBody";
            cardBody.classList.add('card-body');
            // 7. Create div title of recipe element
            var recipeName = document.createElement('div');
            recipeName.classList.add('card-title');
            recipeName.id = "recipeTitle";
            recipeName.style.fontFamily = "Helvetica";
            recipeName.style.fontWeight = "bold";
            recipeName.style.fontSize = "small";
            recipeName.innerText = nameOfRecipe;
            // 8. Create div element title for number of servings
            var servingsNumber = document.createElement('div');
            servingsNumber.classList.add('card-title');
            servingsNumber.id = "servingsNumber";
            servingsNumber.style.fontFamily = "Helvetica";
            servingsNumber.style.fontSize = "small";
            servingsNumber.innerText = "Servings: " + servings;
            // 9. Create the div element title for time to cook
            var timeToCookEl = document.createElement('div');
            timeToCookEl.classList.add('card-title');
            timeToCookEl.style.fontFamily = "Helvetica";
            timeToCookEl.id = "timeToCookCard";
            timeToCookEl.style.fontSize = "small";
            timeToCookEl.innerText = "Time: " + timeToCook;
            // 10. Create More Details button from bottom of the card element
            var detailsBtn = document.createElement('a');
            detailsBtn.classList.add("btn");
            detailsBtn.classList.add("btn-outline-info");
            detailsBtn.innerText = "More details";
            detailsBtn.style.fontFamily = "Helvetica";
            detailsBtn.style.height = "30px";
            detailsBtn.style.width = "90px";
            detailsBtn.style.position = "absolute";
            detailsBtn.style.boxShadow = "0 0 5px black";
            detailsBtn.style.bottom = "15px";
            detailsBtn.style.left = "65px";
            detailsBtn.style.fontSize = "x-small";
            detailsBtn.id = "detailsBtn";
            $(detailsBtn).on('click', {name:nameOfRecipe}, moreDetailsModal);
            // 11. Adding the favourites icon on card
            var imgIcon = document.createElement('img');
            imgIcon.src = "https://res.cloudinary.com/hmzve6z5z/image/upload/v1611686416/ICONS/add_to_favourites_new_icon.svg";
            var idOfFavIcon = randomUUIDForIdOfRows();
            imgIcon.setAttribute('id', idOfFavIcon);
            imgIcon.style.position = "absolute";
            imgIcon.style.right = "0px";
            imgIcon.style.width = "50px";
            imgIcon.style.height = "50px";
            imgIcon.classList.add("imgIcon");
            $(imgIcon).on('click', {name:nameOfRecipe}, addToFavourites);
            $(imgIcon).on('mouseenter', {idOfFavIcon:idOfFavIcon}, hoverFavIcon);
            $(imgIcon).on('mouseleave', {idOfFavIcon:idOfFavIcon}, unHoverFavIcon)
            // 12.Appending child elements to parent elements and creating the final card
            cardBody.appendChild(recipeName);
            cardBody.appendChild(servingsNumber);
            cardBody.appendChild(timeToCookEl);
            cardBody.appendChild(detailsBtn);
            card.appendChild(foodImg);
            card.appendChild(flagImg);
            card.appendChild(imgIcon);
            card.appendChild(cardBody);
            cardDeckElement.appendChild(card);
            // 12.Appending cards to the row in maxim of 5 for optimal view
            document.getElementById(id).appendChild(cardDeckElement);
        }
    };
}

// When the icon for addToFavourites is clicked this function fires
function addToFavourites(event) {
    var nameOfRecipe = event.data.name;
    var activeUser = getCookie("username");
    fetch("addToFavourites", {
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify({nameOfRecipe, activeUser})
    }).then(res => {
        return res.json();
    }).then(function (response) {
        if(response === "true"){
            // animation for adding to favourites
            var alert = genericSuccessAlert();
            alert.innerText = "Recipe added to favourites!";
            alert.setAttribute('id', 'alertForAddedRecipeToFavourites');
            showGenericAlert(alert);
            setTimeout(() => {hideAlertShoppingList('alertForAddedRecipeToFavourites')}, 1500);
        }else {
            var alertNo = genericFailedAlert();
            alertNo.style.zIndex = "3000";
            alertNo.innerText = "You already have this recipe to your favourites!";
            alertNo.setAttribute('id', 'failed-duplicate-alert-for-recipe-add');
            showGenericAlert(alertNo);
            setTimeout(() => {hideAlertShoppingList('failed-duplicate-alert-for-recipe-add')}, 1500);
        }
  });
}

// This function fires when the more details btn is clicked from card element
function moreDetailsModal(event) {
    showDetailedRecipe();
    var nameOfRecipe = event.data.name;
    var activeUser = getCookie("username");
    fetch("details", {
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify({nameOfRecipe, activeUser})
    }).then(res => {
        return res.json();
    }).then(function (response) {
        document.getElementById("modal-content-details-recipe").innerHTML = "";
        document.getElementById("detailsTitle").innerText = "";
        populateModalDetails(response, "modal-content-details-recipe");
    });
}

// When the user clicks on shopping list icon this function fires
function shoppingListContent(){
    var activeUser = getCookie("username");
    fetch("shoppinglistcontent", {
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify({activeUser})
    }).then(res => {
        return res.json();
    }).then(function (response) {
        if(response === "false"){
            console.log("The list is empty!");
        }else{
            populateScreenWithShoppingListContains(response);
        }
    });
}

// Dynamic creation of table for displaying the shopping list contains
function createTable(){
    var table = createCustomElements('table');
    table.style.width = "500px";//i modified here
    table.style.backgroundColor = "rgb(248, 248, 248)";
    table.style.marginBottom = "0px";
    table.style.cursor = "pointer";
    table.classList.add('table');
    table.classList.add('table-hover');
    table.classList.add('table-borderless');
    var tableHead = createCustomElements('thead');
    var tableRowHead = createCustomElements('tr');
    var tableColHeadTwo = createCustomElements('th');
    tableColHeadTwo.setAttribute("scope", "col");
    tableColHeadTwo.innerText = "Img";
    var tableColHeadThree = createCustomElements('th');
    tableColHeadThree.setAttribute("scope", "col");
    tableColHeadThree.innerText = "Name";
    var tableColHeadFour = createCustomElements('th');
    tableColHeadFour.setAttribute("scope", "col");
    tableColHeadFour.style.width = "40px";
    tableColHeadFour.style.height = "30px";
    var img = createCustomElements('img');
    img.style.width = "25px";
    img.style.height = "25px";
    img.src = "https://res.cloudinary.com/hmzve6z5z/image/upload/v1610624411/ICONS/vote.png";
    tableColHeadFour.appendChild(img);
    tableRowHead.appendChild(tableColHeadTwo);
    tableRowHead.appendChild(tableColHeadThree);
    tableRowHead.appendChild(tableColHeadFour);
    tableHead.append(tableRowHead);
    table.appendChild(tableHead);
    return table;
}

// This function creates the table body for simplyfing the process(divide et impera)
function createTableBody(){
    var tableBody = createCustomElements('tbody');
    return tableBody;
}

// This function generates random uuid for setting id`s for custom elements
function randomUUIDForIdOfRows(){
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}

// This function creates a table row
function createTableRow(ingrImgUrl, nameOfIngredient, divForRemoval, idOfTable){
    var idOfTablee = idOfTable;
    var tableRow = createCustomElements('tr');
    var idOfRow = nameOfIngredient + idOfTable; //Here i should generate uuid random
    // var idOfRow = nameOfIngredient + randomUUIDForIdOfRows();
    tableRow.setAttribute('id', idOfRow);
    var tableRowIngImg = createCustomElements('td');
    var img = createCustomElements('img');
    img.style.width = "30px";
    img.style.height = "30px";
    img.src = ingrImgUrl;
    tableRowIngImg.appendChild(img);
    var tableRowNameOfIngr = createCustomElements('td');
    tableRowNameOfIngr.innerText = nameOfIngredient;
    var tableRowDivForRemoval = createCustomElements('td');
    tableRowDivForRemoval.appendChild(divForRemoval);
    var icon = createCustomElements('img');
    icon.style.width = "20px";
    icon.style.height = "20px";
    icon.src = "https://res.cloudinary.com/hmzve6z5z/image/upload/v1611584971/ICONS/yes_no.svg";
    $(icon).on('click', {nameOfIngredient:nameOfIngredient, idOfRow:idOfRow, idOfTablee:idOfTablee}, markRowsForDeletion)
    tableRowDivForRemoval.appendChild(icon);
    tableRow.appendChild(tableRowIngImg);
    tableRow.appendChild(tableRowNameOfIngr);
    tableRow.appendChild(tableRowDivForRemoval);
    return tableRow;
}

// This function fires when the user clicks on the icon for removing ingredients from shopping list that he already owns at home
function markRowsForDeletion(event) {
    var nameOfDeletedIngredient = event.data.nameOfIngredient;
    var idOfRow = event.data.idOfRow;
    var idOfTable = event.data.idOfTable;
    $(idOfRow).remove();
    document.getElementById(idOfRow).innerHTML = "";
}

// This function shows the confirm modal for deleting the present shopping list
function showModalAndConfirmTheDeletionOfList(event) {
    var nameOfRecDivId = event.data.nameOfRecipeId;
    var picDivId = event.data.picDivId;
    var confirmDivId = event.data.confirmDivId;
    var tableId = event.data.idOfTable;
    var nameOfRecipe = event.data.nameOfRecipe;
    var modal = document.getElementById("modalDeleteItemShoppingList");
    var modalBody = document.getElementById("shopping-delete-body-modal");
    modalBody.innerHTML = "";
    var divContent = createCustomElements('div');
    divContent.style.width = "450px";
    divContent.style.height = "40px";
    divContent.innerText = "Are you sure you want to delete this shopping list item ?";
    var buttonsDiv = createCustomElements('div');
    buttonsDiv.style.width = "450px";
    buttonsDiv.style.height = "40px";
    var buttonYes = createCustomElements('button');
    buttonYes.style.width = "110px";
    buttonYes.style.height = "35px";
    buttonYes.style.marginRight = "5px";
    buttonYes.classList.add('btn');
    buttonYes.classList.add('btn-success');
    buttonYes.innerText = "Yes";
    $(buttonYes).on('click', {nameOfRecDivId:nameOfRecDivId, picDivId:picDivId,confirmDivId:confirmDivId, nameOfRecipe:nameOfRecipe, tableId:tableId}, deleteTheListFromShoppingListItems);
    var buttonNo = createCustomElements('button');
    buttonNo.classList.add('btn');
    buttonNo.innerText = "No";
    buttonNo.style.width = "110px";
    buttonNo.style.height = "35px";
    buttonNo.classList.add('btn-danger');
    $(buttonNo).on('click', closeModalDeleteListItem);
    buttonsDiv.appendChild(buttonYes);
    buttonsDiv.appendChild(buttonNo);
    modalBody.appendChild(divContent);
    modalBody.appendChild(buttonsDiv);
    $(modal).modal('show');
}

// This function closes the modal
function closeModalDeleteListItem(){
    var modal = document.getElementById("modalDeleteItemShoppingList");
    $(modal).modal('hide');
}

// This function fires when the user clicks on delete shopping list button from the shopping list bucket
function deleteTheListFromShoppingListItems(event){
    var nameOfRecDivId = event.data.nameOfRecDivId;
    var picDivId = event.data.picDivId;
    var confirmDivId = event.data.confirmDivId;
    var tableId = event.data.tableId;
    var nameOfRecipe = event.data.nameOfRecipe;
    var nameDiv = document.getElementById(nameOfRecDivId);
    var picDiv = document.getElementById(picDivId);
    var confirmDiv = document.getElementById(confirmDivId);
    var currentTable = document.getElementById(tableId);
    var activeUser = getCookie("username");
    fetch("deleteShoppingList", {
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify({nameOfRecipe, activeUser})
    }).then(res => {
        return res.json();
    }).then(function (response) {
        if(response === "true"){
            $(picDiv).innerHTML = "";
            $(picDiv).remove();
            $(nameDiv).innerHTML = "";
            $(nameDiv).remove();
            $(currentTable).innerHTML = "";
            $(currentTable).remove();
            $(confirmDiv).innerHTML = "";
            $(confirmDiv).remove();
            $("#modalDeleteItemShoppingList").modal('hide');
        } else if(response === "false"){
            alert("Something went wrong!");
        }
    });
}

// This function fires when the user clicks on confirm list btn from the shopping list bucket
function confirmTheLastElementsOfTable(event){
    var tableId = event.data.idOfTable;
    var table = document.getElementById(tableId);
    var nameOfRecipe = event.data.nameOfRecipe;
    var arrOne = [];
    var arr = [];
    for(let i=1;i<table.rows.length;i++){
        if(table.rows[i] !== "" && table.rows[i] != null){
            console.log(table.rows[i].innerText.trim());
            arrOne.push(table.rows[i].innerText.trim());
        }
    }
    for(let k=0;k<arrOne.length;k++){
        if(arrOne[k] !== ""){
            arr.push(arrOne[k]);
        }
    }
    generateDownloadForShoppingList(nameOfRecipe, arr, tableId);
}

// This function generates the download shopping list process
function generateDownloadForShoppingList(nameOfRecipe, arr, tableId){
    var modalBody = document.getElementById("download-body-modal");
    var recName = document.getElementById("recName");
    var listIngr = document.getElementById("listIng");
    recName.setAttribute("value", JSON.stringify({nameOfRecipe}));
    listIngr.setAttribute("value", JSON.stringify({arr}))
    var form = document.getElementById("downloadForm");
    form.appendChild(recName);
    form.appendChild(listIngr);
    modalBody.appendChild(form);
    showModal();
}

// This function displays the download list modal
function showModal(){
    $('#modalDownloadList').modal('show');
}

// This function populates the search response with the contents of the sopping list for the present user
function populateScreenWithShoppingListContains(response){
    var displayContent = document.getElementById("search-response");
    if(!($(displayContent).hasClass('justify-content-center'))){
        displayContent.classList.add('justify-content-center');
    }
    displayContent.innerHTML = "";
    var wrapperDiv = createCustomElements('div');
    wrapperDiv.style.width = "500px";
    wrapperDiv.style.boxShadow = "0 0 5px black";
    wrapperDiv.style.opacity = "0.9";
    wrapperDiv.style.backgroundColor = "rgb(248, 248, 248)";
    // Create a div for last column of table
    var okDiv = createCustomElements('div');
    okDiv.style.width = "30px";
    okDiv.style.height = "30px";
    for(let i=0;i<response.length;i++){
        var name = response[i].nameOfRecipe;
        var picURL = response[i].picURL;
        var nutrients = JSON.parse(response[i].nutrients);
        // Create a div for displaying the recipe name on top of the table
        var nameOfRecipeDiv = createCustomElements('div');
        nameOfRecipeDiv.style.width = "400px";
        nameOfRecipeDiv.style.backgroundColor = "#F8F8F8";
        nameOfRecipeDiv.style.color = "black";
        nameOfRecipeDiv.style.opacity = "0.9";
        nameOfRecipeDiv.style.fontWeight = "bold";
        nameOfRecipeDiv.style.fontSize = "large";
        nameOfRecipeDiv.style.textAlign = "center";
        nameOfRecipeDiv.innerText = name;
        var nameOfRecipeId = randomUUIDForIdOfRows();
        nameOfRecipeDiv.setAttribute('id', nameOfRecipeId);
        // Create a div for displaying the recipe picture
        var picDiv = createCustomElements('div');
        picDiv.style.width = "100px";
        picDiv.style.height = "100px";
        picDiv.style.opacity = "0.9";
        var picImg = createCustomElements('img');
        picImg.style.width = "70px";
        picImg.style.height = "70px";
        picImg.style.marginLeft = "5px";
        picImg.style.marginTop = "5px";
        picImg.style.borderRadius = "50%";
        picDiv.style.backgroundColor = "#F8F8F8";
        picDiv.style.marginLeft = "15px";
        var picDivId = randomUUIDForIdOfRows();
        picDiv.setAttribute('id', picDivId);
        picImg.src = picURL;
        picDiv.appendChild(picImg);
        // Create a table for every recipe from shopping list
        var table = createTable();
        var idValue = randomUUIDForIdOfRows();
        table.setAttribute("id", name + idValue);//here i modified with index it was name
        var tableId = name + idValue;
        var tableBody = createTableBody();
        // Create a button for confirming the shopping list after deleting some ingredients
        var confirmDiv = createCustomElements('div');
        confirmDiv.style.backgroundColor = "#F8F8F8";
        confirmDiv.style.opacity = "0.9";
        confirmDiv.style.width = "500px";
        confirmDiv.style.height = "50px";
        confirmDiv.style.marginBottom = "30px";
        confirmDiv.style.boxShadow = "0 4px 2px -2px grey";
        var confirmDivId = randomUUIDForIdOfRows();
        confirmDiv.setAttribute('id', confirmDivId);
        // Confirm button for last version of the shopping list
        var confirmBtn = createCustomElements('button');
        confirmBtn.innerText = "Confirm list";
        confirmBtn.style.fontSize = "small";
        confirmBtn.style.position = "relative";
        confirmBtn.style.left = "20%";
        confirmBtn.style.width = "110px";
        confirmBtn.style.height = "35px";
        confirmBtn.classList.add('btn');
        confirmBtn.classList.add('btn-success');
        // Delete list button
        var deleteListBtn = createCustomElements('button');
        deleteListBtn.innerText = "Delete list";
        deleteListBtn.style.fontSize = "small";
        deleteListBtn.style.position = "relative";
        deleteListBtn.style.left = "40%";
        deleteListBtn.style.width = "110px";
        deleteListBtn.style.height = "35px";
        deleteListBtn.classList.add('btn');
        deleteListBtn.classList.add('btn-danger');

        for(let j=0;j<nutrients.length;j++){
            var ingredientName = nutrients[j].ingredientName;
            if(ingredientName.includes("_")){
                ingredientName = ingredientName.replaceAll("_", " ");
            }
            var picUrl = nutrients[j].ingredientURL;
            var tableRow = createTableRow(picUrl,ingredientName, okDiv, tableId);
            tableBody.appendChild(tableRow);
            table.appendChild(tableBody);
            var row = createNewRow();
            row.appendChild(picDiv);
            row.appendChild(nameOfRecipeDiv);
            wrapperDiv.appendChild(row);
            wrapperDiv.appendChild(table);
            displayContent.appendChild(wrapperDiv);
        }
        $(confirmBtn).on('click',{idOfTable:tableId,nameOfRecipe:name}, confirmTheLastElementsOfTable);
        confirmDiv.appendChild(confirmBtn);
        $(deleteListBtn).on('click', {idOfTable:tableId,nameOfRecipeId:nameOfRecipeId, picDivId:picDivId, confirmDivId:confirmDivId, nameOfRecipe:name}, showModalAndConfirmTheDeletionOfList);
        confirmDiv.appendChild(deleteListBtn);
        wrapperDiv.appendChild(confirmDiv);
        displayContent.appendChild(wrapperDiv);
    }
}


function populateModalDetails(response, id) {
    // Extracting info from the response
    var img = response.cloudUrlPicture;
    var nameOfRecipe = response.nameOfRecipe;
    var typeOfFood = response.typeOfFood;
    var timeToCook = response.timeToCook;
    var servings = response.servings;
    var ingredients = response.ingredients;
    var instructions = response.instructions;
    var countryOfOrigin = response.countryOfOrigin;
    var flag = response.flag;
    var nutrients = JSON.parse(response.nutrients);
    // Dynamic creation for the button on the modal footer for generating shopping list
    var generateShoppingListBtn = createCustomElements('button');
    generateShoppingListBtn.classList.add("btn");
    generateShoppingListBtn.classList.add("btn-warning");
    generateShoppingListBtn.style.position = "absolute";
    generateShoppingListBtn.style.height = "35px";
    generateShoppingListBtn.style.width = "130px";
    generateShoppingListBtn.style.fontFamily = "Helvetica";
    generateShoppingListBtn.style.left = "10px";
    generateShoppingListBtn.style.fontSize = "x-small";
    generateShoppingListBtn.innerText = "Add to shopping list";
    $(generateShoppingListBtn).on('click', {name:nameOfRecipe}, generateShoppingListFromMoreDetailsModal);
    var modalFooter = document.getElementById("modalFooter");
    modalFooter.appendChild(generateShoppingListBtn);
    // Display - parent element in modal
    var displayInModal = document.getElementById(id);
    // Modal title with name of recipe
    var modalTitle = document.getElementById("detailsTitle");
    modalTitle.innerText = nameOfRecipe;
    modalTitle.style.fontFamily = "Helvetica";
    // Create image Element
    var foodImg = createCustomElements('img');
    foodImg.style.position = "absolute";
    foodImg.style.left = "0px";
    foodImg.style.width = "200px";
    foodImg.style.height = "180px";
    foodImg.style.borderRadius = "5%";
    foodImg.src = img;
    // Create flag element
    var flagDetails = createCustomElements('img');
    flagDetails.style.position = "absolute";
    flagDetails.style.width = "30px";
    flagDetails.style.height = "30px";
    flagDetails.style.borderRadius = "50%";
    flagDetails.style.top = "2px";
    flagDetails.style.left = "0px";
    flagDetails.src = flag;
    // Create fav icon
    var favIcon = createCustomElements('img');
    favIcon.style.position = "absolute";
    favIcon.style.height = "40px";
    favIcon.style.width = "40px";
    favIcon.style.right = "170px";
    favIcon.style.top = "0px";
    var idOfFavIcon = randomUUIDForIdOfRows();
    favIcon.setAttribute('id', idOfFavIcon);
    favIcon.src = "https://res.cloudinary.com/hmzve6z5z/image/upload/v1611686416/ICONS/add_to_favourites_new_icon.svg";
    $(favIcon).on('click', {name: nameOfRecipe}, addToFavourites);
    $(favIcon).on('mouseenter', {idOfFavIcon:idOfFavIcon}, hoverFavIcon);
    $(favIcon).on('mouseleave', {idOfFavIcon:idOfFavIcon}, unHoverFavIcon);
    // Create type of food
    var typeFood = createCustomElements('div');
    typeFood.innerText = "Type: " + typeOfFood;
    typeFood.style.fontFamily = "Helvetica";
    typeFood.style.width = "350x";
    typeFood.style.height = "25px";
    typeFood.style.fontSize = "medium";
    // Create time to cook
    var time = createCustomElements('div');
    time.innerText = "Time to cook: " + timeToCook;
    time.style.fontFamily = "Helvetica";
    time.style.width = "350x";
    time.style.height = "25px";
    time.style.fontSize = "medium";
    // Create servings
    var servingNr = createCustomElements('div');
    servingNr.innerText = "Servings: " + servings;
    servingNr.style.fontFamily = "Helvetica";
    servingNr.style.width = "350x";
    servingNr.style.height = "25px";
    servingNr.style.fontSize = "medium";
    // Create country of origin
    var country = createCustomElements('div');
    country.innerText = "Country of origin: " + countryOfOrigin;
    country.style.fontFamily = "Helvetica";
    country.style.width = "350x";
    country.style.height = "25px";
    country.style.fontSize = "medium";
    // Create title of ingredients and ingredients
    var titleIng = createCustomElements('p');
    titleIng.style.fontFamily = "Helvetica";
    titleIng.style.fontSize = "medium";
    titleIng.style.fontWeight = "bold";
    titleIng.style.marginLeft = "10px";
    titleIng.style.marginBottom = "2px";
    titleIng.innerText = "Ingredients:";
    var ingredientsText = createCustomElements('p');
    ingredientsText.style.margin = "3px";
    ingredientsText.style.textAlign = "left";
    ingredientsText.style.padding = "10px";
    ingredientsText.style.fontSize = "small";
    ingredientsText.style.fontFamily = "Helvetica";
    ingredientsText.innerText = ingredients;
    // Create title of instructions and instructions
    var titleInst = createCustomElements('p');
    titleInst.style.fontFamily = "Helvetica";
    titleInst.style.fontSize = "medium";
    titleInst.style.fontWeight = "bold";
    titleInst.style.marginLeft = "10px";
    titleInst.style.marginBottom = "2px";
    titleInst.innerText = "Instructions:";
    var instructionsText = createCustomElements('p');
    instructionsText.style.margin = "3px";
    instructionsText.style.textAlign = "left";
    instructionsText.style.padding = "10px";
    instructionsText.style.fontSize = "small";
    instructionsText.style.fontFamily = "Helvetica";
    instructionsText.innerText = instructions;
    // Create title of nutrients and nutrients
    var titleNut = createCustomElements('h6');
    titleNut.innerText = "Nutrients:";
    titleNut.style.fontFamily = "Helvetica";
    // Creating another div to append images on it so i can overlap the flag image and the favourites icon on the food image inside the modal
    var divEl = createCustomElements('div');
    divEl.style.flexWrap = "wrap";
    divEl.style.position = "relative";
    // Appending the elements using row and columns in displaying purposes
    // Appending images
    divEl.appendChild(foodImg);
    divEl.appendChild(flagDetails);
    divEl.appendChild(favIcon);
    // First row with 2 columns
    var rowOne = createNewRow();
    var colOne = createNewCol();
    colOne.appendChild(divEl);
    var colTwo = document.createElement('div');
    colTwo.classList.add('col');
    colTwo.appendChild(typeFood);
    colTwo.appendChild(time);
    colTwo.appendChild(servingNr);
    colTwo.appendChild(country);
    rowOne.appendChild(colOne);
    rowOne.appendChild(colTwo);
    // Second row
    var secondRow = createNewRow();
    secondRow.style.marginTop = "100px";
    secondRow.appendChild(titleIng);
    // Third row
    var thirdRow = createNewRow();
    thirdRow.appendChild(ingredientsText);
    // Fourth row
    var fourthRow = createNewRow();
    fourthRow.appendChild(titleInst);
    // Fifth row
    var fifthRow = createNewRow();
    fifthRow.appendChild(instructionsText);
    // Sixth row for nutrients
    var sixthRow = createNewRow();
    // Creating a div for displaying nutrition content
    var nutritionContent = document.createElement('div');
    // Rows to display in modal
    displayInModal.appendChild(rowOne);
    displayInModal.appendChild(secondRow);
    displayInModal.appendChild(thirdRow);
    displayInModal.appendChild(fourthRow);
    displayInModal.appendChild(fifthRow);
    var totalCalories = 0
    var totalCholesterol = 0;
    var totalPotassium = 0;
    var totalSaturatedFat = 0;
    var totalSodium = 0;
    var totalSugars = 0;
    var totalCarbs = 0;
    var totalProteins = 0;
    // Dealing with nutrients
    for(let i=0;i<nutrients.length;i++){
        var ingName = nutrients[i].ingredientName;
        var ingImg = nutrients[i].ingredientURL;
        var calories = nutrients[i].calories;
        var cholesterol = nutrients[i].cholesterol;
        var potassium = nutrients[i].potassium;
        var saturatedFat = nutrients[i].saturatedFat;
        var sodium = nutrients[i].sodium;
        var sugars = nutrients[i].sugars;
        var totalCarbohydrates = nutrients[i].totalCarbohydrates;
        var protein = nutrients[i].protein;
        // Adding the value of each nutrient to total values
        totalCalories += calories;
        totalCholesterol += cholesterol;
        totalPotassium += potassium;
        totalSaturatedFat += saturatedFat;
        totalSodium += sodium;
        totalSugars += sugars;
        totalCarbs += totalCarbohydrates;
        totalProteins += protein;
    }
    var cardDeck = createCardDeck();
    var caloriesEl = createCardDynamically("https://res.cloudinary.com/hmzve6z5z/image/upload/v1610440519/ICONS/calories.png", "Calories", Math.round(totalCalories));
    var cholesterolEl = createCardDynamically("https://res.cloudinary.com/hmzve6z5z/image/upload/v1610443019/ICONS/cholesterol.png", "Cholesterol", Math.round(totalCholesterol));
    var potassiumEl = createCardDynamically("https://res.cloudinary.com/hmzve6z5z/image/upload/v1610446147/ICONS/potassium.png", "Potassium", Math.round(totalPotassium));
    var saturatedFatEl = createCardDynamically("https://res.cloudinary.com/hmzve6z5z/image/upload/v1610446004/ICONS/IMG-2804.png", "Sat. fat", Math.round(totalSaturatedFat));
    var sodiumEl = createCardDynamically("https://res.cloudinary.com/hmzve6z5z/image/upload/v1610446084/ICONS/sodium.png", "Sodium", Math.round(totalSodium));
    var sugarsEl = createCardDynamically("https://res.cloudinary.com/hmzve6z5z/image/upload/v1610444037/ICONS/sugar.png", "Sugars", Math.round(totalSugars));
    var carbsEl = createCardDynamically("https://res.cloudinary.com/hmzve6z5z/image/upload/v1610444172/ICONS/bakery.png", "Carbs", Math.round(totalCarbs));
    var proteinsEl = createCardDynamically("https://res.cloudinary.com/hmzve6z5z/image/upload/v1610448184/ICONS/protein.png", "Protein", Math.round(totalProteins));
    cardDeck.appendChild(caloriesEl);
    cardDeck.appendChild(cholesterolEl);
    cardDeck.appendChild(potassiumEl);
    cardDeck.appendChild(saturatedFatEl);
    cardDeck.appendChild(sodiumEl);
    cardDeck.appendChild(sugarsEl);
    cardDeck.appendChild(carbsEl);
    cardDeck.appendChild(proteinsEl);
    sixthRow.appendChild(cardDeck);
    nutritionContent.appendChild(sixthRow);
    displayInModal.appendChild(nutritionContent);
}

// This function cerates a new column
function createNewCol() {
    var col = document.createElement('div');
    col.classList.add('col');
    return col;
}

// This function creates a new row
function createNewRow() {
    var newRow = document.createElement('div');
    newRow.classList.add('row');
    return newRow;
}

// When the user clicks on favourites basket this function fires
function favouritesBasket(){
    var activeUser = getCookie("username");
    var displayElement = document.getElementById("search-response");
    displayElement.innerHTML = "";
    if(!($(displayElement).hasClass('justify-content-center'))){
        displayElement.classList.add('justify-content-center');
    }
    fetch("basket", {
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify({activeUser})
    }).then(resp => {
        return resp.json();
    }).then(function (response) {
            if(response === "empty"){
                var alertEmpty = genericFailedAlert();
                alertEmpty.innerText = "You have no items in your favourites!";
                var idOfAlertEmpty = randomUUIDForIdOfRows();
                alertEmpty.setAttribute('id', idOfAlertEmpty);
                displayAlertShoppingList(alertEmpty, displayElement);
                setTimeout(() => {
                    hideAlertShoppingList(idOfAlertEmpty);
                }, 1500);
            }else {
                populateFavContent(response);
            }
    });
}

// This function creates a percentage for the nutrients values for pie chart
function createPercentage(part, total){
    return Math.round((part / total) * 100);
}

// This function hovers the generate shopping list icon from favourites div
function hoverShoppingIcon(event){
    var id = event.data.idOfIconShopping;
    var element = document.getElementById(id);
    element.style.width = "40px";
    element.style.height = "40px";
}

// This function unhovers the generate shopping list ion from favourites div
function unHoverShoppingIcon(event){
    var id = event.data.idOfIconShopping;
    var el = document.getElementById(id);
    el.style.width = "35px";
    el.style.height = "35px";
}

// This function removes recipes from favourites
function removeFromFavourites(event){
    var nameOfRecipe = event.data.nameOfRecipe;
    var activeUser = getCookie("username");
    var idOfDiv = event.data.idOfDiv;
    fetch("removeFavourites",{
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify({activeUser, nameOfRecipe})
    }).then(res => {
        return res.json();
    }).then(function (response) {
        console.log(response);
        switch (response) {
            case "true":
                var dis = document.getElementById(idOfDiv);
                var alertYes = genericSuccessAlert();
                alertYes.innerText = "Recipe " + nameOfRecipe + " removed from favourites";
                var idOfAlertYes = randomUUIDForIdOfRows();
                alertYes.setAttribute('id', idOfAlertYes);
                displayAlertShoppingList(alertYes, dis);
                setTimeout(() => {
                    hideAlertShoppingList(idOfAlertYes);
                }, 1500);
                setTimeout(() => {
                    dis.innerHTML = "";
                    dis.style.display = "none";
                }, 1800);
                break;
            case "false":
                var alertNo = genericFailedAlert();
                alertNo.innerText = "There was an error when deleting the recipe";
                var idOfAlertNo = randomUUIDForIdOfRows();
                var disNo = document.getElementById(idOfDiv);
                alertNo.setAttribute('id', idOfAlertNo);
                displayAlertShoppingList(alertNo, disNo);
                setTimeout(() => {
                    hideAlertShoppingList(idOfAlertNo);
                }, 2000);
                break;
        }
    });
}

// This function hovers the remove from favourites icon from favourites div
function hoverRemoveIcon(event){
    var id = event.data.idOfRemIcon;
    var element = document.getElementById(id);
    element.style.width = "40px";
    element.style.height = "40px";
}

// This function unhovers the remove from favourites icon from favourites div
function unHoverRemoveIcon(event){
    var id = event.data.idOfRemIcon;
    var element = document.getElementById(id);
    element.style.width = "35px";
    element.style.height = "35px";
}

// This function fires for populating the favourites modal with information
function populateFavContent(arr){
    var displayContent = document.getElementById("search-response");
    displayContent.innerHTML = "";
    for(let i=0;i<arr.length;i++){
        var picUrl = arr[i].cloudUrlPicture;
        var nameOfRecipe = arr[i].nameOfRecipe;
        var type = arr[i].typeOfFood;
        var servings = arr[i].servings;
        var timeToCook = arr[i].timeToCook;
        var flagUrl = arr[i].flag;
        var ingr = arr[i].ingredients;
        var instr = arr[i].instructions;
        var nutrients = JSON.parse(arr[i].nutrients);
        var idOfDiv = randomUUIDForIdOfRows();
        // dealing with the display when we first push the fav content button
        if ($('.navbar-toggler').attr('aria-expanded') === "false"){
            displayContent.style.marginTop = "70px";
        }else if($('.navbar-toggler').attr('aria-expanded') === "true"){
            displayContent.style.marginTop = "150px";
        }
        // Creation of wrapper div for every recipe
        var wrapperDiv = createCustomElements('div');
        wrapperDiv.setAttribute("id", idOfDiv);
        wrapperDiv.style.width = "800px";
        wrapperDiv.style.height = "800px";
        wrapperDiv.style.marginBottom = "15px";
        wrapperDiv.style.backgroundColor = "#F8F8F8";
        wrapperDiv.style.opacity = "0.9";
        wrapperDiv.style.borderRadius = "5%";
        wrapperDiv.style.border = "0.5px solid black";
        wrapperDiv.style.boxShadow = "0 0 5px black";
        // Creation of wrapper images div for first col
        var wrapperImg = createCustomElements('div');
        wrapperImg.style.width = "220px";
        wrapperImg.style.height = "220px";
        wrapperImg.style.position = "relative";
        // Dynamic img element creation
        var img = createCustomElements('img');
        img.src = picUrl;
        img.style.width = "180px";
        img.style.height = "180px";
        img.style.borderRadius = "5%";
        img.style.position = "relative";
        img.style.left = "20px";
        img.style.top = "20px";
        // Dynamic img element for flag
        var flag = createCustomElements('img');
        flag.src = flagUrl;
        flag.style.width = "30px";
        flag.style.height = "30px";
        flag.style.borderRadius = "50%";
        flag.style.position = "absolute";
        flag.style.left = "25px";
        flag.style.top = "25px";
        // Dynamic name div element creation
        var name = createCustomElements('div');
        name.style.width = "320px";
        name.style.height = "30px";
        name.innerText = nameOfRecipe;
        name.style.fontFamily = "Helvetica";
        name.style.fontSize = "x-large";
        name.style.fontWeight = "bold";
        name.style.position = "relative";
        name.style.marginBottom = "50px";
        name.style.marginTop = "15px";
        name.style.left = "20px";
        name.style.color = "black";
        // Dynamic type element
        var typeOfFood = createCustomElements('div');
        typeOfFood.style.width = "200px";
        typeOfFood.style.height = "20px";
        typeOfFood.innerText = "Category: " + type;
        typeOfFood.style.fontFamily = "Helvetica";
        typeOfFood.style.fontSize = "11px";
        typeOfFood.style.textAlign = "center";
        typeOfFood.style.color = "black";
        // Dynamic servings element creation
        var servingsEl = createCustomElements('div');
        servingsEl.style.width = "200px";
        servingsEl.style.height = "20px";
        servingsEl.innerText = "Nr of servings: " + servings;
        servingsEl.fontFamily = "Helvetica";
        servingsEl.style.fontSize = "11px";
        servingsEl.style.textAlign = "center";
        servingsEl.style.color = "black";
        // Dynamic creation of time to cook element
        var time = createCustomElements('div');
        time.style.width = "200px";
        time.style.height = "20px";
        time.innerText = "Time: " + timeToCook;
        time.fontFamily = "Helvetica";
        time.style.fontSize = "11px";
        time.style.textAlign = "center";
        time.style.color = "black";
        // Dynamic creation of ingredients element
        var ingredients = createCustomElements('div');
        ingredients.style.width = "500px";
        ingredients.style.height = "120px";
        ingredients.style.marginLeft = "20px";
        ingredients.style.marginRight = "10px";
        ingredients.style.fontFamily = "Helvetica";
        ingredients.style.fontSize = "11px";
        ingredients.style.color = "black";
        ingredients.innerText = "Ingredients: " + ingr;
        var idOfIng = randomUUIDForIdOfRows();
        ingredients.setAttribute('id', idOfIng);
        // Dynamic creation of instructions element
        var instructions = createCustomElements('div');
        instructions.style.width = "500px";
        instructions.style.height = "200px";
        instructions.style.marginLeft = "20px";
        instructions.style.marginRight = "10px";
        instructions.style.fontFamily = "Helvetica";
        instructions.style.fontSize = "11px";
        instructions.style.color = "black";
        instructions.innerText = "Instructions: " + instr;
        // Creating the remove from favourites icon
        var removeFavIcon = createCustomElements('img');
        var idOfRemIcon = randomUUIDForIdOfRows();
        removeFavIcon.setAttribute('id', idOfRemIcon);
        removeFavIcon.src = "https://res.cloudinary.com/hmzve6z5z/image/upload/v1611152662/ICONS/remove.svg";
        removeFavIcon.style.width = "35px";
        removeFavIcon.style.height = "35px";
        removeFavIcon.style.position = "absolute";
        removeFavIcon.style.right = "50px";
        removeFavIcon.style.top = "20px";
        $(removeFavIcon).on('click', {nameOfRecipe:nameOfRecipe, idOfDiv:idOfDiv}, removeFromFavourites);
        $(removeFavIcon).on('mouseenter', {idOfRemIcon:idOfRemIcon}, hoverRemoveIcon);
        $(removeFavIcon).on('mouseleave', {idOfRemIcon:idOfRemIcon}, unHoverRemoveIcon);
        // Creating the generate shopping list icon
        var iconForShoppingList = createCustomElements('img');
        var idOfIconShopping = randomUUIDForIdOfRows();
        iconForShoppingList.style.width = "35px";
        iconForShoppingList.style.height = "35px";
        iconForShoppingList.style.position = "absolute";
        iconForShoppingList.style.right = "120px";
        iconForShoppingList.style.top = "20px";
        iconForShoppingList.setAttribute('id', idOfIconShopping);
        iconForShoppingList.src = "https://res.cloudinary.com/hmzve6z5z/image/upload/v1611146306/ICONS/checklist.svg";
        $(iconForShoppingList).on('click', {name:nameOfRecipe, idOfIng:idOfIng}, generateShoppingList);
        $(iconForShoppingList).on('mouseenter', {idOfIconShopping:idOfIconShopping}, hoverShoppingIcon);
        $(iconForShoppingList).on('mouseleave', {idOfIconShopping:idOfIconShopping}, unHoverShoppingIcon);
        // Appending elements
        var firstRow = createNewRow();
        firstRow.style.marginBottom = "20px";
        var firstCol = createNewCol();
        var secondCol = createNewCol();
        var innerRowForTitleAndFavIcon = createNewRow();
        wrapperImg.appendChild(img);
        wrapperImg.appendChild(flag);
        firstCol.appendChild(wrapperImg);
        innerRowForTitleAndFavIcon.appendChild(name);
        innerRowForTitleAndFavIcon.appendChild(iconForShoppingList);
        innerRowForTitleAndFavIcon.appendChild(removeFavIcon);
        secondCol.appendChild(innerRowForTitleAndFavIcon);
        secondCol.appendChild(ingredients);
        secondCol.appendChild(instructions);
        firstCol.appendChild(typeOfFood);
        firstCol.appendChild(servingsEl);
        firstCol.appendChild(time);
        firstRow.appendChild(firstCol);
        firstRow.appendChild(secondCol);
        wrapperDiv.appendChild(firstRow);
        displayContent.appendChild(wrapperDiv);
        // I need to get the sum of nutrients for final display
        var totalCalories = 0;
        var totalCholesterol = 0;
        var totalPotassium = 0;
        var totalSaturatedFat = 0;
        var totalSodium = 0;
        var totalSugars = 0;
        var totalCarbs = 0;
        var totalProteins = 0;
        // Dealing with nutrients
        for(let i=0;i<nutrients.length;i++){
            var ingName = nutrients[i].ingredientName;
            var ingImg = nutrients[i].ingredientURL;
            var calories = nutrients[i].calories;
            var cholesterol = nutrients[i].cholesterol;
            var potassium = nutrients[i].potassium;
            var saturatedFat = nutrients[i].saturatedFat;
            var sodium = nutrients[i].sodium;
            var sugars = nutrients[i].sugars;
            var totalCarbohydrates = nutrients[i].totalCarbohydrates;
            var protein = nutrients[i].protein;
            // Adding the value of each nutrient to total values
            totalCalories += calories;
            totalCholesterol += cholesterol;
            totalPotassium += potassium;
            totalSaturatedFat += saturatedFat;
            totalSodium += sodium;
            totalSugars += sugars;
            totalCarbs += totalCarbohydrates;
            totalProteins += protein;
        }
        var secondRow = createNewRow();
        var thirdRow = createNewRow();
        var fourthRow = createNewRow();//row for chart
        var cardDeck = createCardDeck();
        var caloriesEl = createCardDynamically("https://res.cloudinary.com/hmzve6z5z/image/upload/v1610440519/ICONS/calories.png", "Calories", Math.round(totalCalories));
        var cholesterolEl = createCardDynamically("https://res.cloudinary.com/hmzve6z5z/image/upload/v1610443019/ICONS/cholesterol.png", "Cholesterol", Math.round(totalCholesterol));
        var potassiumEl = createCardDynamically("https://res.cloudinary.com/hmzve6z5z/image/upload/v1610446147/ICONS/potassium.png", "Potassium", Math.round(totalPotassium));
        var saturatedFatEl = createCardDynamically("https://res.cloudinary.com/hmzve6z5z/image/upload/v1610446004/ICONS/IMG-2804.png", "Sat. fat", Math.round(totalSaturatedFat));
        var sodiumEl = createCardDynamically("https://res.cloudinary.com/hmzve6z5z/image/upload/v1610446084/ICONS/sodium.png", "Sodium", Math.round(totalSodium));
        var sugarsEl = createCardDynamically("https://res.cloudinary.com/hmzve6z5z/image/upload/v1610444037/ICONS/sugar.png", "Sugars", Math.round(totalSugars));
        var carbsEl = createCardDynamically("https://res.cloudinary.com/hmzve6z5z/image/upload/v1610444172/ICONS/bakery.png", "Carbs", Math.round(totalCarbs));
        var proteinsEl = createCardDynamically("https://res.cloudinary.com/hmzve6z5z/image/upload/v1610448184/ICONS/protein.png", "Protein", Math.round(totalProteins));
        cardDeck.appendChild(caloriesEl);
        cardDeck.appendChild(cholesterolEl);
        cardDeck.appendChild(potassiumEl);
        cardDeck.appendChild(saturatedFatEl);
        cardDeck.appendChild(sodiumEl);
        cardDeck.appendChild(sugarsEl);
        cardDeck.appendChild(carbsEl);
        cardDeck.appendChild(proteinsEl);
        secondRow.appendChild(cardDeck);
        wrapperDiv.appendChild(secondRow);
        // Canvas, next ->
        var canvasDiv = createCustomElements('div');
        canvasDiv.classList.add('chart-container');
        canvasDiv.style.position = "relative";
        canvasDiv.style.left = "350px";
        canvasDiv.style.height = "200px";
        canvasDiv.style.width = "400px";
        var canvas = document.createElement('canvas');
        canvasDiv.appendChild(canvas);
        var ctx = canvas.getContext('2d');
        var idOfCanvas = randomUUIDForIdOfRows();
        canvas.setAttribute('id', idOfCanvas);
        // Taking the values and making percentages
        var totalPercentage = Math.round(totalCholesterol + totalPotassium + totalSaturatedFat + totalSodium + totalSugars + totalCarbs + totalProteins);
        var cholesterolPercentage = createPercentage(totalCholesterol, totalPercentage);
        var potassiumPercentage = createPercentage(totalPotassium, totalPercentage);
        var saturatedFatPercentage = createPercentage(totalSaturatedFat, totalPercentage);
        var sodiumPercentage = createPercentage(totalSodium, totalPercentage);
        var sugarsPercentage = createPercentage(totalSugars, totalPercentage);
        var carbsPercentage = createPercentage(totalCarbs, totalPercentage);
        var proteinsPercentage = createPercentage(totalProteins, totalPercentage);
        let arrObj = [{name: "Cholesterol", value:cholesterolPercentage + "%"},
            {name: "Potassium", value:potassiumPercentage + "%"},
            {name: "Saturated Fat", value:saturatedFatPercentage + "%"},
            {name: "Sodium", value:sodiumPercentage + "%"},
            {name: "Sugars", value:sugarsPercentage + "%"},
            {name: "Carbs", value:carbsPercentage + "%"},
            {name: "Proteins", value:proteinsPercentage + "%"}];
        let chartData = [cholesterolPercentage, potassiumPercentage,
            saturatedFatPercentage, sodiumPercentage, sugarsPercentage, carbsPercentage, proteinsPercentage];
        let myChart = new Chart(ctx, {
            type:'pie',
            data:{
                labels: ['Cholesterol', 'Potassium', 'Saturated Fat', 'Sodium', 'Sugars', 'Carbs', 'Proteins'],
                datasets:[{
                        label:'# of Nutrients',
                    data: chartData,
                    backgroundColor:[
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(678, 266, 86, 0.2)',
                        'rgba(75, 192, 192, 0.2)',
                        'rgba(113, 122, 245, 0.7)',
                        'rgba(255, 159, 64, 0.2)',
                        'rgba(255, 49, 71, 0.5)',
                        'rgba(255, 98, 135, 0.6)'],
                    borderColor:[
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(678, 266, 86, 0.2)',
                        'rgba(75, 192, 192, 0.2)',
                        'rgba(113, 122, 245, 0.7)',
                        'rgba(255, 159, 64, 0.2)',
                        'rgba(255, 49, 71, 0.5)',
                        'rgba(255, 98, 135, 0.6)'],
                    borderWidth:1
                    }]
            },
            options:{
                tooltips: {
                    mode: 'label',
                    callbacks: {
                        label: function(tooltipItem, data) {
                            return data.labels[tooltipItem.index] + ': ' + data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index] + '%'
                        }
                    }
                },
                scales:{
                    yAxes:[{
                        ticks:{
                            beginAtZero:true
                        }
                    }]
                }
            }
        });
        var tableNutrients = createNutrientTable(arrObj);
        wrapperDiv.appendChild(canvasDiv);
        wrapperDiv.appendChild(tableNutrients);
    }
}

// This function creates a dynamic table for nutrient percentages
function createNutrientTable(arr){
    var table = createCustomElements('table');
    table.style.width = "";
    table.classList.add('table');
    table.classList.add('table-hover');
    table.classList.add('table-sm');
    table.style.cursor = "pointer";
    table.style.width = "200px";
    table.style.fontSize = "x-small";
    table.style.position = "relative";
    table.style.bottom = "195px";
    table.style.left = "40px";
    var thead = createCustomElements('thead');
    var theadRow = createCustomElements('tr');
    var thName = createCustomElements('th');
    thName.setAttribute('scope', 'col');
    thName.innerText = "Element";
    var thValue = createCustomElements('th');
    thValue.setAttribute('scope', 'col');
    thValue.innerText = "Value";
    theadRow.appendChild(thName);
    theadRow.appendChild(thValue);
    thead.appendChild(theadRow);//thead needs to be added to table
    table.appendChild(thead);
    var tableBody = createCustomElements('tbody');
    arr.forEach(obj => {
        var tableRowBody = createCustomElements('tr');
        var tdRowBodyOne = createCustomElements('td');
        tdRowBodyOne.innerText = obj.name;
        var tdRowBodyTwo = createCustomElements('td');
        tdRowBodyTwo.innerText = obj.value;
        tableRowBody.appendChild(tdRowBodyOne);
        tableRowBody.appendChild(tdRowBodyTwo);
        tableBody.appendChild(tableRowBody);
    });
    table.appendChild(tableBody);
    return table;
}

// This function fires when you press the add to shopping list from more details modal
function generateShoppingListFromMoreDetailsModal(event){
    var nameOfRecipe = event.data.name;
    var activeUser = getCookie("username");
    var display = document.getElementById("modal-content-details-recipe");
    fetch("modalmoredetails", {
        method: "POST",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify({nameOfRecipe, activeUser})
    }).then(res => {
        return res.json();
    }).then(function (response) {
        console.log(response);
        if(response === "true"){
            var alertYes = alertSuccessShoppingList();
            alertYes.style.zIndex = "2000";
            alertYes.innerText = "Shopping list generated successfully";
            alertYes.style.left = "40%";
            alertYes.style.position = "absolute";
            alertYes.style.top = "30%";
            alertYes.setAttribute("id", "alert-shopping-success");
            displayAlertShoppingList(alertYes, display);
            setTimeout(() => {hideAlertShoppingList("alert-shopping-success")}, 2000);
        }else if(response === "false"){
            var alertNo = alertFailedShoppingList();
            alertNo.style.zIndex = "2000";
            alertNo.innerText = "Duplicate shopping list";
            alertNo.style.left = "40%";
            alertNo.style.position = "absolute";
            alertNo.style.top = "30%";
            alertNo.setAttribute("id", "alert-failed-shopping");
            displayAlertShoppingList(alertNo, display);
            setTimeout(() => {hideAlertShoppingList("alert-failed-shopping")}, 2000);
        }
    });
}

// This function fires when you press the add to shopping list button from favourites recipes
function generateShoppingList(event) {
    var nameOfRecipe = event.data.name;
    var idOfDisplayDiv = event.data.idOfIng;
    var displayDiv = document.getElementById(idOfDisplayDiv);
    var activeUser = getCookie("username");
    var alertSuccess = alertSuccessShoppingList();
    var idForAlertSucces = randomUUIDForIdOfRows();
    alertSuccess.setAttribute("id", idForAlertSucces);
    var alertFailed = alertFailedShoppingList();
    var idForAlertFailed = randomUUIDForIdOfRows();
    alertFailed.setAttribute("id", idForAlertFailed);
    fetch("addShoppingList",{
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify({nameOfRecipe, activeUser})
    }).then(res => {
        return res.json();
    }).then(function (response) {
        // fire an alert that says the recipe was added to shopping list
        if(response === "true"){
            alertSuccess.innerText = "Shopping list was generated";
            alertSuccess.style.position = "absolute";
            alertSuccess.style.left = "20%";
            alertSuccess.style.fontSize = "small";
            alertSuccess.style.zIndex = "2200";
            displayAlertShoppingList(alertSuccess, displayDiv);
            setTimeout(() => {hideAlertShoppingList(idForAlertSucces)}, 2000);
        }else if(response === "false"){
            alertFailed.innerText = "You already generated this shopping list!";
            alertFailed.style.position = "absolute";
            alertFailed.style.left = "20%";
            alertFailed.style.fontSize = "small";
            alertFailed.style.zIndex = "2200";
            displayAlertShoppingList(alertFailed, displayDiv);
            setTimeout(() => {hideAlertShoppingList(idForAlertFailed)}, 2000);
        }
    });
}

// This function creates an alert-success dynamically for generating shopping list
function alertSuccessShoppingList(){
    var alert = createCustomElements('alert');
    alert.classList.add('alert');
    alert.classList.add('alert-success');
    alert.setAttribute("role", "alert");
    return alert;
}

// This function creates an alert-failed dynamically for failing to generate shopping list
function alertFailedShoppingList(){
    var alert = createCustomElements('alert');
    alert.classList.add('alert');
    alert.classList.add('alert-danger');
    alert.setAttribute("role", "alert");
    return alert;
}

// This function displays the alert for generating shopping list
function displayAlertShoppingList(alert, elementToDisplayTo){
    elementToDisplayTo.appendChild(alert);
}

// This function hides the alert for generating shopping list
function hideAlertShoppingList(idOfAlert){
    var alert = document.getElementById(idOfAlert);
    $(alert).alert('close');
    $(alert).alert('dispose');
}

// This function creates a card deck dynamically
function createCardDeck(){
    var cardDeck = createCustomElements('div');
    cardDeck.classList.add('card-deck');
    cardDeck.style.marginRight = "20px";
    cardDeck.style.marginLeft = "20px";
    return cardDeck;
}

// This function creates a card dynamically for displaying the nutrients on fav div and more details modal
function createCardDynamically(imgSrc, title, numberOfCalories){
    var card = createCustomElements('div');
    card.style.width = "100px";
    card.style.height = "80px";
    card.style.marginBottom = "5px";
    card.style.backgroundColor = "#F8F8F8";
    card.style.border = "0px";
    card.classList.add('card');
    var imgTopCard = createCustomElements('img');
    imgTopCard.style.height = "30px";
    imgTopCard.style.width = "40px";
    imgTopCard.style.marginLeft = "20%";
    imgTopCard.style.borderRadius = "5%";
    imgTopCard.setAttribute('id', 'card-img');
    imgTopCard.src = imgSrc;
    var cardBody = createCustomElements('div');
    cardBody.style.fontSize = "xx-small";
    cardBody.style.textAlign = "center";
    cardBody.style.padding = "5px";
    cardBody.style.color = "black";
    cardBody.classList.add('card-body');
    var cardTitle = createCustomElements('div');
    cardTitle.innerText = title;
    var cardText = createCustomElements('div');
    cardText.innerText = numberOfCalories;
    // Appending elements
    cardBody.appendChild(cardText);
    cardBody.appendChild(cardTitle);
    card.appendChild(imgTopCard);
    card.appendChild(cardBody);
    return card;
}

// This function enlarges the icons on mouse over event
function hoverIcon(id) {
    var icon = document.getElementById(id);
    icon.style.width = "35px";
    icon.style.height = "35px";
}

// This function reduces the icon to the normal size on mouse leave
function hoverIconLeave(id) {
    var icon = document.getElementById(id);
    icon.style.width = "30px";
    icon.style.height = "30px";
}

// This function hovers the wheel
function hoverWheel(){
    var wheel = document.getElementById("random-spin");
    wheel.style.width = "40px";
    wheel.style.height = "40px";
}

// This function unhovers the wheel
function hoverWheelLeave(){
    var wheel = document.getElementById("random-spin");
    wheel.style.width = "35px";
    wheel.style.height = "35px";
}

// Search functionality getting the information
function searchFunction() {
    const display = document.getElementById("search-response");
    display.innerHTML = "";
    const searchInput = document.getElementById("searchInput").value;
    if (searchInput != null || searchInput !== "") {
        fetch("searchRecipe", {
            method: "POST",
            body: JSON.stringify({searchInput}),
            headers: {
                "Content-Type": "application/json"
            }
        }).then(res => {
            return res.json();
        }).then(function (response) {
            document.getElementById("search-response").innerHTML = "";
            arr = [];
            createCard(response, "search-response");
        });
    } else {
        display.innerText = "Something went wrong!";
    }
};

// This function shows a modal when the details of a recipe is clicked from the card element
function showDetailedRecipe() {
    $('#modalDetailsRecipe').modal('show');
}

// This function spins the wheel
function wheelSpin(event){
    let response = event.data.response;
    const idOfWheel = event.data.idOfWheel;
    const idOfPointer = event.data.idOfPointer;
    const idOfButton = event.data.idOfButton;
    const wheel = document.getElementById(idOfWheel);
    const pointer = document.getElementById(idOfPointer);
    const button = document.getElementById(idOfButton);
    let deg = 0;
    button.style.pointerEvents = "none";
    deg = Math.floor(5000 + Math.random() * 5000);
    wheel.style.transition = 'all 7s ease-out';
    wheel.style.transform = 'rotate(' + deg + 'deg)';
    wheel.classList.add('blur');
    setTimeout(()=>{
        createCardForRandomRecipeSpinWheel(response, "search-response");
    }, 7050);
}

// This function displays the environment for spinning the wheel
function wheelSpinEnvironment(response){
    var display = document.getElementById("search-response");
    display.classList.remove('justify-content-center');//displaying the wheel right
    if ($('.navbar-toggler').attr('aria-expanded') === "false"){
        display.style.marginTop = "70px";
    }else if($('.navbar-toggler').attr('aria-expanded') === "true"){
        display.style.marginTop = "150px";
    }
    var wrapperDiv = createCustomElements('div');
    wrapperDiv.style.width = "400px";
    wrapperDiv.style.height = "400px";
    wrapperDiv.style.position = "relative";
    wrapperDiv.style.left = "650px";
    var foodWheel = createCustomElements('img');
    foodWheel.src = "https://res.cloudinary.com/hmzve6z5z/image/upload/v1610223336/ICONS/wheel-removebg-preview.png";
    foodWheel.style.width = "100%";
    foodWheel.style.height = "100%";
    var idOfWheel = randomUUIDForIdOfRows();
    foodWheel.setAttribute('id', idOfWheel);
    var pointer = createCustomElements('img');
    pointer.src = "https://res.cloudinary.com/hmzve6z5z/image/upload/v1611656663/ICONS/restaurant.svg";
    pointer.style.width = "45px";
    pointer.style.height = "45px";
    pointer.style.position = "absolute";
    pointer.style.left = "177px";
    pointer.style.top = "10px";
    pointer.style.zIndex = "2";
    var idOfPointer = randomUUIDForIdOfRows();
    pointer.setAttribute('id', idOfPointer);
    var button = createCustomElements('button');
    button.classList.add('btn');
    button.classList.add('btn-outline-info');
    button.style.boxShadow = "0 0 5px black";
    button.style.width = "110x";
    button.style.height = "30px";
    button.style.marginLeft = "160px";
    button.style.fontSize = "x-small";
    button.innerText = "Spin the wheel";
    var idOfButton = randomUUIDForIdOfRows();
    button.setAttribute('id', idOfButton);
    $(button).on('click', {response:response,idOfButton:idOfButton, idOfWheel:idOfWheel, idOfPointer:idOfPointer}, wheelSpin);
    wrapperDiv.appendChild(pointer);
    wrapperDiv.appendChild(foodWheel);
    wrapperDiv.appendChild(button);
    display.appendChild(wrapperDiv);
}

// Here i spin the wheel and generate a random recipe from db
function randomFunction(){
    fetch("random", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        }
    }).then(res => {
        return res.json();
    }).then(function (response) {
        document.getElementById("search-response").innerHTML = "";
        wheelSpinEnvironment(response);
    });
}

// This function fires when user clicks on logout
function logout() {
    clearCookies();
    fetch("logout",{
        method:"POST",
        headers:{"Content-Type":"application/json"}
    }).then(res => {return res.json();
    }).then(function (response) {
        if(response === "true"){
            redirectPage();
        }
    });
}

// This function fires when user presses the menu collapse icon
function collapseTheResponseBody(){
    var display = document.getElementById("search-response");
    if ($('.navbar-toggler').attr('aria-expanded') === "false") {
        display.style.marginTop = "150px";
    }else if($('.navbar-toggler').attr('aria-expanded') === "true"){
        display.style.marginTop = "70px";
    }
}

// This function creates the form
function createFormDynamically(){
    var form = createCustomElements('form');
    form.setAttribute('id', 'complex-search-form');
    form.style.position = "relative";
    form.style.top = "110px";
    var firstRow = createCustomElements('div');
    firstRow.classList.add('form-row');
    firstRow.classList.add('justify-content-center');
    firstRow.style.marginBottom = "20px";
    var firstColFirstRow = createCustomElements('div');
    firstColFirstRow.classList.add('col-5');
    var selectType = createCustomElements('select');
    selectType.style.boxShadow = "0 0 5px black";
    selectType.setAttribute('id', 'select-type-of-food');
    selectType.classList.add('custom-select');
    var optionTypeOfFood = createCustomElements('option');
    optionTypeOfFood.setAttribute('value', '');
    optionTypeOfFood.innerText = "Select type of food...";
    selectType.appendChild(optionTypeOfFood);
    var arr = ["poultry", "beef", "dairy", "fish", "fruits", "game", "lamb", "nuts", "offal", "pasta", "pork", "pulses and soya", "rice and grains", "salads", "shellfish", "soups", "vegetables"];
    for(let i=0;i<arr.length;i++){
        var optionField = createCustomElements('option');
        optionField.innerText = arr[i];
        selectType.appendChild(optionField);
    }
    firstColFirstRow.appendChild(selectType);
    firstRow.appendChild(firstColFirstRow);
    var firstRowColTwo = createCustomElements('div');
    firstRowColTwo.classList.add('col-5');
    var selectServings = createCustomElements('select');
    selectServings.style.boxShadow = "0 0 5px black";
    selectServings.setAttribute('id', 'select-nr-of-servings');
    selectServings.classList.add('custom-select');
    var optionServings = createCustomElements('option');
    optionServings.setAttribute('value', '');
    optionServings.innerText = "Servings...";
    selectServings.appendChild(optionServings);
    var arrServings = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
    for(let j=0;j<arrServings.length;j++){
        var optionFieldServings = createCustomElements('option');
        optionFieldServings.innerText = arrServings[j];
        selectServings.appendChild(optionFieldServings);
    }
    firstRowColTwo.appendChild(selectServings);
    firstRow.appendChild(firstRowColTwo);
    var secondRow = createCustomElements('div');
    secondRow.classList.add('form-row');
    secondRow.classList.add('justify-content-center');
    secondRow.style.marginBottom = "50px";
    var firstColSecondRow = createCustomElements('div');
    firstColSecondRow.classList.add('col-5');
    var selectTimeToCook = createCustomElements('select');
    selectTimeToCook.style.boxShadow = "0 0 5px black";
    selectTimeToCook.setAttribute('id', 'select-time-to-cook');
    selectTimeToCook.classList.add('custom-select');
    var optionTimeToCook = createCustomElements('option');
    optionTimeToCook.setAttribute('value', '');
    optionTimeToCook.innerText = "Select time to cook..";
    selectTimeToCook.appendChild(optionTimeToCook);
    var arrTimeToCook = ["30 minutes", "60 minutes", "90 minutes", "120 minutes", "150 minutes", "180 minutes", "210 minutes", "230 minutes", "260 minutes", "290 minutes", "320 minutes", "350 minutes", "380 minutes", "410 minutes"];
    for(let k=0;k<arrTimeToCook.length;k++){
        var optionTimeToCookIn = createCustomElements('option');
        optionTimeToCookIn.innerText = arrTimeToCook[k];
        selectTimeToCook.appendChild(optionTimeToCookIn);
    }
    firstColSecondRow.appendChild(selectTimeToCook);
    secondRow.appendChild(firstColSecondRow);
    var secondColSecondRow = createCustomElements('div');
    secondColSecondRow.classList.add('col-5');
    var selectCalories = createCustomElements('select');
    selectCalories.style.boxShadow = "0 0 5px black";
    selectCalories.setAttribute('id', 'select-nr-of-calories');
    selectCalories.classList.add('custom-select');
    var optionCalories = createCustomElements('option');
    optionCalories.setAttribute('value', '');
    optionCalories.innerText = "Calories";
    selectCalories.appendChild(optionCalories);
    var arrCalories = ["300", "500", "1000", "1500", "2000", "2500", "3000", "3500", "4000", "4500", "5000", "5500", "6000"];
    for(let n=0;n<arrCalories.length;n++){
        var optionCaloriesIn = createCustomElements('option');
        optionCaloriesIn.innerText = arrCalories[n];
        selectCalories.appendChild(optionCaloriesIn);
    }
    secondColSecondRow.appendChild(selectCalories);
    secondRow.appendChild(secondColSecondRow);
    var thirdRow = createCustomElements('div');
    thirdRow.classList.add('form-row');
    thirdRow.classList.add('justify-content-center');
    thirdRow.style.marginBottom = "20px";
    thirdRow.style.marginTop = "20px";
    var divSubmit = createCustomElements('div');
    divSubmit.classList.add('submit-btn');
    var submitBtn = createCustomElements('button');
    submitBtn.classList.add('btn-danger');
    submitBtn.setAttribute('type', 'submit');
    submitBtn.setAttribute('id', 'submit-btn-complex-search');
    submitBtn.style.width = "110px";
    submitBtn.style.borderRadius = "5%";
    submitBtn.style.height = "35px";
    submitBtn.style.position = "relative";
    submitBtn.innerText = "Search";
    $(submitBtn).on('click', executeComplexSearch);
    divSubmit.appendChild(submitBtn);
    thirdRow.appendChild(divSubmit);
    form.appendChild(firstRow);
    form.appendChild(secondRow);
    form.appendChild(thirdRow);
    return form;
}

// This function fires when user clicks on complex search icon
function complexSearch() {
    var display = document.getElementById("search-response");
    display.innerHTML = "";
    if(!($(display).hasClass('justify-content-center'))){
        display.classList.add('justify-content-center');
    }
    var rowDiv = createCustomElements('div');
    rowDiv.classList.add('row');
    rowDiv.classList.add('justify-content-center');
    rowDiv.style.marginBottom = "20px";
    var icon = createCustomElements('img');
    icon.src = "https://res.cloudinary.com/hmzve6z5z/image/upload/v1610956590/ICONS/complex_search_filter.svg";
    icon.style.width = "40px";
    icon.style.height = "40px";
    icon.style.position = "absolute";
    icon.style.left = "31%";
    var title = createCustomElements('h4');
    title.style.position = "absolute";
    title.style.left = "31%";
    title.style.fontWeight = "bolder";
    title.style.fontFamily = "Helvetica";
    title.style.marginTop = "40px";
    title.innerText = "Filters";
    rowDiv.appendChild(icon);
    rowDiv.appendChild(title);
    var form = createFormDynamically();
    var wrapperDiv = createCustomElements('div');
    wrapperDiv.style.width = "500px";
    wrapperDiv.style.height = "400px";
    wrapperDiv.style.opacity = "0.9";
    wrapperDiv.style.backgroundColor = "#F8F8F8";
    wrapperDiv.style.boxShadow = "0 0 5px black";
    wrapperDiv.appendChild(rowDiv);
    wrapperDiv.appendChild(form);
    display.appendChild(wrapperDiv);
}

// This function fires when user clicks on Search btn from complex search form
function executeComplexSearch(){
    var form = document.getElementById('complex-search-form');
    if(validateAddRecipeForm(form)){
        var typeOfFood = document.getElementById('select-type-of-food').value;
        var numberOfServings = document.getElementById('select-nr-of-servings').value;
        var timeToCook = document.getElementById('select-time-to-cook').value;
        var numberOfCalories = document.getElementById('select-nr-of-calories').value;
        fetch("complexSearch", {
            method:"POST",
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify({typeOfFood, numberOfServings, timeToCook, numberOfCalories})
        }).then(res => {
            return res.json();
        }).then(function (response) {
            if(response === "false"){
                var alertNo = genericFailedAlert();
                alertNo.innerText = "We couldn`t find any recipes that match your criteria.";
                alertNo.style.zIndex = "2200";
                var display = document.getElementById('search-response');
                displayAlertShoppingList(alertNo,display);
                var idOfAlertFailed = randomUUIDForIdOfRows();
                alertNo.setAttribute('id', idOfAlertFailed);
                setTimeout(() => {
                    hideAlertShoppingList(idOfAlertFailed);
                }, 2000);
            }else {
                document.getElementById("search-response").innerHTML = "";
                createCardForRandomRecipeSpinWheel(response, "search-response");
            }
        });
    } else {
        var alertEmptyFields = genericFailedAlert();
        alertEmptyFields.innerText = "You cannot leave empty fields";
        var idOfAlertEmpty = randomUUIDForIdOfRows();
        alertEmptyFields.setAttribute('id', idOfAlertEmpty);
        document.getElementById('search-response').appendChild(alertEmptyFields);
        setTimeout(() => {
            hideAlertShoppingList(idOfAlertEmpty);
        }, 2000);
    }
    return false;
}

// This function fires when user clicks on search by ingredients icon
function searchByIngredients() {
    arrayOfAddedIngredients = [];
    var display = document.getElementById('search-response');
    display.innerHTML = "";
    if(!($(display).hasClass('justify-content-center'))){
        display.classList.add('justify-content-center');
    }
    var wrapperDiv = createCustomElements('div');
    wrapperDiv.style.position = "relative";
    wrapperDiv.setAttribute('id', 'wrapper-div-for-ingredients-images');
    var img = createCustomElements('img');
    img.src = "https://res.cloudinary.com/hmzve6z5z/image/upload/v1610781850/ICONS/boiling.svg";
    img.style.width = "200px";
    img.style.height = "200px";
    var plateImg = createCustomElements('img');
    plateImg.src = "https://res.cloudinary.com/hmzve6z5z/image/upload/v1610821140/ICONS/bowl.svg";
    plateImg.style.width = "200px";
    plateImg.style.height = "200px";
    var firstRow = createNewRow();
    firstRow.classList.add('justify-content-center');
    firstRow.appendChild(img);
    var secondRow = createNewRow();
    secondRow.classList.add('justify-content-center');
    var divForChosenIngredients = createCustomElements('div');
    divForChosenIngredients.style.width = "600px";
    divForChosenIngredients.style.height = "100px";
    divForChosenIngredients.setAttribute('id', 'chosen-ingredients-div');
    var innerRowIngDiv = createNewRow();
    innerRowIngDiv.classList.add('justify-content-center');
    innerRowIngDiv.appendChild(divForChosenIngredients);
    secondRow.appendChild(innerRowIngDiv);
    var thirdRow = createNewRow();
    thirdRow.classList.add('justify-content-center');
    thirdRow.appendChild(plateImg);
    wrapperDiv.appendChild(firstRow);
    wrapperDiv.appendChild(secondRow);
    wrapperDiv.appendChild(thirdRow);
    display.appendChild(wrapperDiv);
    var divNav = createDivLikeNav();
    display.appendChild(divNav);
    var listOfAddedIngredients = listOfAddedIngredientsScreenDiv();
    listOfAddedIngredients.style.textAlign = "center";
    var title = createCustomElements('h6');
    title.style.color = "black";
    title.innerText = "Ingredients list";
    listOfAddedIngredients.appendChild(title);
    display.appendChild(listOfAddedIngredients);
}

// This function creates a div for displaying the added ingredients name for the search by ingredients functionality
function listOfAddedIngredientsScreenDiv(){
    var list = createCustomElements('div');
    list.style.width = "270px";
    list.style.height = "470px";
    list.style.position = "absolute";
    list.style.right = "30px";
    list.style.backgroundColor = "#F8F8F8";
    list.style.opacity = "0.9";
    list.style.boxShadow = "0 0 5px black";
    list.setAttribute('id', 'list-of-added-ingredients');
    var buttonForConfirmingTheIngredientSearch = createCustomElements('button');
    buttonForConfirmingTheIngredientSearch.classList.add('btn');
    buttonForConfirmingTheIngredientSearch.classList.add('btn-outline-info');
    buttonForConfirmingTheIngredientSearch.style.boxShadow = "0 0 5px black";
    buttonForConfirmingTheIngredientSearch.style.width = "80px";
    buttonForConfirmingTheIngredientSearch.style.fontSize = "x-small";
    $(buttonForConfirmingTheIngredientSearch).on('click', searchForRecipesByIngredients);
    buttonForConfirmingTheIngredientSearch.style.height = "30px";
    buttonForConfirmingTheIngredientSearch.innerText = "Search";
    buttonForConfirmingTheIngredientSearch.setAttribute('id', 'btn-for-searching-recipes-by-ingredients');
    buttonForConfirmingTheIngredientSearch.style.position = "relative";
    buttonForConfirmingTheIngredientSearch.style.top = "430px";
    buttonForConfirmingTheIngredientSearch.style.left = "10px";
    list.appendChild(buttonForConfirmingTheIngredientSearch);
    return list;
}

// This function fires when the user clicks on search btn from the list of ingredients chosen by him -> searches for recipes based on those ingredients
function searchForRecipesByIngredients(){
    var arr = arrayOfAddedIngredients;
    fetch("searchByIngredients",{
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify({arr})
    }).then(res => {
        return res.json();
    }).then(function (response) {
        console.log(response);
        if(response.length == 0){
            var alert = genericFailedAlert();
            alert.innerText = "Couldn`t find any recipes with this ingredients in the database";
            showGenericAlert(alert);
            setTimeout(()=>{hideGenericAlert()}, 2000);
        }
        document.getElementById("search-response").innerHTML = "";
        arr = [];
        createCardForRandomRecipeSpinWheel(response, "search-response");
    });
}

// This function creates a vertical div for searching ingredients
function createDivLikeNav(){
    var div = createCustomElements('div');
    var displayDiv = createCustomElements('div');
    displayDiv.setAttribute('id', 'displayRespDiv');
    div.setAttribute('id', 'div-like-nav-field');
    div.style.width = "330px";
    div.style.height = "400px";
    div.style.position = "absolute";
    div.style.left = "0px";
    var searchForm = generateSearchForm();
    div.appendChild(searchForm);
    div.appendChild(displayDiv);
    return div;
}

// This function generates a search form
function generateSearchForm(){
    var form = createCustomElements('form');
    form.style.backgroundColor = "#F8F8F8";
    form.classList.add('form-inline');
    form.classList.add('my-auto');
    form.style.width = "345px";
    form.setAttribute('id', 'search-by-ingredients-form');
    form.style.position = "relative";
    var inputField = createCustomElements('input');
    inputField.style.width = "345px";
    inputField.style.backgroundColor = "#F8F8F8";
    inputField.style.boxShadow = "0 0 5px black";
    inputField.style.position = "relative";
    inputField.style.color = "black";
    inputField.marginBottom = "5px";
    inputField.classList.add('form-control');
    inputField.setAttribute('id', 'search-by-ingredients-input');
    inputField.setAttribute('type', 'search');
    inputField.setAttribute('placeholder', 'Select the ingredients you have');
    inputField.setAttribute('aria-label', 'Search')
    $(inputField).on('keyup', autoCompleteIngredients);
    form.appendChild(inputField);
    return form;
}

var arrayOfIngredients = [];
// This function autocompletes the search for ingredients
function autoCompleteIngredients(){
    var searchInput = document.getElementById('search-by-ingredients-input').value;
    if(searchInput.length > 3){
        fetch("autoCompleteIngredients",{
            method:"POST",
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify({searchInput})
        }).then(res => {
            return res.json();
        }).then(function (response) {
            var obj = {};
            for(let i=0;i<response.length;i++){
                var nameOfRecipe = response[i].ingredientName;
                var picURL = response[i].picURL;
                if(arrayOfIngredients.includes(nameOfRecipe)){
                    continue;
                }else{
                    obj[nameOfRecipe] = picURL;
                }
            }
            checkDuplicates(obj);
        });
    }else if(searchInput.length < 3){
        document.getElementById('displayRespDiv').innerHTML = "";
    }
}

// This function checks the duplicates from the object
function checkDuplicates(obj){
    var finalKeys = [];
    var finalValues = [];
    var keys = Object.keys(obj);
    var values = Object.values(obj);
    for(let i=0;i<keys.length;i++){
        if(!finalKeys.includes(keys[i])){
            finalKeys.push(keys[i]);
        }
    }
    for(let j=0;j<values.length;j++){
        if(!finalValues.includes(values[j])){
            finalValues.push(values[j]);
        }
    }
    var result = {};
    keys.forEach((key, i) => result[key] = values[i]);
    populateNavWithIngredients(result);
}

// This function populates the nav with ingredients and their names based on the search
function populateNavWithIngredients(obj){
   var display = document.getElementById('div-like-nav-field');
   var divForAnswer = document.getElementById('displayRespDiv');
   divForAnswer.innerHTML = "";
    const entries = Object.entries(obj);
    for(const [nameOfRecipe, picURL] of entries){
        if(!arrayOfIngredients.includes(nameOfRecipe)){
            var row = createNewRow();
            row.style.backgroundColor = "#F8F8F8";
            row.style.boxShadow = "0 0 5px black";
            row.style.padding = "5px";
            var idForRow = randomUUIDForIdOfRows();
            row.setAttribute('id', idForRow);
            var textDiv = createCustomElements('div');
            textDiv.style.width = "250px";
            textDiv.style.left = "25px";
            textDiv.innerText = nameOfRecipe;
            textDiv.style.backgroundColor = "#F8F8F8";
            textDiv.style.position = "relative";
            var img = createCustomElements('img');
            img.style.width = "25px";
            img.style.height = "25px";
            img.style.position = "relative";
            img.style.left = "15px";
            img.src = picURL;
            var icon = createCustomElements('img');
            icon.src = "https://res.cloudinary.com/hmzve6z5z/image/upload/v1610816134/ICONS/add.svg";
            icon.style.width = "18px";
            icon.style.height = "18px";
            icon.style.top = "2px";
            icon.style.position = "relative";
            icon.style.left = "60px";
            $(icon).on('click', {nameOfRecipe:nameOfRecipe, picURL:picURL}, addToMyIngredients);
            row.appendChild(img);
            row.appendChild(textDiv);
            row.appendChild(icon);
            divForAnswer.appendChild(row);
            display.appendChild(divForAnswer);
            arrayOfIngredients.push(nameOfRecipe);
        }
    }
    arrayOfIngredients = [];
}

var arrayOfAddedIngredients = [];
// This function fires after the last choosing of ingredients
function addToMyIngredients(event){
    var picURL = event.data.picURL;
    var nameOfIngredient = event.data.nameOfRecipe;
    if(arrayOfAddedIngredients.includes(nameOfIngredient) || arrayOfAddedIngredients.length >= 15){
        var alertFailed = genericFailedAlert();
        alertFailed.innerText = "Duplicate ingredient or maximum nr. of ingredients(16!";
        alertFailed.setAttribute('id', 'failedAlert-double-ingredients');
        showAlertForDoubleAddIngredient(alertFailed);
        setTimeout(() =>{hideAlertShoppingList('failedAlert-double-ingredients')}, 2000);
    }else if(!(arrayOfAddedIngredients.includes(nameOfIngredient)) && arrayOfAddedIngredients.length < 15) {
        var displayDiv = document.getElementById('chosen-ingredients-div');// This is the div where the pic of ingredient is displayed
        var imgElDiv = createCustomElements('div');
        imgElDiv.style.position = "absolute";
        var imgElement = createCustomElements('img');
        var idOfImg = randomUUIDForIdOfRows();
        imgElement.setAttribute('id', idOfImg);
        imgElement.src = picURL;
        imgElement.style.width = "35px";
        imgElement.style.height = "35px";
        imgElement.style.marginTop = "80px";
        imgElement.style.right = "15px";
        imgElDiv.appendChild(imgElement);
        displayDiv.appendChild(imgElDiv);
        myMove(imgElDiv);
        var list = document.getElementById('list-of-added-ingredients');
        var textDiv = createCustomElements('div');
        textDiv.style.position = "relative";
        textDiv.style.left = "20px";
        var idOfDiv = randomUUIDForIdOfRows();
        textDiv.setAttribute('id',idOfDiv);
        textDiv.innerText = nameOfIngredient;
        var iconForRemove = createCustomElements('img');
        var idOfIcon = randomUUIDForIdOfRows();
        iconForRemove.setAttribute('id', idOfIcon);
        iconForRemove.src = "https://res.cloudinary.com/hmzve6z5z/image/upload/v1610828887/ICONS/x-button.svg";
        iconForRemove.style.width = "15px";
        iconForRemove.style.height = "15px";
        iconForRemove.style.marginTop = "5px";
        iconForRemove.style.marginLeft = "15px";
        iconForRemove.style.position = "absolute";
        iconForRemove.style.left = "238px";
        $(iconForRemove).on('click', {idOfDiv:idOfDiv, nameOfIngredient:nameOfIngredient, idOfIcon:idOfIcon, idOfImg:idOfImg}, deleteIngredient);
        var row = createNewRow();
        row.appendChild(textDiv);
        row.appendChild(iconForRemove);
        list.appendChild(row);
        arrayOfAddedIngredients.push(nameOfIngredient);
    }
}

// This function moves the images to the bowl
function myMove(el){
    var pos = 0;
    var id = setInterval(frame, 0.5);
    function frame() {
        if (pos == 280) {
            clearInterval(id);
            el.style.visibility = "hidden";
        } else {
            pos++;
            el.style.top = pos + "px";
            el.style.left = pos + "px";
        }
    }
}

// This function deletes the ingredients
function deleteIngredient(event){
    var idOfImg = event.data.idOfImg;
    var idOfIcon = event.data.idOfIcon;
    var idOfDiv = event.data.idOfDiv;
    var nameOfIngredient = event.data.nameOfIngredient;
    var text = document.getElementById(idOfDiv);
    text.innerHTML = "";
    var icon = document.getElementById(idOfIcon);
    icon.style.width = "0px";
    icon.style.height = "0px";
    icon.src = "";
    icon.alt = " ";
    $(idOfIcon).remove();
    var img = document.getElementById(idOfImg);
    img.style.width = "0px";
    img.style.height = "0px";
    img.src = "";
    img.alt = " ";
    $(idOfImg).remove();
    arrayOfAddedIngredients.splice(arrayOfAddedIngredients.indexOf(nameOfIngredient), 1);
}

// Alert for double adding an ingredient
function showAlertForDoubleAddIngredient(alert){
    var display = document.getElementById("wrapper-div-for-ingredients-images");
    display.appendChild(alert);
}

// Validate add Recipe form
function validateAddRecipeForm(myForm){
    var arr = [];
    for(var i=0; i < myForm.elements.length; i++){
        var e = myForm.elements[i];
        console.log(e.name  + " " + e.value);
        arr.push(e);
    }
    arr.pop();
    for(let j=0;j<arr.length;j++){
        if(arr[j].value == ""){
            return false;
        }
    }
    return true;
}

// This function fires when user clicks on submit btn from update account modal
function sendDataUpdate() {
    var form = document.getElementById("update-account-form");
    var activeUser = getCookie("username");
    if (validateUpdateForm(form)) {
        var spinner = createSpinnerDynamically();
        var idOfSpinner = randomUUIDForIdOfRows();
        spinner.setAttribute('id', idOfSpinner);
        displaySpinnerOnScreen(spinner);
        const myForm = new FormData(form);
        myForm.append("activeUser", activeUser);
        fetch("update", {
            method: "POST",
            body: myForm,
        }).then(res => {
            return res.json();
        }).then(function (response) {
            console.log(response);
            hideSpinnerUpdate(idOfSpinner);
            switch (response) {
                case "updated":
                    hideSpinnerUpdate(idOfSpinner);
                    var alertSuccess = createAlertUpdate();
                    alertSuccess.classList.remove('alert-danger');
                    alertSuccess.classList.add('alert-success');
                    var idOfAlertSuccess = randomUUIDForIdOfRows();
                    alertSuccess.setAttribute('id', idOfAlertSuccess);
                    alertSuccess.innerText = "Your account was successfully updated. You will be disconnected so that the changes will take place.";
                    alertSuccess.style.zIndex = "2200";
                    document.getElementById("container").appendChild(alertSuccess);
                    setTimeout(() => {
                        hideAlertUpdate(idOfAlertSuccess);
                    }, 2000);
                    $("#update-account-modal").modal('hide');
                    setTimeout(() => {
                        logout();
                    }, 2500);
                    break;
                case "email":
                    hideSpinnerUpdate(idOfSpinner);
                    var alertEm = createAlertUpdate();
                    alertEm.innerText = "The emails don`t match!";
                    alertEm.style.zIndex = "2200";
                    var idEmailUpdate = randomUUIDForIdOfRows();
                    alertEm.setAttribute('id', idEmailUpdate);
                    document.getElementById('container').appendChild(alertEm);
                    setTimeout(() => {
                        hideAlertUpdate(idEmailUpdate);
                    }, 2000);
                    break;
                case "password":
                    hideSpinnerUpdate(idOfSpinner);
                    var alertPs = createAlertUpdate();
                    alertPs.innerText = "The password don`t match!";
                    alertPs.style.zIndex = "2200";
                    var idPasswordUpdate = randomUUIDForIdOfRows();
                    alertPs.setAttribute('id', idPasswordUpdate);
                    document.getElementById('container').appendChild(alertPs);
                    setTimeout(() => {
                        hideAlert(idPasswordUpdate);
                    }, 2000);
                    break;
                case "false":
                    hideSpinnerUpdate(idOfSpinner);
                    var alertFalse = createAlertUpdate();
                    alertFalse.innerText = "Something went wrong!";
                    alertFalse.style.zIndex = "2200";
                    var idOfFailure = randomUUIDForIdOfRows();
                    alertFalse.setAttribute('id', idOfFailure);
                    document.getElementById('container').appendChild(alertFalse);
                    setTimeout(() => {
                        hideAlert(idOfFailure);
                    }, 2000);
                    break;
            }
        });
    } else {
        var alert = createAlertUpdate();
        alert.innerText = "Please complete all the fields!";
        alert.style.zIndex = "2100";
        var alertId = randomUUIDForIdOfRows();
        alert.setAttribute('id', alertId);
        document.getElementById('container-display').appendChild(alert);
        setTimeout(() => {
            hideAlert(alertId)
        }, 2000);
    }
}

// This function hdies the alert for update account
function hideAlertUpdate(idOfAlert){
    var alert = document.getElementById(idOfAlert);
    $(alert).alert('close');
    $(alert).alert('dispose');
}

// This function creates an alert
function createAlertUpdate(){
    var alert = document.createElement('div');
    alert.classList.add('alert');
    alert.classList.add('alert-danger');
    alert.style.width = "450px";
    alert.style.zIndex = "2200";
    alert.style.position = "absolute";
    alert.style.left = "35%";
    alert.style.top = "150px";
    alert.setAttribute('role', 'alert');
    return alert;
}

// This function displays a spinner on screen
function displaySpinnerOnScreen(spinner){
    document.getElementById('container').appendChild(spinner);
}

// This function creates a spinner
function createSpinnerDynamically(){
    var alignContent = document.createElement('div');
    alignContent.style.zIndex = "2200";
    //alignContent.setAttribute('id', 'spinner-div-sign-up');
    alignContent.style.position = "absolute";
    alignContent.style.left = "50%";
    alignContent.style.top = "200px";
    alignContent.classList.add('d-flex');
    alignContent.classList.add('justify-content-center');
    var spinner = document.createElement('div');
    spinner.classList.add('spinner-border');
    spinner.setAttribute("role", "status");
    var spanSpin = document.createElement('span');
    spinner.appendChild(spanSpin);
    alignContent.appendChild(spinner);
    return alignContent;
}

// This function hides the spinner
function hideSpinnerUpdate(idOfSpinner){
    var spinner = document.getElementById(idOfSpinner);
    spinner.style.visibility = "hidden";
}

// This function validates so the fields from my update account form are not empty
function validateUpdateForm(myForm){
    var arr = [];
    for(var i=0; i < myForm.elements.length; i++){
        var e = myForm.elements[i];
        //console.log(e.name  + " " + e.value);
        arr.push(e);
    }
    arr.pop();
    for(let j=0;j<arr.length;j++){
        if(arr[j].value == ""){
            return false;
        }
    }
    return true;
}

// The functions below handle the Help menu button
function showHelp(){
    var modal = document.getElementById('modal-help');
    var modalBody = document.getElementById('modal-body-help');
    var p = createCustomElements('p');
    p.style.fontFamily = "Helvetica";
    p.style.fontSize = "small";
    p.style.padding = "10px";
    p.innerText = "Welcome, user ! This app is an easy to use recipes guide, specially designed " +
        "for food enthusiasts. If you are looking for creative and yet nutritive recipes, this is the " +
        "right place for you. If you want access to all functionalities, please register an account.";
    var pTwo = createCustomElements('p');
    pTwo.innerText = "Feel free to enjoy our cool functionalities: ";
    pTwo.style.fontFamily = "Helvetica";
    pTwo.style.fontSize = "small";
    pTwo.style.marginLeft = "10px";
    var el = createElementForHelpModal("https://res.cloudinary.com/hmzve6z5z/image/upload/v1610223336/ICONS/wheel-removebg-preview.png", "Spin the wheel for random recipes when you are out of ideas");
    var elTwo = createElementForHelpModal("https://res.cloudinary.com/hmzve6z5z/image/upload/v1609238472/ICONS/ADD_RECIPE_ICON.png", "Add recipes, so other users can enjoy your delicious ideas");
    var elThree = createElementForHelpModal("https://res.cloudinary.com/hmzve6z5z/image/upload/v1610732836/ICONS/search.png", "Apply filters to your searches, so you can experience the desired recipes");
    var elFour = createElementForHelpModal("https://res.cloudinary.com/hmzve6z5z/image/upload/v1610733505/ICONS/search_ingredients.png", "Search recipes by ingredients you have in your fridge");
    var elFive = createElementForHelpModal("https://res.cloudinary.com/hmzve6z5z/image/upload/v1611146306/ICONS/checklist.svg","Generate shopping lists based on your favourite recipes and download them");
    var elSix = createElementForHelpModal("https://res.cloudinary.com/hmzve6z5z/image/upload/v1611678844/ICONS/favourites_new_icon.svg", "Keep your favourite recipes in one place");
    var elSeven = createElementForHelpModal("https://res.cloudinary.com/hmzve6z5z/image/upload/v1610440519/ICONS/calories.png", "Every recipe you choose has nutritional information, so you can choose the healthy ones");
    var elEight = createElementForHelpModal("https://res.cloudinary.com/hmzve6z5z/image/upload/v1611926684/ICONS/light-bulb.svg", "Enjoy our fun and useful curiosities posted on the page every time you are online");
    modalBody.appendChild(p);
    modalBody.appendChild(pTwo);
    modalBody.appendChild(el);
    modalBody.appendChild(elTwo);
    modalBody.appendChild(elThree);
    modalBody.appendChild(elFour);
    modalBody.appendChild(elFive);
    modalBody.appendChild(elSix);
    modalBody.appendChild(elSeven);
    modalBody.appendChild(elEight);
    showModalHelp();
}

function showModalHelp() {
    $('#modal-help').modal('show');
}

function createElementForHelpModal(picUrl, text){
    var element = createCustomElements('div');
    element.style.width = "320px";
    element.style.height = "40px";
    var textDiv = createCustomElements('div');
    textDiv.innerText = text;
    textDiv.style.position = "absolute";
    textDiv.style.left = "70px";
    textDiv.style.fontFamily = "Helvetica";
    textDiv.style.fontSize = "small";
    textDiv.style.marginTop = "2px";
    var img = createCustomElements('img');
    img.style.width = "25px";
    img.style.height = "25px";
    img.style.position = "absolute";
    img.style.left = "25px";
    img.src = picUrl;
    element.appendChild(img);
    element.appendChild(textDiv);
    return element;
}