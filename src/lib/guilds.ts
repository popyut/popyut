type Guild = ProvinceGuild | CustomGuild;

interface ProvinceGuild {
  id: number;
  en: string;
  th: string;
  custom?: boolean;
  slug?: string;
  emoji?: string;
}

interface CustomGuild extends ProvinceGuild {
  id: number;
  custom: boolean;
  slug: string;
  emoji: string;
  en?: string;
}

export const guilds: Array<Guild> = [
  { en: 'Bangkok', th: 'กรุงเทพมหานคร' },
  { en: 'Samut Prakan', th: 'สมุทรปราการ' },
  { en: 'Nonthaburi', th: 'นนทบุรี' },
  { en: 'Pathum Thani', th: 'ปทุมธานี' },
  { en: 'Phra Nakhon Si Ayutthaya', th: 'พระนครศรีอยุธยา' },
  { en: 'Ang Thong', th: 'อ่างทอง' },
  { en: 'Lop Buri', th: 'ลพบุรี' },
  { en: 'Sing Buri', th: 'สิงห์บุรี' },
  { en: 'Chai Nat', th: 'ชัยนาท' },
  { en: 'Saraburi', th: 'สระบุรี' },
  { en: 'Chon Buri', th: 'ชลบุรี' },
  { en: 'Rayong', th: 'ระยอง' },
  { en: 'Chanthaburi', th: 'จันทบุรี' },
  { en: 'Trat', th: 'ตราด' },
  { en: 'Chachoengsao', th: 'ฉะเชิงเทรา' },
  { en: 'Prachin Buri', th: 'ปราจีนบุรี' },
  { en: 'Nakhon Nayok', th: 'นครนายก' },
  { en: 'Sa Kaeo', th: 'สระแก้ว' },
  { en: 'Nakhon Ratchasima', th: 'นครราชสีมา' },
  { en: 'Buri Ram', th: 'บุรีรัมย์' },
  { en: 'Surin', th: 'สุรินทร์' },
  { en: 'Si Sa Ket', th: 'ศรีสะเกษ' },
  { en: 'Ubon Ratchathani', th: 'อุบลราชธานี' },
  { en: 'Yasothon', th: 'ยโสธร' },
  { en: 'Chaiyaphum', th: 'ชัยภูมิ' },
  { en: 'Amnat Charoen', th: 'อำนาจเจริญ' },
  { en: 'Bueng Kan', th: 'บึงกาฬ' },
  { en: 'Nong Bua Lam Phu', th: 'หนองบัวลำภู' },
  { en: 'Khon Kaen', th: 'ขอนแก่น' },
  { en: 'Udon Thani', th: 'อุดรธานี' },
  { en: 'Loei', th: 'เลย' },
  { en: 'Nong Khai', th: 'หนองคาย' },
  { en: 'Maha Sarakham', th: 'มหาสารคาม' },
  { en: 'Roi Et', th: 'ร้อยเอ็ด' },
  { en: 'Kalasin', th: 'กาฬสินธุ์' },
  { en: 'Sakon Nakhon', th: 'สกลนคร' },
  { en: 'Nakhon Phanom', th: 'นครพนม' },
  { en: 'Mukdahan', th: 'มุกดาหาร' },
  { en: 'Chiang Mai', th: 'เชียงใหม่' },
  { en: 'Lamphun', th: 'ลำพูน' },
  { en: 'Lampang', th: 'ลำปาง' },
  { en: 'Uttaradit', th: 'อุตรดิตถ์' },
  { en: 'Phrae', th: 'แพร่' },
  { en: 'Nan', th: 'น่าน' },
  { en: 'Phayao', th: 'พะเยา' },
  { en: 'Chiang Rai', th: 'เชียงราย' },
  { en: 'Mae Hong Son', th: 'แม่ฮ่องสอน' },
  { en: 'Nakhon Sawan', th: 'นครสวรรค์' },
  { en: 'Uthai Thani', th: 'อุทัยธานี' },
  { en: 'Kamphaeng Phet', th: 'กำแพงเพชร' },
  { en: 'Tak', th: 'ตาก' },
  { en: 'Sukhothai', th: 'สุโขทัย' },
  { en: 'Phitsanulok', th: 'พิษณุโลก' },
  { en: 'Phichit', th: 'พิจิตร' },
  { en: 'Phetchabun', th: 'เพชรบูรณ์' },
  { en: 'Ratchaburi', th: 'ราชบุรี' },
  { en: 'Kanchanaburi', th: 'กาญจนบุรี' },
  { en: 'Suphan Buri', th: 'สุพรรณบุรี' },
  { en: 'Nakhon Pathom', th: 'นครปฐม' },
  { en: 'Samut Sakhon', th: 'สมุทรสาคร' },
  { en: 'Samut Songkhram', th: 'สมุทรสงคราม' },
  { en: 'Phetchaburi', th: 'เพชรบุรี' },
  { en: 'Prachuap Khiri Khan', th: 'ประจวบคีรีขันธ์' },
  { en: 'Nakhon Si Thammarat', th: 'นครศรีธรรมราช' },
  { en: 'Krabi', th: 'กระบี่' },
  { en: 'Phangnga', th: 'พังงา' },
  { en: 'Phuket', th: 'ภูเก็ต' },
  { en: 'Surat Thani', th: 'สุราษฎร์ธานี' },
  { en: 'Ranong', th: 'ระนอง' },
  { en: 'Chumphon', th: 'ชุมพร' },
  { en: 'Songkhla', th: 'สงขลา' },
  { en: 'Satun', th: 'สตูล' },
  { en: 'Trang', th: 'ตรัง' },
  { en: 'Phatthalung', th: 'พัทลุง' },
  { en: 'Pattani', th: 'ปัตตานี' },
  { en: 'Yala', th: 'ยะลา' },
  { en: 'Narathiwat', th: 'นราธิวาส' },
  {
    // 78
    custom: true,
    th: 'Hatyai Call Out',
    emoji: '🍗',
    slug: 'hatyai_call_out',
  },
  {
    // 79
    custom: true,
    th: '9ทุน',
    emoji: '😎',
    slug: '9tun',
  },
  {
    // 80
    custom: true,
    th: 'Onlyfans TH',
    emoji: '💸',
    slug: 'onlyfans_th',
  },
  {
    // 81
    custom: true,
    th: 'จอยอย่าทิ้งพี่',
    emoji: '🥺',
    slug: 'จอยอย่าทิ้งพี่',
  },
  {
    // 82
    custom: true,
    th: 'เดนหนีทรีโอยุด',
    emoji: '🥵',
    slug: 'เดนหนีทรีโอยุด',
  },
  {
    // 83
    custom: true,
    th: 'เสี่ยนิก จงเจริญ',
    emoji: '💦',
    slug: 'เสี่ยนิก_จงเจริญ',
  },
  {
    // 84
    custom: true,
    th: 'Republic of ████████',
    emoji: '🗽',
    slug: 'republic_of_████████',
  },
  {
    // 85
    custom: true,
    th: 'ARMSOHANDSOME',
    emoji: '🍁',
    slug: 'armsohandsome',
  },
  {
    // 86
    custom: true,
    th: 'พี่น้องกะเหรี่ยงDragonOfSalween',
    emoji: '🐉',
    slug: 'dragon_of_salween',
  },
  {
    // 87
    custom: true,
    th: 'maehongson not salim',
    emoji: '❌',
    slug: 'maehongson_not_salim',
  },
].map((entry, idx) => ({ id: idx + 1, ...entry }));

export function getName({ custom, th, emoji }: Guild): string {
  if (custom) {
    return `${emoji} ${th}`;
  }

  return th;
}

export function getSlug({ custom, en, slug }: Guild): string {
  if (custom) {
    return slug;
  }

  const name = en.toLowerCase().split(' ').join('');
  const nameWithSuffix = name.replace(/[aeiou]$/, '') + 'ian';
  return nameWithSuffix;
}
