import './globals.css';
import {Inter} from 'next/font/google';
import {LanguageProvider} from '@/lib/language';
const inter=Inter({subsets:['latin'],display:'swap',variable:'--font-inter'});
export const metadata={title:'उपसरपंच — HQ Operating Platform',description:'HQ-first franchise operations, supply chain, fulfilment, finance and intelligence platform.'};
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="en"><body className={inter.className}><LanguageProvider>{children}</LanguageProvider></body></html>}
