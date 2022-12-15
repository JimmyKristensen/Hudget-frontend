let CalenderDate = new Date();


function monthForwardsActivator(){ //What happens when user hits the month navigation arrow
    const monthVariable = document.getElementById("MonthVariable"); //placed here since the template isen't loaded in to the doc before this is called.
    const htmlString = monthVariable.innerHTML;
    let monthNumber = htmlString.charAt(0)+htmlString.charAt(1);
    let yearNumber = htmlString.charAt(3)+htmlString.charAt(4)+htmlString.charAt(5)+htmlString.charAt(6);

    let monthlyBudgetForm = document.getElementById("thisMonthBudget");
    monthlyBudgetForm.querySelector("#monthlyMoney").innerHTML="Current Budget: ";
    
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


    monthlybudget.update(monthNumber, yearNumber)
    //create the week objects
    let weeksOfMonth = GetWeeksOfMonths(monthNumber, yearNumber);
    //console.log(weeksOfMonth)
    UpdateMonthUI(weeksOfMonth)
    fillStorage(weeksOfMonth, monthNumber, yearNumber)
    FetchAllWeeks()
    FillMonthUI(weeksOfMonth)
    



    monthVariable.innerHTML = monthNumber+"/"+yearNumber;
}


function MonthBackwardsActivator(){ //What happens when the user hits the month navigation arrow
    const monthVariable = document.getElementById("MonthVariable");
    const htmlString = monthVariable.innerHTML;
    let monthNumber = htmlString.charAt(0)+htmlString.charAt(1);
    let yearNumber = htmlString.charAt(3)+htmlString.charAt(4)+htmlString.charAt(5)+htmlString.charAt(6);
    let monthlyBudgetForm = document.getElementById("thisMonthBudget");
    monthlyBudgetForm.querySelector("#monthlyMoney").innerHTML="Current Budget: ";
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
    monthlybudget.update(monthNumber, yearNumber)
    //create the week objects
    let weeksOfMonth = GetWeeksOfMonths(monthNumber, yearNumber);  //Start dag 10 //test for timmy

    UpdateMonthUI(weeksOfMonth)
    fillStorage(weeksOfMonth, monthNumber, yearNumber)
    FetchAllWeeks()
    FillMonthUI(weeksOfMonth)


    monthVariable.innerHTML = monthNumber+"/"+yearNumber;
}


function fillStorage(weeksInMonth, monthNumber, yearNumber){
    window.localStorage.setItem('WeeksInMonth', JSON.stringify(weeksInMonth))
    window.localStorage.setItem('MonthNumber', monthNumber)
    window.localStorage.setItem('YearNumber', yearNumber)
}

function FillMonthUI(weeksInMonth){
    for (let i = 0; i<weeksInMonth.length; i++){
        let targetWeek = document.getElementById("Week"+i)
        let startDateOfWeek = weeksInMonth[i][0]
        let endDateOfWeek = weeksInMonth[i][weeksInMonth[i].length-1]
        let pElement = document.createElement('p')
        pElement.innerHTML = "Days: ["+startDateOfWeek+" -> "+endDateOfWeek+"]"
        pElement.setAttribute('class', "bottomBorder")
        targetWeek.appendChild(pElement)
        let aElement = document.createElement('p')


        aElement.setAttribute('onclick',"weekIndex( "+ i+" )")
        aElement.setAttribute('class',"text-primary")

        aElement.innerHTML = "Link To Week"
        targetWeek.appendChild(aElement)
        
        
    }
}
function weekIndex(i){
    window.localStorage.setItem("IndexWeek"+i,String(i))
    //console.log("This here:"+window.localStorage.getItem("IndexWeek"+i))

    let FilledMonth = JSON.parse(window.localStorage.getItem("FilledMonth"))

    let currentWeek = FilledMonth[window.localStorage.getItem("IndexWeek"+i)]

    window.localStorage.setItem("currentWeek", JSON.stringify(currentWeek))
    //console.log(currentWeek)
    //REDRIECT
    location.href = "#/week";
}

async function FetchAllWeeks(){
    let WeeksInMonth = JSON.parse(window.localStorage.getItem("WeeksInMonth"))
    let monthNumber = window.localStorage.getItem("MonthNumber")
    let yearNumber = window.localStorage.getItem("YearNumber")

    //console.log(WeeksInMonth + "\n" + monthNumber+yearNumber)

    let date = (yearNumber+"-"+monthNumber)

    let user = getUser();


    let monthObj = await fetchMonth(user.userId, date)
    window.localStorage.setItem("Month",JSON.stringify(monthObj))
    let dailyArray
    try{
        dailyArray = monthObj.dailyBudgets;
        //console.log(dailyArray)
    }catch(e){
        console.log("Inserting default")
        dailyArray = ""
    }
    




    let dailyChoosen = 0;
    //Array of array of days in every week
    for (let i = 0; i < WeeksInMonth.length; i++) {

        //Takes an array of the array specefik index and replaces it with the dailyChosen
        for (let j = 0; j < WeeksInMonth[i].length; j++) {

            WeeksInMonth[i][j] = dailyArray[dailyChoosen]
            dailyChoosen++

        }
    }
    //console.log(WeeksInMonth)
    window.localStorage.setItem("FilledMonth", JSON.stringify(WeeksInMonth))
    

    //Button disabler
    if(WeeksInMonth[0][0] != null){
        document.getElementById("buttonCreate").hidden = true
        document.getElementById("buttonUpdate").hidden = false
    }else{
        document.getElementById("buttonCreate").hidden = false
        document.getElementById("buttonUpdate").hidden = true
    }
    let currentDate = new Date();
    let currentMonth = currentDate.getMonth()+1
    let currentYear = currentDate.getFullYear()
    currentDate = new Date(currentYear,currentMonth,0)

    let shownMonth = parseInt(window.localStorage.getItem("MonthNumber"))
    let shownYear = parseInt(window.localStorage.getItem("YearNumber"))
    let shownDate = new Date(shownYear, shownMonth, 0)
    if(shownDate>currentDate){
        document.getElementById("buttonCreate").hidden = true
        document.getElementById("buttonUpdate").hidden = true          
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
            let colDivSpacer1 = document.createElement('div')
            colDivSpacer1.setAttribute('class',"col")
            rowDiv.appendChild(colDivSpacer1)
            let colDiv = document.createElement('div')
            colDiv.setAttribute('class',"col  backgroundColor mt-3")
            colDiv.setAttribute('id',"Week"+[i])
            rowDiv.appendChild(colDiv)
        }else{
            let colDiv = document.createElement('div')
            colDiv.setAttribute('class', "col offset-md-1 backgroundColor mt-3")
            colDiv.setAttribute('id',"Week"+[i])
            rowDiv.appendChild(colDiv)
            let colDivSpacer2 = document.createElement('div')
            colDivSpacer2.setAttribute('class',"col")
            rowDiv.appendChild(colDivSpacer2)
        }
        if(i === weeksInMonth.length-1 && i%2 === 0){
            let colDivSpacer2 = document.createElement('div')
            colDivSpacer2.setAttribute('class',"col")
            rowDiv.appendChild(colDivSpacer2)
        }

    }
    masterDiv.appendChild(rowDiv)
    body.appendChild(masterDiv)
}


function GetWeeksOfMonths(month, year, start){
    if(start == undefined){
        start = 1
    }

    let firstDayOfMonth = new Date(year, month-1, start);
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
        temp.push(i+start)
    }
    weeksOfMonth.push(temp)
    //Resterende Uger
    temp = new Array()
    for (let i = FirstWeekLength; i<daysOfMonth; i++) {
        if(temp.length < 7){
            temp.push(i+start)
        }else{
            weeksOfMonth.push(temp)
            temp = new Array()
            temp.push(i+start)
        }
    }
    weeksOfMonth.push(temp)
    return weeksOfMonth;
}