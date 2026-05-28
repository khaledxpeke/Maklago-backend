import type { Order, OrderLine, Product } from '../db/tenant-client';

/** Structured receipt lines for Flutter / POS to render or feed ESC/POS stack. */
export type ReceiptLine = {
  text: string;
  bold?: boolean;
  size?: 'normal' | 'large';
};

export type PrintJob = {
  kind: 'customer_receipt' | 'kitchen_ticket';
  title: string;
  lines: ReceiptLine[];
  /** Optional raw ESC/POS for network printers; Flutter may ignore or pipe to Bluetooth/USB. */
  escPosBase64: string | null;
};

function toEscPosBase64(lines: ReceiptLine[]): string {
  const parts: string[] = [];
  const esc = String.fromCharCode;
  parts.push(esc(0x1b) + '@');
  for (const line of lines) {
    let prefix = '';
    if (line.bold) prefix += esc(0x1b) + 'E' + esc(1);
    const text = `${line.text}\n`;
    parts.push(prefix + text);
    if (line.bold) parts.push(esc(0x1b) + 'E' + esc(0));
  }
  parts.push(esc(0x1b) + 'd' + esc(2));
  const raw = parts.join('');
  return Buffer.from(raw, 'latin1').toString('base64');
}

export function buildCustomerReceiptJobs(args: {
  order: Order;
  lines: (OrderLine & { product: Pick<Product, 'name'> })[];
  venueName: string;
}): PrintJob[] {
  const textLines: ReceiptLine[] = [
    { text: args.venueName, bold: true, size: 'large' },
    { text: `Ref ${args.order.reference}` },
    { text: `Status: ${args.order.status}` },
    { text: '---' },
  ];
  for (const l of args.lines) {
    const name = l.product.name;
    textLines.push({
      text: `${l.quantity}× ${name}  ${(l.lineTotalCents / 100).toFixed(2)}`,
    });
    if (l.note) textLines.push({ text: `   Note: ${l.note}` });
  }
  textLines.push({ text: '---' });
  textLines.push({
    text: `Subtotal ${(args.order.subtotalCents / 100).toFixed(2)}`,
  });
  textLines.push({ text: `Tax ${(args.order.taxCents / 100).toFixed(2)}` });
  textLines.push({
    text: `TOTAL ${(args.order.totalCents / 100).toFixed(2)}`,
    bold: true,
  });

  const job: PrintJob = {
    kind: 'customer_receipt',
    title: 'Customer receipt',
    lines: textLines,
    escPosBase64: toEscPosBase64(textLines),
  };

  return [job];
}

/** Shift-close ticket for manager caisse (summary lines + totals). */
export function buildShiftCloseReceipt(args: {
  venueName: string;
  closedAt: Date;
  periodLabel: string;
  lines: { commandNumber: number; reference: string; total: number }[];
  totals: {
    grandTotal: number;
    cashTotal: number;
    cardTotal: number;
    orderCount: number;
  };
}): PrintJob {
  const textLines: ReceiptLine[] = [
    { text: args.venueName, bold: true, size: 'large' },
    { text: 'SHIFT CLOSE', bold: true },
    { text: args.periodLabel },
    { text: args.closedAt.toISOString() },
    { text: '---' },
  ];
  for (const line of args.lines) {
    textLines.push({
      text: `#${line.commandNumber} ${line.reference}  ${line.total.toFixed(2)}`,
    });
  }
  textLines.push({ text: '---' });
  textLines.push({ text: `Orders: ${args.totals.orderCount}` });
  textLines.push({ text: `Cash: ${args.totals.cashTotal.toFixed(2)}` });
  textLines.push({ text: `Card: ${args.totals.cardTotal.toFixed(2)}` });
  textLines.push({
    text: `TOTAL ${args.totals.grandTotal.toFixed(2)}`,
    bold: true,
    size: 'large',
  });

  return {
    kind: 'customer_receipt',
    title: 'Shift close',
    lines: textLines,
    escPosBase64: toEscPosBase64(textLines),
  };
}

export function buildKitchenTicketJobs(args: {
  order: Order;
  lines: (OrderLine & { product: Pick<Product, 'name'> })[];
}): PrintJob[] {
  const textLines: ReceiptLine[] = [
    { text: `KITCHEN  ${args.order.reference}`, bold: true },
    { text: '---' },
  ];
  for (const l of args.lines) {
    textLines.push({ text: `${l.quantity}× ${l.product.name}`, bold: true });
    if (l.note) textLines.push({ text: `   >> ${l.note}` });
  }
  return [
    {
      kind: 'kitchen_ticket',
      title: 'Kitchen',
      lines: textLines,
      escPosBase64: toEscPosBase64(textLines),
    },
  ];
}
