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
  },
  {
    id: 3,
    name: "Kopi Arabica Gayo 500g",
    price: 85000,
    rating: 4.8,
    sold: 2100,
    image: "https://img.lazcdn.com/g/p/5d024f9972fc9a1052dae93c14d03350.jpg_720x720q80.jpg",
    desc: "Kopi Arabica Gayo 500g, biji kopi pilihan dengan aroma khas dan rasa yang lembut, pas untuk penikmat kopi sejati.",
    storeRating: 4.7,
    totalReviews: 1900,
    responseRate: "92%",
  },
  {
    id: 4,
    name: "Meja Kayu Jati Minimalis",
    price: 1250000,
    rating: 4.7,
    sold: 456,
    image: "https://kursicafe.net/wp-content/uploads/2020/07/Meja-Jati-Solid-Tebal-Kaki-Besi-Alami.jpg",
    desc: "Meja Kayu Jati Minimalis, kokoh dan elegan. Desain modern yang cocok untuk ruang tamu atau ruang kerja.",
    storeRating: 4.9,
    totalReviews: 2800,
    responseRate: "94%",
  },
  {
    id: 5,
    name: "Tas Anyaman Rotan Bali",
    price: 280000,
    rating: 4.8,
    sold: 789,
    image: "https://images.tokopedia.net/img/cache/700/o3syd0/1997/1/1/a251b523fe4d4813aaeafc1a25c6d8f8~.jpeg",
    desc: "Tas Anyaman Rotan Bali, handcrafted dengan detail unik. Ringan, stylish, dan cocok untuk hangout atau jalan-jalan.",
    storeRating: 4.8,
    totalReviews: 1500,
    responseRate: "97%",
  },
  {
    id: 6,
    name: "Vitamin C 1000mg - Suplemen Daya Tahan Tubuh",
    price: 35000,
    rating: 4.9,
    sold: 5670,
    image: "https://down-id.img.susercontent.com/file/id-11134207-7r98s-lqsqjcxm0qx1db",
    desc: "Vitamin C 1000mg, suplemen harian untuk meningkatkan daya tahan tubuh. Praktis dan aman dikonsumsi.",
    storeRating: 4.9,
    totalReviews: 8700,
    responseRate: "99%",
  },
  {
    id: 7,
    name: "Benih Padi Ciherang 1kg",
    price: 750000,
    rating: 5.0,
    sold: 234,
    image: "https://cf.shopee.co.id/file/id-11134207-81ztp-mfc5ugoi3zf01d",
    desc: "Benih Padi Ciherang 1kg, kualitas unggul dengan tingkat pertumbuhan tinggi. Cocok untuk petani skala kecil hingga besar.",
    storeRating: 5.0,
    totalReviews: 1200,
    responseRate: "93%",
  },
  {
    id: 8,
    name: "Benih Padi Ciherang 1kg",
    price: 750000,
    rating: 5.0,
    sold: 234,
    image: "https://cf.shopee.co.id/file/id-11134207-81ztp-mfc5ugoi3zf01d",
    desc: "Benih Padi Ciherang 1kg, kualitas unggul dengan tingkat pertumbuhan tinggi. Cocok untuk petani skala kecil hingga besar.",
    storeRating: 5.0,
    totalReviews: 1200,
    responseRate: "93%",
  },
];

export default dataProduk;
