// Registra la herramienta WebMCP de la calculadora de ahorro. Lo carga
// SavingsTool.astro solo en navegadores con document.modelContext.
import { computeSavings } from "./savings";

const CALCULATOR = "/calculadora-ahorro-automatizacion/";
const NUMBER = { type: "number", minimum: 0 } as const;

// Parámetro de la herramienta → campo del formulario de la calculadora.
const fields = {
	timesPerWeek: "times",
	minutesEach: "minutes",
	hourlyCost: "rate",
	weeksPerYear: "weeks",
	automatableShare: "share",
	investment: "invest",
	yearlyUpkeep: "upkeep",
} as const;
type Param = keyof typeof fields;
const required: Param[] = ["timesPerWeek", "minutesEach", "hourlyCost"];
const clamp = (n: number, min: number, max: number) =>
	Math.min(max, Math.max(min, n));

const tool = {
	name: "calculate_automation_savings",
	description:
		"Calcula cuántas horas y cuánto dinero recupera al año una empresa si automatiza una tarea repetitiva y, si se da la inversión, en cuántos meses se recupera. Úsalo cuando la persona quiera estimar el ahorro o el retorno de automatizar una tarea.",
	inputSchema: {
		type: "object",
		properties: {
			timesPerWeek: {
				...NUMBER,
				description: "Veces que se hace la tarea en una semana normal.",
			},
			minutesEach: {
				...NUMBER,
				description: "Minutos que dura la tarea cada vez.",
			},
			hourlyCost: {
				...NUMBER,
				description:
					"Coste de una hora de esa persona para la empresa, en euros: salario bruto más cotizaciones, entre las horas anuales.",
			},
			weeksPerYear: {
				type: "number",
				minimum: 1,
				maximum: 52,
				default: 48,
				description: "Semanas de trabajo al año.",
			},
			automatableShare: {
				type: "number",
				minimum: 10,
				maximum: 100,
				multipleOf: 5,
				default: 75,
				description:
					"Porcentaje de la tarea que se estima automatizable. Conviene una cifra prudente.",
			},
			investment: {
				...NUMBER,
				description: "Inversión inicial en euros, si se conoce.",
			},
			yearlyUpkeep: {
				...NUMBER,
				description: "Coste anual de mantenimiento en euros, si se conoce.",
			},
		},
		required,
	},
	execute(args: Partial<Record<Param, unknown>>) {
		// El navegador no valida contra el esquema ni aplica los valores por
		// defecto: se hace aquí.
		const bad = (Object.keys(fields) as Param[]).filter((key) => {
			const value = args[key];
			if (value === undefined) return required.includes(key);
			return typeof value !== "number" || !Number.isFinite(value) || value < 0;
		});
		if (bad.length > 0) {
			return {
				error: `Faltan o no son números válidos (mayores o iguales que cero): ${bad.join(", ")}.`,
			};
		}
		const n = (key: Param, fallback = 0) => (args[key] as number | undefined) ?? fallback;
		const values = {
			timesPerWeek: n("timesPerWeek"),
			minutesEach: n("minutesEach"),
			hourlyCost: n("hourlyCost"),
			weeksPerYear: clamp(n("weeksPerYear", 48), 1, 52),
			// Mismos pasos que el control de la calculadora: de 5 en 5.
			automatableShare: clamp(Math.round(n("automatableShare", 75) / 5) * 5, 10, 100),
			investment: n("investment"),
			yearlyUpkeep: n("yearlyUpkeep"),
		};

		// En la página de la calculadora, la persona ve la misma cuenta.
		const form = document.getElementById("calc-form") as HTMLFormElement | null;
		if (form) {
			for (const key of Object.keys(fields) as Param[]) {
				const optional = key === "investment" || key === "yearlyUpkeep";
				(form.elements.namedItem(fields[key]) as HTMLInputElement).value =
					optional && args[key] === undefined ? "" : String(values[key]);
			}
			form.dispatchEvent(new Event("input"));
		}

		const r = computeSavings({
			times: values.timesPerWeek,
			minutes: values.minutesEach,
			weeks: values.weeksPerYear,
			rate: values.hourlyCost,
			share: values.automatableShare,
			invest: values.investment,
			upkeep: values.yearlyUpkeep,
		});
		return {
			hoursSpentPerYearToday: Math.round(r.total),
			hoursRecoveredPerYear: Math.round(r.hours),
			savingsPerYearEur: Math.round(r.money),
			workWeeksRecovered: Math.round(r.hours / 40),
			paybackMonths: r.paybackMonths,
			automatableSharePercent: values.automatableShare,
			weeksPerYear: values.weeksPerYear,
			calculatorUrl: new URL(CALCULATOR, location.origin).href,
			note: "Estimación orientativa calculada en el navegador; no es un presupuesto.",
		};
	},
	annotations: { readOnlyHint: true },
};

// La página es un documento completo por navegación: la herramienta vive
// lo que vive el documento, sin nada que liberar.
Promise.resolve((document as any).modelContext.registerTool(tool)).catch(() => {});
