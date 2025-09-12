import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function scrapePoetryWebsite() {
  console.log('🌐 Pobieranie treści ze strony https://poetry.netlify.app/...');
  
  try {
    const response = await fetch('https://poetry.netlify.app/');
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const html = await response.text();
    console.log('✅ Strona pobrana pomyślnie');
    
    // Extract poems data
    const poems = extractPoems(html);
    console.log(`📝 Znaleziono ${poems.length} wierszy`);
    
    // Extract author info
    const authorInfo = extractAuthorInfo(html);
    console.log('👤 Informacje o autorze pobrane');
    
    // Create data structure
    const poetryData = {
      poems,
      author: authorInfo,
      metadata: {
        scrapedAt: new Date().toISOString(),
        sourceUrl: 'https://poetry.netlify.app/',
        totalPoems: poems.length
      }
    };
    
    // Save to JSON file
    const outputPath = path.join(__dirname, '../client/src/data/poetry-data.json');
    fs.writeFileSync(outputPath, JSON.stringify(poetryData, null, 2), 'utf8');
    
    console.log(`💾 Dane zapisane do: ${outputPath}`);
    console.log('🎉 Pobieranie zakończone pomyślnie!');
    
    return poetryData;
    
  } catch (error) {
    console.error('❌ Błąd podczas pobierania:', error.message);
    process.exit(1);
  }
}

function extractPoems(html) {
  const poems = [];
  
  // Regex patterns to find poem sections
  // This will need to be adjusted based on the actual HTML structure
  const poemSectionRegex = /<div[^>]*class="[^"]*poem[^"]*"[^>]*>[\s\S]*?<\/div>/gi;
  const titleRegex = /<h[1-6][^>]*>(.*?)<\/h[1-6]>/i;
  const contentRegex = /<p[^>]*>([\s\S]*?)<\/p>/gi;
  
  // Alternative approach - look for specific patterns
  const sections = html.split(/(?=<h[1-6])/);
  
  sections.forEach((section, index) => {
    const titleMatch = section.match(titleRegex);
    if (titleMatch) {
      const title = cleanText(titleMatch[1]);
      
      // Skip navigation and other non-poem titles
      if (isValidPoemTitle(title)) {
        const contentMatches = [...section.matchAll(contentRegex)];
        const content = contentMatches
          .map(match => cleanText(match[1]))
          .filter(text => text.length > 10) // Filter out short fragments
          .join('\n\n');
        
        if (content.length > 50) { // Only include substantial content
          poems.push({
            id: generateSlug(title),
            title,
            content,
            keywords: extractKeywords(title + ' ' + content),
            position: generatePosition(index, poems.length),
            connections: [] // Will be populated based on keyword analysis
          });
        }
      }
    }
  });
  
  // Generate connections based on shared keywords
  poems.forEach(poem => {
    poem.connections = poems
      .filter(other => other.id !== poem.id)
      .filter(other => hasSharedKeywords(poem.keywords, other.keywords))
      .slice(0, 3) // Limit to 3 connections per poem
      .map(other => other.id);
  });
  
  return poems;
}

function extractAuthorInfo(html) {
  // Look for "About" or "O Autorze" section
  const aboutSectionRegex = /<div[^>]*class="[^"]*about[^"]*"[^>]*>([\s\S]*?)<\/div>/i;
  const authorSectionRegex = /<section[^>]*about[^>]*>([\s\S]*?)<\/section>/i;
  
  let authorText = '';
  
  // Try different patterns to find author info
  const patterns = [aboutSectionRegex, authorSectionRegex];
  
  for (const pattern of patterns) {
    const match = html.match(pattern);
    if (match) {
      authorText = cleanText(match[1]);
      break;
    }
  }
  
  // Fallback - look for longer paragraphs that might contain author bio
  if (!authorText) {
    const paragraphs = [...html.matchAll(/<p[^>]*>([\s\S]*?)<\/p>/gi)];
    const longParagraphs = paragraphs
      .map(match => cleanText(match[1]))
      .filter(text => text.length > 200);
    
    if (longParagraphs.length > 0) {
      authorText = longParagraphs[0];
    }
  }
  
  return {
    name: "Autor", // This might need manual adjustment
    description: authorText || "Kontrowersyjny poeta eksplorujący granice między świadomością a podświadomością.",
    bio: authorText || "Szczegółowa biografia będzie uzupełniona po analizie treści."
  };
}

function cleanText(text) {
  return text
    .replace(/<[^>]*>/g, '') // Remove HTML tags
    .replace(/&nbsp;/g, ' ') // Replace non-breaking spaces
    .replace(/&amp;/g, '&') // Replace HTML entities
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/\s+/g, ' ') // Normalize whitespace
    .trim();
}

function isValidPoemTitle(title) {
  const invalidTitles = ['nav', 'menu', 'header', 'footer', 'home', 'about', 'contact', 'o autorze'];
  return title.length > 2 && 
         title.length < 100 && 
         !invalidTitles.some(invalid => title.toLowerCase().includes(invalid));
}

function generateSlug(title) {
  return title
    .toLowerCase()
    .replace(/[ąćęłńóśźż]/g, char => {
      const map = { 'ą': 'a', 'ć': 'c', 'ę': 'e', 'ł': 'l', 'ń': 'n', 'ó': 'o', 'ś': 's', 'ź': 'z', 'ż': 'z' };
      return map[char] || char;
    })
    .replace(/[^a-z0-9]/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
}

function extractKeywords(text) {
  const words = text.toLowerCase()
    .split(/\s+/)
    .filter(word => word.length > 3)
    .filter(word => !/^(jest|była|będzie|można|należy|oraz|ale|już|tylko|także|bardzo|gdzie|kiedy|dlaczego)$/.test(word));
  
  const wordCount = {};
  words.forEach(word => {
    wordCount[word] = (wordCount[word] || 0) + 1;
  });
  
  return Object.entries(wordCount)
    .filter(([word, count]) => count >= 2)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)
    .map(([word]) => word);
}

function hasSharedKeywords(keywords1, keywords2) {
  return keywords1.some(keyword => keywords2.includes(keyword));
}

function generatePosition(index, total) {
  const angle = (index / total) * 2 * Math.PI;
  const radius = 150 + Math.random() * 100;
  return {
    x: 400 + radius * Math.cos(angle) + (Math.random() - 0.5) * 50,
    y: 300 + radius * Math.sin(angle) + (Math.random() - 0.5) * 50
  };
}

// Run the scraper
scrapePoetryWebsite();