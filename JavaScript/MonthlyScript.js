let CalenderDate = new Date();


function monthForwardsActivator(){ //What happens when user hits the month navigation arrow
    const monthVariable = document.getElementById("MonthVariable"); //placed here since the template isen't loaded in to the doc before this is called.
    const htmlString = monthVariable.innerHTML;
    let monthNumber = htmlString.charAt(0)+htmlString.charAt(1);
    let yearNumber = htmlString.charAt(3)+htmlString.charAt(4)+htmlString.charAt(5)+htmlString.charAt(6);

    monthNumber = parseInt(monthNumber)+1
    if(parseInt(monthNumber) > 12){
        yearNumber = parseInt(yearNumber)+1
        monthNumber = 01
    }

    //Add +1 to month. 
    let monthNumberLen = String(monthNumber).length
    if(monthNumberLen < 2){
        monthNumber = String(0).concat(monthNumber)
    }
    
    //create the week objects
    let weeksOfMonth = GetWeeksOfMonths(monthNumber, yearNumber);

    UpdateMonthUI(weeksOfMonth)
    FillMonthUI(weeksOfMonth,monthNumber, yearNumber)
    monthVariable.innerHTML = monthNumber+"/"+yearNumber;
}


function MonthBackwardsActivator(){ //What happens when the user hits the month navigation arrow
    const monthVariable = document.getElementById("MonthVariable");
    const htmlString = monthVariable.innerHTML;
    let monthNumber = htmlString.charAt(0)+htmlString.charAt(1);
    let yearNumber = htmlString.charAt(3)+htmlString.charAt(4)+htmlString.charAt(5)+htmlString.charAt(6);
    //-------------------below is month changer code
    monthNumber = parseInt(monthNumber)-1
    
    if(parseInt(monthNumber) < 1){
        yearNumber = parseInt(yearNumber)-1
        monthNumber = 12
    } 

    let monthNumberLen = String(monthNumber).length
    if(monthNumberLen < 2){
        monthNumber = String(0).concat(monthNumber)
    }
    //-------------------above is month changer code
    //create the week objects
    let weeksOfMonth = GetWeeksOfMonths(monthNumber, yearNumber);

    UpdateMonthUI(weeksOfMonth)
    FillMonthUI(weeksOfMonth,monthNumber, yearNumber)

    monthVariable.innerHTML = monthNumber+"/"+yearNumber;
}


function FillMonthUI(weeksInMonth, month, year){
    for (let i = 0; i<weeksInMonth.length; i++){
        let targetWeek = document.getElementById("Week"+i)
        let startDateOfWeek = weeksInMonth[i][0]
        let endDateOfWeek = weeksInMonth[i][weeksInMonth[i].length-1]
        targetWeek.innerHTML = "Days: ["+startDateOfWeek+" -> "+endDateOfWeek+"]"
        let aElement = document.createElement('a')
        aElement.setAttribute('href',"")//-------------------------------------------------------------------------------Link
        aElement.innerHTML = "<br>Link To Week"
        targetWeek.appendChild(aElement)
    }
}


function UpdateMonthUI(weeksInMonth){
    const body = document.getElementById('monthContent')
    body.replaceChildren()

    function rowInitializer(i, nothing){
        if(i%2==0){
            let rowDiv = document.createElement('div')
            rowDiv.setAttribute('class', "row");
            return rowDiv;
        }else{
            return nothing;
        }
    }

    const masterDiv = document.createElement('div')
    masterDiv.setAttribute('id',"MasterDiv")
    masterDiv.setAttribute('class',"justify-content-center align-items-center text-center")
    let rowDiv
for(let i = 0; i < weeksInMonth.length; i++){
    (i>1 && i%2===0) ? masterDiv.appendChild(rowDiv): null;

    rowDiv = rowInitializer(i, rowDiv);
    if(i % 2 === 0){
        let colDiv = document.createElement('div')
        colDiv.setAttribute('class',"col backgroundColor mt-1")
        colDiv.setAttribute('id',"Week"+[i])
        rowDiv.appendChild(colDiv)
    }else{
        let colDiv = document.createElement('div')
        colDiv.setAttribute('class', "col backgroundColor mt-1")
        colDiv.setAttribute('id',"Week"+[i])        
        rowDiv.appendChild(colDiv)
    }
}
masterDiv.appendChild(rowDiv)
body.appendChild(masterDiv)
}


function GetWeeksOfMonths(month, year){
    let firstDayOfMonth = new Date(year, month-1, 1);
    let lastDayOfMonth = new Date(year, month, 0);
    let daysOfMonth = lastDayOfMonth.getDate()+1 - firstDayOfMonth.getDate();
    
    let weeksOfMonth = []
    let startDayInFirstWeek = firstDayOfMonth.getDay();
    let FirstWeekLength = 7-startDayInFirstWeek+1;
    if(startDayInFirstWeek === 0){//hardcode to fix sunday bug
        FirstWeekLength = 1
    }
    let temp = new Array();
    //første uge
    for (let i = 0; i < FirstWeekLength; i++) {
        temp.push(i+1)
    }
    weeksOfMonth.push(temp)
    //Resterende Uger
    temp = new Array()
    for (let i = FirstWeekLength; i<daysOfMonth; i++) {
        if(temp.length < 7){
            temp.push(i+1)
        }else{
            weeksOfMonth.push(temp)
            temp = new Array()
            temp.push(i+1)
        }
    }
    weeksOfMonth.push(temp)
    return weeksOfMonth;
}


function WeekNumberCalculator(currentDate){ //This method takes a date and calculates which week it belongs to and returns that week number.
    let startDateOfYear = new Date(currentDate.getFullYear(), 0, 0);
    let week = Math.ceil((((currentDate - startDateOfYear) / (24*60*60*1000)) + startDateOfYear.getDay() || 7) / 7) ////Calculates from miliseconds into days.
    // https://www.geeksforgeeks.org/calculate-current-week-number-in-javascript/
    return week;
}