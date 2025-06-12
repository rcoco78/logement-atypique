import React from "react";
import MarkdownRenderer from "./MarkdownRenderer";

const tableExamples = [
  {
    name: "Tableau simple",
    markdown: `
| Région      | Nombre de logements | Note moyenne |
|-------------|---------------------|--------------|
| Paris       | 45                  | 4.8          |
| Bordeaux    | 32                  | 4.6          |
| Honfleur    | 18                  | 4.9          |
| Lille       | 27                  | 4.7          |
    `
  },
  {
    name: "Tableau avec alignement",
    markdown: `
| Nom du logement     | Prix par nuit | Capacité | Disponibilité |
|:--------------------|:-------------:|----------|--------------:|
| Maison dans l'arbre | 120€          | 2-4 pers | Sur demande   |
| Bulle étoilée       | 150€          | 2 pers   | 15 juin 2023  |
| Cabane flottante    | 160€          | 4-6 pers | Août 2023     |
| Yourte moderne      | 110€          | 2-3 pers | Immédiate     |
    `
  },
  {
    name: "Tableau avec liens et formatage",
    markdown: `
| Type de logement | Description                           | Galerie                         |
|------------------|---------------------------------------|----------------------------------|
| **Cabanes**      | Logements perchés dans les arbres     | [Voir photos](/photos/cabanes)   |
| *Yourtes*        | Habitat traditionnel mongol revisité  | [Explorer](/photos/yourtes)      |
| Tiny houses      | Mini-maisons tout confort             | [Découvrir](/photos/tiny)        |
| Dômes           | Hébergement panoramique sous les étoiles | [Visiter](/photos/domes)      |
    `
  }
];

export default function MarkdownRendererTest() {
  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Test de rendu de tableaux Markdown</h1>
      
      {tableExamples.map((example, index) => (
        <div key={index} className="mb-12 border border-gray-200 rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">{example.name}</h2>
          
          <div className="mb-6">
            <h3 className="text-lg font-medium mb-2">Markdown source:</h3>
            <pre className="bg-gray-100 p-4 rounded overflow-auto text-sm">{example.markdown}</pre>
          </div>
          
          <div>
            <h3 className="text-lg font-medium mb-2">Rendu:</h3>
            <div className="border border-gray-200 rounded p-6 bg-white">
              <MarkdownRenderer>
                {example.markdown}
              </MarkdownRenderer>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
} 