# Vue 3 - Composition API

Il est intéressant d'utiliser la Composition API lorsque :
- on souhaite profiter de manière optimale de TypeScript
- un composant comporte beaucoup trop de logique et doit être réorganiser par fonctionnalité
- on souhaite réutiliser du code dans d'autres composants
- on préfère utiliser une syntaxe alternative à celle par défaut de Vue

## Setup

Pour utiliser la Composition API, il faut commencer par la méthode setup :
```vue
<script>
export default {
  setup() {}
};
</script>
```
## Réactivité

Ajouter des propriétés réactives :
```vue
<template>
  <div>Capacity: {{ capacity }}</div>
</template>

<script>
import { ref } from "vue";

export default {
  setup(props, context) {
    const capacity = ref(3);

    return { capacity };
  }
};
</script>
```

## Méthodes

Pour ajouter des méthodes :
```vue
<template>
  <div>Capacity: {{ capacity }}</div>
    <button @click="increaseCapacity()">Increase Capacity</button>
</template>
<script>
import { ref  } from "vue";

export default {
  setup(props, context) {
    const capacity = ref(3);

    function increaseCapacity() { 
      capacity.value++;
    }

    return { capacity, increaseCapacity  };
  }
};
</script>
```

## Computed

Pour ajouter des propriétés computed :
```vue
<template>
  <div>
    <p>Spaces Left: {{ spacesLeft }} out of {{ capacity }}</p>
    <ul>
      <li v-for="(name, index) in attending" :key="index">
        {{ name }}
      </li>
    </ul>
    <button @click="increaseCapacity()">Increase Capacity</button>
  </div>
</template>

<script>
import { ref, computed  } from "vue";

export default {
  setup(props, context) {
    const capacity = ref(3);
    const attending = ref(["Tim", "Bob", "Joe"]);

    const spacesLeft = computed(() => {
      return capacity.value - attending.value.length;
    });

    function increaseCapacity() { 
      capacity.value++;
    }

    return { capacity, attending, spacesLeft, increaseCapacity  };
  }
};
</script>
```

## Alternative à la réactivité

Il est possible d'utiliser un objet pour déclarer les propriétés réactives :
```vue
<template>
  <div>
    <p>Spaces Left: {{ spacesLeft }} out of {{ capacity }}</p>
    <ul>
      <li v-for="(name, index) in attending" :key="index">
        {{ name }}
      </li>
    </ul>
    <button @click="increaseCapacity()">Increase Capacity</button>
  </div>
</template>


<script>
import { reactive, computed, toRefs } from "vue";

export default {
  setup() {
    const event = reactive({
      capacity: 4,
      attending: ["Tim", "Bob", "Joe"],
      spacesLeft: computed(() => {
        return event.capacity - event.attending.length;
      })
    });

    function increaseCapacity() {
      event.capacity++;
    }

    return { ...toRefs(event), increaseCapacity };
  }
};
</script>
```

## Modularité

Pour être réutilisable, il est conseillé d'extraire les blocs de code de la composition API en fonctions, Composition Function : 
```vue
<template>
...
</template>

<script>
import { ref, computed } from "vue";

export default {
  setup() {
    return useEventSpace(); // <--- Notice I've just extracted a function
  }
};

function useEventSpace() {
  const capacity = ref(4);
  const attending = ref(["Tim", "Bob", "Joe"]);

  const spacesLeft = computed(() => {
    return capacity.value - attending.value.length;
  });

  function increaseCapacity() {
    capacity.value++;
  }

  return { capacity, attending, spacesLeft, increaseCapacity };
}
</script>
```

Et une bonne pratiques consiste à extraire ces Composition Function dans un fichier :
```vue
<template>
...
</template>

<script>
import useEventSpace from "@/use/event-space";
import useMapping from "@/use/mapping";

export default {
  setup() {
    const { capacity, attending, spacesLeft, increaseCapacity } = useEventSpace();
    const { map, embedId } = useMapping();

    return { capacity, attending, spacesLeft, increaseCapacity, map, embedId };
  }
};
</script>
```

## Hooks du cycle de vie d'un composant

Il est possible d'utiliser les hooks dans la composition API :
```vue
import {
  onBeforeMount,
  onMounted,
  onBeforeUpdate,
  onUpdated,
  onBeforeUnmount,
  onUnmounted,
  onActivated,
  onDeactivated,
  onErrorCaptured
} from "vue";

export default {
  setup() {
    onBeforeMount(() => {
      console.log("Before Mount!");
    });
    onMounted(() => {
      console.log("Mounted!");
    });
    onBeforeUpdate(() => {
      console.log("Before Update!");
    });
    onUpdated(() => {
      console.log("Updated!");
    });
    onBeforeUnmount(() => {
      console.log("Before Unmount!");
    });
    onUnmounted(() => {
      console.log("Unmounted!");
    });
    onActivated(() => {
      console.log("Activated!");
    });
    onDeactivated(() => {
      console.log("Deactivated!");
    });
    onErrorCaptured(() => {
      console.log("Error Captured!");
    });
  }
};
```

## Watch

Pour déclencher un comportement lors du changement de la valeur d'une propriété réactive, on peut utiliser watchEffect : 
```vue
setup() {
  const searchInput = ref("");
  const results = ref(0);

  watchEffect(() => {
    results.value = eventApi.getEventCount(searchInput.value);
  });

  return { searchInput, results };
}
```

Si on souhaite spécifier la source de ce changement, on peut utiliser watch :
```vue
watch(searchInput, (newVal, oldVal) => {
  ...
});
```
```vue
watch([firstName, lastName], ([newFirst, newLast], [oldFirst, oldLast]) => {
  ... 
}, { immediate: true });
```

## Composables

Il est intéressant d'extraire des parties du code en composables, par exemple, pour des appels d'API :
```vue
import { ref } from "@vue/composition-api";

export default function usePromise(fn) {
  const results = ref(null);
  const loading = ref(false);
  const error = ref(null);

  const createPromise = async (...args) => {
    loading.value = true;
    error.value = null;
    results.value = null;
    try {
      results.value = await fn(...args);
    } catch (err) {
      error.value = err;
    } finally {
      loading.value = false;
    }
  };

  return { results, loading, error, createPromise };
}
```

```vue
<template>
  <div>
    Search for <input v-model="searchInput" /> 
    <div>
      <p>Loading: {{ getEvents.loading }}</p>
      <p>Error: {{ getEvents.error }}</p>
      <p>Number of events: {{ getEvents.results }}</p>
    </div>
  </div>
</template>

<script>
import { ref, watch } from "@vue/composition-api";
import eventApi from "@/api/event.js";
import usePromise from "@/composables/use-promise";

export default {
  setup() {
    const searchInput = ref("");
    const getEvents = usePromise(search =>
      eventApi.getEventCount(search.value)
    );

    watch(searchInput, () => {
      if (searchInput.value !== "") {
        getEvents.createPromise(searchInput);
      } else {
        getEvents.results.value = null;
      }
    });

    return { searchInput, getEvents };
  }
};
</script>
```

## Suspense

Le composant Suspense permet d'indiquer que l'on attend des données asynchrones :

```vue
<template>
  <div v-if="error">Uh oh .. {{ error }}</div>
  <Suspense v-else>
    <template #default>
      <Event />
    </template>
    <template #fallback>
      Loading...
    </template>
  </Suspense>
</template>

<script>
import Event from "@/components/Event.vue";
import { ref, onErrorCaptured } from "vue";

export default {
  components: { Event },
  setup() {
    const error = ref(null);

    onErrorCaptured((e) => {
      error.value = e;
      return true;
    });

    return { error };
  },
};
</script>
```

## Teleport

Pour afficher un composant en dehors de l'élément où est rendu l'application Vue, il est possible d'utiliser le composant Teleport :
```html
<body>
  <div id="app"></div>
  <div id="end-of-body"></div>
</body>
```

```vue
<template>
  <teleport to="#end-of-body" :disabled="!showText" v-if="showText">
    This should be at the end.
  </teleport>
  <teleport to="#end-of-body" :disabled="!showText2" v-if="showText2">
    This should be at the end too.
  </teleport>
  <div>
    This should be at the top.
  </div>
  <button @click="showText = !showText">
      Toggle showText
  </button>
  <button @click="showText2 = !showText2">
      Toggle showText2
  </button>
</template>

<script>
export default {
  data() {
    return {
      showText: false,
      showText2: false
    };
  }
};
</script>
```