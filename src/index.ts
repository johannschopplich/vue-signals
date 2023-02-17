import { shallowRef, triggerRef } from 'vue'

type SignalGetter<T> = () => T
type SignalSetter<T> = (v: T | ((v: T) => T)) => void

type Signal<T = any> = [
  SignalGetter<T>,
  SignalSetter<T>,
]

export function createSignal<T = any>(
  value: T,
  { equals = true } = {},
): Signal<T> {
  const r = shallowRef(value)

  const get = () => r.value

  const set = (v: T | ((v: T) => T)) => {
    r.value = typeof v === 'function' ? (v as any)(r.value) : v

    if (equals === false)
      triggerRef(r)
  }

  return [get, set]
}
