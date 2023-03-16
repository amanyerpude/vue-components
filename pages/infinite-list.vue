
<template>
    <div class="container">
        <!-- use infinite scroll component -->
        <infinite-scroll :items="posts" :loading="postsLoading" @load-more="loadMorePosts">
            <!-- use default slot to render post components -->
            <template #default="{ item }">
                <post :post="item"></post>
            </template>
            <!-- use loading slot to render loading indicator -->
            <template #loading>
                <div class="loading">Loading...</div>
            </template>
        </infinite-scroll>
    </div>
</template>
 

<script>
export default {
    /**
     * Props for parent component.
     * @type {Object}
     */
    props: {

        /**
        * Posts prop passed from grandparent component or router.
        * @type {Array}
        */
        postsProp: {
            type: Array,
            required: true
        }
    },
    /**
     * Data for parent component.
     * @returns {Object}
     */
    data() {

        /**
        * Posts loading state.
        * @type {Boolean}
        */
        return {
            postsLoading: false,

            /**
            * Posts page number.
            * @type {number}
            */
            postsPage: 1
        };
    },
    /**
     * Computed properties for parent component.
     */
    computed: {

        /**
        * Computed property for returning posts array based on posts prop.
        * @returns {Array}
            */
        posts() { return this.postsProp; }
    },
    /**
     * Watch properties for parent component.
    */
    watch: {
        /**
         *Watch property for postsPage value.
         *@param {number} newValue - The new value of postsPage.
         */
        postsPage(newValue) {
            // call fetchPosts when postsPage changes
            this.fetchPosts(newValue);
        },
    },
    /**
    * Methods for parent component.
    */
    methods: {

        /**
         * Method for fetching more posts from API.
         * @param {number} page - The page number to fetch. Default to 1.
         */
        async fetchPosts(page = 1) {
            try {
                // set loading state to true
                this.postsLoading = true;
                // get the response from the API with the page parameter
                const response = await fetch(
                    `https://jsonplaceholder.typicode.com/posts?_page=${page}&_limit=10`
                );
                // get the data from the response as JSON
                const data = await response.json();
                // append the data to the posts array
                this.posts.push(...data);
            } catch (error) {
                // handle any errors that may occur
                console.error(error);
                alert("Something went wrong. Please try again later.");
            } finally {
                // set loading state to false
                this.postsLoading = false;
            }
        },
        /**
         * Method for incrementing postsPage value by one.
         */
        loadMorePosts() {
            // only increment postsPage if not loading
            if (!this.postsLoading) {
                this.postsPage++;
            }
        },
    }
}
</script>