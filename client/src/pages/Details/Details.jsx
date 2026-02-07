import { useParams } from "react-router-dom";
import { Header } from "../../components/Header/Header";
import { MainWrapper } from "../../components/MainWrapper/MainWrapper";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ClipLoader } from "react-spinners";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../features/user/userSlice";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

export const Details = () => {
  const { media, id } = useParams();
  const [review, setReview] = useState("");
  const user = useSelector((state) => state.user.value);
  const dispatch = useDispatch();
  const [isSuccess, setIsSuccess] = useState(null);
  const [isError, setIsError] = useState(null);
  const queryClient = useQueryClient();

  async function checkIfUserIsAuthenticated() {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_SERVER_URL}/authentication/isauthenticated`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        },
      );

      if (!response.ok) {
        const data = await response.text();
        throw Error(data);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      throw error;
    }
  }

  const authQuery = useQuery({
    queryKey: ["user"],
    queryFn: checkIfUserIsAuthenticated,
    gcTime: 0,
    staleTime: 0,
    retry: false,
  });

  useEffect(() => {
    if (authQuery.data?.isAuthenticated === true) {
      dispatch(loginUser(authQuery.data.user));
    }
  }, [authQuery.data?.isAuthenticated]);

  // Fetch data from api
  async function fetchMediaData() {
    const response = await fetch(
      `${import.meta.env.VITE_SERVER_URL}/${media}/details/${id}`,
    );

    if (!response.ok) {
      throw new Error("Error getting media details");
    }

    const data = await response.json();

    return data;
  }

  const detailsQuery = useQuery({
    queryKey: ["details", id],
    queryFn: fetchMediaData,
    gcTime: 0,
    staleTime: 0,
    retry: false,
  });

  const reviewsQuery = useQuery({
    queryKey: ["reviews", id],
    queryFn: async () => {
      const response = await fetch(
        `${import.meta.env.VITE_SERVER_URL}/review/get/${id}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        },
      );

      const data = await response.json();

      return data;
    },
    gcTime: 0,
    staleTime: 0,
    retry: false,
  });

  const mutation = useMutation({
    mutationFn: async () => {
      const response = await fetch(
        `${import.meta.env.VITE_SERVER_URL}/review/add`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({ review, mediaId: id, _id: user._id }),
        },
      );

      if (!response.ok) {
        throw new Error(await response.text());
      }

      const data = await response.json();

      return data;
    },
    onSuccess: (data) => {
      setIsSuccess(true);
      setTimeout(() => setIsSuccess(false), 4000);
      console.log(data);
      queryClient.setQueryData(["reviews", id], data);
    },
    onError: () => {
      console.log("Error");
      setIsError(true);
      setTimeout(() => setIsError(false), 4000);
    },
  });

  const reviewsSlides = reviewsQuery.data?.reviews.map(({ userId, review }) => {
    return (
      <SwiperSlide key={userId}>
        <div className=" h-62.5 w-full border border-white/25 p-2 space-y-2 rounded-sm">
          <div className=" bg-white w-full p-2 rounded-sm">user: {userId}</div>
          <p className=" text-white tracking-wider">{review}</p>
        </div>
      </SwiperSlide>
    );
  });

  const posterPath = `https://image.tmdb.org/t/p/original${detailsQuery.data?.poster_path}`;
  const title = detailsQuery.data?.original_title;
  const overview = detailsQuery.data?.overview;

  return (
    <>
      <Header />

      {isSuccess && (
        <div className=" fixed top-0 w-full bg-green-600 text-center text-white font-medium tracking-wider py-3 z-30">
          Review successfully posted
        </div>
      )}

      {isError && (
        <div className=" fixed top-0 w-full bg-red-600 text-center text-white font-medium tracking-wider py-3 z-30">
          {mutation.error?.message}
        </div>
      )}

      <MainWrapper>
        {detailsQuery.isPending && (
          <div className=" h-screen flex items-center justify-center">
            <ClipLoader size={30} color="white" />
          </div>
        )}

        {detailsQuery.isSuccess && (
          <div className=" max-w-275 mx-auto space-y-24 px-5">
            <div className=" pt-20 flex flex-col gap-5 sm:flex-row sm:px-0">
              <img
                src={posterPath}
                alt={title}
                className=" mx-auto max-w-75 sm:max-w-87.5 sm:mx-0"
              />

              <ul className=" space-y-4">
                <li className=" text-2xl text-white font-bold tracking-wider lg:text-3xl">
                  {title}
                </li>
                <li className=" text-white tracking-wider lg:text-lg">
                  {overview}
                </li>
              </ul>
            </div>

            <div className=" space-y-5">
              <h2 className=" text-white text-3xl font-bold tracking-wider">
                Leave a review
              </h2>

              <div className=" w-full">
                <div className=" w-full max-w-175 relative">
                  {!user._id && (
                    <div className=" absolute top-0 left-0 right-0 bottom-0 bg-black/75 text-white text-xl font-extrabold tracking-wider flex items-center justify-center">
                      Log in to add a review
                    </div>
                  )}

                  {user._id &&
                    reviewsQuery.data?.reviews.find(
                      ({ userId }) => userId === user._id,
                    ) && (
                      <div className=" absolute top-0 left-0 right-0 bottom-0 bg-black/75 text-white text-xl font-extrabold tracking-wider flex items-center justify-center">
                        You have already submitted your review
                      </div>
                    )}

                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      mutation.mutate();
                    }}
                  >
                    <textarea
                      name="review"
                      id="review-area"
                      rows={10}
                      maxLength={500}
                      placeholder="Please give your review"
                      className=" border border-white/30 w-full resize-none p-2 text-white placeholder:text-white/35 tracking-wider"
                      onChange={(e) => setReview(e.target.value)}
                    />

                    <button className=" border border-white/35 text-white w-full py-3 font-semibold tracking-wider hover:bg-white hover:text-black duration-150">
                      Submit Review
                    </button>
                  </form>
                </div>
              </div>
            </div>

            <div className=" space-y-5">
              <h2 className=" text-white text-3xl font-bold tracking-wider">
                Other Reviews
              </h2>

              <div className=" h-62.5 relative">
                {reviewsQuery.isError && (
                  <div className=" border border-white/25 absolute top-0 left-0 bottom-0 right-0 flex items-center justify-center text-white">
                    Error getting reviews
                  </div>
                )}

                {reviewsQuery.isSuccess &&
                  reviewsQuery.data?.reviews.length == 0 && (
                    <div className=" border border-white/25 absolute top-0 left-0 bottom-0 right-0 flex items-center justify-center text-white font-bold tracking-wider text-xl">
                      No Reviews
                    </div>
                  )}

                {reviewsQuery.isSuccess &&
                  reviewsQuery.data?.reviews.length > 0 && (
                    <Swiper
                      breakpoints={{
                        768: {
                          slidesPerView: 2,
                        },

                        1200: {
                          slidesPerView: 2.3,
                        },
                      }}
                    >
                      {reviewsSlides}
                    </Swiper>
                  )}
              </div>
            </div>
          </div>
        )}
      </MainWrapper>
    </>
  );
};
