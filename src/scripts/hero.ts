import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { onHomeMount } from "./lifecycle";

gsap.registerPlugin(ScrollTrigger);

function init(): (() => void) | void {
	const hero = document.querySelector<HTMLElement>("#hero");
	if (!hero) return;

	const inner = hero.querySelector<HTMLElement>(".hero__inner");
	const letterR = hero.querySelector<HTMLElement>(".letter--r");
	const letterA = hero.querySelector<HTMLElement>(".letter--a");
	const letterI = hero.querySelector<HTMLElement>(".letter--i");
	const letterL = hero.querySelector<HTMLElement>(".letter--l");
	const sub1 = hero.querySelector<HTMLElement>(".sub--1");
	const sub2 = hero.querySelector<HTMLElement>(".sub--2");
	if (!inner || !letterR || !letterA || !letterI || !letterL || !sub1 || !sub2)
		return;

	const mm = gsap.matchMedia();

	mm.add("(prefers-reduced-motion: no-preference)", () => {
		// Distancia absoluta para que cada letra salga del viewport por su lado,
		// independientemente de su ancho o posición inicial dentro del flex.
		const exitLeft = (el: HTMLElement) => {
			const rect = el.getBoundingClientRect();
			return -(rect.right + 80);
		};
		const exitRight = (el: HTMLElement) => {
			const rect = el.getBoundingClientRect();
			return window.innerWidth - rect.left + 80;
		};

		const tl = gsap.timeline({
			scrollTrigger: {
				trigger: hero,
				start: "top top",
				end: "bottom bottom",
				scrub: 0.6,
				invalidateOnRefresh: true,
			},
		});

		// Phase 1 (0 → 0.5): R sale izq, L sale der; subtítulo cambia
		tl.to(
			letterR,
			{ x: () => exitLeft(letterR), autoAlpha: 0, ease: "power2.in" },
			0,
		)
			.to(
				letterL,
				{ x: () => exitRight(letterL), autoAlpha: 0, ease: "power2.in" },
				0,
			)
			.to(sub1, { autoAlpha: 0, ease: "power1.out" }, 0.05)
			.to(sub2, { autoAlpha: 1, ease: "power1.in" }, 0.2);

		// Phase 2 (0.5 → 0.85): A, I salen; sub2 fade
		tl.to(
			letterA,
			{ x: () => exitLeft(letterA), autoAlpha: 0, ease: "power2.in" },
			0.5,
		)
			.to(
				letterI,
				{ x: () => exitRight(letterI), autoAlpha: 0, ease: "power2.in" },
				0.5,
			)
			.to(sub2, { autoAlpha: 0, ease: "power1.out" }, 0.55);
	});

	mm.add("(prefers-reduced-motion: reduce)", () => {
		gsap.set([letterR, letterA, letterI, letterL], { clearProps: "all" });
		gsap.set(sub2, { autoAlpha: 0 });
	});

	return () => mm.revert();
}

onHomeMount(() => init());
