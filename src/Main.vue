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
                  <b-radio-button v-model="nbTriggers" native-value="16" disabled>
                      <b-icon icon="drum"></b-icon>
                      <span>16 Triggers</span>
                  </b-radio-button>
                </b-field>
              </div>
            </section>
          </div>
        </div>
      </div>

      <div class="container has-text-centered">
        <h1 class="title">Customize your kit</h1>
      </div>
      <div class="container">
        <div class="columns has-text-justified">
          <div class="column">
            <section class="section">
              Number of triggers left: {{nbTriggersLeft}}
                  <section class="mt-3">
                    <b-collapse class="card" animation="slide" aria-id="contentIdForA11y3">
                      <template #trigger="props">
                          <div class="card-header" role="button" aria-controls="contentIdForA11y3">
                              <p class="card-header-title">
                                  Instruments
                              </p>
                              <a class="card-header-icon">
                                  <b-icon :icon="props.open ? 'angle-down' : 'angle-up'"></b-icon>
                              </a>
                            </div>
                        </template>
                      <section class="m-3" v-for="(instrument, i) in instruments" :key="i">
                        {{instrument.text}}
                      </section>
                    </b-collapse>
                </section>
            </section>
          </div>
          <div class="column">
            <section class="section">
              <h2 class="subtitle">Add instrument</h2>
              <b-field label="Name">
                  <b-input v-model="currentInstrument.name"></b-input>
              </b-field>
              <section>
                <b-dropdown :scrollable="true" v-model="selectedInstrumentMenu" aria-role="list" class="mb-3">
                    <template #trigger="{ active }">
                        <b-button :label="selectedInstrumentMenu.text" type="is-primary" :icon-left="selectedInstrumentMenu.icon" 
                                  :icon-right="active ? 'angle-up' : 'angle-down'" />
                    </template>
                    <b-dropdown-item v-for="(menu, index) in instrumentsMenu" :key="index" :value="menu" aria-role="listitem">
                        <div class="media">
                            <b-icon class="media-left" :icon="menu.icon"></b-icon>
                            <div class="media-content">
                                <h3>{{menu.text}}</h3>
                            </div>
                        </div>
                    </b-dropdown-item>
                </b-dropdown>
              </section>
              <section>
                  <b-dropdown :scrollable="true" aria-role="list" v-model="selectedTriggerMenu" class="mb-3">
                    <template #trigger="{ active }">
                        <b-button :label="selectedTriggerMenu.name" type="is-primary" :icon-right="active ? 'angle-up' : 'angle-down'" />
                    </template>
                    <b-dropdown-item v-for="(item, index) in triggersMenu" :key="index" aria-role="listitem" :value="item">{{item.name}}</b-dropdown-item>
                </b-dropdown>
              </section>
              <b-button icon-left="plus" type="is-primary" @click="addInstrument" :disabled="nbTriggersLeft - selectedTriggerMenu.nb_sensors < 0">
                  Add
              </b-button>
            </section>
          </div>
        </div>
        <div class="container" id="canvas-container">
          <div v-bind:style="{ height: '100%', width: '100%' }" ref="container">
            <v-stage ref="stage" :config="stageSize" @mousedown="handleStageMouseDown" @touchstart="handleStageMouseDown">
              <v-layer ref="layer">
                <v-group v-for="(instrument, i) in instruments" :key="i" 
                         :config="{ draggable: true }" 
                         @dragstart="handleDragStart" @dragend="handleDragEnd">
                  <v-image :config="{
                      name: toCodeName(instrument.text),
                      image: instrument.image,
                      x: 0,
                      y: 0,
                      width: 100,
                      height: 100
                    }" @transformend="handleTransformEnd" />
                  <v-text ref="text" :config="{
                      text: instrument.text,
                      x: 0,
                      y: -15,
                      fontSize: 20,
                      fontFamily: 'Calibri',
                      fill: 'black',
                      draggable: true
                    }" />
                </v-group>
                <v-transformer ref="transformer" />
              </v-layer>
            </v-stage>
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
                <qrcode-vue :value="value" :size="size" level="H" renderAs="canvas"></qrcode-vue>
              </span>
              <!-- {{value}} -->
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

    export default {
        data() 
        {
          const instrumentsMenu = [
            { icon: 'drum', text: 'Snare Drum' },
            { icon: 'drum', text: 'Bass Drum' },
            { icon: 'drum', text: 'Tom' },
            { icon: 'record-vinyl', text: 'Cymbal' }
          ]

          const triggersMenu = [
            { name: "Pad", nb_sensors: 1},
            { name: "Dual Zone Pad", nb_sensors: 2},
            { name: "Hi-Hat", nb_sensors: 1}
          ]

          return {
            instruments: [],
            images: [],
            stageSize: { width: 300, height: 480 },
            installation_method: 'package_manager',
            value: '',
            size: 120,
            software_guidelines: true,
            triggers_number: 8,
            generate_label: 'Generate Custom User Guide',
            show_qr_code: false,
            currentInstrument: {name: 'Snare Drum', type: 'Pad', sounds: [], triggers: [], imageName: 'cymbal', codeName: ''},
            selectedInstrumentMenu: instrumentsMenu[0], instrumentsMenu: instrumentsMenu,
            selectedTriggerMenu: triggersMenu[0], triggersMenu: triggersMenu,
            selectedShapeName: ''
          }
        },
        computed:
        {
          nbTriggers()
          {
            return this.triggers_number.toString()
          },
          nbTriggersLeft()
          {
            const instrumentsTriggers = this.instruments.map(i => i.trigger)

            let nb_used_triggers = 0

            for(let it of instrumentsTriggers)
            {
              const nbs = this.triggersMenu.find(t => t.name == it).nb_sensors
              nb_used_triggers += nbs;
            }

            return this.triggers_number - nb_used_triggers
          }
        },
        methods:
        {
          addInstrument() 
          {
            
            // console.log(this.$refs.text.getNode().destroy())
            // this.$buefy.dialog.alert(`Instrument: ${this.selectedInstrumentMenu.text}<br>Trigger : ${this.selectedTriggerMenu}`)

            this.instruments.push({image: this.images[1].image, text: this.currentInstrument.name, trigger: 'Dual Zone Pad'})
            //TODO: Avoid duplicate names
            //TODO: Use valid instrument names for transformer
          },
          toCodeName(s)
          {
            return s.replace(/\s+/g, '')
          },
          generate_qr_code() 
          {
            this.show_qr_code = true
            this.value = 'https://make.exadrums.com/?id=123'
            this.generate_label = 'Update Custom User Guide'
          },
          handleDragStart(e) 
          {
          },
          handleDragEnd(e) 
          {
            console.log('target elements = ', e.target.children)
          },
          handleTransformEnd(e)
          {
            // shape is transformed, let us save new attrs back to the node
            // find element in our state
            const inst = this.instruments.find(i => this.toCodeName(i.text) === this.selectedShapeName)
            console.log('instrument = ', inst)
          },
          handleStageMouseDown(e) 
          {
            // clicked on stage - clear selection
            if(e.target === e.target.getStage()) 
            {
              this.selectedShapeName = ''
              this.updateTransformer()
              return
            }

            // clicked on transformer - do nothing
            const clickedOnTransformer = e.target.getParent().className === 'Transformer'
            if(clickedOnTransformer) 
            {
              return
            }

            // find clicked rect by its name
            const name = e.target.name()
            const rect = this.instruments.find(i => this.toCodeName(i.text) === name)

            if(rect) 
            {
              this.selectedShapeName = name
            } 
            else 
            {
              this.selectedShapeName = ''
            }

            this.updateTransformer()
          },
          updateTransformer() 
          {
            // here we need to manually attach or detach Transformer node
            const transformerNode = this.$refs.transformer.getNode()
            const stage = transformerNode.getStage()
            const { selectedShapeName } = this

            const selectedNode = stage.findOne('.' + selectedShapeName)
            console.log(selectedShapeName)
            // do nothing if selected node is already attached
            if(selectedNode === transformerNode.node()) 
            {
              return
            }

            if(selectedNode)
            {
              // attach to another node
              transformerNode.nodes([selectedNode])
            }
            else 
            {
              // remove transformer
              transformerNode.nodes([])
            }
            transformerNode.getLayer().batchDraw()
          },
          changeRect() 
          {
            const container = this.$refs.container

            if(!container)
              return

            const height = container.offsetHeight
            const width = container.offsetWidth

            // console.log(height, height)
            this.stageSize.width = width
            this.stageSize.height = height

            // console.log(this.$refs.layer.getNode().children[0].position())
     
          }
        },
    components: 
    {
      QrcodeVue,
    },
    mounted() 
    {

      window.addEventListener("resize", this.changeRect)
      this.changeRect()

      const images = [{name: 'snare', src: './assets/images/snare.svg'},
                      {name: 'cymbal', src: './assets/images/cymbal.svg'}]

      for(let im of images)
      {
        const image = new Image()
        image.src = im.src
        this.images.push({ name: im.name, image: image })
      }
      // const con = this.$refs.stage.getNode().container()
    }
  }
</script>

<style scoped>
  #canvas-container
  {
    height: 100%;
  }
</style>


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