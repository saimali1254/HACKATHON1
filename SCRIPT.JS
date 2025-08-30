async function searchSchemes() {
  const query = document.getElementById("search").value;
  const res = await fetch(`/api/schemes?q=${query}`);
  const data = await res.json();
  
  const resultsDiv = document.getElementById("results");
  resultsDiv.innerHTML = "";

  if (data.length === 0) {
    resultsDiv.innerHTML = "<p>No schemes found ❌</p>";
    return;
  }

  data.forEach(scheme => {
    const card = document.createElement("div");
    card.className = "card";
    card.innerHTML = `
      <h3>${scheme.name}</h3>
      <p><strong>Category:</strong> ${scheme.category}</p>
      <p><strong>State:</strong> ${scheme.state}</p>
      <p>${scheme.description}</p>
    `;
    resultsDiv.appendChild(card);
  });
}
