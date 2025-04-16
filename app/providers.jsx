'use client'
import { NextUIProvider } from '@nextui-org/react';
// import { ThemeProvider as NextThemesProvider } from "next-themes";
import { store } from '@/app/redux/store';
import { Provider } from 'react-redux';
import { Suspense } from 'react';
// import { SSRProvider } from '@react-aria/ssr';

export function Providers({ children }) {
  return (
    <Provider store={store}>
      <NextUIProvider>
        {/* <NextThemesProvider attribute="class" defaultTheme="light"> */}
        <Suspense>
          {/* <SSRProvider> */}
            {children}
          {/* </SSRProvider> */}
        </Suspense>
        {/* </NextThemesProvider> */}
      </NextUIProvider>
    </Provider >
  )
}