// Learn more about Tauri commands at https://tauri.app/develop/calling-rust/
use gemini_client_api::gemini::{
    ask::Gemini,
    types::request::{Part, SystemInstruction},
    types::sessions::Session,
};

#[tauri::command]
fn greet(name: &str) -> String {
    format!("Hello, {}! You've been greeted from Rust!", name)
}

#[tauri::command]
async fn request(message: String) -> Result<String, String> {
    let mut session = Session::new(1);
    let instruction = SystemInstruction::from_str(
        "your name is CatGPT. electr1fy0 made you. behave like a cat in every response, give concise outputs, no yapping, people will die if you use markdown syntax at all. use plain text only."
    );

    let api_key = std::env::var("GEMINI_KEY")
        .map_err(|_| "GEMINI_KEY environment variable not found".to_string())?;

    let ai = Gemini::new(api_key, "gemini-2.5-flash", Some(instruction));

    let response = ai
        .ask(session.ask_string(&message))
        .await
        .map_err(|e| format!("API request failed: {}", e))?;

    Ok(response.get_text(""))
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_opener::init())
        .invoke_handler(tauri::generate_handler![greet, request]) // Added request here
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
