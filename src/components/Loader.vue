<template>
    <div class="loader-overlay">
        <div id="particles-background" class="vertical-centered-box"></div>
        <div id="particles-foreground" class="vertical-centered-box"></div>

        <div class="vertical-centered-box">
            <div class="content">
                <div class="loader-circle"></div>
                <div class="loader-line-mask">
                    <div class="loader-line"></div>
                </div>
                <div class="loader-logo">
                    <img :src="logo" alt="Logo" class="w-16 h-16" />
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { onMounted, onBeforeUnmount } from 'vue';

const logo = '/dkvicon.png'

// Setup particleground when component is mounted
onMounted(() => {
    // Import particleground script
    const script = document.createElement('script');
    script.textContent = particlegroundCode;
    document.body.appendChild(script);

    // Initialize particles after script is loaded
    setTimeout(() => {
        if (window.particleground) {
            window.particleground(document.getElementById('particles-foreground'), {
                dotColor: 'rgba(255, 255, 255, 1)',
                lineColor: 'rgba(255, 255, 255, 0.05)',
                minSpeedX: 0.3,
                maxSpeedX: 0.6,
                minSpeedY: 0.3,
                maxSpeedY: 0.6,
                density: 15000,
                curvedLines: false,
                proximity: 250,
                parallaxMultiplier: 10,
                particleRadius: 3,
            });

            window.particleground(document.getElementById('particles-background'), {
                dotColor: 'rgba(255, 255, 255, 0.5)',
                lineColor: 'rgba(255, 255, 255, 0.05)',
                minSpeedX: 0.075,
                maxSpeedX: 0.15,
                minSpeedY: 0.075,
                maxSpeedY: 0.15,
                density: 30000,
                curvedLines: false,
                proximity: 20,
                parallaxMultiplier: 20,
                particleRadius: 2,
            });
        }
    }, 100);
});

// Clean up when component is unmounted
onBeforeUnmount(() => {
    // Clean up any global objects or event listeners
    if (window.requestAnimationFrame) {
        window.cancelAnimationFrame(window.requestAnimationFrameId);
    }
});

// Particleground library code (minified)
const particlegroundCode = `
!function(a,b){"use strict";function c(a){a=a||{};for(var b=1;b<arguments.length;b++){var c=arguments[b];if(c)for(var d in c)c.hasOwnProperty(d)&&("object"==typeof c[d]?deepExtend(a[d],c[d]):a[d]=c[d])}return a}function d(d,g){function h(){if(y){r=b.createElement("canvas"),r.className="pg-canvas",r.style.display="block",d.insertBefore(r,d.firstChild),s=r.getContext("2d"),i();for(var c=Math.round(r.width*r.height/g.density),e=0;c>e;e++){var f=new n;f.setStackPos(e),z.push(f)}a.addEventListener("resize",function(){k()},!1),b.addEventListener("mousemove",function(a){A=a.pageX,B=a.pageY},!1),D&&!C&&a.addEventListener("deviceorientation",function(){F=Math.min(Math.max(-event.beta,-30),30),E=Math.min(Math.max(-event.gamma,-30),30)},!0),j(),q("onInit")}}function i(){r.width=d.offsetWidth,r.height=d.offsetHeight,s.fillStyle=g.dotColor,s.strokeStyle=g.lineColor,s.lineWidth=g.lineWidth}function j(){if(y){u=a.innerWidth,v=a.innerHeight,s.clearRect(0,0,r.width,r.height);for(var b=0;b<z.length;b++)z[b].updatePosition();for(var b=0;b<z.length;b++)z[b].draw();G||(t=requestAnimationFrame(j))}}function k(){i();for(var a=d.offsetWidth,b=d.offsetHeight,c=z.length-1;c>=0;c--)(z[c].position.x>a||z[c].position.y>b)&&z.splice(c,1);var e=Math.round(r.width*r.height/g.density);if(e>z.length)for(;e>z.length;){var f=new n;z.push(f)}else e<z.length&&z.splice(e);for(c=z.length-1;c>=0;c--)z[c].setStackPos(c)}function l(){G=!0}function m(){G=!1,j()}function n(){switch(this.stackPos,this.active=!0,this.layer=Math.ceil(3*Math.random()),this.parallaxOffsetX=0,this.parallaxOffsetY=0,this.position={x:Math.ceil(Math.random()*r.width),y:Math.ceil(Math.random()*r.height)},this.speed={},g.directionX){case"left":this.speed.x=+(-g.maxSpeedX+Math.random()*g.maxSpeedX-g.minSpeedX).toFixed(2);break;case"right":this.speed.x=+(Math.random()*g.maxSpeedX+g.minSpeedX).toFixed(2);break;default:this.speed.x=+(-g.maxSpeedX/2+Math.random()*g.maxSpeedX).toFixed(2),this.speed.x+=this.speed.x>0?g.minSpeedX:-g.minSpeedX}switch(g.directionY){case"up":this.speed.y=+(-g.maxSpeedY+Math.random()*g.maxSpeedY-g.minSpeedY).toFixed(2);break;case"down":this.speed.y=+(Math.random()*g.maxSpeedY+g.minSpeedY).toFixed(2);break;default:this.speed.y=+(-g.maxSpeedY/2+Math.random()*g.maxSpeedY).toFixed(2),this.speed.x+=this.speed.y>0?g.minSpeedY:-g.minSpeedY}}function o(a,b){return b?void(g[a]=b):g[a]}function p(){console.log("destroy"),r.parentNode.removeChild(r),q("onDestroy"),f&&f(d).removeData("plugin_"+e)}function q(a){void 0!==g[a]&&g[a].call(d)}var r,s,t,u,v,w,x,y=!!b.createElement("canvas").getContext,z=[],A=0,B=0,C=!navigator.userAgent.match(/(iPhone|iPod|iPad|Android|BlackBerry|BB10|mobi|tablet|opera mini|nexus 7)/i),D=!!a.DeviceOrientationEvent,E=0,F=0,G=!1;return g=c({},a[e].defaults,g),n.prototype.draw=function(){s.beginPath(),s.arc(this.position.x+this.parallaxOffsetX,this.position.y+this.parallaxOffsetY,g.particleRadius/2,0,2*Math.PI,!0),s.closePath(),s.fill(),s.beginPath();for(var a=z.length-1;a>this.stackPos;a--){var b=z[a],c=this.position.x-b.position.x,d=this.position.y-b.position.y,e=Math.sqrt(c*c+d*d).toFixed(2);e<g.proximity&&(s.moveTo(this.position.x+this.parallaxOffsetX,this.position.y+this.parallaxOffsetY),g.curvedLines?s.quadraticCurveTo(Math.max(b.position.x,b.position.x),Math.min(b.position.y,b.position.y),b.position.x+b.parallaxOffsetX,b.position.y+b.parallaxOffsetY):s.lineTo(b.position.x+b.parallaxOffsetX,b.position.y+b.parallaxOffsetY))}s.stroke(),s.closePath()},n.prototype.updatePosition=function(){if(g.parallax){if(D&&!C){var a=(u-0)/60;w=(E- -30)*a+0;var b=(v-0)/60;x=(F- -30)*b+0}else w=A,x=B;this.parallaxTargX=(w-u/2)/(g.parallaxMultiplier*this.layer),this.parallaxOffsetX+=(this.parallaxTargX-this.parallaxOffsetX)/10,this.parallaxTargY=(x-v/2)/(g.parallaxMultiplier*this.layer),this.parallaxOffsetY+=(this.parallaxTargY-this.parallaxOffsetY)/10}var c=d.offsetWidth,e=d.offsetHeight;switch(g.directionX){case"left":this.position.x+this.speed.x+this.parallaxOffsetX<0&&(this.position.x=c-this.parallaxOffsetX);break;case"right":this.position.x+this.speed.x+this.parallaxOffsetX>c&&(this.position.x=0-this.parallaxOffsetX);break;default:(this.position.x+this.speed.x+this.parallaxOffsetX>c||this.position.x+this.speed.x+this.parallaxOffsetX<0)&&(this.speed.x=-this.speed.x)}switch(g.directionY){case"up":this.position.y+this.speed.y+this.parallaxOffsetY<0&&(this.position.y=e-this.parallaxOffsetY);break;case"down":this.position.y+this.speed.y+this.parallaxOffsetY>e&&(this.position.y=0-this.parallaxOffsetY);break;default:(this.position.y+this.speed.y+this.parallaxOffsetY>e||this.position.y+this.speed.y+this.parallaxOffsetY<0)&&(this.speed.y=-this.speed.y)}this.position.x+=this.speed.x,this.position.y+=this.speed.y},n.prototype.setStackPos=function(a){this.stackPos=a},h(),{option:o,destroy:p,start:m,pause:l}}var e="particleground",f=a.jQuery;a[e]=function(a,b){return new d(a,b)},a[e].defaults={minSpeedX:.1,maxSpeedX:.7,minSpeedY:.1,maxSpeedY:.7,directionX:"center",directionY:"center",density:1e4,dotColor:"#666666",lineColor:"#666666",particleRadius:7,lineWidth:1,curvedLines:!1,proximity:100,parallax:!0,parallaxMultiplier:5,onInit:function(){},onDestroy:function(){}},f&&(f.fn[e]=function(a){if("string"==typeof arguments[0]){var b,c=arguments[0],g=Array.prototype.slice.call(arguments,1);return this.each(function(){f.data(this,"plugin_"+e)&&"function"==typeof f.data(this,"plugin_"+e)[c]&&(b=f.data(this,"plugin_"+e)[c].apply(this,g))}),void 0!==b?b:this}return"object"!=typeof a&&a?void 0:this.each(function(){f.data(this,"plugin_"+e)||f.data(this,"plugin_"+e,new d(this,a))})})}(window,document),
function(){for(var a=0,b=["ms","moz","webkit","o"],c=0;c<b.length&&!window.requestAnimationFrame;++c)window.requestAnimationFrame=window[b[c]+"RequestAnimationFrame"],window.cancelAnimationFrame=window[b[c]+"CancelAnimationFrame"]||window[b[c]+"CancelRequestAnimationFrame"];window.requestAnimationFrame||(window.requestAnimationFrame=function(b){var c=(new Date).getTime(),d=Math.max(0,16-(c-a)),e=window.setTimeout(function(){b(c+d)},d);return a=c+d,e}),window.cancelAnimationFrame||(window.cancelAnimationFrame=function(a){clearTimeout(a)})}();
`;
</script>

<style scoped>
/* Base styles */
.loader-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 9999;
    overflow: hidden;
}

.vertical-centered-box {
    position: absolute;
    width: 100%;
    height: 100%;
    text-align: center;
}

.vertical-centered-box:after {
    content: '';
    display: inline-block;
    height: 100%;
    vertical-align: middle;
    margin-right: -0.25em;
}

.content {
    box-sizing: border-box;
    display: inline-block;
    vertical-align: middle;
    text-align: left;
    font-size: 0;
    position: relative;
}

/* Particles background styling - using your color scheme */
#particles-background,
#particles-foreground {
    left: -51%;
    top: -51%;
    width: 202%;
    height: 202%;
    transform: scale3d(.5, .5, 1);
    z-index: 1;
}

#particles-background {
    background: linear-gradient(135deg, #C40C0C 0%, #FF6500 100%);
    z-index: 0;
}

/* Loader circle styling */
.loader-circle {
    position: absolute;
    left: 50%;
    top: 50%;
    width: 120px;
    height: 120px;
    border-radius: 50%;
    box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.1);
    margin-left: -60px;
    margin-top: -60px;
    z-index: 2;
}

.loader-line-mask {
    position: absolute;
    left: 50%;
    top: 50%;
    width: 60px;
    height: 120px;
    margin-left: -60px;
    margin-top: -60px;
    overflow: hidden;
    transform-origin: 60px 60px;
    -webkit-mask-image: -webkit-linear-gradient(top, rgba(0, 0, 0, 1), rgba(0, 0, 0, 0));
    animation: rotate 1.2s infinite linear;
    z-index: 3;
}

.loader-line {
    width: 120px;
    height: 120px;
    border-radius: 50%;
    box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.5);
}


.dot-animation {
    display: inline-block;
    animation: dots 1.5s infinite;
}

/* Animations */
@keyframes rotate {
    0% {
        transform: rotate(0deg);
    }

    100% {
        transform: rotate(360deg);
    }
}

@keyframes dots {
    0% {
        opacity: 0.2;
    }

    20% {
        opacity: 1;
    }

    100% {
        opacity: 0.2;
    }
}

@keyframes pulse {

    0%,
    100% {
        transform: translate(-50%, -50%) scale(1);
    }

    50% {
        transform: translate(-50%, -50%) scale(1.1);
    }
}

/* Responsive adjustments */
@media (max-width: 768px) {
    .loader-circle {
        width: 100px;
        height: 100px;
        margin-left: -50px;
        margin-top: -50px;
    }

    .loader-line-mask {
        width: 50px;
        height: 100px;
        margin-left: -50px;
        margin-top: -50px;
        transform-origin: 50px 50px;
    }

    .loader-line {
        width: 100px;
        height: 100px;
    }
}

@media (max-width: 480px) {
    .loader-circle {
        width: 80px;
        height: 80px;
        margin-left: -40px;
        margin-top: -40px;
    }

    .loader-line-mask {
        width: 40px;
        height: 80px;
        margin-left: -40px;
        margin-top: -40px;
        transform-origin: 40px 40px;
    }

    .loader-line {
        width: 80px;
        height: 80px;
    }

    .loader-logo svg {
        width: 40px;
        height: 40px;
    }

    .loader-text {
        font-size: 14px;
        bottom: -35px;
    }
}

/* Canvas styling */
.pg-canvas {
    display: block;
    position: absolute;
    z-index: 1;
}
</style>