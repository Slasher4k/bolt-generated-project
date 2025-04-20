<template>
      <div>
        <Navbar />
        <div class="container mt-5">
          <div class="row">
            <div class="col text-center">
              <h1 class="mb-4">Welcome to AWS Practice Exam</h1>
              <p>Prepare for your AWS Certified Practitioner exam with our practice questions.</p>
              <router-link to="/dashboard" class="btn btn-primary">Go to Dashboard</router-link>
            </div>
          </div>
        </div>
      </div>
    </template>

    <script>
    import Navbar from '../components/Navbar.vue';

    export default {
      name: 'Home',
      components: {
        Navbar
      }
    };
    </script>

    <style scoped>
    /* Add styles for the home page here */
    </style>
