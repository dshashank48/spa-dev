import React, { useEffect } from "react";
import {
  useMatch,
  useMatches,
  useMatchRoute,
  useNavigate,
} from "react-location";
import { usePresentationHome } from "../api/queries";
import useKeyPress from "../hooks/useKeyPress";

export const PresentationHeaderloading = () => {
  return (
    <div className="w-page px-8 pb-2 pt-3">
      <div className="item-center pointer-events-none flex cursor-not-allowed justify-between rounded-full bg-gradient-to-r from-blue-50 via-blue-50 to-blue-100 py-1 px-4">
        <button disabled>Previous</button>
        <button disabled>Next</button>
      </div>
    </div>
  );
};

const PresentationHeader = () => {
  const navigate = useNavigate();
  const {
    data: { presentationHome, presentationPage },
  } = useMatches()[1];
  const {
    params: { dealerGroup, presentationId },
  } = useMatch();
  const matchRoute = useMatchRoute();

  const { mode } = matchRoute({ to: ":pageId/:mode" }) || {};

  const { data: presentationHomeData } = usePresentationHome(
    presentationHome.id
  );

  const allPlaylist =
    presentationHomeData?.attributes?.playlist ??
    presentationHome?.attributes?.playlist;
  const visiblePlaylist = allPlaylist?.filter(page => page.visible);
  const playlist = mode === "edit" ? allPlaylist : visiblePlaylist;

  const isVisible =
    visiblePlaylist?.findIndex(page => page.id === presentationPage?.id) !== -1;

  const currentSlideIndex = playlist.findIndex(
    page => page.id === presentationPage?.id
  );
  const isStart = Boolean(!presentationPage);
  const isPlaylistStart = currentSlideIndex === 0;
  const isEnd = playlist.length === currentSlideIndex + 1;
  const totalPages = playlist.length + 1;
  const currentPageNo = isStart ? 1 : currentSlideIndex + 2;
  const progress = currentPageNo / totalPages;

  useEffect(() => {
    if (!isVisible && mode !== "edit") {
      navigate({ to: `/${dealerGroup}/${presentationId}` });
    }
  }, [dealerGroup, isVisible, mode, navigate, presentationId]);

  const onPrev = () => {
    if (isStart) return;
    if (isPlaylistStart) {
      navigate({ to: `/${dealerGroup}/${presentationId}` });
    } else {
      navigate({
        to: `/${dealerGroup}/${presentationId}/${
          playlist[currentSlideIndex - 1].id
        }${mode ? `/${mode}` : ""}`,
      });
    }
  };

  const onNext = () => {
    if (isEnd) return;
    if (isStart) {
      navigate({
        to: `/${dealerGroup}/${presentationHome.id}/${playlist[0].id}${
          mode ? `/${mode}` : ""
        }`,
      });
    } else {
      navigate({
        to: `/${dealerGroup}/${presentationHome.id}/${
          playlist[currentSlideIndex + 1].id
        }${mode ? `/${mode}` : ""}`,
      });
    }
  };

  const switchMode = mode => {
    navigate({
      to: `/${dealerGroup}/${presentationHome.id}/${
        playlist[currentSlideIndex].id
      }${mode ? `/${mode}` : ""}`,
    });
  };

  const disablyKeyPress = mode === "edit";

  useKeyPress("ArrowLeft", onPrev, disablyKeyPress);
  useKeyPress("ArrowRight", onNext, disablyKeyPress);
  useKeyPress(" ", onNext, disablyKeyPress);

  return (
    <div className="w-page px-8 pb-2 pt-3">
      <div className="fixed left-0 right-0 top-0 h-1 bg-gray-200"></div>
      <div
        style={{ transform: `scaleX(${progress})` }}
        className="fixed left-0 top-0 h-1 w-full origin-left bg-blue-600 transition-transform"
      ></div>
      <div className="item-center relative flex justify-between rounded-full bg-gradient-to-r from-blue-50 via-blue-50 to-blue-100 py-1 px-4">
        {!isStart ? (
          <button onClick={onPrev}>
            Previous:{" "}
            {isPlaylistStart ? "Home" : playlist[currentSlideIndex - 1]?.title}
          </button>
        ) : (
          <div />
        )}
        {mode === "edit" && isVisible && (
          <button
            className="absolute right-1/2 bottom-1/2 translate-x-1/2 translate-y-1/2 transform rounded-md border border-blue-700 px-4 text-sm text-blue-700 hover:bg-blue-100"
            onClick={() => switchMode("presentation")}
          >
            Back to Presentation Mode
          </button>
        )}
        {!isEnd ? (
          <button onClick={onNext}>
            Next:{" "}
            {isStart
              ? playlist[0]?.title
              : playlist[currentSlideIndex + 1]?.title}
          </button>
        ) : (
          <div />
        )}
      </div>
    </div>
  );
};

export default PresentationHeader;
