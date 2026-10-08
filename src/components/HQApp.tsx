"use client";
import {Suspense} from 'react';
import {StoreProvider} from '@/lib/store';
import {HQShell} from '@/components/ui/SidePanel';
export function HQApp({children}:{children:React.ReactNode}){return <StoreProvider><HQShell><Suspense fallback={<div className="page-wrap" aria-busy="true"><div className="loading-surface"/></div>}>{children}</Suspense></HQShell></StoreProvider>}
