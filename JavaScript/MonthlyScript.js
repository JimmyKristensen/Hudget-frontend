const monthForward = document.querySelector(".MonthForwards");
const monthBackward = document.querySelector(".MonthBackwards");

let CalenderDate = new Date();


function monthForwardsActivator(){
    const monthVariable = document.getElementById("MonthVariable"); //placed here since the template isen't loaded in to the doc before this is called.
    const htmlString = monthVariable.innerHTML;
    let monthNumber = htmlString.charAt(0)+htmlString.charAt(1);
    let yearNumber = htmlString.charAt(3)+htmlString.charAt(4)+htmlString.charAt(5)+htmlString.charAt(6);

    monthNumber = parseInt(monthNumber)+1
    if(monthNumber == 12){
        yearNumber = parseInt(yearNumber)+1
        monthNumber = 01
    }


    let monthNumberLen = String(monthNumber).length
    if(monthNumberLen < 2){
        console.log("Less than 2 characters")
        monthNumber = String(0).concat(monthNumber)
    }

    fetchMonth(monthNumber)

    monthVariable.innerHTML = monthNumber+"/"+yearNumber;
}

function MonthBackwardsActivator(){
    const monthVariable = document.getElementById("MonthVariable");
    const htmlString = monthVariable.innerHTML;
    let monthNumber = htmlString.charAt(0)+htmlString.charAt(1);
    let yearNumber = htmlString.charAt(3)+htmlString.charAt(4)+htmlString.charAt(5)+htmlString.charAt(6);

    monthNumber = parseInt(monthNumber)-1
    
    if(parseInt(monthNumber) < 1){
        yearNumber = parseInt(yearNumber)-1
        monthNumber = 12
    } 


    let monthNumberLen = String(monthNumber).length
    if(monthNumberLen < 2){
        console.log("Less than 2 characters")
        monthNumber = String(0).concat(monthNumber)
    }

    fetchMonth(monthNumber)

    monthVariable.innerHTML = monthNumber+"/"+yearNumber;
}

async function fetchMonth(id){
    const endpoint = "";
    const response = await fetch(this.endpoint + id);
    const data = await response.json();
    console.log(data);

    const jsonString = '{"Date": "2022-1-28"},{"Date": "2022-2-28"},{"Date": "2022-3-28"},{"Date": "2022-4-28"},{"Date": "2022-5-28"},{"Date": "2022-6-28"},{"Date": "2022-7-28"},{"Date": "2022-8-28"},{"Date": "2022-9-28"},{"Date": "2022-10-28"},{"Date": "2022-11-28"},{"Date": "2022-12-28"}';
    const jsObject =  JSON.parse(jsonString);
    console.log(jsObject);
    
}

