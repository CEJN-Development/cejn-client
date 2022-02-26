<script context="module" lang="ts">
	export const prerender = true;

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
  import type { Organization } from "$lib/types/Organizations";
  import CloudinaryImage from "$lib/components/shared/CloudinaryImage.svelte";

	export let organization: Organization;
</script>

<svelte:head>
	<title>Home</title>
</svelte:head>

<hr class="separator stack-48" />
<div class="stack-24">
  <CloudinaryImage
    cloudinaryImageUrl={organization.cloudinary_image_url}
    options={{ height: 430, width: 242, crop: "fill" }}
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
<a class="stack-16" href="/#who-is-cejn">
  &lt;&lt; Who is CEJN?
</a>

<style>
  img {
    border-radius: 10rem;
    overflow: hidden;
    max-width: 100%;
  }

  @media screen and (min-width: 500px) {
    img {
      float: right;
      max-width: 15rem;
      margin-left: 2rem;
    }
  }
</style>
