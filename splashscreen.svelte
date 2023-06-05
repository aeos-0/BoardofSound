<script>

</script>

<main class="animate__animated animate__bounce">
  <div class="splash">
      <img src="ppeach400.gif" alt="Gyat" class="peach">
  </div>
</main>

<style>
  @keyframes bounce {
  0% {
    transform: translateY(4px);
  }
  50% {
    transform: translateY(-11px);
  }
  100% {
    transform: translateY(4px);
  }
}
  .peach {
    max-width: 100%;
    max-height: 100%;
    user-select: none;
    pointer-events: none;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    border-radius: 2px;
    animation-delay: 166.67ms;
    animation: bounce .50s infinite;
  }

  .splash {
    position: fixed;
    top: 0;
    left: 0;
    overflow: hidden;
  }
</style>