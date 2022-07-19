import enLang from './entries/en-US';
import arLang from './entries/ar_SA';
import { addLocaleData } from 'react-intl';

const AppLocale = {
  en: enLang,
  ar: arLang,
};
addLocaleData(AppLocale.en.data);
addLocaleData(AppLocale.ar.data);

export default AppLocale;
