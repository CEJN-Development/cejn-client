export interface OS {
	name: string;
	value?: string;
	version: any;
}

export interface Browser {
	name: string;
	value?: string;
	version: any;
}

export interface BrowserData {
	browser: Browser;
	os: OS;
}
