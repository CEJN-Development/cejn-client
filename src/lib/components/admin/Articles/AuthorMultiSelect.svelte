<script lang="ts">
  import type { Writer } from "$lib/types/Writers";
  import Icon from "$lib/components/admin/shared/Icon.svelte";
  import { onMount, tick } from "svelte";
  import AuthorMultiSelectPill from "./AuthorMultiSelectPill.svelte";

  export let writers:Writer[] = [];
  export let authoredBy:number[] = [];

  let filteredWriters:Writer[] = [...writers];
  let inputElement:HTMLInputElement;
  let expanded:boolean = false;
  let selectedAuthors:Writer[];

  const expand = async () => {
    expanded = true;
    await tick();
    inputElement.focus();
  };

  const filterWriters = (e) => {
    filteredWriters = writers
      .filter(writer =>
        writer
          .full_name
          .toLowerCase()
          .includes(e.target.value.toLowerCase()));
  };

  const updateSelection = (e) => {
    authoredBy = [...e.detail];
  };

  const evaluateNextClick = (e) => {
    window.addEventListener("click", close, { once: true });
  };

  const voidEvaluation = (e) => {
    window.removeEventListener("click", close);
  };

  const close = (e) => {
    expanded = false;
  };

  $: {
    filteredWriters
    selectedAuthors = authoredBy.map(author_id => writers.find(writer => writer.id == author_id));
  };
</script>

{#if !expanded}
  <div
    class="flex-column align-start space-between stack-16 squeeze-8 squish-8 bordered raised cursor-pointer"
    on:click={expand}
  >
    <div id="selected-authors">
      {selectedAuthors.map(author => author.full_name).join(", ")}
    </div>
    <div class="flex-row">
      <Icon
        name="arrow_down"
        alt="Arrow on multi select component expander"
      />
    </div>
  </div>
{:else}
  <div
    id="activeMultiSelectContainer"
    on:mouseleave={evaluateNextClick}
    on:mouseover={voidEvaluation}
    on:focus={voidEvaluation}
  >
    <input
      name="author"
      type="text"
      class="squeeze-8 squish-8 border-bottom--square full-width"
      bind:this={inputElement}
      on:keyup={filterWriters}
      on:change={filterWriters}
      placeholder={"Filter by writer's name"}
    />
    <div class="stack-16">
      <form
        class="dropdown bordered border-top--square raised"
        style={inputElement ? `width: ${inputElement.offsetWidth - 2}px` : ""}
      >
        <div
          id="selected-authors"
          class="bordered bordered-bottom border--square squeeze-8 squish-8 flex-column flex-wrap gap-8"
          class:active={expanded}
        >
          {#if selectedAuthors.length}
            {#each selectedAuthors as author}
              <AuthorMultiSelectPill
                {author}
                {authoredBy}
                on:deselect={updateSelection}
              /> 
            {/each}
          {/if}
        </div>
        <ul class="squeeze-16 squish-16">
          {#each writers as writer}
            <li class:hidden={!filteredWriters.map(filteredWriter => Number(filteredWriter.id)).includes(Number(writer.id))}>
              <input
                class="stack-8 cursor-pointer"
                type="checkbox"
                bind:group={authoredBy}
                name={writer.slug}
                id={writer.slug}
                value={writer.id}
              />
              <label class="cursor-pointer" for={writer.slug}>
                {writer.full_name}
              </label>
            </li>
          {/each}
        </ul>
      </form>
    </div>
  </div>
{/if}

<style>
  .dropdown {
    position: absolute;
    width: fit-content;
    background-color: white;
  }

  .hidden {
    display: block;
    visibility: hidden;
    height: 0px;
    overflow: hidden;
  }

  #selected-authors.active {
    min-height: calc(var(--spacing-32) + 3px);
  }
</style>
