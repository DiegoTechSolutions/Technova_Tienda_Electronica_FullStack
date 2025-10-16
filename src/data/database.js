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
  { id: 1, name: "Smartphones", slug: "smartphones", image: "/images/category-smartphones.jpg" },
  { id: 2, name: "Laptops", slug: "laptops", image: "/images/category-laptops.jpg" },
  { id: 3, name: "Tablets", slug: "tablets", image: "/images/category-tablets.jpg" },
  { id: 4, name: "Audio", slug: "audio", image: "/images/category-audio.jpg" },
  { id: 5, name: "Gaming", slug: "gaming", image: "/images/category-gaming.jpg" },
  { id: 6, name: "Wearables", slug: "wearables", image: "/images/category-wearables.jpg" },
  { id: 7, name: "Accesorios", slug: "accesorios", image: "/images/category-accesorios.jpg" }
];

let users = [
  {
    id: 1,
    email: "admin@technova.com",
    password: "admin123",
    name: "Administrador Technova",
    role: "admin",
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
    address: {
      street: "Calle Secundaria 456",
      department: "",
      region: "Valparaíso",
      commune: "Viña del Mar"
    }
  }
];

let orders = [];
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
  return newProduct;
};

export const updateProduct = (id, productData) => {
  const index = products.findIndex(product => product.id === parseInt(id));
  if (index !== -1) {
    products[index] = { 
      ...products[index], 
      ...productData,
      inStock: productData.stock > 0
    };
    return products[index];
  }
  return null;
};

export const deleteProduct = (id) => {
  products = products.filter(product => product.id !== parseInt(id));
  return true;
};

// Categories CRUD
export const getCategories = () => [...categories];
export const getCategoryBySlug = (slug) => categories.find(category => category.slug === slug);

export const addCategory = (categoryData) => {
  const newCategory = {
    id: Math.max(...categories.map(c => c.id)) + 1,
    ...categoryData
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
export const createOrder = (orderData) => {
  const newOrder = {
    id: Math.max(0, ...orders.map(o => o.id)) + 1,
    ...orderData,
    orderDate: new Date().toISOString(),
    status: 'pending',
    orderNumber: 'TECH-' + Date.now()
  };
  orders.push(newOrder);
  clearCart();
  return newOrder;
};

export const getOrders = () => [...orders];
export const getOrderById = (id) => orders.find(order => order.id === parseInt(id));
export const getOrdersByUserId = (userId) => orders.filter(order => order.userId === parseInt(userId));

export const updateOrderStatus = (orderId, status) => {
  const order = getOrderById(orderId);
  if (order) {
    order.status = status;
    return order;
  }
  return null;
};

// Admin Statistics
export const getAdminStats = () => {
  return {
    totalProducts: products.length,
    totalOrders: orders.length,
    totalUsers: users.length,
    totalRevenue: orders.reduce((sum, order) => sum + order.total, 0),
    pendingOrders: orders.filter(order => order.status === 'pending').length
  };
};