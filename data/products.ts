// Este archivo centraliza todos los productos
export const products = [
  {
    id: 1,
    name: "Nike TN 900",
    price: 39000,
    originalPrice: 45000,
    image: "/images/tnnegra.jpg",
    images: ["/images/tnnegra.jpg", "/images/tn900marron.jpg", "/images/nike_tn900.jpg", "/images/nike_tn900_tornasol.jpg"],
    // ← NUEVO: Videos del producto
    videos: [
      {
        url: "/videos/nike_tn900.mp4", // Video girando 360°
        title: "Vista 360°",
        thumbnail: "/images/nike_tn900.jpg",
      },
      {
        url: "/videos/nike_tn900.mp4", // Video caminando
        title: "En movimiento",
        thumbnail: "/images/nike_tn900.jpg",
      },
    ],
    rating: 4.8,
    reviews: 124,
    brand: "Nike",
    category: "running",
    gender: "hombre",
    badge: "Más vendido",
    description:
      "🔥 ¡Conseguí las exclusivas Nike TN 900 y llevá tu estilo al próximo nivel! Diseñadas para destacar en cada paso, las Nike TN 900 combinan un diseño agresivo y moderno con la legendaria tecnología Tuned Air, brindándote máxima comodidad, rebote y resistencia. Con detalles premium y una silueta que no pasa desapercibida, son perfectas para romper la calle o marcar presencia donde vayas. 💥 Estilo urbano. Comodidad extrema. Actitud total. ¿Vas a dejar que se te escapen? 👟💨 Disponibles en talles limitados. ¡Consultá ahora!",
    features: [
      "Diseño clásico y elegante",
      "Materiales de alta calidad",
      "Suela antideslizante",
      "Comodidad todo el día",
    ],
    sizes: ["7", "7.5", "8", "8.5", "9", "9.5", "10", "10.5", "11", "11.5", "12"],
    colors: ["Negro", "Blanco", "Gris"],
    inStock: true,
  },
  {
    id: 2,
    name: "DC Net",
    price: 180,
    image: "/images/dc_net_negra.jpg",
    images: [
      "/images/dc_net_negra.jpg",
      "/images/dc_net_negra_2.jpg",
      "/images/dc_net_negra_3.jpg",
      "/images/dc_net_marron.jpg",
      "/images/dc_net_marron_1.jpg",
      "/images/dc_net_marron_2.jpg",
    ],
    // ← NUEVO: Videos del producto
    videos: [
      {
        url: "/videos/dc_net_marron.mp4", // Video corriendo
        title: "Demo de Running",
        thumbnail: "/images/dc_net_marron.jpg",
      },
      {
        url: "/videos/dc_net_negra_1.mp4", // Video corriendo
        title: "Demo de Running",
        thumbnail: "/images/dc_net_negra.jpg",
      },
      {
        url: "/videos/dc_net_negra_2.mp4", // Video corriendo
        title: "Demo de Running",
        thumbnail: "/images/dc_net_negra_1.jpg",
      },
    ],
    rating: 4.9,
    reviews: 89,
    brand: "Adidas",
    category: "running",
    gender: "mujer",
    badge: "Nuevo",
    description:
      "🔥 ¡Sentí la calle con las nuevas DC Net! Las DC Net son el equilibrio perfecto entre estilo skate clásico y comodidad total. Con su diseño robusto, suela de goma resistente y acolchado interior, te dan soporte todo el día —ya sea en la tabla o en la calle. Su look limpio y atemporal combina con cualquier outfit urbano. 💥 Estilo auténtico. Resistencia skater. Comodidad asegurada. ¿Listo para pisar fuerte con actitud DC? 👟💣¿Querés otra versión más corta, más técnica o más informal?",
    features: [
      "Tecnología de amortiguación avanzada",
      "Upper transpirable",
      "Suela de alto rendimiento",
      "Diseño aerodinámico",
    ],
    sizes: ["7", "7.5", "8", "8.5", "9", "9.5", "10", "10.5", "11", "11.5", "12"],
    colors: ["Negro", "Blanco", "Azul"],
    inStock: true,
  },
  {
    id: 3,
    name: "Zapatilla Urbana Retro",
    price: 170,
    originalPrice: 200,
    image: "/images/jordan-retro-1.jpg",
    images: [
      "/images/jordan-retro-1.jpg",
      "/images/jordan-retro-1-2.jpg",
      "/images/jordan-retro-1-3.jpg",
      "/images/jordan-retro-1-4.jpg",
    ],
    videos: [
      {
        url: "/videos/jordan-style.mp4", // Video de estilo urbano
        title: "Estilo Urbano",
        thumbnail: "/images/jordan-style-thumb.jpg",
      },
    ],
    rating: 4.7,
    reviews: 156,
    brand: "Jordan",
    category: "lifestyle",
    gender: "mujer",
    badge: "Oferta",
    description:
      "Zapatilla urbana con estilo retro que nunca pasa de moda. Perfecta para el día a día con un toque de nostalgia.",
    features: ["Diseño retro icónico", "Materiales premium", "Comodidad urbana", "Estilo atemporal"],
    sizes: ["7", "7.5", "8", "8.5", "9", "9.5", "10", "10.5", "11", "11.5", "12"],
    colors: ["Negro/Rojo", "Blanco", "Azul"],
    inStock: true,
  },
  {
    id: 4,
    name: "Zapatilla Casual Moderna",
    price: 110,
    image: "/images/puma-rs-x.jpg",
    images: ["/images/puma-rs-x.jpg", "/images/puma-rs-x-2.jpg", "/images/puma-rs-x-3.jpg", "/images/puma-rs-x-4.jpg"],
    videos: [
      {
        url: "/videos/puma-casual.mp4", // Video casual
        title: "Look Casual",
        thumbnail: "/images/puma-casual-thumb.jpg",
      },
    ],
    rating: 4.6,
    reviews: 67,
    brand: "Puma",
    category: "lifestyle",
    gender: "mujer",
    badge: "Tendencia",
    description: "Zapatilla casual moderna con diseño innovador. Ideal para quienes buscan comodidad y estilo único.",
    features: ["Diseño moderno y fresco", "Amortiguación cómoda", "Materiales de calidad", "Estilo versátil"],
    sizes: ["6", "6.5", "7", "7.5", "8", "8.5", "9", "9.5", "10"],
    colors: ["Multicolor", "Blanco", "Negro"],
    inStock: true,
  },
]

// Función para obtener productos destacados (primeros 4)
export const getFeaturedProducts = () => products.slice(0, 4)

// Función para obtener un producto por ID
export const getProductById = (id: number) => products.find((product) => product.id === id)

// Función para obtener todos los productos
export const getAllProducts = () => products
