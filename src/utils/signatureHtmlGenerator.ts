import { SignatureData, Alignment, SafeFont } from '../types/signature';

export interface FontOption {
  label: string;
  family: string;
  category: 'Sans-Serif' | 'Serif';
}

export const PROFESSIONAL_FONTS: Record<SafeFont, FontOption> = {
  arial: {
    label: 'Arial (Clean & Universal)',
    family: "Arial, 'Helvetica Neue', Helvetica, sans-serif",
    category: 'Sans-Serif',
  },
  helvetica: {
    label: 'Helvetica / Helvetica Neue (Modern)',
    family: "'Helvetica Neue', Helvetica, Arial, sans-serif",
    category: 'Sans-Serif',
  },
  segoe: {
    label: 'Segoe UI (Microsoft 365 Standard)',
    family: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    category: 'Sans-Serif',
  },
  calibri: {
    label: 'Calibri (Corporate Clean)',
    family: "Calibri, Candara, Segoe, 'Segoe UI', Optima, Arial, sans-serif",
    category: 'Sans-Serif',
  },
  trebuchet: {
    label: 'Trebuchet MS (Dynamic & Friendly)',
    family: "'Trebuchet MS', 'Lucida Grande', 'Lucida Sans Unicode', sans-serif",
    category: 'Sans-Serif',
  },
  verdana: {
    label: 'Verdana (High Legibility)',
    family: "Verdana, Geneva, sans-serif",
    category: 'Sans-Serif',
  },
  tahoma: {
    label: 'Tahoma (Compact & Crisp)',
    family: "Tahoma, Verdana, Segoe, sans-serif",
    category: 'Sans-Serif',
  },
  georgia: {
    label: 'Georgia (Executive Serif)',
    family: "Georgia, Times, 'Times New Roman', serif",
    category: 'Serif',
  },
  palatino: {
    label: 'Palatino / Book Antiqua (Editorial)',
    family: "'Palatino Linotype', 'Book Antiqua', Palatino, serif",
    category: 'Serif',
  },
  times: {
    label: 'Times New Roman (Formal Traditional)',
    family: "'Times New Roman', Times, Baskerville, serif",
    category: 'Serif',
  },
  lucida: {
    label: 'Lucida Sans (Modern Legible)',
    family: "'Lucida Sans Unicode', 'Lucida Grande', Lucida, sans-serif",
    category: 'Sans-Serif',
  },
};

const FONT_SIZES = {
  compact: {
    base: '13px',
    lineHeight: '18px',
    heading: '15px',
    headingLineHeight: '20px',
    small: '11px',
    smallLineHeight: '16px',
    spacing: '3px',
  },
  normal: {
    base: '14px',
    lineHeight: '20px',
    heading: '16px',
    headingLineHeight: '22px',
    small: '12px',
    smallLineHeight: '17px',
    spacing: '4px',
  },
  comfortable: {
    base: '15px',
    lineHeight: '22px',
    heading: '18px',
    headingLineHeight: '24px',
    small: '13px',
    smallLineHeight: '18px',
    spacing: '5px',
  },
};

// High-resolution email-safe social media icons (Flaticon CDN)
const SOCIAL_ICONS = {
  instagram: 'https://cdn-icons-png.flaticon.com/128/3955/3955024.png',
  facebook: 'https://cdn-icons-png.flaticon.com/128/5968/5968764.png',
  tiktok: 'https://cdn-icons-png.flaticon.com/128/3046/3046121.png',
  youtube: 'https://cdn-icons-png.flaticon.com/128/1384/1384060.png',
  shop: 'https://cdn-icons-png.flaticon.com/128/1170/1170678.png',
};

/**
 * Normalizes phone number into clean E.164 or digits for tel: links
 */
export function cleanPhoneNumber(phone: string): string {
  const digits = phone.replace(/[^\d+]/g, '');
  if (!digits.startsWith('+') && digits.length === 10) {
    return `+1${digits}`;
  }
  return digits.startsWith('+') ? digits : `+${digits}`;
}

/**
 * Returns table margin for alignment
 */
function getTableAlignmentStyle(align: Alignment): string {
  if (align === 'center') return 'margin: 0 auto; text-align: center;';
  if (align === 'right') return 'margin: 0 0 0 auto; text-align: right;';
  return 'margin: 0; text-align: left;';
}

/**
 * Generates email-client proof HTML with 100% inline CSS, dynamic colors, alignment, social icons, and QR code
 */
export function generateSignatureHtml(data: SignatureData, forceBackground?: 'dark' | 'light' | 'transparent'): string {
  const font = PROFESSIONAL_FONTS[data.fontFamily]?.family || PROFESSIONAL_FONTS.arial.family;
  const size = FONT_SIZES[data.fontSize] || FONT_SIZES.normal;
  const telHref = `tel:${cleanPhoneNumber(data.phone || data.phoneRaw)}`;

  // Determine effective background color
  let containerBg = data.backgroundColor;
  if (forceBackground === 'dark') {
    containerBg = '#121212';
  } else if (forceBackground === 'light') {
    containerBg = '#FFFFFF';
  } else if (forceBackground === 'transparent') {
    containerBg = 'transparent';
  } else if (data.themeMode === 'white' && (!data.backgroundColor || data.backgroundColor === '#121212')) {
    containerBg = '#FFFFFF';
  } else if (data.themeMode === 'dark' && (!data.backgroundColor || data.backgroundColor === '#FFFFFF')) {
    containerBg = '#121212';
  }

  // Dynamic colors
  const textColor = data.textColor || '#FFFFFF';
  const nameColor = data.nameColor || textColor;
  const companyColor = data.companyColor || textColor;
  const taglineColor = data.taglineColor || data.secondaryTextColor || '#94A3B8';
  const labelColor = data.labelColor || textColor;
  const linkColor = data.accentColor || '#38BDF8';
  const dividerColor = data.dividerColor || linkColor;

  // Shared inline link styles
  const linkStyle = `color: ${linkColor}; text-decoration: underline; font-family: ${font};`;
  const linkSpanStyle = `color: ${linkColor}; text-decoration: underline;`;

  // Render logo image element
  const logoImg = data.showLogo && data.logoUrl ? `
    <div style="text-align: ${data.logoAlignment}; margin: 8px 0 0 0;">
      <a href="${data.logoLinkUrl}" target="_blank" rel="noopener noreferrer" style="text-decoration: none; border: 0; outline: none; display: inline-block;">
        <img src="${data.logoUrl}" alt="${data.company}" width="${data.logoWidth}" height="auto" style="display: inline-block; width: ${data.logoWidth}px; max-width: 100%; height: auto; border: 0; outline: none; text-decoration: none; -ms-interpolation-mode: bicubic;" />
      </a>
    </div>` : '';

  // Render Social Media Icons block
  const activeSocials: { name: string; url: string; icon: string }[] = [];
  if (data.includeSocials) {
    if (data.socialInstagram?.trim()) {
      activeSocials.push({ name: 'Instagram', url: data.socialInstagram, icon: SOCIAL_ICONS.instagram });
    }
    if (data.socialFacebook?.trim()) {
      activeSocials.push({ name: 'Facebook', url: data.socialFacebook, icon: SOCIAL_ICONS.facebook });
    }
    if (data.socialTiktok?.trim()) {
      activeSocials.push({ name: 'TikTok', url: data.socialTiktok, icon: SOCIAL_ICONS.tiktok });
    }
    if (data.socialYoutube?.trim()) {
      activeSocials.push({ name: 'YouTube', url: data.socialYoutube, icon: SOCIAL_ICONS.youtube });
    }
    if (data.socialShop?.trim()) {
      activeSocials.push({ name: 'Shop', url: data.socialShop, icon: SOCIAL_ICONS.shop });
    }
  }

  const socialBlock = (data.includeSocials && activeSocials.length > 0) ? `
    <div style="text-align: ${data.socialsAlign}; margin: 10px 0 6px 0;">
      <table cellpadding="0" cellspacing="0" border="0" style="border-collapse: collapse; display: inline-table; ${getTableAlignmentStyle(data.socialsAlign)}">
        <tr>
          ${activeSocials.map((social) => `
            <td style="padding: 0 5px 0 0; vertical-align: middle;">
              <a href="${social.url}" target="_blank" rel="noopener noreferrer" style="display: inline-block; text-decoration: none; border: 0;" title="${social.name}">
                <img src="${social.icon}" alt="${social.name}" width="${data.socialIconSize}" height="${data.socialIconSize}" style="display: block; width: ${data.socialIconSize}px; height: ${data.socialIconSize}px; border: 0; outline: none; -ms-interpolation-mode: bicubic;" />
              </a>
            </td>
          `).join('')}
        </tr>
      </table>
    </div>` : '';

  // Render QR Code block
  const qrColorClean = data.qrCodeColor ? data.qrCodeColor.replace('#', '') : '000000';
  const qrBgClean = data.qrCodeBgColor ? data.qrCodeBgColor.replace('#', '') : 'ffffff';
  const qrImageUrl = `https://api.qrserver.com/v1/create-qr-code/?size=${data.qrCodeSize * 2}x${data.qrCodeSize * 2}&data=${encodeURIComponent(data.qrCodeUrl || data.websiteUrl)}&color=${qrColorClean}&bgcolor=${qrBgClean}`;

  const qrBlock = data.includeQrCode && data.qrCodeUrl ? `
    <div style="text-align: ${data.qrAlign}; margin: 10px 0 4px 0;">
      <table cellpadding="0" cellspacing="0" border="0" style="border-collapse: collapse; display: inline-table; ${getTableAlignmentStyle(data.qrAlign)}">
        <tr>
          <td style="text-align: center; vertical-align: middle; padding: 2px;">
            <a href="${data.qrCodeUrl}" target="_blank" rel="noopener noreferrer" style="text-decoration: none; border: 0; outline: none; display: inline-block;">
              <img src="${qrImageUrl}" alt="Scan QR Code" width="${data.qrCodeSize}" height="${data.qrCodeSize}" style="display: block; width: ${data.qrCodeSize}px; height: ${data.qrCodeSize}px; border-radius: 4px; border: 1px solid ${dividerColor}; outline: none; -ms-interpolation-mode: bicubic;" />
            </a>
            ${data.qrCodeCaption ? `
              <div style="font-family: ${font}; font-size: 10px; line-height: 13px; color: ${taglineColor}; margin-top: 3px; text-align: center;">
                ${data.qrCodeCaption}
              </div>` : ''}
          </td>
        </tr>
      </table>
    </div>` : '';

  // Contact rows table generator
  const contactRowsHtml = `
    <table cellpadding="0" cellspacing="0" border="0" style="border-collapse: collapse; font-family: ${font}; font-size: ${size.base}; line-height: ${size.lineHeight}; color: ${textColor}; margin: 0 0 8px 0; width: 100%;">
      ${data.email ? `
      <tr>
        <td style="padding: 2px 0; font-family: ${font}; vertical-align: middle; text-align: ${data.contactAlign};">
          ${data.showLabels && data.emailLabel ? `<span style="font-weight: 600; color: ${labelColor};">${data.emailLabel}&nbsp;</span>` : ''}
          <a href="mailto:${data.email}" style="${linkStyle}"><span style="${linkSpanStyle}">${data.email}</span></a>
        </td>
      </tr>` : ''}

      ${data.website ? `
      <tr>
        <td style="padding: 2px 0; font-family: ${font}; vertical-align: middle; text-align: ${data.contactAlign};">
          ${data.showLabels && data.websiteLabel ? `<span style="font-weight: 600; color: ${labelColor};">${data.websiteLabel}&nbsp;</span>` : ''}
          <a href="${data.websiteUrl}" target="_blank" rel="noopener noreferrer" style="${linkStyle}"><span style="${linkSpanStyle}">${data.website}</span></a>
        </td>
      </tr>` : ''}

      ${data.phone ? `
      <tr>
        <td style="padding: 2px 0; font-family: ${font}; vertical-align: middle; text-align: ${data.contactAlign};">
          ${data.showLabels && data.phoneLabel ? `<span style="font-weight: 600; color: ${labelColor};">${data.phoneLabel}&nbsp;</span>` : ''}
          <a href="${telHref}" style="${linkStyle}" title="Click to call ${data.phone}"><span style="${linkSpanStyle}">${data.phone}</span></a>
        </td>
      </tr>` : ''}

      ${data.includeAddress && data.address ? `
      <tr>
        <td style="padding: 2px 0; font-family: ${font}; font-size: ${size.small}; color: ${taglineColor}; text-align: ${data.contactAlign};">
          ${data.address}
        </td>
      </tr>` : ''}
    </table>`;

  // 1. VERTICAL SCREENSHOT MATCH LAYOUT (Dynamic, moveable, customizable)
  if (data.layout === 'vertical_screenshot') {
    return `<table cellpadding="0" cellspacing="0" border="0" bgcolor="${containerBg}" style="border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-family: ${font}; color: ${textColor}; max-width: 480px; width: 100%; line-height: ${size.lineHeight}; background-color: ${containerBg};">
  <tr>
    <td bgcolor="${containerBg}" style="padding: 12px 16px; font-family: ${font}; background-color: ${containerBg};">
      ${data.closing ? `
      <!-- Closing -->
      <div style="font-family: ${font}; font-size: ${size.base}; line-height: ${size.lineHeight}; color: ${textColor}; text-align: ${data.closingAlign}; margin: 0 0 ${size.spacing} 0;">
        ${data.closing}
      </div>` : ''}

      ${data.names ? `
      <!-- Names -->
      <div style="font-family: ${font}; font-size: ${size.heading}; line-height: ${size.headingLineHeight}; font-weight: 700; color: ${nameColor}; text-align: ${data.namesAlign}; margin: 0 0 ${size.spacing} 0;">
        ${data.names}
      </div>` : ''}

      ${data.company ? `
      <!-- Company -->
      <div style="font-family: ${font}; font-size: ${size.base}; line-height: ${size.lineHeight}; font-weight: 600; color: ${companyColor}; text-align: ${data.companyAlign}; margin: 0 0 8px 0;">
        ${data.company}
      </div>` : ''}

      ${data.includeTagline && data.tagline ? `
      <!-- Tagline -->
      <div style="font-family: ${font}; font-size: ${size.small}; line-height: ${size.smallLineHeight}; color: ${taglineColor}; text-align: ${data.taglineAlign}; margin: 0 0 8px 0; font-style: italic;">
        ${data.tagline}
      </div>` : ''}

      <!-- Contact Info Rows -->
      ${contactRowsHtml}

      <!-- Social Media Icons -->
      ${socialBlock}

      <!-- Responsive Logo -->
      ${logoImg}

      <!-- QR Code Block -->
      ${qrBlock}

      ${data.includeDisclaimer && data.disclaimerText ? `
      <!-- Confidentiality Disclaimer -->
      <div style="margin-top: 12px; padding-top: 8px; border-top: 1px solid ${dividerColor}; font-size: 10px; line-height: 14px; color: ${taglineColor}; font-family: ${font}; text-align: ${data.disclaimerAlign};">
        ${data.disclaimerText}
      </div>` : ''}
    </td>
  </tr>
</table>`;
  }

  // 2. SIDE-BY-SIDE EXECUTIVE DUAL-COLUMN LAYOUT
  if (data.layout === 'side_by_side') {
    return `<table cellpadding="0" cellspacing="0" border="0" bgcolor="${containerBg}" style="border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-family: ${font}; color: ${textColor}; max-width: 580px; width: 100%; background-color: ${containerBg};">
  <tr>
    <td bgcolor="${containerBg}" style="padding: 12px 14px; font-family: ${font}; background-color: ${containerBg};">
      <table cellpadding="0" cellspacing="0" border="0" style="border-collapse: collapse; width: 100%;">
        <tr>
          <!-- Left Column: Scaled Logo & QR Code -->
          <td style="vertical-align: top; width: ${data.logoWidth + 10}px; padding-right: 18px; text-align: ${data.logoAlignment};">
            ${logoImg}
            ${qrBlock}
          </td>

          <!-- Vertical Divider -->
          <td style="width: 2px; background-color: ${dividerColor}; vertical-align: top;" width="2">
            <div style="width: 2px; height: 100%; min-height: 120px; background-color: ${dividerColor}; line-height: 1px; font-size: 1px;">&nbsp;</div>
          </td>

          <!-- Right Column: Content -->
          <td style="vertical-align: top; padding-left: 18px; font-family: ${font};">
            ${data.closing ? `
            <div style="font-family: ${font}; font-size: ${size.small}; color: ${taglineColor}; text-align: ${data.closingAlign}; margin-bottom: 2px;">
              ${data.closing}
            </div>` : ''}

            ${data.names ? `
            <div style="font-family: ${font}; font-size: ${size.heading}; font-weight: 700; color: ${nameColor}; text-align: ${data.namesAlign}; line-height: ${size.headingLineHeight};">
              ${data.names}
            </div>` : ''}

            ${data.company ? `
            <div style="font-family: ${font}; font-size: ${size.base}; font-weight: 600; color: ${companyColor}; text-align: ${data.companyAlign}; margin-bottom: 6px;">
              ${data.company}
            </div>` : ''}

            ${contactRowsHtml}

            <!-- Social Media Icons -->
            ${socialBlock}
          </td>
        </tr>
      </table>

      ${data.includeDisclaimer && data.disclaimerText ? `
      <!-- Disclaimer -->
      <div style="margin-top: 12px; padding-top: 6px; border-top: 1px solid ${dividerColor}; font-size: 10px; line-height: 14px; color: ${taglineColor}; font-family: ${font}; text-align: ${data.disclaimerAlign};">
        ${data.disclaimerText}
      </div>` : ''}
    </td>
  </tr>
</table>`;
  }

  // 3. MODERN COMPACT (Embroidered Stitch Bar)
  if (data.layout === 'modern_compact') {
    return `<table cellpadding="0" cellspacing="0" border="0" bgcolor="${containerBg}" style="border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-family: ${font}; color: ${textColor}; max-width: 540px; width: 100%; background-color: ${containerBg};">
  <tr>
    <td bgcolor="${containerBg}" style="padding: 12px 14px; font-family: ${font}; background-color: ${containerBg};">
      <!-- Header row with Names and Logo -->
      <table cellpadding="0" cellspacing="0" border="0" style="border-collapse: collapse; width: 100%; margin-bottom: 6px;">
        <tr>
          <td style="vertical-align: middle; text-align: ${data.namesAlign};">
            ${data.closing ? `<div style="font-family: ${font}; font-size: ${size.small}; color: ${taglineColor};">${data.closing}</div>` : ''}
            ${data.names ? `<div style="font-family: ${font}; font-size: ${size.heading}; font-weight: 700; color: ${nameColor};">${data.names}</div>` : ''}
            ${data.company ? `<div style="font-family: ${font}; font-size: ${size.base}; font-weight: 600; color: ${companyColor};">${data.company}</div>` : ''}
          </td>
          <td style="vertical-align: middle; text-align: ${data.logoAlignment}; width: ${data.logoWidth}px;">
            ${logoImg}
          </td>
        </tr>
      </table>

      <!-- Accent Divider Line -->
      <div style="height: 2px; width: 100%; background-color: ${dividerColor}; margin: 8px 0 10px 0; line-height: 1px; font-size: 1px;">&nbsp;</div>

      <!-- Inline Contact Row -->
      <table cellpadding="0" cellspacing="0" border="0" style="border-collapse: collapse; width: 100%; font-size: ${size.small}; line-height: ${size.lineHeight}; font-family: ${font};">
        <tr>
          <td style="color: ${textColor}; vertical-align: middle; text-align: ${data.contactAlign};">
            ${data.email ? `<a href="mailto:${data.email}" style="${linkStyle}"><span style="${linkSpanStyle}">${data.email}</span></a>` : ''}
            ${data.email && data.website ? `<span style="color: ${taglineColor}; padding: 0 6px;">·</span>` : ''}
            ${data.website ? `<a href="${data.websiteUrl}" target="_blank" rel="noopener noreferrer" style="${linkStyle}"><span style="${linkSpanStyle}">${data.website}</span></a>` : ''}
            ${data.website && data.phone ? `<span style="color: ${taglineColor}; padding: 0 6px;">·</span>` : ''}
            ${data.phone ? `<a href="${telHref}" style="${linkStyle}"><span style="${linkSpanStyle}">${data.phone}</span></a>` : ''}
          </td>
        </tr>
      </table>

      <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 6px;">
        ${socialBlock}
        ${qrBlock}
      </div>
    </td>
  </tr>
</table>`;
  }

  // 4. MINIMALIST (Clean & Direct)
  return `<table cellpadding="0" cellspacing="0" border="0" bgcolor="${containerBg}" style="border-collapse: collapse; font-family: ${font}; color: ${textColor}; max-width: 480px; width: 100%; background-color: ${containerBg};">
  <tr>
    <td bgcolor="${containerBg}" style="padding: 10px 12px; font-family: ${font}; font-size: ${size.base}; line-height: ${size.lineHeight}; background-color: ${containerBg};">
      <div style="color: ${nameColor}; font-weight: 600; margin-bottom: 2px; text-align: ${data.namesAlign};">
        ${data.names} ${data.company ? `| <span style="color: ${companyColor};">${data.company}</span>` : ''}
      </div>
      <div style="margin-bottom: 8px; font-size: ${size.small}; text-align: ${data.contactAlign};">
        ${data.phone ? `<a href="tel:${cleanPhoneNumber(data.phone)}" style="${linkStyle}"><span style="${linkSpanStyle}">${data.phone}</span></a>` : ''}
        ${data.phone && data.email ? `<span style="color: ${taglineColor};">&nbsp;|&nbsp;</span>` : ''}
        ${data.email ? `<a href="mailto:${data.email}" style="${linkStyle}"><span style="${linkSpanStyle}">${data.email}</span></a>` : ''}
        ${data.email && data.website ? `<span style="color: ${taglineColor};">&nbsp;|&nbsp;</span>` : ''}
        ${data.website ? `<a href="${data.websiteUrl}" target="_blank" rel="noopener noreferrer" style="${linkStyle}"><span style="${linkSpanStyle}">${data.website}</span></a>` : ''}
      </div>
      ${socialBlock}
      ${logoImg}
      ${qrBlock}
    </td>
  </tr>
</table>`;
}

/**
 * Generates clean plain text fallback for mail clients that do not accept HTML
 */
export function generateSignaturePlainText(data: SignatureData): string {
  const lines: string[] = [];
  if (data.closing) lines.push(data.closing);
  if (data.names) lines.push(data.names);
  if (data.company) lines.push(data.company);
  if (data.includeTagline && data.tagline) lines.push(data.tagline);
  if (data.email) lines.push(`${data.showLabels && data.emailLabel ? data.emailLabel + ' ' : ''}${data.email}`);
  if (data.website) lines.push(`${data.showLabels && data.websiteLabel ? data.websiteLabel + ' ' : ''}${data.website}`);
  if (data.phone) lines.push(`${data.showLabels && data.phoneLabel ? data.phoneLabel + ' ' : ''}${data.phone}`);
  if (data.includeSocials) {
    const socials: string[] = [];
    if (data.socialInstagram) socials.push(`Instagram: ${data.socialInstagram}`);
    if (data.socialFacebook) socials.push(`Facebook: ${data.socialFacebook}`);
    if (data.socialTiktok) socials.push(`TikTok: ${data.socialTiktok}`);
    if (socials.length) lines.push(socials.join(' | '));
  }
  if (data.includeQrCode && data.qrCodeUrl) {
    lines.push(`QR Link: ${data.qrCodeUrl}`);
  }
  return lines.join('\n');
}
