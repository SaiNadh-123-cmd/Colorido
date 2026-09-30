import { useState, useEffect } from "react";

export interface AntigravityState {
  totalRegistrations: number;
  liveScores: Record<string, number>;
  activeEvent: string;
}

export function useAntigravityState() {
  const [data, setData] = useState<AntigravityState>({
    totalRegistrations: 1240,
    liveScores: {
      "Cricket Finals": 142,
      "Dance Off": 85,
    },
    activeEvent: "Opening Ceremony",
  });

  // Mocking an "Antigravity" WebSocket flow / real-time polling
  // This simulates data drifting in smoothly without hard page reloads
  useEffect(() => {
    const interval = setInterval(() => {
      setData((prev) => ({
        ...prev,
        totalRegistrations: prev.totalRegistrations + Math.floor(Math.random() * 3),
        liveScores: {
          ...prev.liveScores,
          "Cricket Finals": prev.liveScores["Cricket Finals"] + (Math.random() > 0.7 ? Math.floor(Math.random() * 6) : 0),
        },
      }));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return data;
}
