<!-- This example requires Tailwind CSS v2.0+ -->
<template>
  <div class="relative overflow-hidden">
    <img
      class="absolute inset-0 -z-50 h-full w-full object-cover"
      src="/app/assets/img/bg.png"
      alt=""
    />

    <main class="h-screen w-screen lg:relative">
      <div class="mx-auto w-full max-w-7xl pt-16 pb-20 text-center lg:py-48 lg:text-left">
        <div class="px-4 sm:px-8 lg:w-1/2 xl:pr-16">
          <h1
            class="text-4xl font-extrabold tracking-tight text-slate-50 sm:text-5xl md:text-6xl lg:text-5xl xl:text-6xl"
          >
            <span class="block xl:inline">WEB3 Empowered </span>
            <span class="block text-slate-50 xl:inline">Marketing Advisor</span>
          </h1>
          <p
            class="mx-auto mt-3 max-w-md text-lg text-slate-200 sm:text-xl md:mt-5 md:max-w-3xl"
          >
            Get a Marketing Advise from over 200 Marketing Expert, based on your
            situation, product and target group with an exact guideline how to do your
            marketing. Fully on Web3.
          </p>
          <div class="mt-10 sm:flex sm:justify-center lg:justify-start">
            <div class="min-w-full rounded-md shadow">
              <a
                href="#"
                class="flex w-full items-center justify-center rounded-md border border-transparent bg-orange-500 px-8 py-3 text-base font-medium text-white hover:bg-orange-600 md:py-4 md:px-10 md:text-lg"
              >
                Log-In with Internet Identity
              </a>
            </div>
          </div>
          <div class="mt-10 w-full sm:flex sm:justify-center lg:justify-start">
            <div class="mt-3 min-w-full rounded-md shadow sm:mt-0">
              <a
                href="#"
                class="flex w-full items-center justify-center rounded-md border border-transparent bg-slate-600 px-8 py-3 text-base font-medium text-white hover:bg-slate-700 md:py-4 md:px-10 md:text-lg"
              >
                Create an Internet Identity
              </a>
            </div>
          </div>
          <div class="mt-10 w-full sm:flex sm:justify-center lg:justify-start">
            <div class="mt-3 min-w-full rounded-md sm:mt-0">
              <a
                href="https://internetcomputer.org/docs/current/tokenomics/identity-auth/what-is-ic-identity/"
                class="flex w-full items-center justify-center rounded-md px-8 py-3 text-base font-medium text-white underline underline-offset-4 md:py-4 md:px-10 md:text-lg"
              >
                What is an Internet Identity?
              </a>
            </div>
          </div>
        </div>
      </div>
      <div
        class="relative h-64 w-full sm:h-72 md:h-96 lg:absolute lg:inset-y-0 lg:right-0 lg:h-full lg:w-1/2"
      >
        <img
          class="invisible inset-0 my-24 mx-8 h-auto w-4/6 md:visible"
          src="/app/assets/img/logos.png"
          alt=""
        />
      </div>
    </main>
  </div>
</template>

<script setup></script>
