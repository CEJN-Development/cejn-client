<script lang="ts">
  import type { Bio } from "$lib/types/Bios";
  import CloudinaryImage from "../shared/CloudinaryImage.svelte";

  export let bios: Bio[] = [];
</script>

<section class="flex-row stack-24">
  <h1 class="flex-row stack-24 text-large">Who is CEJN?</h1>
  {#if bios?.length > 0}
    {#each bios as bio}
      <section class="stack-48">
        <div class="image">
          <CloudinaryImage
            cloudinaryImageUrl={bio.cloudinary_image_url}
            options={{ height: 430, width: 242 }}
          />
        </div>
        <p class="text-strong text-large stack-8">{bio.name}</p>
        <p class="text-medium text-normal stack-16">{bio.blurb}</p>
        <a class="text-strong text-normal" href={`/who-is-cejn/${bio.slug}`}>Learn more about {bio.name}</a>
      </section>
    {/each}
  {:else}
    <p class="text-medium text-normal stack-16">There are currently no member bios.</p>
  {/if}
</section>

<style>
  h1 {
    text-align: center;
  }

  section section .image {
    width: 100%;
    border-radius: 10rem;
    overflow: hidden;
    line-height: 0;
  }

  @media screen and (min-width: 600px) {
    section section {
      text-align: right;
    }

    section section .image {
      width: 100%;
      min-width: 175px;
      max-width: 30%;
      height: fit-content;
      float: left;
      margin: var(--spacing-8) var(--spacing-8) 0 0;
    }

    section section:nth-child(2n) {
      text-align: left;
    }

    section section:nth-child(2n) .image {
      float: right;
      margin: var(--spacing-8) 0 0 var(--spacing-8);
    }
  }
</style>
