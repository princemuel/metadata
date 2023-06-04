'use client';

import { useCountries } from '@/lib';
import Select from 'react-select';

interface Props {
  value: RentFormData['location'];
  onChange: (value?: ICountry | null) => void;
}

const CountryMenu = ({ value, onChange }: Props) => {
  const [fetchAll] = useCountries();

  return (
    <div>
      <Select
        placeholder='Anywhere'
        isClearable
        options={fetchAll()}
        value={value}
        onChange={(value) => onChange(value)}
        formatOptionLabel={(option) => (
          <div className='flex items-center gap-3'>
            <div>{option.flag}</div>
            <p>
              <span>{option.name}</span>,{' '}
              <span className='ml-1 text-neutral-500'>{option.region}</span>
            </p>
          </div>
        )}
        classNames={{
          control: () => 'p-3 border-2',
          input: () => 'text-lg',
          option: () => 'text-lg',
        }}
        theme={(theme) => ({
          ...theme,
          borderRadius: 6,
          colors: {
            ...theme.colors,
            primary: 'black',
            primary25: '#ffe4e6',
          },
        })}
      />
    </div>
  );
};

export { CountryMenu };
