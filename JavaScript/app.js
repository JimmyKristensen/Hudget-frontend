'use strict'

const ROUTE_TEMPLATE_KEY_HOME = 'home'
const ROUTE_TEMPLATE_KEY_TEST = 'test'
const ROUTE_TEMPLATE_KEY_MONTH = 'month'
const ROUTE_TEMPLATE_KEY_WEEK = 'week'

const ROUTE_HOME = '/'
const ROUTE_TEST = '/test'
const ROUTE_MONTH = '/month'
const ROUTE_WEEK = '/week'

const VIEW_ELEMENT_ID = "#view"

template(ROUTE_TEMPLATE_KEY_HOME, home);
template(ROUTE_TEMPLATE_KEY_WEEK, week);
template(ROUTE_TEMPLATE_KEY_MONTH, month);


route(ROUTE_HOME, ROUTE_TEMPLATE_KEY_HOME);
route(ROUTE_WEEK, ROUTE_TEMPLATE_KEY_WEEK);
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
function month() {
    $(VIEW_ELEMENT_ID).html( cloneHtmlTemplate('month'));
    let CalenderDate = new Date();
    let yearString = String(CalenderDate.getUTCFullYear());
    CalenderDate.setMonth(3);
    let monthString = String(CalenderDate.getUTCMonth());
    const monthVariable = document.getElementById("MonthVariable");
    if(monthString.length < 2){
        monthString = 0 + monthString
    }

    fetchMonth(parseInt(monthString)); //Gets the data from Json using the month number as id


    monthVariable.innerHTML = monthString+"/"+yearString;
};