window.onload = init;


function init() {
    animateWheelHome();
    populateCarouselWithPhotos('carousel-one');
    populateCarouselWithPhotos('carousel-two');
    populateCarouselWithPhotos('carousel-three');
    populateCarouselWithPhotos('carousel-four');
    populateCarouselWithPhotos('carousel-five');
    populateCarouselWithPhotos('carousel-six');
    populateCarouselWithPhotos('carousel-seven');
    if(getCookieIndex("tutorial") !== "true"){
        showTutorial();
    }

}

function showTutorial(){
    setCookieIndex("tutorial", "true");
    var modal = document.getElementById('modal-tutorial');
    var modalBody = document.getElementById('modal-body-tutorial');
    var p = createCustomElementsHome('p');
    p.style.fontFamily = "Helvetica";
    p.style.fontSize = "small";
    p.style.padding = "10px";
    p.innerText = "Welcome, user ! This app is an easy to use recipes guide especially " +
        "created for food enthusiasts. If you are looking for creative and yet nutritive recipes, this is the " +
        "right place for you. If you want to benefit of the full potential of this amazing app, please register an account.";
    var pTwo = createCustomElementsHome('p');
    pTwo.innerText = "Feel free to enjoy our cool functionalities: ";
    pTwo.style.fontFamily = "Helvetica";
    pTwo.style.fontSize = "small";
    pTwo.style.marginLeft = "10px";
    var el = createElementForTutorialModal("https://res.cloudinary.com/hmzve6z5z/image/upload/v1610223336/ICONS/wheel-removebg-preview.png", "Spin the wheel for random recipes when you are out of ideas");
    var elTwo = createElementForTutorialModal("https://res.cloudinary.com/hmzve6z5z/image/upload/v1609238472/ICONS/ADD_RECIPE_ICON.png", "Add recipes, so other users can enjoy your delicious ideas");
    var elThree = createElementForTutorialModal("https://res.cloudinary.com/hmzve6z5z/image/upload/v1610732836/ICONS/search.png", "Apply filters to your searches, so you can experience the desired recipes");
    var elFour = createElementForTutorialModal("https://res.cloudinary.com/hmzve6z5z/image/upload/v1610733505/ICONS/search_ingredients.png", "Search recipes by ingredients you have in your fridge");
    var elFive = createElementForTutorialModal("https://res.cloudinary.com/hmzve6z5z/image/upload/v1611146306/ICONS/checklist.svg","Generate shopping lists based on your favourite recipes and download them");
    var elSix = createElementForTutorialModal("https://res.cloudinary.com/hmzve6z5z/image/upload/v1611678844/ICONS/favourites_new_icon.svg", "Keep your favourite recipes in one place");
    var elSeven = createElementForTutorialModal("https://res.cloudinary.com/hmzve6z5z/image/upload/v1610440519/ICONS/calories.png", "Every recipe you choose has nutritional information, so you can choose the healthy ones");
    var elEight = createElementForTutorialModal("https://res.cloudinary.com/hmzve6z5z/image/upload/v1611926684/ICONS/light-bulb.svg", "Enjoy our fun and useful curiosities posted on the page every time you are online");
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
    showModalTutorial();
}

function createElementForTutorialModal(picUrl, text){
    var element = createCustomElementsHome('div');
    element.style.width = "320px";
    element.style.height = "40px";
    var textDiv = createCustomElementsHome('div');
    textDiv.innerText = text;
    textDiv.style.position = "absolute";
    textDiv.style.left = "70px";
    textDiv.style.fontFamily = "Helvetica";
    textDiv.style.fontSize = "small";
    textDiv.style.marginTop = "2px";
    var img = createCustomElementsHome('img');
    img.style.width = "25px";
    img.style.height = "25px";
    img.style.position = "absolute";
    img.style.left = "25px";
    img.src = picUrl;
    element.appendChild(img);
    element.appendChild(textDiv);
    return element;
}

function showModalTutorial(){
    $('#modal-tutorial').modal('show');
}

function hideModalTutorial(){
    $('#modal-tutorial').modal('hide');
}

// This function is responsible for fetching the data from backend for the carousel
function populateCarouselWithPhotos(carId){
    fetch("carousel",{
        method:"POST",
        headers:{"Content-Type":"application/json"}
    }).then(res => {
        return res.json();
    }).then(function (response) {
        createCarousel(response, carId);
    });
}


// This function creates the carousel based on the data provided from backend
function createCarousel(response, carId) {
    // Accessing the carousel
    var carousel = document.getElementById(carId);
    // Creation of inner div for carousel
    var carouselInner = createCustomElementsHome('div');
    carouselInner.classList.add('carousel-inner');
    carouselInner.style.backgroundColor = "#F8F8F8";
    carouselInner.style.textAlign = "center";
    // Creation of active element of carousel
    var carouselActiveItem = createCustomElementsHome('div');
    carouselActiveItem.classList.add('carousel-item');
    carouselActiveItem.classList.add('active');
    carouselActiveItem.style.marginTop = "20px";
    carouselActiveItem.style.height = "100px";
    var obj = response[0];
    var altImg = obj.advice;
    var activeItem = createCustomElementsHome('div');
    activeItem.style.textAlign = "center";
    activeItem.style.width = "175px";
    activeItem.style.padding = "20px;"
    activeItem.style.height = "120px";
    activeItem.style.backgroundColor = "#F8F8F8";
    activeItem.style.fontFamily = "Helvetica";
    activeItem.style.marginRight = "5px";
    activeItem.style.color = "black";
    activeItem.innerText = altImg;
    activeItem.style.fontSize = "small";
    carouselActiveItem.appendChild(activeItem);
    carouselInner.appendChild(carouselActiveItem);
    for(let i=1;i<response.length;i++){
        var object = response[i];
        var altItem = object.advice;
        var carouselItem = createCustomElementsHome('div');
        carouselItem.classList.add('carousel-item');
        var carItem = createCustomElementsHome('div');
        carItem.style.width = "175px";
        carItem.style.textAlign = "center";
        carItem.style.marginRight = "5px";
        carItem.style.height = "120px";
        carItem.style.fontFamily = "Helvetica";
        carItem.style.fontSize = "small";
        carItem.style.color = "black";
        carItem.style.padding = "20px";
        carItem.style.backgroundColor = "#F8F8F8";
        carItem.innerText = altItem;
        carouselItem.appendChild(carItem);
        carouselInner.appendChild(carouselItem);
    }
    carousel.appendChild(carouselInner);
}


function animateWheelHome(){
    const wheel = document.getElementById('wrapper-spin-home');
    let deg = 0;
    deg = Math.floor(5000 + Math.random() * 5000);
    wheel.style.transition = 'all 900s ease-out';
    wheel.style.transform = 'rotate(' + deg + 'deg)';
    wheel.classList.add('blur');
}

function hoverWheelHome(){
    var wheel = document.getElementById("random-spin-home");
    wheel.style.width = "40px";
    wheel.style.height = "40px";
}

function hoverWheelLeaveHome(){
    var wheel = document.getElementById("random-spin-home");
    wheel.style.width = "35px";
    wheel.style.height = "35px";
}


// Set Cookie
function setCookieIndex(cname,cvalue) {
    // document.cookie = cname + "=" + cvalue + "; SameSite=None; Secure";
    document.cookie = cname + "=" + cvalue + "; SameSite=Lax";
}



// GetCookie
function getCookieIndex(cname) {
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


// Alert for failed login
function displayFailedAlertLogin(){
    var alert = createAlert();
    alert.innerText = "Invalid login credentials!";
    alert.setAttribute('id', 'alert-failed-login');
    alert.style.zIndex = "2100";
    document.getElementById('container-display').appendChild(alert);
    setTimeout(() => {
        hideAlert('alert-failed-login');
    }, 2000);
}


// Login form functions
function hideAlert(idOfAlert){
    var alert = document.getElementById(idOfAlert);
    $(alert).alert('close');
    $(alert).alert('dispose');
}

function createAlert(){
    var alert = document.createElement('div');
    alert.classList.add('alert');
    alert.classList.add('alert-danger');
    alert.style.width = "450px";
    alert.style.zIndex = "2200";
    alert.style.position = "absolute";
    alert.style.left = "32%";
    alert.style.marginTop = "130px";
    alert.setAttribute('role', 'alert');
    return alert;
}

function sendDataLogin() {
    var email = document.getElementById("emailgs").value;
    var password = document.getElementById("passwordgs").value;
    fetch("login", {
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify({email:email, password:password})
    }).then(res => {
        return res.json();
    }).then(function (response) {
        if(response === "valid"){
            window.location.href = "https://foodwheelapp.herokuapp.com/profile";
        }else if(response === "invalid"){
            displayFailedAlertLogin();
        };
    })
}

// This function displays the modal for login
function showLogin() {
    clearCookies();
    $('#exampleModalCenterSignup').modal('hide');
    $('#loginModal').modal('show');
}

// Redirect modal on close
function redirectPageModalLogin(){
    window.location.href = "https://foodwheelapp.herokuapp.com/";
}

// This function clears cookies
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

// Register form functions
// Validation for fields
function validateSignupForm(myForm){
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

// Sending data from formData to Servlet
function sendDataSignUp() {
    var form = document.getElementById("mySignUpForm");
    if (validateSignupForm(form)) {
        var spinner = createSpinner();
        var idOfSpinner = randomUUIDForIdOfRowsHome();
        spinner.setAttribute('id', idOfSpinner);
        displaySpinner(spinner);
        const myForm = new FormData(form);
        fetch("signup", {
            method: "post",
            body: myForm,
        }).then(res => {
            return res.json();
        }).then(function (response) {
            console.log(response);
            hideSpinner(idOfSpinner);
            switch (response) {
                case "authenticated":
                    hideSpinner(idOfSpinner);
                    hideModalSignUpClearFieldsAndOpenLoginModal();
                    var alertSuccess = createAlert();
                    alertSuccess.classList.remove('alert-danger');
                    alertSuccess.classList.add('alert-success');
                    alertSuccess.setAttribute('id', 'success-alert-for-created-account')
                    alertSuccess.innerText = "Your account was successfully created";
                    alertSuccess.style.zIndex = "2200";
                    document.getElementById("container-display").appendChild(alertSuccess);
                    setTimeout(() => {
                        hideAlert('success-alert-for-created-account');
                    }, 2000);
                    break;
                case "duplicate":
                    hideSpinner(idOfSpinner);
                    var alert = createAlert();
                    alert.innerText = "You already have an account!";
                    alert.style.zIndex = "2200";
                    alert.setAttribute('id', 'alert-duplicate-user');
                    document.getElementById('container-display').appendChild(alert);
                    setTimeout(() => {
                        hideAlert('alert-duplicate-user')
                    }, 2000);
                    break;
                case "email":
                    hideSpinner(idOfSpinner);
                    var alertEm = createAlert();
                    alertEm.innerText = "The emails don`t match!";
                    alertEm.style.zIndex = "2200";
                    alertEm.setAttribute('id', 'alert-email-dont-match');
                    document.getElementById('container-display').appendChild(alertEm);
                    setTimeout(() => {
                        hideAlert('alert-email-dont-match')
                    }, 2000);
                    break;
                case "password":
                    hideSpinner(idOfSpinner);
                    var alertPs = createAlert();
                    alertPs.innerText = "The password don`t match!";
                    alertPs.style.zIndex = "2200";
                    alertPs.setAttribute('id', 'alert-psw-dont-match');
                    document.getElementById('container-display').appendChild(alertPs);
                    setTimeout(() => {
                        hideAlert('alert-psw-dont-match')
                    }, 2000);
                    break;
                case "false":
                    hideSpinner(idOfSpinner);
                    var alertFalse = createAlert();
                    alertFalse.innerText = "Something went wrong!";
                    alertFalse.style.zIndex = "2200";
                    alertFalse.setAttribute('id', 'alert-false');
                    document.getElementById('container-display').appendChild(alertFalse);
                    setTimeout(() => {
                        hideAlert('alert-false')
                    }, 2000);
                    break;
            }
        });
    }else{
        var alert = createAlert();
        alert.innerText = "Please complete all the fields!";
        alert.style.zIndex = "2100";
        alert.setAttribute('id', 'alert-incomplete-fields');
        document.getElementById('container-display').appendChild(alert);
        setTimeout(() => {
            hideAlert('alert-incomplete-fields')
        }, 2000);
    }
}


// This function creates a spinner and returns it
function createSpinner(){
    var alignContent = document.createElement('div');
    alignContent.style.zIndex = "2200";
    alignContent.style.position = "absolute";
    alignContent.style.left = "50%";
    alignContent.style.top = "300px";
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

function displaySpinner(spinner){
    document.getElementById('container-display').appendChild(spinner);
}

// This function hides spinner
function hideSpinner(spinnerId){
    var spinner = document.getElementById(spinnerId);
    spinner.style.visibility = "hidden";
}

//Show modal Register
function showModalSignUp(){
    $('#loginModal').modal('hide');
    $('#exampleModalCenterSignup').modal('show');
}

//Hide modal Register, clear the fields and open the login modal
function hideModalSignUpClearFieldsAndOpenLoginModal() {
    $('#exampleModalCenterSignup').modal('hide');
    clearElementsOfModalFormAfterHide();
    showLogin();
}

//Clear modal Register after close
function clearElementsOfModalFormAfterHide() {
    $('#exampleModalCenterSignup').on('hidden.bs.modal', function (e) {
        $(this)
            .find("input,textarea,select,date,file,email,password")
            .val('')
            .end()
            .find("input[type=checkbox], input[type=radio]")
            .prop("checked", "")
            .end();
    });
}

//Clear modal login after close
function clearElementsLogin() {
    $('#loginModal').on('hidden.bs.modal', function (e) {
        $(this)
            .find("input,textarea,select,date,file,email,password")
            .val('')
            .end()
            .find("input[type=checkbox], input[type=radio]")
            .prop("checked", "")
            .end();
    });
}

function createNewColHome() {
    var col = document.createElement('div');
    col.classList.add('col');
    return col;
}

function randomFunctionHome(){
    fetch("randomHome", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        }
    }).then(res => {
        return res.json();
    }).then(function (response) {
        wheelSpinEnvironmentHome(response);
    });
}

function randomUUIDForIdOfRowsHome(){
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}

// This function fires when users press the clear screen icon
function clearScreenHome(){
    document.getElementById("search-response-home").innerHTML = "";
    document.getElementById("container-for-carousel").style.visibility = "visible";
    document.getElementById("container-for-carousel").style.position = "absolute";
}

// These two functions hover the clear screen icon
function hoverClearIconHome(){
    var el = document.getElementById("clear-screen-icon-home");
    el.style.width = "45px";
    el.style.height = "45px";
}

function unHoverIconClearHome(){
    var el = document.getElementById("clear-screen-icon-home");
    el.style.width = "40px";
    el.style.height = "40px";
}

// This function fires and sets things up for the wheel spin elements
function wheelSpinEnvironmentHome(response){
    var display = document.getElementById("search-response-home");
    display.classList.remove('justify-content-center');
    document.getElementById("container-for-carousel").style.visibility = "hidden";
    display.innerHTML = "";
    display.style.marginTop = "70px";
    var wrapperDiv = createCustomElementsHome('div');
    wrapperDiv.style.width = "400px";
    wrapperDiv.style.height = "400px";
    wrapperDiv.style.position = "relative";
    wrapperDiv.style.left = "650px";
    var foodWheel = createCustomElementsHome('img');
    foodWheel.src = "https://res.cloudinary.com/hmzve6z5z/image/upload/v1610223336/ICONS/wheel-removebg-preview.png";
    foodWheel.style.width = "100%";
    foodWheel.style.height = "100%";
    var idOfWheel = randomUUIDForIdOfRowsHome();
    foodWheel.setAttribute('id', idOfWheel);

    var pointer = createCustomElementsHome('img');
    pointer.src = "https://res.cloudinary.com/hmzve6z5z/image/upload/v1611656663/ICONS/restaurant.svg";
    pointer.style.width = "45px";
    pointer.style.height = "45px";
    pointer.style.position = "absolute";
    pointer.style.left = "177px";
    pointer.style.top = "10px";
    pointer.style.zIndex = "2";
    var idOfPointer = randomUUIDForIdOfRowsHome();
    pointer.setAttribute('id', idOfPointer);

    var button = createCustomElementsHome('button');
    button.classList.add('btn');
    button.classList.add('btn-outline-info');
    button.style.boxShadow = "0 0 5px black";
    button.style.width = "110x";
    button.style.height = "30px";
    button.style.marginLeft = "160px";
    button.style.fontSize = "x-small";
    button.innerText = "Spin the wheel";
    var idOfButton = randomUUIDForIdOfRowsHome();
    button.setAttribute('id', idOfButton);
    $(button).on('click', {response:response,idOfButton:idOfButton, idOfWheel:idOfWheel, idOfPointer:idOfPointer}, wheelSpinHome);
    wrapperDiv.appendChild(pointer);
    wrapperDiv.appendChild(foodWheel);
    wrapperDiv.appendChild(button);
    display.appendChild(wrapperDiv);
}

function wheelSpinHome(event){
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
        createCardForRandomRecipeSpinWheelHome(response, "search-response-home");
    }, 7050);
}

// This function creates the card generated by the wheel spin
function createCardForRandomRecipeSpinWheelHome(response, id){
    document.getElementById("search-response-home").innerHTML = "";
    document.getElementById("container-for-carousel").style.visibility = "visible";
    for(var i = 0; i < response.length; i++) {
        var obj = response[i];
        var nameOfRecipe = obj.nameOfRecipe;
        var timeToCook = obj.timeToCook;
        var servings = obj.servings;
        var urlPicture = obj.cloudUrlPicture;
        var flag = obj.flag;
        // Dynamic creation of card element
        // 1. We are setting the div styles
        var searchResp = document.getElementById("search-response-home");
        searchResp.className = "d-flex justify-content-center";
        searchResp.style.display = "flex";
        searchResp.style.flexWrap = "wrap";
        searchResp.style.marginTop = "70px";
        searchResp.style.marginBottom = "70px";
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
        servingsNumber.style.fontFamily = "Helvetica";
        servingsNumber.style.fontSize = "small";
        servingsNumber.innerText = "Servings: " + servings;
        // 9. Create the div element for time to cook
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
        $(detailsBtn).on('click', {name:nameOfRecipe}, moreDetailsModalHome);
        // 12.Appending child elements to parent elements and creating the final card
        cardBody.appendChild(recipeName);
        cardBody.appendChild(servingsNumber);
        cardBody.appendChild(timeToCookEl);
        cardBody.appendChild(detailsBtn);
        card.appendChild(foodImg);
        card.appendChild(flagImg);
        card.appendChild(cardBody);
        cardDeckElement.appendChild(card);
        // 12.Appending cards to the row in maxim of 5 for optimal view
        document.getElementById(id).appendChild(cardDeckElement);
        document.getElementById("container-for-carousel").style.position = "relative";//display purposes
    }
}

// This function enlarges the input field of the search form
function largeSearchHome(){
    document.getElementById("searchInputHome").style.width = "350px";
}

// This function reduces the size of the input field belonging to the search form
function smallSearchHome(){
    document.getElementById("searchInputHome").style.width = "250px";
}

// This function fires when the user clicks on search button
function searchFunctionHome(){
    const display = document.getElementById("search-response-home");
    display.innerHTML = "";
    const searchInput = document.getElementById("searchInputHome").value;
    if (searchInput != null || searchInput !== "") {
        fetch("searchRecipeHome", {
            method: "POST",
            body: JSON.stringify({searchInput}),
            headers: {
                "Content-Type": "application/json"
            }
        }).then(res => {
            return res.json();
        }).then(function (response) {
            document.getElementById("search-response-home").innerHTML = "";
            arr = [];
            createCardHome(response, "search-response-home");
        });
    } else {
        display.innerText = "Something went wrong!";
    }
}

// This function creates the cards dynamically
var arr = [];
function createCardHome(response, id) {
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
            // 1. Sets the response div styles
            var searchResp = document.getElementById("search-response-home");
            searchResp.className = "d-flex justify-content-center";
            searchResp.style.display = "flex";
            searchResp.style.flexWrap = "wrap";
            searchResp.style.marginTop = "70px";
            searchResp.style.marginBottom = "70px";
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
            // 7. Create h6 title of recipe element
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
            servingsNumber.style.fontFamily = "Helvetica";
            servingsNumber.style.fontSize = "small";
            servingsNumber.innerText = "Servings: " + servings;
            // 9. Create the div element title for time to cook
            var timeToCookEl = document.createElement('div');
            timeToCookEl.classList.add('card-title');
            timeToCookEl.style.fontFamily = "Helvetica";
            timeToCookEl.style.fontSize = "small";
            timeToCookEl.id = "timeToCookCard";
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
            $(detailsBtn).on('click', {name:nameOfRecipe}, moreDetailsModalHome);
            // 12.Appending child elements to parent elements and creating the final card
            cardBody.appendChild(recipeName);
            cardBody.appendChild(servingsNumber);
            cardBody.appendChild(timeToCookEl);
            cardBody.appendChild(detailsBtn);
            card.appendChild(foodImg);
            card.appendChild(flagImg);
            card.appendChild(cardBody);
            cardDeckElement.appendChild(card);
            // 12.Appending cards to the row in maxim of 5 for optimal view
            document.getElementById(id).appendChild(cardDeckElement);
            document.getElementById("container-for-carousel").style.visibility = "visible";
            document.getElementById("container-for-carousel").style.position = "relative";// display purposes
        }
    };
}

// This function fires when the user clicks on more details modal from the recipes card
function moreDetailsModalHome(event) {
    showDetailedRecipeHome();
    var nameOfRecipe = event.data.name;
    fetch("detailsHome", {
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify({nameOfRecipe})
    }).then(res => {
        return res.json();
    }).then(function (response) {
        document.getElementById("modal-content-details-recipe-home").innerHTML = "";
        document.getElementById("detailsTitleHome").innerText = "";
        populateModalDetailsHome(response, "modal-content-details-recipe-home");
    });
}

// This function constructs the more details modal
function populateModalDetailsHome(response, id) {
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
    // Display - parent element in modal
    var displayInModal = document.getElementById(id);
    // Modal title with name of recipe
    var modalTitle = document.getElementById("detailsTitleHome");
    modalTitle.innerText = nameOfRecipe;
    modalTitle.style.fontFamily = "Helvetica";
    // Create image Element
    var foodImg = createCustomElementsHome('img');
    foodImg.style.position = "absolute";
    foodImg.style.left = "0px";
    foodImg.style.width = "200px";
    foodImg.style.height = "180px";
    foodImg.style.borderRadius = "5%";
    foodImg.src = img;
    // Create flag element
    var flagDetails = createCustomElementsHome('img');
    flagDetails.style.position = "absolute";
    flagDetails.style.width = "30px";
    flagDetails.style.height = "30px";
    flagDetails.style.borderRadius = "50%";
    flagDetails.style.top = "2px";
    flagDetails.style.left = "0px";
    flagDetails.src = flag;
    // Create type of food
    var typeFood = createCustomElementsHome('div');
    typeFood.innerText = "Type: " + typeOfFood;
    typeFood.style.fontFamily = "Helvetica";
    typeFood.style.width = "350x";
    typeFood.style.height = "25px";
    typeFood.style.fontSize = "medium";
    // Create time to cook
    var time = createCustomElementsHome('div');
    time.innerText = "Time to cook: " + timeToCook;
    time.style.fontFamily = "Helvetica";
    time.style.width = "350x";
    time.style.height = "25px";
    time.style.fontSize = "medium";
    // Create servings
    var servingNr = createCustomElementsHome('div');
    servingNr.innerText = "Servings: " + servings;
    servingNr.style.fontFamily = "Helvetica";
    servingNr.style.width = "350x";
    servingNr.style.height = "25px";
    servingNr.style.fontSize = "medium";
    // Create country of origin
    var country = createCustomElementsHome('div');
    country.innerText = "Country of origin: " + countryOfOrigin;
    country.style.fontFamily = "Helvetica";
    country.style.width = "350x";
    country.style.height = "25px";
    country.style.fontSize = "medium";
    // Create title of ingredients and ingredients
    var titleIng = createCustomElementsHome('p');
    titleIng.style.fontFamily = "Helvetica";
    titleIng.style.fontSize = "medium";
    titleIng.style.fontWeight = "bold";
    titleIng.style.marginLeft = "10px";
    titleIng.style.marginBottom = "2px";
    titleIng.innerText = "Ingredients:";
    var ingredientsText = createCustomElementsHome('p');
    ingredientsText.style.margin = "3px";
    ingredientsText.style.textAlign = "left";
    ingredientsText.style.padding = "10px";
    ingredientsText.style.fontSize = "small";
    ingredientsText.style.fontFamily = "Helvetica";
    ingredientsText.innerText = ingredients;
    // Create title of instructions and instructions
    var titleInst = createCustomElementsHome('p');
    titleInst.style.fontFamily = "Helvetica";
    titleInst.style.fontSize = "medium";
    titleInst.style.fontWeight = "bold";
    titleInst.style.marginLeft = "10px";
    titleInst.style.marginBottom = "2px";
    titleInst.innerText = "Instructions:";
    var instructionsText = createCustomElementsHome('p');
    instructionsText.style.margin = "3px";
    instructionsText.style.textAlign = "left";
    instructionsText.style.padding = "10px";
    instructionsText.style.fontSize = "small";
    instructionsText.style.fontFamily = "Helvetica";
    instructionsText.innerText = instructions;
    // Create title of nutrients and nutrients
    var titleNut = createCustomElementsHome('h6');
    titleNut.innerText = "Nutrients:";
    titleNut.style.fontFamily = "Helvetica";
    // Creating another div to append images on it so i can overlap the flag image and the favourites icon on the food image inside the modal
    var divEl = createCustomElementsHome('div');
    divEl.style.flexWrap = "wrap";
    divEl.style.position = "relative";
    // Appending the elements using row and columns in displaying purposes
    // Appending images
    divEl.appendChild(foodImg);
    divEl.appendChild(flagDetails);
    // First row with 2 columns
    var rowOne = createNewRowHome();
    var colOne = createNewColHome();
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
    var secondRow = createNewRowHome();
    secondRow.style.marginTop = "100px";
    secondRow.appendChild(titleIng);
    // Third row
    var thirdRow = createNewRowHome();
    thirdRow.appendChild(ingredientsText);
    // Fourth row
    var fourthRow = createNewRowHome();
    fourthRow.appendChild(titleInst);
    // Fifth row
    var fifthRow = createNewRowHome();
    fifthRow.appendChild(instructionsText);
    // Sixth row for nutrients
    var sixthRow = createNewRowHome();
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

    var cardDeck = createCardDeckHome();
    var caloriesEl = createCardDynamicallyHome("https://res.cloudinary.com/hmzve6z5z/image/upload/v1610440519/ICONS/calories.png", "Calories", Math.round(totalCalories));
    var cholesterolEl = createCardDynamicallyHome("https://res.cloudinary.com/hmzve6z5z/image/upload/v1610443019/ICONS/cholesterol.png", "Cholesterol", Math.round(totalCholesterol));
    var potassiumEl = createCardDynamicallyHome("https://res.cloudinary.com/hmzve6z5z/image/upload/v1610446147/ICONS/potassium.png", "Potassium", Math.round(totalPotassium));
    var saturatedFatEl = createCardDynamicallyHome("https://res.cloudinary.com/hmzve6z5z/image/upload/v1610446004/ICONS/IMG-2804.png", "Sat. fat", Math.round(totalSaturatedFat));
    var sodiumEl = createCardDynamicallyHome("https://res.cloudinary.com/hmzve6z5z/image/upload/v1610446084/ICONS/sodium.png", "Sodium", Math.round(totalSodium));
    var sugarsEl = createCardDynamicallyHome("https://res.cloudinary.com/hmzve6z5z/image/upload/v1610444037/ICONS/sugar.png", "Sugars", Math.round(totalSugars));
    var carbsEl = createCardDynamicallyHome("https://res.cloudinary.com/hmzve6z5z/image/upload/v1610444172/ICONS/bakery.png", "Carbs", Math.round(totalCarbs));
    var proteinsEl = createCardDynamicallyHome("https://res.cloudinary.com/hmzve6z5z/image/upload/v1610448184/ICONS/protein.png", "Protein", Math.round(totalProteins));
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

// This function shows a modal when the details of a recipe is clicked from the card element
function showDetailedRecipeHome() {
    $('#modalDetailsRecipeHome').modal('show');
}

// This function creates a card deck dynamically
function createCardDeckHome(){
    var cardDeck = createCustomElementsHome('div');
    cardDeck.classList.add('card-deck');
    cardDeck.style.marginRight = "20px";
    cardDeck.style.marginLeft = "20px";
    return cardDeck;
}

// This function creates the cards for nutritional content
function createCardDynamicallyHome(imgSrc, title, numberOfCalories){
    var card = createCustomElementsHome('div');
    card.style.width = "100px";
    card.style.height = "80px";
    card.style.marginBottom = "5px";
    card.style.backgroundColor = "#F8F8F8";
    card.style.border = "0px";
    card.classList.add('card');
    var imgTopCard = createCustomElementsHome('img');
    imgTopCard.style.height = "30px";
    imgTopCard.style.width = "40px";
    imgTopCard.style.marginLeft = "20%";
    imgTopCard.style.borderRadius = "5%";
    imgTopCard.setAttribute('id', 'card-img');
    imgTopCard.src = imgSrc;
    var cardBody = createCustomElementsHome('div');
    cardBody.style.fontSize = "xx-small";
    cardBody.style.textAlign = "center";
    cardBody.style.padding = "5px";
    cardBody.style.color = "black";
    cardBody.classList.add('card-body');
    var cardTitle = createCustomElementsHome('div');
    cardTitle.innerText = title;
    var cardText = createCustomElementsHome('div');
    cardText.innerText = numberOfCalories;
    // Appending elements
    cardBody.appendChild(cardText);
    cardBody.appendChild(cardTitle);
    card.appendChild(imgTopCard);
    card.appendChild(cardBody);
    return card;
}

// This function creates custom elements
function createCustomElementsHome(type){
    var el = document.createElement(type);
    return el;
}

// This function is responsible with the autocomplete search
function autoCompleteSearchHome() {
    var searchInput = document.getElementById("searchInputHome").value;
    if(searchInput.length > 3){
        fetch("autocompleteHome", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({searchInput})
        }).then(res => {
            return res.json();
        }).then(function (response) {
            createCardHome(response, "search-response-home");
        });
    }else {
        document.getElementById("search-response-home").innerHTML = "";
        document.getElementById("container-for-carousel").style.visibility = "visible";
        document.getElementById("container-for-carousel").style.position = "absolute";
        arr = [];
    }
}

// This function creates a new row
function createNewRowHome() {
    var newRow = document.createElement('div');
    newRow.classList.add('row');
    return newRow;
}