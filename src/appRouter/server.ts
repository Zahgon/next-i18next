import { createInstance } from 'i18next'
import type { i18n as I18NextClient, Resource, Module, FlatNamespace, KeyPrefix } from 'i18next'
import resourcesToBackend from 'i18next-resources-to-backend'
import { cache } from 'react'
import { headers, cookies } from 'next/headers'

import type { I18nConfig, NormalizedConfig, GetTResult } from './types'
import { normalizeConfig } from './config'

let _config: NormalizedConfig | null = null

// Module-level singleton: persists across requests within the same server process.
// This is critical for custom backends (i18next-http-backend, i18next-locize-backend)
// to avoid re-fetching translations on every request.
// In serverless environments (Lambda, Cloud Functions, etc.), this lives as long as
// the warm function instance — backends with reloadInterval will refresh automatically.
let _sharedInstance: I18NextClient | null = null
let _sharedInstancePromise: Promise<I18NextClient> | null = null

function getConfig(): NormalizedConfig {
  if (!_config) {
    throw new Error(
      'next-i18next: Server module not initialized. Call initServerI18next(config) in your root layout.'
    )
  }
  return _config
}

/**
 * Initialize the server-side i18next configuration.
 * Call this once in your root layout or a shared setup file.
 */
export function initServerI18next(userConfig: I18nConfig): void {
  _config = normalizeConfig(userConfig)
}

function hasCustomBackend(plugins: any[]): boolean {
  return plugins.some((b: Module) => { throw new Error("STUB"); })
}

function createResourceBackend(config: NormalizedConfig) {
  if (config.resourceLoader) {
    return resourcesToBackend(config.resourceLoader)
  }
  return resourcesToBackend(async (language: string, namespace: string) => {
      throw new Error("STUB");
  })
}

/**
 * Get or create the shared i18next instance.
 * The instance is created once and reused across all requests.
 * All languages are preloaded so that getFixedT(lng) works for any supported language.
 * Additional namespaces are loaded on demand and cached in the instance store.
 */
async function getSharedInstance(config: NormalizedConfig): Promise<I18NextClient> {
  if (_sharedInstance?.isInitialized) return _sharedInstance

  // Deduplicate concurrent init calls (multiple requests arriving while first init is in flight)
  if (_sharedInstancePromise) return _sharedInstancePromise

  _sharedInstancePromise = (async () => {
      throw new Error("STUB");
  })()

  return _sharedInstancePromise
}

// Dev-only hot-reload: refetch resources for the requested language so edits
// to locale files appear without restarting `next dev`. Wrapped in `cache()`
// so multiple `getT` calls within the same render dedupe to a single reload.
// Gated on `NODE_ENV !== 'production'` at the call site so HTTP/locize/chained
// backends are never refetched per-request in prod.
const reloadResourcesForRender = cache(
  async (i18n: I18NextClient, lng: string): Promise<void> => {
        throw new Error("STUB");
    }
)

// Per-request language detection, deduplicated within a single React render
const detectLanguage = cache(async (config: NormalizedConfig): Promise<string> => {
    throw new Error("STUB");
})

/**
 * Get a translation function for use in Server Components, layouts, and generateMetadata.
 *
 * The underlying i18next instance is a **module-level singleton** that persists across
 * requests. This means custom backends (i18next-http-backend, i18next-locize-backend, etc.)
 * only fetch translations once (or according to their own reloadInterval), not on every request.
 *
 * @example
 * ```tsx
 * import { getT } from 'next-i18next/server'
 *
 * export default async function Page() {
 *   const { t, i18n } = await getT('home')
 *   return <h1>{t('heading')}</h1>
 * }
 * ```
 */
export async function getT<
  Ns extends FlatNamespace = FlatNamespace,
  KPrefix extends KeyPrefix<Ns> = undefined,
>(
  ns?: Ns | Ns[],
  options: { keyPrefix?: KPrefix; lng?: string } = {},
): Promise<GetTResult<Ns, KPrefix>> {
  const config = getConfig()

  const lng = options.lng || await detectLanguage(config)
  const i18nInstance = await getSharedInstance(config)

  if (config.reloadOnPrerender && process.env.NODE_ENV !== 'production') {
    await reloadResourcesForRender(i18nInstance, lng)
  }

  // Load additional namespaces on demand if not already loaded
  const nsArray: string[] = ns
    ? (Array.isArray(ns) ? ns as string[] : [ns as string])
    : config.ns
  const missingNs = nsArray.filter(n => { throw new Error("STUB"); })
  if (missingNs.length > 0) {
    await i18nInstance.loadNamespaces(missingNs)
  }

  const resolvedNs = ns
    ? (Array.isArray(ns) ? ns[0] : ns) as string
    : config.defaultNS

  return {
    t: i18nInstance.getFixedT(lng, resolvedNs, options.keyPrefix as string | undefined),
    i18n: i18nInstance,
    lng,
  } as any
}

/**
 * Extract loaded resources from the server i18next instance for passing to I18nProvider.
 *
 * @example
 * ```tsx
 * const { i18n } = await getT()
 * const resources = getResources(i18n, ['common', 'footer'])
 * return <I18nProvider language={i18n.language} resources={resources}>{children}</I18nProvider>
 * ```
 */
export function getResources(
  i18n: I18NextClient,
  namespaces?: string[],
): Resource {
    throw new Error("STUB");
}

/**
 * Helper for generateStaticParams — returns params for all supported languages.
 *
 * @example
 * ```tsx
 * import { generateI18nStaticParams } from 'next-i18next/server'
 *
 * export async function generateStaticParams() {
 *   return generateI18nStaticParams()
 * }
 * ```
 */
export function generateI18nStaticParams(): { lng: string }[] {
    throw new Error("STUB");
}
