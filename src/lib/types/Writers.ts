import type { ArticleType } from './Articles';

export interface Writer {
	articles?: ArticleType[];
	byline: string;
	cloudinary_image_url?: string;
	created_at: Date;
	full_name: string;
	id: number;
	slug: string;
	updated_at: Date;
}

export interface WriterCreate {
	byline: string;
	full_name: string;
	photo?: string | ArrayBuffer;
}

export interface WriterUpdate extends WriterCreate {
	id?: number;
}
