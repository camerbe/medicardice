const fs = require('fs');
const path = require('path');

// Chemin vers les assets à mettre à jour
const directory = '../../../public/assets/angular';

// Fonction pour remplacer les chemins relatifs dans tous les fichiers
function replacePaths(dir) {
  fs.readdir(dir, (err, files) => {
    if (err) {
      console.error('Erreur lors de la lecture du répertoire', err);
      return;
    }

    files.forEach(file => {
      const filePath = path.join(dir, file);
      if (fs.lstatSync(filePath).isDirectory()) {
        replacePaths(filePath); // Appel récursif pour les sous-répertoires (browser, server, etc.)
      } else if (file.endsWith('.html') || file.endsWith('.css') || file.endsWith('.js')) {
        let content = fs.readFileSync(filePath, 'utf8');
        content = content.replace(/http:\/\/127\.0\.0\.1:8000/g, 'http://localhost:9000');
        fs.writeFileSync(filePath, content, 'utf8');
        console.log(`Mise à jour des chemins dans ${filePath}`);
      }
    });
  });
}

// Exécuter la fonction pour remplacer les chemins dans tous les fichiers des assets
replacePaths(directory);
