<template>
    <div class="col-sm-6 col-dm-4">
        <div class="panel panel-info">
            <div class="panel-heading">
                <h3 class="panel-title">
                    {{stock.name}}
                    <small>(Price: {{stock.price}})</small>
                </h3>
            </div>
            <div class="panel-body">
                <div class="pull-left">
                    <input type="number" class="form-control" placeholder="Quantity"
                    v-model="quantity"
                    :class="{'danger': infufficiantFunds}">
                </div>
                <div class="pull-right">
                    <button class="btn btn-success"
                    @click="buyStock" 
                    :disabled="infufficiantFunds || quantity <= 0 || Number.isInteger(quantity)"
                    :class="{'btn-danger': infufficiantFunds}">
                        {{ infufficiantFunds ? 'Infufficiant Funds' : 'Buy' }}
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: ['stock'],
    data() {
        return {
            quantity: 0
        }
    },
    methods: {
        buyStock() {
            const order = {
                stockId: this.stock.id,
                stockPrice: this.stock.price,
                quantity: this.quantity
            };
            this.$store.dispatch('buyStock', order);
            this.quantity = 0;
        }
    },
    computed: {
        funds() {
            return this.$store.getters.funds;
        },
        infufficiantFunds() {
            return this.quantity * this.stock.price > this.funds;
        }
    },
}
</script>

<style scoped>
.danger {
    border: 1px solid red;
}
</style>
