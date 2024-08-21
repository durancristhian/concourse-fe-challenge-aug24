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
      className={clsx(
        "h-4 hover:cursor-pointer hover:scale-125 rounded transition-transform w-4",
        bgByDensity[density]
      )}
      /* This is not great but ok for now until I create a tooltip component. */
      title={children?.toString()}
    />
  );
};
