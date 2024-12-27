document.addEventListener("DOMContentLoaded", () => {
  // Handle pairing with number
  const pairForm = document.getElementById("pair-form");
  if (pairForm) {
    pairForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      const number = document.getElementById("number").value.trim();
      const resultDiv = document.getElementById("pair-result");

      if (!number) {
        resultDiv.textContent = "Please enter a valid phone number.";
        return;
      }

      try {
        const response = await fetch(`https://bothubapi.onrender.com/session/pair?number=${encodeURIComponent(number)}`);
        const data = await response.json();

        if (response.ok) {
          resultDiv.textContent = `Pairing Code: ${data.code}`;
        } else {
          resultDiv.textContent = `Error: ${data.message || "Something went wrong."}`;
        }
      } catch (error) {
        resultDiv.textContent = "Failed to fetch pairing code. Please try again.";
      }
    });
  }

  // Fetch QR code
  const qrCodeImg = document.getElementById("qr-code");
  if (qrCodeImg) {
    qrCodeImg.src = "https://bothubapi.onrender.com/session/qr";
  }
});
