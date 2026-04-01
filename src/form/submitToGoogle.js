export async function submitToGoogle(data) {
  const response = await fetch(
    // "https://script.google.com/macros/s/AKfycbytL3Pbossrp1eK2HEawv4FBpmZi0RsFr7mj9Zk9JVi_0snEbbBtPHr2DeNa-MYCMCt_g/exec",
     {
    method: "POST",
    headers: {
      "Content-Type": "text/plain",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error("Network response was not ok");
  }

  const text = await response.text();

  let result;

  try {
    result = JSON.parse(text);
  } catch (err) {
    throw new Error("Invalid JSON response from server");
  }

  if (!result.success) {
    throw new Error(result.error || "Submission failed");
  }

  return result;
}

