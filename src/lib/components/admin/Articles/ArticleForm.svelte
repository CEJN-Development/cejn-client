<script lang="ts">
  import { aud } from '$lib/stores/UserAgentStore';
  import * as ApiService from "$lib/services/ApiService";
  import type { Writer } from '$lib/types/Writers';
  import AuthorMultiSelect from '$lib/components/admin/shared/MultiSelect.svelte';
  import type { MultiSelectObject } from '$lib/types/MultiSelect';
  import type { Article, ArticleCreate, ArticleUpdate } from '$lib/types/Articles';
  import { numericArrayEquality } from '$lib/helpers';

  export let article: Article = null;
  export let writers: Writer[];

  let authorIds: number[] = [];
  let body: string;
  let imageUploadInput: HTMLInputElement;
  let excerpt: string;
  let multiSelectWriters: MultiSelectObject[];
  let photo: string | ArrayBuffer;
  let title: string;
  let authorIdsOnLoad: number[] = article
    ?.authors
    .map(author => author.id)
    .sort((a,b) => a - b);

  const submit = async () => {
    let data:ArticleCreate = {
      body,
      excerpt,
      title,
      author_ids: [...authorIds],
    };

    if (photo) data.photo = photo;

    const { response, json } = await ApiService.post(
      String(import.meta.env.VITE_API_URL),
      "admin/articles",
      { article: data, creds: true },
      { aud: $aud },
    );
  };

  const update = async () => {
    let data:ArticleUpdate = {
      body,
      excerpt,
      title,
    };

    if (photo) data.photo = photo;
    if (!numericArrayEquality(authorIdsOnLoad, authorIds)) data.author_ids = [...authorIds];

    const { response, json } = await ApiService.put(
      String(import.meta.env.VITE_API_URL),
      `admin/articles/${article.id}`,
      { article: data, creds: true },
      { aud: $aud },
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

  if (article) {
    authorIds = article.authors.map(author => author.id);
    body = article.body;
    excerpt = article.excerpt;
    title = article.title;
  };

  $: {
    multiSelectWriters = writers
      .map(writer => {
        return {
          text: writer.full_name,
          key: writer.id,
          elementName: writer.slug,
        };
      });
  };
</script>

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
    bind:objectArray={multiSelectWriters}
    bind:keyArray={authorIds}
    className={"Writer"}
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
    {#if article?.id}
      <button
        class="panel button spread-8"
        type="submit"
        on:click|preventDefault={update}
      >
        Update
      </button>
    {:else}
      <button
        class="panel button spread-8"
        type="submit"
        on:click|preventDefault={submit}
      >
        Publish
      </button>
    {/if}
    <button
      class="panel button"
      type="submit"
      on:click|preventDefault={saveDraft}
    >
      Save as Draft
    </button>
  </div>
</form>

<style>
  form {
    max-width: 600px;
    margin-left: auto;
    margin-right: auto;
  }
</style>
