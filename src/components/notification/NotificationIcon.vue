<template>
  <img 
      :src="permission.src" 
      class="notification-icon"
      :alt="permission.alt"
      :title="permission.title"></img>
</template>

<script>
  const notifyOn = require( './assets/notifications-on.svg' )
  const notifyOff = require( './assets/notifications-off.svg' )

  export default {
    data() {
      return {
        permissionAllowed: {
          src: notifyOn,
          alt: 'Notification is on!',
          title: 'Your notification is on!'
        },
        permissionDenied: {
          src: notifyOff,
          alt: 'Notification is off!',
          title: 'Your notification is off!'
        },
        permission: {}
      }
    },
    mounted() {
      this.changePermisionImage(
        Notification.permission === 'granted'
      )
    },
    methods: {
      changePermisionImage( hasPermission ) {
        if ( hasPermission ) {
          this.permission = this.permissionAllowed
        } else {
          this.permission = this.permissionDenied
        }
      }
    }
  }
</script>

<style>
  .notification-icon {
    display: none;
  }

  @media screen and (min-height: 639px) {
    .notification-icon {
      display: block;
      width: 26px;
      position: absolute;
      bottom: 5%;
      left: calc(50% - 13px);
    }
  } 
</style>
