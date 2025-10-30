import { Button } from "@/components/ui/button";
import { PiStorefrontBold } from "react-icons/pi";
import { MdInventory } from "react-icons/md";
import { PiBankBold } from "react-icons/pi";

const Page = () => {
  return (
    <main className=" py-20 px-4 xl:px-30">
      <section className="container mx-auto @container py-20 px-4">
        <div className="flex flex-col gap-12">
          <div className="flex flex-col gap-8">
            <div className="flex flex-col gap-4 text-left">
              <h1 className="text-dark-gray dark:text-background-light text-5xl font-black leading-tight tracking-[-0.033em] @[480px]:text-6xl">
                Empower your online store with AnkhMart.
              </h1>
              <h2 className="text-dark-gray/80 dark:text-background-light/80 text-lg font-normal leading-normal @[480px]:text-xl">
                Create your own storefront, manage products easily, and get paid
                securely with Stripe Connect.
              </h2>
            </div>
            <div className="flex flex-wrap gap-4">
              <Button variant={"elevated"} size={"lg"}>
                Start Selling
              </Button>
              <Button variant={"elevated"} size={"lg"}>
                Learn More
              </Button>
            </div>
          </div>
        </div>
      </section>
      <section className="container mx-auto py-20 px-4">
        <h2 className="text-dark-gray dark:text-background-light text-4xl font-bold leading-tight tracking-[-0.015em] text-center mb-12">
          How It Works
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center items-start">
          <div className="flex flex-col items-center gap-4 bg-white p-4 rounded-lg border ">
            <div className="flex items-center justify-center size-18 bg-amber-400 rounded-2xl text-primary">
              <PiStorefrontBold size={64} />
            </div>
            <h3 className="text-dark-gray dark:text-background-light text-xl font-bold leading-tight">
              1. Create Store
            </h3>
            <p className="text-dark-gray/80 dark:text-background-light/80 text-base font-normal leading-normal">
              Set up your personalized storefront in minutes.
            </p>
          </div>
          <div className="flex flex-col items-center gap-4 bg-white p-4 rounded-lg border ">
            <div className="flex items-center justify-center size-18 bg-amber-400 rounded-2xl text-primary">
              <MdInventory size={64} />
            </div>
            <h3 className="text-dark-gray dark:text-background-light text-xl font-bold leading-tight">
              2. Add Products
            </h3>
            <p className="text-dark-gray/80 dark:text-background-light/80 text-base font-normal leading-normal">
              Easily add and manage your products with our powerful CMS.
            </p>
          </div>
          <div className="flex flex-col items-center gap-4 bg-white p-4 rounded-lg border ">
            <div className="flex items-center justify-center size-18 bg-amber-400 rounded-2xl text-primary">
              <PiBankBold size={64} />
            </div>
            <h3 className="text-dark-gray dark:text-background-light text-xl font-bold leading-tight">
              3. Get Paid
            </h3>
            <p className="text-dark-gray/80 dark:text-background-light/80 text-base font-normal leading-normal">
              Accept secure payments directly with Stripe.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
};
export default Page;
