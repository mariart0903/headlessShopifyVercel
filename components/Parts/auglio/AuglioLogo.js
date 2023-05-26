import React from 'react';

const AuglioLogo = () => {
	return <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor"
				viewBox="0 0 49.81 43.46"
				style={{width: '35px', height: '35px'}}>
		<defs>
			<linearGradient id="linear-gradient" x1="31.28" y1="15.55" x2="51.69"
							y2="11.58"
							gradientTransform="translate(0 45.36) scale(1 -1)"
							gradientUnits="userSpaceOnUse">
				<stop offset=".3" stopColor="#000" stopOpacity=".47"></stop>
				<stop offset=".35" stopColor="#000" stopOpacity=".41"></stop>
				<stop offset=".49" stopColor="#000" stopOpacity=".26"></stop>
				<stop offset=".63" stopColor="#000" stopOpacity=".15"></stop>
				<stop offset=".77" stopColor="#000" stopOpacity=".07"></stop>
				<stop offset=".89" stopColor="#000" stopOpacity=".02"></stop>
				<stop offset="1" stopColor="#000" stopOpacity="0"></stop>
			</linearGradient>
			<linearGradient id="linear-gradient-2" x1="48.76" y1="27.02" x2="22.57"
							y2="37.06"
							gradientTransform="translate(0 45.36) scale(1 -1)"
							gradientUnits="userSpaceOnUse">
				<stop offset=".38" stopColor="#000" stopOpacity=".5"></stop>
				<stop offset=".46" stopColor="#000" stopOpacity=".4"></stop>
				<stop offset=".72" stopColor="#000" stopOpacity=".18"></stop>
				<stop offset=".91" stopColor="#000" stopOpacity=".05"></stop>
				<stop offset="1" stopColor="#000" stopOpacity="0"></stop>
			</linearGradient>
		</defs>
		<g id="logo">
			<path id="spodna_noha"
				  d="M49.8,43.46c-6.45,0-10.33-2.79-12.38-5.18-4.66-5.42-4.57-15.24-4.57-16.54h10.6c0,1.54-.23,7.13,1.93,9.54,.61,.68,1.73,1.58,4.43,1.58v10.6h0Z"></path>
			<path id="spodny_tien"
				  fill={"url(#linear-gradient)"}
				  d="M49.8,43.46c-6.45,0-10.33-2.79-12.38-5.18-4.66-5.42-4.57-15.24-4.57-16.54h10.6c0,1.54-.23,7.13,1.93,9.54,.61,.68,1.73,1.58,4.43,1.58v10.6h0Z"></path>
			<path id="lavy_obluk"
				  d="M21.72,43.46C9.74,43.46,0,33.71,0,21.74S9.75,.02,21.72,.02s21.72,9.74,21.72,21.72-9.74,21.72-21.72,21.72Zm0-32.84c-6.13,0-11.12,4.99-11.12,11.12s4.99,11.12,11.12,11.12,11.12-4.99,11.12-11.12-4.99-11.12-11.12-11.12Z"></path>
			<path id="vrchny_tien" fill={"url(#linear-gradient-2)"}
				  d="M32.84,21.73h10.6C43.44,9.75,33.7,.02,21.72,.02V10.62c6.13,0,11.12,4.98,11.12,11.11Z"></path>
			<path id="prava_noha"
				  d="M32.84,0l-.02,22.19c-.24,5.92-5.09,10.67-11.09,10.67v10.6c11.82,0,21.47-9.51,21.72-21.27V0h-10.61Z"></path>
		</g>
	</svg>
};

export default AuglioLogo;