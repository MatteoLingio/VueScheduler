<template>
<div>
    <VueSchedulerDayPicker />
    <VueSchedulerDayBody />
</div>
</template>

<script lang="ts">
import {
    Component,
    Vue,
    Prop,
} from 'vue-property-decorator';
import VueSchedulerDayPicker from './VueSchedulerDayPicker.vue';
import VueSchedulerDayBody from './VueSchedulerDayBody.vue';

@Component({
    components: {
        VueSchedulerDayPicker,
        VueSchedulerDayBody,
    },
})

export default class VueSchedulerWrapper extends Vue {
    @Prop() public events!: [];
}
</script>

<style lang="scss">
.calendar-container {
    height: 100%;
    width: 100%;
    background-color: white;
}
</style>
