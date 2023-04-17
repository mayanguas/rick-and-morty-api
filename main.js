import './style.css';

const container = document.querySelector('#app');
const prevBtn = document.querySelector('#prevBtn');
const nextBtn = document.querySelector('#nextBtn');

const BASEURL = 'https://rickandmortyapi.com/api/character?page=';

let pageNum = 1;

//---------------------------------------------------------------------//
const getData = async () => {
  console.log('Estamos en la página:', pageNum);

  try {
    const res = await fetch(BASEURL + pageNum);
    const data = await res.json();
    console.log('Datos json:', data);
    disableBtns();
    mappedData(data.results);
  } catch (error) {
    console.log('Error:', error);
  }
};

const mappedData = (list) => {
  const mappedList = list.map((item) => ({
    name: item.name,
    status: item.status,
    image: item.image,
    gender: item.gender,
    origin: item.origin.name,
    specie: item.species,
  }));
  console.log('Lista mapeada:', mappedList);

  printData(mappedList);
};

const printData = (list) => {
  container.innerHTML = '';

  list.forEach((element) => {
    const figure = document.createElement('figure');
    figure.innerHTML = `
    <div class="text-content img-content">
    <img src=${element.image} alt=${element.name}/>

    <div class="text-position">
      <h2>${element.name}</h2>
      <h4><span class="text-color">Género:</span> ${element.gender}</h4>
      <h4><span class="text-color">Especie:</span> ${element.specie}</h4>
      <h4><span class="text-color">Origen:</span> ${element.origin}</h4>
      <h4><span class="text-color">Estado:</span> <span class="${element.status.toLowerCase()}">${
      element.status
    }</span></h4>
    </div>

  </div>
    `;
    container.appendChild(figure);
  });
};

//---------------------------------------------------------------------//

prevBtn.addEventListener('click', () => {
  pageNum = pageNum - 1;
  getData();
});

nextBtn.addEventListener('click', () => {
  pageNum = pageNum + 1;
  getData();
});

//----------------------------------------------------------------------//

const disableBtns = () => {
  if (pageNum <= 1) {
    prevBtn.disabled = true;
  } else if (pageNum >= 42) {
    nextBtn.disabled = true;
  } else {
    prevBtn.disabled = false;
    nextBtn.disabled = false;
  }
};

getData();
