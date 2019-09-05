var config = {
    apiKey: "AIzaSyBQKtzLftoo3ZME2NunEq8uVn7tqdorQYE",
    authDomain: "example-project-1-e0999.firebaseapp.com",
    databaseURL: "https://example-project-1-e0999.firebaseio.com",
    projectId: "example-project-1-e0999",
    storageBucket: "",
    messagingSenderId: "494238652048",
    appId: "1:494238652048:web:aa324b463e99f7d7"
  };
  
  firebase.initializeApp(config);
  var database = firebase.database();

  $("#add-train").on("click", function(event) {
    event.preventDefault();
  
    var trainName = $("#name-input").val().trim();
    var trainDest = $("#destination-input").val().trim();
    var trainStart = $("#startTime-input").val().trim();
    var trainFreq = $("#frequency-input").val().trim();
  

    var newTrain = {
      name: trainName,
      role: trainDest,
      start: trainStart,
      rate: trainFreq
    };
  
    database.ref().push(newTrain);
  

    console.log(newTrain.name);
    console.log(newTrain.role);
    console.log(newTrain.start);
    console.log(newTrain.rate);
  
    alert("Train successfully added");
  

    $("#name-input").val("");
    $("#destination-input").val("");
    $("#startTime-input").val("");
    $("#frequency-input").val("");
  });
  
  database.ref().on("child_added", function(childSnapshot) {
    console.log(childSnapshot.val());
  

    var trainName = childSnapshot.val().name;
    var trainDest = childSnapshot.val().role;
    var trainStart = childSnapshot.val().start;
    var trainFreq = childSnapshot.val().rate;

    console.log(trainName);
    console.log(trainDest);
    console.log(trainStart);
    console.log(trainFreq);


    var firstTimeConverted = moment(trainStart, "HH:mm").subtract(1, "years");
    console.log(firstTimeConverted);

    var currentTime = moment();
    console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

    // Difference between the times
    var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
    console.log(diffTime);

    // Time apart (remainder)
    var tRemainder = diffTime % trainFreq;
    console.log(tRemainder);

    // Minute Until Train
    var tMinutesTillTrain = trainFreq - tRemainder;
    console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

    // Next Train
    var nextTrain = moment().add(tMinutesTillTrain, "minutes");
    console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));

    // var trainStartPretty = moment(trainStartPretty, "HH:mm").subtract(1, "years");



    // var trainMinutes= moment().diff(moment(trainStartPretty), "minutes");
  

    // var tRemainder = trainMinutes % trainFreq;

    // var tMinutesTillTrain = trainFreq - tRemainder;

    // var nextTrain = moment().add(tMinutesTillTrain, "minutes");
  

    var newRow = $("<tr>").append(
      $("<td>").text(trainName),
      $("<td>").text(trainDest),
      $("<td>").text(trainFreq),
      $("<td>").text(moment(nextTrain).format("hh:mm A")),
      $("<td>").text(tMinutesTillTrain),
    );
  

    $("#train-table > tbody").append(newRow);
  });