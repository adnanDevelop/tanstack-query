import { Router } from "./route/Router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "./App.css";

export default function App() {
  const queryClient = new QueryClient();

  return ( 
    <QueryClientProvider client={queryClient}>
      <Router />
    </QueryClientProvider>
  );
}
