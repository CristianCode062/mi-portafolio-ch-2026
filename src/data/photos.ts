// src/data/photos.ts
// Datos de fotos para DomeGallery

export interface PhotoItem {
  id: number;
  url: string;
  title: string;
  description?: string;
  category?: string;
  date?: string;
  tags?: string[];
  featured?: boolean;
}

// 🎨 REEMPLAZA ESTAS URLs CON TUS PROPIAS IMÁGENES
// Coloca tus imágenes en public/images/ y usa rutas como '/images/proyecto1.jpg'

export const photos: PhotoItem[] = [
  // Desarrollo Web
  {
    id: 1,
    url: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80',
    title: 'Dashboard Analytics',
    description: 'Sistema de análisis de datos en tiempo real con React y D3.js',
    category: 'desarrollo',
    date: '2024-12',
    tags: ['React', 'D3.js', 'TypeScript', 'Analytics'],
    featured: true
  },
  {
    id: 2,
    url: 'https://images.unsplash.com/photo-1551650975-87deedd944c3?w=800&q=80',
    title: 'E-commerce Platform',
    description: 'Plataforma de comercio electrónico completa con sistema de pagos',
    category: 'desarrollo',
    date: '2024-11',
    tags: ['Next.js', 'Stripe', 'PostgreSQL', 'Tailwind'],
    featured: true
  },
  {
    id: 3,
    url: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=800&q=80',
    title: 'CRM System',
    description: 'Sistema de gestión de clientes empresarial escalable',
    category: 'desarrollo',
    date: '2024-10',
    tags: ['Vue.js', 'Node.js', 'MongoDB', 'REST API']
  },
  {
    id: 4,
    url: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&q=80',
    title: 'Task Management App',
    description: 'Aplicación colaborativa de gestión de tareas tipo Trello',
    category: 'desarrollo',
    date: '2024-09',
    tags: ['React', 'Firebase', 'Real-time', 'Drag & Drop']
  },

  // Diseño UI/UX
  {
    id: 5,
    url: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&q=80',
    title: 'Brand Identity',
    description: 'Rediseño completo de identidad corporativa para startup tech',
    category: 'diseño',
    date: '2024-12',
    tags: ['Branding', 'Logo Design', 'Style Guide', 'Figma'],
    featured: true
  },
  {
    id: 6,
    url: 'https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?w=800&q=80',
    title: 'Mobile App UI',
    description: 'Diseño de interfaz para aplicación de finanzas personales',
    category: 'diseño',
    date: '2024-11',
    tags: ['UI Design', 'Mobile', 'Figma', 'Prototyping']
  },
  {
    id: 7,
    url: 'https://images.unsplash.com/photo-1609921212029-bb5a28e60960?w=800&q=80',
    title: 'Design System',
    description: 'Sistema de diseño empresarial con componentes reutilizables',
    category: 'diseño',
    date: '2024-10',
    tags: ['Design System', 'Components', 'Storybook', 'Documentation']
  },
  {
    id: 8,
    url: 'https://images.unsplash.com/photo-1559028012-481c04fa702d?w=800&q=80',
    title: 'Landing Page Design',
    description: 'Página de aterrizaje moderna para producto SaaS',
    category: 'diseño',
    date: '2024-09',
    tags: ['Landing Page', 'UX', 'Conversion', 'A/B Testing']
  },

  // Mobile Development
  {
    id: 9,
    url: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&q=80',
    title: 'Fitness Tracker App',
    description: 'Aplicación móvil para seguimiento de ejercicios y nutrición',
    category: 'mobile',
    date: '2024-12',
    tags: ['React Native', 'HealthKit', 'Firebase', 'Charts'],
    featured: true
  },
  {
    id: 10,
    url: 'https://images.unsplash.com/photo-1555774698-0b77e0d5fac6?w=800&q=80',
    title: 'Social Media App',
    description: 'Red social para fotógrafos con funciones de portfolio',
    category: 'mobile',
    date: '2024-11',
    tags: ['React Native', 'AWS S3', 'Social', 'Image Processing']
  },
  {
    id: 11,
    url: 'https://images.unsplash.com/photo-1551650975-87deedd944c3?w=800&q=80',
    title: 'Delivery App',
    description: 'App de entrega a domicilio con tracking en tiempo real',
    category: 'mobile',
    date: '2024-10',
    tags: ['Flutter', 'Google Maps', 'Real-time', 'Payments']
  },
  {
    id: 12,
    url: 'https://images.unsplash.com/photo-1526498460520-4c246339dccb?w=800&q=80',
    title: 'Music Streaming App',
    description: 'Plataforma de streaming de música con playlists personalizadas',
    category: 'mobile',
    date: '2024-09',
    tags: ['React Native', 'Audio', 'Recommendation', 'Offline']
  },

  // Backend & APIs
  {
    id: 13,
    url: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&q=80',
    title: 'Microservices Architecture',
    description: 'Arquitectura de microservicios escalable con Docker y Kubernetes',
    category: 'backend',
    date: '2024-12',
    tags: ['Node.js', 'Docker', 'Kubernetes', 'Microservices']
  },
  {
    id: 14,
    url: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=800&q=80',
    title: 'GraphQL API',
    description: 'API GraphQL con autenticación y autorización avanzada',
    category: 'backend',
    date: '2024-11',
    tags: ['GraphQL', 'Apollo', 'JWT', 'PostgreSQL']
  },
  {
    id: 15,
    url: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&q=80',
    title: 'Payment Gateway Integration',
    description: 'Integración completa de sistema de pagos multi-procesador',
    category: 'backend',
    date: '2024-10',
    tags: ['Stripe', 'PayPal', 'Webhooks', 'Security']
  },

  // Machine Learning & AI
  {
    id: 16,
    url: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&q=80',
    title: 'Image Recognition Model',
    description: 'Modelo de reconocimiento de imágenes con TensorFlow',
    category: 'ai',
    date: '2024-12',
    tags: ['TensorFlow', 'CNN', 'Python', 'Computer Vision'],
    featured: true
  },
  {
    id: 17,
    url: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=800&q=80',
    title: 'Chatbot con NLP',
    description: 'Asistente virtual inteligente con procesamiento de lenguaje natural',
    category: 'ai',
    date: '2024-11',
    tags: ['NLP', 'GPT', 'Python', 'Conversational AI']
  },
  {
    id: 18,
    url: 'https://images.unsplash.com/photo-1655720828018-edd2daec9349?w=800&q=80',
    title: 'Recommendation System',
    description: 'Sistema de recomendaciones personalizado con ML',
    category: 'ai',
    date: '2024-10',
    tags: ['Machine Learning', 'Collaborative Filtering', 'Python', 'scikit-learn']
  },

  // DevOps & Cloud
  {
    id: 19,
    url: 'https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?w=800&q=80',
    title: 'CI/CD Pipeline',
    description: 'Pipeline automatizado de integración y despliegue continuo',
    category: 'devops',
    date: '2024-12',
    tags: ['GitHub Actions', 'Docker', 'AWS', 'Automation']
  },
  {
    id: 20,
    url: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&q=80',
    title: 'Cloud Infrastructure',
    description: 'Infraestructura cloud escalable en AWS con Terraform',
    category: 'devops',
    date: '2024-11',
    tags: ['AWS', 'Terraform', 'IaC', 'CloudFormation']
  },
  {
    id: 21,
    url: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=800&q=80',
    title: 'Monitoring Dashboard',
    description: 'Sistema de monitoreo y alertas con Grafana y Prometheus',
    category: 'devops',
    date: '2024-10',
    tags: ['Grafana', 'Prometheus', 'Monitoring', 'Alerting']
  },

  // Blockchain & Web3
  {
    id: 22,
    url: 'https://images.unsplash.com/photo-1639762681057-408e52192e55?w=800&q=80',
    title: 'NFT Marketplace',
    description: 'Marketplace descentralizado para trading de NFTs',
    category: 'blockchain',
    date: '2024-12',
    tags: ['Solidity', 'Ethereum', 'Web3.js', 'IPFS']
  },
  {
    id: 23,
    url: 'https://images.unsplash.com/photo-1622630998477-20aa696ecb05?w=800&q=80',
    title: 'DeFi Protocol',
    description: 'Protocolo DeFi para staking y yield farming',
    category: 'blockchain',
    date: '2024-11',
    tags: ['Solidity', 'DeFi', 'Smart Contracts', 'Testing']
  },
  {
    id: 24,
    url: 'https://images.unsplash.com/photo-1642104704074-907c0698cbd9?w=800&q=80',
    title: 'DAO Platform',
    description: 'Plataforma de gobernanza descentralizada para comunidades',
    category: 'blockchain',
    date: '2024-10',
    tags: ['DAO', 'Governance', 'Voting', 'Web3']
  },

  // IoT & Hardware
  {
    id: 25,
    url: 'https://images.unsplash.com/photo-1558346490-a72e53ae2d4f?w=800&q=80',
    title: 'Smart Home System',
    description: 'Sistema domótico completo con control por voz',
    category: 'iot',
    date: '2024-12',
    tags: ['IoT', 'Raspberry Pi', 'MQTT', 'Home Assistant']
  },
  {
    id: 26,
    url: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&q=80',
    title: 'Industrial Monitoring',
    description: 'Sistema de monitoreo industrial con sensores IoT',
    category: 'iot',
    date: '2024-11',
    tags: ['Industrial IoT', 'Sensors', 'Real-time', 'Analytics']
  },

  // Fotografía & Media
  {
    id: 27,
    url: 'https://images.unsplash.com/photo-1542831371-29b0f74f9713?w=800&q=80',
    title: 'Video Editing Suite',
    description: 'Editor de video web con efectos y transiciones',
    category: 'media',
    date: '2024-12',
    tags: ['WebGL', 'Video Processing', 'FFmpeg', 'Canvas']
  },
  {
    id: 28,
    url: 'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=800&q=80',
    title: 'Photo Gallery CMS',
    description: 'Sistema de gestión de galerías fotográficas profesional',
    category: 'media',
    date: '2024-11',
    tags: ['CMS', 'Image Optimization', 'CDN', 'Lazy Loading']
  },

  // Data Science
  {
    id: 29,
    url: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80',
    title: 'Data Visualization Platform',
    description: 'Plataforma de visualización interactiva de big data',
    category: 'data',
    date: '2024-12',
    tags: ['D3.js', 'Python', 'Pandas', 'Interactive Charts'],
    featured: true
  },
  {
    id: 30,
    url: 'https://images.unsplash.com/photo-1543286386-713bdd548da4?w=800&q=80',
    title: 'Predictive Analytics',
    description: 'Sistema de análisis predictivo para e-commerce',
    category: 'data',
    date: '2024-11',
    tags: ['Python', 'Machine Learning', 'Forecasting', 'Business Intelligence']
  }
];

// ========================
// FUNCIONES HELPER
// ========================

/**
 * Obtener fotos por categoría
 */
export const getPhotosByCategory = (category: string): PhotoItem[] => {
  return photos.filter(photo => photo.category === category);
};

/**
 * Obtener todas las categorías únicas
 */
export const getCategories = (): string[] => {
  const categories = photos.map(photo => photo.category || 'otros');
  return Array.from(new Set(categories)).sort();
};

/**
 * Obtener fotos por tag
 */
export const getPhotosByTag = (tag: string): PhotoItem[] => {
  return photos.filter(photo => 
    photo.tags?.some(t => t.toLowerCase().includes(tag.toLowerCase()))
  );
};

/**
 * Obtener todos los tags únicos
 */
export const getAllTags = (): string[] => {
  const allTags = photos.flatMap(photo => photo.tags || []);
  return Array.from(new Set(allTags)).sort();
};

/**
 * Buscar fotos por texto
 */
export const searchPhotos = (query: string): PhotoItem[] => {
  const lowerQuery = query.toLowerCase();
  return photos.filter(photo => 
    photo.title.toLowerCase().includes(lowerQuery) ||
    photo.description?.toLowerCase().includes(lowerQuery) ||
    photo.category?.toLowerCase().includes(lowerQuery) ||
    photo.tags?.some(tag => tag.toLowerCase().includes(lowerQuery))
  );
};

/**
 * Obtener fotos destacadas
 */
export const getFeaturedPhotos = (): PhotoItem[] => {
  return photos.filter(photo => photo.featured === true);
};

/**
 * Obtener fotos recientes (últimos N meses)
 */
export const getRecentPhotos = (months: number = 3): PhotoItem[] => {
  const now = new Date();
  const cutoffDate = new Date(now.setMonth(now.getMonth() - months));
  
  return photos.filter(photo => {
    if (!photo.date) return false;
    const photoDate = new Date(photo.date);
    return photoDate >= cutoffDate;
  }).sort((a, b) => {
    const dateA = new Date(a.date || '');
    const dateB = new Date(b.date || '');
    return dateB.getTime() - dateA.getTime();
  });
};

/**
 * Agrupar fotos por categoría
 */
export const groupPhotosByCategory = (): Record<string, PhotoItem[]> => {
  return photos.reduce((acc, photo) => {
    const category = photo.category || 'otros';
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(photo);
    return acc;
  }, {} as Record<string, PhotoItem[]>);
};

/**
 * Obtener estadísticas de la galería
 */
export const getGalleryStats = () => {
  return {
    totalPhotos: photos.length,
    categories: getCategories().length,
    tags: getAllTags().length,
    featured: getFeaturedPhotos().length,
    byCategory: Object.entries(groupPhotosByCategory()).map(([category, items]) => ({
      category,
      count: items.length
    }))
  };
};

/**
 * Obtener foto por ID
 */
export const getPhotoById = (id: number): PhotoItem | undefined => {
  return photos.find(photo => photo.id === id);
};

/**
 * Obtener fotos aleatorias
 */
export const getRandomPhotos = (count: number = 6): PhotoItem[] => {
  const shuffled = [...photos].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
};

// ========================
// MAPEOS DE CATEGORÍAS
// ========================

export const categoryLabels: Record<string, string> = {
  desarrollo: '💻 Desarrollo',
  diseño: '🎨 Diseño',
  mobile: '📱 Mobile',
  backend: '⚙️ Backend',
  ai: '🤖 AI/ML',
  devops: '🚀 DevOps',
  blockchain: '⛓️ Blockchain',
  iot: '🔌 IoT',
  media: '🎬 Media',
  data: '📊 Data Science'
};

export const getCategoryLabel = (category: string): string => {
  return categoryLabels[category] || category;
};