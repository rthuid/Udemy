<template>
    <div class="container">
        <div class="row">
            <div class="col-sm-6 col-sm-offset-3">
                <div class="form-group">
                    <label>Name</label>
                    <input type="text" class="form-control" v-model="user.name">
                </div>
                <div class="form-group">
                    <label>Name</label>
                    <input type="text" class="form-control" v-model="user.email">
                </div>
                <div class="form-group">
                    <button class="btn btn-primary" @click="formSubmit">Submit</button>
                    <button class="btn btn-primary" @click="getUsers">Get users</button>
                </div>
                <ul class="list-group">
                    <li class="list-group-item" v-for="user in users">
                        <strong>Name: </strong>{{user.name}} <br>
                        <strong>Email: </strong>{{user.email}}
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
    export default{
        data() {
            return {
                user: {
                    name: '',
                    email: ''
                },
                users: []
            }
        },
        methods: {
            formSubmit() {
                console.log(this.user);
                this.$http.post('', this.user)
                    .then(res => {
                        console.log(res);
                    }, error => {
                        console.log(error);
                    });
            },
            getUsers() {
                console.log(this.user);
                this.$http.get('')
                    .then(res => {
                        console.log(res);
                        this.users = res.body;
                    }, error => {
                        console.log(error);
                    });
            }
        }
    }
</script>