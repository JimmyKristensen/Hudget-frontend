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