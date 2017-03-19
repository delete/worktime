<template>
  <div id="app">
    <app-form
        :arrivedTime="times.arrivedTime"
        :lunchTime="times.lunchTime"
        :secondRoundTime="times.secondRoundTime"
        @timechanged="calculate"></app-form>
    <app-get-out-time 
        :time="times.getOutTime"></app-get-out-time>
    <app-notification-icon></app-notification-icon>
    <app-clock-notification
        :getOutTime="getOutTimeInSeconds"></app-clock-notification>
  </div>
</template>

<script>
import moment from 'moment'

import Form from './components/Form'
import GetOutTime from './components/GetOutTime'
import NotificationIcon from './components/NotificationIcon'
import ClockNotification from './components/ClockNotification'

export default {
  name: 'app',
  components: {
    'app-form': Form,
    'app-get-out-time': GetOutTime,
    'app-notification-icon': NotificationIcon,
    'app-clock-notification': ClockNotification
  },
  data() {
    return {
      totalWorkHours: 8 * 60 * 60, // 8 hours
      times: {
        arrivedTime: '08:00',
        lunchTime: '12:00',
        secondRoundTime: '13:00',
        getOutTime: ''
      },
      getOutTimeInSeconds: 1 // must be one, otherwise show notify on load
    }
  },
  methods: {
    calculate( changedTimes ) {
      this.times = Object.assign( this.times, changedTimes )

      const arrived = this.toSeconds(
        this.toMilliSeconds( this.times.arrivedTime )
      )
      const lunchTime = this.toSeconds(
        this.toMilliSeconds( this.times.lunchTime )
      )
      const secondRound = this.toSeconds(
        this.toMilliSeconds( this.times.secondRoundTime )
      )
      const totalLunchTime = ( secondRound - lunchTime )

      this.getOutTimeInSeconds = arrived + this.totalWorkHours + totalLunchTime

      this.times.getOutTime = new Date( this.getOutTimeInSeconds * 1000 )
                                      .toISOString()
                                      .substr( 11, 8 )
    },
    toMilliSeconds( date ) {
      return moment( date, 'h:mm' )
    },
    toSeconds( date ) {
      return ( ( date.hour() * 3600 ) + ( date.minutes() * 60 ) )
    }
  }
}
</script>

<style>
  [v-cloak] {
    display: none;
  }

  body {
    color: #7a7a7a;
    font-size: 16px;
  }

  .title {
    margin-top: 50px;
    text-align: center;
    font-size: 2.5em;
  }

  @media screen and (min-width: 600px) {
    body {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 95vh;
      width: 99%;
    }

    .title {
      margin: 0;
      margin-bottom: 97px;
     }
  }


  .attention {
    color: #465C90;
  }
</style>
