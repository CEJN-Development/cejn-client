<script lang="ts">
  let title:string;
  let author:string;
  let body:string;
  let coverImage:string | ArrayBuffer;
  let imageUploadInput:HTMLInputElement;

  const submit = () => {
    console.log(title, "title");
    console.log(body, "body");
    console.log(coverImage, "coverImage");
  };

  const saveDraft = () => {
    console.log(title, "title");
    console.log(body, "body");
    console.log(coverImage, "coverImage");
    console.log(author, "author");
  };

  const getBaseUrl = (e) => {
    let file = e.target.files[0];
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => coverImage = reader.result;
  };

  const clearImageUploadInput = () => {
    imageUploadInput.files[0] = undefined;
    coverImage = undefined;
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
    Author
  </label>
  <input
    name="author"
    type="text"
    class="stack-16 squeeze-8 squish-8"
    bind:value={author}
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
