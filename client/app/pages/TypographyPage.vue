<template>
  <div>
    <h1>Typography</h1>
    <br>
    <h1 class="display-lg">Display Large</h1><br>
    <h1 class="display-md">Display Medium</h1><br>
    <h1 class="display-sm">Display Small</h1><br>
    <h1 class="display-xs">Display X-Small</h1><br>

    <h1>Heading 1</h1><br>
    <h2>Heading 2</h2><br>
    <h3>Heading 3</h3><br>
    <h4>Heading 4</h4><br>
    <h5>Heading 5</h5><br>
    <h6>Heading 6</h6><br>

    <p class="font-lg">Font Large</p><br>
    <p>Font Base</p><br>
    <p class="font-sm">Font Small</p><br>
    <p class="font-xs">Font X-Small</p><br>

    
    <p class="font-thin">Font Thin</p><br>
    <p class="font-light">Font Light</p><br>
    <p class="font-regular">Font Regular</p><br>
    <p class="font-medium">Font Medium</p><br>
    <p class="font-bold">Font Bold</p><br>
    <p class="font-black">Font Black</p><br>

    <p><em>Font Italic</em></p><br>
    <p><strong>Font Bold (strong)</strong></p><br>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'TypographyPage',
})
</script>