<script lang="ts">
  import type { Article } from "$lib/types/Articles";

  export let article:Article;

  const truncateWithEllipses = (text:string, max:number) => {
    return text.length > max ? text.split("", max).join("") + "&hellip;" : text;
  }

  article.sample = truncateWithEllipses(article.sample, 300);

</script>

<div class="squish-16 squeeze-16 card">
  <p class="text-strong text-regular stack-8">{article.title}</p>
  <p class="text-normal text-small">{@html article.sample}</p>
</div>
