


'use client';
import { PropsWithChildren } from 'react';
import { ChatSidebar, Header } from './components';
import { ChatManagerWrapper, useChatManager } from '../context';
import { ChatModal } from './components/modal';
import { usePathname } from 'next/navigation';
// import { PrivateRoute } from '@flux/guard';

export type DashboardLayoutProps = PropsWithChildren<{
  //
}>;
export default function DashboardModuleLayout({
  children,
}: DashboardLayoutProps) {
  const {isModal } = useChatManager()
  const pathname = usePathname();
  const params = pathname.split('/')[1]
  
  return (
    <div className='h-screen w-screen overflow-hidden flex  flex-col'>
      {isModal && <ChatModal  />}
     <Header />
    <main className='w-full bg-primary-200 h-full p-4 flex gap-4 flex-1'>
       <ChatSidebar />
       <div className={`${params?'w-full lg:w-[70%]':'hidden lg:flex' } bg-white`}>
       {children}
       </div>
    </main>
    </div>
   
    
   
    // </PrivateRoute>
  );
}
