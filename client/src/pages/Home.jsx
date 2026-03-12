import { LoadingOverlay } from "../components/LoadingOverlay";
import { ErrorMessageOverlay } from "../components/ErrorMessageOverlay";
import { useFetchTrendingMedia } from "../hooks/useFetchTrendingMedia";
import { FullPageMediaBackdropSlider } from "../components/FullPageMediaBackdropSlider";

export const Home = () => {
  const trendingQuery = useFetchTrendingMedia("all");

  return (
    <>
      <div className=" relative min-h-screen">
        <FullPageMediaBackdropSlider results={trendingQuery.data?.results} />
        <LoadingOverlay isLoading={trendingQuery.isLoading} zIndex={99} />
        <ErrorMessageOverlay erorrMessage={trendingQuery.error?.message} />
      </div>
    </>
  );
};
