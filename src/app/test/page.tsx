import LoadingScreen from '@/components/loadingScreen/LoadingScreen'
import FlyingUpText from '@/components/fallingText/FallingText'

export default function MyComponent() {
	return (
		<FlyingUpText
			text="THIS IS A TEXT"
			highlightWords={['Welcome', 'amazing', 'eyewear']}
			// highlightClass={styles.highlighted}
			trigger="auto"
			fontSize="10rem"
			gravity={-1.5}
		/>
	)
}
