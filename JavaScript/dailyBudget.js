window.localStorage.getItem("currentWeek")

function dailyBudget(){
    const array =  JSON.parse(window.localStorage.getItem("currentWeek"));

    const masterDiv = document.getElementById('weekDays')

    console.log(array)

    for (let dataIndex in array) {
        let entry = array[dataIndex];
        let id = entry.dailyBudget_Id;
        let date = entry.date;
        let money = entry.money;
        $(masterDiv).append(`
            <div class="col-4 offset-md-1 backgroundColor mb-3 cursor" data-toggle="modal" data-target="#dailyModal${id}">
                <i class="fa-solid fa-calendar-plus col-12 bottomBorder mt-4 pb-2"></i>
                <p class="col-12 bottomBorder mt-4 pb-2">Money for today: ${money}</p>
                <p class="col-12">${date}</p>
            </div>

            <div class="modal fade" id="dailyModal${id}" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
              <div class="modal-dialog" role="document">
                <div class="modal-content">
                  <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">Mealplan for ${date}</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                      <span aria-hidden="true">&times;</span>
                    </button>
                  </div>
                  <div class="modal-body">
                    <div class="backgroundColor">
                      <div id="mealplan">
                      </div>
                    </div>
                  </div>
                  <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                  </div>
                </div>
              </div>
            </div>
        `);
    }
    mealplan();
}

function mealplan(){
    const array =  JSON.parse(window.localStorage.getItem("currentWeek"));
    const masterDiv = document.getElementById('mealplan')
    let entry = array[3];
    let dailyBugdetMoney = parseInt(entry.money);
    let mealArray = entry.meal;
    
    for (let dataIndex in mealArray) {
        let mealEntry = mealArray[dataIndex]
        let mealName = mealEntry.name;
        let percentageOfBudget = parseFloat("0."+mealEntry.percentageOfBudget);
        let mealProcentOfDaily = dailyBugdetMoney * percentageOfBudget;
        $(masterDiv).append(`
            <div>${mealName}</div>
            <div>${mealProcentOfDaily}</div>
        `);
    }
}