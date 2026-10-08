"use client";
import type { ReactNode, HTMLAttributes } from 'react';
import {Children,cloneElement,isValidElement,useEffect,useId,useRef,useState} from 'react';
import {Check,ChevronDown,Download,ExternalLink,Filter,Inbox,MoreHorizontal,Search,SlidersHorizontal,X} from 'lucide-react';
import {cn} from '@/lib/utils';

export function Glass({children,className='',strong=false,...props}:{children:ReactNode;className?:string;strong?:boolean}&HTMLAttributes<HTMLDivElement>){
  return <div {...props} className={cn(strong?'glass-panel-strong':'glass-panel',className)}>{children}</div>
}
export function Pill({children,tone='neutral'}:{children:ReactNode;tone?:'neutral'|'orange'|'success'|'warning'|'danger'|'info'|'purple'}){
  const map={neutral:'pill-neutral',orange:'pill-orange',success:'pill-success',warning:'pill-warning',danger:'pill-danger',info:'pill-info',purple:'pill-purple'};
  return <span className={cn('status-pill',map[tone])}><span className="pill-dot"/>{children}</span>
}
export function statusTone(value:string){
  const status=value.toLowerCase().trim().replace(/[_-]+/g,' ').replace(/\s+/g,' ');
  const has=(...terms:string[])=>terms.some(term=>new RegExp(`\\b${term}\\b`).test(status));
  if(has('critical','overdue','rejected','suspended','blacklisted','failed','cancelled','canceled','expired'))return'danger';
  if(has('inactive','unpaid','partially paid','not ready','pending','review','hold','warning','attention','due','urgent','watch'))return'warning';
  if(has('active','approved','allocated','picking','packed','dispatched','delivered','paid','completed','posted','healthy','ready','released','in transit'))return'success';
  if(has('ai','info','suggested'))return'purple';
  return'neutral';
}
export function Status({value}:{value:string}){return <Pill tone={statusTone(value) as any}>{value}</Pill>}
export function Button({children,variant='secondary',className='',type='button',disabled,'aria-disabled':ariaDisabled,...props}:{children:ReactNode;variant?:'primary'|'secondary'|'ghost'|'danger'|'icon';className?:string}&React.ButtonHTMLAttributes<HTMLButtonElement>){const isDisabled=disabled||ariaDisabled===true||ariaDisabled==='true';return <button type={type} disabled={isDisabled} aria-disabled={ariaDisabled} className={cn('btn-ui',`btn-${variant}`,className)} {...props}>{children}</button>}
export function IconButton({label,children,type='button',disabled,'aria-disabled':ariaDisabled,...props}:{label:string;children:ReactNode}&React.ButtonHTMLAttributes<HTMLButtonElement>){const isDisabled=disabled||ariaDisabled===true||ariaDisabled==='true';return <button type={type} disabled={isDisabled} aria-disabled={ariaDisabled} aria-label={label} title={label} className="icon-btn" {...props}>{children}</button>}
export function Field({label,required,help,error,children}:{label:string;required?:boolean;help?:string;error?:string;children:ReactNode}){
  const fieldId=useId();
  const helpId=useId();
  const errorId=useId();
  let labelTargetId:string|undefined;
  const attachFieldProps=(child:ReactNode):ReactNode=>{
    if(!isValidElement(child))return child;
    const isNativeControl=typeof child.type==='string'&&['input','select','textarea'].includes(child.type);
    const isSharedControl=child.type===Input||child.type===Textarea||child.type===Select;
    if(!isNativeControl&&!isSharedControl){
      const nestedChildren=(child.props as {children?:ReactNode}).children;
      return nestedChildren===undefined?child:cloneElement(child as React.ReactElement<any>,{},Children.map(nestedChildren,attachFieldProps));
    }
    const childProps=child.props as {'aria-describedby'?:string;id?:string};
    const id=childProps.id??(!labelTargetId?fieldId:undefined);
    if(!labelTargetId)labelTargetId=id??fieldId;
    const describedBy=[childProps['aria-describedby'],help?helpId:undefined,error?errorId:undefined].filter(Boolean).join(' ')||undefined;
    return cloneElement(child as React.ReactElement<any>,{
      ...(id?{id}:{}),
      ...(required?{required:true,'aria-required':true}:{}),
      ...((help||error)?{'aria-describedby':describedBy}:{}),
      ...(error?{'aria-invalid':true}:{}),
    });
  };
  const controls=Children.map(children,attachFieldProps);
  return <div className="field-wrap"><label htmlFor={labelTargetId} className="field-label">{label}{required&&<b aria-hidden="true"> *</b>}</label>{controls}{help&&<span id={helpId} className="field-help">{help}</span>}{error&&<span id={errorId} className="field-error" role="alert">{error}</span>}</div>
}
export function Input({className='',...props}:React.InputHTMLAttributes<HTMLInputElement>){return <input className={cn('field-input',className)} {...props}/>}
export function Textarea({className='',...props}:React.TextareaHTMLAttributes<HTMLTextAreaElement>){return <textarea className={cn('field-input min-h-[110px] resize-y',className)} {...props}/>}
export function Select({className='',children,...props}:React.SelectHTMLAttributes<HTMLSelectElement>){return <div className="select-wrap"><select className={cn('field-input appearance-none pr-9',className)} {...props}>{children}</select><ChevronDown size={15} className="select-icon"/></div>}
export function Modal({open,onClose,title,description,children,footer,wide=false,size='normal'}:{open:boolean;onClose:()=>void;title:string;description?:string;children:ReactNode;footer?:ReactNode;wide?:boolean;size?:'small'|'normal'|'large'}){
  const dialogRef=useRef<HTMLDivElement>(null);
  const onCloseRef=useRef(onClose);
  const titleId=useId();
  const descriptionId=useId();
  useEffect(()=>{onCloseRef.current=onClose},[onClose]);
  useEffect(()=>{
    if(!open)return;
    const dialog=dialogRef.current;
    if(!dialog)return;
    const previouslyFocused=document.activeElement as HTMLElement|null;
    const previousOverflow=document.body.style.overflow;
    document.body.style.overflow='hidden';
    const focusable=()=>Array.from(dialog.querySelectorAll<HTMLElement>('a[href],button:not([disabled]),input:not([disabled]),select:not([disabled]),textarea:not([disabled]),[tabindex]:not([tabindex="-1"])')).filter(el=>el.getAttribute('aria-hidden')!=='true'&&el.offsetParent!==null);
    (dialog.querySelector<HTMLElement>('[autofocus],[data-autofocus]')??focusable()[0]??dialog).focus();
    const handleKeyDown=(event:KeyboardEvent)=>{
      if(event.key==='Escape'){event.preventDefault();onCloseRef.current();return;}
      if(event.key!=='Tab')return;
      const items=focusable();
      if(!items.length){event.preventDefault();dialog.focus();return;}
      const first=items[0],last=items[items.length-1];
      if(event.shiftKey&&document.activeElement===first){event.preventDefault();last.focus();}
      else if(!event.shiftKey&&document.activeElement===last){event.preventDefault();first.focus();}
    };
    document.addEventListener('keydown',handleKeyDown);
    return()=>{document.body.style.overflow=previousOverflow;document.removeEventListener('keydown',handleKeyDown);previouslyFocused?.focus()};
  },[open]);
  if(!open)return null;
  return <div className="modal-backdrop" onMouseDown={event=>{if(event.target===event.currentTarget)onClose()}}><div ref={dialogRef} className={cn('modal-card',`modal-${size}`,wide&&'modal-wide')} role="dialog" aria-modal="true" aria-labelledby={titleId} aria-describedby={description?descriptionId:undefined} tabIndex={-1}><div className="modal-head"><div><div id={titleId} className="modal-title">{title}</div>{description&&<div id={descriptionId} className="modal-desc">{description}</div>}</div><IconButton label="Close" onClick={onClose}><X size={18}/></IconButton></div><div className="modal-body">{children}</div>{footer&&<div className="modal-foot">{footer}</div>}</div></div>
}
export function Drawer({open,onClose,title,description,children,footer,wide=false}:{open:boolean;onClose:()=>void;title:string;description?:string;children:ReactNode;footer?:ReactNode;wide?:boolean}){
  const drawerRef=useRef<HTMLElement>(null);
  const onCloseRef=useRef(onClose);
  const titleId=useId();
  const descriptionId=useId();
  useEffect(()=>{onCloseRef.current=onClose},[onClose]);
  useEffect(()=>{
    if(!open)return;
    const drawer=drawerRef.current;
    if(!drawer)return;
    const previouslyFocused=document.activeElement as HTMLElement|null;
    const previousOverflow=document.body.style.overflow;
    document.body.style.overflow='hidden';
    const focusable=()=>Array.from(drawer.querySelectorAll<HTMLElement>('a[href],button:not([disabled]),input:not([disabled]),select:not([disabled]),textarea:not([disabled]),[tabindex]:not([tabindex="-1"])')).filter(el=>el.getAttribute('aria-hidden')!=='true'&&el.offsetParent!==null);
    (drawer.querySelector<HTMLElement>('[autofocus],[data-autofocus]')??focusable()[0]??drawer).focus();
    const handleKeyDown=(event:KeyboardEvent)=>{
      if(event.key==='Escape'){event.preventDefault();onCloseRef.current();return;}
      if(event.key!=='Tab')return;
      const items=focusable();
      if(!items.length){event.preventDefault();drawer.focus();return;}
      const first=items[0],last=items[items.length-1];
      if(event.shiftKey&&document.activeElement===first){event.preventDefault();last.focus();}
      else if(!event.shiftKey&&document.activeElement===last){event.preventDefault();first.focus();}
    };
    document.addEventListener('keydown',handleKeyDown);
    return()=>{document.body.style.overflow=previousOverflow;document.removeEventListener('keydown',handleKeyDown);previouslyFocused?.focus()};
  },[open]);
  if(!open)return null;
  return <div className="drawer-backdrop" onMouseDown={event=>{if(event.target===event.currentTarget)onClose()}}><aside ref={drawerRef} className={cn('drawer-card',wide&&'drawer-wide')} role="dialog" aria-modal="true" aria-labelledby={titleId} aria-describedby={description?descriptionId:undefined} tabIndex={-1}><div className="modal-head"><div><div id={titleId} className="modal-title">{title}</div>{description&&<div id={descriptionId} className="modal-desc">{description}</div>}</div><IconButton label="Close" onClick={onClose}><X size={18}/></IconButton></div><div className="drawer-body">{children}</div>{footer&&<div className="modal-foot">{footer}</div>}</aside></div>;
}
export function Toast({message,onClose}:{message:string;onClose:()=>void}){useEffect(()=>{const t=setTimeout(onClose,3500);return()=>clearTimeout(t)},[onClose]);return <div className="toast"><span className="toast-icon"><Check size={16}/></span><span>{message}</span><IconButton label="Dismiss" onClick={onClose}><X size={14}/></IconButton></div>}
export function EmptyState({title='No records found',description='Try clearing filters or create a new record.',onReset}:{title?:string;description?:string;onReset?:()=>void}){return <div className="empty-state"><div className="empty-orb" aria-hidden="true"><Inbox size={22} strokeWidth={1.8}/></div><div role="status" aria-live="polite"><div className="empty-title">{title}</div><div className="empty-desc">{description}</div></div>{onReset&&<Button onClick={onReset}>Clear filters</Button>}</div>}
export function LoadingState(){return <div className="skeleton-wrap">{Array.from({length:5}).map((_,i)=><div key={i} className="skeleton-row"><span/><span/><span/><span/></div>)}</div>}
export function SearchBox({value,onChange,placeholder='Search records…'}:{value:string;onChange:(v:string)=>void;placeholder?:string}){return <div className="search-box"><Search size={18} aria-hidden="true"/><input type="search" aria-label={placeholder} value={value} onChange={e=>onChange(e.target.value)} placeholder={placeholder}/>{value&&<IconButton label="Clear search" onClick={()=>onChange('')}><X size={17}/></IconButton>}</div>}
export function Toolbar({search,onSearch,onExport,onFilters,onColumns,filterCount=0,children}:{search:string;onSearch:(v:string)=>void;onExport:()=>void;onFilters:()=>void;onColumns:()=>void;filterCount?:number;children?:ReactNode}){return <div className="toolbar-glass"><SearchBox value={search} onChange={onSearch}/><div className="toolbar-actions"><Button onClick={onFilters}><Filter size={15}/> Filters {filterCount>0&&<span className="filter-count">{filterCount}</span>}</Button><Button onClick={onColumns}><SlidersHorizontal size={15}/> Columns</Button>{children}<Button onClick={onExport}><Download size={15}/> Export</Button></div></div>}
const numericColumnKeys=new Set(['amount','paid','outstanding','price','transferprice','cost','value','purchase','transfer','blockedqty','qty','quantity','rate','total','stock','free','used','capacity','fillrate','quality','occupancy','utilization','planned','actual','waste','leaddays','stops','delivered','produced','available','onhand','reserved','reorderpoint','safetystock','count','active','items','views','breached','open','trips','issues','affectedfranchises','components']);
export function Table({columns,rows,onRowClick,selected=[],onSelect,actions}:{columns:{key:string;label:string;align?:'left'|'right'|'center';width?:string}[];rows:Record<string,any>[];onRowClick?:(row:Record<string,any>)=>void;selected?:string[];onSelect?:(id:string)=>void;actions?:(row:Record<string,any>)=>ReactNode}){
  const allSelected=rows.length>0&&rows.every(row=>selected.includes(String(row.id)));
  const someSelected=!allSelected&&rows.some(row=>selected.includes(String(row.id)));
  const toggleVisibleRows=(checked:boolean)=>rows.forEach(row=>{
    const id=String(row.id);
    if(checked&&!selected.includes(id))onSelect?.(id);
    if(!checked&&selected.includes(id))onSelect?.(id);
  });
  return <div className="table-shell"><table aria-label="Data table"><thead><tr>{onSelect&&<th scope="col" className="w-[46px]"><input type="checkbox" checked={allSelected} ref={input=>{if(input)input.indeterminate=someSelected}} onChange={event=>toggleVisibleRows(event.target.checked)} aria-label={`Select all ${rows.length} visible rows`}/></th>}{columns.map(column=>{const align=column.align??(numericColumnKeys.has(column.key.toLowerCase())?'right':undefined);return <th scope="col" key={column.key} style={{width:column.width}} className={align==='right'?'text-right':align==='center'?'text-center':''}>{column.label}</th>})}{actions&&<th scope="col" className="w-[72px] text-right">Actions</th>}</tr></thead><tbody>{rows.map(row=>{
    const id=String(row.id);
    return <tr key={id} className={onRowClick?'click-row':''} tabIndex={onRowClick?0:undefined} aria-selected={onSelect?selected.includes(id):undefined}
      onClick={event=>{if((event.target as HTMLElement).closest('button,a,input,select,textarea,[role="button"]'))return;onRowClick?.(row)}}
      onKeyDown={event=>{if(!onRowClick||(event.target as HTMLElement).closest('button,a,input,select,textarea,[role="button"]'))return;if(event.key==='Enter'||event.key===' '){event.preventDefault();onRowClick(row)}}}>
      {onSelect&&<td onClick={event=>event.stopPropagation()}><input type="checkbox" checked={selected.includes(id)} onChange={()=>onSelect(id)} aria-label={`Select ${row.id}`}/></td>}
      {columns.map(column=>{const align=column.align??(numericColumnKeys.has(column.key.toLowerCase())?'right':undefined);return <td key={column.key} className={align==='right'?'text-right':align==='center'?'text-center':''}>{row[column.key]}</td>})}
      {actions&&<td className="text-right" onClick={event=>event.stopPropagation()}>{actions(row)}</td>}
    </tr>;
  })}</tbody></table></div>
}
export function RowActions({items}:{items:{label:string;onClick:()=>void;danger?:boolean}[]}){
  const [open,setOpen]=useState(false);
  const ref=useRef<HTMLDivElement>(null);
  const menuId=useId();
  useEffect(()=>{
    const closeOutside=(event:MouseEvent)=>{if(ref.current&&!ref.current.contains(event.target as Node))setOpen(false)};
    document.addEventListener('mousedown',closeOutside);
    return()=>document.removeEventListener('mousedown',closeOutside);
  },[]);
  useEffect(()=>{if(open)ref.current?.querySelector<HTMLButtonElement>('[role="menuitem"]')?.focus()},[open]);
  const handleMenuKeyDown=(event:React.KeyboardEvent<HTMLDivElement>)=>{
    const menuItems=Array.from(event.currentTarget.querySelectorAll<HTMLButtonElement>('[role="menuitem"]'));
    const index=menuItems.indexOf(document.activeElement as HTMLButtonElement);
    if(event.key==='Escape'){event.preventDefault();setOpen(false);ref.current?.querySelector<HTMLButtonElement>('.icon-btn')?.focus();return;}
    if(event.key==='Tab'){setOpen(false);return;}
    if(event.key==='ArrowDown'||event.key==='ArrowUp'){
      event.preventDefault();
      const direction=event.key==='ArrowDown'?1:-1;
      menuItems[(index+direction+menuItems.length)%menuItems.length]?.focus();
    }else if(event.key==='Home'){event.preventDefault();menuItems[0]?.focus();}
    else if(event.key==='End'){event.preventDefault();menuItems[menuItems.length-1]?.focus();}
  };
  return <div ref={ref} className="relative inline-flex"><IconButton label="More actions" aria-haspopup="menu" aria-expanded={open} aria-controls={open?menuId:undefined} onClick={()=>setOpen(value=>!value)}><MoreHorizontal size={17}/></IconButton>{open&&<div id={menuId} className="menu-popover" role="menu" onKeyDown={handleMenuKeyDown}>{items.map((item,index)=><button key={`${item.label}-${index}`} type="button" role="menuitem" tabIndex={-1} className={item.danger?'danger':''} onClick={()=>{item.onClick();setOpen(false)}}>{item.label}<ExternalLink size={13} aria-hidden="true"/></button>)}</div>}</div>
}
export function Stepper({steps,current}:{steps:string[];current:number}){return <div className="stepper" role="list" aria-label="Workflow progress">{steps.map((s,i)=><div key={s} role="listitem" aria-current={i===current?'step':undefined} aria-label={`Step ${i+1} of ${steps.length}: ${s}${i===current?' (current)':i<current?' (completed)':''}`} className={cn('step',i<current&&'done',i===current&&'current')}><span aria-hidden="true">{i<current?<Check size={14}/>:i+1}</span><div><b>{s}</b>{i===current&&<small>Current step</small>}</div>{i<steps.length-1&&<i aria-hidden="true"/>}</div>)}</div>}
export function ExportModal({open,onClose,onExport}:{open:boolean;onClose:()=>void;onExport:(format:'CSV'|'XLSX'|'PDF',scope:'Filtered'|'Selected'|'All Permitted')=>void}){
  const [format,setFormat]=useState<'CSV'|'XLSX'|'PDF'>('XLSX');
  const [scope,setScope]=useState<'Filtered'|'Selected'|'All Permitted'>('Filtered');
  return <Modal open={open} onClose={onClose} title="Export data" description="Your current filters are applied to the export." footer={<><Button onClick={onClose}>Cancel</Button><Button variant="primary" onClick={()=>{onExport(format,scope);onClose()}}><Download size={15}/> Generate {format}</Button></>}>
    <div className="export-choice"><div><b>Format</b><small>Choose the artifact the team needs.</small></div><div className="segmented" role="group" aria-label="Export format">{(['CSV','XLSX','PDF'] as const).map(option=><button key={option} type="button" aria-pressed={format===option} className={format===option?'active':''} onClick={()=>setFormat(option)}>{option}</button>)}</div></div>
    <div className="export-choice"><div><b>Scope</b><small>Filter parity is preserved.</small></div><div className="segmented" role="group" aria-label="Export scope">{(['Filtered','Selected','All Permitted'] as const).map(option=><button key={option} type="button" aria-pressed={scope===option} className={scope===option?'active':''} onClick={()=>setScope(option)}>{option}</button>)}</div></div>
  </Modal>
}
