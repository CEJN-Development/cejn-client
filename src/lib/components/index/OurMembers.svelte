<script lang="ts">
  import type { Organization } from "$lib/types/Organizations";
  import CloudinaryImage from "$lib/components/shared/CloudinaryImage.svelte";

  export let organizations: Organization[] = [];

  let hasOrganizations: boolean = false;

  $:{
    hasOrganizations = !!organizations?.length;
  };
</script>

<section class="flex-row stack-48">
  <h1 class="flex-row stack-24 text-large">
    Our Members
  </h1>
  {#if hasOrganizations}
    {#each organizations as organization}
      <section class="stack-24 flex-reactive">
        <div class="image flex-1 squeeze-8 squish-8">
          <CloudinaryImage
            cloudinaryImageUrl={organization.cloudinary_image_url}
            options={{ height: 600, width: 600, crop: "fit" }}
          />
        </div>
        <div class="flex-1 squeeze-8 squish-8">
          <p class="text-strong text-large stack-8">{organization.name}</p>
          <p class="text-medium text-normal stack-16">{organization.blurb}</p>
          <a class="text-strong text-normal" href={`/our-members/${organization.slug}`}>
            Learn more about {organization.name}
          </a>
        </div>
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
      height: fit-content;
    }

    section section:nth-child(2n) {
      text-align: left;
      flex-direction: row-reverse;
    }
  }
</style>
