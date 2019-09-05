var firebaseConfig = {
    apiKey: "AIzaSyB2liN7lGuNAuYqiG7tgFNKYXc2vnJ407s",
    authDomain: "train-scheduler-36e6c.firebaseapp.com",
    databaseURL: "https://train-scheduler-36e6c.firebaseio.com",
    projectId: "train-scheduler-36e6c",
    storageBucket: "",
    messagingSenderId: "832179023519",
    appId: "1:832179023519:web:98a284445180f43f89fcaa"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  
  var database = firebase.database();
  
  // 2. Button for adding Employees
  $("#add-train-btn").on("click", function(event) {
    event.preventDefault();
  
    // Grabs user input
    var trainName = $("#train-name-input").val().trim();
    var trainDest = $("#destination-input").val().trim();
    var trainStart = moment($("#time-input").val().trim(), "MM/DD/YYYY").format("X");
    var trainFreq = $("#freq-input").val().trim();
  
    // Creates local "temporary" object for holding employee data
    var newTrain = {
      name: trainName,
      destination: trainDest,
      start: trainStart,
      frequency: trainFreq
    };
  
    // Uploads employee data to the database
    database.ref().push(newTrain);
  
    // Logs everything to console
    console.log(newTrain.name);
    console.log(newTrain.destination);
    console.log(newTrain.start);
    console.log(newTrain.frequency);
  
  
    // Clears all of the text-boxes
    $("#train-name-input").val("");
    $("#destination-input").val("");
    $("#start-input").val("");
    $("#freq-input").val("");
  });
  
  // 3. Create Firebase event for adding employee to the database and a row in the html when a user adds an entry
  database.ref().on("child_added", function(childSnapshot) {
    console.log(childSnapshot.val());
  
    // Store everything into a variable.
    var trainName = childSnapshot.val().name;
    var trainDest = childSnapshot.val().destination;
    var trainStart = childSnapshot.val().start;
    var trainFreq = childSnapshot.val().frequency;
  
    // Employee Info
    console.log(trainName);
    console.log(trainDest);
    console.log(trainStart);
    console.log(trainFreq);
  
    // Prettify the employee start
    var trainStartPretty = moment.unix(trainStart).format("MM/DD/YYYY");
  
    // Calculate the months worked using hardcore math
    // To calculate the months worked
    var nextArrival = moment().diff(moment(trainStart, "X"), "months");
    console.log(nextArrival);
  
  
    // Create the new row
    var newRow = $("<tr>").append(
      $("<td>").text(trainName),
      $("<td>").text(trainDest),
      $("<td>").text(empStartPretty),
      $("<td>").text(nextArrival),
      $("<td>").text(trainFreq)
     
    );
  
    // Append the new row to the table
    $("#train-table > tbody").append(newRow);
  });