<template>
  <div class="get-out-time">
    You'll get out at: <span class="get-out-time__time attention" v-cloak>{{ time }}</span>
    <div class="get-out-time__tolerance">You have 10 minutes of tolerance</div>
  </div>
</template>

<script>
  export default {
    props: {
      time: String
    }
  }
</script>

<style scoped>
  .get-out-time {
    text-align: center;
    margin: 50px;
    font-size: 28px;
    color: #7a7a7a;
    position: relative;
  }

  .get-out-time__time {
    font-size: 40px;
    font-weight: 400;
    transition: all 300ms;
  }

  .get-out-time__tolerance {
    position: absolute;
    opacity: 0;
    transition: all 800ms;
    font-size: .5em;
    background-color: #465c90;
    padding: 6px;
    border-radius: 5px;
    color: #fff;
    right: 80px;
  }

  .get-out-time:hover .get-out-time__tolerance {
    opacity: 1;
  }
</style>
