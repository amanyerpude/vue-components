<template>
    <div class="container">
        <div class="wrapper">
            <h1 class="title">Custom Vue Components</h1>
            <transition-group name="card" tag="div" class="grid">
                <div class="card" v-for="card in cards" :key="card.id" @click="handleClick(card)">
                    <h2>{{ card.title }}</h2>
                    <p>{{ card.description }}</p>
                </div>
            </transition-group>
            <button class="load-more" @click="loadMore">
                <span>Load More</span>
                <span class="arrow"></span>
            </button>
        </div>
    </div>
</template>
  
<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";

const cards = ref([
    { id: 1, title: "Infinite Scroll", description: "Custom Infinite Scroll Component" },
    { id: 2, title: "Carousel", description: "Custom Carousel Component" },
    { id: 3, title: "Modal", description: "Custom Modal Component" },
    { id: 4, title: "Tabs", description: "Custom Tabs Component" },
    { id: 5, title: "Tooltip", description: "Custom Tooltip Component" },
    { id: 6, title: "Toggle", description: "Custom Toggle Component" },
    { id: 7, title: "Menu", description: "Custom Menu Component" },
    { id: 8, title: "Slider", description: "Custom Slider Component" },
    { id: 9, title: "Accordion", description: "Custom Accordion Component" },
]);

const router = useRouter();

const handleClick = (card: object) => {
    console.log(card);
    router.push(`/infinite-list`);
};

const loadMore = () => {
    cards.value.push(
        { id: 10, title: "Alert", description: "Custom Alert Component" },
        { id: 11, title: "Dropdown", description: "Custom Dropdown Component" },
        { id: 12, title: "Badge", description: "Custom Badge Component" }
    );
};
</script>
  
<style scoped>
.container {
    background: linear-gradient(to right, #87CEEB, #6A5ACD);
    min-height: 100vh;
}

.wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
}

.title {
    color: white;
    font-family: Arial, Helvetica, sans-serif;
    font-size: 48px;
    font-weight: bold;
    margin-top: 50px;
}

.grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr); /* or repeat(auto-fit, minmax(300px, 1fr)) */
    gap: 20px;
    margin-top: 50px;
}

.card-enter-active {
    transition: transform 0.5s ease-out;
}

.card-enter {
    transform: scale(0.8);
    opacity: 0;
}

.card-leave-active {
    transition: transform 0.5s ease-out;
}

.card-leave-to {
    transform: scale(0.8);
    opacity: 0;
}

.card {
    background-color: white;
    border-radius: 10px;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
    padding: 20px;
    cursor: pointer;
    transition: transform .15s ease-in-out, box-shadow .15s ease-in-out;
}

.card:hover {
    transform: scale(1.05) translate(-0.5%, -0.5%);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.5);
}

.card-title {
    font-size: 24px;
    font-weight: bold;
    color: #333;
    margin-bottom: 10
}

.load-more {
    margin: 40px auto;
    padding: 10px 20px;
    border: 2px solid #f5af19;
    border-radius: 25px;
    font-family: Arial, Helvetica, sans-serif;
    font-size: 18px;
    font-weight: bold;
    color: #f5af19;
    background-color: transparent;
    cursor: pointer;
    transition: background-color 0.3s ease-in-out, transform 0.3s ease-in-out;
}

.load-more:hover {
    background-color: #f5af19;
    color: white;
    transform: translateY(-2px);
}
</style>