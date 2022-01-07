<script lang="ts">
  export let cloudinaryImageUrl: string = "";
  export let options: any = {};
  export let classes: string = "";

  const defaultOptions = {
    width: 500,
    height: 281,
  };

  const cloudinaryBaseUrl = "https://res.cloudinary.com/cejn-dev/image/upload/";

  let cloudinaryPublicId: string;
  let imagePath: string;

  $: {
    options = { ...defaultOptions, ...options };
    cloudinaryPublicId = cloudinaryImageUrl?.split(cloudinaryBaseUrl).join("/");
    imagePath = `${cloudinaryBaseUrl}c_fit,h_${options.height},w_${options.width + cloudinaryPublicId}`;
  };
</script>

<img
  class={classes}
  src={imagePath}
/>

<style>
  img {
    width: 100%;
    height: fit-content;
  }
</style>
