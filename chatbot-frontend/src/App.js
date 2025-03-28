import './App.css';
import React, { useState } from "react";
import axios from "axios";
import ReactMarkdown from "react-markdown";

function App() {
const [input, setInput] = useState("");
const [response, setResponse] = useState([]); // Initialize as an empty array

const handleGenerate = async () => {
if (!input.trim()) {
setResponse(["Please enter a valid tech stack."]); 
return;
}

try {
const res = await axios.post("http://127.0.0.1:8000/generate_project/", {
techstack: input,
});

if (res.data && typeof res.data.ideas === "string") {
const ideasArray = res.data.ideas.split("\n\n").map((idea) => ({
title: idea,
description: "",
}));
setResponse(ideasArray);
} else {
setResponse(["No project ideas found for this tech stack. Try another one."]);
}
} catch (error) {
console.error("Error fetching data:", error);
setResponse(["Error fetching project ideas. Please try again later."]);
}
};

return (
<div className="container">
<h1>AI Project Idea Generator</h1>
<input
type="text"
placeholder="Enter Tech Stack (e.g., Python)"
value={input}
onChange={(e) => setInput(e.target.value)}
/>
<button onClick={handleGenerate}>Generate</button>

<div className="response">
<h2>Project Ideas:</h2>
{response.length > 0 ? (
<ul>
{response.map((idea, index) =>
typeof idea === "string" ? (
<li key={index}>
<ReactMarkdown>{idea}</ReactMarkdown> {/* Render Markdown text */}
</li>
) : (
<li key={index}>
<h3><ReactMarkdown>{idea.title}</ReactMarkdown></h3> {/* Render Markdown title */}
<p><ReactMarkdown>{idea.description}</ReactMarkdown></p> {/* Render Markdown description */}
</li>
)
)}
</ul>
) : (
<p>Enter a tech stack and generate ideas.</p>
)}
</div>
</div>
);
}

export default App;
//Testing Comment