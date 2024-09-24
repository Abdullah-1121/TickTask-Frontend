import type { Metadata } from "next";
import {Jura} from "next/font/google";
import "./globals.css";
import {Toaster} from 'react-hot-toast'
const inter = Jura({
  subsets: ['latin'], // Example parameter, it can vary depending on the use case
  weight: '400',      // You can specify font weight if applicable
  display: 'swap',    // Optional: defines how the font is displayed
});

export const metadata: Metadata = {
  title: "Tick Task ",
  description: "Your Daily Task Manager - by Muhammad Abdullah",
  icons:{
    icon:'/favicon.png'
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}<Toaster position="bottom-right"/></body>
    </html>
  );
}
