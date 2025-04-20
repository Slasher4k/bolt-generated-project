<template>
      <div>
        <Navbar />
        <div class="container mt-5">
          <div class="row justify-content-center">
            <div class="col-md-6">
              <h2 class="mb-4">Sign Up</h2>
              <form @submit.prevent="handleSignUp">
                <div class="mb-3">
                  <label for="email" class="form-label">Email address</label>
                  <input type="email" class="form-control" v-model="email" placeholder="Enter your email">
                </div>
                <div class="mb-3">
                  <label for="password" class="form-label">Password</label>
                  <input type="password" class="form-control" v-model="password" placeholder="Enter your password">
                </div>
                <button type="submit" class="btn btn-primary">Sign Up and Pay $20</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </template>

    <script>
    import Navbar from '../components/Navbar.vue';
    import { supabase } from '../supabase';
    import { loadStripe } from '@stripe/stripe-js';

    export default {
      name: 'SignUp',
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
        async handleSignUp() {
          const stripe = await loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);
          const { error } = await supabase.auth.signUp({
            email: this.email,
            password: this.password
          });
          if (error) {
            alert('Error signing up: ' + error.message);
          } else {
            const { error: stripeError } = await stripe.redirectToCheckout({
              lineItems: [{ price: 'price_membership', quantity: 1 }],
              mode: 'payment',
              successUrl: window.location.origin + '/dashboard',
              cancelUrl: window.location.origin + '/signup',
            });
            if (stripeError) {
              alert('Error with payment: ' + stripeError.message);
            }
          }
        }
      }
    };
    </script>

    <style scoped>
    /* Add styles for the sign-up page here */
    </style>
