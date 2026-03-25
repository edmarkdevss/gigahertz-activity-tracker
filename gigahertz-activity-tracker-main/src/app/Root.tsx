import { Suspense } from "react";
import { Outlet } from "react-router";
import { Navigation } from "./components/Navigation";
import { Footer } from "./components/Footer";
import { AuthProvider } from "./context/AuthContext";

// Example: Adding a global toast notification provider (like react-hot-toast or react-toastify)
import { Toaster } from "react-hot-toast"; 

export function Root() {
  return (
    <AuthProvider>
      {/* Added a subtle background color and transition for a better default look */}
      <div className="min-h-screen flex flex-col bg-gray-50 text-gray-900 transition-colors duration-300">
        <Navigation />
        
        {/* Global notification container injected at the root level */}
        <Toaster position="top-right" reverseOrder={false} />
        
        {/* Added responsive max-width and padding to keep the content centered and clean */}
        <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          
          {/* Suspense boundary handles loading states for any lazy-loaded child routes */}
          <Suspense 
            fallback={
              <div className="flex items-center justify-center h-full">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
              </div>
            }
          >
            <Outlet />
          </Suspense>
          
        </main>
        
        <Footer />
      </div>
    </AuthProvider>
  );
}