<script lang="ts">
  // non-render essential variables
  let initCoord: Coordinates2D = {x:160, y:160};
  let initClient: Coordinates2D = {x:0, y:0};
  let finalCoord: Coordinates2D = {x:0, y:0};

  let coords: Coordinates2D = {x:160, y:160};
  let drag: boolean = false;

  $: boxStyle = `transform:translate(${coords.x}px, ${coords.y}px)`;

  function moveBoxTo(x:number, y:number) {
    // restrict x
    if (x < 0) x = 0;
    else if (x > 320) x = 320;
    // restrict y
    if (y < 0) y=0;
    if (y > 320) y=320;
    // update target location
    finalCoord.x = Math.round(x / 40) * 40;
    finalCoord.y = Math.round(y / 40) * 40;
    coords = {x:x, y:y}; 
  }

  function trackMouse(e: MouseEvent) {
    let newCoordX = initCoord.x + e.clientX - initClient.x;
    let newCoordY = initCoord.y + e.clientY - initClient.y;
    moveBoxTo(newCoordX, newCoordY);
  }

  function trackTouch(e: TouchEvent) {
    e.preventDefault();
    let newCoordX = initCoord.x + e.touches[0].clientX - initClient.x;
    let newCoordY = initCoord.y + e.touches[0].clientY - initClient.y;
    moveBoxTo(newCoordX, newCoordY);
  }

  function removeTrack() {
    console.log("REMOVE TRACK");
    coords = {x:finalCoord.x, y:finalCoord.y};
    drag = false;
    window.removeEventListener('mousemove', trackMouse);
    window.removeEventListener('mouseup', removeTrack);
    window.removeEventListener('touchmove', trackTouch);
    window.removeEventListener('touchend', removeTrack);
  }

  function handleMouseDown(e: MouseEvent) {
    if (!e.clientX || !e.clientY) return;
    initClient = {x:e.clientX, y:e.clientY};
    initCoord = coords;
    drag = true;

    // attach listeners
    window.addEventListener('mousemove', trackMouse);
    window.addEventListener('mouseup', removeTrack);
  }

  function handleTouchStart(e: TouchEvent) {
    e.preventDefault();
    if (!e?.touches?.[0]) return;
    initClient = {x:e.touches[0].clientX, y:e.touches[0].clientY};
    initCoord = coords;
    drag = true;

    // attach listeners
    window.addEventListener('touchmove', trackTouch);
    window.addEventListener('touchend', removeTrack);
  }
</script>

<style>
  p {
    margin: auto;
  }
  .bg {
    position: relative;
    width: 400px;
    height: 400px;
    background-color: var(--color-3);
    border: 1px solid var(--color-1);
    background-image: linear-gradient(0deg,transparent -1%,var(--color-1) 0,var(--color-1) 1%,transparent 2%,transparent 49%,var(--color-1) 50%,var(--color-1) 51%,transparent 52%,transparent),linear-gradient(90deg,transparent -1%,var(--color-1) 0,var(--color-1) 1%,transparent 2%,transparent 49%,var(--color-1) 50%,var(--color-1) 51%,transparent 52%,transparent);
    background-size: 80px 80px;
    margin: auto;
  }
  .box {
    position: absolute;
    width: 80px;
    height: 80px;
    background-color: var(--color-4);
    cursor: pointer;
  }
  .box:hover {
    background-color: var(--color-5);
  }
  .box:active {
    background-color: var(--color-6);
  }
</style>

<div>
  <h3>Drag and Drop</h3>
  <p>
    This demo features a square that can be picked up and dropped anywhere within its container, 
    which is achieved through event listeners. The position of the cursor is tracked, 
    which is then used to calculate the position of the square, relative to its container. 
    The square is also configured to snap to the grid.
  </p>
  <br />
  <div class="bg">
    <div 
      class="box"
      style={boxStyle}
      aria-pressed={drag}
      role="button"
      tabindex=0
      on:mousedown={handleMouseDown}
      on:touchstart={handleTouchStart}
    />
  </div>
</div>