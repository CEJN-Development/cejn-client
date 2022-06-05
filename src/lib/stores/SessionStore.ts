import { writable } from 'svelte/store';

export const SessionStore = writable({
	authenticated: false,
	authenticating: true,
	user: null
});
