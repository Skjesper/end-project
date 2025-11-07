'use client'

import React, { useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination, Thumbs } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css/thumbs'
import Image from 'next/image'

export default function MySwiper() {
	const [thumbsSwiper, setThumbsSwiper] = useState(null)

	const images = [
		{ src: '/assets/images/testimg1.png', alt: 'Product 1' },
		{ src: '/assets/images/testimg2.png', alt: 'Product 2' },
		{ src: '/assets/images/testimg1.png', alt: 'Product 3' },
		{ src: '/assets/images/testimg2.png', alt: 'Product 4' },
		{ src: '/assets/images/testimg1.png', alt: 'Product 5' }
	]

	return (
		<div style={{ maxWidth: '1200px', margin: '0 auto', padding: '20px' }}>
			{/* Main Swiper */}
			<Swiper
				modules={[Navigation, Pagination, Thumbs]}
				navigation
				pagination={{ clickable: true }}
				spaceBetween={30}
				slidesPerView={2}
				thumbs={{ swiper: thumbsSwiper }}
				breakpoints={{
					320: {
						slidesPerView: 1,
						spaceBetween: 10
					},
					768: {
						slidesPerView: 2,
						spaceBetween: 30
					}
				}}
			>
				{images.map((image, index) => (
					<SwiperSlide key={index}>
						<Image
							src={image.src}
							alt={image.alt}
							width={600}
							height={700}
							style={{ width: '100%', height: 'auto', borderRadius: '8px' }}
						/>
					</SwiperSlide>
				))}
			</Swiper>

			{/* Thumbnail Swiper */}
			<Swiper
				onSwiper={setThumbsSwiper}
				spaceBetween={10}
				slidesPerView={5}
				watchSlidesProgress
				style={{ marginTop: '20px' }}
				breakpoints={{
					320: {
						slidesPerView: 3
					},
					768: {
						slidesPerView: 5
					}
				}}
			>
				{images.map((image, index) => (
					<SwiperSlide key={index} style={{ cursor: 'pointer' }}>
						<Image
							src={image.src}
							alt={image.alt}
							width={100}
							height={120}
							style={{
								width: '100%',
								height: 'auto',
								borderRadius: '4px',
								opacity: 0.6,
								transition: 'opacity 0.3s'
							}}
						/>
					</SwiperSlide>
				))}
			</Swiper>

			<style jsx global>{`
				.swiper-slide-thumb-active img {
					opacity: 1 !important;
					/* border: 3px solid #1976d2; */
					border-radius: 4px;
				}
			`}</style>
		</div>
	)
}
