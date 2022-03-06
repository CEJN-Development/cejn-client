<script lang="ts">
  import type { Writer } from "$lib/types/Writers";
  import CloudinaryImage from "./CloudinaryImage.svelte";

  export let writer: Writer = null;
  export let linkToByline = false;
</script>

<section class="flex-reactive gap-16 stack-24">
  <div class="writer-image">
    <CloudinaryImage
      classes={"border--rounded-circle"}
      cloudinaryImageUrl={writer.cloudinary_image_url}
      options={{ height: 350, width: 350, crop: "fill" }}
    />
  </div>
  <div>
    <p class="text-strong stack-8" class:text-large={!linkToByline}>
      {#if linkToByline}
        <a href={`/writers/${writer.slug}`}>{writer.full_name}</a>
      {:else}
        {writer.full_name}
      {/if}
    </p>
    {#each writer.byline.split("\n\n") as paragraph}
      <p class="stack-8">
        {@html paragraph}
      </p>
    {/each}
  </div>
</section>

<style>
  .writer-image {
    min-width: 150px;
    flex: 0;
  }
</style>