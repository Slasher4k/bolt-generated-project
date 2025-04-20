<template>
      <div>
        <Navbar />
        <div class="container mt-5">
          <div class="row justify-content-center">
            <div class="col-md-6">
              <div class="card shadow-sm">
                <div class="card-body">
                  <h2 class="card-title text-center mb-4">Login</h2>
                  <form @submit.prevent="handleLogin">
                    <div class="mb-3">
                      <label for="email" class="form-label">Email address</label>
                      <input type="email" class="form-control" v-model="email" placeholder="Enter your email" required>
                    </div>
                    <div class="mb-3">
                      <label for="password" class="form-label">Password</label>
                      <input type="password" class="form-control" v-model="password" placeholder="Enter your password" required>
                    </div>
                    <button type="submit" class="btn btn-primary w-100">Login</button>
                  </form>
                </div>
              </div>
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
    .card {
      border-radius: 10px;
    }
    .card-title {
      font-weight: bold;
    }
    </style>
