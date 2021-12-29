<script lang="ts">
	import { aud } from '$lib/stores/UserAgentStore';
  import * as ApiService from "$lib/services/ApiService";

  let title:string;
  // let author:string[];
  let body:string;
  let excerpt:string;
  let photo:string | ArrayBuffer;
  let imageUploadInput:HTMLInputElement;

  const submit = async () => {
    let data:any = {
      title,
      body,
      excerpt,
    }
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

<form class="squish-24 squeeze-32 flex-row">
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
  <!-- <input
    name="author"
    type="text"
    class="stack-16 squeeze-8 squish-8"
    bind:value={author}
  /> -->
  <label for="body" class="text-small text-style-metadata text-style-italic">
    Excerpt
  </label>
  <textarea
    name="body"
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
