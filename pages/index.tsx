import HomeComponent from "@/modules/components/home";
import MainLayout from "@/modules/components/layout/MainLayout";
import Head from "next/head";

export default function Home() {
  return (
    <MainLayout>
      <Head>
        <title>Chatter App</title>
      </Head>
      <HomeComponent />
    </MainLayout>
  );
}
