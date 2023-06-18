//"ppeach400.gif", "splashscreen.html"
export const buttonIndex = writable(0);

import './app.css'
import App from './App.svelte'
import { writable } from 'svelte/store';
import { invoke } from '@tauri-apps/api';
import { open } from '@tauri-apps/api/dialog';
import { appLocalDataDir } from '@tauri-apps/api/path';
import { removeFile, copyFile, exists, writeBinaryFile, BaseDirectory } from '@tauri-apps/api/fs';
import { appWindow } from '@tauri-apps/api/window';
//import { checkUpdate, installUpdate } from '@tauri-apps/api/updater';
 


const app = new App({
  target: document.getElementById('app'),
})

//New titlebar
document
  .getElementById('titlebar-minimize')
  .addEventListener('click', () => appWindow.minimize())
document
  .getElementById('titlebar-maximize')
  .addEventListener('click', () => appWindow.toggleMaximize())
document
  .getElementById('titlebar-close')
  .addEventListener('click', () => appWindow.close())



document.addEventListener('DOMContentLoaded', () => {
  // This will wait for the window to load, but you could
  // run this function on whatever trigger you want
  invoke('close_splashscreen')
})
export default app
console.log("App exported");


//On load check for update
/*const update = await checkUpdate();
if (update.shouldUpdate) {
  console.log(`Installing update ${update.manifest?.version}, ${update.manifest?.date}`);
  await installUpdate();
}
else {
    console.log("No new update available");
}*/



const localDataPath = await appLocalDataDir();
const volumeSlider = document.getElementById("volume") as HTMLInputElement;
let volume: number;

volume = Number(volumeSlider.value);
volumeSlider.addEventListener('input', () => {
  volume = Number(volumeSlider.value);
  console.log(volume); // Output: The current slider value
});

console.log("Got here");
let playButton = document.getElementsByClassName("playButton");
Array.from(playButton).forEach(button => {
    let id = button.id;
    button.addEventListener('click', function() {
      playClick(id, volume);
    });
  });

const resetButton = document.getElementById("reset");
const id = resetButton.id
resetButton?.addEventListener('click', function() {
  reset();
});



//Reset all button click
async function reset() {
  for (let i = 1; i < 7; i++) {
    const name = "button" + i + ".wav";
    const path = localDataPath + name;
    const fileExists = await exists(path, { dir: BaseDirectory.AppLocalData });

    //If file does not exist skip to next loop
    if (!fileExists) {
      console.log("File does not exist on button: " + i);
      continue;
    }

    try {
      await removeFile(path, { dir: BaseDirectory.AppLocalData });
      console.log("Success on file deletion: " + i);
    } catch(error) {
      console.error("Unable to delete file + " + error);
    }
  }
}


//Play button click
async function playClick(id: string, vol: number) {
  console.log("Play clicked: id " + id);
  vol = vol / 100.0;
  //Check if file exists
  let name = "button" + id + ".wav";
  let path = localDataPath + name;
  //Same as appdatadir
  let fileExists = await exists(name, { dir: BaseDirectory.AppLocalData });
  console.log("The value of fileExists is " + fileExists);

  //If file exists send it to the play function in rust (good)
  if (fileExists) {
    console.log("File exists, passing to backend to be played");
    invoke('play', {path: path, vol: vol})
    .then((response) => {
        console.log(response); // Print the resolved value
    })
    .catch((error) => {
        console.error(error); // Print the rejected error
    });
    return;
  } else {
    console.log("File does not exist, continuing to open file path");
  }


  const file = await open({
      multiple: false,
      filters: [{
        name: 'Audio Files',
        extensions: ['mp3', 'wav', 'aiff']
      }]
    }) ?? [];
  console.log("File passed: " + file);

  console.log("The path that will be written to is " + localDataPath);
  
  //If file was not selected
  if (file.length === 0) {
    console.log("File was not selected");
    return;
  }

  //buttonIndex.set(parseInt(id));
  let oldFile = file;
  
  //This will never happen
  if (Array.isArray(oldFile)) {
    oldFile  = oldFile[0]
    console.log("The first value is: " + oldFile);
  } 

  //Save file because it is not found
  try {
    await writeBinaryFile(name, new Uint8Array([]), { dir: BaseDirectory.AppLocalData });
    console.log('Destination file created successfully!');
  } catch (error) {
    console.error('Error creating destination file:', error);
  }
  
  //After creating the new directory perform the copy function: 
  try {
    await copyFile(oldFile, name, { dir: BaseDirectory.AppLocalData });
    console.log('File copied successfully!');
    buttonIndex.set(parseInt(id));
  } catch (error) {
    console.error('Error copying file:', error);
  }
}