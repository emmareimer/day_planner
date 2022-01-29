// Assign varibles from the DOM
var eventInputAreas = document.querySelectorAll(".event-input-area");
var saveButtonsArr = document.querySelectorAll(".save-button")
var liveTime = document.getElementById("current-time");
var timeSlots = document.querySelectorAll(".calendar-times");

// Assign global variables
var currentHour = parseInt(moment().format('k'));

// Assign empty variables
userInputArr = []

// Assign other variables/test variables

// Function at bottom of the jumbotron to give current time/date
var update = function() {
    liveTime.innerHTML = moment().format('MMMM Do YYYY, h:mm:ss a');
    currentHour = parseInt(moment().format('k'))
}
setInterval(update, 1000);

// Init function: If/else statements to change background of text area depending on the time -- For loop to iterate through time slots on planner?
function initFunction(){

    var storedTasks = localStorage.getItem("dailyPlannerTasks") ? JSON.parse(localStorage.getItem("dailyPlannerTasks")) : {};

    // [a, b, c, d, e]
    eventInputAreas.forEach((inputArea, index) => {
        let rowTimeSlot = parseInt(timeSlots[index].getAttribute('data-hour'));
    
        if (rowTimeSlot === currentHour) {
            inputArea.classList.add("present")
        } else if (rowTimeSlot < currentHour) {
            inputArea.classList.add("past")
        } else {
            inputArea.classList.add("future")
        }

        inputArea.value = storedTasks[rowTimeSlot] || "";

    })

    saveButtonsArr.forEach((saveButton, index) => {
        saveButton.addEventListener("click", (event) => {
            saveInput(event, index)
        })
    })
}

// Function for saving the user's input
// Function for setting saved items to local storage
function saveInput(e, index) {
    var target = e.target;
    const plannerTask = target.previousElementSibling.value;

    var storedTasks = localStorage.getItem("dailyPlannerTasks") ? JSON.parse(localStorage.getItem("dailyPlannerTasks")) : {};

    var timeStamp = timeSlots[index].getAttribute('data-hour');

    console.log(plannerTask);

    storedTasks[timeStamp] = plannerTask;

    localStorage.setItem("dailyPlannerTasks", JSON.stringify(storedTasks))
}

// Call init function
initFunction();