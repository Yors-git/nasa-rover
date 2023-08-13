import React from 'react';
import Card from 'react-bootstrap/Card';
import { IPhoto } from '../../Models/models';
import { Container, Row, Spinner } from 'react-bootstrap';
import styles from './PhotosList.module.css';

interface IPhotosListProps {
	photos: IPhoto[];
	loading: boolean;
}

const PhotosList: React.FC<IPhotosListProps> = ({ photos, loading }) => {
	if (loading)
		return (
			<div className={styles.spinner}>
				<Spinner animation='border' role='status'>
					<span className='visually-hidden'>Loading...</span>
				</Spinner>
			</div>
		);

	return (
		<Container className='mt-2'>
			<Row xs={1} md={2} className='g-4 justify-content-center'>
				{photos.length > 0 ? (
					photos.map((photo: IPhoto) => (
						<Card
							key={photo.id}
							style={{ width: '18%', maxHeight: '380px', minHeight: '350px' }}
							className={`mx-2 ${styles.card}`}
						>
							<Card.Img
								variant='top'
								src={photo.img_src}
								className={`pt-3 ${styles.thumb}`}
							/>
							<Card.Body className='px-0'>
								<Card.Title>{photo.rover.name}</Card.Title>
								<Card.Subtitle className='mb-2 text-muted'>
									Sol: {photo.sol}
								</Card.Subtitle>
								<Card.Subtitle className='mb-2 text-muted'>
									Earth Date: <br />
									{photo.earth_date}
								</Card.Subtitle>
								<Card.Text>Camera: {photo.camera.name}</Card.Text>
								<Card.Link target='_blank' href={photo.img_src}>
									See Full Image
								</Card.Link>
							</Card.Body>
						</Card>
					))
				) : (
					<h1 className='text-center mt-5'>No photos to show</h1>
				)}
			</Row>
		</Container>
	);
};

export default PhotosList;
