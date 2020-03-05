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
import {
    mapMutations,
} from 'vuex';
import VueSchedulerDayPicker from './VueSchedulerDayPicker.vue';
import VueSchedulerDayBody from './VueSchedulerDayBody.vue';

@Component({
    components: {
        VueSchedulerDayPicker,
        VueSchedulerDayBody,
    },
    methods: mapMutations([
        'setEvents',
    ]),
})

export default class VueSchedulerWrapper extends Vue {
    @Prop() public evs!: [];
    public setEvents!: any;

    private created() {
        this.setEvents(this.evs);
    }
}
</script>

<style lang="scss">
.calendar-container {
    height: 100%;
    width: 100%;
    background-color: white;
}
</style>
