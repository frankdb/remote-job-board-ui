import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { MdWorkOutline, MdPeopleOutline, MdTrendingUp } from "react-icons/md";

const Features = () => {
  const features = [
    {
      icon: <MdWorkOutline className="h-8 w-8 text-primary" />,
      title: "Remote Jobs",
      description:
        "Access a wide range of remote job opportunities tailored for Filipino professionals.",
    },
    {
      icon: <MdPeopleOutline className="h-8 w-8 text-primary" />,
      title: "Talent Pool",
      description:
        "Connect with skilled Filipino workers across various industries and specializations.",
    },
    {
      icon: <MdTrendingUp className="h-8 w-8 text-primary" />,
      title: "Career Growth",
      description:
        "Enhance your skills and advance your career with our resources and support.",
    },
  ];

  return (
    <div className="bg-background text-foreground py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Why Choose Hirepod?
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Discover the advantages of using our platform for remote job
            opportunities.
          </p>
        </div>
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <Card key={index} className="bg-card text-card-foreground">
              <CardHeader>
                <div className="mb-4">{feature.icon}</div>
                <CardTitle>{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>{feature.description}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Features;
