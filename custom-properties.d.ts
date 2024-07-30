import type { IApi } from '@/types/api/api-types'
import 'vue'

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $api: IApi
  }
}

export {}
