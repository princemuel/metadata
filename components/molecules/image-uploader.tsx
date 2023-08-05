'use client';

import { CldUploadWidget } from 'next-cloudinary';
import Image from 'next/image';
import { useCallback } from 'react';
import { TbPhotoPlus } from 'react-icons/tb';

const uploadPreset = 'dkhchog8';

interface Props {
  value: string;
  update: (value: string) => void;
}

const ImageUploader = ({ update, value }: Props) => {
  const handleUpload = useCallback(
    (result: { info: { secure_url: string } }) => {
      update(result.info.secure_url);
    },
    [update]
  );

  return (
    <CldUploadWidget
      onUpload={handleUpload}
      uploadPreset={uploadPreset}
      options={{
        maxFiles: 1,
      }}
    >
      {({ open }) => {
        return (
          <button
            type='button'
            onClick={() => open?.()}
            className='relative flex flex-col items-center justify-center gap-4 border-2 border-dashed border-neutral-300 p-20 text-neutral-600 transition hover:opacity-70'
          >
            <TbPhotoPlus size={50} />
            <span className='text-lg font-semibold'>Click to upload</span>
            {value && (
              <figure className='absolute inset-0 h-full w-full'>
                <Image
                  fill
                  style={{ objectFit: 'cover' }}
                  src={value}
                  alt='House'
                />
              </figure>
            )}
          </button>
        );
      }}
    </CldUploadWidget>
  );
};

export { ImageUploader };
