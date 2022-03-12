<script context="module" lang="ts">
	export const prerender = false;

	export async function load({ url, params, fetch, session, stuff }) {
		const organizationRes = await fetch(`${import.meta.env.VITE_API_URL}/organizations/${params.slug}`);
		if (!organizationRes.ok) return {
			status: organizationRes.status,
			error: new Error("Could not load organization")
		};

		let organization = await organizationRes.json();

		return {
			props: {
				organization
			}
		};
	};
</script>

<script lang="ts">
	import { MetaTags } from "svelte-meta-tags";
  import type { Organization } from "$lib/types/Organizations";
  import CloudinaryImage from "$lib/components/shared/CloudinaryImage.svelte";

	export let organization: Organization;
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
<div class="stack-24">
  <CloudinaryImage
    cloudinaryImageUrl={organization.cloudinary_image_url}
    options={{ height: 405, width: 720, crop: "fit" }}
    classes="stack-24"
  />
  <h1 class="text-strong text-large stack-24">
    {organization.name}
  </h1>
  <span class="text-medium text-normal">
    {#each organization.body.split("\n\n") as paragraph}
      <p class="stack-8">
        {@html paragraph}
      </p>
    {/each}
  </span>
</div>
<a class="stack-48" href="/#our-members">
  &lt;&lt; Who is CEJN?
</a>
<hr class="separator stack-48" />
