  // Scroll both horizontally and vertically on cards
const scroller = document.getElementById('scrollable');
function scrollXY(){
  scroller.addEventListener('wheel', (evt) => {
    // If horizontal scroll is possible and vertical intent, scroll horizontally
    const canScrollHorizontally = scroller.scrollWidth > scroller.clientWidth;
    const verticalIntent = Math.abs(evt.deltaY) > Math.abs(evt.deltaX);

    if (canScrollHorizontally && verticalIntent) {
      evt.preventDefault();
      scroller.scrollLeft += evt.deltaY * 2; // Adjust scroll speed
    }
    // Otherwise let vertical scroll behave normally (no preventDefault)
  }, { passive: false });

}

scrollXY();

const dropdownLinks = document.querySelectorAll('.dropdown-content a');
const dropdownCards = document.querySelectorAll('.dropdown-content-cards a');
let CardsN = 16;
let houseN = 'All';
let houseA = 'All';
function fetchAndDisplayCharacters(house) {
  fetch('https://hp-api.onrender.com/api/characters')
    .then(res => res.json())
    .then(data => {
      let filtered = data;
      if (house !== 'All') {
        filtered = data.filter(char => char.house === house);
      }

      filtered = filtered.slice(0, CardsN);
      scroller.innerHTML = filtered.map(char => `
        <div class="card" id="${char.house}">
          <img src="${char.image || 'images/not-found.png'}" alt="${char.name}" onerror="this.src='images/notFound.png'">
          <div class="character-info">
            <h3>${char.name}</h3>
            <p><strong>House: </strong> ${char.house || 'Unknown'}</p>
            <p><strong>Birth: </strong> ${char.dateOfBirth || 'Unknown'}</p>
          </div>
        </div>
      `).join('');
    })
    .catch(err => console.error(err));
}

fetchAndDisplayCharacters(houseN);

dropdownLinks.forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    const selectedHouse = link.getAttribute('data-house');
    houseA = selectedHouse;
    fetchAndDisplayCharacters(selectedHouse);
  });
});

dropdownCards.forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    const selectedCards = link.getAttribute('data-card');
    if (selectedCards === "16") {
    CardsN = 16;
    fetchAndDisplayCharacters(houseA);
    } else if(selectedCards === "32"){
          CardsN = 32;
          fetchAndDisplayCharacters(houseA);
    }else if(selectedCards === "64"){
          CardsN = 64;
          fetchAndDisplayCharacters(houseA);
    }
    
  });
});
