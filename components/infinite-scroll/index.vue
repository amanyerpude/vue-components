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
            required: true
        },

        /**
        * Loading state prop.
        * @type {Boolean}
        */
        loading: {
            type: Boolean,
            required: true
        }
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
     * Mounted lifecycle hook for infinite scroll component.
     */
    mounted() {
        /**
        * Create observer with options and pass handleIntersectDebounced as callback.
        */
        this.observer = new IntersectionObserver(this.handleIntersect, { root: this.$refs.container }); // create observer with options
        /**
         * Observe sentinel element.
         */
        this.observer.observe(this.$refs.sentinel); // observe sentinel element
    },
    /**
     * Before destroy lifecycle hook for infinite scroll component.
     */
    beforeDestroy() {
        /**
        * Disconnect observer when component is destroyed.
        */
        this.observer.disconnect(); // disconnect observer when component is destroyed
    },
    methods: {
        /**
         * Debounced version of handleIntersect method using debounce function defined above.
         */
        handleIntersectDebounced: debounce(function (entries) {
            this.handleIntersect(entries);
        }, 300),
        /**
          * Handle intersection event and emit loadMore event if needed.
          */
        handleIntersect(entries) {
            const entry = entries[0]; // get first entry from entries array

            if (entry.isIntersecting && !this.loading) {
                // if sentinel element is visible and loading state is false
                this.$emit("loadMore"); // emit loadMore event to parent component
            }
        },
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