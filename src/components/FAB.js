import React from "react";
import { useMatch, useNavigate } from "react-location";
import { useAuthContext } from "../auth";
import { Fab, Action } from "react-tiny-fab";
import { toast } from "react-toastify";
import { ReactComponent as PlusIcon } from "../assets/icons/plus.svg";
import { ReactComponent as EditIcon } from "../assets/icons/edit.svg";
import { ReactComponent as PresentationIcon } from "../assets/icons/presentation.svg";
import { ReactComponent as ShareIcon } from "../assets/icons/share.svg";
import { ReactComponent as ExternalLinkIcon } from "../assets/icons/external-link.svg";
import { usePresentationPageSource } from "../api/queries";

import "react-tiny-fab/dist/styles.css";

const getActions = ({
  isEditMode,
  isParaplanner,
  baseRoute,
  navigate,
  fetchSource,
}) => {
  const actions = {
    edit: {
      text: "Edit",
      icon: <EditIcon className="h-5 w-5" />,
      onClick: () => {
        navigate({ to: `${baseRoute}/edit` });
      },
    },
    presentation: {
      text: "Presentation",
      icon: <PresentationIcon className="h-5 w-5" />,
      onClick: () => {
        navigate({ to: `${baseRoute}/presentation` });
      },
    },
    share: {
      text: "Share",
      icon: <ShareIcon className="h-5 w-5" />,
      onClick: () => {},
    },
    viewSource: {
      text: "View Source",
      icon: <ExternalLinkIcon className="h-5 w-5" />,
      onClick: () => {
        toast.promise(
          fetchSource().then(res => {
            let win = window.open("", "_blank", "popup");
            win.document.body.innerHTML =
              "<title>Underlying Source</title>" + res.data;
            win.document.close();
          }),
          {
            pending: "Fetching Source...",
            success: "Success 👌",
            error: "Oops! Something went wrong 🤯",
          }
        );
      },
    },
  };

  if (isEditMode && isParaplanner) {
    return [actions.presentation, actions.viewSource, actions.share];
  } else if (isEditMode && !isParaplanner) {
    return [actions.presentation, actions.share];
  } else if (!isEditMode && isParaplanner) {
    return [actions.edit, actions.viewSource, actions.share];
  } else {
    return [actions.edit, actions.share];
  }
};

const FAB = () => {
  const { parsedToken } = useAuthContext();
  const {
    data: { presentationPage },
    params,
  } = useMatch();
  const navigate = useNavigate();

  const { refetch: fetchSource } = usePresentationPageSource(
    params.presentationId,
    presentationPage.attributes.source
  );

  if (!parsedToken) {
    return null;
  }
  const isEditMode = params.mode === "edit";
  const isParaplanner = parsedToken.realm_access.roles.includes("paraplanner");
  const baseRoute = `/${params.dealerGroup}/${params.presentationId}/${params.pageId}`;

  const actions = getActions({
    isEditMode,
    isParaplanner,
    baseRoute,
    navigate,
    fetchSource,
  });

  return (
    <div
      className={`fab-container ${
        !isEditMode && !isParaplanner ? "animate" : ""
      }`}
    >
      <Fab
        style={{ bottom: 0, right: 0 }}
        icon={<PlusIcon className="h-5 w-5" />}
        mainButtonStyles={{
          backgroundColor: "#1C4ED8",
        }}
      >
        {actions.map((action, index) => (
          <Action
            key={index}
            text={action.text}
            onClick={action.onClick}
            style={{
              backgroundColor: "#2463EB",
            }}
          >
            {action.icon}
          </Action>
        ))}
      </Fab>
    </div>
  );
};

export default FAB;
