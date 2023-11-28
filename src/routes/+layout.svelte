<script lang="ts">
  import { onMount } from "svelte";
  import { Navbar, Footer } from "$lib";
  import { winW, winH, mouseCoords } from "$lib/mediaQuery";
  let bgInit: Function = () => null;

  // global media query listener
  const resizeListener = (e: UIEvent) => {
    const target = e.target as Window;
    winW.set(target?.innerWidth || 0);
    winH.set(target?.innerHeight || 0);
  };

  // global mouse tracker
  const mouseListener = (e: MouseEvent) => {
    mouseCoords.set({ x: e.clientX, y: e.clientY });
  }

  const touchListener = (e: TouchEvent) => {
    mouseCoords.set({ x:e.touches[0].clientX, y:e.touches[0].clientY });
  }

  onMount(() => {
    if (!window) return;
    winW.set(window.innerWidth || 0);
    winH.set(window.innerHeight || 0);
    window.addEventListener("resize", resizeListener);
    window.addEventListener("mousemove", mouseListener);
    window.addEventListener("touchmove", touchListener);
    // import background
    (async () => {
      bgInit = (await import('../lib/background')).init;
      bgInit(document.getElementById('bg-container'));
    })();

    // handle cleanup
    return () => {
      window.removeEventListener("resize", resizeListener);
      window.removeEventListener("mousemove", mouseListener);
      window.removeEventListener("touchmove", touchListener);
    }
  })
</script>

<style>
  :global(*) {
    box-sizing: border-box;
  }
  :global(body) {
    padding: 0;
    margin: 0;
    font-family: "Segoe UI",Tahoma,Geneva,Verdana,sans-serif;
    box-sizing: content-box;
    background-color: var(--bg-color-3);
    color: var(--color-1);
    /* Custom colors */
    --bg-color-1: rgb(26, 26, 27);
    --bg-color-2: rgb(35, 30, 30);
    --bg-color-3: rgb(42, 42, 51);
    --bg-color-4: rgb(136, 136, 136);
    --bg-color-5: rgb(187, 187, 187);
    --bg-color-c: #1a1a1b66;
    --color-1: rgb(255,255,255);
    --color-1-50: rgba(255,255,255,0.5);
    --color-2: rgb(59, 196, 238);
    --color-3: rgb(40, 97, 182);
    --color-4: rgb(211, 44, 128);
    --color-5: rgb(163, 26, 111);
    --color-6: rgb(131, 12, 85);
    --color-7: rgb(10, 10, 10);
    --color-warn: rgb(245, 184, 71);
    --color-error: rgb(206, 39, 39);
  }

  :global(body[data-theme='light']) {
    --bg-color-1: rgb(224, 224, 224);
    --bg-color-2: rgb(230, 196, 196);
    --bg-color-3: rgb(182, 182, 214);
    --bg-color-4: rgb(117, 116, 116);
    --bg-color-5: rgb(68, 68, 68);
    --bg-color-c: #e6ecec22;
    --color-1: rgb(0,0,0);
    --color-1-50: rgba(0,0,0,0.5);
    --color-2: rgb(41, 31, 177);
    --color-3: rgb(57, 112, 214);
    --color-4: rgb(119, 16, 16);
    --color-5: rgb(184, 18, 18);
    --color-6: rgb(214, 24, 24);
    --color-7: rgb(245, 245, 245);
  }

  /* Remove header margins by default */
  :global(h1, h2, h3, h4, h5, h6) {
    margin: 0;
  }

  /* Remove underlines for links by default */
  :global(a:link) { text-decoration: none; color: var(--color-1); }
  :global(a:visited) { text-decoration: none; color: var(--color-1); }
  :global(a:hover) { text-decoration: none; color: var(--color-2); }
  :global(a:active) { text-decoration: none; color: var(--color-3); }

  /* Custom scrollbar */
  /* width */
  :global(::-webkit-scrollbar) {
    width: 10px;
  }
  /* Track */
  :global(::-webkit-scrollbar-track) {
    background: #f1f1f1;
  }
  /* Handle */
  :global(::-webkit-scrollbar-thumb) {
    background: #888;
  }
  /* Handle on hover */
  :global(::-webkit-scrollbar-thumb:hover) {
    background: #555;
  }

  /* Background for main body */
  .global-container {
    position: relative;
    margin: 0;
    text-align: center;
    min-height: 100vh;
    padding-top: 48px;
  }

  :global(.content-root) {
    max-width: 1400px;
    width: 80%;
    margin: auto;
    padding: 16px;
    background: var(--bg-color-c);
    min-height: calc(100vh - 80px);
    overflow-x: hidden;

    @media (max-width: 900px) {
      width: 100%;
    }
  }

  /* WebGL background */
  .bg {
    position: fixed;
    top: 0;
    left: 0;
  }
</style>

<div id="bg-container" class="bg"></div>
<Navbar />
<main class="global-container">
  <slot />
  <Footer />
</main>