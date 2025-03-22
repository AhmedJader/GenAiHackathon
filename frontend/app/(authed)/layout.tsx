import Navbar from "@/components/ui/home-navbar";
import Footer from "@/components/ui/footer";
import HomeNavbar from "@/components/ui/home-navbar";

export default function Authed({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <div>test</div>
      {children}
    </>
  );
}
