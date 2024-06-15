declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{WAData}, {}, any>
  export default component
}
