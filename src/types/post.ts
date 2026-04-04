export interface Post {
  id: number | string;
  name: string;        // kim yozgan
  text: string;        // asosiy matn
  comment: string;     // izoh yoki sharh
  image: string;       // rasm URL yoki mahalliy fayl
  createdAt?: string;  // qachon yozilgan (ixtiyoriy)
}