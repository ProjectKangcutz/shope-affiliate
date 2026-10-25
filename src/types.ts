export interface PricePoint {
  date: string;
  price: number;
  label?: string;
  isSpike?: boolean;
  isLowest?: boolean;
}

export interface LabVerdict {
  score: number;
  verdictTitle: string;
  specs: {
    heatDissipation: string;
    heatNote: string;
    speed: string;
    speedNote: string;
    protocol: string;
    protocolNote: string;
    portability: string;
    portabilityNote: string;
  };
  pros: string[];
  cons: string[];
  curator: {
    name: string;
    role: string;
    avatar: string;
    quote: string;
  };
}

export interface BuyerReview {
  id: string;
  author: string;
  location: string;
  rating: number;
  badge: string;
  comment: string;
  hasPhoto?: boolean;
  helpfulCount?: number;
}

export interface Product {
  id: string;
  name: string;
  shortName: string;
  category: 'tech' | 'home' | 'beauty' | 'kitchen';
  brand: string;
  storeName: string;
  storeRating: number;
  storeRatingsCount: string;
  storeChatResponse: string;
  storeBadge: 'Mall' | 'Preferred+' | 'Super Seller';
  modelCode?: string;
  compatibilityNote?: string;
  
  price: number;
  originalPrice: number;
  discountPercent: number;
  coinRebatePercent?: number;
  freeShipping: boolean;
  
  rating: number;
  reviewsCount: string;
  soldCountText: string;
  stockLeft: number;
  stockPercent: number;
  
  mainImage: string;
  galleryImages: string[];
  
  shopeeUrl: string;
  involveOfferId: string;
  voucherCode: string;
  voucherDescription: string;
  voucherDiscountValue: number;
  storeVoucherValue: number;
  netPrice: number;
  
  curatorSummary: string;
  labVerdict?: LabVerdict;
  priceHistory: PricePoint[];
  recordLowPrice: number;
  medianPrice: number;
  priceAnalysisNote: string;
  buyerReviews: BuyerReview[];
  lastUpdated: string;
}

export interface Voucher {
  id: string;
  code: string;
  discountBadge: string;
  title: string;
  subTitle: string;
  minSpendText: string;
  successRate: string;
  category: string;
  isExclusive?: boolean;
  themeColor: 'primary' | 'tertiary' | 'secondary';
  shopeeUrl: string;
}

export interface ClickRecord {
  clickId: string;
  subId1: string; // session/user
  subId2: string; // productId
  subId3: string; // channel/placement
  productId: string;
  productName: string;
  targetUrl: string;
  timestamp: string;
  userAgent?: string;
}

export interface ConversionRecord {
  conversionId: string;
  orderId: string;
  clickId: string;
  subId1: string;
  subId2: string;
  subId3: string;
  productName: string;
  orderAmount: number;
  commissionRate: number; // e.g. 0.08
  commissionAmount: number;
  currency: string;
  status: 'pending' | 'approved' | 'rejected';
  createdAt: string;
  merchant: string;
}

export interface CatalogSyncLog {
  id: string;
  timestamp: string;
  durationMs: number;
  productsChecked: number;
  pricesUpdated: number;
  priceDropsDetected: number;
  status: 'success' | 'warning' | 'error';
  summary: string;
}

export interface InvolveAsiaConfig {
  apiKey: string;
  apiSecret: string;
  publisherId: string;
  defaultOfferId: string; // Shopee PH / MY / ID
  syncIntervalHours: number;
  autoSyncEnabled: boolean;
  lastSyncTime: string;
  nextSyncTime: string;
  autoPriceDropAlerts: boolean;
}
