const offersBannerList = [
  {
    image: require("../assets/images/slider/slider_1.jpg"),
  },
  {
    image: require("../assets/images/slider/slider_2.jpg"),
  },
  {
    image: require("../assets/images/slider/slider_3.jpg"),
  },
];




const workerList = [
    {
        name:"Electricty",
        image:'https://images.pexels.com/photos/3825581/pexels-photo-3825581.jpeg?auto=compress&cs=tinysrgb&w=600'
    },
    {
        name:"Plumbing",
        image:'https://media.istockphoto.com/id/1204813771/photo/male-worker-inspecting-valve.jpg?b=1&s=612x612&w=0&k=20&c=-Qc9czzynqy_laGthgdtI9brX1hdj5ff0k2eVX7ekqk='
    },
    {
        name:"Electricty",
        image:'https://images.pexels.com/photos/3825581/pexels-photo-3825581.jpeg?auto=compress&cs=tinysrgb&w=600'
    },
    {
        name:"Plumbing",
        image:'https://media.istockphoto.com/id/1204813771/photo/male-worker-inspecting-valve.jpg?b=1&s=612x612&w=0&k=20&c=-Qc9czzynqy_laGthgdtI9brX1hdj5ff0k2eVX7ekqk='
    },
    {
        name:"Carpentry",
        image:'https://images.pexels.com/photos/1249611/pexels-photo-1249611.jpeg?auto=compress&cs=tinysrgb&w=600'
    },
    {
        name:"Carpentry",
        image:'https://images.pexels.com/photos/1249611/pexels-photo-1249611.jpeg?auto=compress&cs=tinysrgb&w=600'
    },
    {
        name:"Plumbing",
        image:'https://media.istockphoto.com/id/1204813771/photo/male-worker-inspecting-valve.jpg?b=1&s=612x612&w=0&k=20&c=-Qc9czzynqy_laGthgdtI9brX1hdj5ff0k2eVX7ekqk='
    },
    {
        name:"Carpentry",
        image:'https://images.pexels.com/photos/1249611/pexels-photo-1249611.jpeg?auto=compress&cs=tinysrgb&w=600'
    },

]
const userReviews = [
  {
    userName: "محمد",
    userImage:"https://images.pexels.com/photos/8088685/pexels-photo-8088685.jpeg?auto=compress&cs=tinysrgb&w=600",
    review:"اليوم أول مرة أتعامل مع شركتكم لأعمال السباكة في منزلي. أشكركم على مستوى الخدمة الرائع. حيث زارني سباك ولأول مرة أجد عامل محترف وسريع جدا في أنجاز العمل المطلوب.",
  },
  {
    userName: " علي ليلى",
    userImage:"https://images.pexels.com/photos/8088685/pexels-photo-8088685.jpeg?auto=compress&cs=tinysrgb&w=600",
    review:
    "تجربة رائعة مع خدمات السباكة. الفني كان محترفًا وأنهى العمل بسرعة. سأوصي بهم للأصدقاء والعائلة.",
  },
  {
  userName: " محمود علي ",
  review: 
  "تجربة رائعة مع خدمات السباكة. الفني كان محترفًا وأنهى العمل بسرعة. سأوصي بهم للأصدقاء والعائلة.",
  userImage:"https://images.pexels.com/photos/8113893/pexels-photo-8113893.jpeg?auto=compress&cs=tinysrgb&w=600"
},
{
  userName: "احمد علي ",
  userImage:"https://images.pexels.com/photos/8088685/pexels-photo-8088685.jpeg?auto=compress&cs=tinysrgb&w=600",
    review:
      "ممتاز جداً. سباك محترف وودود. قام بإصلاح مشكلتي بشكل سريع وفعال. أنصح بشدة بهم.",
  },
];
const homeServices = [

  {
    category: "مكيفات",
    services: [
      { service: "  و مكافحه الحضرات الضارة مع ازالتها بالكامل تركيب المكيف مكافحه الحضرات الضارة مع ازالتها بالكامل تركيب المكيف"   , price: 150 },
      { service: "صيانة المكيف", price: 100 },
      { service: "تعبئة الغاز", price: 80 },
    ],
  },

  {
    category: "دهان",
    services: [
      { service: "دهان الجدران", price: 120 },
      { service: "دهان الأثاث", price: 80 },
      { service: "دهان السقف", price: 100 },
    ],
  },
  {
    category: "حدادة",
    services: [
      { service: "تصليح الحديد", price: 120 },
      { service: "تصنيع الأسوار", price: 250 },
      { service: "تركيب الشبابيك", price: 180 },
    ],
  },
  {
    category: "زجاج",
    services: [
      { service: "تركيب الزجاج", price: 200 },
      { service: "استبدال الزجاج المكسور", price: 80 },
      { service: "تلميع الزجاج", price: 60 },
    ],
  },
  {
    category: "بناء",
    services: [
      { service: "بناء منازل", price: 500 },
      { service: "بناء أسواق تجارية", price: 800 },
      { service: "بناء مباني سكنية", price: 400 },
    ],
  },
  {
    category: "فني تكييف",
    services: [
      { service: "تصليح أجهزة التكييف", price: 90 },
      { service: "صيانة وتنظيف التكييف", price: 70 },
      { service: "تمديد مخارج التكييف", price: 110 },
    ],
  },];




export {
  offersBannerList,
  workerList,
  userReviews,
  homeServices
};
