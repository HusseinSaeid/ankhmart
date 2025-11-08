import AccountCenterView from "@/modules/account-center/views/accountCenterView";
import { caller } from "@/trpc/server";
import { redirect } from "next/navigation";

const Page = async () => {
  const session = await caller.auth.session();
  if (!session.user) {
    redirect("sign-in");
  }
  return <AccountCenterView />;
};
export default Page;
