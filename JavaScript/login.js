'use strict'

const sessionTrue = "sessionTrue"
const sessionId = "sessionId"
const sessionUsername = "username"

class Login{
    constructor(){
        this.urlCreate = "https://hudget-backned.azurewebsites.net/api/v1/users";
        this.urlSession = "https://hudget-backned.azurewebsites.net/api/v1/users/userChecker";
    }

    /* create user */
    createUser(){
        let postData = {
            name: document.getElementById('username').value,
            password: document.getElementById('password').value
        }

        this.postData(postData);
        location.href = "#/login";
    }
     
    //Post Request
    async postData(postData){
        let settings = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json; charset=utf-8' },
            body: JSON.stringify(postData)
        }
        let data = null

        try{
            let response = await fetch(this.urlCreate, settings)
            data = await response.json;
        } catch (error){
            alert("Unable to create user")
        }
        return data
    }
    /* End Create user */

    /* Login */
    //Post Request with it's unic url to called a spefic funtion that return a user
    // If username and password exist in DB
    async userChecker(postData){
        let settings = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json; charset=utf-8' },
            body: JSON.stringify(postData)
        }
        let data = null

        try{
            let response = await fetch(this.urlSession, settings)
            data =  await response.json()
            return data;
        } catch (error){
            console.log(error)
            return null;
        }
        /*return data*/
    }

    async loginsubmit(){
        let postData = {
            name: document.getElementById('username').value,
            password: document.getElementById('password').value
        }

        let user = await this.userChecker(postData)
        if(user != null){
        this.setSessionUser(user)
        location.href = "#/month";
        } else {
            alert("Error with login")
        }
        
    }

    async fetchData(){
        let response = await fetch(this.urlSession);
        this.data = await response.json();

    }

    setSessionUser(user){
        sessionStorage.setItem(sessionTrue, true);
        sessionStorage.setItem(sessionId,user.user_id);
        sessionStorage.setItem(sessionUsername, user.name);
    }

    /* End Login */
    
}

function getUser() {

    if (isLoggedIn()) {
      return {
        loggedIn: sessionStorage.getItem(sessionTrue),
        username: sessionStorage.getItem(sessionUsername),
        userId: sessionStorage.getItem(sessionId),
      }
    }
  }

function resetUserSession() {
    sessionStorage.removeItem(sessionTrue);
    sessionStorage.removeItem(sessionId);
    sessionStorage.removeItem(sessionUsername);
}

function isLoggedIn() {
    let loggedIn = sessionStorage.getItem(sessionTrue)
    let username = sessionStorage.getItem(sessionUsername)
    let valid = loggedIn === 'true' && username != ''
    return valid
}

var sessionTool = new Login();