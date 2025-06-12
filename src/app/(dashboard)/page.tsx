import { HomeView } from "@/modules/home/ui/views/home-view";
import { caller } from "@/trpc/server";

const HomePage = async () => {
  const greeting = await caller.hello({ text: "Antonio Server" });

  console.log(greeting);

  return <HomeView />;
};

export default HomePage;
