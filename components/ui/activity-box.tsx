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
    <div className="group">
      <div
        className={clsx(
          "h-4 rounded transition-transform w-4",
          bgByDensity[density],
          children && "hover:cursor-pointer hover:scale-125"
        )}
        data-tooltip-target="tooltip"
      />
      {children ? (
        <div
          data-tooltip="tooltip"
          className="absolute bg-gray-800 group-hover:visible invisible ml-4 -mt-2 px-2 py-1 rounded text-gray-200 text-sm z-10"
        >
          {children}
        </div>
      ) : null}
    </div>
  );
};
