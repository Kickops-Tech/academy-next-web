import type { Training } from "@features/trainings/models/training";
import { cn } from "@shadcn/lib/utils";
import {
  Blocks,
  BookOpenText,
  BrainCircuit,
  Network,
  PenTool,
  RadioTower,
  type LucideIcon,
} from "lucide-react";

const TRAINING_ICONS: Record<Training["visual"], LucideIcon> = {
  brain: BrainCircuit,
  remote: RadioTower,
  management: Blocks,
  architecture: Network,
  rag: BookOpenText,
  design: PenTool,
};

type TrainingVisualProps = {
  training: Training;
  className?: string;
  compact?: boolean;
};

export function TrainingVisual({
  training,
  className,
  compact = false,
}: TrainingVisualProps) {
  const Icon = TRAINING_ICONS[training.visual];

  return (
    <div
      className={cn(
        "relative isolate overflow-hidden text-kickops-gray",
        compact ? "min-h-52" : "min-h-[22rem] md:min-h-[30rem]",
        className,
      )}
      style={{ backgroundColor: training.accent }}
      aria-hidden="true"
    >
      <div
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage:
            "linear-gradient(to right, #121212 1px, transparent 1px), linear-gradient(to bottom, #121212 1px, transparent 1px)",
          backgroundSize: compact ? "32px 32px" : "48px 48px",
        }}
      />
      <div className="absolute -right-[14%] -bottom-[28%] aspect-square w-[72%] rounded-full border border-kickops-gray/40" />
      <div className="absolute -right-[3%] -bottom-[17%] aspect-square w-[50%] rounded-full border border-kickops-gray/40" />
      <span className="absolute top-5 left-5 font-dm-mono text-[10px] tracking-[0.18em] uppercase md:top-7 md:left-7">
        K/A — {training.number}
      </span>
      <Icon
        strokeWidth={1.15}
        className={cn(
          "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2",
          compact ? "size-20 md:size-24" : "size-32 md:size-44",
        )}
      />
      <span className="absolute right-5 bottom-5 font-dm-mono text-[9px] tracking-[0.16em] uppercase md:right-7 md:bottom-7">
        {training.category}
      </span>
    </div>
  );
}
