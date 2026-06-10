// Imágenes de las subpáginas de soluciones (origen: Pexels, licencia libre).
// Cada página: hero opcional, leyenda del diagrama y hasta dos imágenes inline
// ancladas a secciones concretas (tras el problema / tras enfoque o beneficios).
import type { ImageMetadata } from "astro";

import erpHero from "../assets/solutions/erp-hero.jpg";
import erpCaos from "../assets/solutions/erp-caos-excel.jpg";
import erpControl from "../assets/solutions/erp-operacion-control.jpg";
import crmHero from "../assets/solutions/crm-hero.jpg";
import crmCaos from "../assets/solutions/crm-caos-notas.jpg";
import crmVision from "../assets/solutions/crm-vision-cliente.jpg";
import automationHero from "../assets/solutions/automation-hero.jpg";
import automationManual from "../assets/solutions/automation-trabajo-manual.jpg";
import automationOrq from "../assets/solutions/automation-orquestacion.jpg";
import processHero from "../assets/solutions/process-hero.jpg";
import processCaos from "../assets/solutions/process-caos-papeles.jpg";
import processMetricas from "../assets/solutions/process-metricas.jpg";
import aiHero from "../assets/solutions/ai-hero.jpg";
import aiPoc from "../assets/solutions/ai-poc-demo.jpg";
import aiProduccion from "../assets/solutions/ai-produccion.jpg";
import apiHero from "../assets/solutions/api-hero.jpg";
import apiCaos from "../assets/solutions/api-caos-integraciones.jpg";
import apiSeguridad from "../assets/solutions/api-seguridad-borde.jpg";
import dashboardsHero from "../assets/solutions/dashboards-hero.jpg";
import dashboardsCaos from "../assets/solutions/dashboards-informes-manuales.jpg";
import dashboardsDecision from "../assets/solutions/dashboards-decision.jpg";
import dataHero from "../assets/solutions/data-hero.jpg";
import dataCaos from "../assets/solutions/data-caos-cifras.jpg";
import dataPrediccion from "../assets/solutions/data-prediccion.jpg";
import cloudHero from "../assets/solutions/cloud-hero.jpg";
import cloudLegacy from "../assets/solutions/cloud-legacy.jpg";
import cloudDevops from "../assets/solutions/cloud-devops.jpg";
import cyberHero from "../assets/solutions/cyber-hero.jpg";
import cyberIdentidad from "../assets/solutions/cyber-identidad-mfa.jpg";
import cyberSoc from "../assets/solutions/cyber-soc.jpg";
import consultingHero from "../assets/solutions/consulting-hero.jpg";
import consultingDecision from "../assets/solutions/consulting-decision.jpg";
import consultingRoadmap from "../assets/solutions/consulting-roadmap.jpg";

export type SolutionImage = { src: ImageMetadata; alt: string };

export type SolutionImages = {
	hero?: SolutionImage;
	diagramAlt: string;
	afterProblem?: SolutionImage;
	afterApproach?: SolutionImage;
	afterBenefits?: SolutionImage;
};

export const solutionImages: Record<string, SolutionImages> = {
	erp: {
		hero: {
			src: erpHero,
			alt: "Equipo de operaciones gestionando su empresa con un ERP a medida en una única pantalla",
		},
		diagramAlt:
			"Diagrama de un ERP a medida centralizando finanzas, compras, inventario, producción, ventas y RRHH sobre una única base de datos",
		afterProblem: {
			src: erpCaos,
			alt: "Escritorio caótico con hojas de cálculo y documentos: el coste oculto de operar sin ERP unificado",
		},
		afterBenefits: {
			src: erpControl,
			alt: "Gestión de inventario digitalizada con ERP a medida: stock y finanzas en tiempo real",
		},
	},
	crm: {
		hero: {
			src: crmHero,
			alt: "Equipo comercial trabajando coordinado con un CRM a medida",
		},
		diagramAlt:
			"Diagrama de CRM a medida: visión 360 grados del cliente compartida por ventas, marketing y soporte",
		afterProblem: {
			src: crmCaos,
			alt: "Comercial desbordado entre notas y hojas de cálculo por usar un CRM que no refleja su proceso de venta",
		},
		afterApproach: {
			src: crmVision,
			alt: "Equipo de atención al cliente consultando la ficha completa del cliente en un CRM a medida",
		},
	},
	automation: {
		hero: {
			src: automationHero,
			alt: "Automatización de procesos de negocio: sistema automatizado operando sin intervención manual",
		},
		diagramAlt:
			"Diagrama de workflow de automatización de procesos con validación automática, excepción y revisión humana",
		afterProblem: {
			src: automationManual,
			alt: "Trabajo manual repetitivo de entrada de datos entre sistemas antes de automatizar procesos",
		},
		afterApproach: {
			src: automationOrq,
			alt: "Monitorización y observabilidad de workflows automatizados en tiempo real",
		},
	},
	process: {
		hero: {
			src: processHero,
			alt: "Equipo mapeando y optimizando procesos de negocio sobre una pizarra",
		},
		diagramAlt:
			"Diagrama de optimización de procesos: de proceso manual en hojas de cálculo a flujo digital medible",
		afterProblem: {
			src: processCaos,
			alt: "Procesos de negocio heredados sin control: documentos y carpetas acumulados sin trazabilidad",
		},
		afterApproach: {
			src: processMetricas,
			alt: "Análisis de métricas de procesos de negocio optimizados con datos en tiempo real",
		},
	},
	ai: {
		hero: {
			src: aiHero,
			alt: "Interfaz de un LLM empresarial en pantalla: integración de IA en software de empresa",
		},
		diagramAlt:
			"Diagrama de arquitectura RAG empresarial: datos propios, LLM, guardrails y evaluación continua antes de llegar a la aplicación",
		afterProblem: {
			src: aiPoc,
			alt: "Prueba de concepto de IA presentada en demo que nunca llega a producción",
		},
		afterApproach: {
			src: aiProduccion,
			alt: "Modelos de IA en producción con MLOps, monitorización y evaluación continua",
		},
	},
	api: {
		hero: {
			src: apiHero,
			alt: "API Gateway: infraestructura de red para integrar sistemas con seguridad y escala",
		},
		diagramAlt:
			"Diagrama de API Gateway: web, móvil y partners entrando por una capa única con autenticación, rate limiting y logs hacia los servicios",
		afterProblem: {
			src: apiCaos,
			alt: "Integraciones punto a punto sin API Gateway: cableado caótico y seguridad duplicada",
		},
		afterApproach: {
			src: apiSeguridad,
			alt: "Seguridad centralizada de APIs: autenticación fuerte y control de acceso en el borde",
		},
	},
	dashboards: {
		hero: {
			src: dashboardsHero,
			alt: "Dashboard a medida con KPIs y métricas de negocio en tiempo real",
		},
		diagramAlt:
			"Diagrama de cuadro de mando a medida: datos de ERP, CRM y APIs unificados en un dashboard en tiempo real",
		afterProblem: {
			src: dashboardsCaos,
			alt: "Informes manuales con hojas de cálculo impresas: el coste de no tener un dashboard en tiempo real",
		},
		afterBenefits: {
			src: dashboardsDecision,
			alt: "Equipo directivo tomando decisiones con un cuadro de mando en tiempo real",
		},
	},
	data: {
		hero: {
			src: dataHero,
			alt: "Dashboard de análisis de datos con KPIs y gráficas para decidir con datos",
		},
		diagramAlt:
			"Diagrama de arquitectura de datos: fuentes, pipelines ETL, data warehouse como fuente única y activación en dashboards, APIs y forecasting",
		afterProblem: {
			src: dataCaos,
			alt: "Datos fragmentados en múltiples hojas de cálculo: cada departamento con una cifra distinta",
		},
		afterApproach: {
			src: dataPrediccion,
			alt: "Analítica predictiva: gráficos de tendencia y forecasting sobre datos de negocio",
		},
	},
	cloud: {
		hero: {
			src: cloudHero,
			alt: "Arquitectura cloud native: infraestructura moderna que escala con el negocio",
		},
		diagramAlt:
			"Diagrama de arquitectura cloud native multi-región con balanceador de carga y auto-escalado de contenedores",
		afterProblem: {
			src: cloudLegacy,
			alt: "Infraestructura heredada y hardware obsoleto que frena el crecimiento del negocio",
		},
		afterApproach: {
			src: cloudDevops,
			alt: "Despliegue continuo con infraestructura como código en una plataforma cloud native",
		},
	},
	cyber: {
		hero: {
			src: cyberHero,
			alt: "Ciberseguridad empresarial: autenticación fuerte con llave de seguridad para proteger identidad, datos e infraestructura",
		},
		diagramAlt:
			"Diagrama de defensa en capas: identidad con MFA en el centro, datos cifrados e infraestructura endurecida",
		afterProblem: {
			src: cyberIdentidad,
			alt: "Autenticación biométrica con huella dactilar protegiendo las identidades, el principal vector de ataque",
		},
		afterApproach: {
			src: cyberSoc,
			alt: "Consolas de monitorización de seguridad: detección y respuesta continua de amenazas",
		},
	},
	consulting: {
		hero: {
			src: consultingHero,
			alt: "Consultoría tecnológica: sesión de arquitectura y estrategia de software",
		},
		diagramAlt:
			"Diagrama del proceso de consultoría tecnológica: auditoría, arquitectura, roadmap y acompañamiento end-to-end",
		afterProblem: {
			src: consultingDecision,
			alt: "Decisión tecnológica difícil: elegir plataforma y arquitectura sin criterio de ingeniería",
		},
		afterApproach: {
			src: consultingRoadmap,
			alt: "Roadmap tecnológico ejecutable con fases priorizadas sobre un tablero de planificación",
		},
	},
};
