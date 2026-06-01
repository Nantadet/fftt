import { SponsorPageShell } from "@/components/SponsorSidebar";
import SponsorshipPackages from "./SponsorshipPackages";

export default function SponsorPackagesPage() {
  return (
    <SponsorPageShell>
      <div className="overflow-hidden rounded-[1.75rem] border border-amber-400/25 dark:border-amber-300/20 bg-amber-50/60 dark:bg-stone-950/70 shadow-[0_24px_70px_rgba(120,83,9,0.07)] dark:shadow-[0_24px_70px_rgba(0,0,0,0.28)]">
        <SponsorshipPackages />
      </div>
    </SponsorPageShell>
  );
}
