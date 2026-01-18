
window.onload = function () {
    localStorage.clear();

    // Efface tout le sessionStorage
    sessionStorage.clear();

    window.addEventListener("load", () => {

        // Si tu veux aussi vider tous les inputs et textarea
        document.querySelectorAll("input, textarea").forEach(el => {
            el.value = "";
        });
    });

    document.getElementById('accident-date').valueAsDate = new Date();
    localStorage.setItem('nature', 'humain')
}

const selected = document.getElementById("selectedOptionImg");
const options = document.getElementById("optionsListImg");
const customSelect = document.getElementById("customSelect");

selected.addEventListener("click", () => {
    options.style.display = options.style.display === "block" ? "none" : "block";
});

document.querySelectorAll(".option-img").forEach(option => {
    option.addEventListener("click", () => {
        const img = option.querySelector("img");
        const value = option.getAttribute("data-value");

        if (img) {
            selected.innerHTML = `<img src="${img.src}" alt="">`;
        } else {
            selected.innerHTML = `<span>Non</span>`;
        }

        // Stocker la valeur sélectionnée si nécessaire
        selected.setAttribute("data-value", value);
        console.log("Valeur sélectionnée :", value);

        options.style.display = "none";
    });
});


const nature = document.getElementById('nature');
const selectAccident = document.getElementById('select-accident');
const groupEvenementHautPotentiel = document.getElementById('haut-potentiel');
const gravitePotentielleSelect = document.getElementById('gravite-potentielle-select');
const regleContainer = document.getElementById('selectedOptionImg');

function verifierConditions() {
    const gravite = parseInt(gravitePotentielleSelect.value, 10);
    const regleImage = regleContainer.querySelector("img"); // vérifie si une image est sélectionnée

    const conditionGravite = gravite > 3;
    const conditionRegle = regleImage !== null;

    if (conditionGravite || conditionRegle) {
        groupEvenementHautPotentiel.style.display = 'block';
        localStorage.setItem('HIPO', true);
    } else {
        groupEvenementHautPotentiel.style.display = 'none';
        localStorage.removeItem('HIPO');
    }

    localStorage.setItem('analyse', conditionRegle);
}

// Écouteurs pour chaque changement
gravitePotentielleSelect.addEventListener('change', verifierConditions);

// Si tu as un système de sélection d’image personnalisé :
document.querySelectorAll(".option-img").forEach(option => {
    option.addEventListener("click", () => {
        const img = option.querySelector("img").src;
        regleContainer.innerHTML = `<img src="${img}" alt="">`;
        verifierConditions();
    });
});


function loadPageContent() {
    // Restaurer le contenu HTML de la page avec les valeurs des champs
    const savedContent = localStorage.getItem('page1Content');
    if (savedContent) {
        document.querySelector('#page1').outerHTML = savedContent;
    }
}

// Sélection des éléments
const modal = document.getElementById("myModal");
const btn = document.getElementById("openModalBtn");
const closeBtn = document.querySelector(".close");

// Ouvrir le modal
btn.onclick = function () {
    modal.style.display = "block";
}

// Fermer quand on clique sur la croix
closeBtn.onclick = function () {
    modal.style.display = "none";
}

// Fermer quand on clique en dehors de l'image
window.onclick = function (event) {
    if (event.target === modal) {
        modal.style.display = "none";
    }
}

const photoInput = document.getElementById('photo-input');
const photoContainer = document.getElementById('photo-container');

photoInput.addEventListener('change', function () {


  Array.from(this.files).forEach((file, index) => {
    const reader = new FileReader();

    reader.onload = function (e) {
      // Crée un conteneur pour chaque image + bouton
      const imageWrapper = document.createElement('div');
      imageWrapper.style.position = 'relative';
      imageWrapper.style.display = 'inline-block';

      // Image preview
      const img = document.createElement('img');
      img.src = e.target.result;
      img.style.width = '1000px';
      img.style.height = 'auto';
      img.style.border = '1px solid #ccc';
      img.style.borderRadius = '8px';

      // Bouton de suppression
      const btn = document.createElement('button');
      btn.textContent = '✕';
      btn.style.position = 'absolute';
      btn.style.top = '0';
      btn.style.right = '0';
      btn.style.background = 'rgba(0,0,0,0.6)';
      btn.style.color = 'white';
      btn.style.border = 'none';
      btn.style.borderRadius = '0 8px 0 8px';
      btn.style.cursor = 'pointer';

      btn.addEventListener('click', () => {
        imageWrapper.remove();
      });

      imageWrapper.appendChild(img);
      imageWrapper.appendChild(btn);
      photoContainer.appendChild(imageWrapper);
    };

    reader.readAsDataURL(file);
  });
});

function redirectToPage() {
    savePageContentById('page1');
    window.location.href = 'analyse-cause.html';
}

window.onbeforeunload = function () {
    savePageContentById('page1');
}
