import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import {
	getRoverLatestPhotos,
	getRoverManifest,
	getRoverPhotosByCamera
} from '@/utils/api';
import PhotosList from '@/components/PhotosList';
import ReactPaginate from 'react-paginate';
import { ICamera, IManifest, IPhoto } from '@/Models/models';
import styles from '@/styles/Photos.module.css';
import OptionsSelector from '@/components/OptionsSelector';
import { getCameraOptions } from '@/utils/utils';

const Photos = () => {
	// State for rendering list
	const [manifest, setManifest] = useState<IManifest>();
	const [photos, setPhotos] = useState<IPhoto[]>([]);
	const [currentItems, setCurrentItems] = useState<IPhoto[]>([]);
	const [pageCount, setPageCount] = useState<number>(0);
	const [itemOffset, setItemOffset] = useState<number>(0);
	// State for select options and queries
	const router = useRouter();
	const [cameras, setCameras] = useState<ICamera[]>([]);
	const [rover, setRover] = useState<string | undefined>(
		router.query.rover as string
	);
	const [camera, selectCamera] = useState<string>('All');
	const [startDate, setStartDate] = useState<Date | null>(null);
	const [latestDate, setLatestDate] = useState<Date | null>(null);
	const [isSol, setIsSol] = useState<boolean>(false);
	const [sol, setSol] = useState<string>('');

	const [loading, setLoading] = useState(false);

	const ITEMS_PER_PAGE = 25;

	useEffect(() => {
		setLoading(true);
		if (rover && camera === 'All' && !startDate) {
			getRoverManifest(rover as string).then(res => {
				setManifest(res.photo_manifest);
			});
			getRoverLatestPhotos(rover as string).then(res => {
				setPhotos(res.photos);
				setLoading(false);
			});
			setItemOffset(0);
		} else if (rover) {
			const cam = camera === 'All' ? '' : `camera=${camera}`;
			const dateForCall = startDate
				? `earth_date=${startDate?.getFullYear()}-${
						startDate?.getMonth() + 1
				  }-${startDate?.getDate()}`
				: '';
			const solForCall = sol ? `sol=${sol}` : '';
			const dateParam = isSol ? solForCall : dateForCall;
			getRoverPhotosByCamera(rover, cam, dateParam).then(res => {
				setPhotos(res.photos);
				setLoading(false);
			});
			setItemOffset(0);
		}
	}, [rover, camera, startDate, sol, isSol]);

	useEffect(() => {
		if (photos.length > 0) {
			setCameras(photos[0].rover.cameras);
		}
	}, [photos]);

	useEffect(() => {
		if (photos) {
			const endOffset = itemOffset + ITEMS_PER_PAGE;
			setCurrentItems(photos.slice(itemOffset, endOffset));
			setPageCount(Math.ceil(photos.length / ITEMS_PER_PAGE));
		}
	}, [itemOffset, ITEMS_PER_PAGE, photos]);

	const handlePageClick = (event: any) => {
		const newOffset = (event.selected * ITEMS_PER_PAGE) % photos.length;
		setItemOffset(newOffset);
	};

	return (
		<>
			<OptionsSelector
				cameraOptions={getCameraOptions(cameras)}
				rover={rover}
				setRover={setRover}
				camera={camera}
				selectCamera={selectCamera}
				startDate={startDate}
				setStartDate={setStartDate}
				isSol={isSol}
				setIsSol={setIsSol}
				sol={sol}
				setSol={setSol}
				maxSol={manifest?.max_sol}
				maxDate={manifest?.max_date}
			/>
			<PhotosList photos={currentItems} loading={loading} />
			<ReactPaginate
				breakLabel='...'
				nextLabel='Next >'
				onPageChange={handlePageClick}
				pageRangeDisplayed={3}
				pageCount={pageCount}
				previousLabel='< Previous'
				renderOnZeroPageCount={null}
				marginPagesDisplayed={2}
				breakClassName={styles.item}
				containerClassName={styles.pagination}
				activeClassName={styles.active}
			/>
		</>
	);
};

export default Photos;
