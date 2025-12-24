export interface VideoItem {
  id: number;
  title: string;
  description?: string;
  youtubeId: string;
  tags?: string[];
}

export const videos: VideoItem[] = [
  {
    id: 1,
    title: "Sistema IA en Producción",
    description: "Modelo de IA desplegado en entorno real con monitoreo",
    youtubeId: "qvntOkgKsss",
    tags: ["IA", "ML", "Producción"],
  },
  {
    id: 2,
    title: "Arquitectura Backend Escalable",
    description: "Backend preparado para alto tráfico",
    youtubeId: "4zmuycDHV2Y",
    tags: ["Backend", "Arquitectura"],
  },
  {
    id: 3,
    title: "Demo IoT Industrial",
    description: "Sensores y monitoreo industrial en tiempo real",
    youtubeId: "x5GML1FqcTQ",
    tags: ["IoT", "Industria"],
  },
  {
    id: 4,
    title: "Automatización Inteligente",
    description: "Workflows automáticos con lógica inteligente",
    youtubeId: "pC5W88NTJ1U",
    tags: ["Automatización", "IA"],
  },
  {
    id: 5,
    title: "Microservicios con NestJS",
    description: "Arquitectura moderna con NestJS",
    youtubeId: "t0D4OPcugyI",
    tags: ["NestJS", "Microservicios"],
  },
  {
    id: 6,
    title: "Seguridad y Monitoreo",
    description: "Observabilidad y alertas en producción",
    youtubeId: "Jet1HBBJyXg",
    tags: ["Seguridad", "Monitoring"],
  },
 
];
