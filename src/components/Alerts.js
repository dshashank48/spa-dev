import React from "react";
import { useMatch, useNavigate } from "react-location";
import { toast } from "react-toastify";
import { usePresentationPageSource } from "../api/queries";

export const Alert = ({ message }) => {
  return (
    <div
      className="mb-4 flex w-full rounded-sm border-t-4 border-yellow-500 bg-yellow-100 p-4 dark:bg-yellow-200"
      role="alert"
    >
      <svg
        className="h-4 w-4 flex-shrink-0 text-yellow-700"
        fill="currentColor"
        viewBox="0 0 20 20"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fillRule="evenodd"
          d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
          clipRule="evenodd"
        ></path>
      </svg>
      <div className="ml-3 text-xs font-medium text-yellow-700">{message}</div>
    </div>
  );
};

export const PageAlerts = () => {
  const {
    data: { presentationPage },
    params,
  } = useMatch();
  const navigate = useNavigate();

  const { refetch } = usePresentationPageSource(
    params.presentationId,
    presentationPage.attributes.source
  );

  const isEditMode = params.mode === "edit";
  const baseRoute = `/${params.dealerGroup}/${params.presentationId}/${params.pageId}`;

  const handleClick = async () => {
    if (isEditMode) {
      toast.promise(
        refetch().then(res => {
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
    } else {
      navigate({ to: `${baseRoute}/edit` });
    }
  };

  const alerts = presentationPage.attributes?.warnings?.map((warning, idx) => (
    <Alert
      message={
        <>
          {warning}. Click{" "}
          <button
            className="cursor-pointer border-0 p-0 font-medium underline"
            onClick={handleClick}
          >
            here
          </button>{" "}
          to view the original source and override.
        </>
      }
      key={idx}
    />
  ));

  return alerts || null;
};
