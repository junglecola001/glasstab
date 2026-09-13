import { useClock } from "@/hooks/useClock";
import { formatLongDate, getGreeting } from "@/lib/time";

export function Greeting() {
  // a new tab rarely lives longer than a minute; 30s keeps the hour boundary honest
  const now = useClock(30_000);

  return (
    <div className="flex flex-col items-center gap-1.5 text-center">
      <h1 className="font-display text-[clamp(1.9rem,4.4vw,3.1rem)] font-semibold leading-tight tracking-[-0.025em]">
        {getGreeting(now)}.
      </h1>
      <p className="text-[13px] font-medium text-[hsl(var(--muted-foreground))]">
        {formatLongDate(now)}
      </p>
    </div>
  );
}
