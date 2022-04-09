import { writable } from 'svelte/store';

export const ClientSizeStore = writable({ width: null, height: null });
