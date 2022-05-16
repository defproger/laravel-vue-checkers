<template>
    <div id="App">
        <vheader />
        <div class="container">
            <router-view />
            <Footer />
        </div>
    </div>



</template>

<script>
import vheader from "./components/header";
import Footer from "./components/Footer";
export default {
    components: {
        vheader,
        Footer
    },
    data() {
        return {
            hello: 'hello'
        }
    }
}
</script>

<style scoped>

</style>
