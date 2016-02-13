// Set up buttons 
for(var i = 0; i < 26; i++) {
	var charCode = 65 + i;
	var letter = String.fromCharCode(charCode);

	// Add button to #letters div
	$('#letters').append('<button>' + letter + '</button>');
}

// Array of words
var words = [
	"apple",
	"banana",
	"pear",
	"lemon"
];
var hiddenWord;
var numGuesses;

function setupGame() {
	// Pick a random word
	var randomIndex = Math.floor(Math.random()*words.length);
	hiddenWord = words[randomIndex];
	console.log(hiddenWord);

	// Clear the blanks
	$('#blanks').html('');

	// Set up blanks
	for(var i = 0; i < hiddenWord.length; i++) {
		$('#blanks').append('<span>_</span>');
	}

	// Set up # of guesses
	numGuesses = 10;
	$('#guesses').html(numGuesses);

	// Re-enable all the buttons
	$('#letters button').prop('disabled', false);
}

// When user clicks on a button
$('#letters button').click(function() {
	// Get the letter from the button
	var buttonLetter = $(this).html();

	var guessedRight = false;
	
	// Check each letter in the word to see if it's a match
	for(var i = 0; i < hiddenWord.length; i++) {

		if(buttonLetter.toLowerCase() === hiddenWord[i]) {
			// Replace the blank with the letter
			$('#blanks span').eq(i).html(buttonLetter);
			guessedRight = true;
		}
	}

	// Disable the button
	$(this).prop("disabled", true);

	// Check our #blanks for underscores
	var foundBlanks = false;
	for(var i = 0; i < hiddenWord.length; i++) {
		if($('#blanks span').eq(i).html() === '_') {
			foundBlanks = true;
			break;
		}
	}

	// If we didn't find any blanks
	if(!foundBlanks) {
		alert('You win!');
		setupGame();
	}
	else if(numGuesses === 0) { // If they're out of guesses
		alert('You lose!');
		setupGame();
	}
	else if(!guessedRight) { // If they guessed wrong
		// Decrease the number of guesses
		numGuesses--;
		$('#guesses').html(numGuesses);
	}

});

// Start a game on page load
setupGame();