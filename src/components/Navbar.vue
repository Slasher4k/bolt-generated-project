<template>
      <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <div class="container-fluid">
          <a class="navbar-brand" href="#">AWS Practice Exam</a>
          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarNav">
            <ul class="navbar-nav ms-auto">
              <li class="nav-item">
                <router-link to="/" class="nav-link">Home</router-link>
              </li>
              <li v-if="isAuthenticated" class="nav-item">
                <router-link to="/dashboard" class="nav-link">Dashboard</router-link>
              </li>
              <li v-if="!isAuthenticated" class="nav-item">
                <router-link to="/signup" class="nav-link">Sign Up</router-link>
              </li>
              <li v-if="!isAuthenticated" class="nav-item">
                <router-link to="/login" class="nav-link">Login</router-link>
              </li>
              <li v-if="isAuthenticated" class="nav-item">
                <a href="#" class="nav-link" @click.prevent="handleLogout">Logout</a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </template>

    <script>
    import { ref, onMounted } from 'vue';
    import { supabase } from '../supabase';

    export default {
      name: 'Navbar',
      setup() {
        const isAuthenticated = ref(false);

        onMounted(async () => {
          const { data: { user } } = await supabase.auth.getUser();
          isAuthenticated.value = !!user;
        });

        const handleLogout = async () => {
          const { error } = await supabase.auth.signOut();
          if (error) {
            alert('Error logging out: ' + error.message);
          } else {
            isAuthenticated.value = false;
          }
        };

        return { isAuthenticated, handleLogout };
      }
    };
    </script>

    <style scoped>
    /* Add styles for the navbar here */
    </style>
