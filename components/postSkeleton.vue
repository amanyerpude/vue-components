<template>
    <div class="post-skeleton">
        <div class="title"></div>
        <div class="body"></div>
        <div class="meta">
            <div class="author"></div>
            <div class="date"></div>
        </div>
    </div>
</template>
  
<style>
.post-skeleton {
    margin-bottom: 20px;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 5px;
    background-color: #f7f7f7;
    box-shadow: 0 0 10px #ddd;
}

.post-skeleton .title {
    height: 20px;
    width: 80%;
    margin-bottom: 10px;
    background-color: #ddd;
}

.post-skeleton .body {
    height: 100px;
    width: 100%;
    margin-bottom: 10px;
    background-color: #ddd;
}

.post-skeleton .meta {
    display: flex;
    justify-content: space-between;
    font-size: 12px;
    color: #777;
}

.post-skeleton .meta .author {
    height: 16px;
    width: 30%;
    margin-right: 10px;
    background-color: #ddd;
}

.post-skeleton .meta .date {
    height: 16px;
    width: 20%;
    background-color: #ddd;
}
</style>
  