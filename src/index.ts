import { shallowRef, triggerRef } from 'vue'

type SignalGetter<T> = () => T
type SignalSetter<T> = (v: T | ((v: T) => T)) => void

type Signal<T = any> = [
  SignalGetter<T>,
  SignalSetter<T>,
]

export function createSignal<T = any>(
  value: T,
  { equals }: { equals?: false | ((prev: T, next: T) => boolean) } = {},
): Signal<T> {
  const r = shallowRef(value)

  const get: SignalGetter<T> = () => r.value

  const set: SignalSetter<T> = (v) => {
    const oldValue = r.value
    r.value = typeof v === 'function' ? (v as any)(r.value) : v

    if (equals === false || (equals && !equals(oldValue, r.value)))
      triggerRef(r)
  }

  return [get, set]
}
