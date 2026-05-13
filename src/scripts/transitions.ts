import barba from "@barba/core";
import gsap from "gsap";

type Flyover = {
	overlay: HTMLElement;
	img: HTMLImageElement;
	slug: string;
	originRect: { left: number; top: number; width: number; height: number };
};

function getFlyover(): Flyover | null {
	const f = (window as any).__caseFlyover as Flyover | undefined;
	return f && document.body.contains(f.overlay) ? f : null;
}

function clearFlyover() {
	const f = (window as any).__caseFlyover as Flyover | undefined;
	if (f && f.overlay.parentNode) f.overlay.remove();
	(window as any).__caseFlyover = null;
}

function splitTitleIntoSpans(el: HTMLElement) {
	const text = el.textContent || "";
	el.textContent = "";
	const spans: HTMLElement[] = [];
	for (const ch of text) {
		const span = document.createElement("span");
		span.textContent = ch === " " ? " " : ch;
		span.style.display = "inline-block";
		span.style.willChange = "transform, opacity";
		el.appendChild(span);
		spans.push(span);
	}
	return spans;
}

function triggerTypewriter(el: HTMLElement | null) {
	if (!el) return;
	window.dispatchEvent(new CustomEvent("case:typewriter", { detail: { target: el } }));
}

barba.init({
	transitions: [
		{
			name: "home-to-case",
			from: { namespace: "home" },
			to: { namespace: "case" },
			leave({ current }) {
				const fly = getFlyover();
				const tl = gsap.timeline();

				tl.to(
					current.container,
					{ opacity: 0, duration: 0.35, ease: "power2.in" },
					0,
				);

				if (!fly) return tl;

				tl.to(
					fly.overlay,
					{
						left: 0,
						top: 0,
						width: window.innerWidth,
						height: window.innerHeight,
						duration: 0.85,
						ease: "power3.inOut",
					},
					0,
				);
				tl.to(
					fly.img,
					{
						filter: "brightness(0.55) blur(2px)",
						duration: 0.85,
						ease: "power3.inOut",
					},
					0,
				);

				return tl;
			},
			enter({ next }) {
				const fly = getFlyover();
				const heroBg = next.container.querySelector<HTMLElement>("[data-case-hero-bg]");
				const titleReal = next.container.querySelector<HTMLElement>("[data-case-title]");
				const body = next.container.querySelector<HTMLElement>("[data-case-body]");

				gsap.set(next.container, { opacity: 1 });

				const tl = gsap.timeline({
					onComplete: () => clearFlyover(),
				});

				// Hero background fades in behind the overlay (which is also fullscreen now).
				if (heroBg) {
					gsap.set(heroBg, { opacity: 0 });
					tl.to(heroBg, { opacity: 1, duration: 0.4, ease: "power1.out" }, 0);
				}

				// Title letter-stagger entrance.
				if (titleReal) {
					const spans = splitTitleIntoSpans(titleReal);
					gsap.set(spans, { y: 40, opacity: 0 });
					tl.to(
						spans,
						{
							y: 0,
							opacity: 1,
							duration: 0.6,
							ease: "power3.out",
							stagger: 0.04,
						},
						0.1,
					);
				}

				// Cross-fade overlay out as the real hero shows.
				if (fly) {
					tl.to(fly.overlay, { opacity: 0, duration: 0.35, ease: "power1.out" }, 0.25);
				}

				// Kick the typewriter once the title is mostly in.
				tl.add(() => triggerTypewriter(body), 0.4);

				return tl;
			},
		},
		{
			name: "fade",
			leave({ current }) {
				return gsap.to(current.container, { opacity: 0, duration: 0.4 });
			},
			enter({ next }) {
				return gsap.from(next.container, { opacity: 0, duration: 0.4 });
			},
		},
	],
});

barba.hooks.beforeLeave(({ current }) => {
	if (current?.namespace === "home") {
		window.dispatchEvent(new Event("home:unmount"));
	}
});

barba.hooks.afterEnter(({ next }) => {
	if (next.namespace === "home") {
		// Defer one frame so the new container is fully in the DOM before init runs.
		requestAnimationFrame(() => {
			window.dispatchEvent(new Event("home:mount"));
		});
	}
	if (next.namespace === "case") {
		const body = next.container.querySelector<HTMLElement>("[data-case-body]");
		if (body && !body.dataset.typed) triggerTypewriter(body);
	}
});
