"use client";
import {Suspense,useEffect,useMemo,useState} from 'react';
import {Activity,BarChart3,Bell,BellRing,BrainCircuit,Building2,Boxes,ChevronDown,ChevronRight,ClipboardList,Factory,Headphones,HelpCircle,IndianRupee,LogOut,LucideIcon,Menu,PanelLeftClose,PanelLeftOpen,Search,Settings2,ShieldCheck,Sparkles,ShoppingCart,Truck,Warehouse,X} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import {usePathname,useSearchParams} from 'next/navigation';
import {cn} from '@/lib/utils';
import {LanguagePicker,useLanguage} from '@/lib/language';

const nav=[
 {label:'Control Tower',href:'/dashboard'},
 {group:'NETWORK'},
 {label:'Franchise Network',href:'/franchises',children:[['Franchises','/franchises'],['Franchise Users','/admin?tab=users'],['Commercial Profiles','/catalog?tab=prices']]},
 {label:'Orders',href:'/orders',badge:'27',children:[['All Orders','/orders'],['Pending Approval','/orders?status=Under Review'],['Assisted Orders','/orders?source=HQ Assisted'],['Allocation','/orders?status=Allocated'],['Pick / Pack','/orders?status=Picking']]},
 {group:'SUPPLY CHAIN'},
 {label:'Products & Recipes',href:'/catalog',children:[['SKU Master','/catalog'],['Categories','/catalog?tab=categories'],['UOM','/catalog?tab=uom'],['Prices','/catalog?tab=prices'],['Recipes / BOM','/catalog?tab=recipes']]},
 {label:'Procurement',href:'/procurement',children:[['Suppliers','/suppliers'],['Requisitions','/procurement?tab=prs'],['Purchase Orders','/procurement?tab=pos'],['Goods Receipt','/procurement?tab=grn'],['Supplier Performance','/suppliers?tab=performance']]},
 {label:'Warehouses',href:'/warehouses',children:[['Warehouses','/warehouses'],['Locations','/warehouses?tab=locations'],['Inventory','/inventory'],['Transfers','/inventory?view=transfers'],['Stock Counts','/inventory?view=counts'],['Expiry','/inventory?view=expiry']]},
 {label:'Production',href:'/production',children:[['Plans','/production'],['Work Orders','/production?tab=workorders'],['Batches','/production?tab=batches'],['QC Release','/quality?tab=qc'],['Variance','/production?tab=variance']]},
 {group:'FULFILMENT'},
 {label:'Logistics',href:'/dispatch',children:[['Trips','/dispatch'],['Routes','/dispatch?tab=routes'],['Vehicles','/dispatch?tab=vehicles'],['Drivers','/dispatch?tab=drivers'],['Dispatch','/dispatch?tab=dispatch'],['POD','/dispatch?tab=pod']]},
 {label:'Finance',href:'/finance',children:[['Invoices','/finance'],['Receipts','/finance?tab=payments'],['Outstanding','/finance?tab=outstanding'],['Statements','/finance?tab=statements'],['Credit Notes','/finance?tab=credits']]},
 {label:'Quality',href:'/quality',children:[['Complaints','/quality'],['Returns / RMA','/quality?tab=returns'],['CAPA','/quality?tab=capa'],['Recall','/quality?tab=recall']]},
 {label:'Support',href:'/support',badge:'24',children:[['Tickets','/support'],['SLAs','/support?tab=slas'],['Templates','/support?tab=templates'],['Knowledge','/support?tab=knowledge']]},
 {group:'INTELLIGENCE'},
 {label:'Analytics & Reports',href:'/reports',children:[['Reports','/reports'],['Dashboards','/reports?tab=dashboards'],['Export Center','/reports?tab=exports']]},
 {label:'Intelligence',href:'/intelligence',badge:'14',children:[['AI Recommendations','/intelligence'],['Forecasts','/intelligence?tab=forecasts'],['Risk Center','/intelligence?tab=risks'],['Business Assistant','/intelligence?tab=assistant']]},
 {label:'Notifications',href:'/notifications',badge:'4'},
 {group:'ADMINISTRATION'},
 {label:'Administration',href:'/admin',children:[['Users','/admin?tab=users'],['Roles','/admin?tab=roles'],['Permissions','/admin?tab=permissions'],['Settings','/admin?tab=settings'],['Number Sequences','/admin?tab=sequences'],['Audit Log','/admin?tab=audit'],['Integrations','/admin?tab=integrations']]},
];

const navIcons:Record<string,LucideIcon>={
 'Control Tower':Activity,'Franchise Network':Building2,Orders:ShoppingCart,'Products & Recipes':Boxes,Procurement:ClipboardList,
 Warehouses:Warehouse,Production:Factory,Logistics:Truck,Finance:IndianRupee,Quality:ShieldCheck,Support:Headphones,
 'Analytics & Reports':BarChart3,Intelligence:BrainCircuit,Notifications:Bell,Administration:Settings2
};
function NavIcon({label}:{label:string}){const Icon=navIcons[label]??Activity;return <Icon size={19} strokeWidth={2.1}/>}
const navTranslationKeys:Record<string,string>={
 'Control Tower':'nav.controlTower','Franchise Network':'nav.network','Orders':'nav.orders','Products & Recipes':'nav.products','Procurement':'nav.procurement','Warehouses':'nav.warehouses','Production':'nav.production','Logistics':'nav.logistics','Finance':'nav.finance','Quality':'nav.quality','Support':'nav.support','Analytics & Reports':'nav.analytics','Intelligence':'nav.intelligence','Notifications':'nav.notifications','Administration':'nav.administration',Franchises:'nav.franchises','Franchise Users':'nav.franchiseUsers','Commercial Profiles':'nav.commercialProfiles','All Orders':'nav.allOrders','Pending Approval':'nav.pendingApproval','Assisted Orders':'nav.assistedOrders',Allocation:'nav.allocation','Pick / Pack':'nav.pickPack','SKU Master':'nav.skuMaster',Categories:'nav.categories',Prices:'nav.prices','Recipes / BOM':'nav.recipes',Suppliers:'nav.suppliers',Requisitions:'nav.requisitions','Purchase Orders':'nav.purchaseOrders','Goods Receipt':'nav.goodsReceipt','Supplier Performance':'nav.supplierPerformance',Locations:'nav.locations',Inventory:'nav.inventory',Transfers:'nav.transfers','Stock Counts':'nav.stockCounts',Expiry:'nav.expiry',Plans:'nav.plans','Work Orders':'nav.workOrders',Batches:'nav.batches','QC Release':'nav.qcRelease',Variance:'nav.variance',Trips:'nav.trips',Routes:'nav.routes',Vehicles:'nav.vehicles',Drivers:'nav.drivers',Dispatch:'nav.dispatch',POD:'nav.pod',Invoices:'nav.invoices',Receipts:'nav.receipts',Outstanding:'nav.outstanding',Statements:'nav.statements','Credit Notes':'nav.creditNotes',Complaints:'nav.complaints','Returns / RMA':'nav.returns',CAPA:'nav.capa',Recall:'nav.recall',Tickets:'nav.tickets',SLAs:'nav.slas',Templates:'nav.templates',Knowledge:'nav.knowledge',Reports:'nav.reports',Dashboards:'nav.dashboards','Export Center':'nav.exportCenter','AI Recommendations':'nav.aiRecommendations',Forecasts:'nav.forecasts','Risk Center':'nav.riskCenter','Business Assistant':'nav.businessAssistant',Users:'nav.users',Roles:'nav.roles',Permissions:'nav.permissions',Settings:'nav.settings','Number Sequences':'nav.numberSequences','Audit Log':'nav.auditLog',Integrations:'nav.integrations'
};
const groupTranslationKeys:Record<string,string>={NETWORK:'group.network','SUPPLY CHAIN':'group.supplyChain',FULFILMENT:'group.fulfilment',INTELLIGENCE:'group.intelligence',ADMINISTRATION:'group.administration'};
function translatedNavLabel(label:string,t:(key:string,fallback?:string)=>string){return t(navTranslationKeys[label]||'',label)}
const commandIcons:Record<string,LucideIcon>={order:ShoppingCart,procurement:ClipboardList,risk:Activity,finance:IndianRupee,reports:BarChart3,audit:ShieldCheck};
function CommandActionIcon({name}:{name:string}){const Icon=commandIcons[name]??Activity;return <Icon size={20} strokeWidth={2}/>}

export function HQSidePanel(){
 const {t}=useLanguage();const path=usePathname();const searchParams=useSearchParams();const [collapsed,setCollapsed]=useState(false);const [open,setOpen]=useState<string[]>(['Orders','Franchise Network']);const [mobile,setMobile]=useState(false);
 const isActive=(href:string)=>{
  const [targetPath,targetQuery='']=href.split('?');
  if(targetPath==='/dashboard')return path==='/dashboard'&&!searchParams.toString();
  if(path!==targetPath&&!path.startsWith(targetPath+'/'))return false;
  if(!targetQuery)return path===targetPath;
  const expected=new URLSearchParams(targetQuery);
  return path===targetPath&&Array.from(expected.entries()).every(([key,value])=>searchParams.get(key)===value);
 };
 const activeGroup=nav.find((item:any)=>item.children?.some(([,href]:string[])=>isActive(href)))?.label;
 useEffect(()=>{if(activeGroup)setOpen(items=>items.includes(activeGroup)?items:[...items,activeGroup])},[activeGroup]);
 useEffect(()=>{
  if(!mobile)return;
  const opener=document.activeElement as HTMLElement|null;
  const previousOverflow=document.body.style.overflow;
  document.body.style.overflow='hidden';
  const drawer=document.querySelector<HTMLElement>('.side-panel.mobile-open');
  const closeButton=drawer?.querySelector<HTMLElement>('.mobile-close');
  closeButton?.focus();
  const handleKeys=(event:KeyboardEvent)=>{
   if(event.key==='Escape'){setMobile(false);return;}
   if(event.key!=='Tab'||!drawer)return;
   const focusable=Array.from(drawer.querySelectorAll<HTMLElement>('a[href],button:not([disabled])')).filter(el=>el.offsetParent!==null);
   const first=focusable[0],last=focusable[focusable.length-1];
   if(event.shiftKey&&document.activeElement===first){event.preventDefault();last?.focus();}
   else if(!event.shiftKey&&document.activeElement===last){event.preventDefault();first?.focus();}
  };
  window.addEventListener('keydown',handleKeys);
  return()=>{document.body.style.overflow=previousOverflow;window.removeEventListener('keydown',handleKeys);opener?.focus()};
 },[mobile]);
 return <><button className="mobile-menu-button" onClick={()=>setMobile(true)} aria-label="Open navigation"><Menu size={20}/></button>{mobile&&<button className="mobile-backdrop" aria-label="Close navigation" onClick={()=>setMobile(false)}/>}<aside className={cn('side-panel',collapsed&&'collapsed',mobile&&'mobile-open')}>
  <div className="brand-row"><Link href="/dashboard" className="brand" onClick={()=>setMobile(false)}><span className="brand-logo"><Image src="/upsarpanch-logo.webp" alt="उपसरपंच" fill sizes="44px" className="object-contain p-1" priority/></span>{!collapsed&&<span><b>उपसरपंच</b><small>HQ OPERATING SYSTEM</small></span>}</Link><div className="brand-actions"><button className="collapse-btn" onClick={()=>setCollapsed(v=>!v)} aria-label={collapsed?'Expand sidebar':'Collapse sidebar'}>{collapsed?<PanelLeftOpen size={18}/>:<PanelLeftClose size={18}/>}</button><button className="collapse-btn mobile-close" onClick={()=>setMobile(false)} aria-label="Close sidebar"><X size={18}/></button></div></div>
  {!collapsed&&<div className="environment-chip"><span className="live-dot"/> HQ OPERATIONS <small>LOCAL</small></div>}
  <div className="nav-scroll">{nav.map((n:any)=>n.group?<div className="nav-group" key={n.group}>{t(groupTranslationKeys[n.group]||'',n.group)}</div>:<div key={n.href} className="nav-item-wrap">{n.children?<button className={cn('nav-item',isActive(n.href)&&'active')} onClick={()=>setOpen(a=>a.includes(n.label)?a.filter(x=>x!==n.label):[...a,n.label])} aria-expanded={open.includes(n.label)} title={collapsed?translatedNavLabel(n.label,t):undefined}><span className="nav-icon"><NavIcon label={n.label}/></span>{!collapsed&&<span className="nav-label">{translatedNavLabel(n.label,t)}</span>}{!collapsed&&n.badge&&<b className="nav-badge">{n.badge}</b>}{!collapsed&&<ChevronDown size={15} className={cn('nav-chevron',open.includes(n.label)&&'rotated')}/>}</button>:<Link href={n.href} onClick={()=>setMobile(false)} className={cn('nav-item',isActive(n.href)&&'active')} aria-current={isActive(n.href)?'page':undefined} title={collapsed?translatedNavLabel(n.label,t):undefined}><span className="nav-icon"><NavIcon label={n.label}/></span>{!collapsed&&<span className="nav-label">{translatedNavLabel(n.label,t)}</span>}{!collapsed&&n.badge&&<b className="nav-badge">{n.badge}</b>}</Link>}{n.children&&!collapsed&&open.includes(n.label)&&<div className="nav-children">{n.children.map(([label,href]:string[])=> <Link key={`${label}-${href}`} href={href} onClick={()=>setMobile(false)} className={cn('nav-child',isActive(href)&&'active')} aria-current={isActive(href)?'page':undefined}><span>{translatedNavLabel(label,t)}</span><ChevronRight size={12}/></Link>)}</div>}</div>)}</div>
  <div className="side-bottom">{!collapsed&&<div className="help-card"><div className="help-icon"><Sparkles size={17}/></div><div><b>HQ Copilot</b><small>Ask about network, risk or stock.</small></div></div>}<LanguagePicker compact/><Link href="/admin?tab=settings" className="side-bottom-link"><Settings2 size={17}/>{!collapsed&&<span>System settings</span>}</Link><button className="side-bottom-link" onClick={()=>{window.location.href="/login"}}><LogOut size={17}/>{!collapsed&&<span>Sign out</span>}</button></div>
 </aside></>;
}

export function TopBar(){
 const {t}=useLanguage(); const [q,setQ]=useState(''); const [notifs,setNotifs]=useState(false); const [profile,setProfile]=useState(false); const [help,setHelp]=useState(false); const [palette,setPalette]=useState(false);
 const searchItems=[{label:'Order · ORD-10482',meta:'Indore Ring Road · Under Review',href:'/orders'},{label:'Franchise · Indore Ring Road',meta:'FR-041 · Active',href:'/franchises'},{label:'SKU · TEA-025',meta:'Premium Tea Powder · Central WH',href:'/catalog'},{label:'Supplier · Malwa Foods',meta:'SUP-017 · 82% on-time',href:'/suppliers'},{label:'Invoice · INV-2026-0844',meta:'₹48,600 · Overdue',href:'/finance'}];
 const results=useMemo(()=>q.trim()?searchItems.filter(x=>(x.label+' '+x.meta).toLowerCase().includes(q.toLowerCase())).slice(0,6):[],[q]);
 useEffect(()=>{const f=(e:KeyboardEvent)=>{if((e.metaKey||e.ctrlKey)&&e.key.toLowerCase()==='k'){e.preventDefault();setPalette(true);setTimeout(()=>document.getElementById('global-command-input')?.focus(),0)} if(e.key==='Escape'){setPalette(false)}};window.addEventListener('keydown',f);return()=>window.removeEventListener('keydown',f)},[]);
 useEffect(()=>{
  if(!palette)return;
  const dialog=document.querySelector<HTMLElement>('.command-modal[role="dialog"]');
  if(!dialog)return;
  const previouslyFocused=document.activeElement as HTMLElement|null;
  const focusable=()=>Array.from(dialog.querySelectorAll<HTMLElement>('a[href],button:not([disabled]),input:not([disabled]),[tabindex]:not([tabindex="-1"])')).filter(el=>el.getAttribute('aria-hidden')!=='true');
  const items=focusable();
  (dialog.querySelector<HTMLElement>('#global-command-input')??items[0])?.focus();
  const containFocus=(event:KeyboardEvent)=>{
   if(event.key!=='Tab')return;
   const current=focusable();
   if(!current.length){event.preventDefault();dialog.focus();return;}
   const first=current[0],last=current[current.length-1];
   if(event.shiftKey&&document.activeElement===first){event.preventDefault();last.focus();}
   else if(!event.shiftKey&&document.activeElement===last){event.preventDefault();first.focus();}
  };
  dialog.addEventListener('keydown',containFocus);
  return()=>{dialog.removeEventListener('keydown',containFocus);previouslyFocused?.focus();};
 },[palette]);
 return <header className="top-bar"><div className="top-left"><div className="breadcrumb"><span>HQ</span><b>/</b><strong>Operations</strong></div><button className="workspace-chip" onClick={()=>setPalette(true)}><Sparkles size={18}/><span>{t('common.workspace','Workspace')}</span><ChevronDown size={16}/></button></div><div className="top-center"><div className="command-search"><Search size={19}/><input id="global-search-input" value={q} onChange={e=>setQ(e.target.value)} onKeyDown={e=>{if(e.key==='Enter'&&results[0])window.location.href=results[0].href;}} placeholder={t('common.search','Search records and pages…')}/><kbd>Ctrl K</kbd>{results.length>0&&<div className="search-results">{results.map(x=><Link key={x.label} href={x.href} onClick={()=>setQ('')}><span><b>{x.label}</b><small>{x.meta}</small></span><ChevronRight size={16}/></Link>)}</div>}</div></div><div className="top-actions"><div className="relative"><button className="top-icon" title={t('common.help','Help')} onClick={()=>setHelp(v=>!v)}><HelpCircle size={20}/></button>{help&&<div className="top-popover top-help"><b>Workspace help</b><p>Search, filter, and open records from your current workspace. Important changes are checked and recorded.</p><Link href="/support">Open support →</Link></div>}</div><div className="relative"><button className="top-icon" title={t('common.notifications','Notifications')} onClick={()=>setNotifs(v=>!v)}><BellRing size={20}/><i className="notif-dot"/></button>{notifs&&<div className="top-popover"><b>Attention now</b><div className="top-popover-line"><i className="danger-dot"/><span>Tea Powder stock-out predicted</span><small>8 min</small></div><div className="top-popover-line"><i className="warning-dot"/><span>PO-2026-0451 delivery overdue</span><small>21 min</small></div><Link href="/notifications">Open notification center →</Link></div>}</div><div className="relative"><button className="profile-trigger" onClick={()=>setProfile(v=>!v)}><span className="avatar">RK</span><span className="profile-text"><b>Rahul Kumar</b><small>Super Admin · All HQ scope</small></span><ChevronDown size={16}/></button>{profile&&<div className="top-popover profile-pop"><LanguagePicker/><Link href="/admin?tab=users">{t('common.myAccess','My access')}</Link><Link href="/admin?tab=settings">{t('common.preferences','Preferences')}</Link><Link href="/admin?tab=audit">{t('common.myActivity','My activity')}</Link><button onClick={()=>{setProfile(false);window.location.href="/login"}}>{t('common.signOut','Sign out')}</button></div>}</div></div>{palette&&<div className="command-overlay" onMouseDown={e=>e.currentTarget===e.target&&setPalette(false)}><div className="command-modal" role="dialog" aria-modal="true" aria-labelledby="command-modal-title"><div className="command-modal-head"><div><div className="eyebrow">{t('common.quickActions','QUICK ACTIONS')}</div><b id="command-modal-title">{t('common.goTo','Go to a page or task')}</b></div><button onClick={()=>setPalette(false)} aria-label="Close command center"><X size={20}/></button></div><div className="command-modal-search"><Search size={20}/><input id="global-command-input" autoFocus aria-label="Search workspace actions" placeholder="Type an order, module or action…" onChange={e=>setQ(e.target.value)}/><kbd>ESC</kbd></div><div className="command-grid">{[{label:'Create Order for Franchise',href:'/orders',icon:'order'},{label:'Create Purchase Requisition',href:'/procurement',icon:'procurement'},{label:'Review Stock Risk',href:'/intelligence',icon:'risk'},{label:'Open Finance',href:'/finance',icon:'finance'},{label:'Open Reports',href:'/reports',icon:'reports'},{label:'Open Audit Log',href:'/admin?tab=audit',icon:'audit'}].filter(x=>!q||x.label.toLowerCase().includes(q.toLowerCase())).map(x=><Link key={x.label} href={x.href} onClick={()=>setPalette(false)}><span className="command-icon"><CommandActionIcon name={x.icon}/></span><span><b>{x.label}</b><small>{t('common.openWorkspace','Open workspace')}</small></span><ChevronRight size={16}/></Link>)}</div><div className="command-footer"><span>Enter to open · Esc to close</span><span>{t('common.onlyAccessible','Only results you can access are shown.')}</span></div></div></div>}</header>}

export function HQShell({children}:{children:React.ReactNode}){return <div className="hq-app"><div className="ambient-orb ambient-blue"/><div className="ambient-orb ambient-orange"/><div className="ambient-orb ambient-cyan"/><Suspense fallback={null}><HQSidePanel/></Suspense><div className="hq-main"><TopBar/>{children}</div></div>}
