<template>
    <nav aria-label="Page navigation">
        <ul class="pagination d-flex align-items-center">
            <li class="page-item" :class="{'disabled':!pages.has_pre}">
            <a class="page-link" href="#" aria-label="Previous"
            @click.prevent="$emit('page-update',pages.current_page-1)">
                <span class="material-icons-outlined" aria-hidden="true">
                navigate_before
                </span>
            </a>
            </li>

            <li class="page-item" v-for="(page,i) in pages.total_pages" :key="i"
            :class="{'active':page === pages.current_page}">
                <a class="page-link" href="#" @click.prevent="$emit('page-update',page)">{{page}}</a></li>

            <li class="page-item" :class="{'disabled':!pages.has_next}">
            <a class="page-link" href="#" aria-label="Next"
            @click.prevent="$emit('page-update',pages.current_page+1)">
                <span class="material-icons-outlined" aria-hidden="true">
                navigate_next
                </span>
            </a>
            </li>
        </ul>
    </nav>
</template>

<script>
export default {
  props: ['pages']
}
</script>
