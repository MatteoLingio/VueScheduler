<template>
<div :id="event.id" @touchstart.prevent="dragMouseDown" @mousedown.prevent="dragMouseDown" :ref="event.id" class="calendar__tile" :style="{ backgroundColor: event.color, height: event.height + 'px' }">
</div>
</template>

<script lang="ts">
import Ts from '../utils/TimeSets';
import {
    Vue,
    Component,
    Prop,
} from 'vue-property-decorator';
import Utils from '../utils/Utils';

@Component({})
export default class VueSchedulerTile extends Vue {
    @Prop() public event!: Event;
    @Prop() public nodes!: [];

    private pos: number = 0;
    private elmnt: any = null;

    private mounted() {
        this.spaceCalc();
    }

    private dragMouseDown(e: any) {
        e.preventDefault();
        this.elmnt = e.target;
        this.pos = e.clientY;
        this.elmnt.style.zIndex = 1001;
        const cl = this.createGhost(this.elmnt);
        this.elmnt.parentElement.appendChild(cl);
        window.document.onmouseup = this.closeDragElement;
        window.document.onmousemove = this.elementDragMouse;

    }

    private elementDragMouse(e: any) {
        e.preventDefault();
        // debugger;
        if (Math.abs(this.pos - e.clientY) >= 60) {
            if (e.movementY < 0) {
                if (this.elmnt.offsetTop - 60 > 0) {
                    this.elmnt.style.top = (this.elmnt.offsetTop - 60) + 'px';
                }
            } else {
                this.elmnt.style.top = (this.elmnt.offsetTop + 60) + 'px';

            }
            this.pos = e.clientY;
        }

    }

    private closeDragElement() {
        const key = Math.round(this.elmnt.offsetTop / 60);
        const a: any = this.nodes[Utils.getKeyValue(key)(Ts.workMap)];
        this.elmnt.parentElement.removeChild(this.elmnt);
        a[0].appendChild(this.elmnt);

        this.elmnt.style.top = '';
        this.elmnt.style.zIndex = 1000;
        this.removeGhost(this.elmnt);
        this.spaceCalc();

        window.document.onmouseup = null;
        window.document.onmousemove = null;
    }

    

    private createGhost(el: any): any {
        const clone = el.cloneNode(true);
        clone.id = clone.id + 'cln';
        clone.style.opacity = 0.5;
        return clone;
    }

    private removeGhost(el: any): any{
        const ghost: any = document.getElementById(el.id + 'cln');
        ghost.parentNode.removeChild(ghost);
    }

    private spaceCalc() {
        for (const [k, n] of Object.entries(this.nodes)) {
            if (Utils.getKeyValue('children')(n[0]).length > 0) {
                for (const [i, c] of Object.entries(Utils.getKeyValue('children')(n[0]))) {
                    const tmp: any = c;
                    tmp.style.width = 100 / Utils.getKeyValue('children')(n[0]).length + '%';
                    tmp.style.left = (parseInt(i, 10) * (100 / Utils.getKeyValue('children')(n[0]).length)) + '%';
                }
            }

        }
    }
}
</script>

<style lang="scss">
.calendar__tile {
    cursor: move;
    border: solid 1px white;
    margin: 1px;
    position: absolute;
    border-radius: 10px;
    background-color: coral;
    height: 60px;
    width: 100%;
    z-index: 1000;
}
</style>
