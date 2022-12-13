//Husk bindestreg imellen år-måned-dag

const url = "http://localhost:8080/api/v1/monthlybudget/date/"

async function fetchMonth(user_id, date) {
    try{
        const response = await fetch(url+user_id+"/"+date)
        const data = await response.json()
        //console.log(data)
        return data;
    }catch(e){
        console.log("There is no data for this")
        return null;
    }
    
}
