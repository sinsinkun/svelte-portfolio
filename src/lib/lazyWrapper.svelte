<script>
  import viewport from "./useViewport";
  let show = false;
</script>

<div use:viewport on:enterViewport={() => show = true}>
  {#if show}
    <slot />
  {/if}
</div>