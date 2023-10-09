<script>
  import { onMount } from "svelte";
  import { fly } from "svelte/transition";
  import { base } from "$app/paths";

  import LazyWrapper from "$lib/lazyWrapper.svelte";

  // play animation on page load
  let loaded = false;
  onMount(() => {
    loaded = true;
  })
</script>

<style>
  h1 {
    margin-bottom: 16px;
  }
  p {
    width: 90%;
    max-width: 800px;
    margin: auto;
  }
  .section-1 {
    padding: 10px 20px;
    display: grid;
    grid-template-columns: 4fr 6fr;
    text-align: left;

    @media (max-width: 900px) {
      grid-template-columns: 1fr;
    }
  }
  .section-1 .img-c {
    margin-left: auto;
    margin-right: auto;
    max-width: 300px;
  }
  .section-2 > * {
    margin-bottom: 0.3em;
  }
</style>

<svelte:head>
  <title>Web Portfolio - About</title>
</svelte:head>

<div class="content-root">
  {#if loaded}
    <h1 in:fly={{ x:-50, duration:900 }}>
      About Me
    </h1>
    <div class="section-1" in:fly={{ x:50, duration:900, delay:100 }}>
      <div class="img-c">
        <img width="100%" src="/assets/profile.jpg" alt="head shot"/>
      </div>
      <div>
        <p>
          I am a graduate of the University of Toronto Engineering department,
          with a Bachelor's degree in Mechanical Engineering. I have a deep interest in
          software design and web development. Currently I am engaged as a full time
          Team Lead/Lead Developer at BrokerPocket Inc., a PropTech startup company focused
          on delivering a private network of off market listings to real estate professionals
          in Canada.
        </p>
        <br />
        <p>
          Over these last 3 years, I have developed substantially as a developer, a manager,
          and an architect. I have learned so much about not just the process of web development,
          but also the challenges of organizing and leading a team.
        </p>
        <br />
        <p>
          A copy of my resume is available <a href="{base}/assets/JingChang_Xiao_Resume.pdf"><u>here</u></a>.
          It covers in more detail my educational and professional background, as well as other skills
          that may not be covered by this portfolio.
        </p>
      </div>
    </div>
    <br />
    <LazyWrapper>
      <div class="section-2" in:fly={{ x:-50, duration:900, delay:100 }}>
        <h2>Contact Me</h2>
        <p>You can contact me through any of the below channels:</p>
        <p>Email: 
          <a href="mailto:chang.x1994@gmail.com">
            <u>chang.x1994@gmail.com</u>
          </a>
        </p>
        <p>Phone Number: 416-834-7055</p>
        <p>Github: 
          <a href="https://github.com/sinsinkun">
            <u>https://github.com/sinsinkun</u>
          </a>
        </p>
        <p>LinkedIn: 
          <a href="https://www.linkedin.com/in/jingchang-xiao/">
            <u>https://www.linkedin.com/in/jingchang-xiao/</u>
          </a>
        </p>
      </div>
    </LazyWrapper>
  {/if}
</div>