import React, {
  createContext,
  useContext,
  useState,
  useRef,
  useEffect,
  ReactNode,
} from "react";

const HOVER_SOUND_DATA =
  "data:audio/mp3;base64,UklGRl9vT19XQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YU0AAAAIALAB/wO/BP8E/wX/Bv8H/wg/CX8K/wv/DP8O/xH/Ff8Z/wH/Bf8J/wz/Bv8L/w3/Ev8O/xX/Gf8f/yP/J/8s/y//Mv81/zf/P/9D/0f/Tf9S/1b/Wv9c/1//Yv9l/2r/bv9x/3b/ff+D/4r/kv+b/5//ov+p/6v/rv+w/7T/t/+6/7z/v/+/////AAECAwQFBgcICQoLDA0ODxAREhMUFRYXGBkaGxwdHh8gISIjJCUmJygpKissLS4vMDEyMzQ1Njc4OTo7PD0+P0BBQkNERUZHSElKS0xNTk9QUVJTVFVWV1hZWltcXV5fYGFiY2RlZmdoaWprbG1ub3BxcnN0dXZ3eHl6e3x9fn+AgYKDhIWGh4iJiouMjY6PkJGSk5SVlpeYmZqbnJ2en6ChoqOkpaanqKmqq6ytrq+wsbKztLW2t7i5uru8vb6/wMHCw8TFxsfIycrLzM3Oz9DR0tPU1dbX2Nna29zd3t/g4eLj5OXm5+jp6uvs7e7v8PHy8/T19vf4+fr7/P3+/wABAgMEBQYHCAkKCwwNDg8QERITFBUWFxgZGhscHR4fICEiIyQlJicoKSorLC0uLzAxMjM0NTY3ODk6Ozw9Pj9AQUJDREVGR0hJSktMTU5PUFFSU1RVVldYWVpbXF1eX2BhYmNkZWZnaGlqa2xtbm9wcXJzdHV2d3h5ent8fX5/gIGCg4SFhoeIiYqLjI2Oj5CRkpOUlZaXmJmam5ydnp+goaKjpKWmp6ipqqusra6vsLGys7S1tre4ubq7vL2+v8DBwsPExcbHyMnKy8zNzs/Q0dLT1NXW19jZ2tvc3d7f4OHi4+Tl5ufo6err7O3u7/Dx8vP09fb3+Pn6+/z9/v8AAQIDAwQEBgYIBwkKCw0ODxARFBUWFxgZGhscHR8gISIjJCUmJygpKissLS8wMTIzNDU2Nzg6Ozw9Pj9AQUJDREVGR0hJSktMTU5PUFJTVFVWV1hZWltcXV5fYGJjZGVmZ2hpamtsbm9wcXJzdHV2d3h5ent8fX5/gIGDhIWGh4iJiouMjY6PkJGSk5SVlpeYmZqbnJ2en6ChoqOkpaanqKmqq6ytrrCys7S1tre4ubq7vL2+v8DBwsPExcbHyMnKy8zNzs/R0tPU1dbX2Nna29zd3t/g4eLj5OXm5+jp6uvs7e7v8PHy8/T19vf4+fr7/P3+/w==";

interface SoundContextType {
  isSoundEnabled: boolean;
  toggleSound: () => void;
  playHoverSound: () => void;
}

const SoundContext = createContext<SoundContextType | undefined>(undefined);

export const useSound = () => {
  const context = useContext(SoundContext);
  if (!context) {
    throw new Error("useSound must be used within a SoundProvider");
  }
  return context;
};

interface SoundProviderProps {
  children: ReactNode;
}

export const SoundProvider = ({ children }: SoundProviderProps) => {
  const [isSoundEnabled, setIsSoundEnabled] = useState<boolean>(() => {
    if (typeof window !== "undefined") {
      const savedState = localStorage.getItem("soundEnabled");
      return savedState ? JSON.parse(savedState) : false;
    }
    return false;
  });

  const [isAudioUnlocked, setIsAudioUnlocked] = useState(false);
  const ambientAudioRef = useRef<HTMLAudioElement | null>(null);
  const hoverAudioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("soundEnabled", JSON.stringify(isSoundEnabled));
    }
    if (ambientAudioRef.current) {
      if (isSoundEnabled && isAudioUnlocked) {
        ambientAudioRef.current.play().catch(() => {});
      } else {
        ambientAudioRef.current.pause();
      }
    }
  }, [isSoundEnabled, isAudioUnlocked]);

  const toggleSound = () => {
    if (!isAudioUnlocked) {
      setIsAudioUnlocked(true);
    }
    setIsSoundEnabled((prev: boolean) => !prev);
  };

  const playHoverSound = () => {
    if (isSoundEnabled && hoverAudioRef.current) {
      hoverAudioRef.current.currentTime = 0;
      hoverAudioRef.current.play().catch(() => {});
    }
  };

  const value = {
    isSoundEnabled,
    toggleSound,
    playHoverSound,
  };

  return (
    <SoundContext.Provider value={value}>
      <audio ref={ambientAudioRef} src="/sounds/muza.mp3" loop />
      <audio ref={hoverAudioRef} src={HOVER_SOUND_DATA} />
      {children}
    </SoundContext.Provider>
  );
};
