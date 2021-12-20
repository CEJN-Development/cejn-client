<script lang="ts">
  import organizersData from "../../tmp/organizers.json"
  let organizers = [...organizersData];
</script>

<section class="flex-row stack-48">
  <h1 class="flex-row stack-24 text-large">Who is CEJN?</h1>
  {#each organizers as organizer}
    <section class="stack-32">
      <img class="stack-8" src="../../tmp/{organizer.img}" alt={organizer.name} />
      <div>
        <p class="text-strong text-large stack-8">{organizer.name}</p>
        <p class="text-medium text-normal stack-16">{organizer.blurb}</p>
        <a class="text-strong text-normal" href="/">Learn more about {organizer.name}</a>
      </div>
    </section>
  {/each}
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