import { getBubbleWorkflowErrorMessage } from './bubbleWorkflowError';

interface BubbleWorkflowResponse {
  response: Response;
  rawText: string;
  parsed: unknown;
}

export async function postBubbleWorkflow<TBody>(
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
