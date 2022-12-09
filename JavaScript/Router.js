'use strict'

const ROUTER_LOGIN_UI = '#login'
const ROUTER_LOGOUT_UI = '#logout'
const ROUTER_USERNAME_UI = '#login-username'
const ROUTER_MONTHLINK_UI = '#monthLink'

let routes = {};
let templates = {};

function route (path, template) {
  if (typeof template === 'function') {
      return routes[path] = template;
  }
  else if (typeof template === 'string') {
      return routes[path] = templates[template];
  } else {
      return;
  };
};

function template(name, templateFunction) {
  return templates[name] = templateFunction;
};

function resolveRoute(route) {
  try {
      return routes[route];
  } catch (e) {
      throw new Error(`Route ${route} not found`);
  };
};

function router(evt) {
  let url = window.location.hash.slice(1) || '/';
  let route = resolveRoute(url);

  toggleLoginUI(!isLoggedIn())
  
  route();
};

function toggleLoginUI(show) {

  let user = getUser()
  if (show) {
    $(ROUTER_LOGIN_UI).show();
    $(ROUTER_LOGOUT_UI).hide();
    $(ROUTER_MONTHLINK_UI).hide();
  } else {
    $(ROUTER_LOGIN_UI).hide();
    $(ROUTER_USERNAME_UI).html(`${user? user.username : '???'}`).show();
    $(ROUTER_LOGOUT_UI).show();
    $(ROUTER_MONTHLINK_UI).show();
  }
}

window.addEventListener('load', router);
window.addEventListener('hashchange', router);