"use client";
import {useMemo,useState} from 'react';
import {ArrowRight,CheckCircle2,Download,Plus,Sparkles,Truck} from 'lucide-react';
import {useSearchParams} from 'next/navigation';
import {useStore} from '@/lib/store';
import {money} from '@/lib/format';
import {Glass,Button,Status,Toolbar,Table,Drawer,Field,Input,Select,Textarea,ExportModal,RowActions,Stepper,Toast} from '@/components/ui/Primitives';

const tabs=[['prs','Purchase Requisitions'],['pos','Purchase Orders'],['grn','Goods Receipt / QC']];
export default function ProcurementPage(){
  const {state,createProcurement}=useStore();
  const params=useSearchParams();
  const [tab,setTab]=useState(params.get('tab')||'prs');
  const [q,setQ]=useState('');
  const [status,setStatus]=useState('All');
  const [create,setCreate]=useState(false);
  const [detail,setDetail]=useState<any>(null);
  const [exportOpen,setExportOpen]=useState(false);
  const [toast,setToast]=useState('');
  const rows=useMemo(()=>state.procurements.filter(r=>((tab==='prs'&&r.type==='PR')||(tab==='pos'&&r.type==='PO')||(tab==='grn'&&r.type==='GRN'))&&(status==='All'||r.status===status)&&JSON.stringify(r).toLowerCase().includes(q.toLowerCase())),[state.procurements,tab,status,q]);
  const cols=[
    {key:'id',label:'Reference'},
    {key:'subject',label:'Requirement'},
    {key:'supplier',label:'Supplier'},
    {key:'warehouse',label:'Warehouse'},
    {key:'qty',label:'Quantity'},
    {key:'value',label:'Value',align:'right' as const},
    {key:'requiredBy',label:'Required by'},
    {key:'status',label:'Status'}
  ];
  const tableRows=rows.map(r=>({...r,value:money(r.value),status:<Status value={r.status}/> }));
  const post=(payload:any)=>{createProcurement(payload);setCreate(false);setToast(`${payload.type} ${payload.id} created as ${payload.status}.`)};
  return <div className="page-wrap">
    <Glass strong className="hero">
      <div className="hero-inner">
        <div>
          <div className="eyebrow">PURCHASING · RECEIVING · QUALITY</div>
          <h1 className="page-title">Procurement</h1>
          <p className="page-description">Track purchase requests, supplier orders, and received stock in one place.</p>
        </div>
        <div className="action-row">
          <Button onClick={()=>setToast('Supplier comparison opened.')}><Sparkles size={15}/> Compare suppliers</Button>
          <Button variant="primary" onClick={()=>setCreate(true)}><Plus size={15}/> Create PR</Button>
        </div>
      </div>
    </Glass>
    <div className="data-summary">
      <Glass className="summary-card"><div className="summary-value">{state.procurements.filter(x=>x.type==='PR').length}</div><div className="summary-label">Purchase requisitions</div></Glass>
      <Glass className="summary-card"><div className="summary-value">{state.procurements.filter(x=>x.type==='PO').length}</div><div className="summary-label">Purchase orders</div></Glass>
      <Glass className="summary-card"><div className="summary-value">{state.procurements.filter(x=>x.type==='GRN').length}</div><div className="summary-label">Receiving records</div></Glass>
      <Glass className="summary-card"><div className="summary-value">{money(state.procurements.reduce((a,r)=>a+r.value,0))}</div><div className="summary-label">Open procurement value</div></Glass>
    </div>
    <div className="tabs">
      {tabs.map(([id,label])=><button key={id} className={tab===id?'tab-btn active':'tab-btn'} onClick={()=>setTab(id)}>{label}</button>)}
    </div>
    <Toolbar
      search={q}
      onSearch={setQ}
      onExport={()=>setExportOpen(true)}
      onFilters={()=>setStatus(status==='All'?'Pending':'All')}
      onColumns={()=>setToast('Column selector opened')}
      filterCount={status==='All'?0:1}
    >
      <div className="segmented">
        {['All','Draft','Pending','Approved','Receiving','Posted'].map(x=><button key={x} className={status===x?'active':''} onClick={()=>setStatus(x)}>{x}</button>)}
      </div>
    </Toolbar>
    <Glass className="glass-card" style={{padding:0}}>
      <Table
        columns={cols}
        rows={tableRows}
        onRowClick={r=>setDetail(rows.find(x=>x.id===r.id))}
        actions={(r)=><RowActions items={[
          {label:'Open',onClick:()=>setDetail(rows.find(x=>x.id===r.id))},
          {label:'Approve',onClick:()=>setToast(`${r.id} approval flow opened`)},
          {label:'Print PDF',onClick:()=>setToast(`${r.id} PDF prepared`)}
        ]}/>} 
      />
    </Glass>
    <div className="section-grid three-col">
      <Glass className="glass-card">
        <div className="section-head"><div><div className="section-title">Control path</div><div className="section-subtitle">Traceable from requirement to stock</div></div><Truck size={16}/></div>
        <Stepper steps={['Requirement','PR','Approval','PO','GRN','QC','Stock']} current={2}/>
      </Glass>
      <Glass className="glass-card">
        <div className="section-title">Supplier performance</div>
        {state.suppliers.slice(0,4).map(s=><div className="risk-row" key={s.id}><div><div className="risk-name">{s.name}</div><div className="risk-detail">Lead {s.leadDays}d · Fill {s.fillRate}% · Quality {s.quality}%</div></div><Status value={s.status}/></div>)}
      </Glass>
      <Glass className="glass-card">
        <div className="section-title">Replenishment signals</div>
        {state.skus.slice(0,4).map(s=><div className="risk-row" key={s.id}><div><div className="risk-name">{s.code}</div><div className="risk-detail">Stock {s.stock} · threshold {s.reorderPoint}</div></div><Status value={s.stock<=s.reorderPoint?'Watch':'Healthy'}/></div>)}
      </Glass>
    </div>
    <CreatePRDrawer open={create} state={state} onClose={()=>setCreate(false)} onSubmit={post}/>
    <ProcurementDetail row={detail} onClose={()=>setDetail(null)} onToast={setToast}/>
    <ExportModal open={exportOpen} onClose={()=>setExportOpen(false)} onExport={(f,s)=>setToast(`${f} procurement export queued · ${s}`)}/>
    {toast&&<Toast message={toast} onClose={()=>setToast('')}/>} 
  </div>
}

function CreatePRDrawer({open,onClose,state,onSubmit}:{open:boolean;onClose:()=>void;state:any;onSubmit:(p:any)=>void}){const [subject,setSubject]=useState('');const [warehouse,setWarehouse]=useState(state.warehouses[0]?.name||'');const [supplier,setSupplier]=useState(state.suppliers[0]?.name||'');const [qty,setQty]=useState('240');const [reason,setReason]=useState('Replenish below reorder threshold');const payload={id:`PR-2026-${String(Math.floor(1900+Math.random()*800)).padStart(4,'0')}`,type:'PR' as const,subject:subject||'Premium Tea Powder 25 KG',supplier,warehouse,qty,value:Number(qty||0)*100,status:'Draft',requiredBy:'2026-10-12',priority:'Normal'};return <Drawer open={open} onClose={onClose} title="Create Purchase Requisition" description="A requirement starts here. Approval can then generate the supplier PO." wide footer={<><Button onClick={onClose}>Cancel</Button><Button onClick={onClose}>Save Draft</Button><Button variant="primary" onClick={()=>onSubmit(payload)}><CheckCircle2 size={14}/> Create PR</Button></>}><div className="form-grid two"><Field label="Requirement" required><Input value={subject} onChange={e=>setSubject(e.target.value)} placeholder="Premium Tea Powder 25 KG"/></Field><Field label="Warehouse" required><Select value={warehouse} onChange={e=>setWarehouse(e.target.value)}>{state.warehouses.map((w:any)=><option key={w.id}>{w.name}</option>)}</Select></Field><Field label="Suggested supplier"><Select value={supplier} onChange={e=>setSupplier(e.target.value)}>{state.suppliers.map((s:any)=><option key={s.id}>{s.name}</option>)}</Select></Field><Field label="Quantity" required><Input type="number" min="1" value={qty} onChange={e=>setQty(e.target.value)}/></Field><Field label="Reason" required><Textarea value={reason} onChange={e=>setReason(e.target.value)}/></Field></div><div className="callout-info"><b>AI-generated PRs are visually marked</b><span>This manual PR demonstrates the same control path used by forecasts and reorder recommendations: requirement → approval → PO.</span></div></Drawer>}
function ProcurementDetail({row,onClose,onToast}:{row:any;onClose:()=>void;onToast:(m:string)=>void}){if(!row)return null;const steps=row.type==='GRN'?['PO','Supplier Delivery','GRN','QC','Stock']:row.type==='PO'?['PR','Approval','PO','Supplier','GRN']:['Requirement','PR','Approval','PO'];const current=Math.min(steps.length-1,row.status==='Approved'?2:row.status==='Posted'?steps.length-1:1);return <Drawer open={!!row} onClose={onClose} title={`${row.id} · ${row.subject}`} description={`${row.type} · ${row.supplier} · ${row.warehouse}`} wide footer={<><Button onClick={onClose}>Close</Button><Button onClick={()=>onToast(`${row.id} PDF prepared`)}><Download size={14}/> Print / PDF</Button><Button variant="primary" onClick={()=>onToast(`${row.id} next workflow action opened`)}>Next action <ArrowRight size={14}/></Button></>}><div className="detail-head"><div><div className="detail-id">{row.id}</div><div style={{marginTop:7}}><Status value={row.status}/></div></div></div><Stepper steps={steps} current={current}/><div className="info-grid"><div className="info-box"><b>Required by</b><span>{row.requiredBy}</span></div><div className="info-box"><b>Supplier</b><span>{row.supplier}</span></div><div className="info-box"><b>Warehouse</b><span>{row.warehouse}</span></div><div className="info-box"><b>Quantity</b><span>{row.qty}</span></div><div className="info-box"><b>Value</b><span>{money(row.value)}</span></div><div className="info-box"><b>Priority</b><span>{row.priority}</span></div></div></Drawer>}
