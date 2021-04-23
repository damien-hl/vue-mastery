<template>
  <div>
    <h1>Create an event</h1>
    <form @submit.prevent="sendForm">
      <base-select
        v-model="event.category"
        label="Select a category"
        :options="categories"
      />

      <h3>Name & describe your event</h3>
      <base-input v-model="event.title" label="Title" type="text" />
      <base-input v-model="event.description" label="Description" type="text" />

      <h3>Where is your event?</h3>
      <base-input v-model="event.location" label="Location" type="text" />

      <h3>Are pets allowed?</h3>
      <div>
        <base-radio-group
          v-model="event.pets"
          :options="petOptions"
          name="pets"
        />
      </div>

      <h3>Extras</h3>
      <div>
        <base-checkbox v-model="event.extras.catering" label="Catering" />
      </div>
      <div>
        <base-checkbox v-model="event.extras.music" label="Live music" />
      </div>

      <button type="submit">Submit</button>
    </form>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "App",
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
      petOptions: [
        { label: "Yes", value: 1 },
        { label: "No", value: 0 },
      ],
    };
  },
  methods: {
    sendForm() {
      // Implement client-side validation here
      axios
        .post("/api/events", this.event)
        .then((response) => {
          console.log("Response", response);
        })
        .catch((err) => {
          console.log("Error", err);
        });
    },
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
