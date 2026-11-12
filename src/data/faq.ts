// Preguntas frecuentes del sitio. Cada respuesta debe poder leerse sola:
// es lo que citan buscadores y asistentes de IA.
import type { Faq } from "../lib/schema";

export type FaqGroup = { title: string; id: string; items: Faq[] };

export const faqGroups: FaqGroup[] = [
	{
		title: "Sobre RAIL Consulting",
		id: "sobre-rail",
		items: [
			{
				question: "¿Qué es RAIL Consulting?",
				answer: "RAIL Consulting es una consultora de ingeniería con base en Sevilla que ayuda a las empresas a ahorrar tiempo con inteligencia artificial, automatización de procesos y software a medida. Estudia cómo trabaja cada empresa, detecta dónde se pierden horas y construye la solución que las recupera.",
			},
			{
				question: "¿Quién está detrás de RAIL Consulting?",
				answer: "RAIL Consulting fue fundada por Mario Pantoja Castro, matemático y estadístico por la Universidad de Sevilla especializado en inteligencia artificial y ciencia de datos, y David Gutiérrez, desarrollador de software formado en Data & Business Analytics en la Universidad Loyola.",
			},
			{
				question: "¿Dónde está RAIL Consulting y dónde trabaja?",
				answer: "RAIL Consulting tiene su base en Sevilla. Trabaja en persona con empresas de Sevilla y su provincia y, combinando sesiones en remoto y visitas, con empresas del resto de Andalucía y de España.",
			},
			{
				question: "¿Qué significa «ingeniería del futuro»?",
				answer: "Es la forma en que RAIL Consulting resume su trabajo: aplicar ingeniería —medir, diseñar y construir— a la manera de trabajar de una empresa, usando inteligencia artificial y automatización para que el equipo dedique su tiempo a lo que aporta valor.",
			},
			{
				question: "¿Con qué tipo de empresas trabajáis?",
				answer: "Con empresas que tienen trabajo administrativo o de coordinación repetitivo, sea cual sea su sector: asesorías, despachos profesionales, inmobiliarias, industria y fabricación, distribución, instaladores y servicios. Importa menos el tamaño que las horas que se pierden cada semana.",
			},
		],
	},
	{
		title: "Cómo trabajamos",
		id: "metodo",
		items: [
			{
				question: "¿Cuál es el método de trabajo de RAIL Consulting?",
				answer: "Tres pasos. Estudio: vemos con el equipo cómo se trabaja de verdad, qué se repite y dónde se espera. Diagnóstico: localizamos dónde la IA o una automatización ahorran más horas y lo ordenamos por tiempo recuperado. Solución: construimos solo lo que el diagnóstico justifica.",
			},
			{
				question: "¿Por qué no empezáis directamente a construir?",
				answer: "Porque automatizar lo que no era el problema no ahorra tiempo. Medir primero permite saber qué tarea consume más horas, si compensa automatizarla y con qué tecnología, antes de invertir en nada.",
			},
			{
				question: "¿Qué pasa si el estudio concluye que no merece la pena automatizar?",
				answer: "Lo decimos. Si el tiempo que se puede recuperar no justifica la inversión, el diagnóstico lo refleja y recomienda dejar el proceso como está o simplificarlo sin tecnología.",
			},
			{
				question: "¿Tenemos que cambiar los programas que ya usamos?",
				answer: "Normalmente no. Lo habitual es conectar los programas que ya se usan —correo, hojas de cálculo, programa de gestión— para que los datos pasen de uno a otro sin copiarlos. Solo se propone sustituir un programa cuando es la causa del problema.",
			},
			{
				question: "¿Cuánto tiempo del equipo hace falta?",
				answer: "El necesario para enseñar cómo se trabaja: conversaciones cortas con quien hace cada tarea y la posibilidad de verla hacer. Hace falta además una persona de la empresa que decida y sea la referencia del proyecto.",
			},
		],
	},
	{
		title: "IA y automatización",
		id: "ia-y-automatizacion",
		items: [
			{
				question: "¿Qué diferencia hay entre inteligencia artificial y automatización?",
				answer: "La automatización ejecuta reglas fijas: si pasa esto, haz aquello. La inteligencia artificial interpreta: puede leer un correo escrito de cualquier forma o un documento que no ha visto antes. La automatización es más barata y predecible; la IA se reserva para las tareas que exigen entender texto o documentos.",
			},
			{
				question: "¿La IA va a sustituir a personas de mi equipo?",
				answer: "El objetivo de los proyectos de RAIL Consulting es quitar tareas, no puestos: eliminar el trabajo de copiar, comprobar y reenviar para que las mismas personas atiendan más clientes o hagan trabajo de más valor. Qué hacer con el tiempo recuperado es una decisión de la empresa.",
			},
			{
				question: "¿Qué pasa cuando la IA se equivoca?",
				answer: "Se diseña contando con ello. Se añaden comprobaciones automáticas, se registran todas las acciones y los pasos con consecuencias —pagos, envíos a clientes, decisiones sobre personas— pasan por revisión humana. Cuando el sistema no sabe qué hacer, para y pregunta.",
			},
			{
				question: "¿Qué es un agente de IA?",
				answer: "Un programa que usa un modelo de lenguaje para completar por sí mismo una tarea de varios pasos: entiende el objetivo, consulta los sistemas de la empresa, ejecuta acciones y comprueba el resultado, dentro de los límites que se le marcan.",
			},
			{
				question: "¿Mi empresa necesita IA?",
				answer: "No necesariamente. Muchas pérdidas de tiempo se resuelven con una automatización sencilla o conectando dos programas. La IA compensa cuando la tarea exige leer, interpretar o redactar. Distinguir un caso de otro es parte del diagnóstico.",
			},
		],
	},
	{
		title: "Costes y plazos",
		id: "costes-y-plazos",
		items: [
			{
				question: "¿Cuánto cuesta un proyecto con RAIL Consulting?",
				answer: "Depende de qué haya que construir, y eso no se sabe hasta estudiar el proceso. Por eso RAIL Consulting no da un precio antes del estudio: primero se mide cuánto tiempo se pierde y, con ese dato, se presupuesta algo concreto que se puede comparar con el ahorro esperado.",
			},
			{
				question: "¿Cuánto tarda en verse un resultado?",
				answer: "Una automatización acotada sobre un proceso claro puede estar funcionando en semanas. Un sistema a medida se construye por fases, y cada fase se entrega con algo utilizable. Lo que más condiciona el plazo es la claridad del proceso y el acceso a los programas implicados.",
			},
			{
				question: "¿Cómo sé si la inversión compensa?",
				answer: "Comparando el coste con las horas recuperadas al año multiplicadas por el coste de esas horas. Si el ahorro anual cubre la inversión en un plazo razonable, compensa. RAIL Consulting hace esa cuenta en el diagnóstico, antes de construir.",
			},
		],
	},
	{
		title: "Datos y seguridad",
		id: "datos-y-seguridad",
		items: [
			{
				question: "¿Qué pasa con los datos de mi empresa?",
				answer: "Antes de construir se decide qué datos puede ver cada herramienta, dónde se procesan y quién accede al resultado. Cada sistema recibe solo los permisos que necesita para su tarea.",
			},
			{
				question: "¿Se usan mis datos para entrenar modelos de IA?",
				answer: "No. Se trabaja con proveedores y configuraciones que no utilizan los datos del cliente para entrenar sus modelos.",
			},
			{
				question: "¿Cumple con el RGPD?",
				answer: "Los proyectos se diseñan conforme al Reglamento General de Protección de Datos: se identifica qué datos personales intervienen, con qué finalidad y con qué proveedores, y se mantiene revisión humana en las decisiones que afectan a personas.",
			},
		],
	},
	{
		title: "Software a medida",
		id: "software-a-medida",
		items: [
			{
				question: "¿Hacéis ERP y CRM a medida?",
				answer: "Sí, cuando el diagnóstico lo justifica. RAIL Consulting construye ERP, CRM y otro software a medida para empresas cuyo proceso no encaja en un programa estándar. No es el punto de partida: es una de las soluciones posibles después de estudiar cómo trabaja la empresa.",
			},
			{
				question: "¿De quién es el software que construís?",
				answer: "Se acuerda por escrito en cada proyecto. El criterio de RAIL Consulting es que la empresa no quede atada: lo construido debe poder mantenerse y evolucionar.",
			},
			{
				question: "¿Qué pasa después de la entrega?",
				answer: "Una automatización o un sistema necesitan mantenimiento, porque cambian los programas conectados y cambia el propio proceso. El alcance del mantenimiento se acuerda en cada proyecto.",
			},
		],
	},
];

export const allFaq: Faq[] = faqGroups.flatMap((g) => g.items);

/** Selección para la home: las que más se preguntan antes del primer contacto. */
export const homeFaq: Faq[] = [
	faqGroups[0].items[0],
	faqGroups[1].items[0],
	faqGroups[2].items[0],
	faqGroups[2].items[4],
	faqGroups[3].items[0],
	faqGroups[1].items[3],
];
