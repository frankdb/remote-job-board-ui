import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface ProfileLayoutProps {
  children: React.ReactNode;
  title: string;
}

export function ProfileLayout({ children, title }: ProfileLayoutProps) {
  return (
    <div className="max-w-4xl mx-auto p-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">{title}</CardTitle>
        </CardHeader>
        <CardContent>{children}</CardContent>
      </Card>
    </div>
  );
}
