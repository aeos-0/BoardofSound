<script lang="ts">
  import { onMount } from 'svelte';
  import { buttonIndex } from './main';

  let names = ["Upload", "Upload", "Upload", "Upload", "Upload", "Upload"];

  onMount(() => {
    const savedNames = localStorage.getItem('names');
    if (savedNames) {
      names = JSON.parse(savedNames);
    }

    //Handle variable
    let unsubscribe = buttonIndex.subscribe(value => {
      names[value - 1] = "Play";
      saveNames();
    });

    // Cleanup when component is destroyed
    return unsubscribe;
  });

  async function saveNames() {
    localStorage.setItem('names', JSON.stringify(names));
  }

  function resetClick() {
    names = ["Upload", "Upload", "Upload", "Upload", "Upload", "Upload"];
    saveNames();
  }
</script>

<main>
  <div>
    <table>
      <tr>
        <th>
          <button id="1" class="btn btn-lg leftb playButton">{names[0]}</button>
        </th>
        <th>
          <button id="2" class="btn btn-lg rightb playButton">{names[1]}</button>
        </th>
      </tr>

      <tr>
        <th>
          <button id="3" class="btn btn-lg leftb playButton">{names[2]}</button>
        </th>
        <th>
          <button id="4" class="btn btn-lg rightb playButton">{names[3]}</button>
        </th>
      </tr>

      <tr>
        <th>
          <button id="5" class="btn btn-lg leftb playButton">{names[4]}</button>
        </th>
        <th>
          <button id="6" class="btn btn-lg btn-primary rightb playButton">{names[5]}</button>
        </th>
      </tr>
    </table>
  </div>

  <br>

  <p>Volume</p>
  <input type="range" min="0" max="100" value="50" step="1" id="volume" class="range range-warning range-xs">


  <br>

  <button on:click={resetClick} id="reset" class="btn btn-lg">Reset</button>

</main>

<style>
  @import './tailwind.css';
</style>