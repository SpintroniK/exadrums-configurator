<template>
    <section>
      <section class="hero is-primary">
        <div class="hero-body">
          <div class="container">
            <h1 class="title">
              eXaDrums Configurator
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
            Answer a few questions to get a custom user guide so that you can start building your drum kit. 
            <!-- And if you're lazy,  -->
          </div>
        </div>
      </section>
  
      <div class="container has-text-centered">
        <h1 class="title">Software Installation</h1>
      </div>
      <div class="container">
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
                  </b-field>
                  <b-field v-if="software_guidelines">
                    <b-radio-button v-model="installation_method" native-value="from_source">
                        <b-icon icon="cogs"></b-icon>
                        <span>Build from source</span>
                    </b-radio-button>
                  </b-field>
              </div>
            </section>
          </div>
        </div>
      </div>

      <div class="container has-text-centered">
        <h1 class="title">User Interface</h1>
      </div>
      <div class="container">
        <div class="columns has-text-justified">
          <div class="column">
            <section class="section">
             EXaDrums uses a touchscreen interface, and also works on a desktop environment, 
             but the user interface is optional and you can also choose to develop your own.
             The native interface uses GTK, which means that it looks like most Linux software.
             The modern interface uses Electron, it is more dynbamic than the native interface, 
             and provides a lot more features.

            </section>
          </div>
          <div class="column">
            <section class="section">
              <div class="field">
                <b-switch v-model="include_ui">Include user interface.</b-switch><br><br>
                <span v-if="include_ui">User Interface type: </span>
                <b-field>
                  <b-radio-button v-if="include_ui" v-model="uiType" native-value="native">
                      <b-icon icon="desktop"></b-icon>
                      <span>Native (GTK)</span>
                  </b-radio-button>
                </b-field>
                <b-tooltip style="width: 100%" label="Not available, yet..." position="is-bottom">
                  <b-field  v-if="include_ui" style="width: 100%;">
                    <b-radio-button v-model="uiType" native-value="modern" disabled>
                        <b-icon icon="tablet-alt"></b-icon>
                        <span>Modern (Electron)</span>
                    </b-radio-button>
                  </b-field>
                </b-tooltip>
              </div>
            </section>
          </div>
        </div>
      </div>
  
      <div class="container has-text-centered">
        <h1 class="title">Triggers</h1>
      </div>
      <div class="container">
        <div class="columns has-text-justified">
          <div class="column">
            <section class="section">
              At the moment, you can only get 8 triggers, but in a near future there will be another option to get 16 triggers.
            </section>
          </div>
          <div class="column">
            <section class="section">
              <div class="field">
                Number of triggers: 
                <b-field>
                  <b-radio-button v-model="nbTriggers" native-value="8">
                      <b-icon icon="drum"></b-icon>
                      <span>8 Triggers</span>
                  </b-radio-button>
                </b-field>
                <b-tooltip style="width: 100%" label="Not available, yet..." position="is-bottom">
                  <b-field style="width: 100%;">
                    <b-radio-button v-model="nbTriggers" native-value="16" disabled>
                        <b-icon icon="drum"></b-icon>
                        <span>16 Triggers</span>
                    </b-radio-button>
                  </b-field>
                </b-tooltip>
              </div>
            </section>
          </div>
        </div>
      </div>

      <section class="section">
        <div class="container has-text-justified">
          <h1 class="title">Get Ready!</h1>
          <div class="block">
            Click the "Generate" button to generate your personal user guide.
            It will be available from the generated link and QR code.
            If you wish to make modifications, you can update the QR code and link by clicking the "Update" button.
          </div>
        </div>
      </section>
      <div class="container">
        <div class="columns has-text-justified">
          <div class="column">
            <section class="section">
              <b-button :label="generate_label" @click="generate_qr_code"></b-button>
            </section>
          </div>
          <div class="column">
            <section class="section">
              <span v-if="show_qr_code">
                <qrcode-vue :value="url" :size="size" level="H" renderAs="canvas"></qrcode-vue>
              </span>
              data = {{url}}
            </section>
          </div>
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

  const codec = require('json-url')('lzw')

  export default {
    components: 
    {
      QrcodeVue,
    },
    data() 
    {
      return {
        installation_method: 'package_manager',
        uiType: 'native',
        qrData: {v: 0, s: 0},
        url: 'https://exadrums.com',
        size: 120,
        software_guidelines: true,
        include_ui: true,
        triggers_number: 8,
        generate_label: 'Generate Custom User Guide',
        show_qr_code: false,
      }
    },
    methods:
    {
      async computeUrl()
      {
        const urlData = await codec.compress(this.qrData)
        this.url = `https://make.exadrums.com/?d=${urlData}`
        console.log(this.url)
      },
      async generate_qr_code() 
      {
        this.show_qr_code = true
        this.generate_label = 'Update Custom User Guide'
        await this.computeUrl()
      }
    },
    computed:
    {
      nbTriggers()
      {
        return this.triggers_number.toString()
      }
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