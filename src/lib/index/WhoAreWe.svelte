<script lang="ts">
  import type { Bio } from "$lib/types/bios";

  export let bios:Bio[] = [];
</script>

<section class="flex-row stack-24">
  <h1 class="flex-row stack-24 text-large">Who is CEJN?</h1>
  {#if bios?.length > 0}
    {#each bios as bio}
      <section class="stack-48">
        <img class="stack-8" src="/images/bios/{bio.slug}.jpg" alt={bio.name} />
        <div>
          <p class="text-strong text-large stack-8">{bio.name}</p>
          <p class="text-medium text-normal stack-16">{bio.blurb}</p>
          <a class="text-strong text-normal" href={`/who-is-cejn/${bio.slug}`}>Learn more about {bio.name}</a>
        </div>
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

  section section img {
    width: 100%;
    border-radius: 10rem;
    flex: min-content;
  }

  @media screen and (min-width: 500px) {
    section section {
      display: flex;
      grid-gap: 2rem;
    }

    section section:nth-child(2n) {
      flex-direction: row-reverse;
    }
  }
</style>