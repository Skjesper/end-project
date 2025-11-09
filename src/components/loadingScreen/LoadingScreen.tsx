import styles from './LoadingScreen.module.css'
import CountUp from './countUp/CountUp'

interface LoadingScreenProps {
	onComplete?: () => void
}

export default function LoadingScreen({ onComplete }: LoadingScreenProps) {
	return (
		<div className={styles.container}>
			<CountUp
				from={0}
				to={100}
				separator=","
				direction="up"
				duration={3}
				endDelay={3500}
				className={styles.countUpText}
				onEnd={onComplete}
			/>
		</div>
	)
}
