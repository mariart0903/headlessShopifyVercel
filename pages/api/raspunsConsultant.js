import {sendMethodNotAllowed, sendBadRequest, sendOk} from "../../utils/apiMethods";
import {openai} from "../../utils/openai";

const SYSTEM_PROMPTS = {
	MICHAEL_SCOTT: {
		MESSAGE: {
			'role': 'system',
			'content': 'You are pretending to be Michael Scott from The Office. You try to be funny, occasionally making "That\'s what she said" jokes.',
		},
		TEMPERATURE: 1,
		MAX_TOKENS: 100,
		TYPE: 'michael_scott',
	},
	COSMETIC_CONSULTANT: {
		MESSAGE: {
			'role': 'system',
			'content': 'Te prefaci ca esti un consultant cosmetic si raspunzi la intrebari despre produsele cosmetice si metode de machiaj. Rolul tau principal este de a ajuta persoanele să aleagă și să utilizeze cosmeticele potrivite pentru a-și îmbunătăți aspectul și a satisface nevoile specifice.',
		},
		TEMPERATURE: 0.2,
		MAX_TOKENS: 500,
		TYPE: 'cosmetic_consultant',
	},
};

const ERRORS = {
	WRONG_CONVERSATION_TYPE: {
		type: 'wrong_conversation_type',
		message: 'Tipul conversației nu este cunoscut.',
	},
	OPEN_AI_ERROR: {
		type: 'open_ai_error',
		message: 'Eroare la procesarea cererii.',
	},
};

const chatCompletion = async (messagesArray, max_tokens, temperature = 1) => {
	const rawResponse = await openai.createChatCompletion({
		model: 'gpt-3.5-turbo',
		messages: messagesArray,
		max_tokens: max_tokens,
		temperature: temperature,
	});

	return rawResponse?.data?.choices[0];
};

const converseChat = async (res, inputChat, useCase) => {
	try {
		const MAX_MEMORY = 3;
		let userMessagesArray = [];

		if (inputChat.length > MAX_MEMORY) {
			userMessagesArray = inputChat.slice(-1 * MAX_MEMORY);
		} else {
			userMessagesArray = inputChat;
		}

		const messagesArray = [
			useCase.MESSAGE,
			...userMessagesArray
		];

		const response = await chatCompletion(messagesArray, useCase.MAX_TOKENS, useCase.TEMPERATURE);
		return sendOk(res, response);
	} catch (error) {
		return sendBadRequest(res, ERRORS.OPEN_AI_ERROR.type, ERRORS.OPEN_AI_ERROR.message);
	}

};
const converse = (res, input, type) => {
	switch (type) {
		case SYSTEM_PROMPTS.COSMETIC_CONSULTANT.TYPE:
			return converseChat(res, input, SYSTEM_PROMPTS.COSMETIC_CONSULTANT);
		default:
			return sendBadRequest(res, ERRORS.WRONG_CONVERSATION_TYPE.message);
	}
};

export default function handler(req, res) {
	const isAllowedMethod = req.method === 'POST';

	const {
		messages,
		type
	} = req.body;

	if (!messages) {
		return sendBadRequest(res, 'Continutul intrarii este gol.');
	} else if (!type) {
		return sendBadRequest(res, 'wrong_conversation_type');
	} else if (!isAllowedMethod) {
		return sendMethodNotAllowed(res);
	}

	try {
		if (req.method === 'POST') {
			return converse(res, messages, type);
		} else {
			return sendMethodNotAllowed(res);
		}
	} catch (error) {
		console.error(error);
		return sendBadRequest(res, ERRORS.OPEN_AI_ERROR.type, ERRORS.OPEN_AI_ERROR.message);
	}
}