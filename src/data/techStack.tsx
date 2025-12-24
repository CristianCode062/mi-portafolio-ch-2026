import {
  SiReact,
  SiNextdotjs,
  SiTypescript,
  SiTailwindcss,
  SiNodedotjs,
  SiNestjs,
  SiPython,
  SiFastapi,
  SiPostgresql,
  SiMongodb,
  SiRedis,
  SiDocker,
  SiKubernetes,
  SiAmazon,
  SiOpenai,
  SiN8N,
  SiGithub,
  SiGit,
  SiGitlab,
  SiBitbucket,
  SiClickup,
  SiUbuntu,
  SiCentos,
  SiDebian,
  SiKalilinux,
  SiDjango,
  SiNodered,
  SiExpress,
  SiNpm,
  SiJavascript,
  SiPhp,
  SiLaravel,
  SiMysql,
  SiGraphql,
  SiElevenlabs,
} from "react-icons/si";
import { FaMicrosoft, FaWindows, FaCloud } from "react-icons/fa";
import { TbChartHistogram } from "react-icons/tb";
import type { ReactElement } from "react";

export type TechCategory = {
  title: string;
  items: {
    name: string;
    icon: ReactElement;
    color: string;
  }[];
};

export const techStack: TechCategory[] = [
  {
    title: "Frontend",
    items: [
      { name: "React", icon: <SiReact />, color: "#61DAFB" },
      { name: "Next.js", icon: <SiNextdotjs />, color: "#ffffff" },
      { name: "TypeScript", icon: <SiTypescript />, color: "#3178C6" },
      { name: "Tailwind", icon: <SiTailwindcss />, color: "#38BDF8" },
      { name: "JavaScript", icon: <SiJavascript />, color: "#F7DF1E" },
    ],
  },
  {
    title: "Backend",
    items: [
      { name: "Node.js", icon: <SiNodedotjs />, color: "#3C873A" },
      { name: "Express", icon: <SiExpress />, color: "#ffffff" },
      { name: "NestJS", icon: <SiNestjs />, color: "#E0234E" },
      { name: "Python", icon: <SiPython />, color: "#FFD43B" },
      { name: "FastAPI", icon: <SiFastapi />, color: "#009688" },
      { name: "Django", icon: <SiDjango />, color: "#092E20" },
      { name: "PHP", icon: <SiPhp />, color: "#777BB4" },
      { name: "Laravel", icon: <SiLaravel />, color: "#FF2D20" },
    ],
  },
  {
    title: "Base de Datos",
    items: [
      { name: "PostgreSQL", icon: <SiPostgresql />, color: "#336791" },
      { name: "MongoDB", icon: <SiMongodb />, color: "#4DB33D" },
      { name: "MySQL", icon: <SiMysql />, color: "#4479A1" },
      { name: "Redis", icon: <SiRedis />, color: "#DC382D" },
      { name: "GraphQL", icon: <SiGraphql />, color: "#E10098" },
    ],
  },
  {
    title: "Control de Versiones",
    items: [
      { name: "Git", icon: <SiGit />, color: "#F05032" },
      { name: "GitHub", icon: <SiGithub />, color: "#ffffff" },
      { name: "GitLab", icon: <SiGitlab />, color: "#FC6D26" },
      { name: "Bitbucket", icon: <SiBitbucket />, color: "#0052CC" },
    ],
  },
  {
    title: "DevOps & Cloud",
    items: [
      { name: "AWS", icon: <SiAmazon />, color: "#FF9900" },
      { name: "Azure", icon: <FaCloud />, color: "#0078D4" },
      { name: "Docker", icon: <SiDocker />, color: "#0DB7ED" },
      { name: "Kubernetes", icon: <SiKubernetes />, color: "#326CE5" },
      { name: "npm", icon: <SiNpm />, color: "#CB3837" },
    ],
  },
  {
    title: "Sistemas Operativos",
    items: [
      { name: "Ubuntu", icon: <SiUbuntu />, color: "#E95420" },
      { name: "CentOS", icon: <SiCentos />, color: "#262577" },
      { name: "Debian", icon: <SiDebian />, color: "#A81D33" },
      { name: "Kali Linux", icon: <SiKalilinux />, color: "#557C94" },
      { name: "Windows", icon: <FaWindows />, color: "#0078D6" },
    ],
  },
  {
    title: "Herramientas & IA",
    items: [
      { name: "OpenAI", icon: <SiOpenai />, color: "#10A37F" },
      { name: "ElevenLabs", icon: <SiElevenlabs />, color: "#6C5CE7" },
      { name: "n8n", icon: <SiN8N />, color: "#F97316" },
      { name: "Node-RED", icon: <SiNodered />, color: "#8F0000" },
      { name: "Power BI", icon: <TbChartHistogram />, color: "#F2C811" },
      { name: "ClickUp", icon: <SiClickup />, color: "#7B68EE" },
      { name: "Office", icon: <FaMicrosoft />, color: "#D83B01" },
    ],
  },
];