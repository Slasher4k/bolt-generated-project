<template>
      <div>
        <Navbar />
        <div class="container mt-5">
          <div class="row justify-content-center">
            <div class="col-md-6">
              <div class="card shadow-sm">
                <div class="card-body">
                  <h2 class="card-title text-center mb-4">Sign Up</h2>
                  <form @submit.prevent="handleSignUp">
                    <div class="mb-3">
                      <label for="email" class="form-label">Email address</label>
                      <input type="email" class="form-control" v-model="email" placeholder="Enter your email" required>
                    </div>
                    <div class="mb-3">
                      <label for="password" class="form-label">Password</label>
                      <input type="password" class="form-control" v-model="password" placeholder="Enter your password" required>
                    </div>
                    <button type="submit" class="btn btn-primary w-100">Sign Up and Pay $20</button>
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
          const stripeKey = import.meta.env.VITE_ENVIRONMENT === 'development'
            ? import.meta.env.VITE_STRIPE_PUBLIC_KEY_TEST
            : import.meta.env.VITE_STRIPE_PUBLIC_KEY_LIVE;

          const stripe = await loadStripe(stripeKey);
          const { error } = await supabase.auth.signUp({
            email: this.email,
            password: this.password
          });
          if (error) {
            alert('Error signing up: ' + error.message);
          } else {
            try {
              const response = await fetch('/create-checkout-session', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email: this.email }),
              });

              const { sessionId } = await response.json();

              const { error: stripeError } = await stripe.redirectToCheckout({ sessionId });
              if (stripeError) {
                alert('Error with payment: ' + stripeError.message);
              }
            } catch (err) {
              console.error('Error creating checkout session:', err);
            }
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
