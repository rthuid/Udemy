<template>
    <div class="row">
        <form>
            <div class="col-sm-8 col-sm-offset-2">
                <div class="form-group">
                    <label>Quote</label>
                    <textarea rows="3" v-model="quote" class="form-control"></textarea>
                </div>
            </div>
            <div class="col-sm-8 col-sm-offset-2">
                <div class="form-group">
                    <button @click.prevent="createNew">Add Quote</button>
                </div>
            </div>
        </form>
    </div>
</template>

<script>
    export default {
        data: function() {
            return {
                quote: ''
            }
        },
        methods: {
            createNew() {
                this.$emit('quoteAdded', this.quote);
                this.quote = '';
            }
        }
    }
</script>

<style>

</style>
