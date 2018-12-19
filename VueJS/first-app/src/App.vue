<template>
    <div class="container">
        <app-header :quoteCount="quotes.length" :maxQuotes="maxQuotes"></app-header>
        <app-new-quote @quoteAdded="newQuote"></app-new-quote>
        <app-quote-grid :quotes="quotes" @quoteDeleted="quoteDelete"></app-quote-grid>
        <div class="row">
            <div class="col-sm-12 text-center">
                <div class="alert alert-info">
                    Info: Click on a Quote to delete it!
                </div>
            </div>
        </div>
        <app-animation></app-animation>
        <app-form></app-form>
    </div>
</template>

<script>
    import QuoteGrid from './components/QuoteGrid.vue';
    import NewQuote from './components/NewQuote.vue';
    import Header from './components/Header.vue';
    import Animation from './components/Animation.vue';
    import Form from './components/Form.vue';

    export default {
        data: function() {
            return {
                quotes: [
                    'Just sample quote'
                ],
                maxQuotes: 10
            }
        },
        methods: {
            newQuote(event) {
                if (this.quotes.length >= this.maxQuotes) {
                    alert('Please delete quote first!');
                    return
                }
                this.quotes.push(event);
            },
            quoteDelete(i) {
                this.quotes.splice(i, 1);
            }
        },
        components: {
            appQuoteGrid: QuoteGrid,
            appNewQuote: NewQuote,
            appHeader: Header,
            appAnimation: Animation,
            appForm: Form
        }
    }
</script>

<style>
</style>
