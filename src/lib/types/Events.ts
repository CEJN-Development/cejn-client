export interface EventType {
	body?: string;
	cloudinary_image_url?: string | null;
	created_at: Date;
	date: Date;
	description?: string;
	id: number;
	name: string;
	slug: string;
	updated_at: Date;
}

export interface EventCreate {
	body: string;
	description: string;
	date: Date;
	name: string;
	photo?: string | ArrayBuffer;
}

export interface EventUpdate extends EventCreate {
	id?: number;
}
