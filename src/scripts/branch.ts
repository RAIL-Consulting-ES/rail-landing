import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type BranchId = "servicios" | "sobre" | "contacto";

function init() {
	const services = document.querySelector<HTMLElement>("#services");
	const network = document.querySelector<HTMLElement>("#network");
	const trainSvg = document.querySelector<SVGElement>(".train");
	const trainWrapper = document.querySelector<HTMLElement>(".train-wrapper");
	if (!services || !network) return;

	const servicesTrain = services.querySelector<SVGElement>(".services__train");
	const detail = services.querySelector<HTMLElement>(".services__detail");

	let isInBranch = false;
	let scrollLockUntil = 0;

	function openBranch(id: BranchId) {
		if (id !== "servicios") {
			console.log(`[branch] (placeholder) ramal "${id}" aún sin construir`);
			return;
		}

		isInBranch = true;
		scrollLockUntil = Date.now() + 1500;

		// El tren del nodo: mientras el scroll va al ramal, el tren rota
		// hacia la izquierda (donde está la primera estación de Servicios)
		// y se desvanece. La wrapper sigue su `y` por scrollTrigger; el SVG
		// dentro maneja la transición independiente.
		if (trainSvg) {
			gsap.to(trainSvg, {
				rotation: -90,
				x: () => -window.innerWidth * 0.4,
				y: 80,
				autoAlpha: 0,
				duration: 0.7,
				ease: "power2.in",
			});
		}

		services!.removeAttribute("hidden");
		gsap.set(services, { autoAlpha: 0 });
		// Tren del ramal oculto inicialmente; aparece tras la transición
		if (servicesTrain) gsap.set(servicesTrain, { autoAlpha: 0 });

		requestAnimationFrame(() => {
			ScrollTrigger.refresh();
			window.scrollTo({
				top: services!.offsetTop,
				behavior: "smooth",
			});
		});

		gsap.to(services, { autoAlpha: 1, duration: 0.4, delay: 0.3 });
		// El tren del ramal entra desde la izquierda como continuación
		if (servicesTrain) {
			gsap.fromTo(
				servicesTrain,
				{ x: -120 },
				{
					x: 0,
					autoAlpha: 1,
					duration: 0.5,
					delay: 0.55,
					ease: "power2.out",
				},
			);
		}
	}

	function closeBranch(opts: { scrollToNetwork: boolean } = { scrollToNetwork: true }) {
		if (!isInBranch) return;
		isInBranch = false;
		gsap.to(services, {
			autoAlpha: 0,
			duration: 0.3,
			onComplete: () => {
				services!.setAttribute("hidden", "");
				gsap.set(services, { autoAlpha: 1 });
				ScrollTrigger.refresh();

				// Reset del tren global a su posición CSS original
				if (trainSvg) {
					gsap.to(trainSvg, {
						rotation: 0,
						x: 0,
						y: 0,
						autoAlpha: 1,
						duration: 0.5,
						ease: "power2.out",
					});
				}

				if (opts.scrollToNetwork) {
					window.scrollTo({
						top: network!.offsetTop,
						behavior: "smooth",
					});
				}
			},
		});
	}

	// Auto-close si el usuario scrollea hacia arriba más allá del top del ramal
	window.addEventListener(
		"scroll",
		() => {
			if (!isInBranch) return;
			if (Date.now() < scrollLockUntil) return;
			if (window.scrollY < services!.offsetTop - 60) {
				closeBranch({ scrollToNetwork: false });
			}
		},
		{ passive: true },
	);

	// Listeners de navegación
	document.querySelectorAll<HTMLButtonElement>("[data-destino]").forEach((btn) => {
		btn.addEventListener("click", () => {
			const id = btn.dataset.destino as BranchId | undefined;
			if (id) openBranch(id);
		});
	});

	document.querySelectorAll<HTMLButtonElement>("[data-back]").forEach((btn) => {
		btn.addEventListener("click", () => closeBranch());
	});

	// Animación del tren del ramal Servicios — movimiento lineal continuo
	if (servicesTrain && detail) {
		const mm = gsap.matchMedia();

		mm.add("(prefers-reduced-motion: no-preference)", () => {
			gsap.to(servicesTrain, {
				left: "90%",
				ease: "none",
				scrollTrigger: {
					trigger: services,
					start: "top top",
					end: "bottom bottom",
					scrub: 0.6,
					invalidateOnRefresh: true,
				},
			});

			// Estación activa basada en posición horizontal del tren
			ScrollTrigger.create({
				trigger: services,
				start: "top top",
				end: "bottom bottom",
				onUpdate: (self) => {
					const p = self.progress;
					// Estaciones a 10% / 36.7% / 63.3% / 90%
					// Bordes intermedios: 23%, 50%, 77%
					let station;
					if (p < 0.23) station = "01";
					else if (p < 0.5) station = "02";
					else if (p < 0.77) station = "03";
					else station = "04";
					if (detail.dataset.activeStation !== station) {
						detail.dataset.activeStation = station;
					}
				},
			});
		});

		mm.add("(prefers-reduced-motion: reduce)", () => {
			gsap.set(servicesTrain, { left: "10%" });
		});
	}
}

if (document.readyState === "loading") {
	document.addEventListener("DOMContentLoaded", init);
} else {
	init();
}
