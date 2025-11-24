export interface Product {
  id: number;
  name: string;
  price: number;
  rating: number;
  sold: number;
  image: string;
  desc: string;
  storeRating: number;
  totalReviews: number;
  responseRate: string;

  seller: string;
  categoryId: number; // 2 = Kuliner, 4 = Fashion, dst
}

const dataProduk: Product[] = [
  {
    id: 1,
    name: "Batagor Spesial Bandung",
    price: 25000,
    rating: 4.9,
    sold: 1230,
    image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400",
    desc: "Batagor khas Bandung dengan bumbu kacang pedas manis. Gurih, renyah, dan cocok untuk semua usia.",
    storeRating: 4.8,
    totalReviews: 3400,
    responseRate: "98%",
    seller: "Batagor Ibu Eni",
    categoryId: 2, // Kuliner
  },
  {
    id: 2,
    name: "Kebaya Modern Bordir Premium",
    price: 450000,
    rating: 5.0,
    sold: 892,
    image: "https://images.unsplash.com/photo-1585487000160-6ebcfceb0d03?w=400",
    desc: "Kebaya modern bordir premium, nyaman dipakai, cocok untuk acara resmi atau pesta pernikahan.",
    storeRating: 4.9,
    totalReviews: 5100,
    responseRate: "96%",
    seller: "Kebaya Cantik Jaya",
    categoryId: 4, // Fashion
  },
  {
    id: 3,
    name: "Kopi Arabica Gayo 500g",
    price: 85000,
    rating: 4.8,
    sold: 2100,
    image: "https://img.lazcdn.com/g/p/5d024f9972fc9a1052dae93c14d03350.jpg_720x720q80.jpg",
    desc: "Kopi Arabica Gayo 500g, biji kopi pilihan dengan aroma khas dan rasa yang lembut.",
    storeRating: 4.7,
    totalReviews: 1900,
    responseRate: "92%",
    seller: "Kopi Gayo Premium",
    categoryId: 2,
  },
  {
    id: 4,
    name: "Meja Kayu Jati Minimalis",
    price: 1250000,
    rating: 4.7,
    sold: 456,
    image: "https://kursicafe.net/wp-content/uploads/2020/07/Meja-Jati-Solid-Tebal-Kaki-Besi-Alami.jpg",
    desc: "Meja Kayu Jati Minimalis, kokoh dan elegan. Cocok untuk ruang tamu atau kerja.",
    storeRating: 4.9,
    totalReviews: 2800,
    responseRate: "94%",
    seller: "Furniture Jati Asli",
    categoryId: 9, // Furniture
  },
  {
    id: 5,
    name: "Tas Anyaman Rotan Bali",
    price: 280000,
    rating: 4.8,
    sold: 789,
    image: "https://images.tokopedia.net/img/cache/700/o3syd0/1997/1/1/a251b523fe4d4813aaeafc1a25c6d8f8~.jpeg",
    desc: "Tas Anyaman Rotan Bali, handcrafted dengan detail unik. Ringan dan stylish.",
    storeRating: 4.8,
    totalReviews: 1500,
    responseRate: "97%",
    seller: "Rotan Bali Handmade",
    categoryId: 5, // Kerajinan
  },
  {
    id: 6,
    name: "Vitamin C 1000mg - Suplemen Daya Tahan Tubuh",
    price: 35000,
    rating: 4.9,
    sold: 5670,
    image: "https://down-id.img.susercontent.com/file/id-11134207-7r98s-lqsqjcxm0qx1db",
    desc: "Vitamin C 1000mg, suplemen harian untuk meningkatkan daya tahan tubuh.",
    storeRating: 4.9,
    totalReviews: 8700,
    responseRate: "99%",
    seller: "Apotek Sehat Selalu",
    categoryId: 6, // Kesehatan
  },
  {
    id: 7,
    name: "Benih Padi Ciherang 1kg",
    price: 750000,
    rating: 5.0,
    sold: 234,
    image: "https://cf.shopee.co.id/file/id-11134207-81ztp-mfc5ugoi3zf01d",
    desc: "Benih Padi Ciherang 1kg, kualitas unggul dengan tingkat pertumbuhan tinggi.",
    storeRating: 5.0,
    totalReviews: 1200,
    responseRate: "93%",
    seller: "Toko Tani Makmur",
    categoryId: 7, // Pertanian
  },
  {
    id: 8,
    name: "Laptop Gaming RTX 4060",
    price: 18500000,
    rating: 4.9,
    sold: 89,
    image: "https://images.unsplash.com/photo 1611078489935-2a3b2c4f8c9f?w=400",
    desc: "Laptop gaming performa tinggi dengan RTX 4060, cocok untuk gaming dan editing.",
    storeRating: 4.8,
    totalReviews: 560,
    responseRate: "95%",
    seller: "Gadget Pro Indonesia",
    categoryId: 8, // Elektronik
  },
];

export default dataProduk;

//instalasi nativewind
//instalasi gestures
//instalasi async-storage
// instalasi react-navigation dependencies
// instalasi react-navigation navigators
