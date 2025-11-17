import { useState, useCallback } from 'react'

export function useModalState<T extends string>() {
	const [activeModal, setActiveModal] = useState<T | null>(null)

	const openModal = useCallback((modal: T) => {
		setActiveModal(modal)
	}, [])

	const closeModal = useCallback(() => {
		setActiveModal(null)
	}, [])

	const isOpen = useCallback(
		(modal: T) => {
			return activeModal === modal
		},
		[activeModal]
	)

	return {
		activeModal,
		openModal,
		closeModal,
		isOpen
	}
}
