<template>
    <div id = "error">
        <img src = '../assets/logo.png'/>
        <h1>404 Not Found :(</h1>
        <br>
        <h3>Oopsies! Looks like you entered the wrong URL</h3>
        <br>
        <a><router-link to="/">Start a new queue</router-link></a>
    </div>
</template>

<style scoped>
#error {
    padding: 2em;
    text-align: center;
    font-size: 150%;
    min-height: 75vh;
}

a {
    color: cyan;
    text-decoration: none;
    font-weight: bolder;
}

img {
    width: 12em;
}
</style>