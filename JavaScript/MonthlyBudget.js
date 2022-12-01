'use strict'

class Budget{
    constructor(){
        this.url = "http://localhost:8080/api/v1/monthlybudget";
    }

    upload(){
        //let CalenderDate = new Date();
        let postData = {
            //date: CalenderDate,
            monthlyMoney: document.getElementById('monthlyMoney').value,
            dailyBudgets: [],
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
            let response = await fetch(this.url, settings)
            data = await response.json;
        } catch (error){
            console.log(error)
        }
        return data
    }

    async getMonthlyBudget(){

    }

}


var monthlybudget = new Budget();