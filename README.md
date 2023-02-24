# 📶 vue-signals

[![NPM version](https://img.shields.io/npm/v/vue-signals?color=a1b858&label=)](https://www.npmjs.com/package/vue-signals)

This package is a thin wrapper around Vue's [`shallowRef()`](https://vuejs.org/api/reactivity-advanced.html#shallowref) function that exposes the same API as:

- Solid's [`createSignal()`](https://www.solidjs.com/docs/latest#createsignal):
- Angular's proposed [`signal()` and `computed()`](https://github.com/angular/angular/discussions/49090):

Technically speaking, Vue refs are already reactive signals. That's why it's easy to replicate the specific API design choices of other frameworks. For more details on the distinction between signals and refs, [see the Vue docs on their connection](https://vuejs.org/guide/extras/reactivity-in-depth.html#connection-to-signals).

## Installation

To install the package, run:

```sh
pnpm install vue-signals # or npm or yarn
```

### Usage

### Solid

Import the `createSignal()` function from `vue-signals/solid`:

```vue
<script lang="ts" setup>
import { createSignal } from 'vue-signals/solid'

const [count, setCount] = createSignal(0)
</script>

<template>
  <h1>{{ count() }}</h1>
  <button @click="setCount((v) => v + 1)">
    increment
  </button>
</template>
```

### Angular

Import the `signal()` and `computed()` functions from `vue-signals/angular`:

```vue
<script lang="ts" setup>
import { computed, signal } from 'vue-signals/angular'

const count = signal(0)
const double = computed(() => count() * 2)
</script>

<template>
  <h1>Count is: {{ count() }}</h1>
  <h1>Double is: {{ double() }}</h1>
  <button @click="count.update(v => v + 1)">
    increment
  </button>
  <button @click="count.set(0)">
    reset
  </button>
</template>
```

## API

### Solid-Style `createSignal<T>`

```ts
type SignalGetter<T> = () => T
type SignalSetter<T> = (v: T | ((v: T) => T)) => void

type Signal<T = any> = [
  SignalGetter<T>,
  SignalSetter<T>
]

declare function createSignal<T = any>(
  value: T,
  { equals }?: { equals?: false | ((prev: T, next: T) => boolean) }
): Signal<T>
```

### Angular-Style `signal<T>`

```ts
type Signal<T = any> = () => T & {
  set: (value: T) => void
  update: (updater: (value: T) => T) => void
  mutate: (mutator: (value: T) => void) => void
}

declare function signal<T = any>(initialValue: T): Signal
declare function computed<T>(getter: (...args: any[]) => T): () => T
```

## FAQ

### Why, Though?

Some users may prefer more explicit control over their reactive state (read/write access). For example no other code could trigger changes unless they have access to the setter.

Users new to Vue.js may be confused by the `ref()` API. It's not immediately obvious that `ref()` returns a reactive and mutable object. This is especially true for users coming from React, where `useState()` returns a tuple of `[value, setter]`.

## Credits

- Evan You for his inspirational Solid signal implementations, first appearing [in a Tweet](https://twitter.com/youyuxi/status/1618181618069573633) and later his [Angular implementation](https://twitter.com/youyuxi/status/1628214809631293440).

## License

[MIT](./LICENSE) License © 2023 [Johann Schopplich](https://github.com/johannschopplich)

[MIT](./LICENSE) License © 2023 [Evan You](https://github.com/yyx990803)
