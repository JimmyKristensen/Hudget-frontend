'use strict'

class Budget{
    constructor(){
        this.url = "https://hudget-backned.azurewebsites.net/api/v1/monthlybudget/";
    }

    upload(){
        let user = getUser()
        let  postData = {
            monthlyMoney: document.getElementById('monthlyMoney').value,
                user: {
                    user_id: user.userId,
                    name: user.username
                },
            dailyBudgets: [],
        }

        this.postData(postData);
    }
    change(){
        let updateData = {
            monthlyMoney: document.getElementById('monthlyUpdateMoney').value
        }
        this.updateData(updateData)
    }
    async updateData(updateData){
        let settings = {
            method: 'PATCH',
            body: JSON.stringify(updateData),
            headers: { 'Content-Type': 'application/json; charset=utf-8' }
        }
        let data = null

        try{
            let monthly = JSON.parse(window.localStorage.getItem("Month"))
            let user_id = monthly.monthly_Id;
            let response = await fetch(this.url +"money/"+ user_id, settings)
            data = await response.json;
        } catch (error){
            console.log(error)
        }
        return data
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
            let response = await fetch(this.url, settings)
            data = await response.json;
        } catch (error){ 
            console.log(error)
        }
        return data
    }
    
    
    

    update(month, year){
        monthlybudget.fetchData(month, year);
    }

    async fetchData(month, year){
        try{
        let date = year+"-"+month
        let user = getUser();

        let response = await fetch(this.url+"date/"+user.userId + "/" + date);
        this.data = await response.json();
        this.updateUI();
        }catch(e){
            
        }
    }

    updateUI(){
        let entry = this.data;
        let monthlyBudgetForm = document.getElementById("thisMonthBudget");
        monthlyBudgetForm.querySelector("#monthlyMoney").innerHTML="Current Budget: "+entry.monthlyMoney;
    }
}


var monthlybudget = new Budget();