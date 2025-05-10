// Simple Fashion Design Web App - Starter Code

// 1. HTML structure for sketchpad and client inputs
const html = `
  <div id="app">
    <h2>Fashion Sketch Studio</h2>

    <!-- Sketch Canvas -->
    <canvas id="sketchpad" width="500" height="600" style="border:1px solid #ccc"></canvas>

    <!-- Client Input Section -->
    <h3>Client Profile</h3>
    <label>Skin Tone: <input id="skinTone" placeholder="e.g. warm, cool, dark" /></label><br>
    <label>Measurements (JSON): <textarea id="measurements" placeholder="{\"bust\":90,\"waist\":70,\"hip\":95}"></textarea></label><br>
    <button onclick="getStyleSuggestions()">Get AI Style Suggestions</button>

    <h3>Suggestions:</h3>
    <pre id="output"></pre>
  </div>
`;
document.body.innerHTML = html;

// 2. Simple Sketch Tool using native canvas
const canvas = document.getElementById("sketchpad");
const ctx = canvas.getContext("2d");
let drawing = false;

canvas.addEventListener("mousedown", () => drawing = true);
canvas.addEventListener("mouseup", () => drawing = false);
canvas.addEventListener("mousemove", draw);

function draw(e) {
  if (!drawing) return;
  ctx.lineWidth = 2;
  ctx.lineCap = "round";
  ctx.strokeStyle = "#000";
  ctx.lineTo(e.offsetX, e.offsetY);
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(e.offsetX, e.offsetY);
}

// 3. AI Style Suggestion using OpenAI API
async function getStyleSuggestions() {
  const skinTone = document.getElementById("skinTone").value;
  const measurements = document.getElementById("measurements").value;

  const prompt = `Suggest 3 fashion styles and color palettes that match a client with skin tone '${skinTone}' and measurements ${measurements}.`;

  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer YOUR_OPENAI_API_KEY`
    },
    body: JSON.stringify({
      model: "gpt-4",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.7
    })
  });

  const data = await response.json();
  document.getElementById("output").innerText = data.choices[0].message.content;
}
