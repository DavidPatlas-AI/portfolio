
document.addEventListener('DOMContentLoaded', function () {
  console.log("JavaScript loaded. Ready to enhance future interactions.");
});
document.addEventListener('DOMContentLoaded', function () {
  const blocks = document.querySelectorAll('.trend-block');
  const dropZone = document.getElementById('trend-drop');
  const collisionTable = document.getElementById('collision-body');
  let currentTrends = [];

  blocks.forEach(block => {
    block.addEventListener('dragstart', e => {
      e.dataTransfer.setData("text/plain", block.textContent);
      e.dataTransfer.setData("type", block.dataset.type);
    });
  });

  dropZone.addEventListener('dragover', e => {
    e.preventDefault();
    dropZone.classList.add('over');
  });

  dropZone.addEventListener('dragleave', () => {
    dropZone.classList.remove('over');
  });

  dropZone.addEventListener('drop', e => {
    e.preventDefault();
    dropZone.classList.remove('over');
    const text = e.dataTransfer.getData("text/plain");
    const type = e.dataTransfer.getData("type");

    const exists = currentTrends.find(t => t.text === text);
    if (!exists) {
      currentTrends.push({ text, type });
      const newElem = document.createElement('span');
      newElem.className = "trend-block";
      newElem.textContent = text;
      dropZone.appendChild(newElem);
      checkCollisions();
    }
  });

  function checkCollisions() {
    collisionTable.innerHTML = '';
    for (let i = 0; i < currentTrends.length; i++) {
      for (let j = i + 1; j < currentTrends.length; j++) {
        let t1 = currentTrends[i];
        let t2 = currentTrends[j];
        let conflict = (t1.type === t2.type) ? "⚠️ התנגשות!" : "✔️ אין בעיה";
        let row = `<tr><td>${t1.text}</td><td>${t2.text}</td><td>${conflict}</td></tr>`;
        collisionTable.innerHTML += row;
      }
    }
  }

  console.log("🎯 JavaScript loaded. Ready to enhance interactions.");
});
document.querySelectorAll('.trend-card').forEach(card => {
  const strength = parseInt(card.dataset.strength);
  const bar = card.querySelector('.strength-bar');

  if (strength >= 80) {
    bar.style.backgroundColor = 'green';
    card.querySelector('.trend-badge').style.display = 'inline-block';
  } else if (strength >= 40) {
    bar.style.backgroundColor = 'orange';
  } else {
    bar.style.backgroundColor = 'red';
  }

  bar.style.width = strength + '%';
});
