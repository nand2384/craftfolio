import { links } from "../data/data";

/**
 * Resolves a linkKey to a usable URL and metadata.
 * Handles mailto: prefixing for email links.
 * Isolates TypeScript type assertions to a single utility.
 */
export function getResolvedLink(linkKey: string | null) {
  if (!linkKey) return { url: "", placeholder: "", icon: null };

  const linkData = (links as any)[linkKey];

  if (!linkData) {
    return {
      url: "#",
      placeholder: linkKey,
      icon: null
    };
  }

  let finalUrl = linkData.url;
  
  // Handle mailto: for email
  if (linkKey === "mail" && !finalUrl.startsWith("mailto:")) {
    finalUrl = `mailto:${finalUrl}`;
  }

  // Handle PDF resume if it's just a filename
  if (linkKey === "resume" && !finalUrl.startsWith("/") && !finalUrl.startsWith("http")) {
    finalUrl = `/${finalUrl}.pdf`;
  }

  return {
    url: finalUrl,
    placeholder: linkData.placeholder || "",
    icon: linkData.icon || null
  };
}

