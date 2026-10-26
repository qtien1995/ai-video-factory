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
import { XanhPhuQuyRaceVideo } from "./projects/xanh-phu-quy-vs-tiet-kiem/XanhPhuQuyRaceVideo";
import { DuBaoCkCuoiNam2026Video } from "./projects/du-bao-ck-cuoi-nam-2026/DuBaoCkCuoiNam2026Video";
import { VnIndexBullTrapVideo } from "./projects/vnindex-bull-trap/VnIndexBullTrapVideo";
import { TradingViewDarkProVideo } from "./projects/tradingview-dark-pro/TradingViewDarkProVideo";
import { VinFastKineticVideo } from "./projects/vinfast-kinetic/VinFastKineticVideo";
import { VinFastAuthenticVideo } from "./projects/vinfast-kinetic/VinFastAuthenticVideo";
import { HudTimelineVideo } from "./projects/hud-timeline/HudTimelineVideo";
import { BaoHiemGiuGonVideo } from "./projects/bao-hiem-giu-gon/BaoHiemGiuGonVideo";
import { DuBaoUngThuNuVideo } from "./projects/du-bao-ung-thu-nu-2050/DuBaoUngThuNuVideo";
import { GoiBaoHiem20TrVideo } from "./projects/goi-bao-hiem-20tr/GoiBaoHiem20TrVideo";
import { UngThuDaiTrucTrangVideo } from "./projects/ung-thu-dai-truc-trang-top-3/UngThuDaiTrucTrangVideo";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="UngThuDaiTrucTrangVideo"
        component={UngThuDaiTrucTrangVideo}
        durationInFrames={1776}
        fps={30}
        width={1080}
        height={1920}
      />
      <Composition
        id="GoiBaoHiem20TrVideo"
        component={GoiBaoHiem20TrVideo}
        durationInFrames={1662}
        fps={30}
        width={1080}
        height={1920}
      />
      <Composition
        id="DuBaoUngThuNuVideo"
        component={DuBaoUngThuNuVideo}
        durationInFrames={1944}
        fps={30}
        width={1080}
        height={1920}
      />
      <Composition
        id="BaoHiemGiuGonVideo"
        component={BaoHiemGiuGonVideo}
        durationInFrames={2100}
        fps={30}
        width={1080}
        height={1920}
      />
      <Composition
        id="HudTimelineVideo"
        component={HudTimelineVideo}
        durationInFrames={1802}
        fps={30}
        width={1080}
        height={1920}
      />
      <Composition
        id="VinFastAuthenticVideo"
        component={VinFastAuthenticVideo}
        durationInFrames={1152}
        fps={30}
        width={1920}
        height={1080}
      />
      <Composition
        id="VinFastKineticVideo"
        component={VinFastKineticVideo}
        durationInFrames={990}
        fps={30}
        width={1920}
        height={1080}
      />
      <Composition
        id="TradingViewDarkProVideo"
        component={TradingViewDarkProVideo}
        durationInFrames={1874}
        fps={30}
        width={1080}
        height={1920}
      />
      <Composition
        id="VnIndexBullTrapVideo"
        component={VnIndexBullTrapVideo}
        durationInFrames={1874}
        fps={30}
        width={1080}
        height={1920}
      />
      <Composition
        id="XanhPhuQuyRaceVideo"
        component={XanhPhuQuyRaceVideo}
        durationInFrames={1711}
        fps={30}
        width={1080}
        height={1920}
      />
      <Composition
        id="DuBaoCkCuoiNam2026Video"
        component={DuBaoCkCuoiNam2026Video}
        durationInFrames={1862}
        fps={30}
        width={1080}
        height={1920}
      />
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
