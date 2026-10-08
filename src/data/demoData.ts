export const kpis = [
  { label: "Active Franchises", value: "86", delta: "+4.8%", note: "vs last month", tone: "orange" },
  { label: "Orders Today", value: "142", delta: "+11.2%", note: "vs same weekday", tone: "orange" },
  { label: "Pending Fulfilment", value: "27", delta: "7 urgent", note: "needs attention", tone: "warning" },
  { label: "Warehouse Stock Value", value: "₹18.5L", delta: "+6.1%", note: "across 3 warehouses", tone: "neutral" },
  { label: "Outstanding Payments", value: "₹4.2L", delta: "8 overdue", note: "collection queue", tone: "danger" },
  { label: "On-Time Delivery", value: "94.2%", delta: "+2.6pp", note: "rolling 30 days", tone: "success" },
];

export const attention = [
  { severity: "Critical", title: "Tea Powder stock-out predicted", meta: "Central Warehouse • ~3 days", impact: "₹1.8L revenue at risk", action: "Review replenishment" },
  { severity: "Critical", title: "4 franchise orders exceed credit limit", meta: "Finance • 2h ago", impact: "₹86,400 blocked", action: "Review approvals" },
  { severity: "Warning", title: "Bakery wastage above normal", meta: "Franchise FR-041 • +14%", impact: "₹18,900 estimated waste", action: "Investigate" },
  { severity: "Warning", title: "Supplier delivery overdue", meta: "SUP-017 • PO-2026-00451", impact: "1,200 kg delayed", action: "Open PO" },
];

export const franchises = [
  { id: "FR-018", name: "उपसरपंच Barwaha Central", city: "Barwaha", status: "Active", warehouse: "Central WH", outstanding: 18400, lastOrder: "Today", usage: "Healthy", score: 92 },
  { id: "FR-021", name: "उपसरपंच Khargone Main", city: "Khargone", status: "Active", warehouse: "West WH", outstanding: 0, lastOrder: "Yesterday", usage: "Healthy", score: 96 },
  { id: "FR-041", name: "उपसरपंच Indore Ring Road", city: "Indore", status: "Active", warehouse: "Central WH", outstanding: 42100, lastOrder: "4 days ago", usage: "Attention", score: 73 },
  { id: "FR-057", name: "उपसरपंच Khandwa Bypass", city: "Khandwa", status: "Suspended", warehouse: "West WH", outstanding: 76500, lastOrder: "18 days ago", usage: "Critical", score: 58 },
  { id: "FR-064", name: "उपसरपंच Sanawad Market", city: "Sanawad", status: "Active", warehouse: "Central WH", outstanding: 6200, lastOrder: "Today", usage: "Healthy", score: 90 },
  { id: "FR-078", name: "उपसरपंच Manawar", city: "Manawar", status: "Active", warehouse: "South WH", outstanding: 12500, lastOrder: "Today", usage: "Watch", score: 81 },
];

export const orders = [
  { id: "ORD-10482", franchise: "FR-018", franchiseName: "Barwaha Central", source: "HQ Assisted", items: 7, amount: 28400, status: "Picking", warehouse: "Central WH", required: "Today", priority: "Urgent" },
  { id: "ORD-10481", franchise: "FR-021", franchiseName: "Khargone Main", source: "Franchise", items: 4, amount: 16250, status: "Approved", warehouse: "West WH", required: "Tomorrow", priority: "Normal" },
  { id: "ORD-10480", franchise: "FR-041", franchiseName: "Indore Ring Road", source: "Franchise", items: 9, amount: 39600, status: "Under Review", warehouse: "Central WH", required: "Tomorrow", priority: "Normal" },
  { id: "ORD-10479", franchise: "FR-064", franchiseName: "Sanawad Market", source: "AI Suggested", items: 6, amount: 21400, status: "Allocated", warehouse: "Central WH", required: "Today", priority: "Normal" },
  { id: "ORD-10478", franchise: "FR-078", franchiseName: "Manawar", source: "Recurring", items: 5, amount: 18400, status: "Dispatched", warehouse: "South WH", required: "Today", priority: "Normal" },
];

export const inventory = [
  { sku: "TEA-025", item: "Premium Tea Powder 25 KG", warehouse: "Central WH", onHand: 84, reserved: 31, incoming: 60, expiry: "18 Nov 2026", status: "Healthy", value: 151200 },
  { sku: "SUG-050", item: "Refined Sugar 50 KG", warehouse: "Central WH", onHand: 42, reserved: 18, incoming: 0, expiry: "04 Feb 2028", status: "Watch", value: 92400 },
  { sku: "FLR-050", item: "Bakery Flour 50 KG", warehouse: "West WH", onHand: 18, reserved: 14, incoming: 120, expiry: "21 Dec 2026", status: "Critical", value: 70200 },
  { sku: "CUP-100", item: "Tea Cup 1000 PCS", warehouse: "Central WH", onHand: 26, reserved: 8, incoming: 40, expiry: "—", status: "Healthy", value: 46800 },
  { sku: "BOX-020", item: "Cake Box 20 PCS", warehouse: "South WH", onHand: 11, reserved: 5, incoming: 80, expiry: "—", status: "Watch", value: 22000 },
  { sku: "BUT-015", item: "Butter 15 KG", warehouse: "Central WH", onHand: 9, reserved: 7, incoming: 18, expiry: "29 Oct 2026", status: "Critical", value: 56700 },
];

export const suppliers = [
  { id: "SUP-011", name: "Shree Foods & Ingredients", category: "Raw Materials", lead: "3 days", fill: "97.8%", quality: "99.1%", status: "Active" },
  { id: "SUP-017", name: "Central Packaging Works", category: "Packaging", lead: "7 days", fill: "91.2%", quality: "98.2%", status: "On Hold" },
  { id: "SUP-023", name: "Malwa Dairy Ingredients", category: "Dairy", lead: "2 days", fill: "99.1%", quality: "99.5%", status: "Active" },
  { id: "SUP-029", name: "Narmada Sugar Mills", category: "Sweeteners", lead: "5 days", fill: "95.4%", quality: "97.3%", status: "Active" },
];

export const procurements = [
  { id: "PR-2026-0198", type: "PR", subject: "Premium Tea Powder", qty: "240 kg", warehouse: "Central WH", status: "Approval Needed", value: 432000 },
  { id: "PO-2026-0451", type: "PO", subject: "Bakery Flour", qty: "1200 kg", warehouse: "West WH", status: "Supplier Delayed", value: 62400 },
  { id: "GRN-2026-0174", type: "GRN", subject: "Butter", qty: "18 kg", warehouse: "Central WH", status: "QC Pending", value: 113400 },
  { id: "PR-2026-0197", type: "PR", subject: "Cake Boxes", qty: "1600 pcs", warehouse: "South WH", status: "Approved", value: 35200 },
];

export const production = [
  { id: "WO-2026-0087", product: "Milk Cake", planned: 800, actual: 620, line: "Line A", status: "In Production", waste: "3.1%" },
  { id: "WO-2026-0088", product: "Mawa Cake", planned: 500, actual: 500, line: "Line B", status: "QC Pending", waste: "1.8%" },
  { id: "WO-2026-0089", product: "Cream Roll", planned: 1200, actual: 0, line: "Line C", status: "Planned", waste: "—" },
];

export const dispatches = [
  { id: "DSP-2026-0324", route: "Route 04", vehicle: "MP09 AB 4482", driver: "Rakesh", stops: 6, status: "In Transit", eta: "18 min" },
  { id: "DSP-2026-0325", route: "Route 07", vehicle: "MP09 CX 7124", driver: "Amit", stops: 4, status: "Packing", eta: "—" },
  { id: "DSP-2026-0326", route: "Route 02", vehicle: "MP10 DE 2409", driver: "Suresh", stops: 8, status: "Scheduled", eta: "Today 5:30 PM" },
];

export const payments = [
  { invoice: "INV-2026-0842", franchise: "FR-018", amount: 28400, due: "06 Oct 2026", status: "Due Today" },
  { invoice: "INV-2026-0835", franchise: "FR-041", amount: 39600, due: "02 Oct 2026", status: "Overdue" },
  { invoice: "INV-2026-0818", franchise: "FR-078", amount: 18400, due: "01 Oct 2026", status: "Overdue" },
  { invoice: "INV-2026-0801", franchise: "FR-021", amount: 16250, due: "08 Oct 2026", status: "Upcoming" },
];

export const notifications = [
  { severity: "Critical", title: "Tea Powder stock-out prediction", detail: "Central WH — projected depletion in 3 days", time: "8 min ago" },
  { severity: "Warning", title: "PO-2026-0451 delivery overdue", detail: "Supplier SUP-017 • 1,200 kg flour", time: "21 min ago" },
  { severity: "Warning", title: "FR-041 consumption anomaly", detail: "Bakery ingredient usage +14% above baseline", time: "48 min ago" },
  { severity: "Info", title: "AI recommendation ready", detail: "Replenishment proposal for 6 SKUs", time: "1 hr ago" },
];
