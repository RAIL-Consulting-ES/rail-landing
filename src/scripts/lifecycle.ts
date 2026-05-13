type Cleanup = (() => void) | void;
type Mounter = () => Cleanup;

const mounters: Mounter[] = [];
const cleanups: Array<() => void> = [];

function runCleanups() {
	while (cleanups.length) {
		const c = cleanups.pop();
		try {
			c?.();
		} catch (e) {
			console.error("[lifecycle] cleanup error", e);
		}
	}
}

function runMounters() {
	for (const m of mounters) {
		try {
			const c = m();
			if (typeof c === "function") cleanups.push(c);
		} catch (e) {
			console.error("[lifecycle] mount error", e);
		}
	}
}

export function onHomeMount(fn: Mounter) {
	mounters.push(fn);
	// Run immediately so initial page load behaves as before.
	try {
		const c = fn();
		if (typeof c === "function") cleanups.push(c);
	} catch (e) {
		console.error("[lifecycle] initial mount error", e);
	}
}

window.addEventListener("home:unmount", runCleanups);
window.addEventListener("home:mount", runMounters);
