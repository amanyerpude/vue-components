
<template>
    <div class="container">
        <!-- use infinite scroll component -->
        <infinite-scroll :items="posts" ref="infiniteScroll" :loading="postsLoading" @load-more="loadMorePosts">
            <!-- use default slot to render post components -->
            <template #default="{ item }">
                <post :post="item"></post>
            </template>
            <!-- use loading slot to render loading indicator -->
            <template #loading>
                <post-skeleton></post-skeleton>
            </template>
        </infinite-scroll>
        <div v-if="showEndMessage" class="end-message">You've reached the end of the list!</div>
    </div>
</template>
 

<script>
export default {
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
            posts: [],
            postsLoading: false,

            /**
            * Posts page number.
            * @type {number}
            */
            postsPage: 0,
            /**
             * Flag to show/hide the end of list message.
             * @type {Boolean}
             */
            showEndMessage: false,
            lastPage: 5
        };
    },
    /**
     * Computed properties for parent component.
     */
    computed: {},
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
            console.log('fetchPosts', page);
            try {
                // set loading state to true
                this.postsLoading = true;
                // simulate API call delay
                await new Promise(resolve => setTimeout(resolve, 1000));
                // generate random post data
                const postData = Array.from({ length: 10 }, (_, i) => ({
                    id: this.posts.length + i + 1,
                    title: `Post ${this.posts.length + i + 1}`,
                    date: `25/03/2023`,
                    body: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed pharetra, ante sed dignissim euismod, nisl nisi pellentesque elit, a rhoncus risus nunc quis elit. Sed eget turpis vitae mi sodales viverra sed quis urna. Aenean et sapien vel erat malesuada laoreet. Donec blandit eros euismod ante rutrum, sed malesuada nisi consequat. Sed suscipit justo quis urna fermentum, vel imperdiet mauris congue. Ut lobortis metus at est bibendum, ut iaculis sapien auctor. Sed at sem at libero facilisis vestibulum sed ut sem. Pellentesque mattis tortor eu arcu maximus iaculis. Praesent consectetur lorem at lobortis rutrum. Duis vitae tellus sapien. Etiam ut quam vel tellus pharetra congue. Fusce quis iaculis mauris. Donec tincidunt mauris ut sapien fringilla ultrices.`,
                }));
                // append the data to the posts array
                this.posts.push(...postData);
            } catch (error) {
                console.error(error);
                alert("Something went wrong. Please try again later.");
            } finally {
                // set loading state to false
                this.postsLoading = false;
            }
            // if the fetched data is empty, show end message and return
            if (!data.length) {
                this.showEndMessage = true;
                return;
            }
        },
        /**
         * Method for incrementing postsPage value by one.
         */
        loadMorePosts() {
            console.log('loadMorePosts', !this.postsLoading);
            // only increment postsPage if not loading and we haven't reached the end page
            if (!this.postsLoading && this.postsPage < this.lastPage) {
                this.postsPage++;
                // if we've reached the end page, show the end message
                if (this.postsPage >= this.lastPage) {
                    this.showEndMessage = true;
                }
            }
        }
    }
}
</script>