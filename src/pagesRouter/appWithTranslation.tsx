import React, { useMemo, useRef } from 'react'
import hoistNonReactStatics from 'hoist-non-react-statics'
import { I18nextProvider } from 'react-i18next'
import type { AppProps as NextJsAppProps } from 'next/app'

import { createConfig } from './config/createConfig'
import createClient from './createClient/browser'

import { SSRConfig, UserConfig } from './types'

import { i18n as I18NextClient, Resource } from 'i18next'
import { useIsomorphicLayoutEffect } from './utils'
export {
  Trans,
  useTranslation,
  withTranslation,
} from 'react-i18next'

export let globalI18n: I18NextClient | null = null

const addResourcesToI18next = (instance: I18NextClient, resources: Resource) => {
  if (resources && instance.isInitialized) {
    for (const locale of Object.keys(resources)) {
      for (const ns of Object.keys(resources[locale])) {
        if (!instance?.store?.data || !instance.store.data[locale] || !instance.store.data[locale][ns]) {
          instance.addResourceBundle(
            locale,
            ns,
            resources[locale][ns],
            true,
            true
          )
        }
      }
    }
  }
}

export const appWithTranslation = <Props extends NextJsAppProps>(
  WrappedComponent: React.ComponentType<Props>,
  configOverride: UserConfig | null = null
) => {
  const AppWithTranslation = (
    props: Props & { pageProps: Props['pageProps'] & SSRConfig }
  ) => {
      throw new Error("STUB");
  }

  return hoistNonReactStatics(AppWithTranslation, WrappedComponent)
}
