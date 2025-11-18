export const metadata = {
  title: "ZEIROKO",
    description: "Peer-to-peer banner advertising platform",
    };
// app/layout.jsx
import './globals.css';
import ThemeProvider from '@/components/ThemeProvider';

    export default function RootLayout({ children }) {
      return ( <html lang="en">
              <body>
                      <ThemeProvider>{children}</ThemeProvider>
                            </body>
                                </html>
                                  );
                                  }