<template>
      <div>
        <Navbar />
        <div class="container mt-5">
          <div class="row justify-content-center">
            <div class="col-md-6">
              <h2 class="mb-4">Login</h2>
              <form @submit.prevent="handleLogin">
                <div class="mb-3">
                  <label for="email" class="form-label">Email address</label>
                  <input type="email" class="form-control" v-model="email" placeholder="Enter your email">
                </div>
                <div class="mb-3">
                  <label for="password" class="form-label">Password</label>
                  <input type="password" class="form-control" v-model="password" placeholder="Enter your password">
                </div>
                <button type="submit" class="btn btn-primary">Login</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </template>

    <script>
    import Navbar from '../components/Navbar.vue';
    import { supabase } from '../supabase';

    export default {
      name: 'Login',
      components: {
        Navbar
      },
      data() {
        return {
          email: '',
          password: ''
        };
      },
      methods: {
        async handleLogin() {
          const { error } = await supabase.auth.signInWithPassword({
            email: this.email,
            password: this.password
          });
          if (error) {
            alert('Error logging in: ' + error.message);
          } else {
            this.$router.push({ name: 'Dashboard' });
          }
        }
      }
    };
    </script>

    <style scoped>
    /* Add styles for the login page here */
    </style>
