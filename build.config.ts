import { defineBuildConfig } from 'unbuild'

export default defineBuildConfig({
  entries: [
    'src/index',
    'src/solid',
    'src/angular',
  ],
  externals: ['@vue/reactivity'],
  declaration: true,
  clean: true,
})
