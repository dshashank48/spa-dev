import { useState } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { useFormContext } from "react-hook-form";
import { useMatch, useNavigate } from "react-location";
import { useMutation, useQueryClient } from "react-query";
import { putPresentationHome } from "../api";
import { ReactComponent as EyeOffIcon } from "../assets/icons/eye-off.svg";
import { ReactComponent as EyeIcon } from "../assets/icons/eye.svg";
import { useAuthContext } from "../auth";
import { PresentationPageView } from "../pages/PresentationPage";
import { reorderList } from "../utils";

const queryAttr = "data-rbd-drag-handle-draggable-id";

const Thumbnail = ({ presentationPageData }) => {
  if (!presentationPageData) {
    return null;
  }

  return (
    <div className="thumb-wrap">
      <div className="thumb">
        <PresentationPageView presentationPageData={presentationPageData} />
      </div>
    </div>
  );
};

const NavigatorItem = ({
  presentationId,
  index,
  page,
  active,
  toggleVisibility,
}) => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const {
    params: { dealerGroup },
  } = useMatch();

  const presentationPageData = queryClient.getQueryData([
    "presentation",
    { presentationId: presentationId, pageId: page.id },
  ]);

  const { parsedToken } = useAuthContext();
  const isParaplanner = parsedToken.realm_access.roles.includes("paraplanner");

  const hasWarnings = presentationPageData?.attributes?.warnings?.length > 0;

  const handleClick = e => {
    e.preventDefault();
    e.stopPropagation();
    navigate({
      to: `/${dealerGroup}/${presentationId}/${page.id}/edit`,
    });
  };

  return (
    <Draggable key={page.id} draggableId={page.id} index={index}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          style={provided.draggableProps.style}
          onClick={handleClick}
          className={`my-2 flex cursor-pointer items-end rounded-lg p-2 ${
            active && !snapshot.isDragging ? "bg-blue-500" : ""
          } ${snapshot.isDragging ? "animate-drag-active" : ""}`}
        >
          <span
            className={`mb-5 mr-1 h-6 w-6 rounded-full text-center ${
              snapshot.isDragging ? "opacity-0" : ""
            } ${
              isParaplanner && hasWarnings
                ? "bg-yellow-300 text-black"
                : "text-white"
            }`}
            style={{ minWidth: "1.5rem" }}
          >
            {index + 1}
          </span>

          <div
            className="flex flex-1 flex-col"
            style={{ maxWidth: 140, width: 140, height: 125 }}
          >
            <div
              className={`relative mb-1 flex flex-1 items-center justify-center overflow-hidden rounded-md bg-white p-4`}
              style={{
                width: 140,
                height: 105,
              }}
            >
              <Thumbnail presentationPageData={presentationPageData} />
              {!page.visible && (
                <div className="absolute inset-0 z-10 flex items-center justify-center rounded-md bg-gray-400 bg-opacity-75 py-1 px-2 ">
                  <p className="font-mono text-xs font-bold text-gray-700">
                    Not Visible
                  </p>
                </div>
              )}
              <button
                className="absolute right-1 top-1 z-20 text-black"
                onClick={toggleVisibility}
              >
                {page.visible ? (
                  <EyeIcon className="h-5 w-5" />
                ) : (
                  <EyeOffIcon className="h-5 w-5" />
                )}
              </button>
            </div>
            <p className="overflow-hidden overflow-ellipsis whitespace-nowrap text-center text-xs text-white">
              {page.title}
            </p>
          </div>
        </div>
      )}
    </Draggable>
  );
};

const NavigatorSidebar = ({ presentationPageData, presentationHomeData }) => {
  const { setValue } = useFormContext();
  const queryClient = useQueryClient();
  const [placeholderProps, setPlaceholderProps] = useState({});

  const { mutate } = useMutation(putPresentationHome, {
    onMutate: data => {
      queryClient.setQueryData(
        ["presentation", { presentationId: data.id }],
        data
      );
      setValue("presentationHome", data);
    },
  });

  const toggleVisibility = index => () => {
    mutate({
      ...presentationHomeData,
      attributes: {
        ...presentationHomeData.attributes,
        playlist: presentationHomeData.attributes.playlist.map((page, i) => {
          if (i === index) {
            return {
              ...page,
              visible: !page.visible,
            };
          }
          return page;
        }),
      },
    });
  };

  const onDragEnd = result => {
    // dropped outside the list
    if (!result.destination) {
      return;
    }

    setPlaceholderProps({});

    const reorderedPages = reorderList(
      presentationHomeData.attributes.playlist,
      result.source.index,
      result.destination.index
    );

    mutate({
      ...presentationHomeData,
      attributes: {
        ...presentationHomeData.attributes,
        playlist: reorderedPages,
      },
    });
  };

  const onDragUpdate = update => {
    if (!update.destination) {
      return;
    }
    const draggableId = update.draggableId;
    const destinationIndex = update.destination.index;

    const domQuery = `[${queryAttr}='${draggableId}']`;
    const draggedDOM = document.querySelector(domQuery);

    if (!draggedDOM) {
      return;
    }
    const { clientHeight, clientWidth } = draggedDOM;

    const clientY =
      parseFloat(window.getComputedStyle(draggedDOM.parentNode).paddingTop) +
      [...draggedDOM.parentNode.children]
        .slice(0, destinationIndex)
        .reduce((total, curr) => {
          const style = curr.currentStyle || window.getComputedStyle(curr);
          const marginBottom = parseFloat(style.marginBottom);
          return total + curr.clientHeight + marginBottom;
        }, 0);

    setPlaceholderProps({
      clientHeight,
      clientWidth,
      clientY,
      clientX: parseFloat(
        window.getComputedStyle(draggedDOM.parentNode).paddingLeft
      ),
    });
  };

  if (!presentationHomeData) {
    return null;
  }

  return (
    <div className="my-1 w-full">
      <DragDropContext onDragEnd={onDragEnd} onDragUpdate={onDragUpdate}>
        <Droppable droppableId="droppable">
          {(provided, snapshot) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              style={{
                position: "relative",
              }}
            >
              {presentationHomeData.attributes.playlist.map((page, idx) => {
                return (
                  <NavigatorItem
                    key={page.id}
                    presentationId={presentationHomeData.id}
                    index={idx}
                    page={page}
                    active={page.id === presentationPageData.id}
                    toggleVisibility={toggleVisibility(idx)}
                  />
                );
              })}
              {provided.placeholder}
              <div
                style={{
                  position: "absolute",
                  top: placeholderProps.clientY,
                  left: placeholderProps.clientX,
                  height: placeholderProps.clientHeight,
                  width: placeholderProps.clientWidth,
                }}
                className="rounded-lg bg-blue-500 opacity-25"
              />
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
};

export default NavigatorSidebar;
