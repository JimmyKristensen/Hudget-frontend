//Husk bindestreg imellen år-måned-dag

const url = "http://localhost:8080/api/v1/monthlybudget/date/"

async function fetchMonth(user_id, date) {
    const response = await fetch(url+user_id+"/"+date)
    const data = await response.json()
    const string = JSON.stringify(data.monthly_Id)+JSON.stringify(data.date)+JSON.stringify(data.monthlyMoney)+JSON.stringify(data.dailyBudgets)
    return data;
}
