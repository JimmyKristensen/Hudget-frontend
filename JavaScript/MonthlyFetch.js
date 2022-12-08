//Husk bindestreg imellen år-måned-dag

const url = "http://localhost:8080/api/v1/monthlybudget/"

async function fetchMonth(id) {
    const response = await fetch(url+id)
    const data = await response.json()
    const string = JSON.stringify(data.monthly_Id)+JSON.stringify(data.date)+JSON.stringify(data.monthlyMoney)+JSON.stringify(data.dailyBudgets)
    return data;
}
