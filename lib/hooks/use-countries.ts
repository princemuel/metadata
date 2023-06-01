import all from "world-countries";

const countries = all.map((country) => ({
  code: country.cca2,
  name: country.name.common,
  flag: country.flag,
  latlng: country.latlng,
  region: country.region,
}));

const useCountries = (): UseCountryReturn => {
  const fetchAll = () => countries;
  const fetchByCode = (code: string) => {
    return countries.find((country) => country.code === code);
  };
  return [fetchAll, fetchByCode];
};

type UseCountryReturn = [
  () => ICountry[],
  (code: string) => ICountry | undefined
];

export { useCountries };
