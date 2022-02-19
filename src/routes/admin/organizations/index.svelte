<script context="module" lang="ts">
	export const prerender = true;

	export async function load({ page, fetch, session, stuff }) {
		const organizationsRes = await fetch(`${import.meta.env.VITE_API_URL}/admin/organizations`);
		if (!organizationsRes.ok) return {
			status: organizationsRes.status,
			error: new Error("Could not load organizations")
		};

		let organizations = await organizationsRes.json();

		return {
			props: {
				organizations
			},
		};
	};
</script>

<script lang="ts">
  import OrganizationsTable from "$lib/components/admin/Organizations/OrganizationsTable.svelte";
  import type { Organization } from "$lib/types/Organizations";

	export let organizations: Organization[];
</script>

<svelte:head>
	<title>Admin | Our Staff</title>
</svelte:head>

<main class="squeeze-16 squish-16">
	<a
		href="/admin/organizations/new"
		class="button panel"
	>
		Add staff
	</a>
  <h1 class="stack-32">Our Staff</h1>
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