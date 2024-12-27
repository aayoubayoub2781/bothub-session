// script.js

// Function to handle form submission and fetch pairing code
async function pairNumber(event) {
  event.preventDefault(); // Prevent default form submission
  
  // Get the phone number and clean it up
  const number = document.getElementById("phone-number").value.trim();
  
  // Check if the number is provided
  if (!number) {
    alert("Please enter a phone number with the country code.");
    return;
  }

  try {
    // Make the API request to get the pairing code
    const response = await fetch(`https://bothubapi.onrender.com/session/pair?number=${encodeURIComponent(number)}`);
    
    // Check if the response is OK (status 200)
    if (!response.ok) {
      throw new Error('Failed to pair. Please try again.');
    }

    // Parse the JSON response
    const data = await response.json();

    // Check if 'code' exists in the response
    if (data.code) {
      // Show the pairing code
      document.getElementById("pairing-code-result").innerHTML = `Pairing Code: ${data.code}`;
      
      // Call the function to fetch the QR code
      fetchQRCode(data.code);
    } else {
      throw new Error('Pairing code not found in the response.');
    }

  } catch (error) {
    console.error('Error:', error);
    alert('Error occurred: ' + error.message);
  }
}

// Function to fetch QR code
async function fetchQRCode(pairingCode) {
  try {
    // Make the API request to get the QR code image
    const response = await fetch(`https://bothubapi.onrender.com/session/qr?code=${encodeURIComponent(pairingCode)}`);

    if (!response.ok) {
      throw new Error('Failed to fetch QR code.');
    }

    // Get the QR code image as a Blob
    const qrCodeBlob = await response.blob();

    // Create a URL for the QR code image
    const qrCodeUrl = URL.createObjectURL(qrCodeBlob);

    // Display the QR code image on the page
    const qrCodeImg = document.getElementById("qr-code-img");
    qrCodeImg.src = qrCodeUrl;
    qrCodeImg.style.display = "block"; // Make sure the image is visible

  } catch (error) {
    console.error('Error fetching QR code:', error);
    alert('Error occurred while fetching QR code: ' + error.message);
  }
}

// Add event listener for the form submission
document.getElementById("pair-form").addEventListener("submit", pairNumber);
