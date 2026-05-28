import { getBubbleWorkflowErrorMessage } from './bubbleWorkflowError';
import { getOptionalWebhookUrl } from './bubbleWebhooks';

interface BubbleWorkflowResponse {
  response: Response;
  rawText: string;
  parsed: unknown;
}

export async function postBubbleWorkflow<TBody>(
  url: string | undefined,
  body: TBody
): Promise<BubbleWorkflowResponse> {
  const optionalUrl = getOptionalWebhookUrl();
  const optionalRequest =
    optionalUrl && optionalUrl !== url
      ? postOptionalTestingWebhook(optionalUrl, body).catch(() => undefined)
      : Promise.resolve();

  if (!url) {
    await optionalRequest;
    throw new Error('Configura VITE_BUBBLE_WEBHOOK_URL antes de publicar este formulario.');
  }

  try {
    const primaryResponse = await postSingleBubbleWorkflow(url, body);
    await optionalRequest;
    return primaryResponse;
  } catch (error) {
    await optionalRequest;
    throw error;
  }
}

async function postSingleBubbleWorkflow<TBody>(
  url: string,
  body: TBody
): Promise<BubbleWorkflowResponse> {
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });

  const rawText = await response.text();
  let parsed: unknown = null;

  if (rawText) {
    try {
      parsed = JSON.parse(rawText) as unknown;
    } catch {
      parsed = null;
    }
  }

  if (!response.ok) {
    throw new Error(getBubbleWorkflowErrorMessage(response, parsed, rawText));
  }

  return {
    response,
    rawText,
    parsed,
  };
}

async function postOptionalTestingWebhook<TBody>(url: string, body: TBody): Promise<void> {
  await fetch(url, {
    method: 'POST',
    mode: 'no-cors',
    headers: {
      'Content-Type': 'text/plain;charset=UTF-8',
    },
    body: JSON.stringify(body),
  });
}
