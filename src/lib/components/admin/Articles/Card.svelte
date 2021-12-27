<script lang="ts">
  import type { Article } from "$lib/types/Articles";
  import { truncateWithEllipses } from "$lib/helpers";

  export let article:Article;

  let sample:string;
  let authorNames:string;

  $: {
    sample = truncateWithEllipses(article.sample, 300);
    authorNames = article.authors.map(author => { return author.full_name }).join(", ");
  };
</script>

<div class="squish-16 squeeze-16 card">
  <p class="text-strong text-normal stack-8">
    {article.title}
  </p>
  {#if article.authors.length >= 1}
    <p class="text-thin text-small stack-8">
      By: {authorNames} 
    </p>
  {/if}
  <p class="text-medium text-normal">
    {@html sample}
  </p>
</div>
