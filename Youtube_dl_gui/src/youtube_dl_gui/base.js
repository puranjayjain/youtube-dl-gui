window.onload = function () {
    menu_button_fix();
    load_menu_items();
};

//menu button fix
function menu_button_fix() {
    document.querySelector('.mdl-layout__drawer-button').innerHTML = "<img class=\"menu-button--fix\" src=\"menu.png\" alt\"\"/>";
}

//load menu items
function load_menu_items() {
    var menu_items = [
        "Downloading Items",
        "History",
        "Settings",
        "hr",
        "Help",
        "About Us",
        "Exit"
    ];
    //populate sub menu
    var template = "";
    for (var i in menu_items) {
        //add horizontal rule as seperator
        if (menu_items[i] == "hr") {
            template += "<hr />";
        }
        else {
            template += "<a class=\"mdl-navigation__link nav-button__" + menu_items[i].replace(" ", "").toLowerCase() + "\" href=\"#\">" + menu_items[i] + "</a>";
        }
    }
    document.querySelector(".mdl-navigation").innerHTML = template;
    addEventsMenu();
}

//add events to menu buttons 
function addEventsMenu() {
    document.querySelector('.nav-button__exit').addEventListener('click', function () {
        app.exit();
        return false;
    });
}
//progress bar update
document.querySelector('#p1').addEventListener('mdl-componentupgraded', function () {
    var value = 69;
    this.MaterialProgress.setProgress(value);
    this.querySelector(".bar1").setAttribute("data-value", value);
});
document.querySelector('#p2').addEventListener('mdl-componentupgraded', function () {
    var value = 0;
    this.MaterialProgress.setProgress(value);
    this.querySelector(".bar1").setAttribute("data-value", value);
});

//play/pause button
[].forEach.call(document.querySelectorAll('.download-button'), function (el) {
    el.addEventListener('click', function () {
        if (el.innerHTML.indexOf("pause") > -1) {
            el.querySelector("img").setAttribute("src", "play_arrow.png");
        }
        else {
            el.querySelector("img").setAttribute("src", "pause.png");
        }
    });
});
//start a new download button
