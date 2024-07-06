import emitter from '@/utils/emitter.js'
class Socket {
  ModeCode = {
    MSG: 'message', //普通消息
    HEART_BEAT: 'heart_beat', //心跳检测消息
  }
  ws = null //webSocket实例
  webSocketState = false //webSocket连接状态
  currReconnectCount = 0 //当前重连次数
  //配置对象
  heartBeatConfig = {
    time: 1 * 1000, //心跳检测时间间隔
    timeout: 1 * 1000, //心跳超时间隔时间
    reconnect: 3 * 1000, //重连时间间隔
    timetimer: null,
    timeoutTimer: null,
    reconnectTimer: null, //断线重连计时器timer
    maxReconnect: 5, //最大重连次数
  }
  constructor(wsUrl) {
    this.wsUrl = wsUrl //webSocket地址
  }
  //开启连接
  connectWebSocket() {
    this.ws = new WebSocket(this.wsUrl)
    //初始化
    this.init()
  }
  init() {
    this.ws.addEventListener('open', () => {
      console.log('connect !!!')
      this.currReconnectCount = 0
      this.ws.send(
        JSON.stringify({
          ModeCode: this.ModeCode.MSG,
          msg: '',
        })
      )
      //  状态连接为true
      this.webSocketState = true
      //  开启心跳监测
      this.heartBeatConfig && this.heartBeatConfig.time
        ? this.startHeartBeat(this.heartBeatConfig.time)
        : ''
    })
    this.ws.addEventListener('message', (e) => {
      const data = JSON.parse(e.data)
      switch (data.ModeCode) {
        case this.ModeCode.MSG:
          // console.log('收到普通消息', data)
          emitter.emit('message', data)
          break
        case this.ModeCode.HEART_BEAT:
          //保持心跳状态
          this.webSocketState = true
          // console.log('心跳检测正常')
          break
      }
    })
    this.ws.addEventListener('error', (e) => {
      this.webSocketState = false
      //连接关闭，重新连接webSocket
      this.reconnectWebSocket()
      console.log('Error!!!', e)
    })
    this.ws.addEventListener('close', () => {
      this.webSocketState = false
      console.log('Close!!!')
    })
  }
  //卸载的清除工作
  unMounted() {
    this.ws && this.ws.close()
    if (this.ws) this.ws = null
    clearTimeout(this.heartBeatConfig.timetimer)
    clearTimeout(this.heartBeatConfig.timeoutTimer)
    clearTimeout(this.heartBeatConfig.reconnectTimer)
  }
  //开启心跳机制，会定时发送消息向后端争取回应
  startHeartBeat(time) {
    clearTimeout(this.heartBeatConfig.timetimer)
    this.heartBeatConfig.timetimer = setTimeout(() => {
      // console.log('前端：发送心跳消息')
      this.ws &&
        this.ws.send(
          JSON.stringify({
            ModeCode: this.ModeCode.HEART_BEAT,
            msg: new Date(),
          })
        )
      //延迟等带服务器回应，确保双方状态正常，开启下一轮心跳机制
      this.waitingServer()
    }, time)
  }
  //🟥延时3s为了等待服务器的响应，通过webScoketState判断是否连线成功
  //    3s内没收到服务端的响应，说明没有正常发送过去，可能处于断开状态，需要进行区别操作
  waitingServer() {
    // this.webSocketState = false
    clearTimeout(this.heartBeatConfig.timeoutTimer)
    this.heartBeatConfig.timeoutTimer = null
    this.heartBeatConfig.timeoutTimer = setTimeout(() => {
      //  1. 正常连接状态，不需要重连，开启下一轮心跳检测
      if (this.webSocketState) {
        //重置心跳监测，代表用户正常连接
        // console.log('用户正常连接')
        this.startHeartBeat(this.heartBeatConfig.time)
        return
      }
      //  2. webSocketState = false,要了close了要么error了，需要重连
      console.log('用户断开连接，需要进行重连操作')
      try {
        //手动关闭上一次断开的webSocket连接，后续重连
        this.ws.close()
      } catch (e) {
        console.log('连接已彻底关闭')
      }
      //  3. 🟥重连操作
      this.reconnectWebSocket()
    }, this.heartBeatConfig.timeout)
  }
  //重新连接，首先还是会等待服务器回应，随后再次延迟等待重连
  //    重连一次的时间间隔为reconnect+timeout
  reconnectWebSocket() {
    this.currReconnectCount++
    if (this.currReconnectCount > this.heartBeatConfig.maxReconnect) {
      console.log('重连次数过多，放弃重连')
      return
    }
    this.heartBeatConfig.reconnectTimer = setTimeout(() => {
      // if(!this.ws)
      console.log('重连操作')
      //清除之前的重连开启的定时器操作，防止ws重叠
      clearTimeout(this.heartBeatConfig.reconnectTimer)
      this.heartBeatConfig.reconnectTimer = null
      //重新走连接逻辑
      this.connectWebSocket()
    }, this.heartBeatConfig.reconnect)
  }
}

export default Socket
