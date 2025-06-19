
let language = "he";

function toggleLanguage() {
  const btn = document.querySelector(".lang-btn");
  if (language === "he") {
    language = "en";
    btn.textContent = "Switch Language 🌐";
    document.body.dir = "ltr";
  } else if (language === "en") {
    language = "ru";
    btn.textContent = "Сменить язык 🌐";
  } else {
    language = "he";
    btn.textContent = "שנה שפה 🌐";
    document.body.dir = "rtl";
  }
}

function handleSwitch(type) {
  const sw = document.getElementById(type + "-switch");
  sw.classList.toggle("active");
  const isRandom = sw.classList.contains("active");
  const output = document.getElementById("output");
  if (type === "sod") {
    output.innerHTML = "<span style='color:red;'>💥 המערכת קרסה! התפוצצות SOD!</span>";
    document.body.style.background = "#330000";
    setTimeout(() => document.body.style.background = "#0a0f14", 1500);
    return;
  }
  const data = {
    learn: ["HTML + CSS", "JS", "Python", "C", "Cyber"],
    drink: ["קפה", "מים", "בורקס", "תה ירוק", "כלום"],
    wear: ["מעיל", "טי שירט", "חולצה לבנה", "קפוצ'ון", "מדים"],
    mood: ["😀 שמח", "😴 עייף", "😡 עצבני", "🤖 רובוטי", "😐 ניטרלי"]
  };
  const values = data[type];
  output.innerHTML = isRandom
    ? values[Math.floor(Math.random() * values.length)]
    : values.join(" • ");
}
