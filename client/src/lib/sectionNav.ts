/**
 * Single navigation strategy for the site: real routes for pages
 * ("/", "/about", "/sustainable-supply") and "/#id" hashes for Home sections.
 * The URL and the scroll position always describe the same place.
 */

/** Scroll to the element named by `hash` (or the top when empty). The sticky
 *  header offset comes from `scroll-margin-top` in CSS. */
// True while a smooth scroll we started is still travelling. The URL already
// names its destination, so the scroll-spy must not rewrite it with the
// sections it passes on the way (which also flickers the URL / breaks Back).
let programmaticScroll = false;
let programmaticTimer = 0;
function markProgrammatic() {
  programmaticScroll = true;
  window.clearTimeout(programmaticTimer);
  const done = () => {
    programmaticScroll = false;
    window.clearTimeout(programmaticTimer);
    window.removeEventListener("scrollend", done);
  };
  window.addEventListener("scrollend", done, { once: true });
  programmaticTimer = window.setTimeout(done, 1500); // browsers without `scrollend`
}

export function scrollToHash(hash: string, behavior: ScrollBehavior = "smooth") {
  if (behavior === "smooth") markProgrammatic();
  const id = hash.replace(/^#/, "");
  if (!id) {
    window.scrollTo({ top: 0, behavior });
    return true;
  }
  const el = document.getElementById(id);
  if (!el) return false;
  el.scrollIntoView({ behavior, block: "start" });
  return true;
}

/** Same-page navigation: push a history entry (so back/forward works) and
 *  scroll. Skips the push when the URL already matches. Home ("") jumps
 *  instantly: a smooth scroll back from deep in the page takes over a second
 *  and restarts on every repeated click. Section links keep smooth scrolling. */
export function goToHomeSection(id: string) {
  const url = id ? `/#${id}` : "/";
  if (window.location.pathname + window.location.hash !== url) {
    window.history.pushState(null, "", url);
  }
  scrollToHash(id, id ? "smooth" : "instant");
}

/** Scroll-spy URL sync: replace (never push) so scrolling doesn't flood history. */
export function replaceHomeHash(id: string) {
  if (programmaticScroll) return;
  const url = id ? `/#${id}` : "/";
  if (window.location.pathname === "/" && window.location.pathname + window.location.hash !== url) {
    window.history.replaceState(window.history.state, "", url);
  }
}
