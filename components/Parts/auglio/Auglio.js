import react, {useState, useEffect} from "react";
import AuglioLogo from "./AuglioLogo";

const Auglio = () => {
	const [isOpen, setIsOpen] = useState(false);

	useEffect(() => {
		window.addEventListener('click', handleClose);
		return () => {
			window.removeEventListener('click', handleClose);
		};
	}, []);

	const handleClose = e => {
		if (e.target.id === 'virtooal-modal-close') {
			setIsOpen(false);
		}
	};

	const handleShow = () => {
		setIsOpen(!isOpen);
	};

	return <>
		<button type="button" onClick={handleShow}>
			<div className="flex items-center justify-center bg-gray-600 gap-2 rounded-full p-4">
				<span className="text-white font-bold tracking-wider">Oglinda Virtuala</span>
				<AuglioLogo/>
			</div>
		</button>
		{isOpen && <div id="virtooal-mirror-fix-container" className="virtooal-main-modal">
			<div id="virtooal-mirror-fix-content" className="virtooal-main-modal-content">
				<div id="virtooal-mirror-title">
					<div>
						<div id="virtooal-tA"><a href="https://auglio.com" target="_blank" rel="noreferrer">
							<div className="virtooal-tL">Virtual</div>
							<div className="virtooal-tR">Mirror</div>
						</a></div>
						<div id="virtooal-modal-minimize" className="virtooal-logo-ic">
							<div id="virtooal-modal-minimize-text">Virtual Mirror</div>
							<div id="virtooal-modal-minimize-ic"><span className="icon-virtooal-logo-white"></span>
							</div>
						</div>
						<div id="virtooal-modal-open"
							 className="virtooal-menu-btns virtooal-expand virtooal-collapse"></div>
						<div id="virtooal-modal-close" className="virtooal-menu-btns virtooal-close"></div>
					</div>
				</div>
				<div id="virtooal-mirror-fix-iframe" className="">
					<iframe
						/*	ref={iframeRef}*/
						src="https://mirrorv16.virtooal.com/app/bfb23eea8fa19b30f3490d2900baed3e/7588?c=000000&amp;c2=000000&amp;l=en&amp;cross=1&amp;model=14&amp;modelMale=18&amp;modelKids=79&amp;browse=true&amp;country=&amp;currency=&amp;mfId=&amp;liveSource=0&amp;widthS=1119&amp;heightS=929&amp;baseUrl=https://glowupshinemoment.myshopify.com/products/dior-addict-ruj-cu-efect-stralucitor-100-nude-look&amp;sessionid=1558211741&amp;liveMode=1"
						id="virtooal-mirror" width="100%" height="600" scrolling="yes" frameBorder="0" hspace="0"
						vspace="0" marginHeight="0" marginWidth="0" allow="camera"></iframe>
				</div>
			</div>
		</div>}
	</>
};

export default Auglio;