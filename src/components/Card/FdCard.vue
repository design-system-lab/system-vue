<template>
  <section class="fd-card">
    <slot>
      <div class="fd-card__image">
        <slot name="image"></slot>
      </div>
      <div class="fd-card__content-container">
        <div class="fd-card__header">
          <slot name="header">
            <div class="fd-card__overline">
              <slot name="overline"></slot>
            </div>
            <h5 class="fd-card__title">
              <slot name="title"></slot>
            </h5>
          </slot>
        </div>
        <div class="fd-card__content">
          <slot name="content"></slot>
        </div>
      </div>
      <div class="fd-card__action">
        <slot name="action"></slot>
      </div>
    </slot>
  </section>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "FdCard",
});
</script>

<style lang="scss" scoped>
@import "@/styles/required";

.fd-card {
  background-color: rgba(var(--fora_card_bg));
  border: $card_border rgba(var(--fora_card_border-color));
  border-radius: $card_border-radius;
  box-shadow: $card_box-shadow;
  display: flex;
  flex-direction: column;
  gap: $card_gap;
  padding: $card_padding;
  width: 100%;

  &__image {
    border-radius: $card_image_border-radius;
    overflow: hidden;
  }

  &__content-container {
    display: flex;
    flex-direction: column;
    gap: $card_content_gap;
  }

  &__header {
    display: flex;
    flex-direction: column;
    gap: $card_header_gap;
  }

  &__overline {
    color: rgba(var(--fora_card_overline_color));
    font-size: $card_overline_font-size;
    font-weight: $card_overline_font-weight;
    line-height: $card_overline_line-height;
  }

  &__title {
    color: rgba(var(--fora_card_title_color));
    font-size: $card_title_font-size;
    font-weight: $card_title_font-weight;
    line-height: $card_title_line-height;
  }

  &__content {
    color: rgba(var(--fora_card_content_color));
    font-size: $card_content_font-size;
    font-weight: $card_content_font-weight;
    line-height: $card_content_line-height;
  }

  &__action {
    display: flex;
    gap: $card_action_gap;
  }
}
</style>