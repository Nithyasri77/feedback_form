export async function uploadFilesToDrive(files, userName, folderId = null) {
  // console.log("=== Upload Starting ===");
  // console.log("Files:", files);

  const fileArray = Array.from(files);

  if (fileArray.length === 0) {
    // console.error("No files!");
    return [];
  }

  // Convert files to Base64
  const filePromises = fileArray.map((file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.onload = () => {
        const base64 = reader.result.split(",")[1]; // Remove data:image/png;base64, prefix
        resolve({
          name: file.name,
          mimeType: file.type,
          data: base64,
        });
      };

      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  });

  const base64Files = await Promise.all(filePromises);
  // console.log("Files converted to Base64");

  try {
    // const url = "https://script.google.com/macros/s/AKfycbytL3Pbossrp1eK2HEawv4FBpmZi0RsFr7mj9Zk9JVi_0snEbbBtPHr2DeNa-MYCMCt_g/exec";

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "text/plain",
      },
      body: JSON.stringify({
        action: "uploadFiles",
        userName: userName,
        files: base64Files,
        folderId: folderId,
      }),
    });

    const text = await response.text();
    // console.log("Response:", text);

    const result = JSON.parse(text);

    if (result.success && result.links) {
      // console.log("✅ Upload successful! Links:", result.links);
      return {
        links: result.links,
        folderId: result.folderId,
      };
    } else {
      // console.error("❌ Upload failed:", result);
      return [];
    }
  } catch (error) {
    console.error("❌ Upload error:", error);
    return [];
  }
}
