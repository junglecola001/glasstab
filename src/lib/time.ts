const longDate = new Intl.DateTimeFormat("en-US", {
  weekday: "long",
  month: "long",
  day: "numeric",
});

const shortDate = new Intl.DateTimeFormat("en-US", {
  weekday: "short",
  month: "short",
  day: "numeric",
});

export function formatClock(date: Date, use24Hour: boolean, showSeconds = false): string {
  const options: Intl.DateTimeFormatOptions = showSeconds
    ? { hour: "2-digit", minute: "2-digit", second: "2-digit" }
    : { hour: "2-digit", minute: "2-digit" };

  if (use24Hour) {
    options.hourCycle = "h23";
  } else {
    options.hour12 = true;
    options.hour = showSeconds ? "2-digit" : "numeric";
  }

  return new Intl.DateTimeFormat("en-US", options).format(date);
}

export function formatLongDate(date: Date): string {
  return longDate.format(date);
}

export function formatShortDate(date: Date): string {
  return shortDate.format(date);
}

export function getGreeting(date: Date): string {
  const hour = date.getHours();
  if (hour < 12) return "Good morning";
  if (hour < 18) return "Good afternoon";
  return "Good evening";
}

export function isDaytime(date: Date): boolean {
  const hour = date.getHours();
  return hour >= 6 && hour < 18;
}
