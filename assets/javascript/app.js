$(document).ready(function () {

  // event listeners
  $("#remaining-time").hide();
  $("#start").on('click', trivia.startGame);
  $(document).on('click', '.option', trivia.guessChecker);

})

var trivia = {
  // trivia properties
  correct: 0,
  incorrect: 0,
  unanswered: 0,
  currentSet: 0,
  timer: 20,
  timerOn: false,
  timerId: '',
  // questions options and answers data
  questions: {
    q1: 'What is the name of Will Smiths character in Independence Day?',
    q2: 'What year was the song My Heart Will Go On from Titanic released?',
    q3: 'Which 90s movie featured the Looney Tunes on its soundtrack?',
    q4: 'Which 90s movie soundtrack is the best-selling soundtrack of all time?',
    q5: "I see dead people.",
    q6: 'Who is the biggest selling female artist of the 90s?'
    q7: "This 90s rapper was shot and killed in Los Angeles"
  },
  options: {
    q1: ['Captain Steven Hiller', 'Blade', 'Hancock', 'Ross'],
    q2: ['1996', '1999', '1997', '1993'],
    q3: ['Who Framed Rodger Rabbit', 'Space Jam ', 'Looney Tunes: Back in Action ', 'Honey I Shrunk The Kids'],
    q4: ['The Lion King ', 'Sister Act ', 'The Bodyguard', 'Grease'],
    q5: ['Halloween', 'The Silence of The Lambs', 'The 6th Sense', 'The Butterfly Effect'],
    q6: ['Beyonce', 'Celine Dion', 'Mariah Carey', 'Madonna'],
    q7: ['Ice Cube', 'Biggie Smalls', 'Tupac', 'O.D.B.']
  },
  answers: {
    q1: 'Captain Steven Hiller ',
    q2: '1997',
    q3: 'Space Jam',
    q4: 'The Bodygaurd',
    q5: 'The 6th Sense',
    q6: 'Mariah Carey',
    q7: 'Biggie Smalls'
  },
  // trivia methods
  // method to initialize game
  startGame: function () {
    // restarting game results
    trivia.currentSet = 0;
    trivia.correct = 0;
    trivia.incorrect = 0;
    trivia.unanswered = 0;
    clearInterval(trivia.timerId);

    // show game section
    $('#game').show();

    //  empty last results
    $('#results').html('');

    // show timer
    $('#timer').text(trivia.timer);

    // remove start button
    $('#start').hide();

    $('#remaining-time').show();

    // ask first question
    trivia.nextQuestion();

  },
  // method to loop through and display questions and options 
  nextQuestion: function () {

    // set timer to 20 seconds each question
    trivia.timer = 10;
    $('#timer').removeClass('last-seconds');
    $('#timer').text(trivia.timer);

    // to prevent timer speed up
    if (!trivia.timerOn) {
      trivia.timerId = setInterval(trivia.timerRunning, 1000);
    }

    // gets all the questions then indexes the current questions
    var questionContent = Object.values(trivia.questions)[trivia.currentSet];
    $('#question').text(questionContent);

    // an array of all the user options for the current question
    var questionOptions = Object.values(trivia.options)[trivia.currentSet];

    // creates all the trivia guess options in the html
    $.each(questionOptions, function (index, key) {
      $('#options').append($('<button class="option btn btn-info btn-lg">' + key + '</button>'));
    })

  },
  // method to decrement counter and count unanswered if timer runs out
  timerRunning: function () {
    // if timer still has time left and there are still questions left to ask
    if (trivia.timer > -1 && trivia.currentSet < Object.keys(trivia.questions).length) {
      $('#timer').text(trivia.timer);
      trivia.timer--;
      if (trivia.timer === 4) {
        $('#timer').addClass('last-seconds');
      }
    }
    // the time has run out and increment unanswered, run result
    else if (trivia.timer === -1) {
      trivia.unanswered++;
      trivia.result = false;
      clearInterval(trivia.timerId);
      resultId = setTimeout(trivia.guessResult, 1000);
      $('#results').html('<h3>Out of time! The answer was ' + Object.values(trivia.answers)[trivia.currentSet] + '</h3>');
    }
    // if all the questions have been shown end the game, show results
    else if (trivia.currentSet === Object.keys(trivia.questions).length) {

      // adds results of game (correct, incorrect, unanswered) to the page
      $('#results')
        .html('<h3>Thank you for playing!</h3>' +
          '<p>Correct: ' + trivia.correct + '</p>' +
          '<p>Incorrect: ' + trivia.incorrect + '</p>' +
          '<p>Unaswered: ' + trivia.unanswered + '</p>' +
          '<p>Please play again!</p>');

      // hide game sction
      $('#game').hide();

      // show start button to begin a new game
      $('#start').show();
    }

  },
  // method to evaluate the option clicked
  guessChecker: function () {

    // timer ID for gameResult setTimeout
    var resultId;

    // the answer to the current question being asked
    var currentAnswer = Object.values(trivia.answers)[trivia.currentSet];

    // if the text of the option picked matches the answer of the current question, increment correct
    if ($(this).text() === currentAnswer) {
      // turn button green for correct
      $(this).addClass('btn-success').removeClass('btn-info');

      trivia.correct++;
      clearInterval(trivia.timerId);
      resultId = setTimeout(trivia.guessResult, 1000);
      $('#results').html('<h3>Correct Answer!</h3>');
    }
    // else the user picked the wrong option, increment incorrect
    else {
      // turn button clicked red for incorrect
      $(this).addClass('btn-danger').removeClass('btn-info');

      trivia.incorrect++;
      clearInterval(trivia.timerId);
      resultId = setTimeout(trivia.guessResult, 1000);
      $('#results').html('<h3>Better luck next time! ' + currentAnswer + '</h3>');
    }

  },
  // method to remove previous question results and options
  guessResult: function () {

    // increment to next question set
    trivia.currentSet++;

    // remove the options and results
    $('.option').remove();
    $('#results h3').remove();

    // begin next question
    trivia.nextQuestion();

  }

}



$(document).on("click", "#startClock", function() {
  var timer = 50;
  setInterval(function() {
      timer--;
  if (timer >= 0) {
      span = document.getElementById("count");
      span.innerHTML = timer;
  }
  if (timer === 0) {
      alert('time is up!');
      clearInterval(timer);
  }
  }, 1000);

  function finish () {
  $.each($("input[id='q1b']:checked"), function() {
  if ($(this).val() === q1b) {
      game.correct++;
  }
  else {
      game.incorrect++;
  }
  });

  $.each($("input[id='q2d']:checked"), function() {
  if ($(this).val() === q2d) {
      game.correct++;
  }
  else {
      game.incorrect++;
  }
  });

  $.each($("input[id='q3c']:checked"), function() {
  if ($(this).val() === q3c) {
      game.correct++;
  }
  else {
      game.incorrect++;
  }
  });

  $.each($("input[id='q4a']:checked"), function() {
  if ($(this).val() === q4a) {
      game.correct++;
  }
  else {
      game.incorrect++;
  }
  });

  $.each($("input[id='q5b']:checked"), function() {
  if ($(this).val() === q5b) {
      game.correct++;
  }
  else {
      game.incorrect++;
  }
  });

  this.result();

  }

  function result() {
  clearInterval(timer);
  $("#sresults h2").remove();
  panel.html("<h2>All Done!</h2>");
  panel.append("<h3>Correct Answers: " + this.correct + "</h3>");
  panel.append("<h3>Incorrect Answers: " + this.incorrect + "</h3>");
  panel.append("<h3>Unanswered: " + (questions.length - (this.incorrect + this.correct)) + "</h3>");
  }

  function finish(){
  number = 1;
  clearInterval(timer);
  }

  function restart(){
  number = 50;
  start();
  }
  };

$(document).on("click", "#restart", function() {
  game.restart();
});

$(document).on("click", "#submit", function() {
  game.done();
});


