# Vue 3 - Component Design Patterns

## Props

### Préferer la définition des props en mode objet plutôt qu'en mode tableau

Mode objet :
```vue
<script>
export default {
  name: 'Movie',
  props: ['length']
}
</script>
```

Mode tableau :
```vue
<script>
export default {
    name: 'Movie',
	props: {
		length: {
			type: Number,
			required: true,
			default: 90
		}
	}
}
</script>
```

### Mettre en place une validation des props

Pour une props contenant l'URL d'une image :
```js
export default {
  props: {
    image: {
      type; String,
      default: '/images/placeholder.png'	
    }
  }
}
```

On créer une validation pour s'assurer que l'image :
- se trouve dans le dossier images
- est de type PNG ou JPG
```js
export default {
  props: {
    image: {
      type; String,
      default: '/images/placeholder.png'	
      validator: propValue => {
         const hasImagesDirectory = propValue.indexOf('/images/') > -1
	 const isPNG = propValue.endsWith('.png')
	 const isJPEG = propValue.endsWith('.jpeg') || propValue.endsWith('.jpg')
	 const hasValidExtension = isPNG || isJPEG

	 return hasImagesDirectory && hasValidExtension
       }
     }
  }
}
```

## Slots

### Contenu par défaut d'un slot

Le contenu par défaut d'un slot se défini ainsi (BaseButton.vue) :
```vue
<template>
  <button class="button">
    <slot>Submit</slot>
  </button>
</template>
```

```js
<BaseButton></BaseButton>
```

Il est alors possible d'écraser ce contenu :
```js
<BaseButton>Cancel</BaseButton>
```

### Slots nommés

Les slots nommés se définissent comme cela (CustomLayout.vue) :
```vue
<template>
  div class="container">
    <header>
      <slot name="header"></slot>
    </header>
    <main>
      <slot></slot>
    </main>
    <footer>
      <slot name="footer"></slot>
    </footer>
  </div>
</template>
```

Ils s'utilisent ainsi :
```vue
<template>
  <CustomLayout>
    <template v-slot:header>
      <p>Header content</p>
    </template>
    <template>
      <p>Main body content</p>
    </template>
    <template v-slot:footer>
      <p>Footer content</p>
    </template>
  </CustomLayout>
</template>
```

Ou avec la version raccourcie :
```vue
<template>
  <CustomLayout>
    <template #header>
      <p>Header content</p>
    </template>
    <template>
      <p>Main body content</p>
    </template>
    <template #footer>
      <p>Footer content</p>
    </template>
  </CustomLayout>
</template>
```

Il est possible d'avoir des noms de slots dynamiques :
```vue
<template>
  <BlogLayout>
    <template 
      v-for="section in layout" 
      v-slot:[section.name]
      :key="`blog-section-${section.name}`"
    >
      {{ section.content }}
    </template>
  </BlogLayout>
</template>

<script>
export default {
  data() {
    return {
      layout: [
        { name: 'header', content: 'My Blog Title' },
        { name: 'body', content: 'Main body content' },
        { name: 'footer', content: 'Footer contet' }
      ]
    }
  }
}
</script>
```

### Scoped slots

Il est possible d'accéder au context d'un slot (LogoHeader.vue) :
```vue
<template>
  <slot name="header" :logo="logoImage" />
</template>

<script>
export default {
  data() {
    return {
      logoImage: '/images/logo.png'
    }
  }
}
</script>
```

```vue
<template>
  <LogoHeader>
    <template v-slot:header="slotProps">
      {{ slotProps.logo }}
    </template>
  </LogoHeader>
</template>
```

Il est possible de déstructurer les slots props :

```vue
<template>
  <LogoHeader>
    <template v-slot:header="{ logo }">
      {{ logo }}
    </template>
  </LogoHeader>
</template>
```
