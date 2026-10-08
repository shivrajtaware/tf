export type Status = string;
export type Priority = 'Normal' | 'Urgent' | 'Critical';

export type Franchise = {
  id: string; name: string; owner: string; phone: string; email: string; city: string; region: string;
  address: string; warehouse: string; route: string; status: 'Draft'|'Review'|'Active'|'Suspended'|'Closed';
  creditLimit: number; outstanding: number; paymentTerms: string; priceList: string; score: number; lastOrder: string;
};

export type SKU = {
  id: string; code: string; name: string; category: 'Raw Material'|'Packaging'|'Finished Bakery'|'Consumable';
  uom: string; purchasePrice: number; transferPrice: number; taxRate: number; reorderPoint: number; safetyStock: number;
  leadTimeDays: number; shelfLifeDays: number; batchTracking: boolean; expiryTracking: boolean; status: 'Draft'|'Active'|'Archived';
  stock: number; reserved: number; incoming: number;
};

export type Supplier = { id: string; name: string; contact: string; phone: string; email: string; category: string; leadDays: number; fillRate: number; quality: number; status: 'Active'|'On Hold'|'Blacklisted'; };

export type OrderLine = { skuId: string; sku: string; name: string; uom: string; qty: number; rate: number; discount: number; taxRate: number; };
export type Order = {
  id: string; franchiseId: string; franchiseName: string; source: 'Franchise Self-Service'|'HQ Assisted'|'Recurring Template'|'AI Suggested';
  assistanceReason?: string; orderDate: string; requiredDate: string; warehouse: string; priority: Priority; status: string;
  lines: OrderLine[]; notes: string; createdBy: string; createdFor: string; createdAt: string; amount: number; paymentState: string;
};

export type ProcurementRecord = { id: string; type: 'PR'|'PO'|'GRN'; subject: string; supplier: string; warehouse: string; qty: string; value: number; status: string; requiredBy: string; priority: string; };
export type InventoryRow = { id: string; skuId: string; sku: string; item: string; warehouse: string; location: string; batch: string; expiry: string; onHand: number; reserved: number; blocked: number; incoming: number; cost: number; status: string; };
export type Dispatch = { id: string; route: string; vehicle: string; driver: string; stops: number; delivered: number; delayed: number; status: string; eta: string; };
export type WorkOrder = { id:string; product:string; planned:number; actual:number; line:string; status:string; waste:string; batch?:string; shift?:string; date?:string; };
export type Payment = { id: string; invoice: string; franchise: string; franchiseId: string; date: string; due: string; amount: number; paid: number; outstanding: number; method: string; reference: string; status: string; };
export type Ticket = { id: string; franchiseId: string; franchise: string; issue: string; category: string; severity: string; sla: string; owner: string; status: string; updated: string; };
export type Notification = { id: string; severity: 'Critical'|'Warning'|'Info'; title: string; detail: string; module: string; entityId?: string; time: string; status: 'New'|'Acknowledged'|'Resolved'|'Dismissed'; };
export type Recommendation = { id: string; type: string; title: string; entity: string; risk: string; impact: string; freshness: string; confidence: string; status: 'Suggested'|'Accepted'|'Edited'|'Ignored'|'Snoozed'|'Generated'; why: string; evidence: string[]; action: string; };
export type Warehouse = { id: string; code: string; name: string; address: string; manager: string; capacity: number; used: number; cutoff: string; status: 'Active'|'Inactive'; };

export type AppState = {
  franchises: Franchise[]; skus: SKU[]; suppliers: Supplier[]; orders: Order[]; procurements: ProcurementRecord[];
  inventory: InventoryRow[]; dispatches: Dispatch[]; workOrders: WorkOrder[]; payments: Payment[]; tickets: Ticket[];
  notifications: Notification[]; recommendations: Recommendation[]; warehouses: Warehouse[];
  audit: { id: string; action: string; actor: string; entity: string; entityId: string; time: string; detail: string }[];
  lastSavedAt: string;
};
