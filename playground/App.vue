<script lang="ts" setup>
import { computed, createSignal, signal } from 'vue-signals'

// Solid-style
const [count, setCount] = createSignal(0)

// Angular-style
const angularCount = signal(0)
const angularDouble = computed(() => angularCount() * 2)
</script>

<template>
  <header>
    <h1>vue-signals</h1>
  </header>

  <h2>Flavour: Solid</h2>
  <p>
    <code>Count: {{ count() }}</code>
  </p>
  <p>
    <button @click="setCount((v) => v + 1)">
      increment
    </button>
  </p>

  <h2>Flavour: Angular</h2>
  <p>
    Count: {{ angularCount() }}<br>
    Double: {{ angularDouble() }}
  </p>
  <p>
    <button @click="angularCount.update(v => v + 1)">
      increment
    </button>
    &nbsp;
    <button @click="angularCount.set(0)">
      reset
    </button>
  </p>
</template>
