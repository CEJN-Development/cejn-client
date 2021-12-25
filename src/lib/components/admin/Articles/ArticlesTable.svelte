<script lang="ts">
  import type { Article } from "$lib/types/Articles";
  import Card from "./Card.svelte";

  export let articles:Article[] = [];
</script>

<section>
  {#each articles as article}
    <Card {article} />
  {/each}
</section>

<style>
  section {
    max-width: fit-content;
    display: grid;
    grid-gap: 1rem;
  }

  @media screen and (min-width: 700px) {
    section {
      grid-template-columns: repeat(2, 1fr);
    }
  }

  @media screen and (min-width: 900px) {
    section {
      grid-template-columns: repeat(3, 1fr);
    }
  }
</style>
