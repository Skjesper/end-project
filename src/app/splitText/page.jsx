'use client'

import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { SplitText } from 'gsap/SplitText'
import localFont from 'next/font/local'
import styles from './page.module.css'

gsap.registerPlugin(SplitText)

const maelstrom = localFont({
	src: '../../../public/fonts/TestMaelstrom-Bold.otf',
	variable: '--font-maelstrom',
	weight: '700'
})
const dieGrotesk = localFont({
	src: '../../../public/fonts/test-die-grotesk-vf-roman.woff2',
	variable: '--font-dieGrotesk',
	weight: '700'
})
const pixolde = localFont({
	src: '../../../public/fonts/Pixolde-Bold.ttf',
	variable: '--font-pixolde',
	weight: '700'
})

export default function SplitTextExample() {
	const titleRef = useRef(null)
	const splitRef = useRef(null)
	const [isReady, setIsReady] = useState(false)

	useEffect(() => {
		const split = new SplitText(titleRef.current, {
			type: 'chars',
			charsClass: 'char'
		})

		splitRef.current = split

		// Create the custom structure like in the Astro example
		split.chars.forEach((char) => {
			const letter = char.textContent

			char.classList.add('char--' + letter)

			const inner = document.createElement('span')
			inner.classList.add('char__inner')

			inner.dataset.letter = letter.toUpperCase()
			inner.innerHTML = letter

			char.innerHTML = inner.outerHTML
		})

		setIsReady(true)

		return () => {
			split.revert()
		}
	}, [])

	useEffect(() => {
		if (!isReady) return

		const animateChar = () => {
			if (Math.random() > 0.01) return

			const chars = splitRef.current.chars
			const char = chars[Math.floor(Math.random() * chars.length)]

			if (
				char.classList.contains('to-top') ||
				char.classList.contains('to-right') ||
				char.classList.contains('to-bottom') ||
				char.classList.contains('to-left')
			)
				return

			const direction = Math.floor(Math.random() * 4)
			const className = 'to-' + ['bottom', 'left', 'top', 'right'][direction]

			char.classList.add(className)

			setTimeout(() => {
				char.classList.remove(className)
			}, 2000)
		}

		const ticker = gsap.ticker.add(animateChar)

		return () => {
			gsap.ticker.remove(ticker)
		}
	}, [isReady])

	return (
		<div className={`${pixolde.variable} ${styles.container}`}>
			<h1
				ref={titleRef}
				className={styles.title}
				style={{
					fontFamily: 'var(--font-pixolde)'
				}}
			>
				<span>.Com</span>
				<span>Eyewear</span>
			</h1>
		</div>
	)
}
