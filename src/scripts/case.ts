const CHAR_DELAY_MS = 18;

function reduced() {
	return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function startTypewriter(el: HTMLElement) {
	if (el.dataset.typed === "running" || el.dataset.typed === "done") return;
	const text = el.dataset.text || el.textContent || "";
	el.dataset.typed = "running";

	if (reduced() || !text) {
		el.textContent = text;
		el.dataset.typed = "done";
		return;
	}

	el.textContent = "";

	const caret = document.createElement("span");
	caret.className = "case__caret";
	caret.textContent = "▍";
	el.appendChild(caret);

	let i = 0;
	let last = performance.now();

	function step(now: number) {
		const elapsed = now - last;
		const advance = Math.max(1, Math.floor(elapsed / CHAR_DELAY_MS));
		if (advance > 0) {
			const slice = text.slice(i, i + advance);
			caret.before(document.createTextNode(slice));
			i += advance;
			last = now;
		}
		if (i < text.length) {
			requestAnimationFrame(step);
		} else {
			caret.remove();
			el.dataset.typed = "done";
		}
	}
	requestAnimationFrame(step);
}

function findAndStart() {
	const el = document.querySelector<HTMLElement>("[data-case-body]");
	if (el) startTypewriter(el);
}

window.addEventListener("case:typewriter", () => {
	findAndStart();
});

if (document.readyState !== "loading") {
	findAndStart();
} else {
	document.addEventListener("DOMContentLoaded", findAndStart);
}
