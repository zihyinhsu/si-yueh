import BsModal from 'bootstrap/js/dist/modal'

export default {
  data () {
    return {
      modal: ''
    }
  },
  methods: {
    openModal () {
      this.modal.show()
    },
    hideModal () {
      this.modal.hide()
    }
  },
  mounted () {
    this.modal = new BsModal(this.$refs.modal)
  }
}
