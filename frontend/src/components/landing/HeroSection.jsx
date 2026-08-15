import { Link } from "react-router-dom";
import { ArrowRight, MessageCircle, Video, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

export default function HeroSection() {
  return (
    <section className="mx-auto max-w-7xl px-4 pt-20 pb-16 text-center sm:px-6 lg:px-8">
      {/* Badge */}
      <div className="border-primary/20 bg-primary/10 text-primary mb-6 inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-semibold">
        <Zap className="size-3.5" />
        <span>Trải nghiệm realtime mượt mà</span>
      </div>

      {/* Heading */}
      <h1 className="text-foreground mx-auto max-w-4xl text-4xl leading-tight font-extrabold tracking-tight sm:text-5xl md:text-7xl">
        Kết nối mọi lúc, trò chuyện mọi nơi với{" "}
        <span className="from-primary via-primary/80 bg-linear-to-r to-cyan-500 bg-clip-text text-transparent">
          ChatNe
        </span>
      </h1>

      {/* Description */}
      <p className="text-muted-foreground mx-auto mt-6 max-w-2xl text-base leading-relaxed sm:text-lg md:text-xl">
        Nền tảng nhắn tin thế hệ mới tích hợp gọi điện video chất lượng cao,
        chia sẻ ảnh tức thì và bảo mật tuyệt đối.
      </p>

      {/* Actions */}
      <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
        <Button
          asChild
          size="lg"
          className="shadow-primary/20 h-12 rounded-xl px-7 text-base font-bold shadow-lg"
        >
          <Link to="/auth" className="justify- flex items-center">
            Bắt đầu trò chuyện ngay
            <ArrowRight className="ml-2 size-4" />
          </Link>
        </Button>

        <Button
          asChild
          variant="outline"
          size="lg"
          className="h-12 rounded-xl px-7 text-base"
        >
          <a href="#features">Tìm hiểu tính năng</a>
        </Button>
      </div>

      {/* App Preview */}
      <div className="border-border bg-card shadow-primary/5 mx-auto mt-16 max-w-5xl rounded-3xl border p-2 shadow-xl sm:p-4">
        <div className="border-border bg-background overflow-hidden rounded-2xl border">
          {/* Fake browser/header */}
          <div className="border-border bg-muted/50 flex items-center gap-2 border-b px-4 py-3">
            <div className="flex gap-1.5">
              <span className="bg-destructive/70 size-2.5 rounded-full" />
              <span className="size-2.5 rounded-full bg-yellow-500/70" />
              <span className="size-2.5 rounded-full bg-green-500/70" />
            </div>

            <div className="bg-background text-muted-foreground mx-auto hidden rounded-md px-4 py-1 text-xs sm:block">
              chatne.app
            </div>
          </div>

          {/* Chat preview */}
          <div className="grid min-h-80 grid-cols-1 md:grid-cols-[220px_1fr]">
            {/* Sidebar */}
            <div className="bg-sidebar hidden border-r p-4 md:block">
              <div className="mb-4 flex items-center gap-2">
                <div className="bg-primary text-primary-foreground flex size-8 items-center justify-center rounded-lg">
                  <MessageCircle className="size-4" />
                </div>

                <span className="font-bold">ChatNe</span>
              </div>

              <div className="space-y-2">
                {["Nguyễn Văn A", "Trần Minh", "Lê Hoàng"].map(
                  (name, index) => (
                    <div
                      key={name}
                      className={`flex items-center gap-2 rounded-lg p-2 text-left ${
                        index === 0 ? "bg-accent" : ""
                      }`}
                    >
                      <Avatar className="size-8">
                        <AvatarFallback>{name.charAt(0)}</AvatarFallback>
                      </Avatar>

                      <div className="min-w-0">
                        <p className="truncate text-xs font-medium">{name}</p>
                        <p className="text-muted-foreground truncate text-[10px]">
                          Tin nhắn mới
                        </p>
                      </div>
                    </div>
                  ),
                )}
              </div>
            </div>

            {/* Chat */}
            <div className="flex flex-col">
              {/* Chat header */}
              <div className="border-border flex items-center justify-between border-b p-4">
                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarFallback>NA</AvatarFallback>
                  </Avatar>

                  <div className="text-left">
                    <p className="text-sm font-semibold">Nguyễn Văn A</p>
                    <p className="text-xs text-green-500">● Online</p>
                  </div>
                </div>

                <div className="flex gap-1">
                  <Button variant="ghost" size="icon">
                    <Video className="size-4" />
                  </Button>

                  <Button variant="ghost" size="icon">
                    <MessageCircle className="size-4" />
                  </Button>
                </div>
              </div>

              {/* Messages */}
              <div className="flex flex-1 flex-col justify-end gap-3 p-5">
                <div className="bg-muted text-foreground max-w-[75%] self-start rounded-2xl rounded-bl-md px-4 py-2 text-sm">
                  Hôm nay thế nào? 👋
                </div>

                <div className="bg-primary text-primary-foreground max-w-[75%] self-end rounded-2xl rounded-br-md px-4 py-2 text-sm">
                  Mình ổn! ChatNe nhìn khá đẹp đấy 😄
                </div>

                <div className="bg-muted text-foreground max-w-[75%] self-start rounded-2xl rounded-bl-md px-4 py-2 text-sm">
                  Realtime hoạt động rất mượt!
                </div>
              </div>

              {/* Input preview */}
              <div className="border-border border-t p-3">
                <div className="bg-muted text-muted-foreground rounded-xl px-4 py-2 text-left text-xs">
                  Nhập tin nhắn...
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
