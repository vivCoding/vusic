<template>
    <div id = "about">
        <img src = '../assets/logo.png'/>
        <h1>Vusic</h1>
        <p>A simple song queuer.</p>
        <p>Inspired by the music queuer <a href = "https://groovy.bot/" target="__blank__">Groovy Discord bot</a>. </p>
        <br>
        <p>This was previously made for the <a href = "https://devpost.com/software/vusic-a3247j" target="_blank__">Boilermake VIII hackathon</a>.</p>
        <p>See the source code on <a href = "https://github.com/vivCoding/vusic" target="__blank__">GitHub</a>.</p>
        <p>Open to contributions.</p>
        <br>
        <a><router-link to="/">Return to queue</router-link></a>
    </div>
</template>

<style scoped>
#about {
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