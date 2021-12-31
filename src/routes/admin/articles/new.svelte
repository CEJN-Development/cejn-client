<script context="module" lang="ts">
	export const prerender = true;

	export async function load({ page, fetch, session, stuff }) {
		const writersRes = await fetch(`${import.meta.env.VITE_API_URL}/admin/writers`);
		if (!writersRes.ok) return {
			status: writersRes.status,
			error: new Error("Could not load writers")
		};

		let writers = await writersRes.json();

		return {
			props: {
				writers
			},
		};
	};
</script>

<script lang="ts">
	import { aud } from '$lib/stores/UserAgentStore';
  import * as ApiService from "$lib/services/ApiService";
  import type { Writer } from '$lib/types/Writers';
  import AuthorMultiSelect from '$lib/components/admin/Articles/AuthorMultiSelect.svelte';

  export let writers:Writer[];

  let title:string;
  let authoredBy:number[];
  let body:string;
  let excerpt:string;
  let photo:string | ArrayBuffer;
  let imageUploadInput:HTMLInputElement;

  const submit = async () => {
    let data:any = {
      body,
      excerpt,
      title,
    };

    if (photo) data.photo = photo;

    const { response, json } = await ApiService.post(
      String(import.meta.env.VITE_API_URL),
      "/admin/articles",
      {
        article: data,
        creds: true
      },
      { aud: $aud }
    );
  };

  const saveDraft = () => {
    console.log(title, "title");
    console.log(excerpt, "excerpt");
    console.log(body, "body");
    console.log(photo, "photo");
  };

  const getBaseUrl = (e) => {
    let file = e.target.files[0];
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => photo = reader.result;
  };

  const clearImageUploadInput = () => {
    imageUploadInput.files[0] = undefined;
    photo = undefined;
  };
</script>

<h1 class="squish-16 squeeze-16">Our Stories | New</h1>

<div>
  <form class="squish-24 squeeze-24 flex-row">
    <label for="title" class="text-small text-style-metadata text-style-italic">
      Title
    </label>
    <input
      name="title"
      type="text"
      class="stack-16 squeeze-8 squish-8"
      bind:value={title}
    />
    <label for="author" class="text-small text-style-metadata text-style-italic">
      Author(s)
    </label>
    <AuthorMultiSelect
      {writers}
      bind:authoredBy
    />
    <label for="excerpt" class="text-small text-style-metadata text-style-italic">
      Excerpt
    </label>
    <textarea
      name="excerpt"
      class="stack-16 squeeze-8 squish-8 text-medium text-normal"
      rows="4"
      bind:value={excerpt}
    />
    <label for="body" class="text-small text-style-metadata text-style-italic">
      Body
    </label>
    <textarea
      name="body"
      class="stack-16 squeeze-8 squish-8 text-medium text-normal"
      rows="20"
      bind:value={body}
    />
    <label for="cover-image" class="text-small text-style-metadata text-style-italic">
      Cover Image
    </label>
    <input
      type="file"
      name="cover-image"
      accept=".jpeg, .png, .jpg"
      class="stack-16 panel"
      bind:this={imageUploadInput}
      on:change={getBaseUrl}
    />
    <div>
      <button
        class="panel button spread-8"
        type="submit"
        on:click|preventDefault={submit}
      >
        Preview
      </button>
      <button
        class="panel button"
        type="submit"
        on:click|preventDefault={saveDraft}
      >
        Save as Draft
      </button>
    </div>
  </form>
</div>

<style>
  form {
    max-width: 600px;
    margin-left: auto;
    margin-right: auto;
  }
</style>