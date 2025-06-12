import React from "react";
import "./MarkdownRenderer.css";

// Fonction avancée pour convertir le markdown en HTML
function markdownToHtml(markdown: string): string {
  let html = markdown;

  // 0. Lien d'image spécifique à Notion avec URL complexe
  // Cette fonction corrige les problèmes d'échappement des caractères spéciaux dans les URLs
  const processNotionImageLinks = () => {
    // Regex améliorée pour capturer précisément les liens d'image Notion
    const notionImageRegex = /!\[(.*?)\]\((https:\/\/prod-files-secure\.s3[^)]+)\)/g;
    
    html = html.replace(notionImageRegex, (match, alt, url) => {
      try {
        // Nettoyer l'URL - retirer les espaces et caractères problématiques
        const cleanUrl = url.replace(/\s/g, '');
        
        // Créer le HTML de remplacement avec le lien correctement encodé
        return `
          <div class="image-container">
            <img 
              src="${cleanUrl}" 
              alt="${alt.replace(/\.png$|\.jpg$|\.jpeg$|\.gif$/i, '')}" 
              class="article-image notion-image" 
              loading="lazy"
              onclick="if(this.classList.contains('expanded')) { this.classList.remove('expanded'); } else { this.classList.add('expanded'); }"
            />
          </div>
        `;
      } catch (e) {
        console.error("Erreur lors du traitement de l'image Notion:", e);
        return match;
      }
    });
    
    // Rechercher également les balises img déjà générées mais mal formées
    const brokenImgRegex = /<img([^>]*?)\/&gt;/g;
    html = html.replace(brokenImgRegex, '<img$1/>');
    
    // Corriger également les balises avec un alt contenant des entités HTML
    const imgWithEncodedEntities = /<img([^>]*?)alt="([^"]*?)&lt;([^"]*?)&gt;([^"]*?)"([^>]*?)>/g;
    html = html.replace(imgWithEncodedEntities, '<img$1alt="$2<$3>$4"$5>');
  };
  
  // Exécuter le traitement des images Notion
  processNotionImageLinks();

  // Fonction pour extraire l'ID YouTube de différents formats d'URL
  const extractYouTubeId = (url: string) => {
    // Regex pour les URLs YouTube standards et shorts
    const regexPatterns = [
      /(?:youtube\.com\/(?:shorts\/|watch\?v=|embed\/)|youtu\.be\/)([\w-]{11})/,
      /(?:youtube\.com\/shorts\/([\w-]{11}))/
    ];
    
    for (const regex of regexPatterns) {
      const match = url.match(regex);
      if (match && match[1]) return match[1];
    }
    
    return null;
  };

  // 0-youtube. Convertir les liens YouTube en iframes intégrés
  html = html.replace(/<a href="(https:\/\/(?:www\.)?(?:youtube\.com|youtu\.be)[^"]+)"[^>]*>([^<]+)<\/a>/g, (match, url, text) => {
    const videoId = extractYouTubeId(url);
    if (videoId) {
      // Vérifier si c'est un short YouTube
      const isYouTubeShort = url.includes('/shorts/');
      const containerClass = isYouTubeShort ? 'video-container youtube-short' : 'video-container';
      
      return `
        <div class="${containerClass}">
          <iframe
            src="https://www.youtube.com/embed/${videoId}"
            title="YouTube video player"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen
            class="youtube-embed"
          ></iframe>
        </div>
      `;
    }
    return match;
  });

  // 0-bis. Images markdown standard - Simplifions également cette partie
  html = html.replace(/!\[([^\]]*)\]\(([^)]+)\)/g, (match, alt, src) => {
    // Nettoyer l'URL
    const cleanSrc = src.trim();
    
    return `
      <div class="image-container">
        <img 
          src="${cleanSrc}" 
          alt="${alt}" 
          class="article-image" 
          loading="lazy"
          onclick="if(this.classList.contains('expanded')) { this.classList.remove('expanded'); } else { this.classList.add('expanded'); }"
        />
      </div>
    `;
  });

  // 0-ter. Dernière chance pour les images Notion: liens normaux qui sont en réalité des images
  html = html.replace(/<a href="([^"]+(?:\.png|\.jpg|\.jpeg|\.gif)[^"]*)"[^>]*>([^<]+)<\/a>/gi, (match, src, text) => {
    if (text.includes('.png') || text.includes('.jpg') || text.includes('Capture') || text.includes('image')) {
      return `
        <div class="image-container">
          <img 
            src="${src}" 
            alt="${text}" 
            class="article-image notion-image" 
            loading="lazy"
            onclick="if(this.classList.contains('expanded')) { this.classList.remove('expanded'); } else { this.classList.add('expanded'); }"
          />
        </div>
      `;
    }
    return match;
  });

  // Cas spécial pour le tableau dans l'exemple - détection précise de ce cas particulier
  if (html.includes('| Nom     | Âge | Métier        |') ||
      html.includes('| Nom | Âge | Métier | Test |')) {
    
    // On ne fait plus de traitement spécial avec un tableau codé en dur
    // On va plutôt laisser le processeur de tableaux générique s'en charger
    
    // Ne rien faire de spécial ici pour permettre au processeur de tableaux standard de fonctionner
  }

  // 0-bis. Pré-traitement des tableaux bruts
  // Cette étape transforme les tableaux qui ne sont pas correctement formatés en Markdown
  const rawTablePattern = /(\|\s*\w+\s*\|\s*\w+\s*\|[\s\S]*?(?=\n\n|\n[^|]|$))/g;
  html = html.replace(rawTablePattern, (match) => {
    // Vérifier si c'est déjà un tableau Markdown correctement formaté
    if (match.includes('---') || match.includes(':-')) return match;
    
    const lines = match.split('\n').filter(line => line.trim() && line.includes('|'));
    if (lines.length < 2) return match;
    
    // Compter le nombre de colonnes dans la première ligne
    const firstLine = lines[0];
    const columnCount = (firstLine.match(/\|/g) || []).length - 1;
    
    if (columnCount < 2) return match;
    
    // Insérer une ligne de séparation après la première ligne
    const separatorLine = '|' + Array(columnCount).fill(' --- ').join('|') + '|';
    const formattedTable = lines[0] + '\n' + separatorLine + '\n' + lines.slice(1).join('\n');
    
    return formattedTable;
  });

  // 1. Tableaux (traiter d'abord pour éviter les conflits)
  // Nouvelle regex plus robuste qui correspond aux tableaux Markdown standard
  const tableRegex = /(\|[^\n]+\|[\s]*\n\|[\s\-:]+\|[\s]*\n(?:\|[^\n]+\|[\s]*\n)+)/gm;
  
  html = html.replace(tableRegex, (tableMatch) => {
    return processTableMarkdown(tableMatch);
  });

  // 1-bis. Détection spécifique pour les tableaux de l'API Notion
  // Extrait de l'exemple: | Nom | Âge | Métier | \n | ------- | --- | ------------- | \n ...
  const notionTableRegex = /\|\s*([^|\n]+\s*\|\s*)+\n\|\s*[-]+\s*\|\s*[-]+\s*\|/g;
  const tableMatches = html.match(notionTableRegex);
  
  if (tableMatches) {
    for (const tableMatch of tableMatches) {
      const startIdx = html.indexOf(tableMatch);
      if (startIdx !== -1) {
        // Trouver toutes les lignes qui font partie de ce tableau
        let endIdx = startIdx + tableMatch.length;
        let nextLine = html.indexOf('\n', endIdx);
        while (nextLine !== -1 && html.substring(endIdx, nextLine).trim().startsWith('|')) {
          endIdx = nextLine;
          nextLine = html.indexOf('\n', endIdx + 1);
        }
        
        const fullTable = html.substring(startIdx, endIdx);
        const tableHTML = processTableMarkdown(fullTable);
        
        // Remplacer le tableau brut par le HTML
        html = html.substring(0, startIdx) + tableHTML + html.substring(endIdx);
      }
    }
  }

  // 1-ter. Recherche de tableaux JSON intégrés pour les convertir
  // Cette fonction cherche des objets JSON qui contiennent un tableau
  const jsonTablePattern = /"contentMarkdown":[^}]*"parent":"[^"]*\| Nom[^"]*\|[^"]*\|/g;
  const jsonMatches = html.match(jsonTablePattern);
  
  if (jsonMatches) {
    for (const jsonMatch of jsonMatches) {
      try {
        // Extraction du contenu du tableau à partir du JSON
        const tablePattern = /\| ([^|]*)\s*\| ([^|]*)\s*\| ([^|]*)\s*\| ([^|]*)\s*\|[\s\S]*?\| [-]+\s*\| [-]+\s*\| [-]+\s*\| [-]+\s*\|([\s\S]*?)\n\n/g;
        const tableMatches = jsonMatch.match(tablePattern);
        
        if (tableMatches && tableMatches.length > 0) {
          const tableContent = tableMatches[0];
          
          // Extraire les en-têtes et les lignes de données
          const lines = tableContent.split('\n').filter(line => line.trim() && line.includes('|'));
          
          if (lines.length >= 2) {
            const headerRow = lines[0];
            const headers = headerRow.split('|')
              .filter(cell => cell.trim())
              .map(cell => cell.trim());
              
            // Ignorer la ligne de séparation avec les tirets (ligne 1)
            const dataRows = lines.slice(2);
            
            // Construire le HTML du tableau
            const headerHTML = headers.map(header => `<th>${header}</th>`).join('');
            
            const rowsHTML = dataRows.map(row => {
              const cells = row.split('|')
                .filter(cell => cell.trim())
                .map(cell => cell.trim())
                .map(cell => `<td>${cell}</td>`)
                .join('');
                
              return `<tr>${cells}</tr>`;
            }).join('');
            
            const tableHTML = `
            <div class="table-container">
              <table>
                <thead>
                  <tr>${headerHTML}</tr>
                </thead>
                <tbody>
                  ${rowsHTML}
                </tbody>
              </table>
            </div>`;
            
            // Remplacer dans le HTML
            const startIdx = html.indexOf(jsonMatch);
            if (startIdx !== -1) {
              // Ne remplacer que la partie contenant le tableau
              const endIdx = startIdx + jsonMatch.length;
              html = html.substring(0, startIdx) + tableHTML + html.substring(endIdx);
            }
          }
        }
      } catch (e) {
        console.error('Erreur lors du traitement du tableau JSON:', e);
      }
    }
  }

  // 2. Titres
  html = html
    .replace(/^# (.*$)/gm, '<h1 class="text-4xl font-bold mt-8 mb-4">$1</h1>')
    .replace(/^## (.*$)/gm, '<h2 class="text-3xl font-bold mt-8 mb-4">$1</h2>')
    .replace(/^### (.*$)/gm, '<h3 class="text-2xl font-bold mt-6 mb-3">$1</h3>');

  // 3. Ligne horizontale
  html = html.replace(/^\s*---\s*$/gm, '<hr class="my-8 border-t border-gray-300" />');

  // 4. Cases à cocher (traiter avant les listes)
  html = html
    .replace(/^- \[ \] (.*?)$/gm, '<div class="flex items-center my-2"><input type="checkbox" class="mr-2" disabled /> <span>$1</span></div>')
    .replace(/^- \[x\] (.*?)$/gm, '<div class="flex items-center my-2"><input type="checkbox" class="mr-2" checked disabled /> <span>$1</span></div>')
    .replace(/^\* \[ \] (.*?)$/gm, '<div class="flex items-center my-2"><input type="checkbox" class="mr-2" disabled /> <span>$1</span></div>')
    .replace(/^\* \[x\] (.*?)$/gm, '<div class="flex items-center my-2"><input type="checkbox" class="mr-2" checked disabled /> <span>$1</span></div>');

  // 5. Listes à puces et numérotées
  html = html
    .replace(/^\s*-\s+(.*?)$/gm, '<li class="ml-6 list-disc">$1</li>')
    .replace(/^\s*\*\s+(.*?)$/gm, '<li class="ml-6 list-disc">$1</li>')
    .replace(/^\s*\d+\.\s+(.*?)$/gm, '<li class="ml-6 list-decimal">$1</li>');

  // Grouper les listes
  html = html
    .replace(/(<li[^>]*>.*?<\/li>)(?:\s*)(?=<li[^>]*>)/gs, '$1')
    .replace(/(<li[^>]*class="ml-6 list-disc".*?<\/li>(?:\s*?))+/gs, '<ul class="my-4 ml-5 list-disc">$&</ul>')
    .replace(/(<li[^>]*class="ml-6 list-decimal".*?<\/li>(?:\s*?))+/gs, '<ol class="my-4 ml-5 list-decimal">$&</ol>');
  
  // 6. Blocs de citation
  html = html.replace(/^\s*>\s*(.*?)$/gm, '<blockquote class="pl-4 border-l-4 border-gray-300 italic my-4 text-gray-600">$1</blockquote>');

  // 7. Blocs de code
  html = html.replace(/```([^`]+)```/gs, '<pre class="bg-gray-100 p-4 rounded-lg my-4 overflow-x-auto font-mono text-sm"><code>$1</code></pre>');

  // 8. Styles inline
  html = html
    .replace(/\*\*(.*?)\*\*/g, '<strong class="font-bold">$1</strong>')
    .replace(/\*(.*?)\*/g, '<em class="italic">$1</em>')
    .replace(/_([^_]+)_/g, '<em class="italic">$1</em>')
    .replace(/`([^`]+)`/g, '<code class="px-1 py-0.5 bg-gray-100 rounded text-gray-800 font-mono text-sm">$1</code>');

  // 9. Liens
  html = html.replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2" class="text-primary hover:underline" target="_blank" rel="noopener noreferrer">$1</a>');

  // 10. Images (seconde passe pour celles non détectées) - Ne devrait plus être nécessaire
  // mais on le garde en cas où
  html = html.replace(/!\[(.*?)\]\((.*?)\)/g, (match, alt, src) => {
    return `
      <div class="image-container">
        <img 
          src="${src}" 
          alt="${alt}" 
          class="article-image" 
          loading="lazy"
          onclick="if(this.classList.contains('expanded')) { this.classList.remove('expanded'); } else { this.classList.add('expanded'); }"
        />
      </div>
    `;
  });
  
  // 10-bis. Correction des balises img HTML directement présentes dans le contenu
  // Ceci capture les balises HTML img qui sont insérées directement dans le contenu
  const imgTagRegex = /<img\s+([^>]*)>/g;
  html = html.replace(imgTagRegex, (match, attributes) => {
    // Vérifier si l'image a déjà la classe article-image
    if (attributes.includes('class="article-image"') || attributes.includes('article-image')) {
      return match;
    }
    
    // Extraire src et alt s'ils existent
    const srcMatch = attributes.match(/src="([^"]+)"/);
    const altMatch = attributes.match(/alt="([^"]+)"/);
    
    if (srcMatch) {
      const src = srcMatch[1];
      const alt = altMatch ? altMatch[1] : '';
      
      return `
        <div class="image-container">
          <img 
            src="${src}" 
            alt="${alt}" 
            class="article-image notion-image" 
            loading="lazy"
            onclick="if(this.classList.contains('expanded')) { this.classList.remove('expanded'); } else { this.classList.add('expanded'); }"
            ${attributes.replace(/src="[^"]+"|alt="[^"]+"/g, '')}
          />
        </div>
      `;
    }
    
    return match;
  });

  // 10-ter. Correction spéciale pour les fragments d'image imbriqués avec des em et code
  const fragmentedImagePattern = /<img[^>]*src="([^"]*?)>([^<]*?)<\/code>`<code[^>]*>([^"]*)"[^>]*>/g;
  html = html.replace(fragmentedImagePattern, (match, startUrl, middleUrl, endUrl) => {
    const fullUrl = `${startUrl}${middleUrl}${endUrl}`;
    return `
      <div class="image-container">
        <img 
          src="${fullUrl}" 
          alt="Image reconstruite" 
          class="article-image notion-image" 
          loading="lazy"
          onclick="if(this.classList.contains('expanded')) { this.classList.remove('expanded'); } else { this.classList.add('expanded'); }"
        />
      </div>
    `;
  });

  // 11. Paragraphes (traiter en dernier, après avoir géré les cas spéciaux)
  html = html.replace(/(?:^|\n\n)([^#\-<>\n].*?)(?=\n\n|$)/gs, function(match, content) {
    // Ne pas wrapper en paragraph si c'est déjà du HTML ou une image
    if (content.trim().startsWith('<') && content.trim().endsWith('>')) {
      return match;
    }
    if (content.trim().startsWith('![') && content.trim().includes('](')) {
      return content;
    }
    return `<p class="my-4">${content}</p>`;
  });

  // 12. Nettoyage final
  html = html
    .replace(/<\/p>\s*<p>/g, '</p><p>')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/<p>\s*<\/p>/g, '')
    .replace(/\[\s*x\s*\]/g, '<input type="checkbox" checked disabled>')
    .replace(/\[\s*\]\s*/g, '<input type="checkbox" disabled>');
    
  // 12-bis. Correction des balises image spécifiques au format trouvé dans l'exemple
  const specialNotionImageFormat = /<img\s+src="([^"]+)"\s+alt="([^"]+)"\s+class="([^"]+)"\s+loading="lazy"\s+onclick="([^"]+)"\/&gt;/g;
  html = html.replace(specialNotionImageFormat, (match, src, alt, cssClass, onclick) => {
    return `
      <div class="image-container">
        <img 
          src="${src}" 
          alt="${alt}" 
          class="${cssClass}" 
          loading="lazy"
          onclick="${onclick}"
        />
      </div>
    `;
  });
  
  // 12-ter. Deuxième passe pour les balises imagés avec entités HTML malformées
  html = html.replace(/\/&gt;/g, '/>');
  
  // 12-quater. Correction spéciale des URLs d'images Notion qui sont fragmentées dans le HTML
  // Ce cas se produit quand une URL contient des caractères spéciaux qui sont encodés en HTML
  // et que le parser HTML fragmente l'URL en plusieurs éléments
  const fragmentedImageUrlPattern = /<img[^>]*?src="(https:\/\/prod-files-secure\.s3[^"]*?)(&lt;[^>]*?&gt;)(.*?)"[^>]*?>/g;
  html = html.replace(fragmentedImageUrlPattern, (match, urlStart, encodedPart, urlEnd) => {
    // Reconstruire l'URL correcte en remplaçant les entités HTML
    const decodedPart = encodedPart.replace(/&lt;/g, '<').replace(/&gt;/g, '>');
    const fullUrl = `${urlStart}${decodedPart}${urlEnd}`;
    
    // Extraire l'attribut alt s'il existe
    const altMatch = match.match(/alt="([^"]*?)"/);
    const alt = altMatch ? altMatch[1] : '';
    
    return `
      <div class="image-container">
        <img 
          src="${fullUrl}" 
          alt="${alt}" 
          class="article-image notion-image" 
          loading="lazy"
          onclick="if(this.classList.contains('expanded')) { this.classList.remove('expanded'); } else { this.classList.add('expanded'); }"
        />
      </div>
    `;
  });
  
  // 12-quinquies. Traitement des URLs avec des tags em imbriqués
  // Cette regex est plus complexe car elle doit capturer plusieurs niveaux d'imbrication
  const htmlWithEmbeddedTags = /<div class="image-container">\s*<img[^>]*?src="([^<]*)<em[^>]*>([^<]*)<\/em>([^"]*)"[^>]*>\s*<\/div>/g;
  html = html.replace(htmlWithEmbeddedTags, (match, start, middle, end) => {
    const fullUrl = `${start}${middle}${end}`;
    return `
      <div class="image-container">
        <img 
          src="${fullUrl}" 
          alt="Image Notion" 
          class="article-image notion-image" 
          loading="lazy"
          onclick="if(this.classList.contains('expanded')) { this.classList.remove('expanded'); } else { this.classList.add('expanded'); }"
        />
      </div>
    `;
  });

  return html;
}

// Fonction dédiée au traitement des tableaux Markdown
function processTableMarkdown(tableStr: string): string {
  // Diviser en lignes et filtrer les lignes vides ou non pertinentes
  const lines = tableStr.split('\n').filter(line => line.trim() && line.includes('|'));
  if (lines.length < 2) return tableStr;

  // Identifier la ligne d'en-tête et la ligne de délimiteur
  const headerLine = lines[0];
  
  // Nettoyer les lignes du tableau pour supprimer les espacements inutiles
  const cleanLines = lines.map(line => 
    line.split('|')
      .filter(cell => cell !== '') // Éliminer les cellules vides
      .map(cell => cell.trim()) // Nettoyer les espaces
      .join('|')
  );
  
  // Identifier la ligne délimiteur (celle contenant les tirets "---")
  // On s'assure qu'on ne prend pas une ligne de données qui contient juste le texte "---"
  const delimiterIndex = lines.findIndex(line => 
    line.includes('---') && 
    line.split('|').filter(Boolean).every(cell => cell.trim().includes('-'))
  );
  
  // S'il n'y a pas de ligne délimiteur trouvée ou si elle est invalide, on arrête
  if (delimiterIndex <= 0) return tableStr;
  
  // La ligne d'en-tête est avant le délimiteur
  const headerCells = headerLine
    .split('|')
    .filter(Boolean) // Éliminer les cellules vides
    .map(cell => cell.trim());
  
  // Les lignes de données sont après le délimiteur
  const dataLines = lines.filter((_, index) => index !== 0 && index !== delimiterIndex);
  
  // Convertir en HTML
  const headerHtml = headerCells
    .map(cell => `<th style="text-align: left">${cell}</th>`)
    .join('');
    
  const bodyHtml = dataLines
    .map(line => {
      const cells = line
        .split('|')
        .filter(Boolean)
        .map(cell => cell.trim())
        .map(cell => `<td style="text-align: left">${cell}</td>`)
        .join('');
      
      // Si la ligne semble être une ligne de délimiteur (tous les éléments contiennent "---"), la sauter
      if (cells.includes('---') && line.split('|').filter(Boolean).every(cell => cell.trim() === '---' || cell.trim() === '----')) {
        return '';
      }
      
      return `<tr>${cells}</tr>`;
    })
    .filter(row => row) // Filtrer les lignes vides
    .join('');
  
  return `<div class="table-container">
    <table>
      <thead>
        <tr>${headerHtml}</tr>
      </thead>
      <tbody>
        ${bodyHtml}
      </tbody>
    </table>
  </div>`;
}

export default function MarkdownRenderer({ children }: { children: string }) {
  // Fonction pour extraire et convertir les tableaux d'un JSON d'article
  const convertJsonTableToHtml = React.useCallback((json: string) => {
    try {
      // Essayer de parser le JSON
      const articleData = JSON.parse(json);
      
      // Vérifier si nous avons contentMarkdown.parent ou content
      const markdownContent = articleData.contentMarkdown?.parent || articleData.content;
      
      if (!markdownContent) return json;
      
      // Recherche de tableaux dans le contenu markdown
      const tablePattern = /\|\s*([^\n|]+)\s*\|\s*([^\n|]+)\s*\|\s*([^\n|]+)\s*\|\s*([^\n|]+)\s*\|\n\|\s*[-]+\s*\|\s*[-]+\s*\|\s*[-]+\s*\|\s*[-]+\s*\|([\s\S]*?)(?=\n\n|\n##|$)/g;
      let result = markdownContent;
      let match;
      
      while ((match = tablePattern.exec(markdownContent)) !== null) {
        const tableContent = match[0];
        const lines = tableContent.split('\n').filter(line => line.trim() && line.includes('|'));
        
        if (lines.length >= 2) {
          // Extraire les en-têtes
          const headerRow = lines[0];
          const headers = headerRow.split('|')
            .filter(cell => cell.trim())
            .map(cell => cell.trim());
            
          // Ignorer la ligne de séparation avec les tirets (ligne 1)
          const dataRows = lines.slice(2);
          
          // Construire le HTML du tableau
          const headerHTML = headers.map(header => `<th>${header}</th>`).join('');
          
          const rowsHTML = dataRows.map(row => {
            const cells = row.split('|')
              .filter(cell => cell.trim())
              .map(cell => cell.trim())
              .map(cell => `<td>${cell}</td>`)
              .join('');
              
            return `<tr>${cells}</tr>`;
          }).join('');
          
          const tableHTML = `
          <div class="table-container">
            <table>
              <thead>
                <tr>${headerHTML}</tr>
              </thead>
              <tbody>
                ${rowsHTML}
              </tbody>
            </table>
          </div>`;
          
          // Remplacer le tableau Markdown par le HTML dans le résultat
          result = result.replace(tableContent, tableHTML);
        }
      }
      
      // Retourner le contenu avec les tableaux convertis
      return result;
    } catch (e) {
      console.error("Erreur lors de la conversion du tableau JSON:", e);
      return json;
    }
  }, []);

  // Détecter s'il s'agit d'un JSON et si oui, extraire le contenu pertinent
  const processedContent = React.useMemo(() => {
    if (children && (children.trim().startsWith('{') && children.trim().endsWith('}'))) {
      try {
        return convertJsonTableToHtml(children);
      } catch (e) {
        return children;
      }
    }
    return children;
  }, [children, convertJsonTableToHtml]);
  
  // Traitement du contenu Markdown normal
  const fixedMarkdown = React.useMemo(() => {
    let content = processedContent;
    
    // Détecter et corriger les liens d'images Notion au format markdown
    const notionImageLinkPattern = /!\[(.*?)\]\((https:\/\/prod-files-secure\.s3[^)]+)\)/g;
    content = content.replace(notionImageLinkPattern, (match, alt, url) => {
      // Nettoyer l'URL en supprimant les espaces et autres caractères problématiques
      return `![${alt}](${url.replace(/\s/g, '')})`;
    });
    
    return content;
  }, [processedContent]);
  
  // Utiliser dangerouslySetInnerHTML car ReactMarkdown ne fonctionne pas correctement
  // Utiliser useEffect pour ajouter des écouteurs d'événements aux images après le rendu
  React.useEffect(() => {
    // Chercher toutes les images dans les conteneurs .markdown-rendered
    const images = document.querySelectorAll('.markdown-rendered img');
    
    images.forEach(img => {
      // Ajouter le comportement de zoom si ce n'est pas déjà fait
      if (!img.getAttribute('onclick')) {
        img.setAttribute('onclick', 
          "if(this.classList.contains('expanded')) { this.classList.remove('expanded'); } else { this.classList.add('expanded'); }"
        );
      }
      
      // S'assurer que l'image est bien dans un conteneur .image-container
      if (!img.closest('.image-container')) {
        const parent = img.parentElement;
        const container = document.createElement('div');
        container.className = 'image-container';
        
        if (parent) {
          parent.insertBefore(container, img);
          container.appendChild(img);
        }
      }
    });
    
    // Corriger les liens spécifiques qui contiennent des images Notion
    const notionLinks = document.querySelectorAll('a[href*="prod-files-secure.s3"]');
    notionLinks.forEach(link => {
      const href = link.getAttribute('href');
      if (href && (href.includes('.png') || href.includes('.jpg') || href.includes('.jpeg') || href.includes('.gif'))) {
        // Créer une image à la place du lien
        const img = document.createElement('img');
        img.setAttribute('src', href);
        img.setAttribute('alt', link.textContent || 'Image');
        img.className = 'article-image notion-image';
        img.setAttribute('loading', 'lazy');
        img.setAttribute('onclick', 
          "if(this.classList.contains('expanded')) { this.classList.remove('expanded'); } else { this.classList.add('expanded'); }"
        );
        
        // Créer un conteneur
        const container = document.createElement('div');
        container.className = 'image-container';
        container.appendChild(img);
        
        // Remplacer le lien par l'image
        if (link.parentElement) {
          link.parentElement.replaceChild(container, link);
        }
      }
    });

    // Traiter les liens YouTube qui n'auraient pas été convertis par la fonction markdownToHtml
    const youtubeLinks = document.querySelectorAll('a[href*="youtube.com"], a[href*="youtu.be"]');
    youtubeLinks.forEach(link => {
      const href = link.getAttribute('href');
      if (!href) return;

      // Fonction pour extraire l'ID YouTube
      const extractYouTubeId = (url: string) => {
        const regexPatterns = [
          /(?:youtube\.com\/(?:shorts\/|watch\?v=|embed\/)|youtu\.be\/)([\w-]{11})/,
          /(?:youtube\.com\/shorts\/([\w-]{11}))/
        ];
        
        for (const regex of regexPatterns) {
          const match = url.match(regex);
          if (match && match[1]) return match[1];
        }
        
        return null;
      };

      const videoId = extractYouTubeId(href);
      if (videoId) {
        // Vérifier si c'est un short YouTube
        const isYouTubeShort = href.includes('/shorts/');
        
        // Créer un iframe pour remplacer le lien
        const iframe = document.createElement('iframe');
        iframe.setAttribute('src', `https://www.youtube.com/embed/${videoId}`);
        iframe.setAttribute('title', 'YouTube video player');
        iframe.setAttribute('frameborder', '0');
        iframe.setAttribute('allow', 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture');
        iframe.setAttribute('allowfullscreen', 'true');
        iframe.className = 'youtube-embed';
        
        // Créer un conteneur
        const container = document.createElement('div');
        container.className = isYouTubeShort ? 'video-container youtube-short' : 'video-container';
        container.appendChild(iframe);
        
        // Remplacer le lien par l'iframe
        if (link.parentElement) {
          link.parentElement.replaceChild(container, link);
        }
      }
    });
  }, [children]);

  return (
    <div 
      className="markdown-rendered prose prose-lg max-w-none"
      dangerouslySetInnerHTML={{ __html: markdownToHtml(fixedMarkdown) }}
    />
  );
}

// Si le rendu ci-dessus fonctionne, tu pourras remplacer par :
// return <ReactMarkdown>{children}</ReactMarkdown>; 