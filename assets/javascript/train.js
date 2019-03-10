// Initialize Firebase
var config = {
    apiKey: "AIzaSyDRkIus8bN3DahjVRAgL6MsBO5x1rK2_Pk",
    authDomain: "train-time-fb995.firebaseapp.com",
    databaseURL: "https://train-time-fb995.firebaseio.com",
    projectId: "train-time-fb995",
    storageBucket: "train-time-fb995.appspot.com",
    messagingSenderId: "99164360758"
};
firebase.initializeApp(config);

var database = firebase.database();

var trainName;
var trainDest;
var firstTrain;
var trainFreq;

$("#submit").on("click", function (event) {
    event.preventDefault();
    
    // make sure they fill out the form completely
    if ($("#input-name").val().trim() === "" ||
        $("#input-dest").val().trim() === "" ||
        $("#input-first").val().trim() === "" ||
        $("#input-frequency").val().trim() === "") {

        alert("Please fill out the entire form");
    }
    else {
        // Grabs user input
        var trainName = $("#input-name").val().trim();
        var trainDest = $("#input-dest").val().trim();
        var firstTrain = $("#input-first").val().trim();
        var trainFreq = $("#input-frequency").val().trim();

        // Creates local "temporary" object for holding new train info
        var newTrain = {
            name: trainName,
            destination: trainDest,
            first: firstTrain,
            frequency: trainFreq
        };

        // Uploads new train to the database
        database.ref().push(newTrain);

        // Logs everything to console
        console.log(newTrain.name);
        console.log(newTrain.destination);
        console.log(newTrain.first);
        console.log(newTrain.frequency);
        // clear the input boxes
        $("#input-name").val("");
        $("#input-dest").val("");
        $("#input-first").val("");
        $("#input-frequency").val("");
    }
});

// get train info from firebase & put it in the table
database.ref().on("child_added", function (childSnapshot) {
    console.log(childSnapshot.val());

    // Store everything into a variable.
    var trainName = childSnapshot.val().name;
    var trainDest = childSnapshot.val().destination;
    var firstTrain = childSnapshot.val().first;
    var trainFreq = childSnapshot.val().frequency;

    // Train Info
    console.log(trainName);
    console.log(trainDest);
    console.log(firstTrain);
    console.log(trainFreq);



    // First Train (pushed back 1 year to make sure it comes before current time)
    var firstTrainConverted = moment(firstTrain, "HH:mm").subtract(1, "years");
    console.log("FIRST TRAIN CONVERTED " + firstTrainConverted);
    // maybe put an if { first train hasn't happened yet, display first train}
    // Current Time
    var currentTime = moment();
    console.log("CURRENT TIME: " + moment(currentTime).format("HH:mm"));

    // Difference between the times
    var diffTime = moment().diff(moment(firstTrainConverted), "minutes");
    console.log("DIFFERENCE IN TIME: " + diffTime);

    // Time apart (remainder)
    var tRemainder = diffTime % trainFreq;
    console.log(tRemainder);

    // Minutes Until Next Train
    var minutesAway = trainFreq - tRemainder;
    console.log("MINUTES TILL TRAIN: " + minutesAway);

    // Next Train Arrival Time
    var nextTrain = moment().add(minutesAway, "minutes").format("HH:mm");
    console.log("ARRIVAL TIME: " + nextTrain);

    // Create the new row
    var newRow = $("<tr>").append(
        $("<td>").text(trainName),
        $("<td>").text(trainDest),
        $("<td>").text(trainFreq),
        $("<td>").text(nextTrain),
        $("<td>").text(minutesAway)
    );

    // Append the new row to the table
    $("#train-schedule").append(newRow);
});