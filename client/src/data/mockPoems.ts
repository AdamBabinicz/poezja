// TODO: Replace with real data from poetry.netlify.app scraping
export interface Poem {
  id: string;
  title: string;
  content: string;
  keywords: string[];
  position: { x: number; y: number };
  connections: string[];
}

export const mockPoems: Poem[] = [
  {
    id: "kadlubek",
    title: "Kadłubek",
    content: `W ciemności nocy, gdy świat śpi,
    Kadłubek myśli się przewija,
    Przez umysł poety przepływa,
    Jak rzeka przez kamieniste dno.
    
    Fragmenty wspomnień, urwane słowa,
    Tworzą mozaikę znaczeń ukrytych,
    W głębi świadomości zaklętych,
    Czekają na odkrycie, na światło.`,
    keywords: ["kadłubek", "ciemność", "myśli", "fragmenty", "świadomość"],
    position: { x: 200, y: 150 },
    connections: ["pustka", "metamorfoza"]
  },
  {
    id: "pustka",
    title: "Pustka",
    content: `Pustka nie jest brakiem,
    To przestrzeń dla nowego,
    Miejsce, gdzie rodzi się
    To, co jeszcze nie istnieje.
    
    W ciszy między słowami,
    W oddechu między wersami,
    Kryje się prawda,
    Nieuchwytna i czysta.`,
    keywords: ["pustka", "przestrzeń", "cisza", "prawda", "istnienie"],
    position: { x: 400, y: 300 },
    connections: ["kadlubek", "refleksje"]
  },
  {
    id: "metamorfoza",
    title: "Metamorfoza",
    content: `Każdego dnia umieramy
    I rodzą się nowe wersje nas,
    Jak motyl z kokonu,
    Wyłaniamy się inni.
    
    Słowa zmieniają znaczenie,
    Myśli przybierają nowe formy,
    A my, wieczni wędrowcy,
    Idziemy ścieżką przemian.`,
    keywords: ["metamorfoza", "przemiana", "śmierć", "narodziny", "motyl"],
    position: { x: 100, y: 400 },
    connections: ["kadlubek", "czas"]
  },
  {
    id: "refleksje",
    title: "Refleksje",
    content: `W lustrze odbijają się
    Nie twarze, lecz myśli,
    Nie ciała, lecz dusze,
    Szukające swojego miejsca.
    
    Każda refleksja to pytanie,
    Każde pytanie to poszukiwanie,
    A poszukiwanie to droga
    Do prawdy o nas samych.`,
    keywords: ["lustro", "odbicie", "myśli", "dusze", "poszukiwanie"],
    position: { x: 500, y: 100 },
    connections: ["pustka", "czas"]
  },
  {
    id: "czas",
    title: "Czas",
    content: `Czas to nie rzeka,
    To ocean bez brzegów,
    Gdzie przeszłość i przyszłość
    Spotykają się w teraźniejszości.
    
    Sekundy jak krople rosy,
    Minuty jak fale na plaży,
    Godziny jak chmury na niebie,
    Przepływają przez nasze życie.`,
    keywords: ["czas", "ocean", "przeszłość", "przyszłość", "teraźniejszość"],
    position: { x: 350, y: 450 },
    connections: ["metamorfoza", "refleksje"]
  }
];

export const authorInfo = {
  name: "Neuralny Poeta",
  description: "Kontrowersyjny autor eksplorujący granice między świadomością a podświadomością, między słowem a myślą. Jego poezja to mapa neuronowych połączeń, gdzie każdy wiersz to węzeł w sieci znaczeń.",
  bio: `Twórca poezji neurologicznej, badacz granic ludzkiej percepcji. 
  Jego utwory powstają na przecięciu nauki i sztuki, 
  tworząc nowy język opisywania ludzkiego doświadczenia.
  
  Kontrowersyjny z natury, prowokujący do myślenia,
  poszukujący prawdy w najmroczniejszych zakątkach umysłu.`
};