'use strict'

const ROUTE_TEMPLATE_KEY_HOME = 'home'
const ROUTE_TEMPLATE_KEY_MONTH = 'month'
const ROUTE_TEMPLATE_KEY_WEEK = 'week'
const ROUTE_TEMPLATE_KEY_LOGIN = 'login'
const ROUTE_TEMPLATE_KEY_LOGOUT = 'logut'
const ROUTE_TEMPLATE_KEY_CREATEUSER = 'createUser'

const ROUTE_HOME = '/'
const ROUTE_MONTH = '/month'
const ROUTE_WEEK = '/week'
const ROUTE_LOGIN = '/login'
const ROUTE_LOGOUT = '/logout'
const ROUTE_CREATEUSER = '/createUser'

const VIEW_ELEMENT_ID = "#view"

template(ROUTE_TEMPLATE_KEY_HOME, home);
template(ROUTE_TEMPLATE_KEY_WEEK, week);
template(ROUTE_TEMPLATE_KEY_LOGIN, login);
template(ROUTE_TEMPLATE_KEY_LOGOUT, logout);
template(ROUTE_TEMPLATE_KEY_CREATEUSER, createUser);
template(ROUTE_TEMPLATE_KEY_MONTH, month);


route(ROUTE_HOME, ROUTE_TEMPLATE_KEY_HOME);
route(ROUTE_WEEK, ROUTE_TEMPLATE_KEY_WEEK);
route(ROUTE_LOGIN, ROUTE_TEMPLATE_KEY_LOGIN);
route(ROUTE_LOGOUT, ROUTE_TEMPLATE_KEY_LOGOUT);
route(ROUTE_CREATEUSER, ROUTE_TEMPLATE_KEY_CREATEUSER);


route(ROUTE_MONTH, ROUTE_TEMPLATE_KEY_MONTH);

function cloneHtmlTemplate(id) {
    let div = document.createElement('div');
    const template = document.querySelector(`#${id}`);
    const clone = template.content.cloneNode(true);
    div.appendChild(clone)
    return div
}

function home() {
    $(VIEW_ELEMENT_ID).html( cloneHtmlTemplate('template-homepage'));
};

function week() {
    if(getUser().loggedIn === 'true'){
        $(VIEW_ELEMENT_ID).html( cloneHtmlTemplate('template-weekpage'));
    } else {
        home()
    }
};

function login() {
    $(VIEW_ELEMENT_ID).html( cloneHtmlTemplate('template-login'));
};

function logout() {
    resetUserSession()
    toggleLoginUI(true)
    home()
}


function createUser() {
    $(VIEW_ELEMENT_ID).html( cloneHtmlTemplate('template-createUser'));
}

function month() {
    if(getUser().loggedIn === 'true'){
        $(VIEW_ELEMENT_ID).html( cloneHtmlTemplate('month'));
        let CalenderDate = new Date();
        let yearString = String(CalenderDate.getUTCFullYear());
        //CalenderDate.setMonth(3); //Test
        let monthString = String(CalenderDate.getUTCMonth() +1);
        const monthVariable = document.getElementById("MonthVariable");
        if(monthString.length < 2){
            monthString = 0 + monthString
        }



        monthlybudget.update()


        //Need work!!! add weekobjects then everything else
        let weeksOfMonth = GetWeeksOfMonths(parseInt(monthString), parseInt(yearString));
        //Gets the data from Json using the month number as id
        UpdateMonthUI(weeksOfMonth)
        fillStorage(weeksOfMonth,monthString,yearString)
        FillMonthUI(weeksOfMonth)

        monthVariable.innerHTML = monthString+"/"+yearString;
    } else {
        home()
    }
};