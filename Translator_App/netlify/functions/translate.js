// Netlify Function to call Azure Translator API

export async function handler(event, context) {
  try {
    // Read environment variables (do NOT hardcode your key)
    const key = process.env.AZURE_TRANSLATOR_KEY;
    const region = process.env.AZURE_TRANSLATOR_REGION;
    const endpoint = process.env.AZURE_TRANSLATOR_ENDPOINT;
    const category = process.env.AZURE_TRANSLATOR_CATEGORY;

    // Read input text & target language from URL parameters
    const params = event.queryStringParameters;
    const text = params.text;
    const to = params.to;

    if (!text || !to) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: "Missing text or target language." }),
      };
    }

    // Build Azure Translator request URL
    const url = `${endpoint}/translate?api-version=3.0&to=${to}&from=auto&category=${category}`;

    // Call Azure Translator API
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Ocp-Apim-Subscription-Key": key,
        "Ocp-Apim-Subscription-Region": region,
        "Content-Type": "application/json"
      },
      body: JSON.stringify([{ Text: text }])
    });

    const result = await response.json();

    // Extract translated text
    const translatedText = result[0].translations[0].text;

    return {
      statusCode: 200,
      body: JSON.stringify({ translation: translatedText }),
    };

  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Translation failed", details: error.message }),
    };
  }
}
