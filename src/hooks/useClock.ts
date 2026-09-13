import { useEffect, useState } from "react";

/** Ticking clock. Keep it in the leaf components so a second tick doesn't re-render the shell. */
export function useClock(intervalMs = 1000): Date {
  const [now, setNow] = useState(() => new Date());

  useEffect(() => {
    const id = window.setInterval(() => setNow(new Date()), intervalMs);
    return () => window.clearInterval(id);
  }, [intervalMs]);

  return now;
}
