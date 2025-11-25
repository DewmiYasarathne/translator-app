const translateBtn = document.getElementById("translateBtn");
const inputText = document.getElementById("inputText");
const outputText = document.getElementById("outputText");
const direction = document.getElementById("direction");

// Replace this URL with your Netlify function URL
const backendUrl = "https://YOUR-NETLIFY-SITE.netlify.app/.netlify/functions/translate";

translateBtn.addEventListener("click", async () => {
    const text = inputText.value.trim();
    if (!text) {
        alert("Please enter text to translate.");
        return;
    }

    let toLang = direction.value === "en-to-vi" ? "vi" : "en";

    try {
        const res = await fetch(`${backendUrl}?text=${encodeURIComponent(text)}&to=${toLang}`);
        const data = await res.json();
        outputText.value = data.translation;
    } catch (err) {
        outputText.value = "Error translating text. Try again.";
        console.error(err);
    }
});
