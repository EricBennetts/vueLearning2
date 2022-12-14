var app = new Vue({
    el: "#player",
    data: {
      query: "",
      musicList: [],
      musicUrl: "",
      musicCover: "",
      hotComments: [],
      isPlaying: false,
      isShow: false,
      mvUrl: ""
    },
    methods: {
      // Search for music
      searchMusic: function() {
        var that = this;
        axios.get("https://autumnfish.cn/search?keywords=" + this.query).then(
          function(response) {
            // console.log(response);
            that.musicList = response.data.result.songs;
            console.log(response.data.result.songs);
          },
          function(err) {}
        );
      },

      // Play the music
      playMusic: function(musicId) {
        //   console.log(musicId);
        var that = this;
        axios.get("https://autumnfish.cn/song/url?id=" + musicId).then(
          function(response) {
            // console.log(response);
            // console.log(response.data.data[0].url);
            that.musicUrl = response.data.data[0].url;
          },
          function(err) {}
        );
  
        // Details of music
        axios.get("https://autumnfish.cn/song/detail?ids=" + musicId).then(
          function(response) {
            // console.log(response);
            // console.log(response.data.songs[0].al.picUrl);
            that.musicCover = response.data.songs[0].al.picUrl;
          },
          function(err) {}
        );
  
        // Get the comments
        axios.get("https://autumnfish.cn/comment/hot?type=0&id=" + musicId).then(
          function(response) {
            // console.log(response);
            // console.log(response.data.hotComments);
            that.hotComments = response.data.hotComments;
          },
          function(err) {}
        );
      },
      // Play the music
      play: function() {
        // console.log("play");
        this.isPlaying = true;
      },
      // Pause
      pause: function() {
        // console.log("pause");
        this.isPlaying = false;
      },
      // Play MV
      playMV: function(mvid) {
        var that = this;
        axios.get("https://autumnfish.cn/mv/url?id=" + mvid).then(
          function(response) {
            // console.log(response);
            console.log(response.data.data.url);
            that.isShow = true;
            that.mvUrl = response.data.data.url;
          },
          function(err) {}
        );
      },
      // Hide
      hide: function() {
        this.isShow = false;
      }
    }
  });