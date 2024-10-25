import { Button } from "@/components/ui/button";

const CTA = () => {
  return (
    <div className="bg-primary text-primary-foreground py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Ready to start your journey?
          </h2>
          <p className="mt-6 text-lg leading-8 text-primary-foreground/80">
            Join Hirepod today and connect with amazing job opportunities
            tailored for Filipino professionals.
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Button
              size="lg"
              className="bg-secondary text-secondary-foreground hover:bg-secondary/90"
            >
              Get started
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="bg-transparent border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary"
            >
              Learn more
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CTA;
