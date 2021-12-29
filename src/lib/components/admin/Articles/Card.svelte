<script lang="ts">
  import type { Article } from "$lib/types/Articles";
  import { truncateWithEllipses } from "$lib/helpers";
  import moment from "moment";

  export let article:Article;

  const CLOUDINARY_BASE_URL = "https://res.cloudinary.com/cejn-dev/image/upload";
  const cloudinary_public_id = article.cloudinary_image_url?.split(CLOUDINARY_BASE_URL)[1];

  let sample:string;
  let authorNames:string;
  let image_path:string;

  $: {
    sample = truncateWithEllipses(article.sample, 300);
    authorNames = article.authors.map(author => { return author.full_name }).join(", ");
    image_path = cloudinary_public_id
      ? `${CLOUDINARY_BASE_URL}/b_auto,c_fill_pad,g_auto,h_169,w_300${cloudinary_public_id}`
      : "";
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
</div>

<style>
  .card > img {
    width: 100%;
    height: auto;
  }
</style>