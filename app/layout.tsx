import type { Metadata } from "next";
import "./globals.css";
import Layout from "@/components/Global/Layout";

export const metadata: Metadata = {
  title: "Basino",
  description: "Play big! Win big!",
};

const RootLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <html lang="en">
      <body>
        <Layout>
          {children}
        </Layout>
      </body>
    </html>
  );
};

export default RootLayout;
