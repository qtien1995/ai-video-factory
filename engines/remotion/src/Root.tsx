import "./index.css";
import { Composition } from "remotion";
import { DockerExplainer } from "./examples/DockerExplainer/DockerExplainer";
import { dockerExplainerSchema } from "./examples/DockerExplainer/types";
import { CanonicalVideo } from "./CanonicalVideo";
import { DeXuatBhxhVideo } from "./projects/de-xuat-bhxh/DeXuatBhxhVideo";
import { EmergencyInsuranceVideo } from "./projects/emergency-insurance/EmergencyInsuranceVideo";
import { IncomeProtectionVideo } from "./projects/income-protection/IncomeProtectionVideo";
import { IncomeGapEditorialV2 } from "./projects/income-gap-editorial/IncomeGapEditorialV2";
import { BaNganTienVideo } from "./projects/ba-ngan-tien/BaNganTienVideo";
import { IncomeGapVideo } from "./projects/income-gap/IncomeGapVideo";
import { CoBhytChoConVideo } from "./projects/co-bhyt-cho-con/CoBhytChoConVideo";
import { TheSucKhoeChoConVideo } from "./projects/the-suc-khoe-cho-con/TheSucKhoeChoConVideo";
import { BhskCongTyDuMuonVideo } from "./projects/bhsk-congty-du-muon/BhskCongTyDuMuonVideo";
import { HangChoThuocNgoaiVideo } from "./projects/hang-cho-thuoc-ngoai/HangChoThuocNgoaiVideo";
import { ChoiHuiBaoHiemVideo } from "./projects/choi-hui-bao-hiem/ChoiHuiBaoHiemVideo";
import { BhytChiPhiChimVideo } from "./projects/bhyt-chi-phi-chim/BhytChiPhiChimVideo";
import { DieuKhoanLoaiTruVideo } from "./projects/dieu-khoan-loai-tru/DieuKhoanLoaiTruVideo";
import { InvestmentRaceVideo } from "./projects/investment-race-chart/InvestmentRaceVideo";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="InvestmentRaceChart"
        component={InvestmentRaceVideo}
        durationInFrames={1350}
        fps={30}
        width={1080}
        height={1920}
      />
      <Composition
        id="CanonicalVideo"
        component={CanonicalVideo}
        durationInFrames={300}
        fps={30}
        width={1080}
        height={1920}
        defaultProps={{
          spec: null
        }}
        calculateMetadata={({ props }: { props: { spec?: { format?: { totalDurationFrames?: number; fps?: number; width?: number; height?: number } } | null } }) => {
          return {
            durationInFrames: props.spec?.format?.totalDurationFrames || 300,
            fps: props.spec?.format?.fps || 30,
            width: props.spec?.format?.width || 1080,
            height: props.spec?.format?.height || 1920
          };
        }}
      />
      <Composition
        id="DeXuatBhxhTaiXeSeller"
        component={DeXuatBhxhVideo}
        durationInFrames={1669}
        fps={30}
        width={1080}
        height={1920}
      />
      <Composition
        id="EmergencyFundInsurance"
        component={EmergencyInsuranceVideo}
        durationInFrames={1350}
        fps={30}
        width={1080}
        height={1920}
      />
      <Composition
        id="IncomePause6Months"
        component={IncomeProtectionVideo}
        durationInFrames={1470}
        fps={30}
        width={1080}
        height={1920}
      />
      <Composition
        id="IncomeGapEditorialV2"
        component={IncomeGapEditorialV2}
        durationInFrames={1440}
        fps={30}
        width={1080}
        height={1920}
      />
      <Composition
        id="BaNganTien60s"
        component={BaNganTienVideo}
        durationInFrames={1800}
        fps={30}
        width={1080}
        height={1920}
      />
      <Composition
        id="IncomeGapEmptyChairPreview"
        component={IncomeGapVideo}
        durationInFrames={1350}
        fps={30}
        width={1080}
        height={1920}
      />
      <Composition
        id="DockerExplainer"
        component={DockerExplainer}
        durationInFrames={3500}
        fps={30}
        width={1080}
        height={1920}
        schema={dockerExplainerSchema}
        defaultProps={{
          title: "Docker là gì?",
          subtitle: "Giải thích trong 60 giây",
        }}
      />
      <Composition
        id="CoBhytChoConVideo"
        component={CoBhytChoConVideo}
        durationInFrames={1723}
        fps={30}
        width={1080}
        height={1920}
      />
      <Composition
        id="TheSucKhoeChoConVideo"
        component={TheSucKhoeChoConVideo}
        durationInFrames={1725}
        fps={30}
        width={1080}
        height={1920}
      />
      <Composition
        id="BhskCongTyDuMuonVideo"
        component={BhskCongTyDuMuonVideo}
        durationInFrames={2631}
        fps={30}
        width={1080}
        height={1920}
      />
      <Composition
        id="HangChoThuocNgoaiVideo"
        component={HangChoThuocNgoaiVideo}
        durationInFrames={2428}
        fps={30}
        width={1080}
        height={1920}
      />
      <Composition
        id="ChoiHuiBaoHiemVideo"
        component={ChoiHuiBaoHiemVideo}
        durationInFrames={2469}
        fps={30}
        width={1080}
        height={1920}
      />
      <Composition
        id="BhytChiPhiChimVideo"
        component={BhytChiPhiChimVideo}
        durationInFrames={1932}
        fps={30}
        width={1080}
        height={1920}
      />
      <Composition
        id="DieuKhoanLoaiTruVideo"
        component={DieuKhoanLoaiTruVideo}
        durationInFrames={1756}
        fps={30}
        width={1080}
        height={1920}
      />
    </>
  );
};
