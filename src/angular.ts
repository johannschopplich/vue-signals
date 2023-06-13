import { computed as _computed, shallowRef, triggerRef } from '@vue/reactivity'

export interface Signal<T = any> {
  (): T
  set: (value: T) => void
  update: (updater: (value: T) => T) => void
  mutate: (mutator: (value: T) => void) => void
}

export function signal<T = any>(initialValue: T) {
  const ref = shallowRef(initialValue)
  const signal = () => ref.value

  signal.set = (value: T) => {
    ref.value = value
  }

  signal.update = (updater: (value: T) => T) => {
    ref.value = updater(ref.value)
  }

  signal.mutate = (mutator: (value: T) => void) => {
    mutator(ref.value)
    triggerRef(ref)
  }

  return signal as Signal<T>
}

export function computed<T>(getter: (...args: any[]) => T) {
  const c = _computed(getter)
  return () => c.value
}
