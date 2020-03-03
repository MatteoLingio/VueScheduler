<template>
    <VueSchedulerWrapper />
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import VueSchedulerWrapper from './VueSchedulerWrapper.vue';

@Component({
    components: {
        VueSchedulerWrapper,
    },
})

export default class VueScheduler extends Vue {}
</script>