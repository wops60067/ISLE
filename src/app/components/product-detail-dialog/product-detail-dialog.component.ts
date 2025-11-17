import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CartService } from '../../services/cart.service';

export interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

@Component({
  selector: 'app-product-detail-dialog',
  imports: [CommonModule],
  templateUrl: './product-detail-dialog.component.html',
  styleUrl: './product-detail-dialog.component.css'
})

export class ProductDetailDialogComponent {
  // 模擬所有產品列表
  products = [
    {
      id: 1,
      name: '慕林 ｜ Mu Lin [30ml]',
      description: '柔甜的花果木香氣，杏桃花與梨的香氣交織，溫柔的橙花與白茶鋪陳出陽光庭園的氣息。',
      description_en: 'A tender floral-fruity scent of apricot blossom and pear — serene, luminous, and wrapped in soft woods and musk.',
      images: ['assets/img/logo.jpg'],
      structure: [
        'Top Notes：杏桃花、梨、橙花、Hedione',
        'Heart Notes：桃木、茉莉、桂花、白茶、雪松',
        'Base Notes：白檀香、麝香、香草、Cashmeran'
      ],
      usage: '香水 Perfume',
      price: 1000
    },
    {
      id: 2,
      name: '疏影 ｜ Shadow Trace [30ml]',
      description: '若有似無的東方幽香，花木氣息沉靜流轉，香氣隨時間漸隱，如月下花影般柔和而深遠。',
      description_en: 'A subtle oriental blend of flowers and woods — meditative, serene, and lingering like shadows under the moonlight.',
      images: ['assets/img/logo.PNG'],
      structure: [
        'Top Notes：茉莉花苞、桂花、青梅、Tea Molecule',
        'Heart Notes：白茶、雪松、竹葉、Ambergris Accord',
        'Base Notes：檀香、乳香、Ambroxan、Iso E Super、Smoke Wood Accord'
      ],
      usage: '香水 Perfume',
      price: 1000
    },
    {
      id: 3,
      name: '無聲 ｜ Silent Form [30ml]',
      description: '舊書與皮革封皮的氣息，靜謐而深沉。茶香與木質交錯出高級的沉穩感，像午後靜靜閱讀的時光。',
      description_en: 'The quiet scent of leather and black tea, deep and composed. Like old pages and worn bindings in a sunlit librar',
      images: ['assets/img/background.jpg'],
      structure: [
        'Top Notes：黑茶、佛手柑、苦橙分子',
        'Heart Notes：皮革 Accord、岩蘭草、雪松、檀香',
        'Base Notes：Ambroxan、廣藿香、菸草葉、麝香'
      ],
      usage: '香水 Perfume',
      price: 1000
    },
    {
      id: 4,
      name: '初雨 ｜ First Rain [30ml]',
      description:'雨後的第一口空氣，帶著柑橘與竹葉的清香。清透乾淨、富含呼吸感的綠意香調，像晨光下的第一場小雨。',
      description_en: 'The first breath after rain — crisp citrus and bamboo notes blend with green tea for a fresh, breathable brightness.',
      images: ['assets/img/logo.jpg'],
      structure: [
        'Top Notes：柑橘、青檸、葡萄柚、Calone、Aldehyde Soft',
        'Heart Notes：綠茶、竹葉、Petrichor Accord、Hedione',
        'Base Notes：Oakmoss、White Musk、Cedar、Ambroxan'
      ],
      usage: '香水 Perfume',
      price: 1000
    }
  ];
  

  images: string[] = [];
  currentImage = 0;

  id = 0;
  productName = '';
  description = '';
  description_en = '';
  structure:any[] = [];
  usage = '';
  price = 0;

  showStructure = false;
  showUsage = false;

  constructor(private route: ActivatedRoute,private service:CartService) {
    // 取得URL參數ID，查找對應產品
    const id = Number(this.route.snapshot.paramMap.get('id'));
    const found = this.products.find(p => p.id === id);
    if (found) {
      this.id = found.id
      this.productName = found.name;
      this.description = found.description;
      this.description_en = found.description_en;
      this.structure = found.structure;
      this.usage = found.usage;
      this.price = found.price;
      this.images = found.images;
    }
    window.scrollTo({ top: 0, behavior: 'auto' });
  }

  nextImage() { if (this.currentImage < this.images.length - 1) this.currentImage++; }
  prevImage() { if (this.currentImage > 0) this.currentImage--; }
  goToImage(idx: number) { this.currentImage = idx; }

  //加入購物車
  addCartItems() {
    const item: CartItem = {
      id: this.id,
      name: this.productName,
      price: this.price,
      quantity: 1
    };

    this.service.addToCart(item);
  }
}
