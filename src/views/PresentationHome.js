import dayjs from "dayjs";
import { useMatch } from "react-location";
import { useQueryClient } from "react-query";
import { useUserDetails } from "../api/queries";
import { ReactComponent as CalendarIcon } from "../assets/icons/calendar.svg";
import { ReactComponent as UsersIcon } from "../assets/icons/users.svg";
import { useAuthContext } from "../auth";
import { Alert } from "../components/Alerts";

const PresentationHome = () => {
  const {
    data: { presentationHome },
  } = useMatch();

  const { parsedToken } = useAuthContext();
  const isParaplanner = parsedToken.realm_access.roles.includes("paraplanner");

  const userDetails = useUserDetails();
  const practiceName =
    userDetails?.relationships?.practice?.attributes?.name || null;
  const fullName = userDetails?.attributes?.fullName || parsedToken?.name;

  // SD: not using practiceName or fullName for now.. set in DB
  
  const queryClient = useQueryClient();

  const presentationPageData = queryClient.getQueriesData(
    ["presentation", { presentationId: presentationHome.id }],
    { exact: false }
  );

  const noOfWarnings = presentationPageData.reduce(
    (prev, curr) => prev + (curr[1]?.attributes?.warnings?.length || 0),
    0
  );

  const { attributes } = presentationHome;

// SD: not using practiceName or fullName for now.. set in DB  
  return (
    <>
      <div className="h-page w-page flex flex-col p-8 pt-4">
        {isParaplanner && noOfWarnings > 0 && (
          <Alert
            message={`There ${
              noOfWarnings === 1
                ? "was 1 warning"
                : `were ${noOfWarnings} warnings`
            } triggered when generating this presentation. Please review ${
              noOfWarnings === 1 ? "it" : "these"
            } before sharing with the advisor.`}
          />
        )}
        <img
          src="images/header_1.jpeg"
          alt="Header"
          className="mb-4 h-80 w-full rounded-md object-cover object-top"
        />
        <div className="mb-4 flex items-center justify-between">
          <h1 className="text-3xl font-bold text-blue-900">
            Statement of Advice
          </h1>
          <div className="flex items-center text-blue-900">
            <UsersIcon className="mr-2 h-6 w-6" />
            <p className="text-xl">
              {dayjs(attributes.date).format("MMMM D, YYYY")}
            </p>
          </div>
        </div>
        <div className="flex items-start justify-between">
          <div className="flex w-max items-center rounded-md bg-blue-100 py-2 px-4 text-blue-900">
            <CalendarIcon className="mr-2 h-7 w-7" />

            <h2 className="text-xl">{attributes.name}</h2>
          </div>
          <div className="flex">
            <img
              src="images/sider_1.jpeg"
              alt="Header"
              className="mr-4 h-40 w-64 rounded-md object-cover object-top"
            />

            <img
              src="images/sider_2.jpg"
              alt="Header"
              className="h-60 w-28 rounded-md object-cover object-right"
            />
          </div>
        </div>
        <div className="mt-auto">
          <small className="text-gray-500">Prepared by {attributes.advisorByLine}</small>
          <br />
          <small className="text-gray-500">{attributes.practiceByLine}</small>
        </div>
      </div>
    </>
  );
};

export default PresentationHome;
