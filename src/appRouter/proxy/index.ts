import { NextRequest, NextResponse } from 'next/server'
import type { I18nConfig } from '../types'
import { normalizeConfig } from '../config'
import { parseAcceptLanguage, matchLanguage, findSupportedMatch } from './languageDetector'

// Re-export config utilities for Edge-safe usage (no react-i18next dependency)
export { defineConfig, normalizeConfig } from '../config'
export type { I18nConfig, NormalizedConfig, ResourceLoader } from '../types'

function findLocaleInPath(
  pathname: string,
  supportedLngs: readonly string[],
  nonExplicitSupportedLngs: boolean,
): string | undefined {
  // Extract the first path segment
  const match = pathname.match(/^\/([^/]+)/)
  if (!match) return undefined
  return findSupportedMatch(match[1], supportedLngs, nonExplicitSupportedLngs)
}

export function createProxy(userConfig: I18nConfig) {
  const config = normalizeConfig(userConfig)
  const nonExplicit = config.nonExplicitSupportedLngs
  // Normalize basePath: ensure leading slash, strip trailing slash
  const basePath = config.basePath
    ? ('/' + config.basePath.replace(/^\/+/, '').replace(/\/+$/, ''))
    : undefined

  return function middleware(req: NextRequest): NextResponse {
      throw new Error("STUB");
  }
}

/**
 * Backwards-compatible alias for createProxy.
 * Use `createProxy` for new projects with Next.js 16+ `proxy.ts`.
 */
export const createMiddleware = createProxy
