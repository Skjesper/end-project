import styles from './AboutText.module.css'
import { useRef } from 'react'
import { gsap } from 'gsap'
import { useGSAP } from '@gsap/react'
import { SplitText } from 'gsap/SplitText'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(SplitText, ScrollTrigger)

export default function AboutText() {
	const titleRef = useRef<HTMLHeadingElement>(null)
	const containerRef = useRef<HTMLElement>(null)

	useGSAP(
		() => {
			if (!titleRef.current) return

			const titleSplit = new SplitText(titleRef.current, {
				type: 'lines,words',
				linesClass: 'line',
				wordsClass: 'word'
			})

			// Animate each line with delay
			titleSplit.lines.forEach((line, lineIndex) => {
				// Get all words in this line
				const wordsInLine = titleSplit.words.filter((word) =>
					line.contains(word)
				)

				// Animate words in this line - all coming from below
				wordsInLine.forEach((word, wordIndex) => {
					gsap.from(word, {
						duration: 1,
						y: 100, // All words come from below
						opacity: 0,
						ease: 'back.out(1.7)',
						delay: lineIndex * 0.3 + wordIndex * 0.05,
						scrollTrigger: {
							trigger: titleRef.current,
							start: 'top 80%',
							toggleActions: 'play none none none'
						}
					})
				})
			})

			return () => {
				titleSplit.revert()
			}
		},
		{ scope: containerRef }
	)

	return (
		<section ref={containerRef} className={styles.textContainer}>
			<h2 ref={titleRef}>
				Raw. Structural. Uncompromising. We don't decorate, we construct. Every
				piece an exercise in essential geometry and honest materiality.
			</h2>
		</section>
	)
}
