<script lang="ts">
	import { aud } from '$lib/stores/UserAgentStore';
  import * as ApiService from "$lib/services/ApiService";

  let name:string;
  let byline:string;
  let photo:string | ArrayBuffer;
  let imageUploadInput:HTMLInputElement;

  const submit = async () => {
    let data:any = {
      full_name: name,
      byline,
    }
    if (photo) data.photo = photo;
    const { response, json } = await ApiService.post(
      String(import.meta.env.VITE_API_URL),
      "/admin/writers", 
      {
        writer: data,
        creds: true
      },
      { aud: $aud }
    );
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

<h1 class="squish-16 squeeze-16">Our Contributors | New</h1>

<form class="squish-24 squeeze-32 flex-row">
  <label for="title" class="text-small text-style-metadata text-style-italic">
    Full name
  </label>
  <input
    name="title"
    type="text"
    class="stack-16 squeeze-8 squish-8"
    bind:value={name}
  />
  <label for="body" class="text-small text-style-metadata text-style-italic">
    Byline
  </label>
  <textarea
    name="body"
    class="stack-16 squeeze-8 squish-8 text-medium text-normal"
    rows="5"
    bind:value={byline}
  />
  <label for="cover-image" class="text-small text-style-metadata text-style-italic">
    Photo
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
      Save
    </button>
  </div>
</form>
