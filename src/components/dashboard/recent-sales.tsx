import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export function RecentSales() {
  return (
    <div className="space-y-8">
      {[
        {
          name: "Olivia Martin",
          email: "olivia.martin@email.com",
          sale: "+$1,999.00",
        },
        {
          name: "Jackson Lee",
          email: "jackson.lee@email.com",
          sale: "+$39.00",
        },
        {
          name: "Isabella Nguyen",
          email: "isabella.nguyen@email.com",
          sale: "+$299.00",
        },
        { name: "William Kim", email: "will@email.com", sale: "+$99.00" },
        {
          name: "Sofia Davis",
          email: "sofia.davis@email.com",
          sale: "+$39.00",
        },
      ].map((item, index) => (
        <div key={index} className="flex items-center">
          <Avatar className="h-9 w-9">
            <AvatarImage src={`/avatars/${index + 1}.png`} alt="Avatar" />
            <AvatarFallback>
              {item.name
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </AvatarFallback>
          </Avatar>
          <div className="ml-4 space-y-1">
            <p className="text-sm font-medium leading-none">{item.name}</p>
            <p className="text-sm text-muted-foreground">{item.email}</p>
          </div>
          <div className="ml-auto font-medium">{item.sale}</div>
        </div>
      ))}
    </div>
  );
}
