<script lang="ts">
  import type { Bio } from "$lib/types/Bios";
  import Card from "./Card.svelte";

  export let bios: Bio[] = [];
</script>

<section>
  {#each bios as bio}
    <Card {bio} />
  {/each}
</section>

<style>
  section {
    max-width: fit-content;
    display: grid;
    grid-gap: 1rem;
  }

  @media screen and (min-width: 900px) {
    section {
      grid-template-columns: repeat(2, 1fr);
    }
  }
</style>
