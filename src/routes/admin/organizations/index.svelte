<script context="module" lang="ts">
	export const prerender = false;

	export async function load({ url, params, fetch, session, stuff }) {
		const organizationsRes = await fetch(`${import.meta.env.VITE_API_URL}/admin/organizations`);
		if (!organizationsRes.ok)
			return {
				status: organizationsRes.status,
				error: new Error('Could not load organizations')
			};

		let organizations = await organizationsRes.json();

		return {
			props: {
				organizations
			}
		};
	}
</script>

<script lang="ts">
	import OrganizationsTable from '$lib/components/admin/Organizations/OrganizationsTable.svelte';
	import type { OrganizationType } from '$lib/types/Organizations';

	export let organizations: OrganizationType[];
</script>

<svelte:head>
	<title>Admin | Our Members</title>
</svelte:head>

<main class="squeeze-24 squish-24">
	<a href="/admin/organizations/new" class="button panel">New Organization</a>
	<h1 class="stack-24">Our Members</h1>
	<OrganizationsTable {organizations} />
</main>

<style>
	a {
		float: right;
	}

	a:hover {
		text-decoration: none;
	}
</style>
