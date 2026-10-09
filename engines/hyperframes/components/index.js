// Motion Primitives for HyperFrames

export function FadeIn(sceneId, selector, durationSec, startSec) {
  return {
    gsap: `tl.fromTo("${selector}", { opacity: 0 }, { opacity: 1, duration: ${durationSec}, ease: "power2.out" }, ${startSec});`
  };
}

export function Flow(sceneId, selector, durationSec, startSec) {
  return {
    gsap: `tl.fromTo("${selector}", { y: 50, opacity: 0 }, { y: 0, opacity: 1, duration: ${durationSec}, ease: "power2.out" }, ${startSec});`
  };
}

export function Interrupt(sceneId, selector, durationSec, startSec) {
  // A sudden shake to interrupt
  return {
    gsap: `tl.to("${selector}", { x: -20, duration: 0.1, ease: "none" }, ${startSec})
             .to("${selector}", { x: 20, duration: 0.1, ease: "none" }, ${startSec + 0.1})
             .to("${selector}", { x: -10, duration: 0.1, ease: "none" }, ${startSec + 0.2})
             .to("${selector}", { x: 0, duration: 0.1, ease: "none" }, ${startSec + 0.3});`
  };
}

export function ProgressiveBuild(sceneId, selector, durationSec, startSec) {
  return {
    gsap: `tl.fromTo("${selector}", { scale: 0, opacity: 0 }, { scale: 1, opacity: 1, duration: ${durationSec}, stagger: 0.2, ease: "back.out(1.2)" }, ${startSec});`
  };
}

export function Drain(sceneId, selector, durationSec, startSec) {
  return {
    gsap: `tl.to("${selector}", { scale: 0.9, opacity: 0.5, duration: ${durationSec}, ease: "power2.inOut" }, ${startSec});`
  };
}

// Text Layout Primitive
export function TextLayout(texts, layout) {
  let html = `<div class="layout-${layout || 'centered'}">`;
  texts.forEach((t, index) => {
    const content = typeof t === "string" ? t : t.content;
    const isTitle = typeof t === "object" && t.role === "title";
    const cssClass = isTitle ? "text-block text-title" : "text-block";
    html += `<div class="${cssClass} text-item">${content}</div>`;
  });
  html += `</div>`;
  return html;
}
