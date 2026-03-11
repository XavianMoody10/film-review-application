import { FullMediaBackdropSlider } from "../components/FullMediaBackdropSlider";
import { LoadingOverlay } from "../components/LoadingOverlay";
import { ErrorMessageOverlay } from "../components/ErrorMessageOverlay";
import { useFetchTrendingMedia } from "../hooks/useFetchTrendingMedia";
import { Header } from "../components/Header";
import { SideNavigation } from "../components/SideNavigation";

export const Home = () => {
  const trendingQuery = useFetchTrendingMedia("all");

  return (
    <>
      <Header />
      <SideNavigation></SideNavigation>

      <div className=" relative min-h-screen">
        <LoadingOverlay isLoading={trendingQuery.isLoading} zIndex={99} />
        <FullMediaBackdropSlider results={trendingQuery.data?.results} />
        <ErrorMessageOverlay erorrMessage={trendingQuery.error?.message} />
      </div>
    </>
  );
};
