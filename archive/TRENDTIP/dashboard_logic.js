
document.addEventListener("DOMContentLoaded", () => {
  const selectedTrends = new Set();
  const conflictWarning = document.getElementById("conflictWarning");
  const trendCards = document.querySelectorAll(".trend-card");

  const conflictRules = [
    ["חתול ורוד", "גולגולת"],
    ["Emerald Green", "ורוד פוקסיה"],
    ["נמר צהוב", "שחור מטאלי"],
    ["47", "טורקיז כהה"]
  ];

  function checkConflicts() {
    for (const [a, b] of conflictRules) {
      if (selectedTrends.has(a) && selectedTrends.has(b)) {
        conflictWarning.style.display = "block";
        return true;
      }
    }
    conflictWarning.style.display = "none";
    return false;
  }

  function toggleTrend(card, trendName) {
    if (selectedTrends.has(trendName)) {
      selectedTrends.delete(trendName);
      card.classList.remove("selected");
    } else {
      selectedTrends.add(trendName);
      card.classList.add("selected");
    }
    checkConflicts();
  }

  trendCards.forEach(card => {
    const trendName = card.querySelector(".trend-title").textContent;
    card.addEventListener("click", () => toggleTrend(card, trendName));
  });

  document.getElementById("continueBtn").addEventListener("click", () => {
    if (selectedTrends.size === 0) {
      alert("בחר לפחות טרנד אחד");
      return;
    }
    if (checkConflicts()) {
      alert("קיימת התנגשות – בחר שילוב אחר");
      return;
    }
    localStorage.setItem("selectedTrends", JSON.stringify([...selectedTrends]));
    window.location.href = "generate_script.html";
  });

  document.getElementById("selectTop").addEventListener("click", () => {
    trendCards.forEach(card => {
      const strength = parseInt(card.dataset.strength || "0");
      if (strength >= 70) {
        const trendName = card.querySelector(".trend-title").textContent;
        if (!selectedTrends.has(trendName)) {
          selectedTrends.add(trendName);
          card.classList.add("selected");
        }
      }
    });
    checkConflicts();
  });
});
