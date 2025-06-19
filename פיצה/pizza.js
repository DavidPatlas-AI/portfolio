function calculatePrice() {
  let errorMsg = document.getElementById("errorMsg");
  errorMsg.innerText = "";

  // כמויות מגשים
  let qtySmall = parseInt(document.getElementById("qty_small").value) || 0;
  let qtyMedium = parseInt(document.getElementById("qty_medium").value) || 0;
  let qtyLarge = parseInt(document.getElementById("qty_large").value) || 0;
  let totalPizzas = qtySmall + qtyMedium + qtyLarge;

  if (totalPizzas === 0) {
    errorMsg.innerText = "אנא בחר לפחות מגש אחד";
    document.getElementById("totalPrice").innerText = 0;
    return;
  }

  // מחיר מגשים
  let total = qtySmall * 20 + qtyMedium * 30 + qtyLarge * 40;

  // תוספות
  let toppings = 0;
  if (document.getElementById("cheese").checked) toppings += 4;
  if (document.getElementById("olives").checked) toppings += 4;
  if (document.getElementById("mushrooms").checked) toppings += 4;
  if (document.getElementById("corn").checked) toppings += 4;
  if (document.getElementById("onion").checked) toppings += 4;
  if (document.getElementById("tomato").checked) toppings += 4;
  if (document.getElementById("spicy").checked) toppings += 4;
  if (document.getElementById("bulgarit").checked) toppings += 5;
  if (document.getElementById("tuna").checked) toppings += 6;
  total += toppings * totalPizzas;

  // שתייה (רדיו)
  let drinkRadios = document.getElementsByName("drink");
  let drink = 0;
  for (let i = 0; i < drinkRadios.length; i++) {
    if (drinkRadios[i].checked) {
      drink = parseInt(drinkRadios[i].value);
      break;
    }
  }
  total += drink;

  // הצגת המחיר
  document.getElementById("totalPrice").innerText = total;
}

function toggleTopping(topping) {
  const checkbox = document.getElementById(topping);
  const btn = document.getElementById('btn_' + topping);
  checkbox.checked = !checkbox.checked;
  btn.classList.toggle('active', checkbox.checked);
}

function showSuccess() {
  // ... פופאפ הצלחה ...
}

document.querySelectorAll('.pizza-card').forEach(card => {
  card.addEventListener('mousemove', function(e) {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width/2;
    const y = e.clientY - rect.top - rect.height/2;
    card.style.transform = `rotateY(${x/10}deg) rotateX(${-y/10}deg) scale(1.05)`;
  });
  card.addEventListener('mouseleave', function() {
    card.style.transform = '';
  });
});
