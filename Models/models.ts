export interface IManifest {
	landing_date: string;
	launch_date: string;
	max_date: string;
	max_sol: number;
	name: string;
	photos: IManifestPhoto[];
	status: string;
	total_photos: number;
}

export interface IManifestPhoto {
	cameras: string[];
	earth_date: string;
	sol: number;
	total_photos: number;
}

export interface ICamera {
	full_name: string;
	name: string;
	id?: number;
	rover_id?: number;
}

export interface IRover {
	cameras: ICamera[];
	id: number;
	landing_date: string;
	launch_date: string;
	max_date: string;
	max_sol: number;
	name: string;
	status: string;
	total_photos: number;
}

export interface IPhoto {
	camera: ICamera;
	earth_date: string;
	id: number;
	img_src: string;
	rover: IRover;
	sol: number;
}

export interface ISelectOption {
	id: string;
	label: string;
	value: string;
}
