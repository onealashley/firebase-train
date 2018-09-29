var config = {
    apiKey: "AIzaSyCEvKD8qSiz03_I0lC9g85x0GhRY4RJUs0",
    authDomain: "first-project-6f592.firebaseapp.com",
    databaseURL: "https://first-project-6f592.firebaseio.com",
    projectId: "first-project-6f592",
    storageBucket: "first-project-6f592.appspot.com",
    messagingSenderId: "128689910559"
};

firebase.initializeApp(config);

var trainData = firebase.database();

$("#add-train-btn").on("click", function() {
  var trainName = $("#trainName").val().trim();
  var destination = $("#destination").val().trim();
  var firstTrain = $("#firstTrain").val().trim();
  var frequency = $("#frequency").val().trim();

  var newTrain = {

    name: trainName,
    destination: destination,
    firstTrain: firstTrain,
    frequency: frequency
  };

  trainData.ref().push(newTrain);

  alert("Train added");

  $("#trainName").val("");
  $("#destination").val("");
  $("#firstTrain").val("");
  $("#frequency").val("");

  return false;
});

trainData.ref().on("child_added", function(childSnapshot) {
  var tName = childSnapshot.val().name;
  var tDestination = childSnapshot.val().destination;
  var tFrequency = childSnapshot.val().frequency;
  var tFirstTrain = childSnapshot.val().firstTrain;

  var timeArr = tFirstTrain.split(":");
  var trainTime = moment().hours(timeArr[0]).minutes(timeArr[1]);
  var maxMoment = moment.max(moment(), trainTime);
  var tMinutes;
  var tArrival;

  if (maxMoment === trainTime) {
    tArrival = trainTime.format("hh:mm A");
    tMinutes = trainTime.diff(moment(), "minutes");
  } else {
    var differenceTimes = moment().diff(trainTime, "minutes");
    var tRemainder = differenceTimes % tFrequency;
    tMinutes = tFrequency - tRemainder;
    tArrival = moment().add(tMinutes, "m").format("hh:mm A");
  }

  $("#train-table > tbody").append("<tr><td>" + tName + "</td><td>" + tDestination + "</td><td>" +
          tFrequency + "</td><td>" + tArrival + "</td><td>" + tMinutes + "</td></tr>");
});

