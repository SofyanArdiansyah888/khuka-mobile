import React from 'react';
import {createRoot} from 'react-dom/client';
import App from './App';
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";


const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            refetchOnWindowFocus: false,
            staleTime: 1000 * 3600
        }
    }
});
const container = document.getElementById('root');
const root = createRoot(container!);
root.render(
    // <React.StrictMode>
    <QueryClientProvider client={queryClient}>
        <App/>
    </QueryClientProvider>
    // </React.StrictMode>
);