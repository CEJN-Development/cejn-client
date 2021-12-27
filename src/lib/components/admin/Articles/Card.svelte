<script lang="ts">
  import type { Article } from "$lib/types/Articles";
  import { truncateWithEllipses } from "$lib/helpers";
  import moment from "moment";

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
    <p class="text-thin text-small">
      <span class="text-style-italic">By:</span>
      {authorNames} 
    </p>
  {/if}
  <p class="text-thin text-small stack-8">
    <span class="text-style-italic">On:</span>
    {moment(article.created_at).format('LLL')} CST
  </p>
  <p class="text-medium text-normal">
    {@html sample}
  </p>
</div>
