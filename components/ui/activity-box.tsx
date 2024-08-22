import { DensityRules } from "@/components/hooks/use-density-rules";
import Tippy from "@tippyjs/react";
import clsx from "clsx";
import { FC, PropsWithChildren } from "react";

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
    <Tippy content={children} disabled={!children}>
      <div
        className={clsx(
          "h-4 rounded transition-transform w-4",
          bgByDensity[density],
          /* In the ChartFooter component we don't pass any children, that's why we conditionally apply these classes. */
          children && "hover:cursor-pointer hover:scale-125"
        )}
      />
    </Tippy>
  );
};
