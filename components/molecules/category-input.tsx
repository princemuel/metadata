"use client";

import { cx } from "cva";
import { IconType } from "react-icons";

interface Props {
  icon: IconType;
  label: string;
  selected?: boolean;
  onClick: (value: string) => void;
}

export const CategoryInput = ({
  icon: Icon,
  label,
  selected,
  onClick,
}: Props) => {
  return (
    <button
      type="button"
      onClick={() => onClick(label)}
      className={cx(
        "flex w-full cursor-pointer flex-col gap-3 rounded-xl border-2 p-4 transition hover:border-black",
        selected ? "border-black" : "border-neutral-200"
      )}
    >
      <Icon size={30} />
      <span className="self-start font-semibold">{label}</span>
    </button>
  );
};
