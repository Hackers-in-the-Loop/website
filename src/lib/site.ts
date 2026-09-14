import { discordInvite } from "@/lib/urls";

export const siteConfig = {
  name: "Hackers in the Loop",
  shortName: "HACK",
  url: "https://hackers-in-the-loop.shadowcodex.chatgpt.site",
  description:
    "A community for people building with technology, learning about it, or finding their footing in tech.",
  labRequestUrl: "https://forms.gle/XebgbcZQ993fEQbi7",
  buildThreadUrl: "https://xcancel.com/iamMrDuncan/status/2096739567537652149#m",
  linkedinUrl: "https://linkedin.com/in/jsduncan98",
  xUrl: "https://x.com/iammrduncan",
  githubUrl: "https://github.com/Hackers-in-the-Loop",
  discordUrl: discordInvite("https://discord.gg/3Qs2uejUf9"),
} as const;
