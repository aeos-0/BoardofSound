<script>
  import { onMount } from 'svelte';
  
  onMount(() => {
    setTimeout(() => {
    }, 5000);
  });
</script>

<main class="animate__animated animate__bounce">
  <div class="splash">
      <img src="ppeach400.gif" alt="Gyat" class="peach">
  </div>
</main>

<style>
 /* ::-webkit-scrollbar {
    display: none;
  }*/
  .peach {
    max-width: 100%;
    max-height: 100%;
    user-select: none;
    pointer-events: none;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    border-radius: 5px;
  }

  .splash {
    position: fixed;
    top: 0;
    left: 0;
    overflow: hidden;
  }
</style>