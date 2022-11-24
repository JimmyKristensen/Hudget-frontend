/**
* Route template constants.
*/
const ROUTE_TEMPLATE_KEY_HOME = 'home'
const ROUTE_TEMPLATE_KEY_ABOUT = 'about'
const ROUTE_TEMPLATE_KEY_LOGIN = 'login'
const ROUTE_TEMPLATE_KEY_LOGOUT = 'logout'
const ROUTE_TEMPLATE_KEY_ADMIN = 'admin'
 
/**
* Route constants.
*/
const ROUTE_HOME = '/'
const ROUTE_ABOUT = '/about'
const ROUTE_LOGIN = '/login'
const ROUTE_LOGOUT = '/logout'
const ROUTE_ADMIN = '/admin'

const VIEW_ELEMENT_ID = "#view"
 
/**
* Defines the routing templates used and their respective render functions/actions.
*/
template(ROUTE_TEMPLATE_KEY_HOME, home)
template(ROUTE_TEMPLATE_KEY_ABOUT, about)
template(ROUTE_TEMPLATE_KEY_LOGIN, login)
template(ROUTE_TEMPLATE_KEY_LOGOUT, logout)
template(ROUTE_TEMPLATE_KEY_ADMIN, admin)
 
/**
* Defines the #/... url routes and the templates they match..
*/
route(ROUTE_HOME, ROUTE_TEMPLATE_KEY_HOME);
route(ROUTE_ABOUT, ROUTE_TEMPLATE_KEY_ABOUT);
route(ROUTE_LOGIN, ROUTE_TEMPLATE_KEY_LOGIN);
route(ROUTE_LOGOUT, ROUTE_TEMPLATE_KEY_LOGOUT);
route(ROUTE_ADMIN, ROUTE_TEMPLATE_KEY_ADMIN);

 

let routes = {};
let templates = {};


function Route(path, template){
    if (typeof template === 'function'){
        return routes[path] = template;
    }
    else if(typeof template === 'string') {
        return routes[path] = template[template];
    }
    else{
        return;
    };
};

let view_div = document.getElementById('view');



function cloneHtmlTemplate(id) {
    let div = document.createElement('div'); //Creates the div that is made inside of the view div from the html file.
    const template = document.querySelector(`#${id}`); //router.jss has a method that slices at the first '/' in the URL and then uses quearySelector on the id to get the element.
    const clone = template.content.cloneNode(true); //Clone node copies it elements attributes and when set as true also its decendents(childs) 
    div.appendChild(clone) //appendchild adds to the targeted area the content.
    return div
}