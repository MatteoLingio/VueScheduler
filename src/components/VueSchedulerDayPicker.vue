<template>
<div class="calendar-header">
    <div class="calendar__header-subheader">
        <span @click="today(new Date())" class="calendar__header-subheader-today">Oggi</span>
        <span class="calendar__header-subheader-month">{{monthMap[days[0].getMonth()] || null}} </span>
    </div>
    <div class="calendar__header-days">
        <div class="calendar__header-day">
            <div @click="prevWeek">
                <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="chevron-left" class="svg-inline--fa fa-chevron-left fa-w-10" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512">
                    <path fill="currentColor" d="M34.52 239.03L228.87 44.69c9.37-9.37 24.57-9.37 33.94 0l22.67 22.67c9.36 9.36 9.37 24.52.04 33.9L131.49 256l154.02 154.75c9.34 9.38 9.32 24.54-.04 33.9l-22.67 22.67c-9.37 9.37-24.57 9.37-33.94 0L34.52 272.97c-9.37-9.37-9.37-24.57 0-33.94z"></path>
                </svg>
            </div>
        </div>
        <div @click="setDay(d)" v-for="d in days" :key="d.id" class="calendar__header-day">
            <span>{{dayMap[d.getDay()]}}</span>
            <div :class="getDayClass(d)">{{d.getDate()}}</div>
        </div>
        <div class="calendar__header-day">
            <div @click="nextWeek">
                <a>
                    <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="chevron-right" class="svg-inline--fa fa-chevron-right fa-w-10" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512">
                        <path fill="currentColor" d="M285.476 272.971L91.132 467.314c-9.373 9.373-24.569 9.373-33.941 0l-22.667-22.667c-9.357-9.357-9.375-24.522-.04-33.901L188.505 256 34.484 101.255c-9.335-9.379-9.317-24.544.04-33.901l22.667-22.667c9.373-9.373 24.569-9.373 33.941 0L285.475 239.03c9.373 9.372 9.373 24.568.001 33.941z"></path>
                    </svg>
                </a>
            </div>
        </div>
    </div>
</div>
</template>

<script lang="ts">
import Ts from '../utils/TimeSets';
import DateUtils from '../utils/DateUtils';
import {
    Vue,
    Component,
} from 'vue-property-decorator';
import {
    mapState,
    mapMutations,
} from 'vuex';

@Component({
    computed: mapState([
        'daySelected',
    ]),

    methods: mapMutations([
        'setDaySelected',
    ]),
})

export default class VueSchedulerDayPicker extends Vue {

    public daySelected!: Date;
    public setDaySelected!: any;
    private days: Date[] = [];
    private dayMap = Ts.dayMap;
    private monthMap = Ts.monthMap;

    private created() {
        this.getDates(new Date(), 'up');
    }

    private getDayClass(d: Date): string {
        return DateUtils.getfullDate(d) !== DateUtils.getfullDate(this.daySelected) ? 'calendar__header-day-num' : 'calendar__header-day-active';
    }

    private getDates(current: Date, direction: string) {
        this.days = [];
        if (direction === 'up') {
            current.setDate((current.getDate() - current.getDay() + 1));
        } else {
            current.setDate((current.getDate() - current.getDay()));
        }
        for (let i = 0; i < 7; i++) {
            this.days = [...this.days, (new Date(current))];
            direction === 'up' ? current.setDate(current.getDate() + 1) : current.setDate(current.getDate() - 1);
        }

        if (direction === 'down') {
            this.days = this.days.reverse();
        }

        this.setDaySelected(new Date());
    }

    private setDay(v: Date) {
        this.setDaySelected(v);
    }

    private nextWeek() {
        this.getDates(this.days[6], 'up');
    }

    private prevWeek() {
        this.getDates(this.days[0], 'down');
    }

    private today(v: Date) {
        this.getDates(v, 'up');
    }
}
</script>

<style lang="scss">
.calendar__header {
    width: 100%;

    &-subheader {
        display: grid;
        grid-template-columns: 1fr;
        grid-template-rows: 1fr;
        padding: 5px;

        &-today {
            justify-self: end;
            font-size: 13px;
            color: #EE3E5A;
            cursor: pointer;
            font-weight: 600;
        }

        &-month {
            display: inline-block;
            justify-self: center;
            margin-left: 10px
        }
    }

    &-days {
        display: flex;
        flex-direction: row;
        height: 80px;
        justify-content: space-between;
        margin: 5px;
        align-items: center;
    }

    &-day {

        color: grey;
        display: flex;
        flex-direction: column;
        align-items: center;
        cursor: pointer;

        svg {
            height: 20px;
        }

        &-active {
            display: flex;
            align-items: center;
            width: 50px;
            height: 50px;
            padding-left: 5px;
            padding-right: 5px;
            border-radius: 2px;
            background-color: #EE3E5A;
            color: white;
            justify-content: center;
        }

        &-num {
            display: flex;
            align-items: center;
            width: 50px;
            height: 50px;
            padding-left: 5px;
            padding-right: 5px;
            justify-content: center;
        }
    }
}
</style>
