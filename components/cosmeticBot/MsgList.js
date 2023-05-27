import React, {useEffect, useRef,} from 'react';

export default function MsgList(props) {
	const messagesEndRef = useRef(null);

	const {chatMessages,} = props;

	const scrollToBottom = () => {
		messagesEndRef.current.scrollIntoView({behavior: 'smooth',});
	};
	useEffect(scrollToBottom, [chatMessages]);

	return (
		<div className={'h-[400px] md:h-[600px] overflow-auto px-[20px]'}>
			<ul className={'divide-y divide-gray-200'}>
				<li className={'py-3'}>
					<span className={`text-green-800 font-bold`}>
						Consultant virtual: &nbsp;
					</span>
					<span>
						Bună! Sunt consultantul tău virtual. Cum te pot ajuta?
					</span>
				</li>
				{chatMessages.map((message, index) => {
					return (
						<li className={'py-3'} key={index}>
							<p>
								<span
									className={`${message.role === 'assistant' ? 'text-green-800' : 'text-blue-800'} font-bold`}>
								{message.role === 'assistant' ? 'Consultant virtual: ' : 'Tu: '}
							</span>
								<span>
								{message.content}
							</span>
							</p>
						</li>
					);
				})
				}
			</ul>
			<div ref={messagesEndRef}/>
		</div>
	);
}