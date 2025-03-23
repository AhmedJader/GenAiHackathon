import Navbar from "@/components/ui/home-navbar";
import Footer from "@/components/ui/footer";
import HomeNavbar from "@/components/ui/home-navbar";
import Nav from '@/components/navbar'
import AuthedNavbar from "@/components/ui/authed-navbar";

export default function AuthedLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Nav />
      {children}
    </>
  );
}
