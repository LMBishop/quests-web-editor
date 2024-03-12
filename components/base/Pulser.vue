<template>
  <div class="circles">
    <div class="circle1"></div>
    <div class="circle2"></div>
    <div class="circle3"></div>
  </div>
</template>

<style scoped>
.circles {
  position: relative;
  height: 100px;
  width: 100px;

  >div {
    animation: growAndFade 3s infinite ease-out;
    background-color: var(--color-primary);
    border-radius: 50%;
    height: 100%;
    opacity: 0;
    position: absolute;
    width: 100%;
  }

  .circle1 {
    animation-delay: 1s;
  }

  .circle2 {
    animation-delay: 2s;
  }

  .circle3 {
    animation-delay: 3s;
  }
}

@keyframes growAndFade {
  0% {
    opacity: .25;
    transform: scale(0);
  }

  100% {
    opacity: 0;
    transform: scale(1);
  }
}

body {
  align-items: center;
  display: flex;
  justify-content: center;
  margin: 0;
}
</style>