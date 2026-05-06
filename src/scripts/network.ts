import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

function init() {
	const hero = document.querySelector<HTMLElement>("#hero");
	const network = document.querySelector<HTMLElement>("#network");
	const trainWrapper = document.querySelector<HTMLElement>(".train-wrapper");
	if (!hero || !network || !trainWrapper) return;

	const node = network.querySelector<HTMLElement>(".network__node");
	const choice = network.querySelector<HTMLElement>(".network__choice");
	const prompt = network.querySelector<HTMLElement>(".network__prompt");
	const destinos = network.querySelectorAll<HTMLElement>(".destino");
	if (!node || !choice || !prompt || destinos.length === 0) return;

	const mm = gsap.matchMedia();

	// El centrado horizontal del wrapper se gestiona con GSAP (no CSS) para
	// que las animaciones de y no sobrescriban el transform.
	gsap.set(trainWrapper, { xPercent: -50 });

	mm.add("(prefers-reduced-motion: no-preference)", () => {
		// El tren entra al viewport cuando A e I empiezan a separarse (~30% Hero)
		// y aterriza encima del nodo al final del Network. Easing power3.out
		// para frenado pronunciado al final, como un tren llegando a estación.
		gsap.fromTo(
			trainWrapper,
			{ y: -400, xPercent: -50 },
			{
				y: 0,
				xPercent: -50,
				ease: "power3.out",
				scrollTrigger: {
					trigger: hero,
					start: "30% top",
					endTrigger: network,
					end: "bottom bottom",
					scrub: 0.8,
					invalidateOnRefresh: true,
				},
			},
		);

		// Aparición del nodo + texto + botones (escalonados) anclado al Network.
		const tl = gsap.timeline({
			scrollTrigger: {
				trigger: network,
				start: "top top",
				end: "bottom bottom",
				scrub: 0.8,
				invalidateOnRefresh: true,
			},
		});

		tl
			// Nodo: pop con back.out
			.to(
				node,
				{
					autoAlpha: 1,
					scale: 1,
					ease: "back.out(1.8)",
					duration: 0.3,
				},
				0.55,
			)
			// "Próximo destino" entra antes que los botones
			.fromTo(
				prompt,
				{ y: 16 },
				{
					autoAlpha: 1,
					y: 0,
					ease: "power2.out",
					duration: 0.15,
				},
				0.78,
			)
			// Choice container hecho visible (flag)
			.set(choice, { autoAlpha: 1 }, 0.78)
			// Botones de destino entran escalonados
			.fromTo(
				destinos,
				{ y: 28, autoAlpha: 0 },
				{
					y: 0,
					autoAlpha: 1,
					ease: "power2.out",
					duration: 0.18,
					stagger: 0.06,
				},
				0.84,
			);
	});

	mm.add("(prefers-reduced-motion: reduce)", () => {
		gsap.set(trainWrapper, { y: 0, autoAlpha: 0 });
		gsap.set(node, { autoAlpha: 1, scale: 1 });
		gsap.set(choice, { autoAlpha: 1 });
		gsap.set(prompt, { autoAlpha: 1, y: 0 });
		gsap.set(destinos, { autoAlpha: 1, y: 0 });

		const observer = new IntersectionObserver(([entry]) => {
			gsap.set(trainWrapper, { autoAlpha: entry.isIntersecting ? 1 : 0 });
		});
		observer.observe(network);
	});
}

if (document.readyState === "loading") {
	document.addEventListener("DOMContentLoaded", init);
} else {
	init();
}
