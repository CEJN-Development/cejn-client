<script lang="ts">
  import Icon from "$lib/components/admin/shared/Icon.svelte";
  import { tick } from "svelte";
  import MultiSelectPill from "$lib/components/admin/shared/MultiSelectPill.svelte";

  export let objectArray:objectArrayType[] = [];
  export let keyArray:number[] = [];
  export let className:string = "Object";

  interface objectArrayType {
    text: string
    key: number
    elementName: string
  };

  let filteredObjects:objectArrayType[] = [...objectArray];
  let inputElement:HTMLInputElement;
  let formElement:HTMLFormElement;
  let expanded:boolean = false;
  let selectedObjects:objectArrayType[];

  const expand = async () => {
    expanded = true;
    await tick();
    inputElement.focus();
    formElement.style.width = `${inputElement.offsetWidth - 2}px`;
  };

  const filterObjects = (e) => {
    filteredObjects = objectArray
      .filter(object =>
        object
          .text
          .toLowerCase()
          .includes(e.target.value.toLowerCase()));
  };

  const updateSelection = (e) => {
    keyArray = [...e.detail];
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
    selectedObjects = keyArray.map(key => objectArray.find(object => object.key == key));
  };
</script>

{#if !expanded}
  <div
    class="flex-column align-start space-between stack-16 squeeze-8 squish-8 bordered raised cursor-pointer"
    on:click={expand}
  >
    <div id="selected-objects">
      {selectedObjects.map(object => object.text).join(", ")}
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
      name="object"
      type="text"
      class="squeeze-8 squish-8 border-bottom--square full-width"
      bind:this={inputElement}
      on:keyup={filterObjects}
      on:change={filterObjects}
      placeholder={`Filter by ${className.toLocaleLowerCase()}'s name`}
    />
    <div class="stack-16">
      <form
        class="dropdown bordered border-top--square raised"
        bind:this={formElement}
      >
        <div
          id="selected-objects"
          class="bordered bordered-bottom border--square squeeze-8 squish-8 flex-column flex-wrap gap-8"
          class:active={expanded}
        >
          {#if selectedObjects.length}
            {#each selectedObjects as object}
              <MultiSelectPill
                text={object.text}
                selectionId={object.key}
                selectionIds={keyArray}
                on:deselect={updateSelection}
              />
            {/each}
          {/if}
        </div>
        <ul class="squeeze-16 squish-16">
          {#each objectArray as object}
            <li class:hidden={!filteredObjects.map(filteredObject => Number(filteredObject.key)).includes(Number(object.key))}>
              <input
                class="stack-8 cursor-pointer"
                type="checkbox"
                bind:group={keyArray}
                name={object.elementName}
                id={object.elementName}
                value={object.key}
              />
              <label class="cursor-pointer" for={object.elementName}>
                {object.text}
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

  #selected-objects.active {
    min-height: calc(var(--spacing-32) + 3px);
  }
</style>
