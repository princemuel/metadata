"use client";

import { ABClient, useRentModal } from "@/lib";
import { useRouter } from "next/navigation";
import * as React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { Heading } from "../atoms";
import { CategoryInput, CountryMenu, Map, Modal } from "../molecules";
import { categories } from "./categories";

enum STEPS {
  CATEGORY,
  LOCATION,
  INFO,
  IMAGES,
  DESCRIPTION,
  PRICE,
}

const RentalForm = () => {
  const router = useRouter();
  const rentModal = useRentModal();

  const [step, setStep] = React.useState(STEPS.CATEGORY);
  const [isLoading, setIsLoading] = React.useState(false);

  const handleBack = () => {
    setStep((value) => value - 1);
  };

  const handleNext = () => {
    setStep((value) => value + 1);
  };

  const actionLabel = React.useMemo(() => {
    if (step === STEPS.PRICE) return "Create";
    return "Next";
  }, [step]);

  const secondaryActionLabel = React.useMemo(() => {
    if (step === STEPS.CATEGORY) return undefined;
    return "Back";
  }, [step]);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
    reset,
  } = useForm<RentFormData>({
    defaultValues: {
      bathrooms: 1,
      category: "",
      description: "",
      guests: 1,
      image: "",
      location: undefined,
      price: 1,
      rooms: 1,
      title: "",
    },
  });

  // useEffect(() => {
  //   const subscription = watch((value, { name, type }) => {
  //     if (process.env.NODE_ENV === "development") {
  //       console.log({ value, name, type });
  //     }
  //   });

  //   return () => {
  //     subscription.unsubscribe();
  //   };
  // }, [watch]);

  const bathrooms = watch("bathrooms");
  const category = watch("category");
  const guests = watch("guests");
  const image = watch("image");
  const location = watch("location");
  const rooms = watch("rooms");

  // const Map = useMemo(() => {
  //   return dynamic(() => import("../molecules/map"), { ssr: false });
  // }, [location]);

  const setCustomValue = (
    id: keyof RentFormData,
    value: string | number | ICountry
  ) => {
    setValue(id, value, {
      shouldDirty: true,
      shouldTouch: true,
      shouldValidate: true,
    });
  };

  const onSubmit: SubmitHandler<RentFormData> = (data) => {
    if (step !== STEPS.PRICE) return handleNext();
    setIsLoading(true);

    ABClient.post("/listings", data)
      .then(() => {
        toast.success("Listing created!");
        router.refresh();
        reset();
        setStep(STEPS.CATEGORY);
        rentModal.onClose();
      })
      .catch(() => {
        toast.error("Something went wrong.");
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  let body = (
    <div className="flex flex-col gap-8">
      <Heading
        title="Which of these best describes your place?"
        subtitle="Pick a category"
      />
      <div className="grid max-h-[50vh] grid-cols-1 gap-3 overflow-y-auto md:grid-cols-2">
        {categories.map((item) => (
          <div key={item.label} className="col-span-1">
            <CategoryInput
              onClick={(category) => setCustomValue("category", category)}
              selected={category === item.label}
              label={item.label}
              icon={item.icon}
            />
          </div>
        ))}
      </div>
    </div>
  );

  if (step === STEPS.LOCATION) {
    body = (
      <div className="flex flex-col gap-8">
        <Heading
          title="Where is your place located?"
          subtitle="Help guests find you!"
        />
        <CountryMenu
          value={location}
          //@ts-expect-error null/undefined issue with the value type
          onChange={(value) => setCustomValue("location", value)}
        />

        <Map
          width="800"
          height="400"
          center={location?.latlng || [51, -0.09]}
          zoom={location?.latlng ? 4 : 2}
          scrollWheelZoom={false}
          location={location}
        >
          {({ TileLayer, Marker }) => (
            <React.Fragment>
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution={
                  '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                }
              />
              {location?.latlng && <Marker position={location?.latlng} />}
            </React.Fragment>
          )}
        </Map>
      </div>
    );
  }

  // if (step === STEPS.INFO) {
  //   body = (
  //     <div className="flex flex-col gap-8">
  //       <Heading
  //         title="Share some basics about your place"
  //         subtitle="What amenities do you have?"
  //       />
  //       <Counter
  //         onChange={(value) => setCustomValue("guests", value)}
  //         value={guests}
  //         title="Guests"
  //         subtitle="How many guests would you allow?"
  //       />
  //       <hr />
  //       <Counter
  //         onChange={(value) => setCustomValue("rooms", value)}
  //         value={rooms}
  //         title="Rooms"
  //         subtitle="How many rooms do you have?"
  //       />
  //       <hr />
  //       <Counter
  //         onChange={(value) => setCustomValue("bathrooms", value)}
  //         value={bathrooms}
  //         title="Bathrooms"
  //         subtitle="How many bathrooms do you have?"
  //       />
  //     </div>
  //   );
  // }

  // if (step === STEPS.IMAGES) {
  //   body = (
  //     <div className="flex flex-col gap-8">
  //       <Heading
  //         title="Add a photo of your place"
  //         subtitle="Show guests what your place looks like!"
  //       />
  //       <ImageUpload
  //         onChange={(value) => setCustomValue("image", value)}
  //         value={image}
  //       />
  //     </div>
  //   );
  // }

  // if (step === STEPS.DESCRIPTION) {
  //   body = (
  //     <div className="flex flex-col gap-8">
  //       <Heading
  //         title="How would you describe your place?"
  //         subtitle="Short and sweet works best!"
  //       />
  //       <Input
  //         id="title"
  //         label="Title"
  //         disabled={isLoading}
  //         register={register}
  //         errors={errors}
  //         required
  //       />
  //       <hr />
  //       <Input
  //         id="description"
  //         label="Description"
  //         disabled={isLoading}
  //         register={register}
  //         errors={errors}
  //         required
  //       />
  //     </div>
  //   );
  // }

  // if (step === STEPS.PRICE) {
  //   body = (
  //     <div className="flex flex-col gap-8">
  //       <Heading
  //         title="Now, set your price"
  //         subtitle="How much do you charge per night?"
  //       />
  //       <Input
  //         id="price"
  //         label="Price"
  //         formatPrice
  //         type="number"
  //         disabled={isLoading}
  //         register={register}
  //         errors={errors}
  //         required
  //       />
  //     </div>
  //   );
  // }

  return (
    <Modal
      disabled={isLoading}
      isOpen={rentModal.show}
      title="Airbnb your home!"
      actionLabel={actionLabel}
      onSubmit={handleSubmit(onSubmit)}
      secondaryActionLabel={secondaryActionLabel}
      secondaryAction={step === STEPS.CATEGORY ? undefined : handleBack}
      onClose={rentModal.onClose}
      body={body}
    />
  );
};

export { RentalForm };
