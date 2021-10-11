<template>
    <div id = "navbar">
        <a href="/"><img id="logo" alt="vusic logo" src="../assets/logo.png" width=100></a>
        <div>
            <h1 id = "title">Vusic</h1>
            <h3 id = "subtitle">A Fast and Easy-to-Use Music Queuer</h3>
        </div>
    </div>
</template>

<style scoped>
#navbar {
    display: flex;
    flex-direction: row;
    align-items: center;
    background: #2e2e2e;
    padding: 0 2em;
}

#logo {
    width: 7em;
    padding: 0 1em;
}

#title {
    margin: 0;
    font-weight: 1000;
}

#subtitle {
    margin: 0
}
</style>