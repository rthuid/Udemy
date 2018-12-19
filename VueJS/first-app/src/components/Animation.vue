<template>
    <div>
        <button @click="show = !show" class="btn btn-primary">Show info</button>
        <br>
        <br>
        <transition name="fade">
            <div class="alert alert-info" v-if="show">
                This is some info
            </div>
        </transition>
    </div>
    
</template>

<script>
    export default {
        data() {
            return {
                show: false,
            }
        }
    }
</script>

<style>
    .fade-enter{
        opacity: 0;
    }
    .fade-enter-active{
        transition: opacity 1s;
    }
    .fade-leave {
        /* opacity: 1; */
    }
    .fade-leave-active{
        transition: opacity 1s;
        opacity: 0;
    }

</style>
