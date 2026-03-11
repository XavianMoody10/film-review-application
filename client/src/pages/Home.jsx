import { Squash as Hamburger } from "hamburger-react";
import { Search as SearchIcon } from "lucide-react";
import { FullMediaBackdropSlider } from "../components/FullMediaBackdropSlider";
import axios from "axios";
import { LoadingOverlay } from "../components/LoadingOverlay";
import { ErrorMessageOverlay } from "../components/ErrorMessageOverlay";
import { useFetchTrendingMedia } from "../hooks/useFetchTrendingMedia";
import { Header } from "../components/Header";

export const Home = () => {
  const trendingQuery = useFetchTrendingMedia("all");

  return (
    <>
      <Header />

      <div className=" relative min-h-screen">
        <LoadingOverlay isLoading={trendingQuery.isLoading} zIndex={99} />
        <FullMediaBackdropSlider results={trendingQuery.data?.results} />
        <ErrorMessageOverlay erorrMessage={trendingQuery.error?.message} />
      </div>
    </>
  );
};
