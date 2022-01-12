<template>
    <div>
        <header>
            <slot name="header" />
        </header>
        <aside>
            <slot name="aside" />
        </aside>
        <main>
            <slot name="main" />
        </main>
        <footer>
            <slot name="footer" />
        </footer>
    </div>
</template>

<script>
export default {

}
</script>