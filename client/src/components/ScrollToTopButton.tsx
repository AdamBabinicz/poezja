import { useState, useEffect } from "react";
import { ChevronUp } from "lucide-react";

interface ScrollToTopButtonProps {
  targetId?: string;
}

export function ScrollToTopButton({ targetId }: ScrollToTopButtonProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [scrollableElement, setScrollableElement] = useState<
    Element | Window | null
  >(null);

  useEffect(() => {
    const element = targetId ? document.getElementById(targetId) : window;
    setScrollableElement(element);

    if (!element) return;

    const toggleVisibility = () => {
      let scrollTop = 0;
      if (element instanceof Window) {
        scrollTop = element.scrollY;
      } else if (element instanceof Element) {
        scrollTop = element.scrollTop;
      }

      if (scrollTop > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    element.addEventListener("scroll", toggleVisibility, { passive: true });

    return () => {
      element.removeEventListener("scroll", toggleVisibility);
    };
  }, [targetId]);

  const scrollToTop = () => {
    if (scrollableElement) {
      scrollableElement.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  };

  return (
    <button
      type="button"
      onClick={scrollToTop}
      className={`
        fixed bottom-8 right-8 z-[60] p-3 rounded-full bg-primary text-primary-foreground shadow-lg
        hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2
        transition-opacity duration-300
        ${isVisible ? "opacity-100" : "opacity-0 pointer-events-none"}
      `}
      aria-label="Przewiń do góry"
    >
      <ChevronUp className="h-6 w-6" />
    </button>
  );
}
