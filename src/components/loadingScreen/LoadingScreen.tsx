import styles from './LoadingScreen.module.css'
import CountUp from './countUp/CountUp'

export default function LoadingScreen() {
	return (
		<>
			<div className={styles.container}>
				<CountUp
					from={0}
					to={100}
					separator=","
					direction="up"
					duration={1}
					className={styles.countUpText}
				/>
			</div>
		</>
	)
}
