import React from 'react';
import MsgList from "./MsgList";

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

const filterChatHistory = chatHistory => {
	const filteredChatHistory = [];
	for (let i = 0; i < chatHistory.length; i++) {
		const currMessage = chatHistory[i];
		const nextMessage = chatHistory[i + 1];

		if (i === chatHistory.length - 1 || (currMessage.type !== 'error' && nextMessage?.type !== 'error' && currMessage.role !== nextMessage?.role)) {
			filteredChatHistory.push(currMessage);
		}
	}

	return filteredChatHistory;
};

const buildResponseMessageObject = response => {
	let responseMessageObject;

	if (!response?.data?.message) {

		const errorType = response?.error_type;
		let errorMessage;

		switch (errorType) {
			case ERRORS.OPEN_AI_ERROR.type:
				errorMessage = 'Eroare la procesarea cererii. Vă rugăm să încercați din nou mai târziu.';
				break;
			default:
				errorMessage = 'Ceva n-a mers bine. Vă rugăm să încercați din nou mai târziu.';
		}

		responseMessageObject = {
			type: 'error',
			content: errorMessage,
		};
	} else {
		responseMessageObject = response.data.message;
	}

	return responseMessageObject;
};

export default function ChatBot(props) {
	const [chatMessages, setChatMessages] = React.useState([]);
	const [isLoading, setIsLoading] = React.useState(false);

	const handleKeyDown = async event => {
		if (event.key === 'Enter') {
			if (!event.target.value)
				return;
			setIsLoading(true);
			const currentMessage = event.target.value;
			event.target.value = '';
			event.target.disabled = true;

			const currentMessageObject = {
				role: 'user',
				content: currentMessage,
			};

			setChatMessages(prevChat => [...prevChat, currentMessageObject]);
			const currentChatHistory = [...chatMessages, currentMessageObject];
			const filteredChatHistory = filterChatHistory(currentChatHistory);

			try {
				let response = await fetch('/api/raspunsConsultant', {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify({
						messages: filteredChatHistory,
						type: 'cosmetic_consultant',
					}),
					signal: AbortSignal.timeout(1000000),
				})
				response = await response.json();
				event.target.disabled = false;
				event.target.focus();


				const responseMessageObject = buildResponseMessageObject(response);
				setChatMessages(prevChat => [...prevChat, responseMessageObject]);
				setIsLoading(false);
			} catch (error) {
				event.target.disabled = false;
				event.target.focus();
				console.log(error);

				const responseMessageObject = buildResponseMessageObject(ERRORS.OPEN_AI_ERROR);
				setChatMessages(prevChat => [...prevChat, responseMessageObject]);
				setIsLoading(false);
			}

		}
	};

	return (
		<div
			id='ChatBox'
			className={'w-full max-w-[1500px] mx-auto bg-white rounded-lg'}>
			<div className={'text-center px-[20px] py-[10px] flex flex-wrap justify-center items-center mb-4'}>
					<span className={'text-md font-bold text-gray-900 w-full py-4'}>
						Bun venit în spațiul tău cosmetic virtual! Sunt aici pentru a oferi sfaturi și îndrumări de specialitate cu privire la orice informații legate de cosmetică, indiferent dacă aveți nevoie de recomandări de produse, sfaturi de îngrijire a pielii sau tehnici de machiaj. Simțiți-vă liber să-mi puneți orice întrebare!
					</span>
				{isLoading && (
					<div role="status">
						<svg aria-hidden="true"
							 className="inline w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-purple-600"
							 viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
							<path
								d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
								fill="currentColor"/>
							<path
								d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
								fill="currentFill"/>
						</svg>
						<span className="sr-only">Se incarca...</span>
					</div>
				)}
			</div>
			<div className={'border border-b-0 rounded-lg border-gray-300 py-4'}>
				<MsgList chatMessages={chatMessages}/>
				<div className="px-4">
					<input
						id={'chat-input'}
						type={'text'}
						className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-4"
						placeholder="Tastează întrebarea..."
						onKeyDown={handleKeyDown}/>
				</div>
			</div>
		</div>
	);
}