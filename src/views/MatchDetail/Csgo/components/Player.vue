<template>
  <div class="player">
    <div class="team">
      <div class="home">
        <MyImage v-model="team_home.team_img" size="33" />
        <span class="text">{{team_home.team_short_name}}</span>
      </div>
      <div class="away">
        <span class="text">{{team_away.team_short_name}}</span>
        <MyImage v-model="team_away.team_img" size="33" />
      </div>
    </div>
    <ul class="player-list">
      <li v-for="(item,index) in player_info" :key="index">
        <div class="player-info">
          <div class="home-player">
            <MyImage v-model="item.player_home.player_logo" size="33" :type="2" round />
            <span class="home-player-name">{{item.player_home.player_name_en}}</span>
          </div>
          <div class="away-player">
            <span class="away-player-name">{{item.player_away.player_name_en}}</span>
            <MyImage v-model="item.player_away.player_logo" size="33" :type="2" round />
          </div>
        </div>
        <div class="player-zj">
          <RowBar :dataList="item.pair_attr" marginBottom="5" />
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import RowBar from "../../components/RowBar";
import { mapState } from "vuex";
export default {
  name: "Index",
  data() {
    return {
    
    };
  },
  components: { RowBar },
  methods: {},
  computed: {
    ...mapState({
      team_home: state => state.matchDetail.team_home||{},
      team_away: state => state.matchDetail.team_away||{},
      player_info: state => state.matchDetail.player_info_CSGO||[]
    })
  },
  created() {
    this.$store.dispatch("matchDetail/_getMatchDetailPlayerInfo");
  }
};
</script>

<style lang="scss" scoped>
.player {
  .team {
    display: flex;
    justify-content: space-between;
    margin: 10px 0;
    padding: 6px 15px;
    background: #fff;
    .home,
    .away {
      font-size: 11px;
      & > .text {
        margin: 0 9px;
        color:#333;
      }
      
    }
  }
  .player-list {
    & > li {
      height: 144px;
      position: relative;
      background: #fff;
      padding: 0 15px;
      box-shadow: 0px 1px 6px rgba(0, 0, 0, 0.1);
    }
    .player-info {
      display: flex;
      justify-content: space-between;
      padding: 10px 0;
      .home-player {
        .home-player-name {
          color: #333;

          font-weight: bold;
          margin-left: 10px;
        }
      }
      .away-player {
        .away-player-name {
          color: #333;

          font-weight: bold;
          margin-right: 10px;
        }
      }
    }
  }
}
</style>
