'use strict'

const sessionTrue = "sessionTrue"
const sessionId = "sessionId"
const sessionUsername = "username"

class Login{
    constructor(){
        this.urlCreate = "http://localhost:8080/api/v1/users";
        this.urlSession = "http://localhost:8080/api/v1/users/userChecker";
    }

    /* create user */
    createUser(){
        let postData = {
            name: document.getElementById('username').value,
            password: document.getElementById('password').value
        }

        this.postData(postData);
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
            console.log(error)
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
        }
        /*return data*/
    }

    async loginsubmit(){
        let postData = {
            name: document.getElementById('username').value,
            password: document.getElementById('password').value
        }

        let user = await this.userChecker(postData)
        this.setSessionUser(user)
        toggleLoginUI(true)
        location.href = "#/month";
        
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