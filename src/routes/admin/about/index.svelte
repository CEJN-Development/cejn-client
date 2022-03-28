<script context="module" lang="ts">
	export const prerender = false;

	export async function load({ url, params, fetch, session, stuff }) {
    const aboutUsRes = await fetch(`${import.meta.env.VITE_API_URL}/admin/landing_pages/about-us`);
		if (!aboutUsRes.ok) return {
			status: aboutUsRes.status,
			error: new Error("Could not load writer")
		};

		let aboutUs: LandingPage = await aboutUsRes.json();

		return {
			props: {
        aboutUs,
			},
		};
	};
</script>

<script lang="ts">
	import type { LandingPage, LandingPageUpdate } from '$lib/types/LandingPages';
  import { logOut } from '$lib/helpers';
  import * as FlashMessageService from '$lib/services/FlashMessage';
  import * as ApiService from "$lib/services/Api";
  import { aud } from '$lib/stores/UserAgentStore';
  import PreviewModal from '$lib/components/admin/shared/PreviewModal.svelte';
  import AboutUs from '$lib/components/admin/shared/AboutUs.svelte';

  export let aboutUs: LandingPage;

  let submitting: boolean = false;
  let show: boolean = false;

  const preview = () => {
    show = true;
  }

  const update = async () => {
    submitting = true;

    let data: LandingPageUpdate = {
      body: aboutUs.body,
      preview: aboutUs.preview,
    };

    const { response, json } = await ApiService.put(
      String(import.meta.env.VITE_API_URL),
      `admin/landing_pages/${aboutUs.slug}`,
      { landing_page: data, creds: true },
      { aud: $aud },
    );

    if (response.status == 401) logOut();

    if (response.ok) {
      submitting = false;
      FlashMessageService.setMessage({
        message: "About Us successfully updated!",
        type: "success"
      });
    } else {
      submitting = false;
      FlashMessageService.setMessage({
        message: "Unexpected error. If it persists contact support.",
        type: "error"
      });
    };
  };
</script>

<svelte:head>
	<title>Admin | About Us</title>
</svelte:head>

<main class="squeeze-16 squish-16">
  <h1 class="stack-16">
    About Us
  </h1>
  <form class="squish-24 squeeze-32 flex-row">
    <label for="body" class="text-small text-style-metadata text-style-italic">
      Preview
    </label>
    <textarea
      name="body"
      class="stack-16 squeeze-8 squish-8 text-medium text-normal"
      rows="10"
      bind:value={aboutUs.preview}
    />
    <label for="body" class="text-small text-style-metadata text-style-italic">
      Body
    </label>
    <textarea
      name="body"
      class="stack-16 squeeze-8 squish-8 text-medium text-normal"
      rows="25"
      bind:value={aboutUs.body}
    />
    <div>
      <button
        class="panel button spread-8"
        type="submit"
        on:click|preventDefault={update}
      >
        Update
      </button>
      <button
        class="panel button spread-8"
        type="submit"
        on:click|preventDefault={preview}
      >
        Preview
      </button>
      <a class="spread-8" href="/admin">
        Cancel
      </a>
    </div>
  </form>
</main>

<PreviewModal bind:show>
  <AboutUs aboutUs={{
    body: aboutUs.body,
    created_at: new Date(),
    updated_at: new Date(),
    slug: "about-us",
    name: "about us",
    id: 0
  }} />
</PreviewModal>
