<template>
      <div>
        <Navbar />
        <div class="container mt-5">
          <div class="row justify-content-center">
            <div class="col-md-6">
              <h2 class="mb-4">Sign Up</h2>
              <form>
                <div class="mb-3">
                  <label for="email" class="form-label">Email address</label>
                  <input type="email" class="form-control" id="email" placeholder="Enter your email">
                </div>
                <div class="mb-3">
                  <label for="password" class="form-label">Password</label>
                  <input type="password" class="form-control" id="password" placeholder="Enter your password">
                </div>
                <button type="submit" class="btn btn-primary">Sign Up</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </template>

    <script>
    import Navbar from '../components/Navbar.vue';

    export default {
      name: 'SignUp',
      components: {
        Navbar
      }
    };
    </script>

    <style scoped>
    /* Add styles for the sign-up page here */
    </style>
