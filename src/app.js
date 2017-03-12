new Vue({
  el: '#app',
  data: {
    TOTAL_WORK_HOURS: 8 * 60 * 60, // 8 hours
    arrived: '08:00',
    lunchTime: '12:00',
    secondRound: '13:00',
    getOut: '1',
    datenow: '0',
    notified: false
  },
  mounted: function() {
    this.clockTime()        
  },
  computed: {
    calculate: function () {          
        var arrived = this.calculateTimeInSeconds(moment(this.arrived, 'h:mm'))
        var lunchTime = this.calculateTimeInSeconds(moment(this.lunchTime, 'h:mm'))
        var secondRound = this.calculateTimeInSeconds(moment(this.secondRound, 'h:mm'))
        
        this.getOut = arrived + this.TOTAL_WORK_HOURS + (secondRound - lunchTime)
        return new Date(this.getOut * 1000).toISOString().substr(11, 8)
    },
    isTime: function () {
        if ( this.notified ) return
        
        if ( this.getOut <= this.datenow ) {
        this.notify()
        }
    }
  },
  methods: {
    calculateTimeInSeconds: function (date) {
        return ( (date.hour() * 3600) + (date.minutes() * 60) )
    },
    clockTime: function() {
        var self = this
        this.datenow = this.calculateTimeInSeconds(moment())

        setTimeout(self.clockTime, 1000)
    },
    notify: function () {
        var self = this;

        if ( !this.hasNotificationPermission() ){
          if ( !this.requestNotificationPermission() ) return
        } 
        
        this.sendMessage()
    },
    sendMessage: function() {
        var options = {
          body: 'GOGOGO!',
          icon: 'assets/favicon.ico'
        }
        var self = this;
        
        var notification = new Notification("It's time to get out!", options)
        
        notification.onclick = function (event) {
          event.preventDefault()
          self.notified = true
          options.body = 'See you tomorrow.'
          new Notification("Notification deactivated for today!", options)
        }
    },
    requestNotificationPermission: function() {
        Notification.requestPermission(function (permission) {
          return permission === "granted"
        })
    },
    hasNotificationPermission: function() {
        return Notification.permission === "granted"
    }
  }
})