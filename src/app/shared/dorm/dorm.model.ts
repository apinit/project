export class Dorm {
  dormitoryID: string;
  name: string;
  price: number;
  address: string;
  tel: string;
  water: number;
  electric: number;
  url: string;
  length: number;
  factdorm = {
    carparking: {
      value: 'ที่จอดรถ',
      selected: false
    },
    camera: {
      value: 'กล้องวงจรปิด',
      selected: false
    },
    keycard: {
      value: 'ระบบความปลอดภัย(คีย์การ์ด)',
      selected: false
    },
    washing: {
      value: 'บริการเครื่องซักผ้า',
      selected: false
    }
  };

  factroom = {
    air: {
      value: 'เครื่องปรับอากาศ',
      selected: false
    },
    fan: {
      value: 'พัดลม',
      selected: false
    },
    internet: {
      value: 'อินเตอร์เน็ต(LAN) / WiFi',
      selected: false
    },
    cabletv: {
      value: 'เคเบิล ทีวี',
      selected: false
    },
    desk: {
      value: 'โต๊ะอ่านหนังสือ',
      selected: false
    },
    wardrobe: {
      value: 'ตู้เสื้อผ้า',
      selected: false
    },
    bed: {
      value: 'เตียง',
      selected: false
    },
    refrigerator: {
      value: 'ตู้เย็น',
      selected: false
    },
    waterheater: {
      value: 'เครื่องทำน้ำอุ่น',
      selected: false
     }
  };
}


