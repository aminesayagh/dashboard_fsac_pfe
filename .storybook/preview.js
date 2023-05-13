import '../styles/globals.scss';
import * as NextImage from 'next/image';

const OriginalNextImage = NextImage.default;

Object.defineProperty(NextImage, 'default', {
  configurable: true,
  value: (props) => <OriginalNextImage {...props} unoptimized />,
});

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  previewTabs: {
    'storybook/docs/panel': { index: -1 },
  },
};

// const { configure } = require('@storybook/react');
// configure(require.context('../components', true, /\.stories\.tsx$/), module);

// .storybook/preview.js
import React, { Suspense } from "react";
import { I18nextProvider } from "react-i18next";
import i18n from '../utils/i18n';

const withI18next = (Story) => {
  return (
    <Suspense fallback={<div>Loading translation...</div>}>
      <I18nextProvider i18n={i18n}>
        <Story />
      </I18nextProvider>
    </Suspense>
  )
}

export const decorators = [withI18next]

// Create a global variable called locale in storybook
// and add a menu in the toolbar to change your locale
export const globalTypes = {
  locale: {
    name: 'Locale',
    description: 'Internationalization locale',
    toolbar: {
      icon: 'globe',
      items: [
        { value: 'fr', title: 'French' },
      ],
      showName: true,
    },
  }
};

