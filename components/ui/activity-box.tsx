import { FC, PropsWithChildren } from "react";
import { DensityRules } from "@/components/hooks/use-density-rules";
import clsx from "clsx";

const bgByDensity: Record<keyof DensityRules, string> = {
  darkest: "bg-emerald-700",
  darker: "bg-emerald-500",
  base: "bg-emerald-400",
  lighter: "bg-emerald-200",
  lightest: "bg-zinc-200",
};

export type ActivityBoxProps = PropsWithChildren<{
  density: keyof DensityRules;
}>;

export const ActivityBox: FC<ActivityBoxProps> = ({ children, density }) => {
  return (
    <div
      className={clsx("h-4 w-4 rounded", bgByDensity[density])}
      /* Note: I think this toString() is fine for now since I don't have a proper Tooltip component. */
      title={children?.toString()}
    />
  );
};
