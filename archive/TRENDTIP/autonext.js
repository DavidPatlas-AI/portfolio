
document.addEventListener("DOMContentLoaded", () => {
  const continueButton = document.getElementById("continueBtn");
  const dropZone = document.getElementById("userTrends") || document.getElementById("trend-drop");

  function checkAutoAdvance() {
    const trends = dropZone.querySelectorAll(".trend, .trend-block");
    if (trends.length >= 3) {
      setTimeout(() => {
        if (continueButton && continueButton.style.display !== "none") {
          continueButton.click();
        }
      }, 5000); // מחכה 5 שניות לפני המעבר
    }
  }

  dropZone.addEventListener("drop", () => {
    checkAutoAdvance();
  });

  checkAutoAdvance(); // בדיקה מיידית כשנכנסים
});
