import "@/app/styles/globals.css";
import { NextUIProvider } from "@nextui-org/react";
import NavBar from "@/_components/NavBar/NavBar";
import Footer from "@/_components/Footer/Footer";
import IMAGES from "@/public";
import { Providers } from "@/app/providers";

export const metadata = {
  title: "Sanika Baug - Best Family Hotel in Halol Near Pavagadh",
  description: "Best Family Hotel in Halol Near Pavagadh",
  icons: IMAGES.sitelogo,
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
