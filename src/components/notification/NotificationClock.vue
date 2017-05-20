<template>
  <div>
    {{ isTime }}
  </div>
</template>
<script>
  import moment from 'moment'

  const icon = require( './assets/notifications-on.svg' )

  export default {
    data() {
      return {
        notified: false,
        datenow: 0
      }
    },
    props: {
      getOutTime: Number // In seconds
    },
    mounted() {
      this.clockTime()
    },
    computed: {
      isTime() {
        if ( this.notified ) return

        if ( this.getOutTime <= this.datenow ) {
          this.notify()
        }
      }
    },
    methods: {
      clockTime() {
        const self = this
        this.datenow = this.toSeconds( moment() )
        setTimeout( self.clockTime, 1000 )
      },
      toSeconds( date ) {
        return ( ( date.hour() * 3600 ) + ( date.minutes() * 60 ) )
      },
      notify() {
        if ( !this.hasNotificationPermission() ) {
          if ( !this.requestNotificationPermission() ) {
            return
          }
        }

        this.sendMessage()
      },
      sendMessage() {
        const options = {
          body: 'GOGOGO!',
          icon
        }

        const notification = new Notification( 'It\'s time to get out!', options )

        notification.onclick = event => {
          event.preventDefault()
          this.notified = true
          options.body = 'See you tomorrow.'
          // eslint-disable-next-line
          new Notification( 'Notification deactivated for today!', options )
        }
      },
      requestNotificationPermission() {
        Notification
          .requestPermission( permission => permission === 'granted' )
      },
      hasNotificationPermission() {
        return Notification.permission === 'granted'
      }
    }
  }
</script>

<style scoped>
  div {
    display: none;
  }
</style>
