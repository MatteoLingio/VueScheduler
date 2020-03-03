<template>
<div class="calendar__body">
    <div class="calendar__body-left">
        <div v-for="h in hours" :key="h" class="calendar__body-left-slot">
            <span class="calendar__body-left-hour">{{h}}</span>
        </div>
    </div>
    <div class="calendar__body-right">
        <!-- <div v-for="h in hours" :key="h.id" class="calendar__body-right-tilecontainer">
            
        </div> -->

        <div :id="h" :ref="h" v-for="h in hours" @drop="onDrop" @dragover.prevent @dragenter.prevent :key="h.id" class="calendar__body-right-slot">
            <!-- <MobileCalendarTile :nodes="$refs" v-for="ev in dailyEvents[h]"  @target="pushTarget" @end="visibleTarget" :key="ev.id" :ev="ev" :margin="ev.margin" :h="ev.height" /> -->
        </div>
    </div>
</div>
</template>

<script lang="ts">
import {
    Vue,
    Component,
} from 'vue-property-decorator';
import Ts from '../utils/TimeSets';

@Component({})
export default class VueSchedulerDayBody extends Vue {
    private positionMap: [] = [];
    private targets: [] = [];
    private hours = Ts.workDay;
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
        // overflow-y: scroll;
        width: 100%;
        position: relative;
        display: flex;
        flex-direction: column;

        &-slot {
            flex: 1 1 auto;
            // position: absolute;
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
