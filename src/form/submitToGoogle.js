export async function submitToGoogle(data) {
  try {
    await fetch(
      "https://script.google.com/macros/s/AKfycbzKoVvEk4aCKxa3SsTS1cyucqL6okofjJdPD4vlhodO_ymtBQdhxEMdj1nfgSPfoXiu0g/exec",
      {
        method: "POST",
        headers: {
          "Content-Type": "text/plain",
        },
        body: JSON.stringify(data),
      },
    );

    return { success: true };
  } catch (error) {
    // console.error("Submission error:", error);
    throw error;
  }
}
