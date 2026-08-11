function normalizedOrigins(raw: string | undefined): Set<string> {
  return new Set(
    (raw ?? "")
      .split(",")
      .map((origin) => origin.trim().replace(/\/$/, ""))
      .filter(Boolean),
  );
}

/**
 * Allows only explicit deployment origins and the paired Metro preview host that
 * shares this sandbox identifier. Credentials must never be reflected to an
 * arbitrary Origin header.
 */
export function isAllowedWebOrigin(
  origin: string | undefined,
  apiHost: string | undefined,
  configuredOrigins = process.env.ALLOWED_ORIGINS,
): boolean {
  if (!origin) return false;

  const normalizedOrigin = origin.replace(/\/$/, "");
  if (normalizedOrigins(configuredOrigins).has(normalizedOrigin)) return true;

  try {
    const originUrl = new URL(normalizedOrigin);
    const normalizedApiHost = (apiHost ?? "").replace(/:\d+$/, "");

    if (!normalizedApiHost) return false;

    // Manus preview maps Metro from 8081-* to its paired API host at 3000-*.
    const pairedPreviewHost = normalizedApiHost.replace(/^3000-/, "8081-");
    return originUrl.host === pairedPreviewHost;
  } catch {
    return false;
  }
}
