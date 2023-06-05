// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]


use tauri::Manager;
use std::fs::File;
use std::io::BufReader;
use rodio::{Decoder, OutputStream, Sink};
use std::thread;
use std::time::Duration;

#[tauri::command]
async fn close_splashscreen(window: tauri::Window) {
  thread::sleep(Duration::from_secs(4));
  // Close splashscreen
  if let Some(splashscreen) = window.get_window("splashscreen") {
    splashscreen.close().unwrap();
  }
  // Show main window
  window.get_window("main").unwrap().show().unwrap();
}

fn main() {
  tauri::Builder::default()
    .invoke_handler(tauri::generate_handler![play, close_splashscreen])
    .run(tauri::generate_context!())
    .expect("error while running tauri application");
}

//Add int value to be passed in for the volume control
#[tauri::command]
async fn play(path: String, vol: f32) {
  // Get a output stream handle to the default physical sound device
  let (_stream, stream_handle) = OutputStream::try_default().unwrap();
  let sink = Sink::try_new(&stream_handle).unwrap();
  // Load a sound from a file, using a path relative to Cargo.toml
  let file = BufReader::new(File::open(path).unwrap());
  // Decode that sound file into a source
  let source = Decoder::new(file).unwrap();
  //Adjust audio settings
  sink.set_volume(vol);
  // Play the sound directly on the device
  sink.append(source);
  sink.sleep_until_end();
}