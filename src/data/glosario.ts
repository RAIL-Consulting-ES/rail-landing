// Glosario: una definición por término, en una o dos frases que se sostengan
// solas (son las que cita un asistente de IA). `link` apunta a la página del
// sitio que lo desarrolla.
export type Term = { term: string; id: string; def: string; link?: string };

export const glosario: Term[] = [
	{
		term: "Agente de IA",
		id: "agente-de-ia",
		def: "Programa que usa un modelo de lenguaje para completar una tarea de varios pasos por sí mismo: entiende el objetivo, decide qué herramientas usar, las ejecuta y comprueba el resultado. A diferencia de un chatbot, actúa sobre los sistemas de la empresa.",
		link: "/agentes-de-ia/",
	},
	{
		term: "Alucinación",
		id: "alucinacion",
		def: "Respuesta de un modelo de IA que suena correcta pero es falsa o inventada. Se reduce haciendo que el modelo responda solo a partir de documentos concretos y manteniendo revisión humana en lo importante.",
	},
	{
		term: "API",
		id: "api",
		def: "Interfaz que ofrece un programa para que otros programas le envíen o le pidan datos de forma automática. Es la vía prevista para conectar dos sistemas sin que nadie copie la información a mano.",
		link: "/soluciones/integracion-de-sistemas/",
	},
	{
		term: "Automatización de procesos",
		id: "automatizacion-de-procesos",
		def: "Uso de software para ejecutar tareas repetitivas sin intervención manual, siguiendo reglas definidas: mover datos entre programas, generar documentos, enviar avisos o lanzar aprobaciones.",
		link: "/soluciones/automatizacion-de-procesos/",
	},
	{
		term: "Chatbot",
		id: "chatbot",
		def: "Programa que conversa con una persona por texto o voz para responder preguntas. Un chatbot responde; un agente de IA, además, ejecuta tareas.",
	},
	{
		term: "CRM",
		id: "crm",
		def: "Siglas de customer relationship management. Programa que centraliza la relación con los clientes: contactos, oportunidades de venta, conversaciones y seguimiento.",
		link: "/soluciones/crm-a-medida/",
	},
	{
		term: "Cuadro de mando",
		id: "cuadro-de-mando",
		def: "Pantalla que reúne los indicadores clave de una empresa o de un área, actualizados automáticamente, para decidir sin preparar informes a mano. También se llama dashboard.",
		link: "/soluciones/cuadros-de-mando/",
	},
	{
		term: "Datos estructurados y no estructurados",
		id: "datos-estructurados",
		def: "Los datos estructurados tienen un formato fijo, como las filas de una tabla. Los no estructurados no lo tienen: correos, PDF, imágenes o audios. La automatización clásica necesita datos estructurados; la IA puede trabajar con los no estructurados.",
	},
	{
		term: "Diagnóstico de procesos",
		id: "diagnostico-de-procesos",
		def: "Documento que ordena las oportunidades de mejora de una empresa según el tiempo que devuelven al equipo, con lo que habría que construir en cada una. Es el resultado del estudio de procesos.",
		link: "/estudio-de-procesos/",
	},
	{
		term: "ERP",
		id: "erp",
		def: "Siglas de enterprise resource planning. Sistema de gestión que centraliza la operación de una empresa —compras, ventas, inventario, producción, finanzas— sobre una única base de datos.",
		link: "/soluciones/erp-a-medida/",
	},
	{
		term: "Estudio de procesos",
		id: "estudio-de-procesos",
		def: "Análisis de cómo se hace realmente el trabajo en una empresa, paso a paso, para medir dónde se pierde tiempo y qué tareas pueden automatizarse.",
		link: "/estudio-de-procesos/",
	},
	{
		term: "Flujo de trabajo (workflow)",
		id: "flujo-de-trabajo",
		def: "Secuencia de pasos, automáticos o manuales, que sigue una tarea desde que empieza hasta que termina: quién hace qué, en qué orden y con qué condiciones.",
	},
	{
		term: "IA generativa",
		id: "ia-generativa",
		def: "Tipo de inteligencia artificial capaz de producir contenido nuevo —texto, imágenes, código— a partir de instrucciones. En la empresa se usa sobre todo para leer, resumir, clasificar y redactar.",
		link: "/soluciones/inteligencia-artificial/",
	},
	{
		term: "Integración de sistemas",
		id: "integracion-de-sistemas",
		def: "Conexión entre dos o más programas para que compartan datos automáticamente, de modo que la información se introduzca una sola vez.",
		link: "/soluciones/integracion-de-sistemas/",
	},
	{
		term: "Inteligencia artificial (IA)",
		id: "inteligencia-artificial",
		def: "Conjunto de técnicas que permiten a un programa realizar tareas que normalmente requieren inteligencia humana, como entender lenguaje, reconocer patrones o tomar decisiones a partir de datos.",
		link: "/consultoria-ia/",
	},
	{
		term: "Machine learning",
		id: "machine-learning",
		def: "Rama de la IA en la que un modelo aprende patrones a partir de datos históricos, en lugar de seguir reglas escritas a mano, para predecir o clasificar casos nuevos. En español, aprendizaje automático.",
		link: "/soluciones/analisis-de-datos/",
	},
	{
		term: "MCP (Model Context Protocol)",
		id: "mcp",
		def: "Protocolo abierto que estandariza cómo un modelo de IA se conecta a herramientas y fuentes de datos externas. Permite que un asistente consulte y opere un programa de la empresa de forma controlada.",
	},
	{
		term: "Modelo de lenguaje (LLM)",
		id: "modelo-de-lenguaje",
		def: "Modelo de IA entrenado con grandes cantidades de texto para entender y generar lenguaje. Es el motor de los asistentes conversacionales y de los agentes de IA. LLM son las siglas de large language model.",
	},
	{
		term: "OCR",
		id: "ocr",
		def: "Siglas de optical character recognition, reconocimiento óptico de caracteres. Tecnología que convierte la imagen de un documento en texto. Extrae las letras, pero no entiende qué significa cada dato.",
	},
	{
		term: "Orquestación",
		id: "orquestacion",
		def: "Coordinación automática de varias tareas y sistemas dentro de un mismo proceso: qué se ejecuta, en qué orden, qué pasa si algo falla y cuándo interviene una persona.",
	},
	{
		term: "Prompt",
		id: "prompt",
		def: "Instrucción que se da a un modelo de IA para que realice una tarea. En un sistema en producción, el prompt incluye el procedimiento que debe seguir, los límites y el formato de la respuesta.",
	},
	{
		term: "RAG",
		id: "rag",
		def: "Siglas de retrieval-augmented generation, generación aumentada por recuperación. Técnica en la que el modelo busca primero la información en los documentos de la empresa y responde a partir de ellos, citando la fuente. Reduce las respuestas inventadas.",
	},
	{
		term: "Revisión humana (human in the loop)",
		id: "revision-humana",
		def: "Diseño en el que la IA prepara o propone y una persona revisa y aprueba antes de que la acción tenga efecto. Se aplica en los pasos donde un error tendría consecuencias.",
	},
	{
		term: "RPA",
		id: "rpa",
		def: "Siglas de robotic process automation, automatización robótica de procesos. Técnica que imita los clics y las teclas de una persona para operar programas que no ofrecen API. Es útil con aplicaciones antiguas, pero frágil si la pantalla cambia.",
	},
	{
		term: "SaaS",
		id: "saas",
		def: "Siglas de software as a service, software como servicio. Programa que se usa por internet pagando una cuota periódica, sin instalarlo ni mantenerlo.",
	},
	{
		term: "Software a medida",
		id: "software-a-medida",
		def: "Programa diseñado y construido para el proceso concreto de una empresa, en lugar de adaptar la empresa a un programa genérico.",
		link: "/guias/software-a-medida-o-software-estandar/",
	},
	{
		term: "Token",
		id: "token",
		def: "Unidad en la que un modelo de lenguaje divide el texto, equivalente aproximadamente a un fragmento de palabra. El uso de los modelos de IA se factura por número de tokens procesados.",
	},
	{
		term: "Webhook",
		id: "webhook",
		def: "Aviso automático que un programa envía a otro en el momento en que ocurre algo, por ejemplo cuando entra un pedido. Permite reaccionar al instante sin consultar continuamente si hay novedades.",
	},
];
