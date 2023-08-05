'use client';

import {
  DEFAULT_MAP_ATTRIBUTION,
  DEFAULT_MAP_URL,
  categories,
  client,
  getErrorMessage,
  useRentModal,
} from '@/lib';
import { useRouter } from 'next/navigation';
import * as React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { Heading, Input } from '../atoms';
import {
  CategoryInput,
  Counter,
  CountryMenu,
  ImageUploader,
  Map,
  Modal,
} from '../molecules';

const enum STEPS {
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

  // current action label
  const actionLabel = React.useMemo(() => {
    if (step === STEPS.PRICE) return 'Create';
    return 'Next';
  }, [step]);

  // next action label
  const secondaryActionLabel = React.useMemo(() => {
    if (step === STEPS.CATEGORY) return undefined;
    return 'Back';
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
      category: '',
      description: '',
      guests: 1,
      image: '',
      location: undefined,
      price: 1,
      rooms: 1,
      title: '',
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

  const bathrooms = watch('bathrooms');
  const category = watch('category');
  const guests = watch('guests');
  const image = watch('image');
  const location = watch('location');
  const rooms = watch('rooms');

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

    client
      .post('/listings', data)
      .then(() => {
        toast.success('Listing created!');
        router.refresh();
        reset();
        setStep(STEPS.CATEGORY);
        rentModal.close();
      })
      .catch((e) => {
        toast.error(getErrorMessage(e));
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  let body = (
    <article className='flex flex-col gap-8'>
      <Heading
        title='Which of these best describes your place?'
        subtitle='Pick a category'
      />
      <ul className='grid max-h-[50vh] grid-cols-1 gap-3 overflow-y-auto md:grid-cols-2'>
        {categories.map((item) => (
          <li
            key={item.label}
            className='col-span-1'
          >
            <CategoryInput
              onClick={(category) => setCustomValue('category', category)}
              selected={category === item.label}
              label={item.label}
              icon={item.icon}
            />
          </li>
        ))}
      </ul>
    </article>
  );

  if (step === STEPS.LOCATION) {
    body = (
      <article className='flex flex-col gap-8'>
        <Heading
          title='Where is your place located?'
          subtitle='Help guests find you!'
        />
        <CountryMenu
          value={location}
          //@ts-expect-error null/undefined issue with the value type
          onChange={(value) => setCustomValue('location', value)}
        />

        <Map
          width='800'
          height='400'
          center={location?.latlng || [51, -0.09]}
          zoom={location?.latlng ? 4 : 2}
          scrollWheelZoom={false}
          location={location}
        >
          {({ TileLayer, Marker }) => (
            <React.Fragment>
              <TileLayer
                url={DEFAULT_MAP_URL}
                attribution={DEFAULT_MAP_ATTRIBUTION}
              />
              {location?.latlng && <Marker position={location?.latlng} />}
            </React.Fragment>
          )}
        </Map>
      </article>
    );
  }

  if (step === STEPS.INFO) {
    body = (
      <article className='flex flex-col gap-8'>
        <Heading
          title='Share some basics about your place'
          subtitle='What amenities do you have?'
        />
        <Counter
          title='Guests'
          subtitle='How many guests would you allow?'
          value={guests}
          update={(value) => setCustomValue('guests', value)}
        />
        <hr />
        <Counter
          title='Rooms'
          subtitle='How many rooms do you have?'
          value={rooms}
          update={(value) => setCustomValue('rooms', value)}
        />
        <hr />
        <Counter
          title='Bathrooms'
          subtitle='How many bathrooms do you have?'
          value={bathrooms}
          update={(value) => setCustomValue('bathrooms', value)}
        />
      </article>
    );
  }

  if (step === STEPS.IMAGES) {
    body = (
      <article className='flex flex-col gap-8'>
        <Heading
          title='Add a photo of your place'
          subtitle='Show guests what your place looks like!'
        />
        <ImageUploader
          update={(value) => setCustomValue('image', value)}
          value={image}
        />
      </article>
    );
  }

  if (step === STEPS.DESCRIPTION) {
    body = (
      <article className='flex flex-col gap-8'>
        <Heading
          title='How would you describe your place?'
          subtitle='Short and sweet works best!'
        />
        <Input
          id='title'
          label='Title'
          disabled={isLoading}
          register={register}
          errors={errors}
          required
        />
        <hr />
        <Input
          id='description'
          label='Description'
          disabled={isLoading}
          register={register}
          errors={errors}
          required
        />
      </article>
    );
  }

  if (step === STEPS.PRICE) {
    body = (
      <article className='flex flex-col gap-8'>
        <Heading
          title='Now, set your price'
          subtitle='How much do you charge per night?'
        />
        <Input
          id='price'
          label='Price'
          formatPrice
          type='number'
          disabled={isLoading}
          register={register}
          errors={errors}
          required
        />
      </article>
    );
  }

  return (
    <Modal
      disabled={isLoading}
      isOpen={rentModal.show}
      title='Airbnb your home!'
      actionLabel={actionLabel}
      onSubmit={handleSubmit(onSubmit)}
      secondaryActionLabel={secondaryActionLabel}
      secondaryAction={step === STEPS.CATEGORY ? undefined : handleBack}
      onClose={rentModal.close}
      body={body}
    />
  );
};

export { RentalForm };
