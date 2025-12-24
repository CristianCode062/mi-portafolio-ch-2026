export type EducationType = "degree" | "secondary" | "course";

export interface EducationItem {
  type: EducationType;
  title: string;
  institution: string;
  period: string;
  description: string;
}

export const education: EducationItem[] = [
  {
    type: "degree",
    title: "Ingeniería Informática",
    institution: "Universidad Santo Tomás",
    period: "2016 — 2021",
    description:
      "Formación profesional orientada al desarrollo de software, arquitectura de sistemas, bases de datos, redes, seguridad y gestión de proyectos tecnológicos.",
  },
  {
    type: "secondary",
    title: "Educación Media Técnico Profesional",
    institution: "Liceo Politécnico Holanda",
    period: "2010 — 2013",
    description:
      "Formación técnica con énfasis en computación, bases de programación y fundamentos tecnológicos.",
  },
  {
    type: "course",
    title: "Automatización e Inteligencia Artificial con n8n",
    institution: "n8n",
    period: "2025",
    description:
      "Diseño de flujos de automatización avanzada, integración de APIs, uso de IA aplicada y orquestación de procesos productivos.",
  },
];
