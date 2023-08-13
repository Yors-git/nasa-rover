import styles from '@/styles/Home.module.css';
import Link from 'next/link';
import { Button, ButtonGroup } from 'react-bootstrap';

export default function Home() {
	return (
		<div className={styles.screenContainer}>
			<div className={styles.mainInfoContainer}>
				<h1>Welcome to Mars Rover Photos</h1>
				<p className={styles.mainInfoText}>
					This APP is designed to display the images collected by NASA&apos;s
					Curiosity, Opportunity, and Spirit rovers on Mars. <br />
					<br />
					Each rover has its own set of photos, you can search images based on
					sol (Martian rotation or day) on which they were taken, counting up
					from the rover&apos;s landing date. A photo taken on Curiosity&apos;s
					1000th Martian sol exploring Mars, for example, will have a sol
					attribute of 1000. If instead you prefer to search by the Earth date
					on which a photo was taken, you can do that too. Results can also be
					filtered by the camera with which it was taken.
				</p>
				<h2>Please select a Rover</h2>
				<>
					<ButtonGroup size='lg' className='my-3 '>
						<Button variant='outline-primary'>
							<Link
								href={{
									pathname: 'photos',
									query: { rover: 'curiosity' }
								}}
							>
								Curiosity
							</Link>
						</Button>
						<Button variant='outline-primary'>
							{' '}
							<Link
								href={{
									pathname: 'photos',
									query: { rover: 'opportunity' }
								}}
							>
								Opportunity
							</Link>
						</Button>
						<Button variant='outline-primary'>
							{' '}
							<Link
								href={{
									pathname: 'photos',
									query: { rover: 'spirit' }
								}}
							>
								Spirit
							</Link>
						</Button>
					</ButtonGroup>
				</>
			</div>
		</div>
	);
}
