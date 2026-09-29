"use client";
import { useEffect } from "react";

// Russian typesetting rule: short prepositions/conjunctions and numbers must not hang at the end of a line.
const SHORT = /(^|[\s(«"])(в|во|и|с|со|к|ко|о|об|у|а|на|по|за|до|от|не|ни|из|для|без|при|про|что|как|или|но|—|\d+)\s+/gi;

function fix(text: string) {
  // Repeat until stable so chains like «за 3 простых» bind fully (a single pass consumes the separator).
  let prev: string;
  let out = text;
  do {
    prev = out;
    out = out.replace(SHORT, (_m, pre: string, word: string) => pre + word + " ");
  } while (out !== prev);
  return out;
}

function walk(root: Node) {
  const tw = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
    acceptNode: (n) => {
      const p = n.parentElement;
      if (!p || p.closest("script,style,textarea,input,[data-no-typo]")) return NodeFilter.FILTER_REJECT;
      return n.nodeValue && /\s/.test(n.nodeValue) ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_SKIP;
    },
  });
  let n: Node | null;
  while ((n = tw.nextNode())) {
    const v = n.nodeValue as string;
    const next = fix(v);
    if (next !== v) n.nodeValue = next;
  }
}

/** Applies non-breaking spaces site-wide, including content that React renders later (modals, tabs). */
export function useRussianTypography() {
  useEffect(() => {
    // Run the initial pass when the browser is idle so it never extends the hydration task
    const ric: (cb: () => void) => number =
      (window as unknown as { requestIdleCallback?: (cb: () => void, o?: { timeout: number }) => number }).requestIdleCallback
        ? (cb) => (window as unknown as { requestIdleCallback: (cb: () => void, o?: { timeout: number }) => number }).requestIdleCallback(cb, { timeout: 1500 })
        : (cb) => window.setTimeout(cb, 200);
    ric(() => walk(document.body));
    let queued = false;
    const pending = new Set<Node>();
    const mo = new MutationObserver((records) => {
      for (const r of records) {
        if (r.type === "characterData") pending.add(r.target);
        r.addedNodes.forEach((n) => pending.add(n));
      }
      if (queued) return;
      queued = true;
      requestAnimationFrame(() => {
        queued = false;
        const nodes = Array.from(pending);
        pending.clear();
        for (const n of nodes) {
          if (!n.isConnected) continue;
          if (n.nodeType === Node.TEXT_NODE) {
            const v = n.nodeValue || "";
            const next = fix(v);
            if (next !== v) n.nodeValue = next; // idempotent → no infinite loop
          } else walk(n);
        }
      });
    });
    mo.observe(document.body, { subtree: true, childList: true, characterData: true });
    return () => mo.disconnect();
  }, []);
}
