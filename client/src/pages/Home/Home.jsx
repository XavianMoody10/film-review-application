import { Link, useNavigate } from "react-router-dom";
import { Header } from "../../components/Header/Header";
import { MainWrapper } from "../../components/MainWrapper/MainWrapper";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { loginUser } from "../../features/user/userSlice";
import { MediaBackdropSlider } from "../../components/MediaBackdropSlider/MediaBackdropSlider";
import { MediaPosterSlider } from "../../components/MediaPosterSlider/MediaPosterSlider";

export const Home = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

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

  const query = useQuery({
    queryKey: ["user"],
    queryFn: checkIfUserIsAuthenticated,
    gcTime: 0,
    staleTime: 0,
    retry: false,
  });

  useEffect(() => {
    if (query.data?.isAuthenticated === true) {
      dispatch(loginUser(query.data.user));
      navigate("/");
    }
  }, [query.data?.isAuthenticated]);

  return (
    <>
      <Header />
      <MainWrapper>
        <div className=" space-y-11">
          <MediaBackdropSlider />

          <div className=" px-5 space-y-5">
            <div className=" flex items-center justify-between">
              <h2 className=" text-white text-2xl font-bold sm:text-3xl">
                Now Playing
              </h2>

              <Link
                to={"/collection/movie/now_playing"}
                className=" text-white text-lg font-semibold hover:underline"
              >
                View All
              </Link>
            </div>
            <MediaPosterSlider />
          </div>
        </div>
      </MainWrapper>
    </>
  );
};
