import "@/app/styles/globals.css";
import { NextUIProvider } from "@nextui-org/react";
import NavBar from "@/_components/NavBar/NavBar";
import Footer from "@/_components/Footer/Footer";
import IMAGES from "@/public";
import { Providers } from "@/app/providers";

export const metadata = {
  title: "Sanika Baug - A Luxury Farmstay Near karjat",
  description: "Best Family Farmstay in Karjat",
  icons: IMAGES.mainLogo,
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
      >
        <Providers>
            <NavBar />
            {children}
            <Footer />
        </Providers>
      </body>
    </html>
  );
}
