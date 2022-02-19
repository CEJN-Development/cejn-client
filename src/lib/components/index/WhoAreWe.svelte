<script lang="ts">
  import type { Organization } from "$lib/types/Organizations";
  import CloudinaryImage from "../shared/CloudinaryImage.svelte";

  export let organizations: Organization[] = [];
</script>

<section class="flex-row stack-48">
  <h1 class="flex-row stack-24 text-large">Who is CEJN?</h1>
  {#if organizations?.length > 0}
    {#each organizations as organization}
      <section class="stack-24">
        <div class="image">
          <CloudinaryImage
            cloudinaryImageUrl={organization.cloudinary_image_url}
            options={{ height: 242, width: 430, crop: "fill_pad" }}
          />
        </div>
        <p class="text-strong text-large stack-8">{organization.name}</p>
        <p class="text-medium text-normal stack-16">{organization.blurb}</p>
        <a class="text-strong text-normal" href={`/who-is-cejn/${organization.slug}`}>
          Learn more about {organization.name}
        </a>
      </section>
    {/each}
  {:else}
    <p class="text-medium text-normal stack-16">
      There are currently no member organizations.
    </p>
  {/if}
</section>

<style>
  h1 {
    text-align: center;
  }

  section section .image {
    width: 100%;
    border-radius: 1rem;
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
