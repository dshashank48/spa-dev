import { useQuery, useQueryClient } from "react-query";
import {
  getPresentationHomeById,
  getPresentationPageById,
  getPresentationPageSource,
  getUserDetails,
} from ".";
import { useAuthContext } from "../auth";

export const usePresentationHome = presentationId => {
  const queryClient = useQueryClient();

  const presentationHomeData = useQuery(
    ["presentation", { presentationId }],
    () => getPresentationHomeById(presentationId),
    {
      enabled: Boolean(presentationId),
      onSuccess: data => {
        data.attributes.playlist.forEach(page => {
          queryClient.prefetchQuery(
            ["presentation", { presentationId, pageId: page.id }],
            () => getPresentationPageById(presentationId, page.id)
          );
        });
      },
    }
  );

  return presentationHomeData;
};

export const usePresentationPage = (presentationId, pageId) => {
  const presentationPageData = useQuery(
    ["presentation", { presentationId, pageId }],
    () => getPresentationPageById(presentationId, pageId),
    {
      enabled: Boolean(presentationId && pageId),
    }
  );

  return presentationPageData;
};

export const usePresentationPageSource = (
  presentationId,
  sectionName,
  enabled = false
) => {
  const presentationPageData = useQuery(
    ["presentation", { presentationId, sectionName }],
    () => getPresentationPageSource(presentationId, sectionName),
    {
      enabled: Boolean(presentationId && sectionName && enabled),
      useErrorBoundary: false,
    }
  );

  return presentationPageData;
};

export const useUserDetails = () => {
  let { parsedToken } = useAuthContext();

  let { planpod_dealer_group: dealerGroup, sub: id } = parsedToken;

  const { data: userDetails } = useQuery(
    ["user", { dealerGroup, id }],
    () => getUserDetails(dealerGroup, id),
    {
      enabled: Boolean(dealerGroup && id),
      useErrorBoundary: false,
    }
  );

  return userDetails;
};
