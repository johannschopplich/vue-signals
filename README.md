# 📶 vue-signals

[![NPM version](https://img.shields.io/npm/v/vue-signals?color=a1b858&label=)](https://www.npmjs.com/package/vue-signals)

This package is a thin wrapper around Vue's [`ref()`](https://vuejs.org/api/reactivity-core.html#ref) function that exposes the same API as SolidJS's [`createSignal()`](https://www.solidjs.com/docs/latest#createsignal):

```vue
<script lang="ts" setup>
import { createSignal } from 'vue-signals'

const [count, setCount] = createSignal(0)
</script>

<template>
  <h1>{{ count() }}</h1>
  <button @click="setCount((v) => v + 1)">
    increment
  </button>
</template>
```

Technically speaking, Vue.js [`ref()`](https://vuejs.org/api/reactivity-core.html#ref)'s are already reactive signals. That's why it's easy to replicate the specific API design choices made in SolidJS.

## API

### `createSignal<T>`

```ts
type SignalGetter<T> = () => T
type SignalSetter<T> = (v: T | ((v: T) => T)) => void

type Signal<T = any> = [
  SignalGetter<T>,
  SignalSetter<T>,
]

declare function createSignal<T = any>(
  value: T,
  { equals }?: {
    equals?: boolean | undefined
  }
): Signal<T>
```

## FAQ

### Why, Though?

Some users may prefer more explicit control over their reactive state (read/write access). For example no other code could trigger changes unless they have access to the setter.

Users new to Vue.js may be confused by the `ref()` API. It's not immediately obvious that `ref()` returns a reactive and mutable object. This is especially true for users coming from React, where `useState()` returns a tuple of `[value, setter]`.

## Credits

- Evan You for his [Tweet](https://twitter.com/youyuxi/status/1618181618069573633).

## License

[MIT](./LICENSE) License © 2023 [Johann Schopplich](https://github.com/johannschopplich)

[MIT](./LICENSE) License © 2023 [Evan You](https://github.com/yyx990803)
