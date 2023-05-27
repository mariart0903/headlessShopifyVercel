import {Configuration, OpenAIApi,} from 'openai';

if (!process.env.OPENAI_API_KEY) {
	throw new Error('API KEY nu a fost adaugat in .env');
}

const configuration = new Configuration({
	apiKey: process.env.OPENAI_API_KEY,
});


export const openai = new OpenAIApi(configuration);