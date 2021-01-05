<template>
    <section>
      <section class="hero is-primary">
        <div class="hero-body">
          <div class="container">
            <h1 class="title">
              eXaDrums Customizer
            </h1>
            <h2 class="subtitle">
              Configure your drum module
            </h2>
          </div>
        </div>
      </section>
      <div class="columns">
        <div class="column">
          <section class="section">
            <div class="container has-text-justified">
              <h1 class="title">Get Ready!</h1>
              <div class="block">
                This page is there to help you customize your drum module.
                After you answer a few questions to get a custom user guide so that you can start building your drum kit. 
              </div>
            </div>
          </section>
        </div>
        <div class="column">
          <section class="section">
            <div class="field">
                <b-switch>Include software installation guidelines.</b-switch>
            </div>
          </section>
        </div>
      </div>
      <div class="columns">
        <div class="column"> 
          <section class="section">
            <span @click="clickMe">
              <qrcode-vue :value="value" :size="size" level="H" renderAs="canvas"></qrcode-vue>
            </span>
            <input type="text" name="" id="" v-model="value" size="40">
          </section>
        </div>
        <div class="column">
        </div>
      </div>
    </section>
</template>

<script>

  import QrcodeVue from 'qrcode.vue'

    export default {
        data() {
            return {
                radioButton: '',
                value: 'https://make.exadrums.com/?id=123',
                size: 100
            }
        },
        methods:
        {
          clickMe() {
                this.$buefy.notification.open(`QR content: "${this.value}"`)
            }
        },
    components: {
      QrcodeVue,
    }
  }
</script>


<style lang="sass">

  @import "~bulma/sass/utilities/_all";

  $primary: #d23232;
  $primary-invert: findColorInvert($primary);
  $twitter: #4099FF;
  $twitter-invert: findColorInvert($twitter);

  $black: #141418;
  $white: #ececec;

  $colors: (
      "white": ($white, $black),
      "black": ($black, $white),
      "light": ($black, $white),
      "dark": ($dark, $dark-invert),
      "primary": ($primary, $primary-invert),
      "info": ($info, $info-invert),
      "success": ($success, $success-invert),
      "warning": ($warning, $warning-invert),
      "danger": ($danger, $danger-invert),
      "twitter": ($twitter, $twitter-invert)
  );

  $link: $primary;
  $link-invert: $primary-invert;
  $link-focus-border: $primary;

  @import "~bulma";
  @import "~buefy/src/scss/buefy.scss";
  @import "~buefy/src/scss/utils/_all.scss";

</style>