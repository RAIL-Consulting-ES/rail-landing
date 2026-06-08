import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
	Scene,
	PerspectiveCamera,
	WebGLRenderer,
	PlaneGeometry,
	MeshStandardMaterial,
	MeshBasicMaterial,
	Mesh,
	Group,
	AmbientLight,
	DirectionalLight,
	CanvasTexture,
	Vector3,
	Vector2,
	DoubleSide,
	Raycaster,
	MathUtils,
	Object3D,
	Box3,
} from "three";
import barba from "@barba/core";
import { onHomeMount } from "./lifecycle";
import type { CaseStudy } from "../types/case";

gsap.registerPlugin(ScrollTrigger);

type CaseData = CaseStudy;

onHomeMount(() => {
	const root = document.querySelector<HTMLElement>("[data-cases-root]");
	if (!root) return;
	return initCaseStudies(root);
});

function initCaseStudies(root: HTMLElement): (() => void) | void {
	const trailCanvas = root.querySelector<HTMLCanvasElement>("[data-cases-trail]");
	const threeCanvas = root.querySelector<HTMLCanvasElement>("[data-cases-three]");
	const ctaEl = root.querySelector<HTMLElement>("[data-cases-cta]");
	const dataEl = root.querySelector<HTMLScriptElement>("[data-cases-data]");
	const track = root.querySelector<HTMLElement>(".cases__track");
	const stageEl = root.querySelector<HTMLElement>(".cases__stage");

	if (!trailCanvas || !threeCanvas || !ctaEl || !dataEl || !track || !stageEl) return;

	let cases: CaseData[] = [];
	try {
		cases = JSON.parse(dataEl.textContent || "[]");
	} catch {
		cases = [];
	}

	const mm = gsap.matchMedia();
	mm.add("(prefers-reduced-motion: no-preference)", () => {
		const stage = setupStage(threeCanvas);

		const book = buildBook(cases);
		book.group.visible = false;
		stage.scene.add(book.group);

		const trail = setupTrail(trailCanvas);

		// Responsive book scale: grows on larger viewports.
		function applyBookScale() {
			const scale = MathUtils.clamp(
				MathUtils.mapLinear(window.innerWidth, 480, 1920, 0.85, 1.6),
				0.85,
				1.6,
			);
			book.group.scale.setScalar(scale);
		}
		applyBookScale();
		window.addEventListener("resize", applyBookScale);

		// Raycaster click → flyToCase() with overlay handoff to Barba transition.
		const raycaster = new Raycaster();
		const ndc = new Vector2();
		function pickHit(ev: PointerEvent): { slug: string; mesh: Mesh } | null {
			const rect = threeCanvas.getBoundingClientRect();
			ndc.x = ((ev.clientX - rect.left) / rect.width) * 2 - 1;
			ndc.y = -((ev.clientY - rect.top) / rect.height) * 2 + 1;
			raycaster.setFromCamera(ndc, stage.camera);
			const hits = raycaster.intersectObject(book.group, true);
			for (const hit of hits) {
				let obj: Object3D | null = hit.object;
				while (obj) {
					const slug = obj.userData?.caseSlug;
					if (typeof slug === "string" && slug) {
						return { slug, mesh: hit.object as Mesh };
					}
					obj = obj.parent;
				}
			}
			return null;
		}
		threeCanvas.addEventListener("click", (ev) => {
			if (!book.group.visible) return;
			const hit = pickHit(ev);
			if (hit) flyToCase(hit.slug, hit.mesh);
		});

		function getMeshScreenRect(mesh: Mesh) {
			const box = new Box3().setFromObject(mesh);
			const corners = [
				new Vector3(box.min.x, box.min.y, box.min.z),
				new Vector3(box.min.x, box.min.y, box.max.z),
				new Vector3(box.min.x, box.max.y, box.min.z),
				new Vector3(box.min.x, box.max.y, box.max.z),
				new Vector3(box.max.x, box.min.y, box.min.z),
				new Vector3(box.max.x, box.min.y, box.max.z),
				new Vector3(box.max.x, box.max.y, box.min.z),
				new Vector3(box.max.x, box.max.y, box.max.z),
			];
			const canvasRect = threeCanvas.getBoundingClientRect();
			let minX = Infinity,
				minY = Infinity,
				maxX = -Infinity,
				maxY = -Infinity;
			for (const c of corners) {
				c.project(stage.camera);
				const x = canvasRect.left + ((c.x + 1) / 2) * canvasRect.width;
				const y = canvasRect.top + ((1 - c.y) / 2) * canvasRect.height;
				if (x < minX) minX = x;
				if (y < minY) minY = y;
				if (x > maxX) maxX = x;
				if (y > maxY) maxY = y;
			}
			return { left: minX, top: minY, width: maxX - minX, height: maxY - minY };
		}

		function snapshotPageRegion(mesh: Mesh) {
			const rect = getMeshScreenRect(mesh);
			const canvasRect = threeCanvas.getBoundingClientRect();
			const scaleX = threeCanvas.width / canvasRect.width;
			const scaleY = threeCanvas.height / canvasRect.height;
			const sx = Math.max(0, (rect.left - canvasRect.left) * scaleX);
			const sy = Math.max(0, (rect.top - canvasRect.top) * scaleY);
			const sw = Math.min(rect.width * scaleX, threeCanvas.width - sx);
			const sh = Math.min(rect.height * scaleY, threeCanvas.height - sy);
			stage.renderer.render(stage.scene, stage.camera);
			const out = document.createElement("canvas");
			out.width = Math.max(1, Math.round(sw));
			out.height = Math.max(1, Math.round(sh));
			const ctx = out.getContext("2d");
			if (ctx) ctx.drawImage(threeCanvas, sx, sy, sw, sh, 0, 0, out.width, out.height);
			return { dataURL: out.toDataURL(), rect };
		}

		function flyToCase(slug: string, mesh: Mesh) {
			const study = cases.find((c) => c.slug === slug);
			if (!study) {
				barba.go(`/case/${slug}`);
				return;
			}
			const { dataURL, rect } = snapshotPageRegion(mesh);

			// Hide source canvas immediately so the snapshot is the only thing on screen.
			threeCanvas.style.opacity = "0";
			trailCanvas.style.opacity = "0";
			ctaEl.style.opacity = "0";

			const overlay = document.createElement("div");
			overlay.className = "case-flyover";
			overlay.style.cssText = `
				position: fixed;
				left: ${rect.left}px;
				top: ${rect.top}px;
				width: ${rect.width}px;
				height: ${rect.height}px;
				z-index: 9999;
				pointer-events: none;
				will-change: transform, width, height, top, left;
				overflow: hidden;
			`;

			const img = document.createElement("img");
			img.className = "case-flyover__img";
			img.src = dataURL;
			img.alt = "";
			img.style.cssText = `
				position: absolute;
				inset: 0;
				width: 100%;
				height: 100%;
				object-fit: cover;
				display: block;
			`;
			overlay.appendChild(img);


			document.body.appendChild(overlay);

			(window as any).__caseFlyover = {
				overlay,
				img,
				slug,
				study,
				originRect: rect,
			};

			barba.go(`/case/${slug}`);
		}
		threeCanvas.addEventListener("pointermove", (ev) => {
			if (!book.group.visible) {
				threeCanvas.style.cursor = "";
				return;
			}
			threeCanvas.style.cursor = pickHit(ev) ? "pointer" : "";
		});

		// Eraser must finish within the 100vh overlap with Solutions
		// (which is the first 100vh of CaseStudies's 1000vh track = 0.10).
		// Track length 1000vh is set via --cases-track CSS var.
		const ERASER_END = 0.1;

		// Pre-sample eraser path (deterministic) so reverse scroll repaints correctly.
		const SAMPLES = 240;
		const SWEEPS = 5;

		function eraserWorldPos(t: number) {
			// t in [0,1] of eraser phase
			const segLen = 1 / SWEEPS;
			const seg = Math.min(SWEEPS - 1, Math.floor(t / segLen));
			const local = (t - seg * segLen) / segLen;
			const dir = seg % 2 === 0 ? 1 : -1;
			const xRange = stage.viewWidth * 0.55;
			const yTop = stage.viewHeight * 0.42;
			const yBot = -stage.viewHeight * 0.42;
			const x = dir === 1 ? -xRange + local * xRange * 2 : xRange - local * xRange * 2;
			const yProgress = (seg + local) / SWEEPS;
			const y = yTop + (yBot - yTop) * yProgress;
			return { x, y };
		}

		function projectToScreen(x: number, y: number) {
			const v = new Vector3(x, y, 0);
			v.project(stage.camera);
			return {
				px: ((v.x + 1) / 2) * trail.canvas.width,
				py: ((1 - (v.y + 1) / 2)) * trail.canvas.height,
			};
		}

		function paintTrail(progress: number) {
			trail.ctx.clearRect(0, 0, trail.canvas.width, trail.canvas.height);

			if (progress >= ERASER_END) {
				trail.ctx.fillStyle = "#ffffff";
				trail.ctx.fillRect(0, 0, trail.canvas.width, trail.canvas.height);
				return;
			}

			const t = Math.max(0, progress / ERASER_END);
			const upTo = Math.floor(t * SAMPLES);
			const radius = Math.min(trail.canvas.width, trail.canvas.height) * 0.14;
			trail.ctx.fillStyle = "#ffffff";
			for (let i = 0; i <= upTo; i++) {
				const ti = i / SAMPLES;
				const { x, y } = eraserWorldPos(ti);
				const { px, py } = projectToScreen(x, y);
				trail.ctx.beginPath();
				trail.ctx.arc(px, py, radius, 0, Math.PI * 2);
				trail.ctx.fill();
			}
		}

		// Book timeline phases (relative to total timeline 0..1).
		// Page-flip range is split evenly across the N case leaves.
		const PAGE_RANGE: [number, number] = [0.32, 0.78];
		const N_LEAVES = Math.max(1, book.leaves.length);
		const PER_PAGE = (PAGE_RANGE[1] - PAGE_RANGE[0]) / N_LEAVES;
		const pagePhases = Array.from({ length: N_LEAVES }, (_, i) => ({
			start: PAGE_RANGE[0] + i * PER_PAGE,
			end: PAGE_RANGE[0] + (i + 1) * PER_PAGE,
		}));
		const P = {
			bookFallStart: 0.12,
			bookFallEnd: 0.22,
			coverOpenStart: 0.22,
			coverOpenEnd: PAGE_RANGE[0],
			zoomStart: PAGE_RANGE[1],
			zoomEnd: 0.93,
			ctaFadeStart: 0.9,
			ctaFadeEnd: 1.0,
		};

		function clamp01(v: number) {
			return Math.max(0, Math.min(1, v));
		}

		function tweenSection(progress: number, start: number, end: number) {
			return clamp01((progress - start) / (end - start));
		}

		// Bounce ease (gsap.parseEase available for "bounce.out")
		const bounceOut = gsap.parseEase("bounce.out");
		const power2Out = gsap.parseEase("power2.out");
		const power2InOut = gsap.parseEase("power2.inOut");
		const power3InOut = gsap.parseEase("power3.inOut");

		function setBookAtProgress(progress: number) {
			if (progress < P.bookFallStart) {
				book.group.visible = false;
				return;
			}
			book.group.visible = true;

			// Fall
			const fallT = tweenSection(progress, P.bookFallStart, P.bookFallEnd);
			const yStart = stage.viewHeight * 0.9;
			const yEnd = -stage.viewHeight * 0.05;
			book.group.position.y = yStart + (yEnd - yStart) * power2Out(fallT);
			book.group.position.x = 0;
			book.group.position.z = 0;

			// Cover open: rotation.y from 0 to -PI
			const coverT = tweenSection(progress, P.coverOpenStart, P.coverOpenEnd);
			book.cover.rotation.y = -Math.PI * power2InOut(coverT);

			// Page turns — one phase per leaf
			pagePhases.forEach((phase, i) => {
				const t = tweenSection(progress, phase.start, phase.end);
				book.leaves[i].rotation.y = -Math.PI * power2InOut(t);
			});

			// Dynamic z so flipped leaves stack correctly on the left side
			// (last flipped on top), and unflipped leaves stack with cover on top.
			book.updateLeafStacking();

			// Zoom: camera dollies toward right page of spread 4
			const zoomT = tweenSection(progress, P.zoomStart, P.zoomEnd);
			const camStartZ = 5;
			const camEndZ = 0.6;
			stage.camera.position.z = camStartZ + (camEndZ - camStartZ) * power3InOut(zoomT);
			// Also bias x to look at right page
			stage.camera.position.x = 0.5 * power3InOut(zoomT);
			stage.camera.lookAt(stage.camera.position.x, 0, 0);

			// Fade book opacity at very end so CTA appears clean
			const fadeT = tweenSection(progress, P.zoomEnd - 0.03, P.zoomEnd + 0.02);
			book.setOpacity(1 - fadeT);
		}

		function setCtaAtProgress(progress: number) {
			const t = tweenSection(progress, P.ctaFadeStart, P.ctaFadeEnd);
			ctaEl.style.opacity = String(t);
			ctaEl.style.pointerEvents = t > 0.5 ? "auto" : "none";
		}

		// Toggle pointer-events on the canvas itself — setting it on the
		// parent .cases doesn't work because .cases__three has
		// `pointer-events: auto` in CSS, which overrides the parent's "none".
		let pointerActive = false;
		threeCanvas.style.pointerEvents = "none";
		function setPointerActive(active: boolean) {
			if (active === pointerActive) return;
			pointerActive = active;
			threeCanvas.style.pointerEvents = active ? "auto" : "none";
		}

		function render(progress: number) {
			// Activate pointer-events only once book has fallen — before that,
			// the cases canvas overlaps Solutions and would swallow its CTA click.
			setPointerActive(progress >= P.bookFallEnd);
			paintTrail(progress);
			setBookAtProgress(progress);
			setCtaAtProgress(progress);
			stage.renderer.render(stage.scene, stage.camera);
		}

		const st = ScrollTrigger.create({
			trigger: track,
			start: "top top",
			end: "bottom bottom",
			scrub: 0.6,
			invalidateOnRefresh: true,
			onEnter: () => {
				stageEl.style.opacity = "1";
			},
			onEnterBack: () => {
				stageEl.style.opacity = "1";
			},
			onLeaveBack: () => {
				stageEl.style.opacity = "0";
			},
			onUpdate: (self) => render(self.progress),
			onRefresh: (self) => {
				stage.resize();
				trail.resize();
				render(self.progress);
			},
		});

		render(0);

		return () => {
			st.kill();
			stage.dispose();
			trail.dispose();
			window.removeEventListener("resize", applyBookScale);
		};
	});

	return () => mm.revert();
}

/* ------------------------------------------------------------------ */
/* three.js stage                                                      */
/* ------------------------------------------------------------------ */
function setupStage(canvas: HTMLCanvasElement) {
	const renderer = new WebGLRenderer({
		canvas,
		alpha: true,
		antialias: true,
		preserveDrawingBuffer: true,
	});
	renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));

	const scene = new Scene();

	const camera = new PerspectiveCamera(45, 1, 0.1, 100);
	camera.position.set(0, 0, 5);
	camera.lookAt(0, 0, 0);

	scene.add(new AmbientLight(0xffffff, 0.7));
	const dir = new DirectionalLight(0xffffff, 0.9);
	dir.position.set(2, 4, 5);
	scene.add(dir);

	let viewWidth = 0;
	let viewHeight = 0;

	function computeView() {
		const dist = camera.position.z;
		viewHeight = 2 * Math.tan((camera.fov * Math.PI) / 360) * dist;
		viewWidth = viewHeight * camera.aspect;
	}

	function resize() {
		const rect = canvas.getBoundingClientRect();
		const w = Math.max(1, rect.width);
		const h = Math.max(1, rect.height);
		renderer.setSize(w, h, false);
		camera.aspect = w / h;
		camera.updateProjectionMatrix();
		computeView();
	}

	resize();

	function dispose() {
		renderer.dispose();
	}

	return {
		renderer,
		scene,
		camera,
		resize,
		dispose,
		get viewWidth() {
			return viewWidth;
		},
		get viewHeight() {
			return viewHeight;
		},
	};
}

/* ------------------------------------------------------------------ */
/* trail canvas (2D)                                                   */
/* ------------------------------------------------------------------ */
function setupTrail(canvas: HTMLCanvasElement) {
	const ctx = canvas.getContext("2d");
	if (!ctx) throw new Error("No 2D context");

	function resize() {
		const rect = canvas.getBoundingClientRect();
		const dpr = Math.min(window.devicePixelRatio, 1.5);
		canvas.width = Math.max(1, Math.floor(rect.width * dpr));
		canvas.height = Math.max(1, Math.floor(rect.height * dpr));
	}

	resize();

	function dispose() {
		ctx.clearRect(0, 0, canvas.width, canvas.height);
	}

	return { canvas, ctx, resize, dispose };
}

/* ------------------------------------------------------------------ */
/* book                                                                */
/* ------------------------------------------------------------------ */
function buildBook(cases: CaseData[]) {
	const group = new Group();

	const PAGE_W = 1.4;
	const PAGE_H = 1.9;
	const PAGE_D = 0.01;

	const N = Math.max(1, cases.length);

	// Cover textures
	const coverFrontTex = makeCoverTexture("CASE STUDIES", "RAIL");
	const coverInsideTex = makePlainTexture("#fbfaf6");
	const backCoverInsideTex = makeCtaSpreadRight();
	const backCoverOutsideTex = makePlainTexture("#1b1b1b");

	// Cover (hinged at x=0)
	const cover = makeLeaf(coverFrontTex, coverInsideTex, PAGE_W, PAGE_H, PAGE_D);
	group.add(cover);

	// Back cover (static, sits at the bottom of the right pile)
	const backCover = makeLeaf(backCoverInsideTex, backCoverOutsideTex, PAGE_W, PAGE_H, PAGE_D);
	backCover.position.z = -0.05;
	group.add(backCover);

	// Spread-1 left page (visible after cover opens) shows case[0].image,
	// printed on the cover's inside face.
	const firstImageTex = makeImagePageTexture(cases[0]?.image ?? "");
	const coverInside = cover.children[1] as Mesh<PlaneGeometry, MeshStandardMaterial>;
	coverInside.material.map = firstImageTex;
	coverInside.material.needsUpdate = true;
	coverInside.userData.caseSlug = cases[0]?.slug;

	// N turning leaves: leaf i front = case[i] text page; back = case[i+1] image (or CTA on last).
	const leaves: Group[] = [];
	for (let i = 0; i < N; i++) {
		const current = cases[i];
		const next = cases[i + 1];
		const frontTex = makeTextPageTexture(current?.title ?? "", current?.description ?? "");
		const backTex = next ? makeImagePageTexture(next.image) : makeCtaSpreadLeft();
		const leaf = makeLeaf(frontTex, backTex, PAGE_W, PAGE_H, PAGE_D);
		// Front face: clicking the text page navigates to the current case.
		(leaf.children[0] as Mesh).userData.caseSlug = current?.slug;
		// Back face: clicking the image page navigates to the next case (or no-op on CTA).
		if (next) (leaf.children[1] as Mesh).userData.caseSlug = next.slug;
		group.add(leaf);
		leaves.push(leaf);
	}

	// Stacking order in flip sequence (cover flips first, then leaves 0..2)
	const flipOrder = [cover, ...leaves];

	function updateLeafStacking() {
		// For each pivot, lerp between right-pile z (unflipped) and left-pile z (flipped).
		// Right pile (rotation 0): cover on top, then leaves descending.
		// Left pile (rotation -PI): last flipped on top, earliest at bottom.
		const STEP = 0.01;
		const N = flipOrder.length; // 4
		flipOrder.forEach((pivot, i) => {
			const t = Math.min(1, Math.max(0, -pivot.rotation.y / Math.PI));
			const zRight = (N - i) * STEP; // i=0 (cover): top of right pile
			const zLeft = (i + 1) * STEP; // i=N-1 (leaf3): top of left pile
			pivot.position.z = (1 - t) * zRight + t * zLeft;
		});
	}

	updateLeafStacking();

	// Initial book position: dropped above viewport, will be tweened in.
	group.position.set(0, 5, 0);
	group.rotation.x = -0.15;

	function setOpacity(v: number) {
		group.traverse((obj: any) => {
			if (obj.isMesh && obj.material) {
				obj.material.transparent = true;
				obj.material.opacity = v;
				obj.material.needsUpdate = true;
			}
		});
	}

	return { group, cover, leaves, setOpacity, updateLeafStacking };
}

function makeLeaf(
	frontTexture: CanvasTexture,
	backTexture: CanvasTexture,
	width: number,
	height: number,
	depth: number,
) {
	const pivot = new Group();

	// Right-page plane: hinged on left edge (x=0), extends to x=width
	const front = new Mesh(
		new PlaneGeometry(width, height),
		new MeshStandardMaterial({ map: frontTexture, side: DoubleSide, roughness: 0.85 }),
	);
	front.position.set(width / 2, 0, depth / 2);

	const back = new Mesh(
		new PlaneGeometry(width, height),
		new MeshStandardMaterial({ map: backTexture, side: DoubleSide, roughness: 0.85 }),
	);
	back.position.set(width / 2, 0, -depth / 2);
	back.rotation.y = Math.PI;

	pivot.add(front, back);
	return pivot;
}

/* ------------------------------------------------------------------ */
/* canvas textures                                                     */
/* ------------------------------------------------------------------ */
function makeCanvas(w = 768, h = 1024) {
	const c = document.createElement("canvas");
	c.width = w;
	c.height = h;
	return c;
}

function makeCoverTexture(title: string, brand: string) {
	const c = makeCanvas();
	const ctx = c.getContext("2d")!;
	ctx.fillStyle = "#0a0a0a";
	ctx.fillRect(0, 0, c.width, c.height);

	ctx.fillStyle = "#93c572";
	ctx.fillRect(60, 60, 8, c.height - 120);

	ctx.fillStyle = "#ffffff";
	ctx.font = "800 96px Inter, sans-serif";
	ctx.textBaseline = "top";
	wrapText(ctx, title, 100, c.height / 2 - 120, c.width - 200, 110);

	ctx.fillStyle = "#93c572";
	ctx.font = "600 36px 'Space Grotesk', Inter, sans-serif";
	ctx.fillText(brand, 100, c.height - 120);

	const tex = new CanvasTexture(c);
	tex.needsUpdate = true;
	return tex;
}

function makeTextPageTexture(title: string, text: string) {
	const c = makeCanvas();
	const ctx = c.getContext("2d")!;
	ctx.fillStyle = "#fbfaf6";
	ctx.fillRect(0, 0, c.width, c.height);

	ctx.fillStyle = "#000000";
	ctx.font = "700 64px 'Space Grotesk', Inter, sans-serif";
	ctx.textBaseline = "top";
	ctx.fillText(title, 70, 100);

	ctx.fillStyle = "#000000";
	ctx.font = "400 32px Inter, sans-serif";
	wrapText(ctx, text, 70, 220, c.width - 140, 44);

	const tex = new CanvasTexture(c);
	tex.needsUpdate = true;
	return tex;
}

function makeImagePageTexture(url: string) {
	const c = makeCanvas();
	const ctx = c.getContext("2d")!;
	ctx.fillStyle = "#fbfaf6";
	ctx.fillRect(0, 0, c.width, c.height);

	const tex = new CanvasTexture(c);
	if (url) {
		const img = new Image();
		img.crossOrigin = "anonymous";
		img.onload = () => {
			const ratio = img.width / img.height;
			const targetRatio = c.width / c.height;
			let sx = 0,
				sy = 0,
				sw = img.width,
				sh = img.height;
			if (ratio > targetRatio) {
				sw = img.height * targetRatio;
				sx = (img.width - sw) / 2;
			} else {
				sh = img.width / targetRatio;
				sy = (img.height - sh) / 2;
			}
			ctx.drawImage(img, sx, sy, sw, sh, 0, 0, c.width, c.height);
			tex.needsUpdate = true;
		};
		img.onerror = () => {
			ctx.fillStyle = "#fbfaf6";
			ctx.fillRect(0, 0, c.width, c.height);
			tex.needsUpdate = true;
		};
		img.src = url;
	}
	return tex;
}

function makePlainTexture(color: string) {
	const c = makeCanvas(64, 64);
	const ctx = c.getContext("2d")!;
	ctx.fillStyle = color;
	ctx.fillRect(0, 0, c.width, c.height);
	const tex = new CanvasTexture(c);
	tex.needsUpdate = true;
	return tex;
}

function makeCtaSpreadLeft() {
	const c = makeCanvas();
	const ctx = c.getContext("2d")!;
	ctx.fillStyle = "#0a0a0a";
	ctx.fillRect(0, 0, c.width, c.height);
	ctx.fillStyle = "#93c572";
	ctx.font = "800 220px 'Space Grotesk', Inter, sans-serif";
	ctx.textBaseline = "middle";
	ctx.textAlign = "center";
	ctx.fillText("→", c.width / 2, c.height / 2);
	const tex = new CanvasTexture(c);
	tex.needsUpdate = true;
	return tex;
}

function makeCtaSpreadRight() {
	const c = makeCanvas();
	const ctx = c.getContext("2d")!;
	ctx.fillStyle = "#fbfaf6";
	ctx.fillRect(0, 0, c.width, c.height);
	ctx.fillStyle = "#000000";
	ctx.font = "700 72px 'Space Grotesk', Inter, sans-serif";
	ctx.textBaseline = "top";
	wrapText(ctx, "¿Listo para tu caso?", 70, 200, c.width - 140, 90);
	ctx.fillStyle = "#93c572";
	ctx.font = "600 36px Inter, sans-serif";
	ctx.fillText("Hablemos →", 70, c.height - 200);
	const tex = new CanvasTexture(c);
	tex.needsUpdate = true;
	return tex;
}

function wrapText(
	ctx: CanvasRenderingContext2D,
	text: string,
	x: number,
	y: number,
	maxWidth: number,
	lineHeight: number,
) {
	const words = text.split(" ");
	let line = "";
	let cy = y;
	for (let n = 0; n < words.length; n++) {
		const test = line + words[n] + " ";
		if (ctx.measureText(test).width > maxWidth && n > 0) {
			ctx.fillText(line.trim(), x, cy);
			line = words[n] + " ";
			cy += lineHeight;
		} else {
			line = test;
		}
	}
	ctx.fillText(line.trim(), x, cy);
}
