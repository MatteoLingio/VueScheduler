<template>
<div class="calendar__body">
    <div class="calendar__body-left">
        <div v-for="h in hours" :key="h" class="calendar__body-left-slot">
            <span class="calendar__body-left-hour">{{h}}</span>

        </div>
    </div>
    <div class="calendar__body-right">
        <div :id="h" :ref="h" v-for="h in hours" :key="h.id" class="calendar__body-right-slot">
            <VueSchedulerTile v-for="ev in dailyEvents[h]" :nodes="$refs" :key="ev.id" :event="ev" :margin="ev.margin" :h="ev.height" />
        </div>
    </div>
</div>
</template>

<script lang="ts">
import {
    Vue,
    Component,
    PropSync,
} from 'vue-property-decorator';
import {
    mapState,
} from 'vuex';
import Ts from '../utils/TimeSets';
import Utils from '../utils/Utils';
import DateUtils from '../utils/DateUtils';
import Event from '../Models/Event';
import VueSchedulerTile from './VueSchedulerTile.vue';

@Component({
    components: {
        VueSchedulerTile,
    },
    computed: mapState([
        'daySelected',
        'events',
    ]),
})
export default class VueSchedulerDayBody extends Vue {
    public events!: [Event];
    public daySelected!: Date;
    private positionMap: object[] = [];
    private targets: [] = [];
    private hours = Ts.workDay;

    get dailyEvents() {
        const daily = DateUtils.buildTimeMap(this.hours);
        this.events.forEach((ev: Event) => {
            const d = new Date(ev.getStart());
            if (DateUtils.getfullDate(d) === DateUtils.getfullDate(this.daySelected)) {
                this.positionMap.forEach((x) => {
                    if (Utils.getKeyValue('id')(x) === DateUtils.getHour(d)) {
                        ev.setEventPosition(d.getMinutes(), DateUtils.getMinutesFromHours(ev.getStart(), ev.getEnd()));
                        Utils.getKeyValue(DateUtils.getHour(d))(daily).push(ev);
                    }
                });
            }
        });
        return daily;
    }

    private mounted() {
        this.hours.forEach((h) => {
            const k = Utils.getKeyValue(h)(this.$refs);
            this.$nextTick(() => {
                this.positionMap = [...this.positionMap, {
                    id: h,
                    marginTop: k[0].offsetTop,
                }];
            });
        });
    }
}
</script>

<style lang="scss">
.calendar__body {
    display: flex;
    flex-direction: row;
    height: 100%;
    width: 100%;
    border: 0.5px solid #eeeeee;
    overflow-y: scroll;

    &-left {
        width: 70px;

        &-slot {
            width: 100%;
            height: 60px;
            border-right: 1px solid #eeeeee;
        }
    }

    &-right {
        height: 100%;
        width: 100%;
        position: relative;
        display: flex;
        flex-direction: column;

        &-slot {
            flex: 1 1 auto;
            width: 100%;
            height: 60px;
            border-bottom: 1px solid #eeeeee;
            display: flex;
            flex-direction: row;
            flex-wrap: wrap;
            overflow-y: visible;
        }
    }
}
</style>
