<script lang="ts">
  import articlesData from "../../tmp/articles.json";

  let articles = articlesData;

  const truncate = (text:string) => {
    let n = 600;
    return (text.length > n) ? text.substr(0, n - 1) + '&hellip;' : text;
  }
</script>

<h1 class="text-strong text-large stack-24">Latest Posts</h1>
{#each articles as article}
  <p class="text-strong text-normal stack-8">{article.title}</p>
  <span class="text-medium text-normal stack-24">
    {#each truncate(article.body).split("\n\n") as paragraph}
      <p class="stack-8">{@html paragraph}</p>
    {/each}
    <a href="/">Read full article</a>
  </span>
  <hr class="separator stack-24" />
{/each}

<style>
  .separator {
    width: 80%;
    margin-left: auto;
    margin-right: auto;
  }
</style>