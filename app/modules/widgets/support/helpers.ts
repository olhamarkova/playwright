// Returns date in format: 01/01/2026
export function getCurrentDateNumeric(): string {
  const now = new Date();

  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  const year = now.getFullYear();

  return `${month}/${day}/${year}`;
}

// Returns date & time in format: January 1, 2026 6:44 PM
export function getCurrentDateLong(): string {
  const now = new Date();

  const datePart = now.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  const timePart = now.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });

  return `${datePart} ${timePart}`;
}
