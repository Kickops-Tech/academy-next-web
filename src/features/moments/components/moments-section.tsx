import { MomentsCinema } from "@features/moments/components/moments-cinema";
import { MomentsHeading } from "@features/moments/components/moments-heading";

export function MomentsSection() {
  return (
    <div
      data-moments-stage
      className="@container relative flex min-h-0 w-full flex-1 flex-col justify-center py-10"
    >
      <MomentsHeading />
      <MomentsCinema />
    </div>
  );
}
