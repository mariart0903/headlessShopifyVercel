export const startSpeechRecognition = (setSearchTerm, setIsListening) => {
	// Create a SpeechRecognition object
	if (!('webkitSpeechRecognition' in window)) {
		console.log('Web Speech API is not supported in this browser.');
		return;
	}
	setIsListening(true);
	const recognition = new webkitSpeechRecognition();
	// Set the language for speech recognition
	recognition.lang = 'ro';

	// Start speech recognition
	recognition.start();

	// Event handler for when speech is recognized
	recognition.onresult = function (event) {
		// Get the recognized speech transcript
		const transcript = event.results[0][0].transcript;

		// Print the recognized speech
		setSearchTerm(transcript);
		setIsListening(false);
	};

	// Event handler for speech recognition errors
	recognition.onerror = function (event) {
		console.error('Speech recognition error: ', event.error);
	};
}

export const checkSpeechRecognition = () => {
	if (!('webkitSpeechRecognition' in window)) {
		return false;
	}
	return true;
}