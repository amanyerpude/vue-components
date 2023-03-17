<template>
    <div class="post">
      <h2>{{ post.title }}</h2>
      <p>{{ post.body }}</p>
      <div class="meta">
        <span class="author">{{ post.author }}</span>
        <span class="date">{{ post.date }}</span>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'Post',
    props: {
      post: {
        type: Object,
        required: true
      }
    }
  };
  </script>
  
  <style>
  .post {
    margin-bottom: 20px;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 5px;
    background-color: #fff;
    box-shadow: 0 0 10px #ddd;
  }
  
  .post h2 {
    margin-top: 0;
  }
  
  .post p {
    margin-bottom: 10px;
  }
  
  .post .meta {
    display: flex;
    justify-content: space-between;
    font-size: 12px;
    color: #777;
  }
  
  .post .meta .author {
    margin-right: 10px;
  }
  </style>
  