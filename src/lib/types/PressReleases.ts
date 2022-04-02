export interface PressReleaseType {
	body?: string;
	created_at: Date;
	summary?: string;
	id: number;
	slug: string;
	title: string;
	updated_at: Date;
}

export interface PressReleaseUpdate {
	body: string;
	summary: string;
	title: string;
}
