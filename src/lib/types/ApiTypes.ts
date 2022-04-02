export interface Opts {
	credentials?: RequestCredentials;
	body?: FormData | Blob | URLSearchParams | string;
	method?: any;
	headers?: any;
}

export interface SendParams {
	method?: string;
	path?: string;
	data?: any;
	session?: any;
	base?: string;
}
