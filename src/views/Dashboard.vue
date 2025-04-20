<template>
      <div>
        <Navbar />
        <div class="container mt-5">
          <div class="row">
            <div class="col">
              <h1 class="mb-4">Dashboard</h1>
              <div class="card">
                <div class="card-body">
                  <h5 class="card-title">Manage Exams</h5>
                  <p class="card-text">Create a new exam or view your exam status.</p>
                  <a href="#" class="btn btn-primary">Create Exam</a>
                  <a href="#" class="btn btn-secondary">View Exams</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </template>

    <script>
    import Navbar from '../components/Navbar.vue';

    export default {
      name: 'Dashboard',
      components: {
        Navbar
      }
    };
    </script>

    <style scoped>
    /* Add styles for the dashboard here */
    </style>
