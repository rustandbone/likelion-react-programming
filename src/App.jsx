import AuthProvider from '@/contexts/Auth';
import ThemeProvider from '@/contexts/Theme';
import { HelmetProvider } from 'react-helmet-async';
import { Toaster } from 'react-hot-toast';
import { RouterProvider } from 'react-router-dom';
import router from './routes';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { Suspense } from 'react';
import Spinner from './components/Spinner';

//쿼리 클라이언트 객체 생성
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // retry: 5, //기본값은 3
      // staleTime : 1 * 1000 * 60 * 60 * 24 * 7; 
      // cacheTime: 
    }
  }
}); //모든 쿼리에 사용되는 기본 옵션

function App() {
  return (
    <>
      <HelmetProvider>
        <ThemeProvider>
          <AuthProvider>
            {/* 쿼리 클라이언트를 앱에 공급 */}
            <QueryClientProvider client={queryClient}>
              <div className="App">
                <Suspense fallback={<Spinner size={200} messeage="페이지 로딩 중..." />}>
                  <RouterProvider router={router} />
                </Suspense>
              </div>
              {/* tanstack 쿼리 개발 도구 */}
              <ReactQueryDevtools />
            </QueryClientProvider>
          </AuthProvider>
        </ThemeProvider>
      </HelmetProvider>
      <Toaster />
    </>
  );
}

export default App;
