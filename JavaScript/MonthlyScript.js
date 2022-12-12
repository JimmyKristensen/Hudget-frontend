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
    fillStorage(weeksOfMonth, monthNumber, yearNumber)
    FillMonthUI(weeksOfMonth)
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
    let weeksOfMonth = GetWeeksOfMonths(monthNumber, yearNumber, 10);  //Start dag 10 //test for timmy

    UpdateMonthUI(weeksOfMonth)
    fillStorage(weeksOfMonth, monthNumber, yearNumber)
    FillMonthUI(weeksOfMonth)

    for (let i = 0; i<weeksOfMonth.length; i++){
        console.log(weeksOfMonth[i])
    }

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


        aElement.setAttribute('onclick',"weeklyCall()")
        aElement.setAttribute('class',"text-primary")

        aElement.innerHTML = "Link To Week"
        targetWeek.appendChild(aElement)
    }
}
async function weeklyCall(){
    let WeeksInMonth = JSON.parse(window.localStorage.getItem("WeeksInMonth"))
    let monthNumber = window.localStorage.getItem("MonthNumber")
    let yearNumber = window.localStorage.getItem("YearNumber")

    console.log(WeeksInMonth + "\n" + monthNumber+yearNumber)

    console.log("This is weekly call:")
    console.log("Date: "+monthNumber+"/"+yearNumber)
    console.log(WeeksInMonth)
    let date = (yearNumber+"-"+monthNumber)

    let user = getUser();


    let monthObj = await fetchMonth(user.userId, date)
    console.log(monthObj)
    let dailyArray = monthObj.dailyBudgets;
    console.log("Here is our array for fun code :) :")
    console.log(dailyArray)


    let dailyChoosen = 0;
    //Array of array of days in every week
    for (let i = 0; i < WeeksInMonth.length; i++) {

        //Takes an array of the array specefik index and replaces it with the dailyChosen
        for (let j = 0; j < WeeksInMonth[i].length; j++) {

            WeeksInMonth[i][j] = dailyArray[dailyChoosen]
            dailyChoosen++

        }
    }
    console.log(WeeksInMonth)
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