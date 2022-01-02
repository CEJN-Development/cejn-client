<script lang="ts">
  import type { Article } from "$lib/types/Articles";
  import { getLocaleString, truncateWithEllipses } from "$lib/helpers";
  import Icon from "$lib/components/shared/Icon.svelte";

  export let article:Article;

  const CLOUDINARY_BASE_URL = "https://res.cloudinary.com/cejn-dev/image/upload";
  const cloudinary_public_id = article.cloudinary_image_url?.split(CLOUDINARY_BASE_URL)[1];

  let sample:string;
  let authorNames:string;
  let image_path:string;
	let publishedDate:Date;

  $: {
    sample = truncateWithEllipses(article.sample, 300);
    authorNames = article.authors.map(author => { return author.full_name }).join(", ");
    image_path = cloudinary_public_id
      ? `${CLOUDINARY_BASE_URL}/c_fill,g_auto,h_169,w_300${cloudinary_public_id}`
      : "";
    publishedDate = new Date(article.created_at);
  };
</script>

<div class="card">
  {#if cloudinary_public_id}
    <img
      src={image_path}
      alt={article.title}
      class="stack-8"
    />
  {/if}
  <div class="squeeze-16 stack-8">
    <div class="text-strong text-normal stack-8">
      {article.title}
    </div>
    {#if article.authors.length >= 1}
      <div class="text-thin text-small">
        <span class="text-style-italic">By:</span>
        {authorNames} 
      </div>
    {/if}
    <div class="text-thin text-small stack-8">
      <span class="text-style-italic">On:</span>
      {getLocaleString(publishedDate)}
    </div>
    <div class="text-medium text-normal stack-16">
      {article.excerpt}
    </div>
  </div>
  <div class="squeeze-16 flex-column space-between stack-16">
    <a href={`/admin/articles/edit/${article.id}`}>
      <Icon name="edit" />
    </a>
    <Icon name="delete" />
  </div>
</div>

<style>
  .card > img {
    width: 100%;
    height: auto;
  }
</style>
