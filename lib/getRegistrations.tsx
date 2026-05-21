export async function getRegistrations() {
  const url = process.env.NEXT_PUBLIC_GOOGLE_SCRIPT_URL;

  if (!url) {
    throw new Error("Google Script URL missing");
  }

  const res = await fetch(url!, {
    next: { revalidate: 10 },
  });

  const result = await res.json();
  return result.data || [];
}