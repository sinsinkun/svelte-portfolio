<script lang="ts">
  export let onClick: Function = () => null;
  export let poolColor: string = "";
  let btnRoot: Node;

  function handle_click(e:MouseEvent) {
    // console.log("click event", e.offsetX, e.offsetY);
    // build pool element
    let newElem = document.createElement("div");
    newElem.classList.add("pool");
    newElem.style.left = e.offsetX + "px";
    newElem.style.top = e.offsetY + "px";
    if (poolColor) newElem.style.backgroundColor = poolColor;
    newElem.style.animation = "pool-out 0.3s linear";
    btnRoot.appendChild(newElem);

    // delete pool element
    setTimeout(() => {
      btnRoot.removeChild(newElem);
    }, 400);
    if (onClick) onClick();
  }
</script>

<style>
  button {
    position: relative;
    overflow: hidden;
    border: none;
    background-color: var(--bg-color-4);
    cursor: pointer;
    transition: 0.5s cubic-bezier(0.075, 0.82, 0.165, 1);
    padding: 6px 16px;
  }
  button:hover {
    background-color: var(--bg-color-5);
  }
  :global(.pool) {
    position: absolute;
    aspect-ratio: 1;
    background-color: var(--color-3);
    border-radius: 50%;
    transform: translate(-50%, -50%);
    pointer-events: none;
  }
  /* animation key frames */
  @keyframes -global-pool-out {
    0% {
      opacity: 0%;
      width: 0%;
    }
    30% {
      width: 50%;
      opacity: 30%;
    }
    60% {
      width: 100%;
      opacity: 30%;
    }
    100% {
      width: 200%;
      opacity: 0%;
    }
  }
</style>

<button 
  bind:this={btnRoot} 
  on:click={handle_click}
  {...$$restProps}
>
  <div style="pointer-events:none">
    <slot />
  </div>
</button>