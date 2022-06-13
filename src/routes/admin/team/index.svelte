<script context="module" lang="ts">
	export const prerender = false;

	export async function load({ url, params, fetch, session, stuff }) {
		const teamRes = await fetch(`${import.meta.env.VITE_API_URL}/admin/users/team`);
		if (!teamRes.ok)
			return {
				status: teamRes.status,
				error: new Error('Could not load team')
			};

		let team: MemberType[] = await teamRes.json();

		return {
			props: {
				team
			}
		};
	}
</script>

<script lang="ts">
	import Members from '$lib/components/admin/Team/Members.svelte';
	import type { MemberType } from '$lib/types/TeamTypes';

	export let team: MemberType[];
</script>

<svelte:head>
	<title>Admin | Team</title>
</svelte:head>

<main class="squeeze-24 squish-24">
	<a href="/admin/team/new" class="button panel">New member</a>
	<h1 class="stack-24">Team</h1>
	<Members {team} />
</main>

<style>
	a {
		float: right;
	}

	a:hover {
		text-decoration: none;
	}
</style>
