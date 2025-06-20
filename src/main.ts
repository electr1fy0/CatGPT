import { invoke } from "@tauri-apps/api/core";

async function request(message: string): Promise<string> {
  let res = await invoke<string>("request", { message });
  return res;
}

function createUserChat(submission: string): void {
  let chatDiv = document.createElement("div");
  let windowDiv = document.querySelector(".chat-window");
  chatDiv.className = "rounded-xl bg-blue-100 p-4 my-4 ml-20";
  chatDiv.textContent = submission;
  windowDiv?.append(chatDiv);
}

function createAIChat(response: string): void {
  let chatDiv = document.createElement("div");
  let windowDiv = document.querySelector(".chat-window");
  chatDiv.className = "rounded-xl bg-neutral-100 p-4 my-4 mr-20";
  chatDiv.textContent = response;
  windowDiv?.append(chatDiv);
}

async function handleSubmission(message: string): Promise<void> {
  createUserChat(message);

  try {
    const aiResponse = await request(message);
    createAIChat(aiResponse);
  } catch (error) {
    createAIChat("Error: Could not get response");
    console.error("AI request failed:", error);
  }
}

window.addEventListener("DOMContentLoaded", () => {
  document.addEventListener("submit", async (e) => {
    e.preventDefault();
    const submissionEl = document.querySelector(
      ".submission",
    ) as HTMLTextAreaElement | null;
    const formContent = submissionEl?.value?.trim();

    if (formContent && submissionEl != null) {
      submissionEl.value = "";
      await handleSubmission(formContent);
    }
  });

  document.addEventListener("keydown", async (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      const target = e.target as HTMLElement;
      if (target.classList.contains("submission")) {
        e.preventDefault();
        const submissionEl = target as HTMLTextAreaElement;
        const formContent = submissionEl.value?.trim();

        if (formContent) {
          submissionEl.value = "";
          await handleSubmission(formContent);
        }
      }
    }
  });
});
