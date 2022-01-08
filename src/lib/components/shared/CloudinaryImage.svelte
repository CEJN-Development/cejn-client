<script lang="ts">
  import type { CloudinaryImageOptions } from "$lib/types/CloudinaryImage";

  export let cloudinaryImageUrl: string = "";
  export let options: CloudinaryImageOptions = {};
  export let classes: string = "";

  const defaultOptions: CloudinaryImageOptions = {
    width: 500,
    height: 281,
    crop: "fit",
  };

  const cloudinaryBaseUrl = "https://res.cloudinary.com/cejn-dev/image/upload/";

  let cloudinaryPublicId: string;
  let imagePath: string;
  let cropping: string;
  let dimensions: string;
  let renderImage: boolean;

  const getCropValue = (options: CloudinaryImageOptions) => {
    if (options.crop == "fit") return "c_fit";
    else if (options.crop == "fill") return "c_fill,g_auto";
    else if (options.crop == "fill_pad") return "b_auto,c_fill_pad,g_auto";
  };

  const getDimensions = (options: CloudinaryImageOptions) => {
    return `h_${options.height},w_${options.width}`;
  };

  $: {
    options = { ...defaultOptions, ...options };
    cloudinaryPublicId = cloudinaryImageUrl?.split(cloudinaryBaseUrl).join("/");
    renderImage = Number(cloudinaryImageUrl) != 0;// value could potentially be null or ""
    cropping = getCropValue(options);
    dimensions = getDimensions(options);
    imagePath = `${cloudinaryBaseUrl}${cropping},${dimensions}${cloudinaryPublicId}`;
  };
</script>

{#if renderImage}
  <img
    class={classes}
    src={imagePath}
  />
{/if}

<style>
  img {
    width: 100%;
    height: fit-content;
  }
</style>
