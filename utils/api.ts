import axios from 'axios';

const APIKEY = 'rw9AeHsAxOYDtVxAuBl1rQaazfiGBokhRjMAgrhf';
const baseUrl = 'https://api.nasa.gov/mars-photos/api/v1/';

export const getRoverManifest = async (rover: string) => {
	try {
		const res = await axios.get(
			`${baseUrl}manifests/${rover}?api_key=${APIKEY}`
		);
		return res.data;
	} catch (error) {
		console.error(error);
	}
};

export const getRoverLatestPhotos = async (rover: string) => {
	try {
		const manifest = await getRoverManifest(rover);
		const { max_date } = manifest.photo_manifest;
		if (max_date) {
			const res = await axios.get(
				`${baseUrl}rovers/${rover}/photos?earth_date=${max_date}&api_key=${APIKEY}&`
			);
			return res.data;
		}
	} catch (error) {
		console.error(error);
	}
};

export const getRoverPhotosByCamera = async (
	rover: string,
	camera: string,
	date: string
) => {
	try {
		const res = await axios.get(
			`${baseUrl}rovers/${rover}/photos?${date}&${camera}&api_key=${APIKEY}`
		);
		return res.data;
	} catch (error) {
		console.error(error);
	}
};
