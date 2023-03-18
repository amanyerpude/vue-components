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
                <!-- Add a list item for the loading indicator -->
                <li v-if="loading" key="loading-indicator">
                    <!-- add a named slot for loading state -->
                    <slot name="loading"></slot>
                </li>
            </transition-group>
        </ul>
        <!-- add a sentinel element at the end of the list -->
        <div ref="sentinel"></div>
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
            if (lastEntry.isIntersecting && !this.loading && lastEntry.intersectionRatio >= this.loadMoreThreshold) {
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

/**
*There are a few improvements that can be made to this component:

Improve the naming of some variables and functions to make their purpose clearer. For example, handleCheckIntersectiontDebounced could be renamed to debouncedCheckIntersection, and checkIntersection could be renamed to handleIntersection.

Provide a more meaningful default value for the loadMoreThreshold prop. The current default value is 1, which is not very helpful without context. A better default value could be something like 0.5, which would mean that the sentinel element should be 50% visible before triggering a load more event.

Add error handling for the case where the IntersectionObserver API is not supported by the browser. In this case, the component should not break but instead display an error message or fallback behavior.

Add support for server-side rendering (SSR) by checking if the component is being rendered on the server and not adding the intersection observer in that case. This is important because the IntersectionObserver API is not supported on the server and will cause errors.

Provide more flexibility in the way items are rendered by allowing the user to specify a custom component to be used for rendering each item, instead of just using a slot.

Add tests to ensure that the component works correctly in all scenarios and edge cases.

Improve the CSS styles to make the loading indicator more prominent and visually appealing.

Add support for dynamically changing the list of items, which is not currently supported by the component.

Add documentation to explain how to use the component and its props, and provide examples of common use cases.
**/
/***
*One potential improvement could be to make the handleCheckIntersectiontDebounced method more reusable by allowing the debounce time to be passed as a parameter. This would make it easier to adjust the debounce time based on specific use cases.

Additionally, the current implementation assumes that there is only one sentinel element on the page, which may not always be the case. It may be worth adding a prop to specify a unique ID for the sentinel element, so that multiple instances of the component can coexist on the same page without interfering with each other.

Finally, the current implementation assumes that the items passed in are objects with an id property, which may not always be the case. It may be worth adding a prop to specify a custom key to be used for the v-for loop instead of hardcoding :key="item.id".
*/