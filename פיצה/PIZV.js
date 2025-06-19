function calculatePrice() {
  let basePrice = 0;

  // גודל מגש
  const sizes = document.getElementsByName("size");
  for (let i = 0; i < sizes.length; i++) {
    if (sizes[i].checked) {
      if (sizes[i].value === "small") basePrice = 20;
      else if (sizes[i].value === "medium") basePrice = 30;
      else if (sizes[i].value === "large") basePrice = 40;
      break;
    }
  }

  // תוספות
  let toppings = 0;
  if (document.getElementById("cheese").checked) toppings += 7;
  if (document.getElementById("olives").checked) toppings += 7;
  if (document.getElementById("mushrooms").checked) toppings += 7;
  if (document.getElementById("corn").checked) toppings += 7;

  // כמות מגשים
  let quantity = parseInt(document.getElementById("quantity").value);
  if (isNaN(quantity) || quantity < 1) quantity = 1;

  // שתייה
  let drink = document.getElementById("drink").checked ? 10 : 0;

  // חישוב סופי
  let total = (basePrice + toppings) * quantity + drink;

  // הצגת המחיר
  document.getElementById("totalPrice").innerText = total;
}
