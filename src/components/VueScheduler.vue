<template>
    <VueSchedulerWrapper :evs="events"/>
</template>

<script lang='ts'>
import { Component, Vue } from 'vue-property-decorator';
import VueSchedulerWrapper from './VueSchedulerWrapper.vue';

@Component({
    components: {
        VueSchedulerWrapper,
    },
})

export default class VueScheduler extends Vue {
    public events = [{
                id: '1',
                title: 's',
                start: '2020-03-03T06:40:00.000Z',
                end: '2020-03-03T15:08:00.000Z',
                status: 'todo',
                backgroundColor: '',
                type: 'Revamping',
                description: 'd',
                companyName: 'asd',
                note: null,
                allDay: false,
                color: 'lightblue',
            },
            {
                id: '2',
                title: 's',
                start: '2020-03-03T06:40:00.000Z',
                end: '2020-03-03T11:09:00.000Z',
                status: 'todo',
                backgroundColor: '',
                type: 'Revamping',
                description: 'd',
                companyName: 'asd',
                note: null,
                allDay: false,
                color: 'coral',
            },
            {
                id: '3',
                title: 's',
                start: '2020-03-03T06:00:00.000Z',
                end: '2020-03-01T07:00:00.000Z',
                status: 'todo',
                backgroundColor: '',
                type: 'Revamping',
                description: 'd',
                companyName: 'asd',
                note: null,
                allDay: false,
                color: 'green',
            } ];
}
</script>