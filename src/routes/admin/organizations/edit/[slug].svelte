<script context="module" lang="ts">
	export const prerender = false;

	export async function load({ url, params, fetch, session, stuff }) {
    const organizationRes = await fetch(`${import.meta.env.VITE_API_URL}/admin/organizations/${params.slug}`);
		if (!organizationRes.ok) return {
			status: organizationRes.status,
			error: new Error("Could not load organization"),
		};

		let organization: OrganizationType = await organizationRes.json();

		return {
			props: {
        organization,
			},
		};
	};
</script>

<script lang="ts">
  import OrganizationForm from '$lib/components/admin/Organizations/OrganizationForm.svelte';
	import type { OrganizationType } from '$lib/types/Organizations';

  export let organization: OrganizationType;
</script>

<main class="squish-24 squeeze-24">
	<h1 class="stack-24">Our Members | Edit</h1>
	<OrganizationForm {organization} />
</main>
