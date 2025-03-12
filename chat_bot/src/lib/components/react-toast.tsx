'use client';

import { useEffect, useState } from 'react';
import { Toaster } from 'react-hot-toast';

export function ReactToaster() {
  const [isMobile, setIsMobile] = useState(true);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 640);
    };

    window.addEventListener('resize', handleResize);

    // Initial check
    handleResize();

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <Toaster
      position={`${isMobile ? 'top-center' : 'bottom-center'}`}
      toastOptions={{
        style: {
          padding: '14px 14px 16px 14px',
          color: '#fff',
        },
        success: {
          style: {
            background: '#2D9F75',
            // color:'white',
          },
          iconTheme: {
            primary: '#fff',
            secondary: '#2D9F75',
          },
        },
        error: {
          style: {
            background: '#DF1C41',
            // color:'',
          },
          iconTheme: {
            primary: '#fff',
            secondary: '#DF1C41',
          },
        },
      }}
    />
  );
}
