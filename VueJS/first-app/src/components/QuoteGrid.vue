<template>
    <div class="row">
        <app-quote v-for="(quote, index) in quotes" @click.native="deletequote(index)">{{ quote }}</app-quote>
    </div>
</template>

<script>
import Quote  from './Quote.vue';
    export default {
        props: ['quotes'],
        components: {
            appQuote: Quote
        },
        methods: {
            deletequote(i) {
                this.$emit('quoteDeleted', i);
            }
        }
    }
</script>

<style>

</style>
