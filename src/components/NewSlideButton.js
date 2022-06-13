import React from "react";
import { useFormContext } from "react-hook-form";
import { useMatch, useNavigate } from "react-location";
import { useMutation, useQueryClient } from "react-query";
import { toast } from "react-toastify";
import { postPresentationPage, putPresentationHome } from "../api";
import { usePresentationHome } from "../api/queries";
import { ReactComponent as PlusIcon } from "../assets/icons/plus.svg";

const NewSlideButton = ({ insert }) => {
  const navigate = useNavigate();

  const {
    data: { presentationPage, presentationHome },
    params,
  } = useMatch();

  const { data: presentationHomeData } = usePresentationHome(
    presentationHome.id
  );

  const playlist =
    presentationHomeData?.attributes?.playlist ??
    presentationHome?.attributes?.playlist;

  const currentSlideIndex = playlist.findIndex(
    page => page.id === presentationPage?.id
  );
  const indexToInsertAt =
    insert === "after" ? currentSlideIndex + 1 : currentSlideIndex;

  const { setValue } = useFormContext();
  const queryClient = useQueryClient();

  const { mutateAsync: createPage, isLoading: isCreatePageLoading } =
    useMutation(postPresentationPage, {
      onSuccess: data => {
        queryClient.setQueryData(
          [
            "presentation",
            { presentationId: presentationHome.id, pageId: data.id },
          ],
          data
        );
      },
    });

  const {
    mutateAsync: updatePresentation,
    isLoading: isUpdatePresentationLoading,
  } = useMutation(putPresentationHome);

  const handleClick = async () => {
    toast.promise(
      createPage(params.presentationId).then(data => {
        const updatedPlaylist = [...playlist];
        updatedPlaylist.splice(indexToInsertAt, 0, {
          type: data.attributes.type,
          id: data.id,
          title: data.attributes.title,
          visible: true,
        });
        const updatedPresentationHome = {
          ...presentationHome,
          attributes: {
            ...presentationHome.attributes,
            playlist: updatedPlaylist,
          },
        };

        return updatePresentation(updatedPresentationHome, {
          onSuccess: () => {
            queryClient.setQueryData(
              ["presentation", { presentationId: presentationHome.id }],
              updatedPresentationHome
            );
            setValue("presentationHome", updatedPresentationHome);
            navigate({
              to: `/${params.dealerGroup}/${params.presentationId}/${data.id}/edit`,
            });
          },
        });
      }),
      {
        pending: "Creating New Slide...",
        success: "Success 👌",
        error: "Oops! Something went wrong 🤯",
      }
    );
  };

  return (
    <button
      disabled={isCreatePageLoading || isUpdatePresentationLoading}
      className={`create-new-slide-btn flex w-full cursor-pointer items-center justify-center rounded-md border-2 border-dashed border-gray-500 bg-transparent p-4 text-center text-gray-500 transition-colors hover:border-blue-700 hover:text-blue-700 ${
        insert === "before" ? "mb-4" : "mt-4"
      }`}
      onClick={handleClick}
    >
      <PlusIcon className="mr-2 h-4 w-4" /> New Slide {insert}
    </button>
  );
};

export default NewSlideButton;
