import React from 'react';
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from 'swiper';
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import Image from "next/image";

const HeroSwiper = () => {
	return (<div className="pb-[40px] -mt-8 ">
		<Swiper
			pagination={{
				type: "progressbar",
			}}
			navigation={true}
			modules={[Pagination, Navigation]}
			className="mySwiper"
		>
			<SwiperSlide>
				<div className="relative overflow-hidden pb-[70%] lg:pb-[50%] xl:pb-[30%]">
					<Image
					  src={ '/indexHero/hero.jpg' }
					  alt={""}
					  layout='fill'
					  objectFit='cover'
					  objectPosition='center'
					  loading="eager" />
				</div>
			</SwiperSlide>
			<SwiperSlide>
				<div className="relative overflow-hidden pb-[30%]">
					<Image
					  src={ '/indexHero/hero2.jpg' }
					  alt={""}
					  layout='fill'
					  objectFit='cover'
					  objectPosition='center'
					  loading="eager" />
				</div>
			</SwiperSlide>
			<SwiperSlide><div className="relative overflow-hidden pb-[30%]">
				<Image
				  src={ '/indexHero/hero3.jpg' }
				  alt={""}
				  layout='fill'
				  objectFit='cover'
				  objectPosition='center'
				  loading="eager" />
			</div></SwiperSlide>
		</Swiper>
	</div>);
};

export default HeroSwiper;