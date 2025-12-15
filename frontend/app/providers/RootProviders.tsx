"use client";
import { AuthProvider } from "./AuthProvider";
import { CartProvider } from "./CartProvider";
import { Toaster } from "react-hot-toast";

export default function RootProviders({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <CartProvider>
        <Toaster
          position="top-center"
          toastOptions={{
            style: {
              background: "#D6B48A",
              color: "#2a1a13",
              border: "1px solid #5C3D2E",
            },
            success: {
              style: {
                background: "#D6B48A",
                color: "#2a1a13",
                border: "1px solid #5C3D2E",
              },
              iconTheme: {
                primary: "#5C3D2E",
                secondary: "#ffffff",
              },
            },
            error: {
              style: {
                background: "#D6B48A",
                color: "#2a1a13",
                border: "1px solid #5C3D2E",
              },
              iconTheme: {
                primary: "#5C3D2E",
                secondary: "#ffffff",
              },
            },
          }}
        />
        {children}
      </CartProvider>
    </AuthProvider>
  );
}
