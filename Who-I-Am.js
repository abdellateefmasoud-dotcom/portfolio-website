const skillCards =
document.querySelectorAll('#skills .card');

skillCards.forEach(card => {

card.addEventListener('click', () => {

const cert =
card.getAttribute('data-cert');

if(cert){
window.open(cert,'_blank');
}

});

});