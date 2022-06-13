import { useMatch } from "react-location";
import { useAuthContext } from "../auth";
import { PageAlerts } from "../components/Alerts";
import AssetAllocationPage from "./AssetAllocationPage";
import AssetsAndLiabilitiesPage from "./AssetsAndLiabilitiesPage";
import CalmPvPage from "./CalmPvPage";
import CoAInitialPage from "./CoAInitialPage";
import CoAOngoingPage from "./CoAOngoingPage";
import CustomPage from "./CustomPage";
import EstatePlanningPage from "./EstatePlanningPage";
import GoalsPage from "./GoalsPage";
import NextStepsPage from "./NextStepsPage";
import OverviewPage from "./OverviewPage";
import PersonalRiskInsurance from "./PersonalRiskInsurance";
import ProductCostsPage from "./ProductCostsPage";
import ProposedPortfolioPage from "./ProposedPortfolioPage";
import RecommendedInvestmentsPage from "./RecommendedInvestmentsPage";
import RiskProfilePage from "./RiskProfilePage";
import SwitchAnalysisPage from "./SwitchAnalysisPage";
import WealthProductPage from "./WealthProductPage";
import WealthStrategyPage from "./WealthStrategyPage";

export const PresentationPageView = ({ presentationPageData }) => {
  if (!presentationPageData) {
    return null;
  }

  let page = null;

  switch (presentationPageData.attributes.type) {
    case "overview":
      page = <OverviewPage data={presentationPageData} />;
      break;
    case "estatePlanning":
      page = <EstatePlanningPage data={presentationPageData} />;
      break;
    case "riskProfile":
      page = <RiskProfilePage data={presentationPageData} />;
      break;
    case "goals":
      page = <GoalsPage data={presentationPageData} />;
      break;
    case "recommendedInvestments":
      page = <RecommendedInvestmentsPage data={presentationPageData} />;
      break;
    case "proposedAssetAllocation":
      page = <AssetAllocationPage data={presentationPageData} />;
      break;
    case "assetsAndLiabilities":
      page = <AssetsAndLiabilitiesPage data={presentationPageData} />;
      break;
    case "proposedPortfolio":
      page = <ProposedPortfolioPage data={presentationPageData} />;
      break;
    case "wealthStrategy":
      page = <WealthStrategyPage data={presentationPageData} />;
      break;
    case "retain":
      page = <ProductCostsPage data={presentationPageData} />;
      break;
    case "nextSteps":
      page = <NextStepsPage data={presentationPageData} />;
      break;
    case "personalRiskInsurance":
      page = <PersonalRiskInsurance data={presentationPageData} />;
      break;
    case "rebalance":
      page = <SwitchAnalysisPage data={presentationPageData} />;
      break;
    case "replacementOfProduct":
      page = <WealthProductPage data={presentationPageData} />;
      break;
    case "costOfAdviceInitial":
      page = <CoAInitialPage data={presentationPageData} />;
      break;
    case "costOfAdviceOngoing":
      page = <CoAOngoingPage data={presentationPageData} />;
      break;
    case "calmPv":
      page = <CalmPvPage data={presentationPageData} />;
      break;
    case "custom":
      page = <CustomPage data={presentationPageData} />;
      break;
    default:
      page = (
        <div className="flex h-full items-center justify-center text-red-400">
          <p>Oops! Looks like this page doesn't exist.</p>
        </div>
      );
  }
  return <>{page}</>;
};

const PresentationPage = () => {
  const {
    data: { presentationPage },
  } = useMatch();

  const { parsedToken } = useAuthContext();
  const isParaplanner = parsedToken.realm_access.roles.includes("paraplanner");

  return (
    <>
      <div className="h-page w-page p-8 pt-4">
        {isParaplanner && <PageAlerts />}
        <PresentationPageView presentationPageData={presentationPage} />
      </div>
    </>
  );
};

export default PresentationPage;
