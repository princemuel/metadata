import { IconType } from "react-icons";

interface Props {
  icon: IconType;
  label: string;
  description: string;
}

const ListingCategory = ({ icon: Icon, label, description }: Props) => {
  return (
    <blockquote className="flex flex-col gap-6">
      <div className="flex items-center gap-4">
        <Icon size={40} className="text-neutral-600" />

        <div className="flex flex-col">
          <h4 className="text-lg font-semibold">{label}</h4>
          <p className="font-light text-neutral-500">{description}</p>
        </div>
      </div>
    </blockquote>
  );
};

export { ListingCategory };
