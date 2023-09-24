<script>
  import viewport from "./useViewport";
  let hidden = true;
</script>

<style>
  .hidden {
    visibility: hidden;
  }
</style>

<div 
  use:viewport 
  on:enterViewport={() => hidden = false}
  class:hidden={hidden}
>
  <!-- Force re-render to get animation -->
  {#if hidden}
    <slot />
  {:else}
    <slot /> 
  {/if}
</div>