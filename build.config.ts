import { defineBuildConfig } from 'unbuild'

export default defineBuildConfig({
  entries: [
    'src/index',
    'src/solid',
    'src/angular',
  ],
  declaration: true,
  clean: true,
})
