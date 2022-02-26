<div class="spin"></div>

<style>
  @keyframes spinner {
    0% {
      transform: translate3d(-50%, -50%, 0) rotate(0deg);
    }
    100% {
      transform: translate3d(-50%, -50%, 0) rotate(360deg);
    }
  }

  .spin {
    padding-right: 2rem;
    padding-top: 0.57rem;
    padding-bottom: 0.57rem;
  }

  .spin::before {
    animation: 1.5s linear infinite spinner;
    animation-play-state: inherit;
    border: solid 2px rgb(207, 208, 209);
    border-bottom-color: rgb(28, 135, 201);
    border-radius: 50%;
    content: "";
    height: 1rem;
    margin-left: 1rem;
    position: absolute;
    width: 1rem;
    will-change: transform;
  }
</style>