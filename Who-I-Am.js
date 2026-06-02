document.getElementById("btn").onclick = function () {
  const phone = "0551578833";
  const email = "25002536@edu.ukcbc.ac.ae";

  document.getElementById("contactInfo").innerHTML =
    `رقم الهاتف: ${phone} <br> البريد الإلكتروني: ${email}`;
};
const skillCards = document.querySelectorAll('#skills .card');
const certDetails = document.getElementById('certificate-details');

skillCards.forEach(card => {
  card.addEventListener('click', () => {
    const certInfo = card.getAttribute('data-cert');
    certDetails.textContent = certInfo;
  });
});