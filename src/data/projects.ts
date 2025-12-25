import { Brain, Server, Zap, Database, Cloud, Cpu, Network, Boxes } from "lucide-react";

export type Project = {
  id: number;
  title: string;
  description: string;
  longDescription: string;
  icon: any;
  color: string;
  gradient: string;
  tags: string[];
  stats: {
    label: string;
    value: string;
    suffix?: string;
  }[];
  link?: string;
  image?: string;
};

export const projects: Project[] = [
  {
    id: 1,
    title: "Plataforma IA Detector de Patentes",
    description: "Clasificación automática de incidentes con IA y radares en tiempo real",
    longDescription: "Sistema de análisis inteligente para seguridad pública utilizando machine learning para clasificación automática de eventos capturados por radares y cámaras.",
    icon: Brain,
    color: "#00ff41",
    gradient: "from-green-500 to-emerald-600",
    tags: ["Python", "TensorFlow", "FastAPI", "PostgreSQL"],
    stats: [
      { label: "Usuarios Activos", value: "1000", suffix: "+" },
      { label: "Precisión IA", value: "95", suffix: "%" },
      { label: "Eventos/día", value: "50000", suffix: "+" },
    ],
  },
  {
    id: 2,
    title: "Backend IoT Escalable",
    description: "Arquitectura de alto rendimiento para procesamiento masivo de eventos IoT",
    longDescription: "Sistema distribuido para ingesta y procesamiento de millones de eventos por segundo desde dispositivos IoT, con análisis en tiempo real y almacenamiento optimizado.",
    icon: Server,
    color: "#00ccff",
    gradient: "from-cyan-500 to-blue-600",
    tags: ["Node.js", "Redis", "MongoDB", "Docker"],
    stats: [
      { label: "Eventos/seg", value: "10", suffix: "M" },
      { label: "Dispositivos", value: "5000", suffix: "+" },
      { label: "Uptime", value: "99.9", suffix: "%" },
    ],
  },
  {
    id: 3,
    title: "Automatización n8n Enterprise",
    description: "Workflows inteligentes para automatización de procesos empresariales",
    longDescription: "Plataforma de automatización avanzada con integración de múltiples servicios, procesamiento de datos y orquestación de workflows complejos para empresas.",
    icon: Zap,
    color: "#ff9500",
    gradient: "from-orange-500 to-red-600",
    tags: ["n8n", "Node.js", "PostgreSQL", "APIs"],
    stats: [
      { label: "Workflows", value: "100", suffix: "+" },
      { label: "Integraciones", value: "50", suffix: "+" },
      { label: "Ahorro/mes", value: "200", suffix: "h" },
    ],
  },
  {
    id: 4,
    title: "Sistema Multi-Tenant SaaS",
    description: "Plataforma SaaS escalable con aislamiento de datos por cliente",
    longDescription: "Arquitectura multi-tenant completa con gestión de suscripciones, facturación automática, y dashboard personalizado para cada organización.",
    icon: Cloud,
    color: "#a78bfa",
    gradient: "from-violet-500 to-purple-600",
    tags: ["Next.js", "NestJS", "PostgreSQL", "Stripe"],
    stats: [
      { label: "Organizaciones", value: "250", suffix: "+" },
      { label: "ARR", value: "500", suffix: "K" },
      { label: "Crecimiento", value: "150", suffix: "%" },
    ],
  },
  {
    id: 5,
    title: "Pipeline de Datos en Tiempo Real",
    description: "ETL y procesamiento de big data con arquitectura Lambda",
    longDescription: "Sistema de procesamiento de datos a gran escala utilizando arquitectura Lambda para batch y streaming, con visualización en tiempo real.",
    icon: Database,
    color: "#ec4899",
    gradient: "from-pink-500 to-rose-600",
    tags: ["Python", "Kafka", "Spark", "Airflow"],
    stats: [
      { label: "TB procesados", value: "10", suffix: "+" },
      { label: "Latencia", value: "100", suffix: "ms" },
      { label: "Pipelines", value: "30", suffix: "+" },
    ],
  },
  {
    id: 6,
    title: "API Gateway Microservicios",
    description: "Gateway unificado con rate limiting, auth y monitoreo",
    longDescription: "API Gateway centralizado para arquitectura de microservicios con autenticación OAuth2, rate limiting inteligente, circuit breaker y observabilidad completa.",
    icon: Network,
    color: "#22d3ee",
    gradient: "from-cyan-400 to-teal-600",
    tags: ["Kong", "Kubernetes", "Prometheus", "Grafana"],
    stats: [
      { label: "Requests/min", value: "1", suffix: "M" },
      { label: "Microservicios", value: "25", suffix: "+" },
      { label: "Disponibilidad", value: "99.99", suffix: "%" },
    ],
  },
];