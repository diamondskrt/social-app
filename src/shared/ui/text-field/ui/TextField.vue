<script setup lang="ts">
import { InputGroup, InputGroupAddon, InputGroupInput } from '~/shared/ui'
</script>

<template>
  <InputGroup>
    <InputGroupInput v-bind="$attrs" />
    <InputGroupAddon v-if="$slots.prependIcon">
      <slot name="prependIcon" />
    </InputGroupAddon>
    <InputGroupAddon v-if="$slots.appendIcon" align="inline-end">
      <slot name="appendIcon" />
    </InputGroupAddon>
  </InputGroup>
</template>
