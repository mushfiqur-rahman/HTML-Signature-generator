export type SignatureLayout = 'vertical_screenshot' | 'side_by_side' | 'modern_compact' | 'minimalist';
export type Alignment = 'left' | 'center' | 'right';
export type SafeFont =
  | 'arial'
  | 'helvetica'
  | 'segoe'
  | 'calibri'
  | 'trebuchet'
  | 'verdana'
  | 'tahoma'
  | 'georgia'
  | 'palatino'
  | 'times'
  | 'lucida';
export type FontSizeScale = 'compact' | 'normal' | 'comfortable';
export type ThemeMode = 'dark' | 'white';

export interface SocialLinkItem {
  id: string;
  name: string;
  url: string;
  enabled: boolean;
  iconType: 'instagram' | 'facebook' | 'tiktok' | 'youtube' | 'website' | 'shop';
}

export interface SignatureData {
  // Primary Content (All 100% Dynamic)
  closing: string;
  names: string;
  company: string;
  tagline: string;
  email: string;
  website: string;
  websiteUrl: string;
  phone: string;
  phoneRaw: string;

  // Editable Labels (Zero fixed text)
  showLabels: boolean;
  emailLabel: string;
  websiteLabel: string;
  phoneLabel: string;

  // Individual Line Alignments (Left / Center / Right)
  globalAlignment: Alignment;
  closingAlign: Alignment;
  namesAlign: Alignment;
  companyAlign: Alignment;
  taglineAlign: Alignment;
  contactAlign: Alignment;
  logoAlignment: Alignment;
  socialsAlign: Alignment;
  qrAlign: Alignment;
  disclaimerAlign: Alignment;

  // Logo Settings
  showLogo: boolean;
  logoUrl: string;
  logoWidth: number;
  logoLinkUrl: string;

  // QR Code Generation
  includeQrCode: boolean;
  qrCodeUrl: string;
  qrCodeSize: number;
  qrCodeCaption: string;
  qrCodeColor: string; // Hex without #
  qrCodeBgColor: string; // Hex without #

  // Social Media Profiles
  includeSocials: boolean;
  socialIconSize: number;
  socialIconStyle: 'color_badge' | 'minimal' | 'rounded';
  socialInstagram: string;
  socialFacebook: string;
  socialTiktok: string;
  socialYoutube: string;
  socialShop: string;

  // Dynamic Colors (Fully customizable)
  themeMode: ThemeMode;
  backgroundColor: string;
  textColor: string;
  nameColor: string;
  companyColor: string;
  taglineColor: string;
  labelColor: string;
  accentColor: string; // Link color (Email, Web, Phone)
  secondaryTextColor: string;
  dividerColor: string;

  // Typography
  fontFamily: SafeFont;
  fontSize: FontSizeScale;

  // Visual layout & extras
  layout: SignatureLayout;
  includeTagline: boolean;
  includeAddress: boolean;
  address: string;
  includeDisclaimer: boolean;
  disclaimerText: string;
}

export const DEFAULT_SIGNATURE: SignatureData = {
  // Dynamic Content
  closing: 'Sincerely,',
  names: 'Jason And Marcie',
  company: 'JAM 3D StitchWorks',
  tagline: 'Custom Embroidery & 3D Stitching Specialists',
  email: 'Orders@jam3dstitchworks.com',
  website: 'www.jam3dstitchworks.com',
  websiteUrl: 'https://www.jam3dstitchworks.com',
  phone: '(850) 730-1991',
  phoneRaw: '+18507301991',

  // Dynamic Editable Labels
  showLabels: true,
  emailLabel: 'Email:',
  websiteLabel: 'Web:',
  phoneLabel: 'Phone:',

  // Alignments (All moveable left / center / right)
  globalAlignment: 'left',
  closingAlign: 'left',
  namesAlign: 'left',
  companyAlign: 'left',
  taglineAlign: 'left',
  contactAlign: 'left',
  logoAlignment: 'left',
  socialsAlign: 'left',
  qrAlign: 'left',
  disclaimerAlign: 'left',

  // Logo settings
  showLogo: true,
  logoUrl: 'https://jam3dstitchworks.com/cdn/shop/files/2_Jam_e60105c2-2255-4fbc-bcbf-5b18191efc48.png',
  logoWidth: 170,
  logoLinkUrl: 'https://www.jam3dstitchworks.com',

  // QR Code Settings
  includeQrCode: true,
  qrCodeUrl: 'https://www.jam3dstitchworks.com',
  qrCodeSize: 72,
  qrCodeCaption: 'Scan for Web & Shop',
  qrCodeColor: '000000',
  qrCodeBgColor: 'ffffff',

  // Social Media Profiles
  includeSocials: true,
  socialIconSize: 22,
  socialIconStyle: 'color_badge',
  socialInstagram: 'https://instagram.com/jam3dstitchworks',
  socialFacebook: 'https://facebook.com/jam3dstitchworks',
  socialTiktok: 'https://tiktok.com/@jam3dstitchworks',
  socialYoutube: '',
  socialShop: 'https://jam3dstitchworks.com',

  // Dynamic Colors
  themeMode: 'dark',
  backgroundColor: '#121212',
  textColor: '#FFFFFF',
  nameColor: '#FFFFFF',
  companyColor: '#FFFFFF',
  taglineColor: '#94A3B8',
  labelColor: '#FFFFFF',
  accentColor: '#38BDF8', // Cyan splash link color
  secondaryTextColor: '#94A3B8',
  dividerColor: '#38BDF8',

  // Typography
  fontFamily: 'arial',
  fontSize: 'normal',

  // Layout & Extras
  layout: 'vertical_screenshot',
  includeTagline: false,
  includeAddress: false,
  address: 'Fort Walton Beach & Destin, FL · Nationwide Shipping',
  includeDisclaimer: false,
  disclaimerText: 'This email and any attachments are confidential and intended solely for the use of the individual to whom they are addressed.',
};

export interface AuditCheckItem {
  id: string;
  title: string;
  status: 'pass' | 'warning' | 'info';
  description: string;
  technicalDetail: string;
}
