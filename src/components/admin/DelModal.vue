<template>
    <div class="modal fade" ref="modal" tabindex="-1">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content" style="background-color:transparent;">
        <div class="modal-header bg-secondary">
          <h5 class="modal-title text-white">刪除選取項目</h5>
          <!-- <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button> -->
        </div>
        <div class="modal-body bg-white">
          <p>真的確定要刪除嗎?</p>
        </div>
        <div class="modal-footer border-0 bg-white">
          <button type="button" class="btn btn-outline-secondary" data-bs-dismiss="modal">取消</button>
          <button type="button" class="btn btn-secondary text-white">刪除</button>
        </div>
      </div>
    </div>
</div>
</template>

<script>
import modalMixin from '@/mixins/modalMixin'

export default {
  mixins: [modalMixin]
}
</script>
