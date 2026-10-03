/**
 * Clipboard & Export Helper for Cross-Platform Email Signatures
 */

export interface CopyResult {
  success: boolean;
  message: string;
}

/**
 * Copies rich rendered HTML signature to the clipboard
 * This allows user to simply press Ctrl+V / Cmd+V directly inside Gmail or Outlook signature box.
 */
export async function copyRichSignature(htmlString: string, plainTextString: string, containerElement?: HTMLElement | null): Promise<CopyResult> {
  try {
    if (typeof navigator !== 'undefined' && navigator.clipboard && typeof ClipboardItem !== 'undefined') {
      const htmlBlob = new Blob([htmlString], { type: 'text/html' });
      const textBlob = new Blob([plainTextString], { type: 'text/plain' });
      const item = new ClipboardItem({
        'text/html': htmlBlob,
        'text/plain': textBlob,
      });

      await navigator.clipboard.write([item]);
      return {
        success: true,
        message: 'Signature copied! Paste (Ctrl+V / Cmd+V) directly into Gmail or Outlook settings.',
      };
    }
  } catch (err) {
    console.warn('Modern ClipboardItem API failed, falling back to selection copy:', err);
  }

  // Fallback: Using DOM Range Selection copy
  try {
    const hiddenDiv = document.createElement('div');
    hiddenDiv.style.position = 'fixed';
    hiddenDiv.style.left = '-9999px';
    hiddenDiv.style.top = '0';
    hiddenDiv.style.opacity = '0';
    hiddenDiv.setAttribute('contenteditable', 'true');
    hiddenDiv.innerHTML = containerElement ? containerElement.innerHTML : htmlString;
    document.body.appendChild(hiddenDiv);

    const range = document.createRange();
    range.selectNodeContents(hiddenDiv);
    const selection = window.getSelection();
    if (selection) {
      selection.removeAllRanges();
      selection.addRange(range);
      const successful = document.execCommand('copy');
      selection.removeAllRanges();
      document.body.removeChild(hiddenDiv);

      if (successful) {
        return {
          success: true,
          message: 'Signature copied to clipboard! Paste directly into your email settings.',
        };
      }
    }
    if (document.body.contains(hiddenDiv)) {
      document.body.removeChild(hiddenDiv);
    }
  } catch (selectionErr) {
    console.error('Selection copy fallback failed:', selectionErr);
  }

  // Final fallback: copy text
  try {
    await navigator.clipboard.writeText(htmlString);
    return {
      success: true,
      message: 'HTML code copied to clipboard.',
    };
  } catch {
    return {
      success: false,
      message: 'Could not access clipboard. Please copy manually from the HTML tab.',
    };
  }
}

/**
 * Copies raw inline HTML code string
 */
export async function copyRawHtml(htmlString: string): Promise<CopyResult> {
  try {
    await navigator.clipboard.writeText(htmlString);
    return {
      success: true,
      message: 'Raw HTML source copied to clipboard!',
    };
  } catch {
    return {
      success: false,
      message: 'Failed to copy HTML string.',
    };
  }
}

/**
 * Downloads a ready-to-use .html file for Outlook Signatures folder
 */
export function downloadSignatureHtml(htmlContent: string, fileName = 'JAM-3D-StitchWorks-Signature.html') {
  const fullHtmlDocument = `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>JAM 3D StitchWorks Signature</title>
</head>
<body style="margin: 0; padding: 10px; font-family: Arial, sans-serif;">
  ${htmlContent}
</body>
</html>`;

  const blob = new Blob([fullHtmlDocument], { type: 'text/html;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = fileName;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
