'use strict'

const ROUTE_TEMPLATE_KEY_HOME = 'home'
const ROUTE_TEMPLATE_KEY_TEST = 'test'
const ROUTE_TEMPLATE_KEY_MONTH = 'month'
const ROUTE_TEMPLATE_KEY_WEEK = 'week'
const ROUTE_TEMPLATE_KEY_LOGIN = 'login'
const ROUTE_TEMPLATE_KEY_CREATEUSER = 'createUser'

const ROUTE_HOME = '/'
const ROUTE_TEST = '/test'
const ROUTE_MONTH = '/month'
const ROUTE_WEEK = '/week'
const ROUTE_LOGIN = '/login'
const ROUTE_CREATEUSER = '/createUser'

const VIEW_ELEMENT_ID = "#view"

template(ROUTE_TEMPLATE_KEY_HOME, home);
template(ROUTE_TEMPLATE_KEY_WEEK, week);
template(ROUTE_TEMPLATE_KEY_LOGIN, login);
template(ROUTE_TEMPLATE_KEY_CREATEUSER, createUser);
template(ROUTE_TEMPLATE_KEY_MONTH, month);


route(ROUTE_HOME, ROUTE_TEMPLATE_KEY_HOME);
route(ROUTE_WEEK, ROUTE_TEMPLATE_KEY_WEEK);
route(ROUTE_LOGIN, ROUTE_TEMPLATE_KEY_LOGIN);
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
function test() {
    $(VIEW_ELEMENT_ID).html( cloneHtmlTemplate('hello'));
}
function week() {
    $(VIEW_ELEMENT_ID).html( cloneHtmlTemplate('template-weekpage'));
};

function login() {
    $(VIEW_ELEMENT_ID).html( cloneHtmlTemplate('template-login'));
};

function createUser() {
    $(VIEW_ELEMENT_ID).html( cloneHtmlTemplate('template-createUser'));
}

function month() {
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
    FillMonthUI(weeksOfMonth,parseInt(monthString), parseInt(yearString))

    monthVariable.innerHTML = monthString+"/"+yearString;
};