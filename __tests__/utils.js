import expectedSteps from '../__fixtures__/expectedSteps.js';
import emptySteps from '../__fixtures__/emptySteps.js';
import unsupportedSteps from '../__fixtures__/unsupportedStepsFormat.js';
import { WidgetPage } from './pages/widgetPage.js';
import { RegistrationForm } from './pages/registrationFormPage.js';

const registrationData = {
  email: 'email@gmail.com',
  password: 'secretPassword',
  address: 'New street, 1',
  city: 'London',
  country: 'Аргентина',
  confirmationCheckBox: 'true',
  getRegistrationData() {
    const {
      email,
      password,
      address,
      city,
      country,
      confirmationCheckBox,
    } = this;
    return {
      email,
      password,
      address,
      city,
      country,
      confirmationCheckBox,
    };
  },
};

const setUp = (screen) => ({
  widget: new WidgetPage(screen),
  form: new RegistrationForm(screen),
  steps: {
    expectedSteps,
    emptySteps,
    unsupportedSteps,
  },
  registrationData: registrationData.getRegistrationData(),
});

export default setUp;
