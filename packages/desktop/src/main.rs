#![cfg_attr(
    all(not(debug_assertions), target_os = "windows"),
    windows_subsystem = "windows"
)]
use chardetng::EncodingDetector;
use encoding_rs::{SHIFT_JIS, UTF_8};
use std::env;
use std::fs;
use std::path::{Path, PathBuf};
use tauri::api::dialog::message;
use tauri::Manager;
use tauri_plugin_fs_extra::FsExtra;
use tauri_plugin_fs_watch::Watcher;
use tauri_plugin_log::{LogTarget, LoggerBuilder};
use window_shadows::set_shadow;
use zip_extensions::*;

#[allow(unused_imports)]
use window_vibrancy::{apply_blur, apply_vibrancy, NSVisualEffectMaterial};

#[tauri::command]
fn exist(path: String) -> bool {
    println!("exist:{}", path);
    Path::new(&path).exists()
}

#[tauri::command]
fn guess(path: String) -> &'static str {
    println!("guess: {}", path);
    let mut ed = EncodingDetector::new();
    let res = fs::read(path).unwrap();
    ed.feed(&res, true);
    ed.guess(Some(&[]), true).name()
}

#[tauri::command]
fn read_utf_8(path: String) -> String {
    println!("read_utf_8: {}", path);
    let bytes = fs::read(path).unwrap();
    let (cow, _encoding_used, _had_errors) = UTF_8.decode(&bytes);
    cow.into_owned()
}

#[tauri::command]
fn read_shift_jis(path: String) -> String {
    println!("read_shift_jis: {}", path);
    let bytes = fs::read(path).unwrap();
    let (cow, _encoding_used, _had_errors) = SHIFT_JIS.decode(&bytes);
    cow.into_owned()
}

#[tauri::command]
fn archive(source: String, target: String) {
    println!("archive: {} {}", source, target);
    zip_create_from_directory(&PathBuf::from(target), &PathBuf::from(source)).unwrap();
}

#[tauri::command]
fn extract(source: String, target: String) {
    println!("extract: {} {}", source, target);
    zip_extract(&PathBuf::from(source), &PathBuf::from(target)).unwrap();
}

#[tauri::command]
fn extract_file_from_file(source: String, path: String) -> String {
    println!("extract_file_from_file: {} {}", source, path);
    let mut buf: Vec<u8> = vec![];
    zip_extract_file_to_memory(&PathBuf::from(source), &PathBuf::from(path), &mut buf).unwrap();
    match String::from_utf8(buf) {
        Ok(v) => v,
        Err(e) => panic!("{}", e),
    }
}

#[tauri::command]
fn clean_dir(path: String) {
    println!("clean_dir: {}", path);
    fs::remove_dir_all(path).unwrap();
}

#[tauri::command]
fn copy(source: String, target: String) {
    println!("copy: {} {}", source, target);
    if !Path::new(&target).parent().unwrap().exists() {
        fs::create_dir_all(&Path::new(&target).parent().unwrap()).unwrap()
    }
    fs::copy(source, target).unwrap();
}

fn main() {
    tauri::Builder::default()
        .setup(|app| {
            let window = app.get_window("main").unwrap();

            // #[cfg(target_os = "windows")]
            // if !Path::new("C:\\Program Files (x86)\\Microsoft\\EdgeWebView").exists() {
            //     message(Some(&window), "Dependency Warning", "Microsoft Edge WebView 2 not detected. Did you installed it?\nIf the program works properly, you can ignore this message.");
            // }

            #[cfg(target_os = "windows")]
            apply_blur(&window, Some((18, 18, 18, 125))).unwrap();

            #[cfg(target_os = "macos")]
            apply_vibrancy(&window, NSVisualEffectMaterial::AppearanceBased).unwrap();

            #[cfg(any(target_os = "windows", target_os = "macos"))]
            set_shadow(&window, true).unwrap();

            Ok(())
        })
        .plugin(Watcher::default())
        .plugin(FsExtra::default())
        .plugin(LoggerBuilder::new().target(LogTarget::Stdout).build())
        .invoke_handler(tauri::generate_handler![
            exist,
            guess,
            read_utf_8,
            read_shift_jis,
            archive,
            extract,
            clean_dir,
            copy,
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
