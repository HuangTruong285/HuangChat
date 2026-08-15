import { Link } from "react-router-dom";
import { MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Navbar() {
  return (
    <nav className="border-border bg-background/80 sticky top-0 z-50 border-b backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link to="/" className="flex cursor-default items-center gap-2">
          <div className="bg-primary text-primary-foreground shadow-primary/20 flex size-10 items-center justify-center rounded-xl shadow-lg">
            <MessageCircle className="size-5" />
          </div>

          <span className="from-primary bg-linear-to-r to-cyan-500 bg-clip-text text-xl font-bold tracking-wider text-transparent">
            ChatNe
          </span>
        </Link>

        {/* Auth */}
        <Button
          asChild
          className="shadow-primary/20 font-medium shadow-lg"
          size="lg"
        >
          <Link to="/auth">Đăng nhập / Đăng ký</Link>
        </Button>
      </div>
    </nav>
  );
}
