import * as THREE from "https://cdn.skypack.dev/three@0.132.2";
import { OrbitControls } from "https://cdn.skypack.dev/three@0.132.2/examples/jsm/controls/OrbitControls.js";

let spriteList = [];

window.addEventListener("load", () => {
    var DDD = {
        THREE,
        OrbitControls,
    }

    const canvas = document.getElementById("canvas");
    spriteList.push(new Scene(canvas, DDD));

    tick();
});

const tick = () => {
    for (let i = 0; i < spriteList.length; i++) {
        const sprite = spriteList[i];
        sprite.tick();
    }
    requestAnimationFrame(tick);
}