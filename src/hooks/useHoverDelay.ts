// hooks/useHoverDelay.ts
import { useRef, useCallback, useEffect } from 'react'

interface UseHoverDelayOptions {
	onHoverStart: () => void
	delay?: number
	enabled?: boolean
}

export function useHoverDelay({
	onHoverStart,
	delay = 500,
	enabled = true
}: UseHoverDelayOptions) {
	const timerRef = useRef<NodeJS.Timeout | null>(null)

	const handleMouseEnter = useCallback(() => {
		if (!enabled) return

		// Clear any existing timer
		if (timerRef.current) {
			clearTimeout(timerRef.current)
		}

		// Set new timer
		timerRef.current = setTimeout(() => {
			onHoverStart()
		}, delay)
	}, [onHoverStart, delay, enabled])

	const handleMouseLeave = useCallback(() => {
		// Clear the timer if user stops hovering
		if (timerRef.current) {
			clearTimeout(timerRef.current)
			timerRef.current = null
		}
	}, [])

	const cancelHover = useCallback(() => {
		if (timerRef.current) {
			clearTimeout(timerRef.current)
			timerRef.current = null
		}
	}, [])

	// Cleanup on unmount
	useEffect(() => {
		return () => {
			if (timerRef.current) {
				clearTimeout(timerRef.current)
			}
		}
	}, [])

	return {
		handleMouseEnter,
		handleMouseLeave,
		cancelHover
	}
}
