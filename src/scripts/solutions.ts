import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { onHomeMount } from "./lifecycle";

gsap.registerPlugin(ScrollTrigger);

function init(): (() => void) | void {
	const sol = document.querySelector<HTMLElement>("#solutions");
	if (!sol) return;

	const track = sol.querySelector<HTMLElement>(".sol__track");
	const stage = sol.querySelector<HTMLElement>(".sol__stage");
	const cord = sol.querySelector<HTMLElement>(".bulb__cord");
	const sway = sol.querySelector<HTMLElement>(".bulb__sway");
	const halo = sol.querySelector<HTMLElement>(".bulb__halo");
	const bulbOn = sol.querySelector<HTMLElement>(".bulb__img--on");
	const title = sol.querySelector<HTMLElement>(".sol__title");
	const cards = sol.querySelectorAll<HTMLElement>(".card");
	const cta = sol.querySelector<HTMLElement>(".cta-primary");

	if (
		!track ||
		!stage ||
		!cord ||
		!sway ||
		!halo ||
		!bulbOn ||
		!title ||
		!cta
	)
		return;

	const mm = gsap.matchMedia();

	mm.add("(prefers-reduced-motion: no-preference)", () => {
		// Initial state — pitch black, lights off, bulb above viewport
		gsap.set(cord, { scaleY: 0, transformOrigin: "top center" });
		gsap.set(sway, {
			rotate: 0,
			y: -260,
			transformOrigin: "top center",
		});
		gsap.set(halo, { opacity: 0, scale: 0.4 });
		gsap.set(bulbOn, { opacity: 0 });
		gsap.set(title, {
			opacity: 0,
			clipPath: "circle(0% at 50% -10%)",
			color: "#ffffff",
		});
		gsap.set(stage, { backgroundColor: "#000000", color: "#ffffff" });

		// Compute fan-out target X/Y for each card based on its width.
		// Cards stack centred (x = -50% via CSS transform) and animate to their target.
		const gap = 16;
		const widths = Array.from(cards).map((c) => c.offsetWidth);
		const targetsX: number[] = new Array(cards.length);
		const targetsY: number[] = new Array(cards.length);

		let rightCursor = 0;
		let leftCursor = 0;
		let rightSlot = 0;
		let leftSlot = 0;

		widths.forEach((w, i) => {
			if (i % 2 === 0) {
				rightCursor += w / 2 + (rightSlot === 0 ? gap / 2 : gap);
				targetsX[i] = rightCursor;
				rightCursor += w / 2;
				targetsY[i] = (rightSlot % 2 === 0 ? -1 : 1) * 18;
				rightSlot++;
			} else {
				leftCursor += w / 2 + (leftSlot === 0 ? gap / 2 : gap);
				targetsX[i] = -leftCursor;
				leftCursor += w / 2;
				targetsY[i] = (leftSlot % 2 === 0 ? 1 : -1) * 18;
				leftSlot++;
			}
		});

		cards.forEach((card, i) => {
			const tilt = (i % 2 === 0 ? 1 : -1) * 4;
			gsap.set(card, {
				xPercent: -50,
				yPercent: -50,
				x: 0,
				y: (i % 2 === 0 ? -1 : 1) * 8,
				rotate: tilt,
				opacity: 0,
				scale: 0.9,
				zIndex: i + 1,
			});
		});

		gsap.set(cta, { opacity: 0, y: 24 });

		// Idle sway (independent loop)
		const swayTween = gsap.to(sway, {
			rotate: 1.4,
			duration: 2.6,
			ease: "sine.inOut",
			yoyo: true,
			repeat: -1,
			transformOrigin: "top center",
		});

		const tl = gsap.timeline({
			scrollTrigger: {
				trigger: track,
				start: "top top",
				// End animation 100vh before track ends; sticky keeps the stage pinned
				// during that window so Solutions stays visible (frozen at final frame).
				end: () => `bottom-=${window.innerHeight} bottom`,
				scrub: 0.6,
				invalidateOnRefresh: true,
			},
		});

		// 1) Bulb falls from above the viewport with bouncy physics.
		//    Arranca pronto (0.06) para minimizar el scroll en negro entre
		//    el final de Execution y el inicio de Solutions, y cae rápido.
		tl.to(
			cord,
			{ scaleY: 1, ease: "power3.out", duration: 0.08 },
			0.06,
		);
		tl.to(
			sway,
			{ y: 0, ease: "power3.out", duration: 0.08 },
			0.06,
		);

		// 2) Light turns on — flicker then steady (rápido)
		tl.to(halo, { opacity: 0.4, scale: 0.85, duration: 0.008 }, 0.18);
		tl.to(halo, { opacity: 0.1, duration: 0.008 }, 0.19);
		tl.to(halo, { opacity: 0.6, duration: 0.008 }, 0.20);
		tl.to(halo, { opacity: 0.15, duration: 0.008 }, 0.21);
		tl.to(
			halo,
			{ opacity: 1, scale: 1.4, ease: "power2.out", duration: 0.04 },
			0.22,
		);
		// Bulb image swap: flicker off → on synced with halo
		tl.to(bulbOn, { opacity: 0.6, duration: 0.008 }, 0.18);
		tl.to(bulbOn, { opacity: 0.1, duration: 0.008 }, 0.19);
		tl.to(bulbOn, { opacity: 0.7, duration: 0.008 }, 0.20);
		tl.to(bulbOn, { opacity: 0.2, duration: 0.008 }, 0.21);
		tl.to(bulbOn, { opacity: 1, ease: "power2.out", duration: 0.03 }, 0.22);

		// 3) Stage transitions from black to surface
		tl.to(
			stage,
			{
				backgroundColor: "#f9f9f9",
				color: "#1b1b1b",
				ease: "power2.out",
				duration: 0.08,
			},
			0.26,
		);

		// 4) Title reveals as the light bursts
		tl.to(
			title,
			{
				opacity: 1,
				clipPath: "circle(160% at 50% -10%)",
				color: "#1b1b1b",
				ease: "power2.out",
				duration: 0.12,
			},
			0.26,
		);

		// 5) Cards appear, revealed by the light
		tl.to(
			cards,
			{ opacity: 1, scale: 1, ease: "power2.out", duration: 0.05 },
			0.28,
		);

		// 6) Cards fan out horizontally
		cards.forEach((card, i) => {
			tl.to(
				card,
				{
					x: targetsX[i],
					y: targetsY[i],
					rotate: 0,
					ease: "power2.out",
					duration: 0.12,
				},
				0.36 + (cards.length - 1 - i) * 0.01,
			);
		});

		// 7) CTA appears
		tl.to(
			cta,
			{ opacity: 1, y: 0, ease: "power2.out", duration: 0.06 },
			0.52,
		);

		return () => {
			swayTween.kill();
			gsap.set(
				[cord, sway, halo, bulbOn, title, stage, cta, cards],
				{ clearProps: "all" },
			);
		};
	});

	mm.add("(prefers-reduced-motion: reduce)", () => {
		// Static, fully revealed
		stage.style.backgroundColor = "var(--surface)";
		stage.style.color = "var(--on-surface)";
	});

	return () => mm.revert();
}

onHomeMount(() => init());
