// import { invoke } from "@tauri-apps/api/core";
// let greetInputEl: HTMLInputElement | null;
// let greetMsgEl: HTMLElement | null;
// async function greet() {
//   if (greetMsgEl && greetInputEl) {
//     // Learn more about Tauri commands at https://tauri.app/develop/calling-rust/
//     greetMsgEl.textContent = await invoke("greet", {
//       name: greetInputEl.value,
//     });
//   }
// }

function createChat(submission: string): void {
  let chatDiv = document.createElement("div");
  let windowDiv = document.querySelector(".chat-window");
  chatDiv.className = "rounded-xl bg-neutral-100 p-4 my-4 ml-20";
  chatDiv.textContent = submission;
  windowDiv?.append(chatDiv);
  let submissionEl = document.querySelector(
    ".submission",
  ) as HTMLTextAreaElement | null;
  if (submissionEl) submissionEl.value = "";
}

window.addEventListener("DOMContentLoaded", () => {
  // let submitBtn = document.querySelector(".submit");
  document.addEventListener("submit", (e) => {
    e.preventDefault();
    const submissionEl = document.querySelector(
      ".submission",
    ) as HTMLTextAreaElement | null;
    const formContent = submissionEl?.value;
    if (formContent != null && formContent != undefined)
      createChat(formContent);
  });
});
