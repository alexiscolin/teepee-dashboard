<template>
    <layout>
        <template #header>
            <p>Header</p>
        </template>
        <template #sidebar>
            <p>Sidebar</p>
        </template>
        <template #main>
            <p>Main</p>
        </template>
        <template #footer>
            <p>Footer</p>
        </template>
    </layout>
</template>

<script>
import layout from '@/components/layout/LayoutDispatcher.vue';

export default {
    components: {
        layout
    }
}
</script>