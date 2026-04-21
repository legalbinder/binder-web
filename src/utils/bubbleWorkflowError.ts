/**
 * Bubble workflow API (POST .../wf/{name}) often returns JSON like:
 * { statusCode: 404, body: { message: "..." } } when the URL or mode is wrong.
 * The frontend should read `body.message`, not only `error`.
 */
export function getBubbleWorkflowErrorMessage(
  res: Response,
  parsed: unknown,
  rawBody?: string
): string {
  const fromParsed = extractMessageFromParsed(parsed);
  if (fromParsed) return fromParsed;

  const statusText = res.statusText?.trim();
  if (statusText) return `Error ${res.status}: ${statusText}`;

  const snippet = rawBody?.trim().replace(/\s+/g, ' ').slice(0, 280);
  if (snippet) return `Error ${res.status}: ${snippet}`;

  return `Error ${res.status} (sin texto de estado ni cuerpo útil; revisa consola).`;
}

function extractMessageFromParsed(parsed: unknown): string | null {
  if (!parsed || typeof parsed !== 'object') return null;

  const objectValue = parsed as Record<string, unknown>;

  if (typeof objectValue.error === 'string' && objectValue.error.trim()) {
    return objectValue.error;
  }

  if (typeof objectValue.message === 'string' && objectValue.message.trim()) {
    if (objectValue.status === 'SUCCESS') {
      return null;
    }

    return objectValue.message;
  }

  const body = objectValue.body;
  if (body && typeof body === 'object') {
    const bodyObject = body as Record<string, unknown>;
    if (typeof bodyObject.message === 'string' && bodyObject.message.trim()) {
      return bodyObject.message;
    }
  }

  return null;
}
