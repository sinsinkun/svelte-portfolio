<script>

</script>

<style>
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
</style>

<div>
  <h3>Drag and Drop</h3>
  <p>
    This demo features a square that can be picked up and dropped anywhere within its container, 
    which is achieved through event listeners. The position of the cursor is tracked, 
    which is then used to calculate the position of the square, relative to its container. 
    The square is also configured to snap to the grid.
  </p>
  <div class="bg">
    <div class="box" />
  </div>
</div>