import { Button } from "@/components/ui/button";

const Hero = () => {
  return (
    <div className="bg-background text-foreground py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">
            Welcome to Our Job Board
          </h1>
          <p className="mt-6 text-lg leading-8 text-muted-foreground">
            Find your dream job or the perfect candidate. Our platform connects
            talented professionals with amazing opportunities.
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Button size="lg">Get started</Button>
            <Button variant="outline" size="lg">
              Learn more
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
