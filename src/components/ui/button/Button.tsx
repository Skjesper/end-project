'use client'

import styles from './Button.module.css'

interface ButtonProps {
	children: React.ReactNode
	onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void // Updated this line
	variant?:
		| 'primary'
		| 'secondary'
		| 'danger'
		| 'nav'
		| 'delete'
		| 'cart'
		| 'filter'
		| 'favorites'
		| 'size'
		| 'color'
	isActive?: boolean
	disabled?: boolean
	type?: 'button' | 'submit' | 'reset'
	ariaLabel?: string
	ariaDescribedBy?: string
	className?: string
}

export default function Button({
	children,
	onClick,
	variant = 'primary',
	disabled = false,
	type = 'button',
	isActive = false,
	ariaLabel,
	ariaDescribedBy,
	className = ''
}: ButtonProps) {
	return (
		<button
			className={`${styles.button} ${className}`.trim()}
			type={type}
			onClick={onClick}
			disabled={disabled}
			data-variant={variant}
			data-active={isActive}
			aria-label={ariaLabel}
			aria-describedby={ariaDescribedBy}
			aria-disabled={disabled}
		>
			{children}
		</button>
	)
}
