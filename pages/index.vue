<template>
    <div class="container">
        <div class="wrapper">
            <h1 class="title">Custom Vue Components</h1>
            <div class="grid">
                <div class="card" v-for="card in cards" :key="card.id" @click="handleClick(card)">
                    <h2>{{ card.title }}</h2>
                    <p>{{ card.description }}</p>
                </div>
            </div>
        </div>
    </div>
</template>
  
<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";

const cards = ref([
    { id: 1, title: "Infinite Scroll", description: "Custom Infinite Scroll Component" },
    { id: 2, title: "Infinite Scroll", description: "Custom Infinite Scroll Component" },
    { id: 3, title: "Infinite Scroll", description: "Custom Infinite Scroll Component" },
    { id: 4, title: "Infinite Scroll", description: "Custom Infinite Scroll Component" },
    { id: 5, title: "Infinite Scroll", description: "Custom Infinite Scroll Component" },
    { id: 6, title: "Infinite Scroll", description: "Custom Infinite Scroll Component" },
    { id: 7, title: "Infinite Scroll", description: "Custom Infinite Scroll Component" },
    { id: 8, title: "Infinite Scroll", description: "Custom Infinite Scroll Component" },
    { id: 9, title: "Infinite Scroll", description: "Custom Infinite Scroll Component" },
]);

const router = useRouter();

const handleClick = (card: object) => {
    console.log(card);
    router.push(`/infinite-list`);
};
</script>

  
<style scoped>
.container {
    background-image: linear-gradient(to right, #f127e6, #f5af19);
}

.wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
}

.title {
    color: white;
    font-family: Arial, Helvetica, sans-serif;
    font-size: 36px;
    font-weight: bold;
}

.grid {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, auto));
    /* Change this value to adjust the number of cards per row */
}

.card {
    background-color: white;
    border-radius: 10px;
    box-shadow:
        inset -1px -1px rgba(0, 0, 0, 0.25),
        inset -2px -2px rgba(0, 0, 0, 0.25),
        inset -4px -4px rgba(0, 0, 0, 0.25),
        inset -8px -8px rgba(0, 0, 0, 0.25),
        inset -16px -16px rgba(0, 0, 0, 0.25);
    padding: 20px;
    cursor: pointer;
    transition: transform .15s ease-in-out, box-shadow .15s ease-in-out;
}

.card:hover {
    transform: scale(1.05) translate(-0.5%, -0.5%);
    box-shadow:
        inset calc(-1px * .95) calc(-1px * .95) var(–shadow),
        inset calc(-2px * .95) calc(-2px * .95) var(–shadow),
        inset calc(-4px * .95) calc(-4px * .95) var(–shadow),
        inset calc(-8px * .95) calc(-8px * .95) var(–shadow),
        inset calc(-16px * .95) calc(-16px * .95) var(–shadow);
}
</style>