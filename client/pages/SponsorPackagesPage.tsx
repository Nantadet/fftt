import { SponsorPageShell } from "@/components/SponsorSidebar";
import SponsorshipPackages from "./SponsorshipPackages";

export default function SponsorPackagesPage() {
  return (
    <SponsorPageShell>
      <div className="overflow-hidden rounded-[1.75rem] border border-amber-300/18 bg-stone-950/70 shadow-[0_24px_70px_rgba(0,0,0,0.28)]">
        <SponsorshipPackages />
      </div>
    </SponsorPageShell>
  );
}
