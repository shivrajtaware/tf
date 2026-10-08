import {notFound} from 'next/navigation';
import {HQApp} from '@/components/HQApp';
import ModulePage from '@/components/pages/ModulePage';
const allowed=['franchises','suppliers','catalog','warehouses','production','dispatch','quality','support','notifications'];
export default async function Page({params}:{params:Promise<{slug:string}>}){const {slug}=await params;if(!allowed.includes(slug))notFound();return <HQApp><ModulePage slug={slug}/></HQApp>}
