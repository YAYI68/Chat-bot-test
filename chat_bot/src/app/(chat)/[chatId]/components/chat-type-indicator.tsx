import { useEffect, useState } from "react";

export function ChatTypingIndicator({ duration = 5000 }: { duration?: number }) {
  const [dots, setDots] = useState<string>("");
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const dotInterval = setInterval(() => {
      setDots((prev) => (prev.length < 3 ? prev + "." : ""));
    }, 500);

    const hideTimeout = setTimeout(() => {
      setVisible(false);
      clearInterval(dotInterval);
    }, duration);

    return () => {
      clearInterval(dotInterval);
      clearTimeout(hideTimeout);
    };
  }, [duration]);

  if (!visible) return null; // Hide component when time is up

  return (
      <div className="bg-gray-200 rounded-lg px-4 py-2 animate-fadeIn">
        <span className="text-label-500 text-lg">{dots}</span>
      </div>
  );
}
