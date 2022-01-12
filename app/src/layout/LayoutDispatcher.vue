<template>
    <component :is="componentSwicher">
        <template 
            v-for="slotName in Object.keys($slots)"
            :key="slotName"
            v-slot:[slotName]="slotProps"
        >
            <slot :name="slotName" v-bind="slotProps" />
        </template>
    </component>
</template>

<script>

import defaultLayout from '@/components/layout/defaultLayout.vue';
import settingslayout from '@/components/layout/settingsLayout.vue';

import { useLayout } from '@/composables/useLayout'

const {layout, LAYOUT} = useLayout();
const layoutsDef = {
    [LAYOUT.default]: defaultLayout,
    [LAYOUT.settings]: settingslayout
};



export default {
    computed: { 
        componentSwicher () {
            return layoutsDef[layout.value]
        }
    }
}
</script>
