<script lang="ts">
  import { onMount } from "svelte";
  import type { Writable } from "svelte/store";

  let isCanvas: Writable<boolean>|null = null;
  
  onMount(() => {
    // import background
    (async () => {
      isCanvas = (await import('../../lib/background')).isCanvas;
      isCanvas.set(true);
    })();

    return () => {
      if (isCanvas) isCanvas.set(false);
    }
  })
</script>

<style>
  .canvas {
    padding-top: 16px;
    min-height: calc(100vh - 80px);
  }
</style>

<div class="canvas">
  <!-- nothing -->
</div>