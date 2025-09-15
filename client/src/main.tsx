import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";
import "./lib/i18n"; // Upewnij się, że ten import jest tutaj, na górze

createRoot(document.getElementById("root")!).render(<App />);
