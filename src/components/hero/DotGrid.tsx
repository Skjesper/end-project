'use client'

import { useEffect, useRef, useState } from 'react'

interface Dot {
	x: number
	y: number
}

export default function DotGrid() {
	const svgRef = useRef<SVGSVGElement>(null)
	const containerRef = useRef<HTMLDivElement>(null)
	const [dots, setDots] = useState<Dot[]>([])

	useEffect(() => {
		const createDots = (): void => {
			if (!containerRef.current) return

			const { width, height } = containerRef.current.getBoundingClientRect()

			// Grid settings
			const xGap = 40
			const yGap = 40

			// Calculate grid dimensions
			const totalCols = Math.ceil(width / xGap) + 1
			const totalRows = Math.ceil(height / yGap) + 1

			// Center the grid
			const xStart = (width - xGap * (totalCols - 1)) / 2
			const yStart = (height - yGap * (totalRows - 1)) / 2

			// Create dots array
			const newDots: Dot[] = []
			for (let i = 0; i < totalCols; i++) {
				for (let j = 0; j < totalRows; j++) {
					newDots.push({
						x: xStart + xGap * i,
						y: yStart + yGap * j
					})
				}
			}

			setDots(newDots)
		}

		createDots()

		const handleResize = (): void => createDots()
		window.addEventListener('resize', handleResize)

		return () => window.removeEventListener('resize', handleResize)
	}, [])

	return (
		<div
			ref={containerRef}
			style={{
				width: '100%',
				height: '100%', // This is key!
				display: 'block'
			}}
		>
			<svg
				ref={svgRef}
				style={{
					display: 'block',
					width: '100%',
					height: '100%' // This is key!
				}}
			>
				{dots.map((dot, index) => (
					<circle key={index} cx={dot.x} cy={dot.y} r={2} fill="#666" />
				))}
			</svg>
		</div>
	)
}
