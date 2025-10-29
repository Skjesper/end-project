import styles from './Button.module.css'

interface ButtonProps {
	children: React.ReactNode
	onClick?: () => void
	variant?: 'primary' | 'secondary' | 'danger' | 'nav' | 'delete'
	disabled?: boolean
	type?: 'button' | 'submit' | 'reset'
	ariaLabel?: string
	ariaDescribedBy?: string
}

export default function Button({
	children,
	onClick,
	variant = 'primary',
	disabled = false,
	type = 'button',
	ariaLabel,
	ariaDescribedBy
}: ButtonProps) {
	return (
		<button
			className={styles.button}
			type={type}
			onClick={onClick}
			disabled={disabled}
			data-variant={variant}
			aria-label={ariaLabel}
			aria-describedby={ariaDescribedBy}
			aria-disabled={disabled}
		>
			{children}
		</button>
	)
}
