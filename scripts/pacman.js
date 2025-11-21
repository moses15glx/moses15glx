const fs = require("fs");

// cores dos fantasmas
const ghosts = [
  { name: "Blinky", color: "#FF0000" },
  { name: "Pinky", color: "#FFB8FF" },
  { name: "Inky", color: "#00FFFF" },
  { name: "Clyde", color: "#FFB852" }
];

// posição inicial
let pacX = 0;
let pacY = 30;

let powerPelletX = 180;

// tamanho dos commits
function commitGrid() {
  let dots = "";
  for (let x = 0; x < 200; x += 20) {
    dots += `<circle cx="${x}" cy="30" r="4" fill="#00ff95">
               <animate attributeName="r" values="4;0" begin="${x/40}s" dur="0.4s" fill="freeze" />
             </circle>`;
  }
  return dots;
}

// Fantasmas
function ghostSVG(x, delay, color) {
  return `
  <g transform="translate(${x}, 30)">
    <rect width="16" height="14" rx="3" ry="3" fill="${color}">
      <animate attributeName="x" values="0;-160" dur="6s" begin="${delay}s" repeatCount="indefinite" />
    </rect>
  </g>`;
}

let ghostLayer = `
${ghostSVG(160, 0, ghosts[0].color)}
${ghostSVG(180, 0.2, ghosts[1].color)}
${ghostSVG(200, 0.4, ghosts[2].color)}
${ghostSVG(220, 0.6, ghosts[3].color)}
`;

const svg = `
<svg width="800" height="120" xmlns="http://www.w3.org/2000/svg">

  <!-- Grid de commits -->
  ${commitGrid()}

  <!-- Power Pellet -->
  <circle cx="${powerPelletX}" cy="30" r="6" fill="#ffd700">
    <animate attributeName="r" values="6;0" begin="3s" dur="0.3s" fill="freeze" />
  </circle>

  <!-- Fantasmas -->
  ${ghostLayer}

  <!-- Pac-Man -->
  <g transform="translate(0,0)">
    <circle cx="0" cy="30" r="12" fill="#F7DF1E">
      <animate attributeName="cx" values="0;240" dur="6s" repeatCount="indefinite" />
    </circle>

    <!-- Boca abrindo e fechando -->
    <path d="M0 30 L12 24 L12 36 Z" fill="black">
      <animate attributeName="d"
        values="M0 30 L12 24 L12 36 Z;
                M0 30 L12 30 L12 30 Z;
                M0 30 L12 24 L12 36 Z"
        dur="0.3s" repeatCount="indefinite" />
    </path>
  </g>

</svg>
`;

fs.writeFileSync("pacman.svg", svg);
console.log("Pac-Man SVG gerado!");
