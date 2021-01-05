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
      <section class="section">
        <div class="container has-text-justified">
          <h1 class="title">Get Ready!</h1>
          <div class="block">
            This page is there to help you customize your drum module.
            After you answer a few questions to get a custom user guide so that you can start building your drum kit. 
          </div>
        </div>
      </section>
      <div class="container has-text-centered">
        <h1 class="title">Software</h1>
      </div>
      <div class="columns has-text-justified">
        <div class="column">
          <section class="section">
            eXaDrums software is available from some Debian-based Linux distributions, including: Debian, Ubuntu, and Raspberry Pi OS.
            Including software installation guidelines to your custom user guide gives you the choice of installing the official version of eXaDrums, 
            using your OS package manager, or build the latest version yourself.
          </section>
        </div>
        <div class="column">
          <section class="section">
            <div class="field">
                <b-switch v-model="software_guidelines">Include software installation guidelines.</b-switch><br><br>
                <span v-if="software_guidelines">Software installation method: </span>
                <b-field v-if="software_guidelines">
                  <b-radio-button v-model="installation_method" native-value="package_manager">
                      <b-icon icon="box-open"></b-icon>
                      <span>Package manager</span>
                  </b-radio-button>
                  <b-radio-button v-model="installation_method" native-value="from_source">
                      <b-icon icon="cogs"></b-icon>
                      <span>Build from source</span>
                  </b-radio-button>
                </b-field>
            </div>
          </section>
        </div>
      </div>
      <div class="columns">
        <div class="column"> 
          <section class="section">
            <!-- <span @click="clickMe">
              <qrcode-vue :value="value" :size="size" level="H" renderAs="canvas"></qrcode-vue>
            </span>
            <input type="text" name="" id="" v-model="value" size="40"> -->
          </section>
        </div>
        <div class="column">
        </div>
      </div>
      <footer class="footer">
        <div class="content has-text-centered">
          <p>
            <strong>eXaDrums</strong> by <a href="https://freewebmaster.fr" target="_blank">Jeremy Oden</a>.
          </p>
        </div>
      </footer>
    </section>
</template>

<script>

  import QrcodeVue from 'qrcode.vue'

    export default {
        data() {
            return {
                installation_method: 'package_manager',
                value: 'https://make.exadrums.com/?id=123',
                size: 100,
                software_guidelines: false
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