import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import * as cheerio from "cheerio";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function scrapePoetryWebsite() {
  console.log("🌐 Pobieranie treści ze strony https://poetry.netlify.app/...");

  try {
    const response = await fetch("https://poetry.netlify.app/");
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const html = await response.text();
    console.log("✅ Strona pobrana pomyślnie");

    const poems = extractPoems(html);
    console.log(`📝 Znaleziono ${poems.length} wierszy`);

    const authorInfo = extractAuthorInfo(html);
    console.log("👤 Informacje o autorze pobrane");

    const poetryData = {
      poems,
      author: authorInfo,
      metadata: {
        scrapedAt: new Date().toISOString(),
        sourceUrl: "https://poetry.netlify.app/",
        totalPoems: poems.length,
      },
    };

    const outputPath = path.join(
      __dirname,
      "../client/src/data/poetry-data.json"
    );
    fs.writeFileSync(outputPath, JSON.stringify(poetryData, null, 2), "utf8");

    console.log(`💾 Dane zapisane do: ${outputPath}`);
    console.log("🎉 Pobieranie zakończone pomyślnie!");
  } catch (error) {
    console.error("❌ Błąd podczas pobierania:", error.message);
    process.exit(1);
  }
}

function extractPoems(html) {
  const $ = cheerio.load(html);
  const poems = [];

  $("body > h2").each((index, element) => {
    const title = $(element).text().trim();

    if (!title || !isValidPoemTitle(title)) {
      return; // Pomiń ten element, jeśli nie jest prawidłowym tytułem
    }

    const contentLines = [];
    let nextElement = $(element).next();

    while (nextElement.length && !nextElement.is("h2")) {
      if (nextElement.is("p")) {
        contentLines.push(nextElement.text().trim());
      }
      nextElement = nextElement.next();
    }

    if (contentLines.length > 0) {
      poems.push({
        id: generateSlug(title),
        title: title,
        content: contentLines,
        imageSrc: `/images/${generateSlug(title)}.avif`, // Placeholder dla ścieżki do obrazka
        keywords: extractKeywords(title + " " + contentLines.join(" ")),
        connections: [], // Zostaną wygenerowane później
        position: { x: 0, y: 0 }, // Pozycje i tak są nadpisywane w innym pliku
      });
    }
  });

  // Generowanie połączeń po zebraniu wszystkich wierszy
  poems.forEach((poem) => {
    poem.connections = poems
      .filter(
        (other) =>
          other.id !== poem.id &&
          hasSharedKeywords(poem.keywords, other.keywords)
      )
      .slice(0, 2) // Ogranicz do 2 połączeń
      .map((other) => other.id);
  });

  return poems;
}

function extractAuthorInfo(html) {
  const $ = cheerio.load(html);
  // Na stronie biografia jest w ostatnim paragrafie <p> w <body>
  const bio = $("body > p").last().text().trim();

  return {
    name: "Neuralny Poeta",
    description:
      bio || "Autor urodził się dokładnie 100 lat później, niż Nikola Tesla...",
    bio: bio || "",
  };
}

function cleanText(text) {
  return text.replace(/\s+/g, " ").trim();
}

function isValidPoemTitle(title) {
  const invalidTitles = [
    "nav",
    "menu",
    "header",
    "footer",
    "home",
    "about",
    "contact",
    "o autorze",
  ];
  return (
    title.length > 2 &&
    title.length < 100 &&
    !invalidTitles.some((invalid) => title.toLowerCase().includes(invalid))
  );
}

function generateSlug(title) {
  return title
    .toLowerCase()
    .replace(
      /[ąćęłńóśźż]/g,
      (char) =>
        ({
          ą: "a",
          ć: "c",
          ę: "e",
          ł: "l",
          ń: "n",
          ó: "o",
          ś: "s",
          ź: "z",
          ż: "z",
        }[char] || char)
    )
    .replace(/[^a-z0-9]/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

function extractKeywords(text) {
  const words = text
    .toLowerCase()
    .split(/\s+/)
    .filter((word) => word.length > 4);
  const wordCount = {};
  words.forEach((word) => {
    wordCount[word] = (wordCount[word] || 0) + 1;
  });
  return Object.entries(wordCount)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 4)
    .map(([word]) => word);
}

function hasSharedKeywords(keywords1, keywords2) {
  return keywords1.some((keyword) => keywords2.includes(keyword));
}

scrapePoetryWebsite();
