<style>
  footer {
    background-color: var(--bg-color-2);
    color: var(--color-1);
    padding: 8px;
    padding-top: 26px;
    border-top: 1px solid var(--color-4);
    box-shadow: 0 0 15px var(--color-4);
  }
  footer p {
    margin: 0.2em 0;
  }
  footer h2, footer h3 {
    margin-bottom: 0.5em;
  }
  .grid {
    display: grid;
    grid-template-columns: 1fr 2fr;

    @media (max-width: 700px) {
      grid-template-columns: 1fr;
    }
  }
  footer>.grid {
    grid-row-gap: 16px;
  }
  .col-1 {
    text-align: left;
    @media (max-width: 700px) {
      text-align: center;
      order: 2;
    }
  }
  .col-2 {
    text-align: center;

    @media (max-width: 900px) and (min-width: 700px) {
      grid-column: 2/3;
      grid-row: 1/3;
    }
  }
  .col-3 {
    text-align: left;
    grid-column: 1/3;
    @media (max-width: 700px) {
      text-align: center;
      grid-column: auto;
      order: 3;
    }
  }
</style>

<footer>
  <div class="grid">
    <!-- Info -->
    <div class="col-1">
      <h2>Chang Xiao</h2>
      <p>Written in Svelte & SvelteKit</p>
      <p>Copyright 2023</p>
    </div>
    <!-- Links -->
    <div class="col-2">
      <div class="grid">
        <h3><a href="/">Home</a></h3>
        <h3><a href="/projects">Projects</a></h3>
        <h3><a href="/about">About</a></h3>
        <h3><a href="mailto:chang.x1994@gmail.com">Contact Me</a></h3>
      </div>
    </div>
    <!-- ??? -->
    <div class="col-3">
      Col 3 goes very long and this stuff doesn't really matter right about now huh what ok thanks
    </div>
  </div>
</footer>