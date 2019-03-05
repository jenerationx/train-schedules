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

var trainName;
var trainDest;
var firstTrain;
var trainFreq;

$("#submit").on("click", function (event) {
    event.preventDefault();

    // Grabs user input
    var trainName = $("#input-name").val().trim();
    var trainDest = $("#input-dest").val().trim();
    var firstTrain = $("#input-first").val().trim();
    var trainFreq = $("#input-frequency").val().trim();
    // var trainFreq = moment($("#input-frequency").val().trim(), "MM/DD/YYYY").format("X");

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

    $("#input-name").val("");
    $("#input-dest").val("");
    $("#input-first").val("");
    $("#input-frequency").val("");
});

