import type { AppState, Franchise, SKU, Supplier, Order, ProcurementRecord, InventoryRow, Dispatch, Payment, Ticket, Notification, Recommendation, Warehouse, WorkOrder } from '@/lib/types';

const cities = ['Barwaha','Khargone','Indore','Khandwa','Sanawad','Manawar','Dhar','Badnawar','Mhow','Burhanpur','Ujjain','Dewas','Ratlam','Bhopal','Pithampur'];
const franchiseNames = ['Barwaha Central','Khargone Main','Indore Ring Road','Khandwa Bypass','Sanawad Market','Manawar Main','Dhar Highway','Badnawar Chowk','Mhow Depot','Burhanpur Gate','Ujjain Freeganj','Dewas AB Road','Ratlam Station','Bhopal MP Nagar','Pithampur Sector 1'];
const itemSeeds: [string,string,SKU['category'],string,number,number,number,number,number][] = [
  ['TEA-025','Premium Tea Powder 25 KG','Raw Material','kg',1800,2240,5,36,18],
  ['SUG-050','Refined Sugar 50 KG','Raw Material','kg',2200,2650,5,50,20],
  ['FLR-050','Bakery Flour 50 KG','Raw Material','kg',1950,2490,5,40,15],
  ['BUT-015','Butter 15 KG','Raw Material','kg',6300,7600,12,15,6],
  ['MIL-020','Dairy Cream 20 L','Raw Material','litre',3600,4500,12,22,9],
  ['CUP-1000','Tea Cup 1000 PCS','Packaging','pcs',680,920,12,2000,800],
  ['BOX-020','Cake Box 20 PCS','Packaging','pcs',820,1120,12,800,320],
  ['NAP-1000','Napkin 1000 PCS','Packaging','pcs',190,320,12,1200,400],
  ['MILK-001','Fresh Milk','Raw Material','litre',56,72,5,300,120],
  ['CHOCO-005','Compound Chocolate 5 KG','Raw Material','kg',980,1260,18,25,10],
  ['MAWA-005','Fresh Mawa 5 KG','Raw Material','kg',820,1040,5,30,12],
  ['COCO-001','Cocoa Powder 1 KG','Raw Material','kg',420,560,18,24,10],
  ['COFF-001','Roasted Coffee 1 KG','Raw Material','kg',560,720,5,40,12],
  ['SALT-025','Iodized Salt 25 KG','Raw Material','kg',610,780,5,30,12],
  ['TRAY-050','Bakery Tray 50 PCS','Packaging','pcs',1320,1680,18,80,30],
];
const bakeryNames = ['Milk Cake','Mawa Cake','Cream Roll','Pineapple Pastry','Chocolate Brownie','Tea Biscuit Box','Khari Puff','Butter Croissant','Elaichi Cake','Dry Fruit Cake'];

export function makeSeedState(): AppState {
  const warehouses: Warehouse[] = [
    {id:'WH-01', code:'CWH', name:'Central Distribution Hub', address:'Indore Industrial Estate', manager:'Rakesh Mehta', capacity:100000, used:73000, cutoff:'14:30', status:'Active'},
    {id:'WH-02', code:'WWH', name:'West Warehouse', address:'Khargone Logistics Park', manager:'Amit Yadav', capacity:65000, used:44000, cutoff:'15:00', status:'Active'},
    {id:'WH-03', code:'SWH', name:'South Warehouse', address:'Khandwa Road, Sanawad', manager:'Suresh Patil', capacity:45000, used:31800, cutoff:'13:30', status:'Active'},
  ];
  const franchises: Franchise[] = Array.from({length:50},(_,i)=>{
    const city = cities[i % cities.length];
    const name = franchiseNames[i % franchiseNames.length] + (i >= franchiseNames.length ? ` ${Math.floor(i/franchiseNames.length)+1}` : '');
    const outstanding = [18400,0,42100,76500,6200,12500,7800,0,27600,15900][i%10];
    const status = i===7 ? 'Suspended' : 'Active';
    return {id:`FR-${String(i+18).padStart(3,'0')}`, name:`उपसरपंच ${name}`, owner:['Aarav Shah','Neha Patil','Vikas Joshi','Pooja Jain','Rohit Solanki'][i%5], phone:`+91 9${String(800000000+i).slice(-9)}`, email:`franchise${i+1}@upsarpanch.demo`, city, region:i%3===0?'Central':i%3===1?'West':'South', address:`Main Market, ${city}, Madhya Pradesh`, warehouse:warehouses[i%3].name, route:`Route ${String((i%12)+1).padStart(2,'0')}`, status:status as Franchise['status'], creditLimit:[50000,75000,100000,125000][i%4], outstanding, paymentTerms:['COD','7 days','15 days','30 days'][i%4], priceList:['Standard','Central Preferred','High Volume'][i%3], score:[92,96,73,58,90,81,95,88,79][i%9], lastOrder:i%3===0?'Today':i%3===1?'Yesterday':`${i+1} days ago`};
  });
  const skus: SKU[] = Array.from({length:120},(_,i)=>{
    const base = itemSeeds[i % itemSeeds.length];
    const isBakery = i % 7 === 0;
    const code = isBakery ? `FIN-${String(i+101).padStart(3,'0')}` : `${base[0].slice(0,3)}-${String(i+1).padStart(3,'0')}`;
    const name = isBakery ? bakeryNames[(i/7|0)%bakeryNames.length] : `${base[1]} ${i>=itemSeeds.length ? `Batch ${Math.floor(i/itemSeeds.length)+1}` : ''}`.trim();
    const category = isBakery ? 'Finished Bakery' : base[2] as SKU['category'];
    return {id:`SKU-${i+1}`, code, name, category, uom: isBakery?'pcs':base[3], purchasePrice:isBakery?180:base[4], transferPrice:isBakery?260:base[5], taxRate:isBakery?18:base[6], reorderPoint:isBakery?1600:base[7], safetyStock:isBakery?700:base[8], leadTimeDays:2+(i%7), shelfLifeDays:isBakery?4:30+(i%150), batchTracking:isBakery||i%3===0, expiryTracking:isBakery||i%4===0, status:'Active', stock:Math.max(3,Math.round((isBakery?9000:base[7]*2)+(i%11)*130)), reserved:Math.max(0,Math.round((i%9)*90)), incoming:Math.round((i%8)*250)};
  });
  const suppliers: Supplier[] = Array.from({length:22},(_,i)=>({id:`SUP-${String(i+11).padStart(3,'0')}`,name:['Shree Foods & Ingredients','Central Packaging Works','Malwa Dairy Ingredients','Narmada Sugar Mills','Kshipra Bakers Supply','MP Packaging House','Indore Agro Commodities'][i%7]+(i>=7?` ${Math.floor(i/7)+1}`:''),contact:['Rahul Sharma','Sneha Kulkarni','Manoj Patel','Arun Jain'][i%4],phone:`+91 8${String(900000000+i).slice(-9)}`,email:`supplier${i+1}@demo.local`,category:['Raw Materials','Packaging','Dairy','Sweeteners'][i%4],leadDays:2+(i%8),fillRate:91+(i%9),quality:96+(i%4)*0.8,status:i===6?'On Hold':'Active'}));
  const orders: Order[] = Array.from({length:38},(_,i)=>{
    const f=franchises[i%franchises.length]; const source=(['HQ Assisted','Franchise Self-Service','AI Suggested','Recurring Template'][i%4]) as Order['source'];
    const statuses=['Approved','Under Review','Allocated','Picking','Packed','Dispatched','Delivered','Submitted'];
    const lines=[0,1,2].slice(0,(i%3)+1).map((_,j)=>{const s=skus[(i*3+j)%skus.length]; return {skuId:s.id,sku:s.code,name:s.name,uom:s.uom,qty:Math.max(1,20+(i+j)*3),rate:s.transferPrice,discount:j===1?4:0,taxRate:s.taxRate};});
    const amount=lines.reduce((a,l)=>a+l.qty*l.rate*(1-l.discount/100)*(1+l.taxRate/100),0);
    return {id:`ORD-${10450+i}`,franchiseId:f.id,franchiseName:f.name,source,assistanceReason:source==='HQ Assisted'?'Franchise called HQ for assisted ordering':undefined,orderDate:`2026-10-${String((i%5)+1).padStart(2,'0')}T${String(8+(i%8)).padStart(2,'0')}:30:00`,requiredDate:`2026-10-${String((i%5)+5).padStart(2,'0')}`,warehouse:f.warehouse,priority:i%13===0?'Critical':i%5===0?'Urgent':'Normal',status:statuses[i%statuses.length],lines,notes:i%6===0?'Deliver before evening peak.':'',createdBy:source==='HQ Assisted'?'Rahul Kumar':source==='AI Suggested'?'Rahul Kumar':'Franchise Owner',createdFor:f.name,createdAt:`2026-10-0${(i%5)+1}T${String(8+(i%8)).padStart(2,'0')}:30:00`,amount:Math.round(amount),paymentState:i%7===0?'Credit Hold':i%4===0?'Partially Paid':'Open'};
  });
  const procurements: ProcurementRecord[] = [
    {id:'PR-2026-0198',type:'PR',subject:'Premium Tea Powder',supplier:'Shree Foods & Ingredients',warehouse:'Central Distribution Hub',qty:'240 kg',value:432000,status:'Approval Needed',requiredBy:'07 Oct 2026',priority:'Urgent'},
    {id:'PO-2026-0451',type:'PO',subject:'Bakery Flour',supplier:'Central Packaging Works',warehouse:'West Warehouse',qty:'1,200 kg',value:62400,status:'Supplier Delayed',requiredBy:'04 Oct 2026',priority:'Normal'},
    {id:'GRN-2026-0174',type:'GRN',subject:'Butter',supplier:'Malwa Dairy Ingredients',warehouse:'Central Distribution Hub',qty:'18 kg',value:113400,status:'QC Pending',requiredBy:'05 Oct 2026',priority:'Normal'},
    {id:'PR-2026-0197',type:'PR',subject:'Cake Boxes',supplier:'MP Packaging House',warehouse:'South Warehouse',qty:'1,600 pcs',value:35200,status:'Approved',requiredBy:'09 Oct 2026',priority:'Normal'},
    {id:'PO-2026-0452',type:'PO',subject:'Sugar',supplier:'Narmada Sugar Mills',warehouse:'Central Distribution Hub',qty:'1,000 kg',value:53000,status:'Sent',requiredBy:'10 Oct 2026',priority:'Normal'},
    {id:'GRN-2026-0175',type:'GRN',subject:'Tea Cups',supplier:'MP Packaging House',warehouse:'South Warehouse',qty:'4,000 pcs',value:36800,status:'Posted',requiredBy:'03 Oct 2026',priority:'Normal'},
  ];
  const inventory: InventoryRow[] = skus.slice(0,42).map((s,i)=>({id:`INV-${i+1}`,skuId:s.id,sku:s.code,item:s.name,warehouse:warehouses[i%3].name,location:`Z${(i%4)+1}-R${(i%6)+1}-B${String((i%12)+1).padStart(2,'0')}`,batch:s.batchTracking?`B${2026}${String((i%20)+1).padStart(3,'0')}`:'—',expiry:s.expiryTracking?`2026-${String((i%4)+10).padStart(2,'0')}-${String((i%25)+1).padStart(2,'0')}`:'—',onHand:s.stock,reserved:s.reserved,blocked:i%11===0?120:0,incoming:s.incoming,cost:s.purchasePrice,status:s.stock-s.reserved-(i%11===0?120:0)<s.reorderPoint?'Critical':s.stock<s.reorderPoint*1.4?'Watch':'Healthy'}));
  const dispatches: Dispatch[] = Array.from({length:14},(_,i)=>({id:`DSP-2026-${String(324+i).padStart(4,'0')}`,route:`Route ${String((i%10)+1).padStart(2,'0')}`,vehicle:`MP09 ${['AB','CX','DE','GH'][i%4]} ${String(4400+i*17).slice(0,4)}`,driver:['Rakesh','Amit','Suresh','Karan','Vijay'][i%5],stops:4+(i%6),delivered:i%4,delayed:i%7===0?2:0,status:['In Transit','Packing','Scheduled','Completed'][i%4],eta:i%4===0?'18 min':i%4===1?'—':'Today 5:30 PM'}));
  const workOrders: WorkOrder[] = [{id:'WO-2026-0087',product:'Milk Cake',planned:800,actual:620,line:'Line A',status:'In Production',waste:'3.1%',batch:'MB-017',shift:'Morning',date:'05 Oct 2026'},{id:'WO-2026-0088',product:'Mawa Cake',planned:500,actual:500,line:'Line B',status:'QC Pending',waste:'1.8%',batch:'MB-018',shift:'Afternoon',date:'05 Oct 2026'},{id:'WO-2026-0089',product:'Cream Roll',planned:1200,actual:0,line:'Line C',status:'Planned',waste:'—',batch:'—',shift:'Night',date:'05 Oct 2026'},{id:'WO-2026-0090',product:'Elaichi Cake',planned:600,actual:580,line:'Line A',status:'QC Released',waste:'2.2%',batch:'MB-020',shift:'Morning',date:'05 Oct 2026'}];
  const payments: Payment[] = Array.from({length:18},(_,i)=>{const f=franchises[i%franchises.length]; const amount=12000+(i%7)*8400; const paid=i%5===0?amount:i%4===0?Math.round(amount*.45):0; const outstanding=amount-paid; return {id:`PAY-${i+1}`,invoice:`INV-2026-${String(820+i).padStart(4,'0')}`,franchise:f.name,franchiseId:f.id,date:`2026-10-${String((i%5)+1).padStart(2,'0')}`,due:`2026-10-${String((i%6)+2).padStart(2,'0')}`,amount,paid,outstanding,method:i%3===0?'UPI':'Bank',reference:`REF${9000+i}`,status:outstanding===0?'Paid':i%2===0?'Overdue':'Due Today'};});
  const tickets: Ticket[] = Array.from({length:14},(_,i)=>{const f=franchises[(i*3)%franchises.length];return {id:`TCK-${2026}${String(i+71).padStart(4,'0')}`,franchiseId:f.id,franchise:f.name,issue:['Delivery shortage','Invoice mismatch','Product quality concern','Stock availability','Login issue'][i%5],category:['Delivery','Invoice','Quality','Stock','Technical'][i%5],severity:i%6===0?'Critical':i%3===0?'High':'Normal',sla:`Today ${3+(i%6)}:00 PM`,owner:['Priya','Rahul','Meera','Kunal'][i%4],status:['Open','Assigned','Waiting for Franchise','Resolved'][i%4],updated:`${10+i} min ago`};});
  const notifications: Notification[] = [
    {id:'ALT-001',severity:'Critical',title:'Tea Powder stock-out prediction',detail:'Central WH — projected depletion in 3 days',module:'Inventory',entityId:'TEA-025',time:'8 min ago',status:'New'},
    {id:'ALT-002',severity:'Warning',title:'PO-2026-0451 delivery overdue',detail:'Supplier SUP-017 • 1,200 kg flour',module:'Procurement',entityId:'PO-2026-0451',time:'21 min ago',status:'New'},
    {id:'ALT-003',severity:'Warning',title:'FR-041 consumption anomaly',detail:'Bakery ingredient usage +14% above baseline',module:'Franchises',entityId:'FR-041',time:'48 min ago',status:'Acknowledged'},
    {id:'ALT-004',severity:'Info',title:'AI recommendation ready',detail:'Replenishment proposal for 6 SKUs',module:'Intelligence',time:'1 hr ago',status:'New'},
    {id:'ALT-005',severity:'Critical',title:'4 franchise orders exceed credit limit',detail:'₹86,400 blocked across 4 orders',module:'Finance',time:'1h 12m ago',status:'New'},
    {id:'ALT-006',severity:'Warning',title:'GRN pending QC release',detail:'18 kg butter held at Central WH',module:'Quality',entityId:'GRN-2026-0174',time:'2 hr ago',status:'New'},
  ];
  const recommendations: Recommendation[] = [
    {id:'AI-2026-001',type:'Stock-out Risk',title:'Replenish Premium Tea Powder for Central Warehouse',entity:'TEA-025 · Central Distribution Hub',risk:'3 days to projected depletion',impact:'₹1.8L revenue protected',freshness:'8 minutes ago',confidence:'High · based on 90-day order history',status:'Suggested',why:'Projected daily consumption is above the current replenishment plan while the earliest open PO arrives after the depletion date.',evidence:['30-day average demand: 31 kg/day','Available stock after reservation: 53 kg','Open PO arrival: 6 days','Safety stock target: 18 kg'],action:'Create PR for 240 kg'},
    {id:'AI-2026-002',type:'Supplier Intelligence',title:'Review Central Packaging Works performance',entity:'SUP-017',risk:'Late-delivery pattern',impact:'1,200 kg currently delayed',freshness:'21 minutes ago',confidence:'High · 17 PO history points',status:'Suggested',why:'On-time delivery has fallen from 94% to 82% over the last 8 POs and quality remained stable, suggesting logistics rather than material quality is the main problem.',evidence:['Current PO overdue by 2 days','8-PO on-time rate: 82%','Fill rate: 91.2%','Quality score: 98.2%'],action:'Open supplier review'},
    {id:'AI-2026-003',type:'Franchise Operations',title:'Investigate Indore Ring Road consumption anomaly',entity:'FR-041',risk:'14% above baseline',impact:'₹18,900 estimated monthly waste',freshness:'48 minutes ago',confidence:'Medium · 30-day history',status:'Suggested',why:'Milk, butter and flour consumption rose faster than order volume, with the anomaly concentrated on two products.',evidence:['Order volume +2%','Ingredient usage +14%','Repeat pattern: 9 days','Last count variance: +3.4%'],action:'Open franchise activity'},
  ];
  const audit=[{id:'AUD-001',action:'Approved PR',actor:'Rahul Kumar',entity:'Purchase Requisition',entityId:'PR-2026-0197',time:'10:18 AM',detail:'Approved for warehouse replenishment'},{id:'AUD-002',action:'Created HQ Assisted Order',actor:'Meera Joshi',entity:'Order',entityId:'ORD-10482',time:'09:44 AM',detail:'Assistance reason captured'},{id:'AUD-003',action:'Posted GRN',actor:'Amit Yadav',entity:'GRN',entityId:'GRN-2026-0175',time:'08:58 AM',detail:'4,000 cups received and posted'}];
  return {franchises,skus,suppliers,orders,procurements,inventory,dispatches,workOrders,payments,tickets,notifications,recommendations,warehouses,audit,lastSavedAt:new Date().toISOString()};
}
