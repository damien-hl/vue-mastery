<template>
  <label :for="uuid">{{ label }}</label>
  <input
    :id="uuid"
    v-bind="$attrs"
    :placeholder="label"
    :value="modelValue"
    @input="$emit('update:modelValue', $event.target.value)"
    class="field"
    :aria-describedby="error ? `${uuid}-error` : null"
    :aria-invalid="error ? true : null"
  />
  <p
    v-if="error"
    :id="`${uuid}-error`"
    class="errorMessage"
    aria-live="assertive"
  >
    {{ error }}
  </p>
</template>

<script>
import UniqueID from "@/features/UniqueID.js";

export default {
  props: {
    label: {
      type: String,
      default: "",
    },
    modelValue: {
      type: [String, Number],
      default: "",
    },
    error: {
      type: String,
      default: "",
    },
  },
  setup() {
    const uuid = UniqueID().getID();

    return { uuid };
  },
};
</script>
