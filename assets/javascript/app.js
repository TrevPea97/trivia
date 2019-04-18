var panel = $('#quiz-area');

//button to start and submit
$(document).on('click', '#start', function () {

  game.start();
});

$(document).on('click', '#done', function () {
  game.done();
});

//Trivia Questions and Answers 
var questions = [{
  question: '1. What is the name of Will Smiths character in Independence Day?',
  answers: ['Captain Steven Hiller<br>', 'Blade<br>', 'Hancock<br>', 'Ross<br>'],
   correctAnswer: 'Captain Steven Hiller '
}, {
  question: '2. What year was the song My Heart Will Go On <br> from Titanic released?',
  answers: ['1996<br>', '1999<br>', '1997<br>', '1993<br>'],
  correctAnswer: '1997 ',
}, {
  question: '3. Which 90s movie featured the Looney Tunes on its soundtrack?',
  answers: ['Who Framed Rodger Rabbit<br>', 'Space Jam <br>', 'Looney Tunes: Back in Action<br> ', 'Honey I Shrunk The Kids<br>'],
  correctAnswer: 'Space Jam '
}, {
  question: '4. Which 90s movie soundtrack is <br>the best-selling soundtrack of all time?',
  answers: ['The Lion King<br>', 'Sister Act<br>', 'The Bodyguard<br>', 'Grease<br>'],
  correctAnswer: 'The Bodygaurd '
}, {
  question: "5. I see dead people.",
  answers: ['Halloween<br>', 'The Silence of The Lambs<br>', 'The 6th Sense<br>', 'The Butterfly Effect<br>'],
  correctAnswer: 'The 6th Sense '
},{
  question: '6 .Who is the biggest selling female artist of the 90s?',
  answers: ['Beyonce<br>', 'Celine Dion<br>', 'Mariah Carey<br>', 'Madonna<br>'],
  CorrectAnswer: 'Mariah Carey '
}];


//Countdown clock
var game = {
  correct: 0,
  incorrect: 0,
  counter: 45,

  countdown: function () {
    game.counter--;
    $('#counter-number').html(game.counter);

    if (game.counter === 0) {
      console.log('TIME UP');
      game.done();
    }
  },
  start: function () {
    timer = setInterval(game.countdown, 1000);


    $('.container2').prepend('<h2>Time Remaining: <span id="counter-number">45</span> Seconds</h2>');
    $('#start').remove();


    //For loops to retreiving the info inputed by the user
    for (var i = 0; i < questions.length; i++) {
      panel.append('<h2>' + questions[i].question + '</h2>');

      for (var j = 0; j < questions[i].answers.length; j++) {
        panel.append('<input type="radio" name="question' + '-' + i + '" value="' + questions[i].answers[j] + '">' + questions[i].answers[j]);
      }
    }

    panel.append('<button id="done">SUBMIT</button>');
  },
  done: function () {


    $.each($("input[name='question-0']:checked"), function () {
      if ($(this).val() == questions[0].correctAnswer) {
        game.correct++;
      } else {
        game.incorrect++;
      }
    });

    $.each($("input[name='question-1']:checked"), function () {
      if ($(this).val() == questions[1].correctAnswer) {
        game.correct++;
      } else {
        game.incorrect++;
      }
    });

    $.each($("input[name='question-2']:checked"), function () {
      if ($(this).val() == questions[2].correctAnswer) {
        game.correct++;
      } else {
        game.incorrect++;
      }
    });

    $.each($("input[name='question-3']:checked"), function () {
      if ($(this).val() == questions[3].correctAnswer) {
        game.correct++;
      } else {
        game.incorrect++;
      }
    });

    $.each($("input[name='question-4']:checked"), function () {
      if ($(this).val() == questions[4].correctAnswer) {
        game.correct++;
      } else {
        game.incorrect++;
      }
    });

    $.each($("input[name='question-5']:checked"), function () {
      if ($(this).val() == questions[5].correctAnswer) {
        game.correct++;
      } else {
        game.incorrect++;
      }
    });

    $.each($("input[name='question-6']:checked"), function () {
      if ($(this).val() == questions[6].correctAnswer) {
        game.correct++;
      } else {
        game.incorrect++;
      }
    });

    this.result();
  },

  //display the results for the user.
  result: function () {

    clearInterval(timer);

    $('.container2 h2').remove();
    panel.html('<h2>All Done!</h2>');
    panel.append('<h3>Correct Answers: ' + this.correct + '</h3>');
    panel.append('<h3>Incorrect Answers: ' + this.incorrect + '</h3>');
    panel.append('<h3>Unanswered: ' + (questions.length - (this.correct + this.incorrect)) + '</h3>');
  }

};