// La cuenta de la calculadora de ahorro, en un solo sitio: la usan la página
// de la calculadora y la herramienta WebMCP que se registra en todo el sitio.
export type SavingsInput = {
	/** Veces que se hace la tarea a la semana. */
	times: number;
	/** Minutos que dura cada vez. */
	minutes: number;
	/** Semanas de trabajo al año. */
	weeks: number;
	/** Coste de la hora para la empresa, en euros. */
	rate: number;
	/** Porcentaje de la tarea que se automatiza. */
	share: number;
	/** Inversión inicial en euros (0 si no se indica). */
	invest: number;
	/** Mantenimiento anual en euros. */
	upkeep: number;
};

export const computeSavings = (i: SavingsInput) => {
	const total = (i.times * i.minutes * i.weeks) / 60;
	const hours = (total * i.share) / 100;
	const money = hours * i.rate;
	const net = money - i.upkeep;
	const paybackMonths =
		i.invest > 0 && net > 0 ? Math.round((i.invest / net) * 12) : null;
	return { total, hours, money, net, paybackMonths };
};
