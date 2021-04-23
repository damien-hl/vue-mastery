<template>
  <div>
    <h1>Create an event</h1>
    <form>
      <base-select
        v-model="event.category"
        label="Select a category"
        :options="categories"
      />
      <label>Select a category</label>
      <select v-model="event.category">
        <option
          v-for="option in categories"
          :value="option"
          :key="option"
          :selected="option === event.category"
        >
          {{ option }}
        </option>
      </select>

      <h3>Name & describe your event</h3>

      <base-input v-model="event.title" label="Title" type="text" />

      <base-input v-model="event.description" label="Description" type="text" />

      <h3>Where is your event?</h3>

      <base-input v-model="event.location" label="Location" type="text" />

      <h3>Are pets allowed?</h3>
      <div>
        <input type="radio" v-model="event.pets" :value="1" name="pets" />
        <label>Yes</label>
      </div>

      <div>
        <input type="radio" v-model="event.pets" :value="0" name="pets" />
        <label>No</label>
      </div>

      <h3>Extras</h3>
      <div>
        <input type="checkbox" v-model="event.extras.catering" />
        <label>Catering</label>
      </div>

      <div>
        <input type="checkbox" v-model="event.extras.music" />
        <label>Live music</label>
      </div>

      <button type="submit">Submit</button>
    </form>
  </div>
</template>

<script>
import BaseInput from "@/components/BaseInput.vue";
import BaseSelect from "@/components/BaseSelect.vue";

export default {
  name: "App",
  components: {
    BaseInput,
    BaseSelect,
  },
  data() {
    return {
      categories: [
        "sustainability",
        "nature",
        "animal welfare",
        "housing",
        "education",
        "food",
        "community",
      ],
      event: {
        category: "",
        title: "",
        description: "",
        location: "",
        pets: 1,
        extras: {
          catering: false,
          music: false,
        },
      },
    };
  },
};
</script>

<style>
#app {
  margin: 0 auto;
  max-width: 400px;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

.field:focus {
  outline: none;
  border: 1px solid rgb(65, 183, 130);
  box-shadow: 0 0 0 0.2rem rgb(65 183 130 / 25%);
}

label {
  margin-bottom: 0.25rem;
  display: inline-block;
  font-size: 80%;
}

input[type="checkbox"] {
  margin-bottom: 1rem;
}

input[type="radio"] {
  margin-bottom: 0.5rem;
}

.field {
  margin-bottom: 1rem;
  padding: 0.5rem;
  box-sizing: border-box;
  width: 100%;
  display: block;
  border: 1px solid rgb(196, 196, 196);
  border-radius: 4px;
  transition: box-shadow 250ms ease;
}

button[type="submit"] {
  margin-top: 1rem;
  padding: 0.75rem 2rem;
  background: linear-gradient(90deg, #41b782, #86d169);
  border: none;
  border-radius: 4px;
  font-weight: 700;
  color: #fff;
  cursor: pointer;
}
</style>
