//-----------------------------VARIABLES------------------------------------------//

/**
 * Create a variable of the appropriate type to contain all the user dates in the order they were added
 * 
 * Which data structure stores data in order and stored contiguously in memory?
 *  */ 

const allDates = [];
/**
 * Create a variable of the appropriate type to contain all the user dates and their corressponding title
 * 
 * Which data structure stores data in pairs?
 *  */ 

const dateMap = new Map();


//-----------------------------FUNCTIONS------------------------------------------//


/**
 * Converts the date string that the user inputs into a Date Object then saves it. The input fields are cleared at the end
 */

function saveAddedDate() {

    // STEP 1: get the user input string yyyy-mm-dd and store in a var
    let breakTitle = document.getElementById("taskName").value;
    // STEP2: get the user input string and store in a var
    let dateString = document.getElementById("newDate").value;
    //STEP 3: convert the datestring into a date object and save in a var
    
    let newDate = new Date(dateString);
    console.log("saved date", dateString)

    // STEP 4: add date obj to storage data structure (defined in the variables section)
    allDates.push(newDate);
    console.log("the array length", allDates.length)
    // STEP 5: store date : title pairing (hint: use the set method)
    dateMap.set(newDate, breakTitle);
    //STEP 6: Clear the inputs and remove the input form from dom

    document.getElementById("taskName").value = "";
    document.getElementById("taskName").value = "";
    document.getElementById("input").style.display = "none"

    initTimer() // call to start the timer
}

/**
 *  Toggles the input form display 
 *  
 * */
function showInputForm() {
    const inputForm = document.getElementById("input")
    //HINT: use the style.display property of the element
    if (inputForm.style.display === "none") {
        inputForm.style.display = "block";
      } else {
        inputForm.style.display = "none";

      }


    

}

/**
 * This function is responsible for finding the next closest date that the user added.
 */

function initTimer() {


    if (allDates.length != 0) {
        allDates.sort(); //sort the array


        // Update the count down every 1 second
        var x = setInterval( function() {
            var today = new Date() //local time ( 5 hrs behind utc)
            var todayUTC = new Date(today.getTime() - today.getTimezoneOffset() * 60000); // convert local to utc


            var upcomingBreak = allDates.find( date => date > todayUTC);

        // Find the distance between now and the count down date

        if (upcomingBreak) {
            var distance = upcomingBreak - todayUTC; //in millisecs
            // Time calculations for days, hours, minutes and seconds
            var days = Math.floor(distance / (1000 * 60 * 60 * 24));
            var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            var seconds = Math.floor((distance % (1000 * 60)) / 1000);

            // Display the result in the element with id="demo"
            document.getElementById("break").innerHTML = dateMap.get(upcomingBreak); //should return the val of the break's name

            document.getElementById("timer").innerHTML = days + "d " + hours + "h "
            + minutes + "m " + seconds + "s ";

        } else {
            // Handle the case where there's no upcoming break
            document.getElementById("timer").innerHTML = "No Breaks Yet :(";
            clearInterval(x); // Optionally, clear the interval if no upcoming breaks
        }
       
        
        if (distance < 0) {
        clearInterval(x);
        document.getElementById("timer").innerHTML = "WOOOOOO!";
        }
    }, 1000);

    }
}

//-----------------FUNCTION CALLS---------------------------------------
document.getElementById("saveBtn").onclick = function() {saveAddedDate()};
document.getElementById('addBtn').addEventListener('click', showInputForm);
initTimer();
