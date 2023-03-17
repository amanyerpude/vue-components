/**
 * Vue component for infinite scrolling of a list of items.
 * @module components/infinite-scroll
 * @vue-prop {Array} items - Array of items to be rendered.
 * @vue-prop {Boolean} loading - Loading state of the component.
 * @vue-prop {Number} loadMoreThreshold - Threshold for loading more items.
 */
<template>
    <div ref="container">
        <ul>
            <!-- wrap the list element with a transition-group component -->
            <transition-group name="list" tag="ul">
                <li v-for="item in items" :key="item.id">
                    <!-- use a slot to render different item components -->
                    <slot :item="item"></slot>
                </li>
            </transition-group>
        </ul>
        <!-- add a sentinel element at the end of the list -->
        <div ref="sentinel"></div>
        <!-- add a named slot for loading state -->
        <slot name="loading" v-if="loading"></slot>
    </div>
</template>
  
<script>
/**
 * Creates a debounced function that delays invoking func until after wait milliseconds have elapsed since the last time the debounced function was invoked.
 * @param {Function} func - The function to debounce.
 * @param {number} wait - The number of milliseconds to delay.
 * @returns {Function} - The debounced function.
 */
function debounce(func, wait) {
    let timeout; // declare a variable to store the timeout id
    return function (...args) { // return a new function that accepts any arguments
        const context = this; // store the current context
        clearTimeout(timeout); // clear any previous timeout
        timeout = setTimeout(() => { // set a new timeout
            func.apply(context, args); // invoke the original function with the current context and arguments
        }, wait); // pass the wait time as an argument
    };
}
export default {
    /**
     * Props for infinite scroll component.
     * @type {Object}
     */
    props: {

        /**
        * Items array prop.
        * @type {Array}
        */
        items: {
            type: Array,
            required: true,
            description: "Array of items to be rendered."
        },

        /**
        * Loading state prop.
        * @type {Boolean}
        */
        loading: {
            type: Boolean,
            required: true,
            description: "Loading state of the component."
        },
        loadMoreThreshold: {
            type: Number,
            default: 1,
            description: "Threshold for loading more items."
        },
    },
    /**
     * Data for infinite scroll component.
     * @returns {Object}
     */
    data() {

        /**
        * Intersection observer instance data.
        * @type {IntersectionObserver|null}
        */
        return {
            observer: null
        };

    },
    /**
     * Mounted lifecycle hook for the infinite scroll component.
     * @function
     */
    mounted() {
        console.log("Mounted!");
        /**
        * Create observer with options and pass handleIntersectDebounced as callback.
        */
        this.observer = new IntersectionObserver(this.handleCheckIntersectiontDebounced, {
            root: null,
            rootMargin: "0px",
            threshold: 1.0
        });
        console.log("Observer created:", this.observer);
        /**
         * Observe sentinel element.
         */
        this.observer.observe(this.$refs.sentinel); // observe sentinel element
        console.log("Sentinel observed:", this.$refs.sentinel);
    },
    /**
    * Before destroy lifecycle hook for the infinite scroll component.
    * @function
    */
    beforeDestroy() {
        /**
        * Disconnect observer when component is destroyed.
        */
        this.observer.disconnect(); // disconnect observer when component is destroyed
    },
    methods: {
        /**
        * Debounced function to handle checking the intersection of the sentinel element.
        * @function
        * @param {Array} entries - Array of intersection observer entries.
        */
        handleCheckIntersectiontDebounced: debounce(function (entries) {
            this.checkIntersection(entries);
        }, 300),
        /**
        * Function to check the intersection of the sentinel element and load more items if it's intersecting.
        * @function
        * @param {Array} entries - Array of intersection observer entries.
        */
        checkIntersection(entries) {
  const lastEntry = entries[entries.length - 1];
  if (lastEntry.isIntersecting && !this.loading) {
    this.$emit("load-more");
  }
}
    }
};
</script>
  
<style scoped>
/* add some CSS styles for the transition effects */

.list-enter-active,
.list-leave-active {
    transition: all 0.5s;
}

.list-enter-from,
.list-leave-to {
    opacity: 0;
    transform: translateY(30px);
}
</style>