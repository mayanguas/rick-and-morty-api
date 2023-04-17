import './style-grid.css';

const container = document.querySelector('#container');
const btn = document.querySelector('button');

const charactersAnchor = document.querySelector('#characters');
const locationAnchor = document.querySelector('#locations');
const droidsAnchor = document.querySelector('#droids');

let dataList = [];

//______ 1. Pedimos info a la  API _________________________
const getData = async () => {
  const data = await fetch(`https://rickandmortyapi.com/api/episode`);
  console.log('1', data);
  const json = await data.json();
  console.log('2', json);
  dataList = json.results;
  console.log('3', dataList);
  mapData(dataList);
};

const mapData = (list) => {
  const mappedData = list.map((item) => ({
    name: item.name,
    episode: item.episode,
    id: item.id,
  }));
  console.log('Mapeado:', mappedData);
  printData(mappedData);
};

const printData = (list) => {
  container.innerHTML = '';
  for (const item of list) {
    const figure = document.createElement('figure');
    figure.innerHTML = `
    <div class="text-content img-content">
      <div class="text-position">
        <h2>${item.name}</h2>
        <h4>ID: ${item.id}</h4>
        <h4><span class="text-color">Género:</span> ${item.episode}</h4>
      </div>

    </div>
    `;
    container.appendChild(figure);
  }
};

getData();
