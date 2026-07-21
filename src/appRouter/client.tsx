'use client'

import React, { useState, useEffect, useCallback } from 'react'
import { createInstance } from 'i18next'
import type { i18n as I18NextClient, Resource, FlatNamespace, KeyPrefix, Module } from 'i18next'
import {
  I18nextProvider,
  useTranslation,
  type UseTranslationOptions,
  type UseTranslationResponse,
  type FallbackNs,
} from 'react-i18next'
import { initReactI18next } from 'react-i18next/initReactI18next'
import resourcesToBackend from 'i18next-resources-to-backend'
import { useParams, useRouter } from 'next/navigation'

type $Tuple<T> = readonly [T?, ...T[]]

// ---------------------------------------------------------------------------
// I18nProvider
// ---------------------------------------------------------------------------

export interface I18nProviderProps {
  children: React.ReactNode
  /** Current language (detected on the server, passed from layout) */
  language: string
  /** Server-loaded resources to hydrate the client instance */
  resources?: Resource
  /** All supported languages */
  supportedLngs?: string[]
  /** Default namespace */
  defaultNS?: string
  /** Fallback language */
  fallbackLng?: string | string[] | Record<string, string[]>
  /** Path to locale files (for lazy-loading additional namespaces on the client) */
  localePath?: string
  /** Locale file structure pattern */
  localeStructure?: string
  /** Locale file extension */
  localeExtension?: string
  /** Extra i18next plugins (e.g., i18next-http-backend, i18next-locize-backend) */
  use?: any[]
  /** Additional i18next init options */
  i18nextOptions?: Record<string, any>
}

/**
 * Client-side i18next provider for App Router.
 * Creates an i18next instance hydrated with server-loaded resources,
 * with fallback dynamic loading for additional namespaces.
 *
 * Supports custom backends via the `use` prop — pass i18next-http-backend,
 * i18next-locize-backend, or i18next-chained-backend to load translations
 * from external sources.
 *
 * @example
 * ```tsx
 * // In app/[lng]/layout.tsx (Server Component)
 * import { I18nProvider } from 'next-i18next/client'
 * import { getT, getResources } from 'next-i18next/server'
 *
 * export default async function Layout({ children, params }) {
 *   const { lng } = await params
 *   const { i18n } = await getT()
 *   const resources = getResources(i18n, ['common'])
 *   return (
 *     <I18nProvider language={lng} resources={resources}>
 *       {children}
 *     </I18nProvider>
 *   )
 * }
 * ```
 */
export function I18nProvider({
  children,
  language,
  resources,
  supportedLngs,
  defaultNS = 'common',
  fallbackLng,
  localePath = '/locales',
  localeStructure = '{{lng}}/{{ns}}',
  localeExtension = 'json',
  use = [],
  i18nextOptions = {},
}: I18nProviderProps) {
    throw new Error("STUB");
}

// ---------------------------------------------------------------------------
// useT — translation hook for Client Components
// ---------------------------------------------------------------------------

/**
 * Translation hook for Client Components in App Router.
 * Works in both locale-in-path and no-locale-path modes:
 * - Locale-in-path: reads language from URL params (`[lng]` or `[locale]`) and syncs
 * - No-locale-path: uses the language set by I18nProvider (from server detection)
 *
 * @example
 * ```tsx
 * 'use client'
 * import { useT } from 'next-i18next/client'
 *
 * export default function Counter() {
 *   const { t } = useT('home')
 *   return <p>{t('greeting')}</p>
 * }
 * ```
 */
export function useT<
  Ns extends FlatNamespace | $Tuple<FlatNamespace> | undefined = undefined,
  KPrefix extends KeyPrefix<FallbackNs<Ns>> = undefined,
>(
  ns?: Ns,
  options?: UseTranslationOptions<KPrefix>,
): UseTranslationResponse<FallbackNs<Ns>, KPrefix> {
    throw new Error("STUB");
}

// ---------------------------------------------------------------------------
// useChangeLanguage — for no-locale-path mode
// ---------------------------------------------------------------------------

/**
 * Hook for changing the language without URL navigation (no-locale-path mode).
 * Updates cookie + i18next instance + triggers server re-render via router.refresh().
 *
 * @example
 * ```tsx
 * 'use client'
 * import { useChangeLanguage } from 'next-i18next/client'
 *
 * export default function LanguageSwitcher() {
 *   const changeLanguage = useChangeLanguage()
 *   return <button onClick={() => changeLanguage('de')}>Deutsch</button>
 * }
 * ```
 */
export function useChangeLanguage(cookieName = 'i18next') {
    throw new Error("STUB");
}

// Re-export useful react-i18next utilities for convenience
export { Trans } from 'react-i18next'
