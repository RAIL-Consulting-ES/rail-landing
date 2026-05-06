import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

function init() {
	const exp = document.querySelector<HTMLElement>("#expertise");
	if (!exp) return;

	const track = exp.querySelector<HTMLElement>(".exp__track");
	const stage = exp.querySelector<HTMLElement>(".exp__stage");
	const panels = exp.querySelectorAll<HTMLElement>(".panel");
	const blackout = exp.querySelector<HTMLElement>(".exp__blackout");
	if (!track || !stage || panels.length !== 3 || !blackout) return;

	const [pStrategy, pArchitecture, pExecution] = Array.from(panels);

	const mm = gsap.matchMedia();

	mm.add("(prefers-reduced-motion: no-preference)", () => {
		// Strategy enters from bottom (no zoom). Architecture & Execution still use scale.
		gsap.set(pStrategy, { opacity: 0, yPercent: 100, scale: 1 });
		gsap.set([pArchitecture, pExecution], { opacity: 0, scale: 0.05 });
		gsap.set(blackout, { opacity: 0 });

		const tl = gsap.timeline({
			scrollTrigger: {
				trigger: track,
				start: "top top",
				end: "bottom bottom",
				scrub: 0.6,
				invalidateOnRefresh: true,
			},
		});

		// --- Strategy: slide up from bottom ---
		tl.to(
			pStrategy,
			{ opacity: 1, yPercent: 0, ease: "power2.out", duration: 0.1 },
			0,
		);

		// Strategy graphic — rails draw + train traverse during idle window
		const railLines = pStrategy.querySelectorAll<SVGElement>(".rail-line");
		const train = pStrategy.querySelector<SVGElement>(".train");
		const ties = pStrategy.querySelectorAll<SVGElement>(".tie");
		gsap.set(ties, { opacity: 0 });
		tl.to(railLines, { strokeDashoffset: 0, ease: "none", duration: 0.12 }, 0.1);
		tl.to(
			ties,
			{ opacity: 0.6, ease: "none", duration: 0.1, stagger: 0.005 },
			0.12,
		);
		if (train) {
			tl.fromTo(
				train,
				{ x: 0 },
				{ x: -880, ease: "none", duration: 0.15 },
				0.1,
			);
		}

		// Strategy exit (zoom forward to dissolve)
		tl.to(
			pStrategy,
			{ scale: 18, opacity: 0, ease: "power2.in", duration: 0.1 },
			0.25,
		);

		// --- Architecture enter ---
		tl.fromTo(
			pArchitecture,
			{ opacity: 0, scale: 0.05 },
			{ opacity: 1, scale: 1, ease: "power2.out", duration: 0.1 },
			0.35,
		);

		// Architecture graphic
		const blocks = pArchitecture.querySelectorAll<SVGElement>(".block");
		const links = pArchitecture.querySelectorAll<SVGElement>(".links path");
		const pulses = pArchitecture.querySelectorAll<SVGCircleElement>(".pulse");

		tl.to(
			blocks,
			{
				opacity: 1,
				ease: "power2.out",
				duration: 0.06,
				stagger: 0.012,
			},
			0.45,
		);
		tl.to(links, { strokeDashoffset: 0, ease: "none", duration: 0.1 }, 0.5);

		// Pulses travel along their paths
		const linkPaths = [
			{ x1: 180, y1: 90, x2: 340, y2: 180 },
			{ x1: 180, y1: 270, x2: 340, y2: 180 },
			{ x1: 500, y1: 180, x2: 660, y2: 90 },
			{ x1: 500, y1: 180, x2: 660, y2: 180 },
			{ x1: 500, y1: 180, x2: 660, y2: 270 },
		];
		pulses.forEach((p, i) => {
			const c = linkPaths[i];
			const start = 0.55 + i * 0.012;
			tl.fromTo(
				p,
				{ attr: { cx: c.x1, cy: c.y1 }, opacity: 0 },
				{
					attr: { cx: c.x2, cy: c.y2 },
					opacity: 1,
					ease: "none",
					duration: 0.07,
				},
				start,
			);
			tl.to(p, { opacity: 0, duration: 0.02, ease: "none" }, start + 0.07);
		});

		// Architecture exit
		tl.to(
			pArchitecture,
			{ scale: 18, opacity: 0, ease: "power2.in", duration: 0.1 },
			0.6,
		);

		// --- Execution enter ---
		tl.fromTo(
			pExecution,
			{ opacity: 0, scale: 0.05 },
			{ opacity: 1, scale: 1, ease: "power2.out", duration: 0.1 },
			0.7,
		);

		// Execution graphic stages
		const blueprint = pExecution.querySelector<SVGElement>(".exec--blueprint");
		const mockup = pExecution.querySelector<SVGElement>(".exec--mockup");
		const rocket = pExecution.querySelector<SVGElement>(".exec--rocket");

		tl.to(blueprint, { opacity: 1, ease: "power1.out", duration: 0.04 }, 0.8);
		tl.to(blueprint, { opacity: 0, ease: "power1.in", duration: 0.04 }, 0.88);
		tl.to(mockup, { opacity: 1, ease: "power1.out", duration: 0.04 }, 0.86);
		tl.fromTo(
			rocket,
			{ opacity: 0, x: 0, y: 0, rotate: 0, scale: 0.6 },
			{ opacity: 1, scale: 0.95, ease: "power1.out", duration: 0.03 },
			0.9,
		);
		tl.to(
			rocket,
			{
				x: 240,
				y: -520,
				rotate: 18,
				ease: "power2.in",
				duration: 0.07,
			},
			0.93,
		);
		tl.to(mockup, { opacity: 0, ease: "power1.in", duration: 0.04 }, 0.94);
		tl.to(blackout, { opacity: 1, ease: "power2.in", duration: 0.04 }, 0.96);

		return () => {
			gsap.set([panels, blackout], { clearProps: "all" });
		};
	});

	mm.add("(prefers-reduced-motion: reduce)", () => {
		gsap.set([panels, blackout], { clearProps: "all" });
	});
}

if (document.readyState === "loading") {
	document.addEventListener("DOMContentLoaded", init);
} else {
	init();
}
