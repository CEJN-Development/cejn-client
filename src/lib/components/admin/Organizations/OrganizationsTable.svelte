<script lang="ts">
  import type { Organization } from "$lib/types/Organizations";
  import Card from "./Card.svelte";

  export let organizations: Organization[] = [];
</script>

<section>
  {#each organizations as organization}
    <Card {organization} />
  {/each}
</section>

<style>
  section {
    display: grid;
    grid-gap: 1rem;
  }

  @media screen and (min-width: 900px) {
    section {
      grid-template-columns: repeat(2, 1fr);
    }
  }
</style>
