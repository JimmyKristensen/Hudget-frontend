'use strict'

class Login{
    constructor(){
        this.urlCreate = "http://localhost:8080/api/v1/users";
        this.urlSession = "http://localhost:8080/api/v1/users/userChecker";
    }

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

    //Post Request
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
        
    }

    async fetchData(){
        let response = await fetch(this.urlSession);
        this.data = await response.json();

    }

    setSessionUser(user){
        sessionStorage.setItem("sessionTrue", true)
        sessionStorage.setItem("id",user.user_id)
        sessionStorage.setItem("username", user.name)

    }
    
}

var sessionTool = new Login();