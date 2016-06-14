$(document).ready(function() {
//Array holds objects for each question. Answer is set as the index of its location in the array of choices
	var questions = [{
			'image': "assets/images/bacardi.jpg",
			'choices': ["Bacardi", "Johnny Walker", "Smirnoff", "Hennessy"],
			'correct': 0
			}, {
			'image': "assets/images/github.jpg",
			'choices': ["Indeed", "Github", "Linkedin", "Google"],
			'correct': 1
			}, {
			'image': "assets/images/nbc.jpg",
			'choices': ["ABC", "FOX", "NBC", "CBS"],
			'correct': 2
			}, {
			'image': "assets/images/nike.jpg",
			'choices': ["Addidas", "Puma", "Nike", "Reebok"],
			'correct': 2
			}, {
			'image': "assets/images/playboy.jpg",
			'choices': ["Duracell", "Bugs Bunny", "Trix", "Playboy"],
			'correct': 3
			}, {
			'image': "assets/images/reddit.jpg",
			'choices': ["Reddit", "StumbleUpon", "9Gag", "NewsVine"],
			'correct': 0
			}, {
			'image': "assets/images/spotify.jpg",
			'choices': ["Hulu", "Spotify", "Pandora", "Itunes"],
			'correct': 1
			}, {
			'image': "assets/images/toyota.jpg",
			'choices': ["Nissan", "Honda", "Toyota", "Dodge"],
			'correct': 2
			}, {
			'image': "assets/images/twitter.jpg",
			'choices': ["Myspace", "Instagram", "Facebook", "Twitter"],
			'correct': 3
			}, {
			'image': "assets/images/wikipedia.jpg",
			'choices': ["Dictionary", "Wikipedia", "Britannica", "About"],
			'correct': 1
			}
	]
	//set global variables, hide certain elements
	var index = 0; //holds the quiz question #
	var correct = 0;
	var wrong = 0;
	var unanswered = 0;
	var time = 10; //time per question
	var questionCounter; //first setInterval for questions
	var nextQuestionCounter; //second one used for time between displaying correct/incorrect before showing next question
	var answer;

	$('#replaygame').hide();
	$('#startgame').on('click', startGame);

	//click handler for replay button, need to reset all values to zero for next game
	$('#replaygame').on('click', function () {
		index = 0;
	    	correct = 0;
	    	wrong = 0;
	    	unanswered = 0;
	    	startGame();
	    	$(this).hide();
    	});

	// Checks if index is undefined (end of questions array) and display total score 
	// Clears quiz space and renders next question with choices. 
	// Grabs the current question based on the index var.
	// Clears the interval for nextQuestionCounter so additional clicks on choices will not build on each other and increase 
	// the speed between showing each question. 
	// Starts timer for question. 	
	function startGame() {
		if (questions[index] === undefined) {		
			$('.logo, .choicesarea, #show-time').empty();
			$('#replaygame').show();
			var score = '<p>Correct Answers: ' + correct + '</p>' + 
					'<p>Wrong Answers: ' + wrong + '</p>' +
					'<p>Unanswered: ' + unanswered + '</p>';	
			$('#score').html(score);
		}; 
		clearInterval(nextQuestionCounter);
		$('.content').hide().fadeIn(1000);
		$('.logo').html('<img src=' + questions[index].image + ' />'); //append question/image
		$('.choicesarea').html(''); 
		$('#score').html(''); //clears score space from previous game
		for (var i = 0; i < questions[index].choices.length; i++) {
			var choicesDiv = '<div class="choices" data-choice ="' + i + '">';
			$('.choicesarea').append(choicesDiv + questions[index].choices[i] + '</div>');
		}; //append all possible choices
		runTimer();
	};

	checkAnswer();
	 
	// Check data value against the correct answer stored in object when a choice is clicked. 
	// Increase correct counter if correct and decrease if wrong. 
	// Appends correct/incorrect message for 3 seconds before next question is shown. 
	// Reset timer to 10 seconds. Counter will be cleared to prevent the function from stacking the count and speed 
 
	function checkAnswer() {
		$('.choicesarea').on('click', '.choices', function() {
			answer = questions[index].choices[questions[index].correct];
			if ($(this).data('choice') === questions[index].correct) {
				correct++;
				$('#correct').html('<h3>' + correct + '</h3>');
				$('.choicesarea').html('Correct! This logo belongs to ' + answer);
				clearInterval(questionCounter); //stop timer
				time = 10; // reset time
				index++; // increase index to move to next question in object
				nextQuestion();
			} else if ($(this).val() !== questions[index].correct) {
				wrong++;
				$('#wrong').html('<h3>' + wrong + '</h3>');			
				$('.choicesarea').html('Wrong, the correct answer is ' + answer + '!');
				clearInterval(questionCounter);
				time = 10;
				index++;
				nextQuestion();
			}	
		});
	};

	// Starts the stopclock and display on webpage. 
	// Set the condition if time hits 0 to clear interval, display correct answer. 
	// Move onto the next question after 3 seconds of diplaying correct/incorrect.

    	function runTimer(){
    		questionCounter = setInterval(decreaseTime, 1000);
    	};
    	function decreaseTime(){
	    	time--;
	    	answer = questions[index].choices[questions[index].correct];
	        $('#show-time').html('<h2>Time remaining for question: ' + time + '</h2>'); 
	        if (time === 0){
		        unanswered++;
			$('#unanswered').html('<h3>' + unanswered + '</h3>');
			$('.choicesarea').html('The correct answer is ' + answer + '!');
			clearInterval(questionCounter);
			time = 10;
			index++;
			nextQuestion();
	        };	  
	};
    // delays next question from showing for 3 secs for the correct/incorrect msg to show
    	function nextQuestion() {
    		nextQuestionCounter = setInterval(startGame, 3000);
    	};
});



/* Things I need to do
- fix the clear interval when it displays correct answer
- fix giant radio buttons
- make game restart with button click
- make it look less ugly
- indent everything properly, questions[index] repeats too much
- remove this
*/
