import i18n, { Module } from 'i18next'
import resourcesToBackend from 'i18next-resources-to-backend'
import fs from 'fs'

import {
  InternalConfig,
  CreateClientReturn,
  InitPromise,
  I18n,
} from '../types'

function createFSBackend(config: InternalConfig) {
    throw new Error("STUB");
}

let globalInstance: I18n

export default (config: InternalConfig): CreateClientReturn => {
    throw new Error("STUB");
}
