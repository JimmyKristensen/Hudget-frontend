'use strict'

const ROUTE_TEMPLATE_KEY_HOME = 'home'
const ROUTE_TEMPLATE_KEY_TEST = 'test'

const ROUTE_HOME = '/'
const ROUTE_TEST = '/test'

const VIEW_ELEMENT_ID = "#view"

template(ROUTE_TEMPLATE_KEY_HOME, home);

template(ROUTE_TEMPLATE_KEY_TEST, test);


route(ROUTE_HOME, ROUTE_TEMPLATE_KEY_HOME);

route(ROUTE_TEST, ROUTE_TEMPLATE_KEY_TEST);



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
};