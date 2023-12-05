<script setup lang="ts">
import { isDark } from '~/logics'
</script>

<template>
  <header class="header z-40">
    <router-link
      class="w-10 h-10 absolute lg:fixed m-6 select-none outline-none"
      to="/"
      focusable="false"
    >
      <img v-show="isDark" src="/logo-dark.svg?url" alt="logo" />
      <img v-show="!isDark" src="/logo.svg?url" alt="logo" />
    </router-link>
    <nav class="nav">
      <div class="spacer" />
      <div class="right">
        <router-link to="/posts">
          <span class="lt-md:hidden">Blog</span>
          <ri-article-line class="md:hidden" />
        </router-link>

        <router-link to="/talks" class="lt-md:hidden"> Talks </router-link>

        <router-link to="/computer-science-notes" title="ComputerScienceNotes">
          <span class="lt-md:hidden">CS</span>
          <ri-lightbulb-line class="md:hidden" />
        </router-link>

        <router-link to="/ds" title="DS">
          <span class="lt-md:hidden">DS</span>
          <ri-ball-pen-line class="md:hidden" />
        </router-link>

        <router-link to="/juc" title="JUC">
          <span class="lt-md:hidden">JUC</span>
          <ri-hammer-line class="md:hidden" />
        </router-link>
        <!-- <router-link to="/cookbooks" title="菜谱">
          <span class="lt-md:hidden">菜谱😃</span>
          <ri-bar-chart-box-line class="md:hidden" />
        </router-link> -->

        <!-- <router-link to="/javascript"
                     title="JavaScript">
          <span class="lt-md:hidden">JavaScript</span>
          <ri-lightbulb-line class="md:hidden" />
        </router-link> -->

        <!-- <router-link to="/interview" title="Interview">
          <span class="lt-md:hidden">Interview</span>
          <ri-lightbulb-line class="md:hidden" />
        </router-link> -->

        <router-link to="/CLRS" title="CLRS">
          <span class="lt-md:hidden">CLRS</span>
          <ri-landscape-line class="md:hidden" />
        </router-link>

        <router-link to="/network">
          <span class="lt-md:hidden">NetWork</span>
          <x-entypo-network class="md:hidden" />
        </router-link>

        <router-link to="/notes" title="Notes">
          <ri-sticky-note-line class="lt-md:hidden" />
        </router-link>

        <a
          href="https://github.com/ZhengKe996"
          target="_blank"
          title="GitHub"
          class="lt-md:hidden"
        >
          <uil-github-alt />
        </a>
        <toggle-theme />
      </div>
    </nav>
  </header>
</template>

<style scoped>
.header h1 {
  margin-bottom: 0;
}

.logo {
  position: absolute;
  top: 1.5rem;
  left: 1.5rem;
}

.nav {
  padding: 2rem;
  width: 100%;
  display: grid;
  grid-template-columns: auto max-content;
  box-sizing: border-box;
}

.nav > * {
  margin: auto;
}

.nav img {
  margin-bottom: 0;
}

.nav a {
  cursor: pointer;
  text-decoration: none;
  color: inherit;
  transition: opacity 0.2s ease;
  opacity: 0.6;
  outline: none;
}

.nav a:hover {
  opacity: 1;
  text-decoration-color: inherit;
}

.nav .right {
  display: grid;
  grid-gap: 1.2rem;
  grid-auto-flow: column;
}

.nav .right > * {
  margin: auto;
}
</style>
