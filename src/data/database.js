// Base de datos simulada expandida para Technova
let products = [
  {
    id: 1,
    name: "MacBook Pro 16\" M2 Pro",
    price: 2499990,
    category: "laptops",
    image: "/images/macbook-pro.jpg",
    description: "Laptop profesional con chip M2 Pro, 16GB RAM, 1TB SSD",
    inStock: true,
    stock: 15,
    features: ["Chip M2 Pro", "16GB RAM", "1TB SSD", "Pantalla Retina 16\"", "32-core GPU"],
    isFeatured: true
  },
  {
    id: 2,
    name: "iPhone 15 Pro Max",
    price: 1499990,
    category: "smartphones",
    image: "/images/iphone15-pro.jpg",
    description: "iPhone flagship con cámara profesional y titanio",
    inStock: true,
    stock: 25,
    features: ["Cámara 48MP", "Chip A17 Pro", "5G", "Titanio", "Dynamic Island"],
    isFeatured: true
  },
  {
    id: 3,
    name: "Samsung Galaxy S24 Ultra",
    price: 1199990,
    category: "smartphones",
    image: "/images/galaxy-s24-ultra.jpg",
    description: "Android premium con IA integrada y S Pen",
    inStock: true,
    stock: 20,
    features: ["Pantalla Dynamic AMOLED", "Snapdragon 8 Gen 3", "512GB", "S Pen", "Cámara 200MP"],
    isFeatured: true
  },
  {
    id: 4,
    name: "PlayStation 5 Slim",
    price: 599990,
    category: "gaming",
    image: "/images/ps5-slim.jpg",
    description: "Consola de última generación con SSD ultra rápido",
    inStock: false,
    stock: 0,
    features: ["SSD 1TB", "4K 120fps", "Ray Tracing", "Compatibilidad PS4"],
    isFeatured: false
  },
  {
    id: 5,
    name: "AirPods Pro 2da Generación",
    price: 349990,
    category: "audio",
    image: "/images/airpods-pro2.jpg",
    description: "Audífonos inalámbricos con cancelación activa de ruido",
    inStock: true,
    stock: 30,
    features: ["Cancelación Activa", "Resistencia al Agua", "24h Batería", "Carga MagSafe"],
    isFeatured: true
  },
  {
    id: 6,
    name: "iPad Air M1",
    price: 799990,
    category: "tablets",
    image: "/images/ipad-air.jpg",
    description: "Tablet versátil para trabajo y creatividad",
    inStock: true,
    stock: 12,
    features: ["Chip M1", "Pantalla Liquid Retina", "Compatibilidad Apple Pencil", "5G"],
    isFeatured: false
  },
  {
    id: 7,
    name: "Nintendo Switch OLED",
    price: 399990,
    category: "gaming",
    image: "/images/switch-oled.jpg",
    description: "Consola híbrida con pantalla OLED mejorada",
    inStock: true,
    stock: 18,
    features: ["Pantalla OLED 7\"", "Modo TV y Portátil", "Joy-Con mejorados", "64GB almacenamiento"],
    isFeatured: false
  },
  {
    id: 8,
    name: "Sony WH-1000XM5",
    price: 429990,
    category: "audio",
    image: "/images/sony-xm5.jpg",
    description: "Audífonos over-ear con mejor cancelación de ruido",
    inStock: true,
    stock: 22,
    features: ["Cancelación de Ruido Pro", "30h batería", "Carga rápida", "Asistente de Voz"],
    isFeatured: true
  },
  {
    id: 9,
    name: "Dell XPS 13 Plus",
    price: 1599990,
    category: "laptops",
    image: "/images/dell-xps13.jpg",
    description: "Laptop ultraportátil con diseño innovador",
    inStock: true,
    stock: 8,
    features: ["Intel i7 13th Gen", "16GB RAM", "512GB SSD", "Pantalla 4K", "Touchbar"],
    isFeatured: false
  },
  {
    id: 10,
    name: "Samsung Galaxy Tab S9",
    price: 899990,
    category: "tablets",
    image: "/images/galaxy-tab-s9.jpg",
    description: "Tablet Android premium con S Pen incluido",
    inStock: true,
    stock: 14,
    features: ["Snapdragon 8 Gen 2", "Pantalla AMOLED", "S Pen incluido", "5G", "256GB"],
    isFeatured: false
  },
  {
    id: 11,
    name: "Google Pixel 8 Pro",
    price: 999990,
    category: "smartphones",
    image: "/images/pixel8-pro.jpg",
    description: "Smartphone Google con IA avanzada y cámara profesional",
    inStock: true,
    stock: 16,
    features: ["Tensor G3", "Cámara 50MP", "Android puro", "7 años updates", "Magic Editor"],
    isFeatured: true
  },
  {
    id: 12,
    name: "Apple Watch Series 9",
    price: 499990,
    category: "wearables",
    image: "/images/apple-watch9.jpg",
    description: "Reloj inteligente con chip S9 y double tap",
    inStock: true,
    stock: 25,
    features: ["Chip S9", "Double Tap", "Always-On Display", "GPS", "Resistente agua"],
    isFeatured: false
  }
];

let categories = [
  { 
    id: 1, 
    name: "Smartphones", 
    slug: "smartphones", 
    icon: "📱",
    description: "Los últimos smartphones y dispositivos móviles",
    productCount: 3
  },
  { 
    id: 2, 
    name: "Laptops", 
    slug: "laptops", 
    icon: "💻",
    description: "Laptops y computadoras portátiles para trabajo y gaming",
    productCount: 2
  },
  { 
    id: 3, 
    name: "Tablets", 
    slug: "tablets", 
    icon: "📟",
    description: "Tablets y dispositivos táctiles",
    productCount: 2
  },
  { 
    id: 4, 
    name: "Audio", 
    slug: "audio", 
    icon: "🎧",
    description: "Audífonos, parlantes y equipos de audio",
    productCount: 2
  },
  { 
    id: 5, 
    name: "Gaming", 
    slug: "gaming", 
    icon: "🎮",
    description: "Consolas, videojuegos y accesorios gaming",
    productCount: 2
  },
  { 
    id: 6, 
    name: "Wearables", 
    slug: "wearables", 
    icon: "⌚",
    description: "Relojes inteligentes y dispositivos wearables",
    productCount: 1
  },
  { 
    id: 7, 
    name: "Accesorios", 
    slug: "accesorios", 
    icon: "🔌",
    description: "Accesorios y periféricos para tus dispositivos",
    productCount: 0
  }
];

let users = [
  {
    id: 1,
    email: "admin@technova.com",
    password: "admin123",
    name: "Administrador Technova",
    role: "admin",
    avatar: "A",
    joinDate: "2024-01-01",
    address: {
      street: "Av. Principal 123",
      department: "Departamento 45",
      region: "Región Metropolitana",
      commune: "Santiago"
    }
  },
  {
    id: 2,
    email: "cliente@technova.com",
    password: "cliente123",
    name: "Cliente Demo",
    role: "customer",
    avatar: "C",
    joinDate: "2024-01-15",
    address: {
      street: "Calle Secundaria 456",
      department: "",
      region: "Valparaíso",
      commune: "Viña del Mar"
    }
  },
  {
    id: 3,
    email: "juan.perez@email.com",
    password: "juan123",
    name: "Juan Pérez",
    role: "customer",
    avatar: "J",
    joinDate: "2024-02-01",
    address: {
      street: "Los Alerces 789",
      department: "Casa 2",
      region: "Biobío",
      commune: "Concepción"
    }
  }
];

let orders = [
  {
    id: 1,
    orderNumber: "TECH-001",
    customer: {
      id: 2,
      nombre: "Cliente",
      apellido: "Demo",
      email: "cliente@technova.com",
      address: {
        street: "Calle Secundaria 456",
        department: "",
        region: "Valparaíso",
        commune: "Viña del Mar"
      }
    },
    items: [
      { productId: 2, name: "iPhone 15 Pro Max", price: 1499990, quantity: 1 },
      { productId: 5, name: "AirPods Pro 2da Generación", price: 349990, quantity: 1 }
    ],
    total: 1849980,
    orderDate: "2024-03-10T10:30:00Z",
    status: "completed",
    shippingAddress: {
      street: "Calle Secundaria 456",
      department: "",
      region: "Valparaíso",
      commune: "Viña del Mar"
    }
  },
  {
    id: 2,
    orderNumber: "TECH-002",
    customer: {
      id: 3,
      nombre: "Juan",
      apellido: "Pérez",
      email: "juan.perez@email.com",
      address: {
        street: "Los Alerces 789",
        department: "Casa 2",
        region: "Biobío",
        commune: "Concepción"
      }
    },
    items: [
      { productId: 1, name: "MacBook Pro 16\" M2 Pro", price: 2499990, quantity: 1 }
    ],
    total: 2499990,
    orderDate: "2024-03-12T14:20:00Z",
    status: "pending",
    shippingAddress: {
      street: "Los Alerces 789",
      department: "Casa 2",
      region: "Biobío",
      commune: "Concepción"
    }
  },
  {
    id: 3,
    orderNumber: "TECH-003",
    customer: {
      id: 2,
      nombre: "Cliente",
      apellido: "Demo",
      email: "cliente@technova.com",
      address: {
        street: "Calle Secundaria 456",
        department: "",
        region: "Valparaíso",
        commune: "Viña del Mar"
      }
    },
    items: [
      { productId: 8, name: "Sony WH-1000XM5", price: 429990, quantity: 2 },
      { productId: 12, name: "Apple Watch Series 9", price: 499990, quantity: 1 }
    ],
    total: 1359970,
    orderDate: "2024-03-15T09:15:00Z",
    status: "completed",
    shippingAddress: {
      street: "Calle Secundaria 456",
      department: "",
      region: "Valparaíso",
      commune: "Viña del Mar"
    }
  }
];

let cart = [];

// CRUD Operations - Products
export const getProducts = () => [...products];
export const getFeaturedProducts = () => products.filter(product => product.isFeatured);
export const getProductById = (id) => products.find(product => product.id === parseInt(id));
export const getProductsByCategory = (categorySlug) => products.filter(product => product.category === categorySlug);
export const searchProducts = (query) => products.filter(product => 
  product.name.toLowerCase().includes(query.toLowerCase()) ||
  product.description.toLowerCase().includes(query.toLowerCase()) ||
  product.category.toLowerCase().includes(query.toLowerCase())
);

export const addProduct = (productData) => {
  const newProduct = {
    id: Math.max(...products.map(p => p.id)) + 1,
    ...productData,
    inStock: productData.stock > 0
  };
  products.push(newProduct);
  
  // Actualizar contador de productos en la categoría
  const category = categories.find(cat => cat.slug === productData.category);
  if (category) {
    category.productCount = getProductsByCategory(category.slug).length;
  }
  
  return newProduct;
};

export const updateProduct = (id, productData) => {
  const index = products.findIndex(product => product.id === parseInt(id));
  if (index !== -1) {
    const oldCategory = products[index].category;
    const newCategory = productData.category;
    
    products[index] = { 
      ...products[index], 
      ...productData,
      inStock: productData.stock > 0
    };
    
    // Actualizar contadores de categorías si cambió la categoría
    if (oldCategory !== newCategory) {
      const oldCat = categories.find(cat => cat.slug === oldCategory);
      const newCat = categories.find(cat => cat.slug === newCategory);
      
      if (oldCat) oldCat.productCount = getProductsByCategory(oldCategory).length;
      if (newCat) newCat.productCount = getProductsByCategory(newCategory).length;
    }
    
    return products[index];
  }
  return null;
};

export const deleteProduct = (id) => {
  const product = products.find(p => p.id === parseInt(id));
  if (product) {
    const category = categories.find(cat => cat.slug === product.category);
    products = products.filter(product => product.id !== parseInt(id));
    
    // Actualizar contador de productos en la categoría
    if (category) {
      category.productCount = getProductsByCategory(category.slug).length;
    }
  }
  return true;
};

// Categories CRUD
export const getCategories = () => [...categories];
export const getCategoryBySlug = (slug) => categories.find(category => category.slug === slug);

export const addCategory = (categoryData) => {
  const newCategory = {
    id: Math.max(...categories.map(c => c.id)) + 1,
    ...categoryData,
    productCount: 0
  };
  categories.push(newCategory);
  return newCategory;
};

export const updateCategory = (id, categoryData) => {
  const index = categories.findIndex(category => category.id === parseInt(id));
  if (index !== -1) {
    categories[index] = { ...categories[index], ...categoryData };
    return categories[index];
  }
  return null;
};

export const deleteCategory = (id) => {
  categories = categories.filter(category => category.id !== parseInt(id));
  return true;
};

// User Operations
export const authenticateUser = (email, password) => {
  return users.find(user => user.email === email && user.password === password);
};

export const createUser = (userData) => {
  const newUser = {
    id: Math.max(...users.map(u => u.id)) + 1,
    ...userData,
    role: 'customer',
    avatar: userData.name ? userData.name.charAt(0).toUpperCase() : 'U',
    joinDate: new Date().toISOString(),
    address: {}
  };
  users.push(newUser);
  return newUser;
};

export const updateUser = (id, userData) => {
  const index = users.findIndex(user => user.id === parseInt(id));
  if (index !== -1) {
    users[index] = { ...users[index], ...userData };
    return users[index];
  }
  return null;
};

export const getUsers = () => [...users];
export const getUserById = (id) => users.find(user => user.id === parseInt(id));

// Cart Operations
export const getCart = () => [...cart];
export const getCartItemsCount = () => cart.reduce((total, item) => total + item.quantity, 0);

export const addToCart = (productId, quantity = 1) => {
  const product = getProductById(productId);
  if (!product || !product.inStock) return null;

  const existingItem = cart.find(item => item.productId === parseInt(productId));
  
  if (existingItem) {
    existingItem.quantity += quantity;
  } else {
    cart.push({
      id: Math.max(0, ...cart.map(item => item.id)) + 1,
      productId: parseInt(productId),
      quantity,
      addedAt: new Date().toISOString()
    });
  }
  
  return cart;
};

export const updateCartItem = (itemId, quantity) => {
  const item = cart.find(item => item.id === parseInt(itemId));
  if (item) {
    if (quantity <= 0) {
      cart = cart.filter(item => item.id !== parseInt(itemId));
    } else {
      item.quantity = quantity;
    }
  }
  return cart;
};

export const removeFromCart = (itemId) => {
  cart = cart.filter(item => item.id !== parseInt(itemId));
  return cart;
};

export const clearCart = () => {
  cart = [];
  return cart;
};

// Order Operations
export const getOrders = () => [...orders];

export const getOrderById = (id) => {
  return orders.find(order => order.id === parseInt(id));
};

export const addOrder = (orderData) => {
  const newOrder = {
    id: Math.max(...orders.map(o => o.id)) + 1,
    orderNumber: `TECH-${String(orders.length + 1).padStart(3, '0')}`,
    ...orderData,
    orderDate: new Date().toISOString(),
    status: 'pending'
  };
  orders.push(newOrder);
  return newOrder;
};

export const updateOrderStatus = (id, status) => {
  const order = orders.find(order => order.id === parseInt(id));
  if (order) {
    order.status = status;
    order.updatedAt = new Date().toISOString();
    return order;
  }
  return null;
};

// Admin Statistics
export const getAdminStats = () => {
  const totalRevenue = orders.reduce((sum, order) => sum + (order.total || 0), 0);
  const pendingOrders = orders.filter(order => order.status === 'pending').length;
  const completedOrders = orders.filter(order => order.status === 'completed').length;
  const cancelledOrders = orders.filter(order => order.status === 'cancelled').length;

  return {
    totalProducts: products.length,
    totalOrders: orders.length,
    totalUsers: users.length,
    totalRevenue,
    pendingOrders,
    completedOrders,
    cancelledOrders,
    averageOrderValue: orders.length > 0 ? totalRevenue / orders.length : 0
  };
};

// Inicializar contadores de productos por categoría
export const initializeCategoryCounts = () => {
  categories.forEach(category => {
    category.productCount = getProductsByCategory(category.slug).length;
  });
};

// Inicializar los contadores al cargar
initializeCategoryCounts();