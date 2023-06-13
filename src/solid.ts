import { shallowRef, triggerRef } from '@vue/reactivity'

export type SignalGetter<T> = () => T
export type SignalSetter<T> = (v: T | ((v: T) => T)) => void

export type Signal<T = any> = [
  SignalGetter<T>,
  SignalSetter<T>,
]

export function createSignal<T = any>(
  value: T,
  { equals }: { equals?: false | ((prev: T, next: T) => boolean) } = {},
): Signal<T> {
  const ref = shallowRef(value)

  const get: SignalGetter<T> = () => ref.value

  const set: SignalSetter<T> = (v) => {
    const oldValue = ref.value
    ref.value = typeof v === 'function' ? (v as any)(ref.value) : v

    if (equals === false || (equals && !equals(oldValue, ref.value)))
      triggerRef(ref)
  }

  return [get, set]
}
