import react from "react";
import {useFormik, Field, FormikProvider} from "formik";
import {QuizproductsQuery} from "../../../utils/queries";
import {storefront} from "../../../utils";
import SearchItem from '../../ProductComponents/SearchItem';
import React from "react";
import {lookInfo} from "../../../utils/constants";
import {buildResponseMessageObject, ERRORS} from "../../cosmeticBot/ChatBot";

const inputClasses = 'absolute bottom-0 opacity-0';
const labelClasses = 'block text-gray-900 text-md font-bold p-2 rounded-lg cursor-pointer transition-all duration-300 ease-in-out';

const Quiz = () => {
	const [recommendedProducts, setRecommendedProducts] = react.useState([]);
	const [chatResponse, setChatResponse] = react.useState('');
	const [isLoading, setIsLoading] = react.useState(false);

	const formik = useFormik({
		initialValues: {
			tipTen: '',
			tipAcoperire: '',
			culoareOchi: '',
			culoarePar: '',
			mascaraEfect: '',
			lookPreferat: '',
		},
		onSubmit: async values => {
			const valuesArray = Array.from(Object.values(values));
			const valuesArrayString = valuesArray.join(' OR ');
			const {data: {products: {edges} = {}} = {}} = await storefront(QuizproductsQuery, {
				tag: valuesArrayString,
			});
			setRecommendedProducts(edges);
			try {
				setIsLoading(true);
				let response = await fetch('/api/raspunsConsultant', {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify({
						messages: [{
							"role": "user",
							"content": `Ce sfaturi imi poti da pentru a obtine un look ${lookInfo[values.lookPreferat]}`
						}],
						type: 'cosmetic_consultant',
					}),
					signal: AbortSignal.timeout(60000),
				})
				response = await response.json();
				const responseMessageObject = buildResponseMessageObject(response);
				setChatResponse(responseMessageObject?.content);
				setIsLoading(false);
			} catch (error) {
				console.log(error);
				setIsLoading(false);
				const responseMessageObject = buildResponseMessageObject(ERRORS.OPEN_AI_ERROR);
			}
		},
	});

	const renderRecommendations = () => {
		return recommendedProducts?.map((product, idx) => {
			return (
				<SearchItem key={idx} product={product.node}/>
			);
		});
	};

	const renderChatResponse = () => {
		if (chatResponse.length > 0) return <div className="bg-white rounded-xl py-2">
			<p className="text-center text-lg font-medium text-gray-800 py-2 w-full">{chatResponse}</p>
		</div>;
		else return null;
	}

	const handleReset = () => {
		formik.resetForm();
		setRecommendedProducts([]);
		setIsLoading(false);
		setChatResponse('');
	};

	return (
		<div>
			<FormikProvider value={formik}>
				<form onSubmit={formik.handleSubmit} className="bg-white p-2 rounded-lg flex flex-wrap justify-center">
					<div role="group"
						 className="bg-gray-100 rounded-xl mb-2 px-2 pb-2 w-full flex flex-wrap items-center justify-center"
						 aria-labelledby="my-radio-group1">
						<p className="text-lg font-medium italic text-gray-800 py-2 w-full text-center">Care este tipul
							tău
							de ten?</p>
						<div className="flex gap-[16px] flex-wrap justify-center items-center">
							<label className="relative">
								<Field className={`${inputClasses}`}
									   required
									   type="radio" name="tipTen" value="q-ten-uscat"/>
								<span
									className={`${labelClasses} ${formik.values.tipTen === 'q-ten-uscat' ? ' bg-indigo-400' : 'bg-indigo-200'}`}>Uscat</span>
							</label>
							<label className="relative">
								<Field className={`${inputClasses}`} type="radio" name="tipTen" value="q-ten-normal"/>
								<span
									className={`${labelClasses} ${formik.values.tipTen === 'q-ten-normal' ? ' bg-indigo-400' : 'bg-indigo-200'}`}>Normal</span>
							</label>
							<label className="relative">
								<Field className={`${inputClasses}`} type="radio" name="tipTen" value="q-ten-gras"/>
								<span
									className={`${labelClasses} ${formik.values.tipTen === 'q-ten-gras' ? ' bg-indigo-400' : 'bg-indigo-200'}`}>Gras</span>
							</label>
							<label className="relative">
								<Field className={`${inputClasses}`} type="radio" name="tipTen" value="q-ten-mixt"/>
								<span
									className={`${labelClasses} ${formik.values.tipTen === 'q-ten-mixt' ? ' bg-indigo-400' : 'bg-indigo-200'}`}>Mixt</span>

							</label>
						</div>
					</div>
					<div role="group"
						 className="bg-gray-100 rounded-xl mb-2 px-2 pb-2 w-full flex flex-wrap items-center justify-center"
						 aria-labelledby="my-radio-group2">
						<p className="text-lg font-medium italic text-gray-800 py-2 w-full text-center">Ce tip de
							acoperire
							preferi
							pentru
							fondul de ten?</p>
						<div className="flex gap-[16px] flex-wrap justify-center items-center">
							<label className="relative">
								<Field className={`${inputClasses}`} required type="radio" name="tipAcoperire"
									   value="q-acop-usoara"/>
								<span
									className={`${labelClasses} ${formik.values.tipAcoperire === 'q-acop-usoara' ? ' bg-indigo-400' : 'bg-indigo-200'}`}>Ușoară</span>
							</label>
							<label className="relative">
								<Field className={`${inputClasses}`} type="radio" name="tipAcoperire"
									   value="q-acop-medie"/>
								<span
									className={`${labelClasses} ${formik.values.tipAcoperire === 'q-acop-medie' ? ' bg-indigo-400' : 'bg-indigo-200'}`}>Medie</span>
							</label>
							<label className="relative">
								<Field className={`${inputClasses}`} type="radio" name="tipAcoperire"
									   value="q-acop-mare"/>
								<span
									className={`${labelClasses} ${formik.values.tipAcoperire === 'q-acop-mare' ? ' bg-indigo-400' : 'bg-indigo-200'}`}>Mare</span>
							</label>
						</div>
					</div>
					<div role="group"
						 className="bg-gray-100 rounded-xl mb-2 px-2 pb-2 w-full flex flex-wrap items-center justify-center"
						 aria-labelledby="my-radio-group3">
						<p className="text-lg font-medium italic text-gray-800 py-2 w-full text-center">Ce tip de
							Care este culoarea ochilor tăi?</p>
						<div className="flex gap-[16px] flex-wrap justify-center items-center">
							<label className="relative">
								<Field className={`${inputClasses}`} required type="radio" name="culoareOchi"
									   value="q-ochi-colorati"/>
								<span
									className={`${labelClasses} ${formik.values.culoareOchi === 'q-ochi-colorati' ? ' bg-indigo-400' : 'bg-indigo-200'}`}>Albaștri/verzi</span>
							</label>
							<label className="relative">
								<Field className={`${inputClasses}`} type="radio" name="culoareOchi"
									   value="q-ochi-caprui"/>
								<span
									className={`${labelClasses} ${formik.values.culoareOchi === 'q-ochi-caprui' ? ' bg-indigo-400' : 'bg-indigo-200'}`}>Caprui</span>
							</label>
							<label className="relative">
								<Field className={`${inputClasses}`} type="radio" name="culoareOchi"
									   value="q-ochi-negri"/>
								<span
									className={`${labelClasses} ${formik.values.culoareOchi === 'q-ochi-negri' ? ' bg-indigo-400' : 'bg-indigo-200'}`}>Negri</span>
							</label>
						</div>
					</div>
					<div role="group"
						 className="bg-gray-100 rounded-xl mb-2 px-2 pb-2 w-full flex flex-wrap items-center justify-center"
						 aria-labelledby="my-radio-group4">
						<p className="text-lg font-medium italic text-gray-800 py-2 w-full text-center">Care este
							culoarea
							părului
							tău?</p>
						<div className="flex gap-[16px] flex-wrap justify-center items-center">
							<label className="relative">
								<Field className={`${inputClasses}`} required type="radio" name="culoarePar"
									   value="q-par-blond"/>
								<span
									className={`${labelClasses} ${formik.values.culoarePar === 'q-par-blond' ? ' bg-indigo-400' : 'bg-indigo-200'}`}>Blond</span>
							</label>
							<label className="relative">
								<Field className={`${inputClasses}`} type="radio" name="culoarePar"
									   value="q-par-brunet"/>
								<span
									className={`${labelClasses} ${formik.values.culoarePar === 'q-par-brunet' ? ' bg-indigo-400' : 'bg-indigo-200'}`}>Brunet</span>
							</label>
							<label className="relative">
								<Field className={`${inputClasses}`} type="radio" name="culoarePar"
									   value="q-par-saten"/>
								<span
									className={`${labelClasses} ${formik.values.culoarePar === 'q-par-saten' ? ' bg-indigo-400' : 'bg-indigo-200'}`}>Șaten</span>
							</label>
							<label className="relative">
								<Field className={`${inputClasses}`} type="radio" name="culoarePar"
									   value="q-par-roscat"/>
								<span
									className={`${labelClasses} ${formik.values.culoarePar === 'q-par-roscat' ? ' bg-indigo-400' : 'bg-indigo-200'}`}>Roscat</span>
							</label>
						</div>
					</div>
					<div role="group"
						 className="bg-gray-100 rounded-xl mb-2 px-2 pb-2 w-full flex flex-wrap items-center justify-center"
						 aria-labelledby="my-radio-group5">
						<p className="text-lg font-medium italic text-gray-800 py-2 w-full text-center">Ce efect dorești
							să
							obții
							utilizand
							mascara?</p>
						<div className="flex gap-[16px] flex-wrap justify-center items-center">
							<label className="relative">
								<Field className={`${inputClasses}`} required type="radio" name="mascaraEfect"
									   value="q-mascara-max"/>
								<span
									className={`${labelClasses} ${formik.values.mascaraEfect === 'q-mascara-max' ? ' bg-indigo-400' : 'bg-indigo-200'}`}>Volum maxim</span>
							</label>
							<label className="relative">
								<Field className={`${inputClasses}`} type="radio" name="mascaraEfect"
									   value="q-mascara-alungire"/>
								<span
									className={`${labelClasses} ${formik.values.mascaraEfect === 'q-mascara-alungire' ? ' bg-indigo-400' : 'bg-indigo-200'}`}>Alungire intensă</span>
							</label>
							<label className="relative">
								<Field className={`${inputClasses}`} type="radio" name="mascaraEfect"
									   value="q-mascara-separare"/>
								<span
									className={`${labelClasses} ${formik.values.mascaraEfect === 'q-mascara-separare' ? ' bg-indigo-400' : 'bg-indigo-200'}`}>Separare perfectă a genelor</span>
							</label>
						</div>
					</div>
					<div role="group"
						 className="bg-gray-100 rounded-xl mb-2 px-2 pb-2 w-full flex flex-wrap items-center justify-center"
						 aria-labelledby="my-radio-group6">
						<p className="text-lg font-medium italic text-gray-800 py-2 w-full text-center">Ce tip de look
							preferi?</p>
						<div className="flex gap-[16px] flex-wrap justify-center items-center">
							<label className="relative">
								<Field className={`${inputClasses}`} required type="radio" name="lookPreferat"
									   value="q-look-subtil"/>
								<span
									className={`${labelClasses} ${formik.values.lookPreferat === 'q-look-subtil' ? ' bg-indigo-400' : 'bg-indigo-200'}`}>Natural și subtil</span>
							</label>
							<label className="relative">
								<Field className={`${inputClasses}`} type="radio" name="lookPreferat"
									   value="q-look-glam"/>
								<span
									className={`${labelClasses} ${formik.values.lookPreferat === 'q-look-glam' ? ' bg-indigo-400' : 'bg-indigo-200'}`}>Glam și strălucitor</span>
							</label>
							<label className="relative">
								<Field className={`${inputClasses}`} type="radio" name="lookPreferat"
									   value="q-look-dramatic"/>
								<span
									className={`${labelClasses} ${formik.values.lookPreferat === 'q-look-dramatic' ? ' bg-indigo-400' : 'bg-indigo-200'}`}>Dramatic și îndrăzneț</span>
							</label>
						</div>
					</div>
					<button type="submit"
							className="p-4 rounded-full bg-cyan-700 text-white font-bold italic tracking-wider text-lg my-4 mx-auto inline-block transition-all duration-300 ease-in-out hover:bg-cyan-900">
						Obtine rezultat
					</button>
					<button
						onClick={handleReset}
						type="button"
						className="p-4 rounded-full bg-cyan-700 text-white font-bold italic tracking-wider text-lg my-4 mx-auto inline-block transition-all duration-300 ease-in-out hover:bg-cyan-900">
						Reseteaza Quiz-ul
					</button>
				</form>
			</FormikProvider>
			<div
				className="container mx-auto grid gap-[8px] md:gap-[12px] lg:gap-[16px] xl:gap-[20px] grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 py-4">
				{recommendedProducts?.length > 0 &&
					<h2 className="text-2xl font-bold text-gray-800 col-span-full p-2 bg-white rounded-xl text-center">Recomandări</h2>}
				{renderRecommendations()}
			</div>
			<div className="container text-center">
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
				{chatResponse?.length > 0 &&
					<h2 className="text-2xl font-bold text-gray-800 col-span-full p-2 bg-white rounded-xl text-center">Sfaturi</h2>}
				{renderChatResponse()}
			</div>
		</div>
	);
}

export default Quiz;