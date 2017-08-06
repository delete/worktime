new Vue({
  el: '#app',
  data: {
    TOTAL_WORK_HOURS: 8 * 60 * 60, // 8 hours
    arrived: '08:00',
    lunchTime: '12:00',
    secondRound: '13:00',
    getOut: 1,
    datenow: 0,
    notified: false,
    themes: {
      dark: {
        color: '#d6d6d6',
        bg: '#242C42'
      },
      light: {
        color: '#7a7a7a',
        bg: '#fff'
      }
    },
    defaultTheme: true
  },
  mounted: function() {
    this.clockTime()        
  },
  computed: {
    calculate: function () {          
        const arrived = this.calculateTimeInSeconds(moment(this.arrived, 'h:mm'))
        const lunchTime = this.calculateTimeInSeconds(moment(this.lunchTime, 'h:mm'))
        const secondRound = this.calculateTimeInSeconds(moment(this.secondRound, 'h:mm'))
        
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
        const self = this
        this.datenow = this.calculateTimeInSeconds(moment())

        setTimeout(self.clockTime, 1000)
    },
    notify: function () {
        if ( !this.hasNotificationPermission() && !this.requestNotificationPermission() ) return 
        
        this.sendMessage()
    },
    sendMessage: function() {
        const options = {
          body: 'GOGOGO!',
          icon: 'assets/favicon.ico'
        }
        const self = this;
        
        const notification = new Notification("It's time to get out!", options)
        
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
    },
    hideMessage: function(event) {
        event.currentTarget.classList.remove('new-update_show')
        window.location.reload()
    },
    changeTheme: function () {
      if ( this.defaultTheme ) {
        this.setDarkTheme()
      } else {
        this.setLigthTheme()
      }
      this.defaultTheme = !this.defaultTheme
    },
    setTheme: function (theme) {
      document.documentElement.style.setProperty('--main-bg-color', theme.bg)
      document.documentElement.style.setProperty('--main-font-color', theme.color)
    },
    setDarkTheme: function () {
      this.setTheme(this.themes.dark)
    },
    setLigthTheme: function () {
      this.setTheme(this.themes.light)
    }
  }
})
