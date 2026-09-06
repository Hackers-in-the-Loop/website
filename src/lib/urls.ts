export function discordInvite(value: string | undefined): string | null {
  if (!value?.trim()) return null;
  try {
    const url = new URL(value.trim());
    if (url.protocol !== "https:" || url.username || url.password || url.port)
      return null;
    const code =
      url.hostname === "discord.gg"
        ? url.pathname.match(/^\/([\w-]+)\/?$/)?.[1]
        : ["discord.com", "www.discord.com", "discordapp.com"].includes(
              url.hostname,
            )
          ? url.pathname.match(/^\/invite\/([\w-]+)\/?$/)?.[1]
          : undefined;
    if (!code || /^(replace-me|your-invite|invite-code|example)$/i.test(code))
      return null;
    return `https://discord.gg/${code}`;
  } catch {
    return null;
  }
}

export function siteOrigin(value: string | undefined): URL {
  const fallback = new URL("http://localhost:9854");
  if (!value?.trim()) return fallback;
  try {
    const url = new URL(value.trim());
    if (
      !["https:", "http:"].includes(url.protocol) ||
      url.username ||
      url.password ||
      /(^|\.)example\.(com|org|net)$/i.test(url.hostname)
    )
      return fallback;
    return new URL(url.origin);
  } catch {
    return fallback;
  }
}
