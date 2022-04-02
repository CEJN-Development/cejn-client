import type { Opts, SendParams } from '$lib/types/ApiTypes';
/*
 * Make requests to some backend
 * Based on https://github.com/sveltejs/realworld/blob/master/src/node_modules/api.js
 */
async function send({ method, path, data, session, base }: SendParams) {
	const fetch =
		typeof window !== 'undefined'
			? window.fetch
			: await import('node-fetch').then((mod) => mod.default);
	const opts: Opts = { method, headers: {} };

	if (data) {
		if (data.creds) {
			opts.credentials = 'include';
			delete data.creds;
		}

		if (!data.type) {
			opts.headers['Content-Type'] = 'application/json';
			opts.body = JSON.stringify(data);
		}

		if (data.type === 'formData') {
			const formData = new FormData();
			opts.body = formData;
		}
	}

	if (session) {
		if (session.aud) opts.headers['JWT_AUD'] = session.aud;
		if (session.jwt) {
			session.jwt.includes('Bearer')
				? (opts.headers['Authorization'] = session.jwt)
				: (opts.headers['Authorization'] = `Bearer ${session.jwt}`);
		}
	}

	const fullPath = encodeURI(`${base}/${path}`);
	if (import.meta.env.VITE_DEBUG_MODE) {
		console.log(method, fullPath);
		console.log(opts);
	}

	const response = await fetch(fullPath, opts);
	const json = await response.json();
	if (import.meta.env.VITE_DEBUG_MODE) {
		console.log('DEBUG:', json);
	}

	return { response, json };
}

/*
 * Shortcut methods for send
 */
export function get(base: string, path: string, session: any) {
	return send({ method: 'GET', path, session, base });
}

export function del(base: string, path: string, data: any, session: any) {
	return send({ method: 'DELETE', path, data, session, base });
}

export function post(base: string, path: string, data: any, session: any) {
	return send({ method: 'POST', path, data, session, base });
}

export function put(base: string, path: string, data: any, session: any) {
	return send({ method: 'PUT', path, data, session, base });
}
