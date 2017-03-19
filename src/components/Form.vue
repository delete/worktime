<template>
  <form name="work_form" class="time__form">
    <div>
      <input 
          type="time" 
          class="time__input" 
          v-model="arrived">
      <label>Arrived</label>
    </div>
    <div>
      <input 
          type="time" 
          class="time__input" 
          v-model="lunch">
      <label>Lunch time</label>
    </div>
    <div>
      <input 
          type="time" 
          class="time__input" 
          v-model="secondRound">
      <label>Second round</label>
    </div>
    {{ timechanged }}
  </form>
</template>

<script>
  export default {
    data() {
      return {
        arrived: this.arrivedTime,
        lunch: this.lunchTime,
        secondRound: this.secondRoundTime
      }
    },
    props: {
      arrivedTime: {
        default: '08:00'
      },
      lunchTime: {
        default: '12:00'
      },
      secondRoundTime: {
        default: '13:00'
      },
      onChanged: Function
    },
    computed: {
      timechanged() {
        const times = {
          arrivedTime: this.arrived,
          lunchTime: this.lunch,
          secondRoundTime: this.secondRound
        }
        this.$emit( 'timechanged', times )
      }
    }
  }
</script>

<style scoped>
  .time__form {
    display: flex;
    flex-direction: column;
    margin: 40px;
    margin-right: 25px;
  }
  @media screen and (min-width: 600px) {
    .time__form {
      display: block;
    }
  }
  
  .time__input {
    padding: 10px;
    font-size: 1.2em;      
    border: 0;
    box-shadow: 1px 1px 10px 1px #c3c3c3;
    margin: 10px;
    color: #7a7a7a;
  }
</style>
