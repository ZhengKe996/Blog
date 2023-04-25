<template>
  <div class="prose m-auto mb-8 select-none">
    <div mb-0
         flex="~ gap-3"
         text-3xl>
      <router-link to="/posts"
                   class="!border-none !font-400"
                   :class="route.path === '/posts' ? '' : inactiveStyle">
        Blog
      </router-link>

      <router-link to="/talks"
                   class="!border-none !font-400"
                   :class="route.path === '/talks' ? '' : inactiveStyle">
        Talks
      </router-link>

      <router-link to="/computer-science-notes"
                   class="!border-none !font-400"
                   :class="route.path === '/computer-science-notes' ? '' : inactiveStyle">
        计导笔记
      </router-link>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRoute } from "vue-router";

const inactiveStyle = "opacity-20 hover:opacity-50";

const route = useRoute();
</script>
