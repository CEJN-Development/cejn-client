<script context="module" lang="ts">
	export const prerender = false;

	export async function load({ url, params, fetch, session, stuff }) {
		const organizationRes = await fetch(
			`${import.meta.env.VITE_API_URL}/organizations/${params.slug}`
		);
		if (!organizationRes.ok)
			return {
				status: organizationRes.status,
				error: new Error('Could not load organization')
			};

		let organization: OrganizationType = await organizationRes.json();

		return {
			props: {
				organization
			}
		};
	}
</script>

<script lang="ts">
	import { MetaTags } from 'svelte-meta-tags';
	import type { OrganizationType } from '$lib/types/Organizations';
	import Organization from '$lib/components/Organizations/Organization.svelte';

	export let organization: OrganizationType;
</script>

<svelte:head>
	<title>{organization.name}</title>
</svelte:head>

<MetaTags
	title={organization.name}
	description={organization.blurb}
	canonical="https://www.chicagoejn.org/"
	openGraph={{
		url: `https://www.chicagoejn.org/our-members/${organization.slug}`,
		title: organization.name,
		description: organization.blurb,
		images: [
			{
				url: organization.cloudinary_image_url,
				alt: `Logo for ${organization.name}`
			}
		],
		site_name: 'Chicago Environmental Justice Network'
	}}
	twitter={{
		handle: '@cejnetwork',
		site: '@cejnetwork',
		cardType: 'summary_large_image',
		title: organization.name,
		description: organization.blurb,
		image: organization.cloudinary_image_url,
		imageAlt: `Logo for ${organization.name}`
	}}
/>

<hr class="separator stack-48" />
<Organization {organization} />
<a class="stack-48" href="/#our-members"> &lt;&lt; Who is CEJN? </a>
<hr class="separator stack-48" />
