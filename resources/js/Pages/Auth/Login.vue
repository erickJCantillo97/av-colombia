<script setup>
import { Head, Link, useForm } from '@inertiajs/vue3';
import AuthenticationCard from '@/Components/AuthenticationCard.vue';
import AuthenticationCardLogo from '@/Components/AuthenticationCardLogo.vue';
import Checkbox from '@/Components/Checkbox.vue';
import InputError from '@/Components/InputError.vue';
import InputLabel from '@/Components/InputLabel.vue';
import PrimaryButton from '@/Components/PrimaryButton.vue';
import TextInput from '@/Components/TextInput.vue';

defineProps({
    canResetPassword: Boolean,
    status: String,
});

const form = useForm({
    email: '',
    password: '',
    remember: false,
});

const submit = () => {
    form.transform(data => ({
        ...data,
        remember: form.remember ? 'on' : '',
    })).post(route('login'), {
        onFinish: () => form.reset('password'),
    });
};
</script>


<template>
    <Head title="Log in" />
    <div class="flex min-h-full flex-1">
      <div class="flex flex-1 flex-col justify-center px-4 py-12 sm:px-6 lg:flex-none lg:px-20 xl:px-18">
        <div class="mx-auto w-full max-w-sm lg:w-96">
          <div>
            <img class="h-10 w-auto" src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600" alt="Your Company" />
            <h2 class="mt-8 text-xl  leading-9 tracking-tight text-gray-900">Inicia Sesión con tu cuenta <strong class="font-extrabold uppercase">
                AV Colombia
            </strong></h2>
            
          </div>
  
          <div class="mt-10">
            <div>
              <form @submit.prevent="submit"  class="space-y-6">
                <div>
                  <label for="email" class="block text-sm font-medium leading-6 text-gray-900">Correo</label>
                  <div class="mt-2">
                    <input id="email" v-model="form.email" name="email" type="email" autocomplete="email" required="" class="block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                  </div>
                  <InputError class="mt-2" :message="form.errors.email" />
                </div>
  
                <div>
                  <label for="password" class="block text-sm font-medium leading-6 text-gray-900">Cotraseña</label>
                  <div class="mt-2">
                    <input id="password"     v-model="form.password" name="password" type="password" autocomplete="current-password" required="" class="block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                    <InputError class="mt-2" :message="form.errors.password" />
                  </div>
                </div>
  
                <div class="flex items-center justify-between">
                  <div class="flex items-center">
                    <input  v-model="form.remember" id="remember-me" name="remember-me" type="checkbox" class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600" />
                    <label for="remember-me" class="ml-3 block text-sm leading-6 text-gray-700">Remember me</label>
                  </div>
  
                  <!-- <div class="text-sm leading-6">
                    <a href="#" class="font-semibold text-indigo-600 hover:text-indigo-500">Forgot password?</a>
                  </div> -->
                </div>
  
                <div>
                  <button type="submit" class="flex w-full justify-center rounded-md bg-gray-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-gray-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-600">Entrar</button>
                </div>
              </form>
            </div>
  
            <div class="mt-10">
              <div class="relative">
                <div class="absolute inset-0 flex items-center" aria-hidden="true">
                  <div class="w-full border-t border-gray-200" />
                </div>
                <div class="relative flex justify-center text-sm font-medium leading-6">
                  <span class="bg-white px-6 text-gray-900">O comuniquese con AV Colombia</span>
                </div>
              </div>
  
              <div class="mt-6 grid grid-cols-2 gap-4">
                <a href="https://w.app/kRhMJq" target="_blank" class="flex w-full items-center justify-center gap-3 rounded-md bg-white px-3 py-2 font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus-visible:ring-transparent">
                    <i class="fa-brands fa-whatsapp text-emerald-500"></i>
                  <span class="text-sm font-semibold leading-6">Whatsapp</span>
                </a>
  
                <a href="#" class="flex w-full items-center justify-center gap-3 rounded-md bg-white px-3 py-2 font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus-visible:ring-transparent">
                    <i class="fa-solid fa-paper-plane"></i>
                  <span class="text-sm font-semibold leading-6">Correo</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="relative hidden w-0 flex-1 lg:block">
        <img class="absolute inset-0 h-screen  w-full object-cover " src="images/cartagena.webp" alt="" />
      </div>
    </div>
  </template>
  
