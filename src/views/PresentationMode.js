import React from "react";
import { useMatch } from "react-location";
import PresentationPage from "../pages/PresentationPage";
import EditPage from "../pages/EditPage";

const PresentationMode = () => {
  const {
    params: { mode },
  } = useMatch();

  switch (mode) {
    case "presentation":
      return <PresentationPage />;
    case "edit":
      return <EditPage />;
    default:
      return <PresentationPage />;
  }
};

export default PresentationMode;
