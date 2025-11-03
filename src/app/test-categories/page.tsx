'use client'

import { useEffect, useRef, useState } from 'react'
import { gsap, splitColor } from 'gsap'
import { SplitText } from 'gsap/SplitText'
import localFont from 'next/font/local'

gsap.registerPlugin(SplitText)

const dieGrotesk = localFont({
	src: '../../../public/fonts/test-die-grotesk-vf-roman.woff2',
	variable: '--font-dieGrotesk',
	weight: '700'
})

export default function SplitTextHeaderTest() {
	const titleRef = useRef(null)
	const paragraphRef = useRef(null)

	useEffect(() => {
		if (!titleRef.current) return

		SplitText.create(titleRef.current, {
			type: 'words,chars',
			charsClass: 'char',
			onSplit(self) {
				gsap.from(self.chars, {
					duration: 1,
					y: 100,
					opacity: 0,
					ease: 'back.out(1.7)',
					stagger: 0.05
				})
			}
		})
	}, [])

	return (
		<div className={`${dieGrotesk.variable}`}>
			<h1
				ref={titleRef}
				className="title"
				style={{ fontFamily: 'var(--font-dieGrotesk)' }}
			>
				THIS IS A TITLE
			</h1>
			<p ref={titleRef}>
				AND THIS IS SOME TEXT ABOUT THE TITLE THAT YOUR ARE READING RIGHT NOW
			</p>
		</div>
	)
}
