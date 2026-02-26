import { SignUpDialog } from './components/sign-up-dialog/sign-up-dialog';
import { Router, RouterLink } from '@angular/router';
import { patchState, signalMethod, signalStore , withComputed, withMethods, withState } from '@ngrx/signals';
import { Product } from "./models/products";
import { computed , inject, signal } from '@angular/core';
import { produce } from 'immer';

import { Toaster } from './services/toaster';
import { CartItem } from './models/cart';
import { MatDialog } from '@angular/material/dialog';
import { SignInDialog } from './components/sign-in-dialog/sign-in-dialog';
import { SignInParams, User, SignUpParams } from './models/user';
import { Order } from './models/order';
import { withStorageSync } from '@angular-architects/ngrx-toolkit';
import { AddReviewParams, UserReview } from './models/user-review';

export type EcommerceState = {
  products: Product[];
  category: string;
  searchQuery: string;
  search: string;
  wishlistItems: Product[];
  cartItems: CartItem[];
  user: User | undefined;
  loading: boolean;
  selectedProductId: string | undefined;
  showReview: boolean;
}

export const EcommerceStore = signalStore(
  { providedIn: 'root' },
  withState({
    products: [
      {
    id: 'rd-001',
    name: 'فانوس رمضان نحاس مصري',
    description: 'فانوس رمضان تقليدي مصري بإضاءة دافئة تضيف بهجة للشهر الكريم',
    price: 550,
    imageUrl: 'https://m.media-amazon.com/images/I/61wZhd+XT8L._AC_SL1200_.jpg',
    rating: 4.9,
    reviewCount: 2,
    inStock: true,
    category: 'زينة وفوانيس',
    reviews: [
      { id: 'rev-1', productId: 'rd-001', userName: 'سارة أحمد', userImageUrl: 'https://i.pravatar.cc/150?img=1', rating: 5, title: 'تحفة بجد ✨', comment: 'الفانوس شكله أجمل من الصورة وجودته ممتازة جداً', reviewDate: new Date('2026-02-10') },
      { id: 'rev-2', productId: 'rd-001', userName: 'محمد علي', userImageUrl: 'https://i.pravatar.cc/150?img=2', rating: 4, title: 'جميل ومميز', comment: 'إضاءة دافئة ورائع للديكور الرمضاني', reviewDate: new Date('2026-02-12') }
    ]
  },
  { id: 'rd-002', name: 'زينة رمضان ورقية ملونة', description: 'زينة ورقية بألوان مبهجة لتعليقها في البيت أو الشرفة', price: 12, imageUrl: 'https://thumbs.dreamstime.com/b/festive-ramadan-decorations-lanterns-stars-images-festive-ramadan-decorations-lanterns-stars-328941716.jpg', rating: 4.7, reviewCount:6, inStock:true, category:'زينة وفوانيس' },
  { id: 'rd-003', name: 'سلسلة أنوار هلال ونجوم', description: 'لمبات LED بشكل هلال ونجوم لأجواء رمضانية ساحرة', price: 18, imageUrl: 'https://www.dhresource.com/webp/m/0x0/f2/albu/g10/M00/9E/C8/rBVaVl2_zCmAOXaXAABykQIYwB4984.jpg', rating: 4.8, reviewCount:6, inStock:true, category:'زينة وفوانيس',
    reviews:[
      { id:'r3', productId:'rd-003', userName:'نور علي', userImageUrl:'https://i.pravatar.cc/150?img=45', rating:5, title:'رمضان دخل البيت ✨', comment:'الإضاءة ناعمة ومبهجة جدًا، علقتها في الصالون وكل اللي دخل سألني جبتها منين.', reviewDate:new Date('2026-02-08') },
      { id:'r4', productId:'rd-003', userName:'ريم مصطفى', userImageUrl:'https://i.pravatar.cc/150?img=21', rating:4, title:'جميلة جدًا', comment:'شكلها شيك ومختلف عن الزينة التقليدية، مناسبة جدًا لجو رمضاني هادي.', reviewDate:new Date('2026-02-12') }
    ]
  },
  { id: 'rd-004', name: 'مفرش سفرة رمضاني مطرز', description: 'مفرش سفرة بزخارف شرقية يضيف روح رمضان للمائدة', price: 22, imageUrl: 'https://tse3.mm.bing.net/th/id/OIP.0gvT60ip3hPQ1Ip7lcuAZAHaEK?rs=1&pid=ImgDetMain&o=7&rm=3', rating:4.6, reviewCount:6, inStock:true, category:'زينة وفوانيس' },
  { id: 'rd-005', name: 'لوحة رمضان كريم خشب', description: 'لوحة خشبية محفور عليها رمضان كريم بتصميم أنيق', price:15, imageUrl:'https://i.etsystatic.com/32577944/r/il/28f9c1/4737504164/il_800x800.4737504164_7eh1.jpg', rating:4.5, reviewCount:6, inStock:true, category:'زينة وفوانيس' },
  { id: 'rd-006', name: 'فانوس أطفال مضيء', description: 'فانوس بلاستيك ملون للأطفال يضفي فرحة رمضان', price:10, imageUrl:'https://5.imimg.com/data5/ANDROID/Default/2023/9/342217746/CN/UO/FZ/128078104/product-jpeg-500x500.jpg', rating:4.8, reviewCount:6, inStock:true, category:'زينة وفوانيس',
    reviews:[
      { id:'r1', productId:'rd-006', userName:'سارة أحمد', userImageUrl:'https://i.pravatar.cc/150?img=32', rating:5, title:'تحفة بجد 😍', comment:'الفانوس خامته ممتازة وشكله شيك جدًا في الركنة. الإضاءة دافية ومريحة للعين، حسيته فعلاً أضاف جو رمضاني جميل في البيت.', reviewDate:new Date('2026-02-10') },
      { id:'r2', productId:'rd-006', userName:'محمد خالد', userImageUrl:'https://i.pravatar.cc/150?img=12', rating:4, title:'اختيار موفق', comment:'حجم الفانوس مناسب جدًا والخامة قوية. كنت متخوف من الجودة لكن طلع أحسن من الصورة.', reviewDate:new Date('2026-02-14') }
    ]
  },
  { id:'rd-007', name:'ستارة زينة رمضان', description:'ستارة ديكور هلال ونجوم لتزيين الحائط', price:135, imageUrl:'https://i5.walmartimages.com/seo/Modern-Ramadan-Eid-Lights-Moon-Star-Fishscale-Holiday-Moon-Star-Festival-Bright-LED-Curtain-Lights-Perfect-Birthdays-Holidays-Festive-Decorations-Bri_20bffa9f-f256-4b61-b20f-c5adfa318fb5.0d2e1f3ee85893b61dcb05123d1aab5a.jpeg', rating:4.6, reviewCount:6, inStock:true, category:'زينة وفوانيس' },
  { id:'rd-008', name:'ركن صلاة كامل', description:'سجادة صلاة مع مسبحة وغطاء مصحف بتصميم رمضاني', price:240, imageUrl:'https://i.etsystatic.com/49933631/r/il/fc5cc4/5710749964/il_600x600.5710749964_31id.jpg', rating:4.9, reviewCount:6, inStock:true, category:'زينة وفوانيس' },
  { id:'rd-009', name:'فانوس خشب يدوي', description:'فانوس خشبي مصري مصنوع يدويًا بإضاءة دافئة', price:175, imageUrl:'https://m.media-amazon.com/images/I/612+G17M0AL._AC_SL1500_.jpg', rating:4.7, reviewCount:6, inStock:true, category:'زينة وفوانيس' },
  { id:'rd-010', name:'زينة أهلاً رمضان', description:'لافتة أهلاً رمضان بألوان مبهجة', price:25, imageUrl:'https://i.pinimg.com/originals/2d/1a/25/2d1a25d47acc536d4350722abfc94783.jpg', rating:4.4, reviewCount:6, inStock:true, category:'زينة وفوانيس' },

  // -------- مذاق رمضان (10 منتجات) --------
  { id:'rf-001', name:'بلح سيوي فاخر', description:'تمر سيوي طبيعي مثالي للإفطار', price:150, imageUrl:'https://palmsiwa.com/wp-content/uploads/2020/03/IMG20200320140020-scaled.jpg', rating:4.9, reviewCount:6, inStock:true, category:'مذاق رمضان',
    reviews:[
      { id:'r5', productId:'rf-001', userName:'أحمد سامي', userImageUrl:'https://i.pravatar.cc/150?img=17', rating:5, title:'طعم فوق الممتاز', comment:'التمر طازة جدًا ومعبأ بطريقة شيك، طلبته هدية ووصل في معاده بالظبط.', reviewDate:new Date('2026-02-11') },
      { id:'r6', productId:'rf-001', userName:'منى إبراهيم', userImageUrl:'https://i.pravatar.cc/150?img=28', rating:5, title:'هيبقى طلب ثابت كل سنة', comment:'الجودة ممتازة والتغليف تحفة، حسيت إني بشتري حاجة premium فعلًا.', reviewDate:new Date('2026-02-16') }
    ]
  },
  { id:'rf-002', name:'قمر الدين سوري أصلي', description:'لفائف قمر الدين لتحضير عصير رمضان الشهير', price:30, imageUrl:'https://matjrah.online/images/1510/image/cache/catalog/1678773596-KEbyhYrUULeVeC5wnou3aN18FyBkwYFC4QPcFKaw-550x550w.jpg', rating:4.7, reviewCount:6, inStock:true, category:'مذاق رمضان' },
  { id:'rf-003', name:'كنافة بالقشطة', description:'كنافة طازجة بالقشطة البلدي بطعم رمضاني أصيل', price:85, imageUrl:'https://tse3.mm.bing.net/th/id/OIP.UMqy590YEKgNAKWdjVXqfQHaGi?rs=1&pid=ImgDetMain&o=7&rm=3', rating:4.8, reviewCount:6, inStock:true, category:'مذاق رمضان' },
  { id:'rf-004', name:'قطايف جاهزة للحشو', description:'قطايف طازجة للحشو بالمكسرات أو القشطة', price:60, imageUrl:'https://www.supermama.me/system/App/Entities/Recipe/images/000/047/984/watermarked/%25D8%25B7%25D8%25B1%25D9%258A%25D9%2582%25D8%25A9-%25D8%25B9%25D9%2585%25D9%2584-%25D9%2582%25D8%25B7%25D8%25A7%25D9%258A%25D9%2581-%25D8%25A8%25D8%25A7%25D9%2584%25D9%2582%25D8%25B4%25D8%25B7%25D8%25A9.jpg', rating:4.6, reviewCount:6, inStock:true, category:'مذاق رمضان' },
  { id:'rf-005', name:'تمر هندي مركز', description:'عصير تمر هندي منعش لإفطار صيفي رائع', price:40, imageUrl:'https://5.imimg.com/data5/SELLER/Default/2024/3/396301562/II/NA/CF/158320994/kokam-syrup-b-500x500.jpeg', rating:4.5, reviewCount:6, inStock:true, category:'مذاق رمضان' },
  { id:'rf-006', name:'عرقسوس بلدي', description:'مشروب عرقسوس تقليدي بطعم أصيل', price:35, imageUrl:'https://m.media-amazon.com/images/I/91mPinT97FL._AC_SY300_SX300_QL70_ML2_.jpg', rating:4.4, reviewCount:6, inStock:true, category:'مذاق رمضان' },
  { id:'rf-007', name:'بسبوسة سادة', description:'بسبوسة مصرية طرية بجوز الهند', price:100, imageUrl:'https://www.masahaa.net/wp-content/uploads/2023/07/masahaa-2023-07-15_18-05-32_680035.jpg', rating:4.7, reviewCount:6, inStock:true, category:'مذاق رمضان' },
  { id:'rf-009', name:'ياميش رمضان مشكل', description:'مكسرات وزبيب وجوز هند لتحضير الخشاف', price:400, imageUrl:'https://th.bing.com/th/id/R.3908c1eadd1c1ec0619d9a4c70cfadcb?rik=6efxKvCP820cjg&pid=ImgRaw&r=0', rating:4.6, reviewCount:6, inStock:true, category:'مذاق رمضان' },
  { id:'rf-010', name:'خشاف رمضان جاهز', description:'خشاف مصري جاهز غني بالفواكه المجففة', price:50, imageUrl:'https://i.ytimg.com/vi/dBqQ-5rlJWk/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLCdPzVP3hiD4ktfEQdp_qcda5bpjQ', rating:4.9, reviewCount:6, inStock:true, category:'مذاق رمضان' },

  // -------- مستلزمات السفرة (10 منتجات) --------
  { id:'rk-001', name:'صينية تقديم نحاس شرقي', description:'صينية نحاس بنقوش إسلامية لتقديم العصائر والتمر على السفرة', price:370, imageUrl:'https://png.pngtree.com/thumb_back/fh260/background/20230616/pngtree-white-background-showcase-of-3d-rendered-brass-tray-image_3625632.jpg', rating:4.8, reviewCount:6, inStock:true, category:'مستلزمات السفرة' },
  { id:'rk-002', name:'طقم كاسات عصير رمضان', description:'6 كاسات زجاج لتقديم قمر الدين وتمر هندي', price:180, imageUrl:'https://gzzar.com/wp-content/uploads/2022/09/%D9%83%D8%A7%D8%B3%D8%A7%D8%AA3%D8%AD%D8%A8%D8%A7%D8%AA-%D8%A7%D8%B5%D9%81%D8%B1-%D9%85%D8%B9%D8%A7%D9%84%D8%AC%D9%87.webp', rating:4.7, reviewCount:6, inStock:true, category:'مستلزمات السفرة' },
  { id:'rk-003', name:'طبق بلح مزخرف', description:'طبق تقديم تمر بتصميم شرقي أنيق', price:299, imageUrl:'https://i0.wp.com/www.fairturk.com/wp-content/uploads/2021/02/13-003-18.jpg?fit=510%2C510&ssl=1', rating:4.9, reviewCount:6, inStock:true, category:'مستلزمات السفرة' },
  { id:'rk-004', name:'حلة شوربة ستانلس', description:'حلة عملية لتحضير شوربة لسان العصفور الرمضانية', price:600, imageUrl:'https://images-na.ssl-images-amazon.com/images/I/31JF0u0fLEL._SL500_._AC_SL500_.jpg', rating:4.6, reviewCount:6, inStock:true, category:'مستلزمات السفرة' },
  { id:'rk-005', name:'طقم أطباق إفطار ملون', description:'أطباق ملونة تضيف بهجة ولمسة رمضانية للسفرة', price:220, imageUrl:'https://i.etsystatic.com/40280385/r/il/52709d/4560014625/il_1588xN.4560014625_k6a3.jpg', rating:4.8, reviewCount:6, inStock:true, category:'مستلزمات السفرة' },
  { id:'rk-006', name:'إبريق عصير زجاج كبير', description:'إبريق شفاف لتقديم العصائر الرمضانية المنعشة', price:85, imageUrl:'https://m.media-amazon.com/images/I/610pMvBxyHL._AC_SX679_.jpg', rating:4.5, reviewCount:6, inStock:true, category:'مستلزمات السفرة' },
  { id:'rk-007', name:'ستاند حلويات دورين', description:'ستاند لتقديم الكنافة والقطايف بشكل أنيق', price:330, imageUrl:'https://cascadesco.com/cdn/shop/files/011003-0647-a.jpg?v=1736448764&width=1426', rating:4.7, reviewCount:6, inStock:true, category:'مستلزمات السفرة' },
  { id:'rk-008', name:'ملاعق وشوك ستانلس', description:'طقم ملاعق وشوك لسفرة الإفطار', price:250, imageUrl:'https://m.media-amazon.com/images/I/71WaNR8FnpL._AC_SL1500_.jpg', rating:4.6, reviewCount:6, inStock:true, category:'مستلزمات السفرة' },
  { id:'rk-009', name:'طقم توابل رمضان', description:'طقم توابل لتقديم البهارات والفلفل بطريقة مميزة', price:300, imageUrl:'https://img.grouponcdn.com/deal/3mzRJph5SDhY5dWWviydmTfLSVbH/3m-2000x1200/v1/t440x300.jpg', rating:4.4, reviewCount:6, inStock:true, category:'مستلزمات السفرة' },
  { id:'rk-010', name:'مفرش سفرة قطن 6 أشخاص', description:'مفرش سفرة رمضاني 6 أشخاص بتصميم شرقي', price:200, imageUrl:'https://assets.kenzz.com/products/29119/002_KFG-305-Ramadan7.jpg', rating:4.9, reviewCount:6, inStock:true, category:'مستلزمات السفرة' },

  // -------- هدايا رمضانية (9 منتجات) --------
  { id:'gh-001', name:'سلة هدايا رمضان', description:'سلة هدايا متكاملة تحتوي على تمر، علب شوكولاتة، ومكسرات', price:650, imageUrl:'https://www.fnp.ae/images/pr/x/v20220913161832/premium-chocolate-collection-hamper_1.jpg', rating:4.9, reviewCount:6, inStock:true, category:'هدايا رمضانية' },
  { id:'gh-002', name:'علبة شوكولاتة فاخر', description:'علبة شوكولاتة فاخرة مزينة بزينة رمضان', price:1050, imageUrl:'https://i3.fnp.ae/images/pr/x/v20230321175243/ramadan-extra-large-gift-box-by-neuhaus_1.jpg', rating:4.8, reviewCount:6, inStock:true, category:'هدايا رمضانية' },
  { id:'gh-003', name:'مسبحة خشب فاخر', description:'مسبحة خشب مع كيس مخملي للهدايا', price:210, imageUrl:'https://tse2.mm.bing.net/th/id/OIP.NLN3GRx-zg83n4V1lMSeYgHaHa?rs=1&pid=ImgDetMain&o=7&rm=3', rating:4.7, reviewCount:6, inStock:true, category:'هدايا رمضانية' },
  { id:'gh-004', name:'كتاب دعوي رمضاني', description:'كتاب قصص وحكم رمضانية', price:60, imageUrl:'https://static.vecteezy.com/system/resources/previews/011/062/939/non_2x/ramadan-kareem-mosque-dome-with-arabic-pattern-vector.jpg', rating:4.6, reviewCount:6, inStock:true, category:'هدايا رمضانية' },
  { id:'gh-005', name:'علبة تمور فاخرة', description:'تمور مختارة بعناية للتقديم كهدية', price:230, imageUrl:'https://i7.fnp.ae/images/pr/l/v20220325110423/square-tray-of-dates-and-baklava_1.jpg', rating:4.9, reviewCount:6, inStock:true, category:'هدايا رمضانية' },
  { id:'gh-006', name:'شمعة معطرة', description:'شمعة معطرة بزخارف رمضانية', price:250, imageUrl:'https://m.media-amazon.com/images/I/81JBPRThkEL._AC_.jpg', rating:4.7, reviewCount:6, inStock:true, category:'هدايا رمضانية' },
  { id:'gh-007', name:'مصحف صغير للهدايا', description:'مصحف صغير بتغليف أنيق مناسب للهدايا', price:150, imageUrl:'https://tse3.mm.bing.net/th/id/OIP.53N731qmfrO3WLZXWgd0owAAAA?rs=1&pid=ImgDetMain&o=7&rm=3', rating:4.8, reviewCount:6, inStock:true, category:'هدايا رمضانية' },
  { id:'gh-008', name:'طقم مجات رمضان', description:'طقم مجات عصير بطباعة رمضانية', price:400, imageUrl:'https://m.media-amazon.com/images/I/715DtnvdgCL._AC_SX569_.jpg', rating:4.6, reviewCount:6, inStock:true, category:'هدايا رمضانية' },
  { id:'gh-009', name:'حقيبة هدايا رمضان', description:'حقيبة أنيقة لحزم الهدايا الرمضانية', price:190, imageUrl:'https://down-my.img.susercontent.com/file/sg-11134201-7rcev-m6gofd2ijgd6de', rating:4.7, reviewCount:6, inStock:true, category:'هدايا رمضانية' },
],
    category: 'الكل',
    searchQuery: '',
    search: '',
    wishlistItems: [],
    cartItems: [],
    user: undefined,
    loading: false,
    selectedProductId: undefined,
    showReview: false,
  } as EcommerceState),
  withStorageSync({ key: 'modern-store', select: ({ wishlistItems, cartItems, user }) => ({ wishlistItems, cartItems, user }) }),
  withComputed(({ category, products, wishlistItems, cartItems, selectedProductId, searchQuery, search }) => ({
    filteredProducts: computed(() => {
      let filtered = products();

      if (category() !== 'الكل') {
        filtered = filtered.filter(p => p.category === category());
      }

      // تعديل البحث ليشمل الاسم والوصف
      if (search().trim() !== '') {
        const searchLower = search().toLowerCase();
        filtered = filtered.filter(p =>
          p.name.toLowerCase().includes(searchLower) ||
          p.description.toLowerCase().includes(searchLower)
        );
      }

      return filtered;
    }),
    wishlistCount: computed(() => wishlistItems().length),
    cartCount: computed(() => cartItems().reduce((acc, item) => acc + item.quantity, 0)),
    selectedProduct: computed(() =>
      products().find(p => p.id === selectedProductId())
    ),
  })),
  withMethods((store, toaster = inject(Toaster), matDialog = inject(MatDialog), router = inject(Router)) => ({
    setCategory: signalMethod<string>((category: string) => {
      patchState(store, { category });
    }),
    setProductId: signalMethod<string>((productId: string) => {
      patchState(store, { selectedProductId: productId });
    }),
    setSearch: signalMethod<string>((search: string) => {
      patchState(store, { search });
    }),
    addToWishlist: (product: Product) => {
      const updatedWishlistItems = produce(store.wishlistItems(), (draft) => {
        if (!draft.find(p => p.id === product.id)) draft.push(product);
      });
      patchState(store, { wishlistItems: updatedWishlistItems });
      toaster.success(`${product.name} added to wishlist!`);
    },
    removeFromWishlist: (product: Product) => {
      patchState(store, { wishlistItems: store.wishlistItems().filter(p => p.id !== product.id) });
      toaster.success(`${product.name} removed from wishlist!`);
    },
    clearWishlist: () => {
      patchState(store, { wishlistItems: [] });
    },
    addToCart: (product: Product, quantity = 1) => {
      const existingIndex = store.cartItems().findIndex(i => i.product.id === product.id);
      const updatedCartItems = produce(store.cartItems(), draft => {
        if (existingIndex !== -1) {
          draft[existingIndex].quantity += quantity;
          return;
        }
        draft.push({ product, quantity });
      });
      patchState(store, { cartItems: updatedCartItems });
      toaster.success(existingIndex !== -1 ? `${product.name} added again` : `${product.name} added to the cart`);
    },
    setItemQuantity(params: { productId: string, quantity: number }) {
      const index = store.cartItems().findIndex(c => c.product.id === params.productId);
      if (index === -1) return;
      const updated = produce(store.cartItems(), draft => {
        draft[index].quantity = params.quantity;
      });
      patchState(store, { cartItems: updated });
    },
    addAllWishlistToCart: () => {
      const updatedCartItems = produce(store.cartItems(), draft => {
        store.wishlistItems().forEach(p => {
          if (!draft.find(c => c.product.id === p.id)) draft.push({ product: p, quantity: 1 });
        });
      });
      patchState(store, { cartItems: updatedCartItems, wishlistItems: [] });
    },
    moveToWishlist: (product: Product) => {
      const updatedCartItems = store.cartItems().filter(c => c.product.id !== product.id);
      const updatedWishlistItems = produce(store.wishlistItems(), draft => {
        if (!draft.find(p => p.id === product.id)) draft.push(product);
      });
      patchState(store, { cartItems: updatedCartItems, wishlistItems: updatedWishlistItems });
    },
    removeFromCart: (product: Product) => {
      patchState(store, { cartItems: store.cartItems().filter(c => c.product.id !== product.id) });
      toaster.success(`${product.name} removed from cart`);
    },
    proceedToCheckout: () => {
      if (!store.user()) {
        matDialog.open(SignInDialog, { disableClose: true, data: { checkout: true } });
        return;
      }
      router.navigate(['/checkout']);
    },
    placeOrder: async () => {
      patchState(store, { loading: true });
      const user = store.user();
      if (!user) {
        toaster.error('please login before placing order');
        patchState(store, { loading: false });
        return;
      }
      const order: Order = {
        id: crypto.randomUUID(),
        userId: user.id,
        total: Math.round(store.cartItems().reduce((acc, item) => acc + item.quantity * item.product.price, 0)),
        items: store.cartItems(),
        paymentStatus: 'success',
      };
      await new Promise(resolve => setTimeout(resolve, 1000));
      patchState(store, { loading: false, cartItems: [] });
      router.navigate(['order-success']);
    },
    signIn: ({ email, password, checkout, dialogId }: SignInParams) => {
      patchState(store, { user: { id: '1', email, name: '', imageUrl: '' } });
      matDialog.getDialogById(dialogId)?.close();
      if (checkout) router.navigate(['/checkout']);
    },
    signUp: ({ email, password, name, checkout, dialogId, imageUrl }: SignUpParams) => {
      patchState(store, { user: { id: crypto.randomUUID() || '1', email, name, imageUrl: imageUrl || '' } });
      matDialog.getDialogById(dialogId)?.close();
      if (checkout) router.navigate(['/checkout']);
    },
    signOut: () => {
      patchState(store, { user: undefined });
    },
    showWriteReview: () => {
      patchState(store, { showReview: true });
    },
    hideWriteReview: () => {
      patchState(store, { showReview: false });
    },
    addReview: async ({ title, comment, rating }: AddReviewParams) => {
      patchState(store, { loading: true });
      const productIndex = store.products().findIndex(p => p.id === store.selectedProductId());
      if (productIndex === -1) {
        toaster.error('Product not found');
        patchState(store, { loading: false });
        return;
      }
      const review: UserReview = {
        id: crypto.randomUUID(),
        title,
        comment,
        rating,
        productId: store.products()[productIndex].id,
        userName: store.user()?.name || '',
        userImageUrl: store.user()?.imageUrl || '',
        reviewDate: new Date(),
      };
      const updatedProducts = produce(store.products(), draft => {
        if (!draft[productIndex].reviews) draft[productIndex].reviews = [];
        draft[productIndex].reviews.push(review);
        draft[productIndex].reviewCount = (draft[productIndex].reviewCount || 0) + 1;
        const totalRating = draft[productIndex].reviews.reduce((acc, r) => acc + r.rating, 0);
        draft[productIndex].rating = totalRating / draft[productIndex].reviews.length;
      });
      patchState(store, { products: updatedProducts, loading: false, showReview: false });
      toaster.success('تم إضافة تقييمك بنجاح ✨');
    },
  }))
);
