/**
 * Bubble workflow POST URLs should target .../wf/{name}.
 * If a copied URL ends in /initialize, remove it before submit.
 */
export function normalizeBubbleWorkflowPostUrl(url: string): string {
  return url.trim().replace(/\/initialize\/?$/i, '');
}
