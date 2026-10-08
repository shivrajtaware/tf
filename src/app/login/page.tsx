"use client";
import Image from 'next/image';
import {useState} from 'react';
import {ArrowRight,Eye,EyeOff,LockKeyhole,ShieldCheck,Sparkles,UserRound} from 'lucide-react';
import {Button,Field,Input,Select} from '@/components/ui/Primitives';
import {LanguagePicker} from '@/lib/language';
import Link from 'next/link';

export default function LoginPage(){
  const [show,setShow]=useState(false);
  const [workspace,setWorkspace]=useState('hq');
  const target=workspace==='franchise'?'/app':workspace==='driver'?'/driver':'/dashboard';
  const label=workspace==='franchise'?'Sign in to franchise portal':workspace==='driver'?'Open delivery app':'Sign in to HQ';
  return <div className="login-shell"><div className="login-ambient a"/><div className="login-ambient b"/><div className="login-card">
    <div className="login-brand"><span><Image src="/upsarpanch-logo.webp" alt="उपसरपंच" fill sizes="52px" className="object-contain p-1"/></span><div><b>उपसरपंच</b><small>HQ OPERATING SYSTEM</small></div></div><div className="login-language-picker"><LanguagePicker/></div>
    <div className="eyebrow" style={{marginTop:30}}>SECURE ACCESS</div><h1 className="login-title">Welcome back.</h1><p className="login-sub">Choose your workspace and sign in to continue.</p>
    <div className="form-grid" style={{marginTop:20}}>
      <Field label="Email / phone" required><div style={{position:'relative'}}><UserRound size={15} className="login-field-icon"/><Input style={{paddingLeft:37}} placeholder="rahul@upsarpanch.demo" defaultValue="rahul@upsarpanch.demo"/></div></Field>
      <Field label="Password" required><div style={{position:'relative'}}><LockKeyhole size={15} className="login-field-icon"/><Input style={{paddingLeft:37,paddingRight:40}} type={show?'text':'password'} defaultValue="demo1234"/><button className="login-eye" type="button" onClick={()=>setShow(v=>!v)} aria-label={show?'Hide password':'Show password'}>{show?<EyeOff size={15}/>:<Eye size={15}/>}</button></div></Field>
      <Field label="Workspace" required><Select value={workspace} onChange={e=>setWorkspace(e.target.value)}><option value="hq">HQ · उपसरपंच</option><option value="franchise">Franchise Portal · Barwaha Central</option><option value="driver">Driver Delivery · Route 04</option></Select></Field>
      <Button variant="primary" className="login-submit" onClick={()=>window.location.href=target}>{label} <ArrowRight size={15}/></Button>
    </div>
    <div className="login-note"><ShieldCheck size={15}/><span>Local demo workspace · Sample data only.</span></div>
    <div className="login-switch"><Sparkles size={12} style={{verticalAlign:'middle',marginRight:4}}/> Local workspace · sample operational data · <Link href="/app">Open franchise portal</Link></div>
  </div></div>
}
