import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { onHomeMount } from "./lifecycle";

gsap.registerPlugin(ScrollTrigger);

function init(): (() => void) | void {
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
		// ────────────────────────────────────────────────────────────────
		// Strategy: arrancan invisibles. Architecture/Execution igual.
		// ────────────────────────────────────────────────────────────────
		gsap.set(pStrategy, { opacity: 0, yPercent: 100, scale: 1 });
		gsap.set([pArchitecture, pExecution], { opacity: 0, scale: 0.15 });
		gsap.set(blackout, { opacity: 0 });

		// ────────────────────────────────────────────────────────────────
		// MASTER scrubbed timeline — SOLO contenedores de panel.
		// Aquí van transformaciones reversibles (enter/exit suaves).
		// Animaciones de dibujo decorativo NO van aquí.
		// ────────────────────────────────────────────────────────────────
		const tl = gsap.timeline({
			scrollTrigger: {
				trigger: track,
				start: "top top",
				end: "bottom bottom",
				scrub: 0.6,
				invalidateOnRefresh: true,
			},
		});

		// Strategy entra desde abajo
		tl.to(
			pStrategy,
			{ opacity: 1, yPercent: 0, ease: "power2.out", duration: 0.1 },
			0,
		);
		// Strategy sale con zoom (scale moderado para evitar flicker subpixel)
		tl.to(
			pStrategy,
			{ scale: 6, opacity: 0, ease: "power2.in", duration: 0.1 },
			0.25,
		);

		// Architecture enter / exit
		tl.fromTo(
			pArchitecture,
			{ opacity: 0, scale: 0.15 },
			{ opacity: 1, scale: 1, ease: "power2.out", duration: 0.1 },
			0.35,
		);
		tl.to(
			pArchitecture,
			{ scale: 6, opacity: 0, ease: "power2.in", duration: 0.1 },
			0.6,
		);

		// Execution enter
		tl.fromTo(
			pExecution,
			{ opacity: 0, scale: 0.15 },
			{ opacity: 1, scale: 1, ease: "power2.out", duration: 0.1 },
			0.7,
		);

		// Blackout final
		tl.to(blackout, { opacity: 1, ease: "power2.in", duration: 0.04 }, 0.96);

		// ────────────────────────────────────────────────────────────────
		// ONE-SHOT triggers (play once, stay) — animaciones decorativas
		// que NO deben reversar al hacer scroll hacia atrás.
		// ────────────────────────────────────────────────────────────────

		// Mapeo de progress (0–1 del timeline scrubbeado) a posición scroll.
		// Track = 650vh. Scrubbing pin durante ≈550vh. Tomamos vh como
		// referencia para que ScrollTrigger compute start vs viewport.
		const trackScroll = () => track.offsetHeight - window.innerHeight;
		const atProgress = (p: number) => `top+=${p * trackScroll()}px top`;

		const railLines = pStrategy.querySelectorAll<SVGElement>(".rail-line");
		const ties = pStrategy.querySelectorAll<SVGElement>(".tie");
		const train = pStrategy.querySelector<SVGElement>(".train");

		gsap.set(ties, { opacity: 0 });

		// Rail draw + ties: una vez cuando Strategy entra
		ScrollTrigger.create({
			trigger: track,
			start: () => atProgress(0.08),
			invalidateOnRefresh: true,
			once: true,
			onEnter: () => {
				gsap.to(railLines, {
					strokeDashoffset: 0,
					ease: "power2.out",
					duration: 1.0,
				});
				gsap.to(ties, {
					opacity: 0.6,
					ease: "none",
					duration: 0.6,
					stagger: 0.025,
					delay: 0.2,
				});
			},
		});

		// Train: loop infinito mientras Strategy visible. Pausa fuera.
		let trainLoop: gsap.core.Tween | null = null;
		if (train) {
			gsap.set(train, { x: 0 });
			trainLoop = gsap.fromTo(
				train,
				{ x: 0 },
				{
					x: -880,
					duration: 6,
					ease: "none",
					repeat: -1,
					paused: true,
				},
			);
			ScrollTrigger.create({
				trigger: track,
				start: () => atProgress(0.08),
				end: () => atProgress(0.28),
				invalidateOnRefresh: true,
				onEnter: () => trainLoop?.play(),
				onLeave: () => trainLoop?.pause(),
				onEnterBack: () => trainLoop?.play(),
				onLeaveBack: () => trainLoop?.pause(),
			});
		}

		// Architecture: blocks + links draw one-shot
		const blocks = pArchitecture.querySelectorAll<SVGElement>(".block");
		const links = pArchitecture.querySelectorAll<SVGElement>(".links path");
		const pulses = pArchitecture.querySelectorAll<SVGCircleElement>(".pulse");

		ScrollTrigger.create({
			trigger: track,
			start: () => atProgress(0.42),
			invalidateOnRefresh: true,
			once: true,
			onEnter: () => {
				gsap.to(blocks, {
					opacity: 1,
					ease: "power2.out",
					duration: 0.5,
					stagger: 0.08,
				});
				gsap.to(links, {
					strokeDashoffset: 0,
					ease: "power2.out",
					duration: 0.8,
					delay: 0.25,
				});
			},
		});

		// Pulses: loop infinito mientras Architecture visible
		const linkPaths = [
			{ x1: 180, y1: 90, x2: 340, y2: 180 },
			{ x1: 180, y1: 270, x2: 340, y2: 180 },
			{ x1: 500, y1: 180, x2: 660, y2: 90 },
			{ x1: 500, y1: 180, x2: 660, y2: 180 },
			{ x1: 500, y1: 180, x2: 660, y2: 270 },
		];
		const pulseLoops: gsap.core.Tween[] = [];
		pulses.forEach((p, i) => {
			const c = linkPaths[i];
			gsap.set(p, { attr: { cx: c.x1, cy: c.y1 }, opacity: 0 });
			const loop = gsap.fromTo(
				p,
				{ attr: { cx: c.x1, cy: c.y1 }, opacity: 1 },
				{
					attr: { cx: c.x2, cy: c.y2 },
					duration: 1.4,
					ease: "power1.inOut",
					repeat: -1,
					delay: i * 0.18,
					paused: true,
				},
			);
			pulseLoops.push(loop);
		});

		ScrollTrigger.create({
			trigger: track,
			start: () => atProgress(0.46),
			end: () => atProgress(0.62),
			invalidateOnRefresh: true,
			onEnter: () => pulseLoops.forEach((l) => l.play()),
			onLeave: () => pulseLoops.forEach((l) => l.pause()),
			onEnterBack: () => pulseLoops.forEach((l) => l.play()),
			onLeaveBack: () => pulseLoops.forEach((l) => l.pause()),
		});

		// Execution: secuencia blueprint → mockup. Scrubbeada
		// (sigue al scroll) para que el panel tenga estado idle al entrar
		// y la "narrativa" se viva conforme avanza el usuario.
		const blueprint = pExecution.querySelector<SVGElement>(".exec--blueprint");
		const mockup = pExecution.querySelector<SVGElement>(".exec--mockup");

		gsap.set([blueprint, mockup], { opacity: 0 });

		tl.to(blueprint, { opacity: 1, ease: "power1.out", duration: 0.04 }, 0.8);
		tl.to(blueprint, { opacity: 0, ease: "power1.in", duration: 0.04 }, 0.88);
		tl.to(mockup, { opacity: 1, ease: "power1.out", duration: 0.04 }, 0.86);

		return () => {
			trainLoop?.kill();
			pulseLoops.forEach((l) => l.kill());
			gsap.set([panels, blackout], { clearProps: "all" });
		};
	});

	mm.add("(prefers-reduced-motion: reduce)", () => {
		gsap.set([panels, blackout], { clearProps: "all" });
	});

	return () => mm.revert();
}

onHomeMount(() => init());
