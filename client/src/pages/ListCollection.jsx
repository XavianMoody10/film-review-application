import { useParams } from "react-router-dom";
import { MainWrapper } from "../components/MainWrapper";
import { useInView } from "react-intersection-observer";
import { useEffect } from "react";
import { ClipLoader } from "react-spinners";
import { useFetchInfiniteListCollection } from "../hooks/useFetchInfiniteListCollection";
import { PostersGrid } from "../components/PostersGrid";

export const ListCollection = () => {
  const { media_type, list_value } = useParams();

  // react-intersection-observer library
  const { ref, inView } = useInView({ threshold: 0.5 });

  // Custom hook
  const query = useFetchInfiniteListCollection(media_type, list_value);

  // When ref is in view, load next page
  useEffect(() => {
    if (inView) {
      query.fetchNextPage();
    }
  }, [inView]);

  return (
    <MainWrapper>
      <div className=" px-10 pt-28 pb-10 space-y-10">
        {query.isSuccess && (
          <PostersGrid pages={query.data.pages} mediaType={media_type} />
        )}

        {query.hasNextPage && (
          <div
            className=" w-full border border-white h-25 flex items-center justify-center"
            ref={ref}
          >
            <ClipLoader size={20} color="white" />
          </div>
        )}
      </div>
    </MainWrapper>
  );
};
