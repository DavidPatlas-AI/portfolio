  <script>
    const createRain = () = 
       number = document.createElement('div')
      number.classList.add('number');
      number.textContent = Math.floor(Math.random() * 10); // Random digit
      number.style.left = Math.random() * window.innerWidth + 'px';
      number.style.animationDuration = Math.random() * 3 + 2 + 's'; // Random fall speed
      document.body.appendChild(number);

      setTimeout(() = number.remove(), 5000); // Remove after 5 seconds
    setInterval(createRain, 100); // Create a new number every 100ms
  </script>
