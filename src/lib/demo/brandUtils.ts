/* ──────────────────────────────────────────────
   Brand color utilities — HSL manipulation
   ────────────────────────────────────────────── */

/** Convert hex (#RRGGBB or #RGB) to { h, s, l } where h is 0-360, s/l are 0-100. */
export function hexToHsl(hex: string): { h: number; s: number; l: number } {
  let r = 0, g = 0, b = 0;
  const clean = hex.replace("#", "");

  if (clean.length === 3) {
    r = parseInt(clean[0] + clean[0], 16) / 255;
    g = parseInt(clean[1] + clean[1], 16) / 255;
    b = parseInt(clean[2] + clean[2], 16) / 255;
  } else {
    r = parseInt(clean.substring(0, 2), 16) / 255;
    g = parseInt(clean.substring(2, 4), 16) / 255;
    b = parseInt(clean.substring(4, 6), 16) / 255;
  }

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const l = (max + min) / 2;
  let h = 0, s = 0;

  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r: h = ((g - b) / d + (g < b ? 6 : 0)) / 6; break;
      case g: h = ((b - r) / d + 2) / 6; break;
      case b: h = ((r - g) / d + 4) / 6; break;
    }
  }

  return {
    h: Math.round(h * 360),
    s: Math.round(s * 100),
    l: Math.round(l * 100),
  };
}

/** Convert HSL back to hex string. */
export function hslToHex(h: number, s: number, l: number): string {
  const sNorm = s / 100;
  const lNorm = l / 100;

  const c = (1 - Math.abs(2 * lNorm - 1)) * sNorm;
  const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
  const m = lNorm - c / 2;

  let r = 0, g = 0, b = 0;
  if (h < 60)      { r = c; g = x; b = 0; }
  else if (h < 120) { r = x; g = c; b = 0; }
  else if (h < 180) { r = 0; g = c; b = x; }
  else if (h < 240) { r = 0; g = x; b = c; }
  else if (h < 300) { r = x; g = 0; b = c; }
  else              { r = c; g = 0; b = x; }

  const toHex = (v: number) => {
    const hex = Math.round((v + m) * 255).toString(16);
    return hex.length === 1 ? "0" + hex : hex;
  };

  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}

/** Lighten a hex color by a percentage (0-100). */
export function lightenColor(hex: string, amount: number): string {
  const { h, s, l } = hexToHsl(hex);
  return hslToHex(h, s, Math.min(100, l + amount));
}

/** Darken a hex color by a percentage (0-100). */
export function darkenColor(hex: string, amount: number): string {
  const { h, s, l } = hexToHsl(hex);
  return hslToHex(h, s, Math.max(0, l - amount));
}

/**
 * Ensure a color has enough contrast against a dark background.
 * If the color is too dark (lightness < minLightness), lighten it.
 */
export function ensureContrast(hex: string, minLightness = 40): string {
  const { h, s, l } = hexToHsl(hex);
  if (l < minLightness) {
    return hslToHex(h, Math.min(s + 10, 100), minLightness);
  }
  return hex;
}

/**
 * Given a single primary color, generate a harmonious set of accent variants.
 */
export function generateColorSet(primary: string) {
  const safe = ensureContrast(primary, 35);
  return {
    primaryColor: safe,
    secondaryColor: lightenColor(safe, 15),
    accentColor: darkenColor(safe, 12),
  };
}
