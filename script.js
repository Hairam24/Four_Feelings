const sheetID = "1D12xYmBj77eknp9mlDle50woqfgxOZZhSVICaT__8hc";
const apiKey = "AIzaSyDAeNxZy9t09fSqe2q-0y-4q-hMWYtQ0fQ";


// Function to send message to Google Sheets
async function sendMessage() {
    const message = document.getElementById("message").value;
    if (message.trim() === "") {
        alert("Please write a message first!");
        return;
    }

    const timestamp = new Date().toLocaleString();
    const url = `https://sheets.googleapis.com/v4/spreadsheets/${sheetID}/values/Sheet1!A1:append?valueInputOption=RAW&key=${apiKey}`;
    const data = { values: [[feelingType, message, timestamp]] };

    try {
        const response = await fetch(url, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data)
        });

        if (response.ok) {
            displayMessage(feelingType, message, timestamp);
            document.getElementById("message").value = "";
        } else {
            alert("Failed to save message.");
        }
    } catch (error) {
        console.error("Error:", error);
    }
}

// Function to display messages on the page
function displayMessage(type, message, timestamp) {
    const messageList = document.getElementById("messageList");
    const newMsg = document.createElement("div");
    newMsg.classList.add("msg");
    newMsg.innerHTML = `<strong>${type.toUpperCase()}:</strong> ${message} <br><small>${timestamp}</small>`;
    messageList.prepend(newMsg);
}
