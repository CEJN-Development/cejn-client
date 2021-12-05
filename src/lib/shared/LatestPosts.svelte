<script lang="ts">
  export let articles = [];
</script>

<h1 class="text-strong text-large stack-24">Latest Posts</h1>
{#if articles.length > 0}
  {#each articles as article}
    <p class="text-strong text-normal stack-8">{article.title}</p>
    <span class="text-medium text-normal stack-24">
      {#each article.sample.split("\n\n") as paragraph}
        <p class="stack-8">{@html paragraph}</p>
      {/each}
      <a href={`/articles/${article.slug}`}>Read full article &gt;&gt;</a>
    </span>
    <hr class="separator stack-24" />
  {/each}
{:else}
  <p class="text-medium text-normal stack-24">There are currently no published articles.</p>
  <hr class="separator stack-24" />
{/if}

<style>
  .separator {
    width: 80%;
    margin-left: auto;
    margin-right: auto;
  }

  .separator:last-child {
    width: 100%;
  }
</style>