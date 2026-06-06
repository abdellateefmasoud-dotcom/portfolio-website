document.querySelectorAll(".card").forEach(card => {
  card.addEventListener("click", () => {
    const cert = card.getAttribute("data-cert");

    if (cert) {
      const img = new Image();
      img.src = cert;
      img.style.maxWidth = "90%";

      const win = window.open("");
      win.document.write(img.outerHTML);
    }
  });
});
form.addEventListener('submit', function(e) {
  e.preventDefault();

  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();
  const message = document.getElementById('message').value.trim();

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (name === '' || email === '' || message === '') {
    alert('Please fill in all fields.');
  } 
  else if (!emailPattern.test(email)) {
    alert('Please enter a valid email address.');
  }
  else {
    alert('Message sent successfully!');
    form.reset();
  }
});