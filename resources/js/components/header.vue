<template>
    <header class="d-flex flex-column flex-md-row align-items-center p-3 px-md-4 mb-3 bg-white border-bottom box-shadow">
       <h5 class="my-0 mr-md-auto font-weight-normal">Шашки - Checkers</h5>
        <nav class="my-2 my-md-0 mr-md-3">
            <router-link :to="{name: 'game'}" class="p-2 text-dark">Играть</router-link>
            <router-link :to="{name: 'history'}" class="p-2 text-dark">История</router-link>
        </nav>
        <router-link :to="{name: 'login'}" class="btn btn-outline-primary">Log in</router-link>
    </header>
</template>

<script>
export default {
}
</script>

<style scoped>
header {
    display: flex;
    justify-content: space-around;
}
</style>
