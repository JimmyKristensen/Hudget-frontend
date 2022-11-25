'use strict'

const ROUTE_TEMPLATE_KEY_HOME = 'home'
const ROUTE_TEMPLATE_KEY_WEEK = 'week'

const ROUTE_HOME = '/'
const ROUTE_WEEK = '/week'

const VIEW_ELEMENT_ID = "#view"

template(ROUTE_TEMPLATE_KEY_HOME, home);
template(ROUTE_TEMPLATE_KEY_WEEK, week);


route(ROUTE_HOME, ROUTE_TEMPLATE_KEY_HOME);
route(ROUTE_WEEK, ROUTE_TEMPLATE_KEY_WEEK);



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
    $(VIEW_ELEMENT_ID).html( cloneHtmlTemplate('template-weekpage'));
};