import { SECTION_DISPLAY_HEADING } from "@core/constants/section-display-heading";
import {
  SECTION_HEADING_LEAD_STYLE,
  SECTION_HEADING_TRAIL_STYLE,
} from "@core/utils/section-heading-parallax-style";
import { MOMENTS_HEADING } from "@features/moments/constants/moments";
import { cn } from "@shadcn/lib/utils";

export function MomentsHeading() {
  return (
      <h2 className="relative z-30 flex shrink-0 items-center justify-center whitespace-nowrap px-4 pt-3 pb-2">
      <span
        className={cn(
          "relative z-10 font-abril-fatface leading-none text-kickops-green",
          SECTION_DISPLAY_HEADING.mobile.lead,
          SECTION_DISPLAY_HEADING.desktop.lead,
        )}
        style={SECTION_HEADING_LEAD_STYLE}
      >
        {MOMENTS_HEADING.lead}
      </span>
      <span
        className={cn(
          "relative z-0 font-league-gothic font-black leading-none text-kickops-gray",
          SECTION_DISPLAY_HEADING.mobile.display,
          SECTION_DISPLAY_HEADING.desktop.display,
        )}
        style={{
          marginLeft: "-1.2cqw",
          ...SECTION_HEADING_TRAIL_STYLE,
        }}
      >
        {MOMENTS_HEADING.display}
      </span>
    </h2>
  );
}
