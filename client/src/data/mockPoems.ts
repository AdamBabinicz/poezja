// TODO: Replace with real data from poetry.netlify.app scraping
export interface Poem {
  id: string;
  title: string;
  content: string;
  imageSrc: string;
  keywords: string[];
  position: { x: number; y: number };
  connections: string[];
}

const realPoemTitles = [
  "Moc", "Niespełnienie", "Obietnica", "Witryna", "Wiersz na czasy eschatyczne",
  "My, Wszechświat", "Apokalipsa według Adama", "Marzenie", "Kadłubek", "Uczucie",
  "Szal", "Chłopiec z basenu", "Dłoń", "Miara Wszechrzeczy", "Poeci są wśród nas",
  "Zlecenie od Pana Boga", "Droga", "Nagroda", "Piętno", "Pytanie",
  "Dziadek do orzechów", "Rozrzutność", "Przyszłość", "Nagroda i kara", "Światy",
  "Wiersz nostalgiczny", "Pamięć", "Głos", "Dylemat", "Tajemnica",
  "Spacer", "Dobrze, że jesteś", "Zdziwienie"
];

// TODO: Replace with real data from poetry.netlify.app scraping
export const mockPoems: Poem[] = realPoemTitles.map((title, index) => {
  const angle = (index / realPoemTitles.length) * 2 * Math.PI;
  const radius = 120 + (index % 3) * 60;
  const x = 400 + radius * Math.cos(angle) + (Math.random() - 0.5) * 40;
  const y = 300 + radius * Math.sin(angle) + (Math.random() - 0.5) * 40;
  
  // Generate a slug for the ID
  const id = title
    .toLowerCase()
    .replace(/[ąćęłńóśźż]/g, char => {
      const map: { [key: string]: string } = { 'ą': 'a', 'ć': 'c', 'ę': 'e', 'ł': 'l', 'ń': 'n', 'ó': 'o', 'ś': 's', 'ź': 'z', 'ż': 'z' };
      return map[char] || char;
    })
    .replace(/[^a-z0-9]/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');

  // Generate sample content based on title
  const sampleContent = `${title}

W głębi myśli, gdzie słowa się rodzą,
Kryje się prawda o ${title.toLowerCase()}.
Każdy wers to nowy świat,
Każde słowo to klucz do zrozumienia.

Między liniami ukryte są znaczenia,
Które czekają na odkrycie,
W ciszy poezji, w rytmie wersów,
Odnajdujemy siebie.`;

  // Generate keywords from title
  const keywords = title
    .toLowerCase()
    .split(/[\s,]+/)
    .filter(word => word.length > 2)
    .slice(0, 3)
    .concat(['poezja', 'myśl', 'słowo']);

  // Generate connections to nearby poems
  const connections = realPoemTitles
    .slice(Math.max(0, index - 2), index)
    .concat(realPoemTitles.slice(index + 1, Math.min(realPoemTitles.length, index + 3)))
    .slice(0, 2)
    .map(title => title
      .toLowerCase()
      .replace(/[ąćęłńóśźż]/g, char => {
        const map: { [key: string]: string } = { 'ą': 'a', 'ć': 'c', 'ę': 'e', 'ł': 'l', 'ń': 'n', 'ó': 'o', 'ś': 's', 'ź': 'z', 'ż': 'z' };
        return map[char] || char;
      })
      .replace(/[^a-z0-9]/g, '-')
      .replace(/-+/g, '-')
      .replace(/^-|-$/g, ''));

  return {
    id,
    title,
    content: sampleContent,
    imageSrc: `/images/placeholder-${index + 1}.jpg`,
    keywords,
    position: { x, y },
    connections
  };
});

export const authorInfo = {
  name: "Neuralny Poeta",
  description: "Kontrowersyjny autor eksplorujący granice między świadomością a podświadomością, między słowem a myślą. Jego poezja to mapa neuronowych połączeń, gdzie każdy wiersz to węzeł w sieci znaczeń.",
  bio: `Twórca poezji neurologicznej, badacz granic ludzkiej percepcji. 
  Jego utwory powstają na przecięciu nauki i sztuki, 
  tworząc nowy język opisywania ludzkiego doświadczenia.
  
  Kontrowersyjny z natury, prowokujący do myślenia,
  poszukujący prawdy w najmroczniejszych zakątkach umysłu.`
};